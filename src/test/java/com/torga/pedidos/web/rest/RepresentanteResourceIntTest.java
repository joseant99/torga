package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Representante;
import com.torga.pedidos.repository.RepresentanteRepository;
import com.torga.pedidos.service.RepresentanteService;
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
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.torga.pedidos.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RepresentanteResource REST controller.
 *
 * @see RepresentanteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class RepresentanteResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_USUARIO = "AAAAAAAAAA";
    private static final String UPDATED_USUARIO = "BBBBBBBBBB";

    @Autowired
    private RepresentanteRepository representanteRepository;

    @Autowired
    private RepresentanteService representanteService;

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

    private MockMvc restRepresentanteMockMvc;

    private Representante representante;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RepresentanteResource representanteResource = new RepresentanteResource(representanteService);
        this.restRepresentanteMockMvc = MockMvcBuilders.standaloneSetup(representanteResource)
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
    public static Representante createEntity(EntityManager em) {
        Representante representante = new Representante()
            .nombre(DEFAULT_NOMBRE)
            .usuario(DEFAULT_USUARIO);
        return representante;
    }

    @Before
    public void initTest() {
        representante = createEntity(em);
    }

    @Test
    @Transactional
    public void createRepresentante() throws Exception {
        int databaseSizeBeforeCreate = representanteRepository.findAll().size();

        // Create the Representante
        restRepresentanteMockMvc.perform(post("/api/representantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(representante)))
            .andExpect(status().isCreated());

        // Validate the Representante in the database
        List<Representante> representanteList = representanteRepository.findAll();
        assertThat(representanteList).hasSize(databaseSizeBeforeCreate + 1);
        Representante testRepresentante = representanteList.get(representanteList.size() - 1);
        assertThat(testRepresentante.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testRepresentante.getUsuario()).isEqualTo(DEFAULT_USUARIO);
    }

    @Test
    @Transactional
    public void createRepresentanteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = representanteRepository.findAll().size();

        // Create the Representante with an existing ID
        representante.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRepresentanteMockMvc.perform(post("/api/representantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(representante)))
            .andExpect(status().isBadRequest());

        // Validate the Representante in the database
        List<Representante> representanteList = representanteRepository.findAll();
        assertThat(representanteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = representanteRepository.findAll().size();
        // set the field null
        representante.setNombre(null);

        // Create the Representante, which fails.

        restRepresentanteMockMvc.perform(post("/api/representantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(representante)))
            .andExpect(status().isBadRequest());

        List<Representante> representanteList = representanteRepository.findAll();
        assertThat(representanteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRepresentantes() throws Exception {
        // Initialize the database
        representanteRepository.saveAndFlush(representante);

        // Get all the representanteList
        restRepresentanteMockMvc.perform(get("/api/representantes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(representante.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].usuario").value(hasItem(DEFAULT_USUARIO.toString())));
    }
    
    @Test
    @Transactional
    public void getRepresentante() throws Exception {
        // Initialize the database
        representanteRepository.saveAndFlush(representante);

        // Get the representante
        restRepresentanteMockMvc.perform(get("/api/representantes/{id}", representante.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(representante.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.usuario").value(DEFAULT_USUARIO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRepresentante() throws Exception {
        // Get the representante
        restRepresentanteMockMvc.perform(get("/api/representantes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRepresentante() throws Exception {
        // Initialize the database
        representanteService.save(representante);

        int databaseSizeBeforeUpdate = representanteRepository.findAll().size();

        // Update the representante
        Representante updatedRepresentante = representanteRepository.findById(representante.getId()).get();
        // Disconnect from session so that the updates on updatedRepresentante are not directly saved in db
        em.detach(updatedRepresentante);
        updatedRepresentante
            .nombre(UPDATED_NOMBRE)
            .usuario(UPDATED_USUARIO);

        restRepresentanteMockMvc.perform(put("/api/representantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRepresentante)))
            .andExpect(status().isOk());

        // Validate the Representante in the database
        List<Representante> representanteList = representanteRepository.findAll();
        assertThat(representanteList).hasSize(databaseSizeBeforeUpdate);
        Representante testRepresentante = representanteList.get(representanteList.size() - 1);
        assertThat(testRepresentante.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testRepresentante.getUsuario()).isEqualTo(UPDATED_USUARIO);
    }

    @Test
    @Transactional
    public void updateNonExistingRepresentante() throws Exception {
        int databaseSizeBeforeUpdate = representanteRepository.findAll().size();

        // Create the Representante

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRepresentanteMockMvc.perform(put("/api/representantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(representante)))
            .andExpect(status().isBadRequest());

        // Validate the Representante in the database
        List<Representante> representanteList = representanteRepository.findAll();
        assertThat(representanteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRepresentante() throws Exception {
        // Initialize the database
        representanteService.save(representante);

        int databaseSizeBeforeDelete = representanteRepository.findAll().size();

        // Get the representante
        restRepresentanteMockMvc.perform(delete("/api/representantes/{id}", representante.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Representante> representanteList = representanteRepository.findAll();
        assertThat(representanteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Representante.class);
        Representante representante1 = new Representante();
        representante1.setId(1L);
        Representante representante2 = new Representante();
        representante2.setId(representante1.getId());
        assertThat(representante1).isEqualTo(representante2);
        representante2.setId(2L);
        assertThat(representante1).isNotEqualTo(representante2);
        representante1.setId(null);
        assertThat(representante1).isNotEqualTo(representante2);
    }
}
