package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Niveladores;
import com.torga.pedidos.repository.NiveladoresRepository;
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
 * Test class for the NiveladoresResource REST controller.
 *
 * @see NiveladoresResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class NiveladoresResourceIntTest {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    private static final Float DEFAULT_PILOTO = 1F;
    private static final Float UPDATED_PILOTO = 2F;

    @Autowired
    private NiveladoresRepository niveladoresRepository;

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

    private MockMvc restNiveladoresMockMvc;

    private Niveladores niveladores;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NiveladoresResource niveladoresResource = new NiveladoresResource(niveladoresRepository);
        this.restNiveladoresMockMvc = MockMvcBuilders.standaloneSetup(niveladoresResource)
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
    public static Niveladores createEntity(EntityManager em) {
        Niveladores niveladores = new Niveladores()
            .codigo(DEFAULT_CODIGO)
            .precio(DEFAULT_PRECIO)
            .piloto(DEFAULT_PILOTO);
        return niveladores;
    }

    @Before
    public void initTest() {
        niveladores = createEntity(em);
    }

    @Test
    @Transactional
    public void createNiveladores() throws Exception {
        int databaseSizeBeforeCreate = niveladoresRepository.findAll().size();

        // Create the Niveladores
        restNiveladoresMockMvc.perform(post("/api/niveladores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(niveladores)))
            .andExpect(status().isCreated());

        // Validate the Niveladores in the database
        List<Niveladores> niveladoresList = niveladoresRepository.findAll();
        assertThat(niveladoresList).hasSize(databaseSizeBeforeCreate + 1);
        Niveladores testNiveladores = niveladoresList.get(niveladoresList.size() - 1);
        assertThat(testNiveladores.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testNiveladores.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testNiveladores.getPiloto()).isEqualTo(DEFAULT_PILOTO);
    }

    @Test
    @Transactional
    public void createNiveladoresWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = niveladoresRepository.findAll().size();

        // Create the Niveladores with an existing ID
        niveladores.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNiveladoresMockMvc.perform(post("/api/niveladores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(niveladores)))
            .andExpect(status().isBadRequest());

        // Validate the Niveladores in the database
        List<Niveladores> niveladoresList = niveladoresRepository.findAll();
        assertThat(niveladoresList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllNiveladores() throws Exception {
        // Initialize the database
        niveladoresRepository.saveAndFlush(niveladores);

        // Get all the niveladoresList
        restNiveladoresMockMvc.perform(get("/api/niveladores?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(niveladores.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())))
            .andExpect(jsonPath("$.[*].piloto").value(hasItem(DEFAULT_PILOTO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getNiveladores() throws Exception {
        // Initialize the database
        niveladoresRepository.saveAndFlush(niveladores);

        // Get the niveladores
        restNiveladoresMockMvc.perform(get("/api/niveladores/{id}", niveladores.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(niveladores.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()))
            .andExpect(jsonPath("$.piloto").value(DEFAULT_PILOTO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingNiveladores() throws Exception {
        // Get the niveladores
        restNiveladoresMockMvc.perform(get("/api/niveladores/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNiveladores() throws Exception {
        // Initialize the database
        niveladoresRepository.saveAndFlush(niveladores);

        int databaseSizeBeforeUpdate = niveladoresRepository.findAll().size();

        // Update the niveladores
        Niveladores updatedNiveladores = niveladoresRepository.findById(niveladores.getId()).get();
        // Disconnect from session so that the updates on updatedNiveladores are not directly saved in db
        em.detach(updatedNiveladores);
        updatedNiveladores
            .codigo(UPDATED_CODIGO)
            .precio(UPDATED_PRECIO)
            .piloto(UPDATED_PILOTO);

        restNiveladoresMockMvc.perform(put("/api/niveladores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNiveladores)))
            .andExpect(status().isOk());

        // Validate the Niveladores in the database
        List<Niveladores> niveladoresList = niveladoresRepository.findAll();
        assertThat(niveladoresList).hasSize(databaseSizeBeforeUpdate);
        Niveladores testNiveladores = niveladoresList.get(niveladoresList.size() - 1);
        assertThat(testNiveladores.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testNiveladores.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testNiveladores.getPiloto()).isEqualTo(UPDATED_PILOTO);
    }

    @Test
    @Transactional
    public void updateNonExistingNiveladores() throws Exception {
        int databaseSizeBeforeUpdate = niveladoresRepository.findAll().size();

        // Create the Niveladores

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNiveladoresMockMvc.perform(put("/api/niveladores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(niveladores)))
            .andExpect(status().isBadRequest());

        // Validate the Niveladores in the database
        List<Niveladores> niveladoresList = niveladoresRepository.findAll();
        assertThat(niveladoresList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNiveladores() throws Exception {
        // Initialize the database
        niveladoresRepository.saveAndFlush(niveladores);

        int databaseSizeBeforeDelete = niveladoresRepository.findAll().size();

        // Get the niveladores
        restNiveladoresMockMvc.perform(delete("/api/niveladores/{id}", niveladores.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Niveladores> niveladoresList = niveladoresRepository.findAll();
        assertThat(niveladoresList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Niveladores.class);
        Niveladores niveladores1 = new Niveladores();
        niveladores1.setId(1L);
        Niveladores niveladores2 = new Niveladores();
        niveladores2.setId(niveladores1.getId());
        assertThat(niveladores1).isEqualTo(niveladores2);
        niveladores2.setId(2L);
        assertThat(niveladores1).isNotEqualTo(niveladores2);
        niveladores1.setId(null);
        assertThat(niveladores1).isNotEqualTo(niveladores2);
    }
}
