package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.TiradoresArmario;
import com.torga.pedidos.repository.TiradoresArmarioRepository;
import com.torga.pedidos.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.torga.pedidos.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TiradoresArmarioResource REST controller.
 *
 * @see TiradoresArmarioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class TiradoresArmarioResourceIntTest {

    private static final byte[] DEFAULT_IMAGEN = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEN = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGEN_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEN_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    private static final Float DEFAULT_ALTURA = 1F;
    private static final Float UPDATED_ALTURA = 2F;

    @Autowired
    private TiradoresArmarioRepository tiradoresArmarioRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTiradoresArmarioMockMvc;

    private TiradoresArmario tiradoresArmario;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TiradoresArmarioResource tiradoresArmarioResource = new TiradoresArmarioResource(tiradoresArmarioRepository);
        this.restTiradoresArmarioMockMvc = MockMvcBuilders.standaloneSetup(tiradoresArmarioResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TiradoresArmario createEntity(EntityManager em) {
        TiradoresArmario tiradoresArmario = new TiradoresArmario()
            .imagen(DEFAULT_IMAGEN)
            .imagenContentType(DEFAULT_IMAGEN_CONTENT_TYPE)
            .nombre(DEFAULT_NOMBRE)
            .precio(DEFAULT_PRECIO)
            .altura(DEFAULT_ALTURA);
        return tiradoresArmario;
    }

    @Before
    public void initTest() {
        tiradoresArmario = createEntity(em);
    }

    @Test
    @Transactional
    public void createTiradoresArmario() throws Exception {
        int databaseSizeBeforeCreate = tiradoresArmarioRepository.findAll().size();

        // Create the TiradoresArmario
        restTiradoresArmarioMockMvc.perform(post("/api/tiradores-armarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tiradoresArmario)))
            .andExpect(status().isCreated());

        // Validate the TiradoresArmario in the database
        List<TiradoresArmario> tiradoresArmarioList = tiradoresArmarioRepository.findAll();
        assertThat(tiradoresArmarioList).hasSize(databaseSizeBeforeCreate + 1);
        TiradoresArmario testTiradoresArmario = tiradoresArmarioList.get(tiradoresArmarioList.size() - 1);
        assertThat(testTiradoresArmario.getImagen()).isEqualTo(DEFAULT_IMAGEN);
        assertThat(testTiradoresArmario.getImagenContentType()).isEqualTo(DEFAULT_IMAGEN_CONTENT_TYPE);
        assertThat(testTiradoresArmario.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testTiradoresArmario.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testTiradoresArmario.getAltura()).isEqualTo(DEFAULT_ALTURA);
    }

    @Test
    @Transactional
    public void createTiradoresArmarioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tiradoresArmarioRepository.findAll().size();

        // Create the TiradoresArmario with an existing ID
        tiradoresArmario.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTiradoresArmarioMockMvc.perform(post("/api/tiradores-armarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tiradoresArmario)))
            .andExpect(status().isBadRequest());

        // Validate the TiradoresArmario in the database
        List<TiradoresArmario> tiradoresArmarioList = tiradoresArmarioRepository.findAll();
        assertThat(tiradoresArmarioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTiradoresArmarios() throws Exception {
        // Initialize the database
        tiradoresArmarioRepository.saveAndFlush(tiradoresArmario);

        // Get all the tiradoresArmarioList
        restTiradoresArmarioMockMvc.perform(get("/api/tiradores-armarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tiradoresArmario.getId().intValue())))
            .andExpect(jsonPath("$.[*].imagenContentType").value(hasItem(DEFAULT_IMAGEN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN))))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())))
            .andExpect(jsonPath("$.[*].altura").value(hasItem(DEFAULT_ALTURA.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getTiradoresArmario() throws Exception {
        // Initialize the database
        tiradoresArmarioRepository.saveAndFlush(tiradoresArmario);

        // Get the tiradoresArmario
        restTiradoresArmarioMockMvc.perform(get("/api/tiradores-armarios/{id}", tiradoresArmario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tiradoresArmario.getId().intValue()))
            .andExpect(jsonPath("$.imagenContentType").value(DEFAULT_IMAGEN_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagen").value(Base64Utils.encodeToString(DEFAULT_IMAGEN)))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()))
            .andExpect(jsonPath("$.altura").value(DEFAULT_ALTURA.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTiradoresArmario() throws Exception {
        // Get the tiradoresArmario
        restTiradoresArmarioMockMvc.perform(get("/api/tiradores-armarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTiradoresArmario() throws Exception {
        // Initialize the database
        tiradoresArmarioRepository.saveAndFlush(tiradoresArmario);

        int databaseSizeBeforeUpdate = tiradoresArmarioRepository.findAll().size();

        // Update the tiradoresArmario
        TiradoresArmario updatedTiradoresArmario = tiradoresArmarioRepository.findById(tiradoresArmario.getId()).get();
        // Disconnect from session so that the updates on updatedTiradoresArmario are not directly saved in db
        em.detach(updatedTiradoresArmario);
        updatedTiradoresArmario
            .imagen(UPDATED_IMAGEN)
            .imagenContentType(UPDATED_IMAGEN_CONTENT_TYPE)
            .nombre(UPDATED_NOMBRE)
            .precio(UPDATED_PRECIO)
            .altura(UPDATED_ALTURA);

        restTiradoresArmarioMockMvc.perform(put("/api/tiradores-armarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTiradoresArmario)))
            .andExpect(status().isOk());

        // Validate the TiradoresArmario in the database
        List<TiradoresArmario> tiradoresArmarioList = tiradoresArmarioRepository.findAll();
        assertThat(tiradoresArmarioList).hasSize(databaseSizeBeforeUpdate);
        TiradoresArmario testTiradoresArmario = tiradoresArmarioList.get(tiradoresArmarioList.size() - 1);
        assertThat(testTiradoresArmario.getImagen()).isEqualTo(UPDATED_IMAGEN);
        assertThat(testTiradoresArmario.getImagenContentType()).isEqualTo(UPDATED_IMAGEN_CONTENT_TYPE);
        assertThat(testTiradoresArmario.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testTiradoresArmario.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testTiradoresArmario.getAltura()).isEqualTo(UPDATED_ALTURA);
    }

    @Test
    @Transactional
    public void updateNonExistingTiradoresArmario() throws Exception {
        int databaseSizeBeforeUpdate = tiradoresArmarioRepository.findAll().size();

        // Create the TiradoresArmario

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTiradoresArmarioMockMvc.perform(put("/api/tiradores-armarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tiradoresArmario)))
            .andExpect(status().isBadRequest());

        // Validate the TiradoresArmario in the database
        List<TiradoresArmario> tiradoresArmarioList = tiradoresArmarioRepository.findAll();
        assertThat(tiradoresArmarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTiradoresArmario() throws Exception {
        // Initialize the database
        tiradoresArmarioRepository.saveAndFlush(tiradoresArmario);

        int databaseSizeBeforeDelete = tiradoresArmarioRepository.findAll().size();

        // Get the tiradoresArmario
        restTiradoresArmarioMockMvc.perform(delete("/api/tiradores-armarios/{id}", tiradoresArmario.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TiradoresArmario> tiradoresArmarioList = tiradoresArmarioRepository.findAll();
        assertThat(tiradoresArmarioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TiradoresArmario.class);
        TiradoresArmario tiradoresArmario1 = new TiradoresArmario();
        tiradoresArmario1.setId(1L);
        TiradoresArmario tiradoresArmario2 = new TiradoresArmario();
        tiradoresArmario2.setId(tiradoresArmario1.getId());
        assertThat(tiradoresArmario1).isEqualTo(tiradoresArmario2);
        tiradoresArmario2.setId(2L);
        assertThat(tiradoresArmario1).isNotEqualTo(tiradoresArmario2);
        tiradoresArmario1.setId(null);
        assertThat(tiradoresArmario1).isNotEqualTo(tiradoresArmario2);
    }
}
