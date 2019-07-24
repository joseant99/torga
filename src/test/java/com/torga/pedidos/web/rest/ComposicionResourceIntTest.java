package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Composicion;
import com.torga.pedidos.repository.ComposicionRepository;
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
 * Test class for the ComposicionResource REST controller.
 *
 * @see ComposicionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class ComposicionResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGEN = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEN = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGEN_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEN_CONTENT_TYPE = "image/png";

    @Autowired
    private ComposicionRepository composicionRepository;

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

    private MockMvc restComposicionMockMvc;

    private Composicion composicion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComposicionResource composicionResource = new ComposicionResource(composicionRepository);
        this.restComposicionMockMvc = MockMvcBuilders.standaloneSetup(composicionResource)
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
    public static Composicion createEntity(EntityManager em) {
        Composicion composicion = new Composicion()
            .nombre(DEFAULT_NOMBRE)
            .imagen(DEFAULT_IMAGEN)
            .imagenContentType(DEFAULT_IMAGEN_CONTENT_TYPE);
        return composicion;
    }

    @Before
    public void initTest() {
        composicion = createEntity(em);
    }

    @Test
    @Transactional
    public void createComposicion() throws Exception {
        int databaseSizeBeforeCreate = composicionRepository.findAll().size();

        // Create the Composicion
        restComposicionMockMvc.perform(post("/api/composicions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(composicion)))
            .andExpect(status().isCreated());

        // Validate the Composicion in the database
        List<Composicion> composicionList = composicionRepository.findAll();
        assertThat(composicionList).hasSize(databaseSizeBeforeCreate + 1);
        Composicion testComposicion = composicionList.get(composicionList.size() - 1);
        assertThat(testComposicion.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testComposicion.getImagen()).isEqualTo(DEFAULT_IMAGEN);
        assertThat(testComposicion.getImagenContentType()).isEqualTo(DEFAULT_IMAGEN_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createComposicionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = composicionRepository.findAll().size();

        // Create the Composicion with an existing ID
        composicion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComposicionMockMvc.perform(post("/api/composicions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(composicion)))
            .andExpect(status().isBadRequest());

        // Validate the Composicion in the database
        List<Composicion> composicionList = composicionRepository.findAll();
        assertThat(composicionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = composicionRepository.findAll().size();
        // set the field null
        composicion.setNombre(null);

        // Create the Composicion, which fails.

        restComposicionMockMvc.perform(post("/api/composicions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(composicion)))
            .andExpect(status().isBadRequest());

        List<Composicion> composicionList = composicionRepository.findAll();
        assertThat(composicionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllComposicions() throws Exception {
        // Initialize the database
        composicionRepository.saveAndFlush(composicion);

        // Get all the composicionList
        restComposicionMockMvc.perform(get("/api/composicions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(composicion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].imagenContentType").value(hasItem(DEFAULT_IMAGEN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN))));
    }
    
    @Test
    @Transactional
    public void getComposicion() throws Exception {
        // Initialize the database
        composicionRepository.saveAndFlush(composicion);

        // Get the composicion
        restComposicionMockMvc.perform(get("/api/composicions/{id}", composicion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(composicion.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.imagenContentType").value(DEFAULT_IMAGEN_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagen").value(Base64Utils.encodeToString(DEFAULT_IMAGEN)));
    }

    @Test
    @Transactional
    public void getNonExistingComposicion() throws Exception {
        // Get the composicion
        restComposicionMockMvc.perform(get("/api/composicions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComposicion() throws Exception {
        // Initialize the database
        composicionRepository.saveAndFlush(composicion);

        int databaseSizeBeforeUpdate = composicionRepository.findAll().size();

        // Update the composicion
        Composicion updatedComposicion = composicionRepository.findById(composicion.getId()).get();
        // Disconnect from session so that the updates on updatedComposicion are not directly saved in db
        em.detach(updatedComposicion);
        updatedComposicion
            .nombre(UPDATED_NOMBRE)
            .imagen(UPDATED_IMAGEN)
            .imagenContentType(UPDATED_IMAGEN_CONTENT_TYPE);

        restComposicionMockMvc.perform(put("/api/composicions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedComposicion)))
            .andExpect(status().isOk());

        // Validate the Composicion in the database
        List<Composicion> composicionList = composicionRepository.findAll();
        assertThat(composicionList).hasSize(databaseSizeBeforeUpdate);
        Composicion testComposicion = composicionList.get(composicionList.size() - 1);
        assertThat(testComposicion.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testComposicion.getImagen()).isEqualTo(UPDATED_IMAGEN);
        assertThat(testComposicion.getImagenContentType()).isEqualTo(UPDATED_IMAGEN_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingComposicion() throws Exception {
        int databaseSizeBeforeUpdate = composicionRepository.findAll().size();

        // Create the Composicion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restComposicionMockMvc.perform(put("/api/composicions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(composicion)))
            .andExpect(status().isBadRequest());

        // Validate the Composicion in the database
        List<Composicion> composicionList = composicionRepository.findAll();
        assertThat(composicionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteComposicion() throws Exception {
        // Initialize the database
        composicionRepository.saveAndFlush(composicion);

        int databaseSizeBeforeDelete = composicionRepository.findAll().size();

        // Get the composicion
        restComposicionMockMvc.perform(delete("/api/composicions/{id}", composicion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Composicion> composicionList = composicionRepository.findAll();
        assertThat(composicionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Composicion.class);
        Composicion composicion1 = new Composicion();
        composicion1.setId(1L);
        Composicion composicion2 = new Composicion();
        composicion2.setId(composicion1.getId());
        assertThat(composicion1).isEqualTo(composicion2);
        composicion2.setId(2L);
        assertThat(composicion1).isNotEqualTo(composicion2);
        composicion1.setId(null);
        assertThat(composicion1).isNotEqualTo(composicion2);
    }
}
