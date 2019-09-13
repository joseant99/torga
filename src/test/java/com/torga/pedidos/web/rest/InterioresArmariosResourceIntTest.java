package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.InterioresArmarios;
import com.torga.pedidos.repository.InterioresArmariosRepository;
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
 * Test class for the InterioresArmariosResource REST controller.
 *
 * @see InterioresArmariosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class InterioresArmariosResourceIntTest {

    private static final Float DEFAULT_ANCHO = 1F;
    private static final Float UPDATED_ANCHO = 2F;

    private static final Float DEFAULT_ALTO = 1F;
    private static final Float UPDATED_ALTO = 2F;

    private static final Float DEFAULT_FONDO = 1F;
    private static final Float UPDATED_FONDO = 2F;

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    private static final byte[] DEFAULT_IMAGEN = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEN = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGEN_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEN_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_MENSAJE = "AAAAAAAAAA";
    private static final String UPDATED_MENSAJE = "BBBBBBBBBB";

    @Autowired
    private InterioresArmariosRepository interioresArmariosRepository;

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

    private MockMvc restInterioresArmariosMockMvc;

    private InterioresArmarios interioresArmarios;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InterioresArmariosResource interioresArmariosResource = new InterioresArmariosResource(interioresArmariosRepository);
        this.restInterioresArmariosMockMvc = MockMvcBuilders.standaloneSetup(interioresArmariosResource)
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
    public static InterioresArmarios createEntity(EntityManager em) {
        InterioresArmarios interioresArmarios = new InterioresArmarios()
            .ancho(DEFAULT_ANCHO)
            .alto(DEFAULT_ALTO)
            .fondo(DEFAULT_FONDO)
            .precio(DEFAULT_PRECIO)
            .imagen(DEFAULT_IMAGEN)
            .imagenContentType(DEFAULT_IMAGEN_CONTENT_TYPE)
            .mensaje(DEFAULT_MENSAJE);
        return interioresArmarios;
    }

    @Before
    public void initTest() {
        interioresArmarios = createEntity(em);
    }

    @Test
    @Transactional
    public void createInterioresArmarios() throws Exception {
        int databaseSizeBeforeCreate = interioresArmariosRepository.findAll().size();

        // Create the InterioresArmarios
        restInterioresArmariosMockMvc.perform(post("/api/interiores-armarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interioresArmarios)))
            .andExpect(status().isCreated());

        // Validate the InterioresArmarios in the database
        List<InterioresArmarios> interioresArmariosList = interioresArmariosRepository.findAll();
        assertThat(interioresArmariosList).hasSize(databaseSizeBeforeCreate + 1);
        InterioresArmarios testInterioresArmarios = interioresArmariosList.get(interioresArmariosList.size() - 1);
        assertThat(testInterioresArmarios.getAncho()).isEqualTo(DEFAULT_ANCHO);
        assertThat(testInterioresArmarios.getAlto()).isEqualTo(DEFAULT_ALTO);
        assertThat(testInterioresArmarios.getFondo()).isEqualTo(DEFAULT_FONDO);
        assertThat(testInterioresArmarios.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testInterioresArmarios.getImagen()).isEqualTo(DEFAULT_IMAGEN);
        assertThat(testInterioresArmarios.getImagenContentType()).isEqualTo(DEFAULT_IMAGEN_CONTENT_TYPE);
        assertThat(testInterioresArmarios.getMensaje()).isEqualTo(DEFAULT_MENSAJE);
    }

    @Test
    @Transactional
    public void createInterioresArmariosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = interioresArmariosRepository.findAll().size();

        // Create the InterioresArmarios with an existing ID
        interioresArmarios.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInterioresArmariosMockMvc.perform(post("/api/interiores-armarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interioresArmarios)))
            .andExpect(status().isBadRequest());

        // Validate the InterioresArmarios in the database
        List<InterioresArmarios> interioresArmariosList = interioresArmariosRepository.findAll();
        assertThat(interioresArmariosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInterioresArmarios() throws Exception {
        // Initialize the database
        interioresArmariosRepository.saveAndFlush(interioresArmarios);

        // Get all the interioresArmariosList
        restInterioresArmariosMockMvc.perform(get("/api/interiores-armarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(interioresArmarios.getId().intValue())))
            .andExpect(jsonPath("$.[*].ancho").value(hasItem(DEFAULT_ANCHO.doubleValue())))
            .andExpect(jsonPath("$.[*].alto").value(hasItem(DEFAULT_ALTO.doubleValue())))
            .andExpect(jsonPath("$.[*].fondo").value(hasItem(DEFAULT_FONDO.doubleValue())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())))
            .andExpect(jsonPath("$.[*].imagenContentType").value(hasItem(DEFAULT_IMAGEN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN))))
            .andExpect(jsonPath("$.[*].mensaje").value(hasItem(DEFAULT_MENSAJE.toString())));
    }
    
    @Test
    @Transactional
    public void getInterioresArmarios() throws Exception {
        // Initialize the database
        interioresArmariosRepository.saveAndFlush(interioresArmarios);

        // Get the interioresArmarios
        restInterioresArmariosMockMvc.perform(get("/api/interiores-armarios/{id}", interioresArmarios.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(interioresArmarios.getId().intValue()))
            .andExpect(jsonPath("$.ancho").value(DEFAULT_ANCHO.doubleValue()))
            .andExpect(jsonPath("$.alto").value(DEFAULT_ALTO.doubleValue()))
            .andExpect(jsonPath("$.fondo").value(DEFAULT_FONDO.doubleValue()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()))
            .andExpect(jsonPath("$.imagenContentType").value(DEFAULT_IMAGEN_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagen").value(Base64Utils.encodeToString(DEFAULT_IMAGEN)))
            .andExpect(jsonPath("$.mensaje").value(DEFAULT_MENSAJE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInterioresArmarios() throws Exception {
        // Get the interioresArmarios
        restInterioresArmariosMockMvc.perform(get("/api/interiores-armarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInterioresArmarios() throws Exception {
        // Initialize the database
        interioresArmariosRepository.saveAndFlush(interioresArmarios);

        int databaseSizeBeforeUpdate = interioresArmariosRepository.findAll().size();

        // Update the interioresArmarios
        InterioresArmarios updatedInterioresArmarios = interioresArmariosRepository.findById(interioresArmarios.getId()).get();
        // Disconnect from session so that the updates on updatedInterioresArmarios are not directly saved in db
        em.detach(updatedInterioresArmarios);
        updatedInterioresArmarios
            .ancho(UPDATED_ANCHO)
            .alto(UPDATED_ALTO)
            .fondo(UPDATED_FONDO)
            .precio(UPDATED_PRECIO)
            .imagen(UPDATED_IMAGEN)
            .imagenContentType(UPDATED_IMAGEN_CONTENT_TYPE)
            .mensaje(UPDATED_MENSAJE);

        restInterioresArmariosMockMvc.perform(put("/api/interiores-armarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInterioresArmarios)))
            .andExpect(status().isOk());

        // Validate the InterioresArmarios in the database
        List<InterioresArmarios> interioresArmariosList = interioresArmariosRepository.findAll();
        assertThat(interioresArmariosList).hasSize(databaseSizeBeforeUpdate);
        InterioresArmarios testInterioresArmarios = interioresArmariosList.get(interioresArmariosList.size() - 1);
        assertThat(testInterioresArmarios.getAncho()).isEqualTo(UPDATED_ANCHO);
        assertThat(testInterioresArmarios.getAlto()).isEqualTo(UPDATED_ALTO);
        assertThat(testInterioresArmarios.getFondo()).isEqualTo(UPDATED_FONDO);
        assertThat(testInterioresArmarios.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testInterioresArmarios.getImagen()).isEqualTo(UPDATED_IMAGEN);
        assertThat(testInterioresArmarios.getImagenContentType()).isEqualTo(UPDATED_IMAGEN_CONTENT_TYPE);
        assertThat(testInterioresArmarios.getMensaje()).isEqualTo(UPDATED_MENSAJE);
    }

    @Test
    @Transactional
    public void updateNonExistingInterioresArmarios() throws Exception {
        int databaseSizeBeforeUpdate = interioresArmariosRepository.findAll().size();

        // Create the InterioresArmarios

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInterioresArmariosMockMvc.perform(put("/api/interiores-armarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interioresArmarios)))
            .andExpect(status().isBadRequest());

        // Validate the InterioresArmarios in the database
        List<InterioresArmarios> interioresArmariosList = interioresArmariosRepository.findAll();
        assertThat(interioresArmariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInterioresArmarios() throws Exception {
        // Initialize the database
        interioresArmariosRepository.saveAndFlush(interioresArmarios);

        int databaseSizeBeforeDelete = interioresArmariosRepository.findAll().size();

        // Get the interioresArmarios
        restInterioresArmariosMockMvc.perform(delete("/api/interiores-armarios/{id}", interioresArmarios.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<InterioresArmarios> interioresArmariosList = interioresArmariosRepository.findAll();
        assertThat(interioresArmariosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InterioresArmarios.class);
        InterioresArmarios interioresArmarios1 = new InterioresArmarios();
        interioresArmarios1.setId(1L);
        InterioresArmarios interioresArmarios2 = new InterioresArmarios();
        interioresArmarios2.setId(interioresArmarios1.getId());
        assertThat(interioresArmarios1).isEqualTo(interioresArmarios2);
        interioresArmarios2.setId(2L);
        assertThat(interioresArmarios1).isNotEqualTo(interioresArmarios2);
        interioresArmarios1.setId(null);
        assertThat(interioresArmarios1).isNotEqualTo(interioresArmarios2);
    }
}
