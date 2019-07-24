package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Acabados;
import com.torga.pedidos.repository.AcabadosRepository;
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
 * Test class for the AcabadosResource REST controller.
 *
 * @see AcabadosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class AcabadosResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    private static final byte[] DEFAULT_IMAGEN_FONDO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEN_FONDO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGEN_FONDO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEN_FONDO_CONTENT_TYPE = "image/png";

    @Autowired
    private AcabadosRepository acabadosRepository;

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

    private MockMvc restAcabadosMockMvc;

    private Acabados acabados;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AcabadosResource acabadosResource = new AcabadosResource(acabadosRepository);
        this.restAcabadosMockMvc = MockMvcBuilders.standaloneSetup(acabadosResource)
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
    public static Acabados createEntity(EntityManager em) {
        Acabados acabados = new Acabados()
            .nombre(DEFAULT_NOMBRE)
            .precio(DEFAULT_PRECIO)
            .imagenFondo(DEFAULT_IMAGEN_FONDO)
            .imagenFondoContentType(DEFAULT_IMAGEN_FONDO_CONTENT_TYPE);
        return acabados;
    }

    @Before
    public void initTest() {
        acabados = createEntity(em);
    }

    @Test
    @Transactional
    public void createAcabados() throws Exception {
        int databaseSizeBeforeCreate = acabadosRepository.findAll().size();

        // Create the Acabados
        restAcabadosMockMvc.perform(post("/api/acabados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acabados)))
            .andExpect(status().isCreated());

        // Validate the Acabados in the database
        List<Acabados> acabadosList = acabadosRepository.findAll();
        assertThat(acabadosList).hasSize(databaseSizeBeforeCreate + 1);
        Acabados testAcabados = acabadosList.get(acabadosList.size() - 1);
        assertThat(testAcabados.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testAcabados.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testAcabados.getImagenFondo()).isEqualTo(DEFAULT_IMAGEN_FONDO);
        assertThat(testAcabados.getImagenFondoContentType()).isEqualTo(DEFAULT_IMAGEN_FONDO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createAcabadosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = acabadosRepository.findAll().size();

        // Create the Acabados with an existing ID
        acabados.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcabadosMockMvc.perform(post("/api/acabados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acabados)))
            .andExpect(status().isBadRequest());

        // Validate the Acabados in the database
        List<Acabados> acabadosList = acabadosRepository.findAll();
        assertThat(acabadosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = acabadosRepository.findAll().size();
        // set the field null
        acabados.setNombre(null);

        // Create the Acabados, which fails.

        restAcabadosMockMvc.perform(post("/api/acabados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acabados)))
            .andExpect(status().isBadRequest());

        List<Acabados> acabadosList = acabadosRepository.findAll();
        assertThat(acabadosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrecioIsRequired() throws Exception {
        int databaseSizeBeforeTest = acabadosRepository.findAll().size();
        // set the field null
        acabados.setPrecio(null);

        // Create the Acabados, which fails.

        restAcabadosMockMvc.perform(post("/api/acabados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acabados)))
            .andExpect(status().isBadRequest());

        List<Acabados> acabadosList = acabadosRepository.findAll();
        assertThat(acabadosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAcabados() throws Exception {
        // Initialize the database
        acabadosRepository.saveAndFlush(acabados);

        // Get all the acabadosList
        restAcabadosMockMvc.perform(get("/api/acabados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(acabados.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())))
            .andExpect(jsonPath("$.[*].imagenFondoContentType").value(hasItem(DEFAULT_IMAGEN_FONDO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagenFondo").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN_FONDO))));
    }
    
    @Test
    @Transactional
    public void getAcabados() throws Exception {
        // Initialize the database
        acabadosRepository.saveAndFlush(acabados);

        // Get the acabados
        restAcabadosMockMvc.perform(get("/api/acabados/{id}", acabados.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(acabados.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()))
            .andExpect(jsonPath("$.imagenFondoContentType").value(DEFAULT_IMAGEN_FONDO_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagenFondo").value(Base64Utils.encodeToString(DEFAULT_IMAGEN_FONDO)));
    }

    @Test
    @Transactional
    public void getNonExistingAcabados() throws Exception {
        // Get the acabados
        restAcabadosMockMvc.perform(get("/api/acabados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAcabados() throws Exception {
        // Initialize the database
        acabadosRepository.saveAndFlush(acabados);

        int databaseSizeBeforeUpdate = acabadosRepository.findAll().size();

        // Update the acabados
        Acabados updatedAcabados = acabadosRepository.findById(acabados.getId()).get();
        // Disconnect from session so that the updates on updatedAcabados are not directly saved in db
        em.detach(updatedAcabados);
        updatedAcabados
            .nombre(UPDATED_NOMBRE)
            .precio(UPDATED_PRECIO)
            .imagenFondo(UPDATED_IMAGEN_FONDO)
            .imagenFondoContentType(UPDATED_IMAGEN_FONDO_CONTENT_TYPE);

        restAcabadosMockMvc.perform(put("/api/acabados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAcabados)))
            .andExpect(status().isOk());

        // Validate the Acabados in the database
        List<Acabados> acabadosList = acabadosRepository.findAll();
        assertThat(acabadosList).hasSize(databaseSizeBeforeUpdate);
        Acabados testAcabados = acabadosList.get(acabadosList.size() - 1);
        assertThat(testAcabados.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testAcabados.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testAcabados.getImagenFondo()).isEqualTo(UPDATED_IMAGEN_FONDO);
        assertThat(testAcabados.getImagenFondoContentType()).isEqualTo(UPDATED_IMAGEN_FONDO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingAcabados() throws Exception {
        int databaseSizeBeforeUpdate = acabadosRepository.findAll().size();

        // Create the Acabados

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAcabadosMockMvc.perform(put("/api/acabados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acabados)))
            .andExpect(status().isBadRequest());

        // Validate the Acabados in the database
        List<Acabados> acabadosList = acabadosRepository.findAll();
        assertThat(acabadosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAcabados() throws Exception {
        // Initialize the database
        acabadosRepository.saveAndFlush(acabados);

        int databaseSizeBeforeDelete = acabadosRepository.findAll().size();

        // Get the acabados
        restAcabadosMockMvc.perform(delete("/api/acabados/{id}", acabados.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Acabados> acabadosList = acabadosRepository.findAll();
        assertThat(acabadosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Acabados.class);
        Acabados acabados1 = new Acabados();
        acabados1.setId(1L);
        Acabados acabados2 = new Acabados();
        acabados2.setId(acabados1.getId());
        assertThat(acabados1).isEqualTo(acabados2);
        acabados2.setId(2L);
        assertThat(acabados1).isNotEqualTo(acabados2);
        acabados1.setId(null);
        assertThat(acabados1).isNotEqualTo(acabados2);
    }
}
