package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.RepresenTorga;
import com.torga.pedidos.repository.RepresenTorgaRepository;
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
 * Test class for the RepresenTorgaResource REST controller.
 *
 * @see RepresenTorgaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class RepresenTorgaResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDOS = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDOS = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    @Autowired
    private RepresenTorgaRepository represenTorgaRepository;

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

    private MockMvc restRepresenTorgaMockMvc;

    private RepresenTorga represenTorga;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RepresenTorgaResource represenTorgaResource = new RepresenTorgaResource(represenTorgaRepository);
        this.restRepresenTorgaMockMvc = MockMvcBuilders.standaloneSetup(represenTorgaResource)
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
    public static RepresenTorga createEntity(EntityManager em) {
        RepresenTorga represenTorga = new RepresenTorga()
            .nombre(DEFAULT_NOMBRE)
            .apellidos(DEFAULT_APELLIDOS)
            .email(DEFAULT_EMAIL)
            .telefono(DEFAULT_TELEFONO);
        return represenTorga;
    }

    @Before
    public void initTest() {
        represenTorga = createEntity(em);
    }

    @Test
    @Transactional
    public void createRepresenTorga() throws Exception {
        int databaseSizeBeforeCreate = represenTorgaRepository.findAll().size();

        // Create the RepresenTorga
        restRepresenTorgaMockMvc.perform(post("/api/represen-torgas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(represenTorga)))
            .andExpect(status().isCreated());

        // Validate the RepresenTorga in the database
        List<RepresenTorga> represenTorgaList = represenTorgaRepository.findAll();
        assertThat(represenTorgaList).hasSize(databaseSizeBeforeCreate + 1);
        RepresenTorga testRepresenTorga = represenTorgaList.get(represenTorgaList.size() - 1);
        assertThat(testRepresenTorga.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testRepresenTorga.getApellidos()).isEqualTo(DEFAULT_APELLIDOS);
        assertThat(testRepresenTorga.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testRepresenTorga.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
    }

    @Test
    @Transactional
    public void createRepresenTorgaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = represenTorgaRepository.findAll().size();

        // Create the RepresenTorga with an existing ID
        represenTorga.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRepresenTorgaMockMvc.perform(post("/api/represen-torgas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(represenTorga)))
            .andExpect(status().isBadRequest());

        // Validate the RepresenTorga in the database
        List<RepresenTorga> represenTorgaList = represenTorgaRepository.findAll();
        assertThat(represenTorgaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRepresenTorgas() throws Exception {
        // Initialize the database
        represenTorgaRepository.saveAndFlush(represenTorga);

        // Get all the represenTorgaList
        restRepresenTorgaMockMvc.perform(get("/api/represen-torgas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(represenTorga.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].apellidos").value(hasItem(DEFAULT_APELLIDOS.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())));
    }
    
    @Test
    @Transactional
    public void getRepresenTorga() throws Exception {
        // Initialize the database
        represenTorgaRepository.saveAndFlush(represenTorga);

        // Get the represenTorga
        restRepresenTorgaMockMvc.perform(get("/api/represen-torgas/{id}", represenTorga.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(represenTorga.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.apellidos").value(DEFAULT_APELLIDOS.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRepresenTorga() throws Exception {
        // Get the represenTorga
        restRepresenTorgaMockMvc.perform(get("/api/represen-torgas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRepresenTorga() throws Exception {
        // Initialize the database
        represenTorgaRepository.saveAndFlush(represenTorga);

        int databaseSizeBeforeUpdate = represenTorgaRepository.findAll().size();

        // Update the represenTorga
        RepresenTorga updatedRepresenTorga = represenTorgaRepository.findById(represenTorga.getId()).get();
        // Disconnect from session so that the updates on updatedRepresenTorga are not directly saved in db
        em.detach(updatedRepresenTorga);
        updatedRepresenTorga
            .nombre(UPDATED_NOMBRE)
            .apellidos(UPDATED_APELLIDOS)
            .email(UPDATED_EMAIL)
            .telefono(UPDATED_TELEFONO);

        restRepresenTorgaMockMvc.perform(put("/api/represen-torgas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRepresenTorga)))
            .andExpect(status().isOk());

        // Validate the RepresenTorga in the database
        List<RepresenTorga> represenTorgaList = represenTorgaRepository.findAll();
        assertThat(represenTorgaList).hasSize(databaseSizeBeforeUpdate);
        RepresenTorga testRepresenTorga = represenTorgaList.get(represenTorgaList.size() - 1);
        assertThat(testRepresenTorga.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testRepresenTorga.getApellidos()).isEqualTo(UPDATED_APELLIDOS);
        assertThat(testRepresenTorga.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testRepresenTorga.getTelefono()).isEqualTo(UPDATED_TELEFONO);
    }

    @Test
    @Transactional
    public void updateNonExistingRepresenTorga() throws Exception {
        int databaseSizeBeforeUpdate = represenTorgaRepository.findAll().size();

        // Create the RepresenTorga

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRepresenTorgaMockMvc.perform(put("/api/represen-torgas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(represenTorga)))
            .andExpect(status().isBadRequest());

        // Validate the RepresenTorga in the database
        List<RepresenTorga> represenTorgaList = represenTorgaRepository.findAll();
        assertThat(represenTorgaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRepresenTorga() throws Exception {
        // Initialize the database
        represenTorgaRepository.saveAndFlush(represenTorga);

        int databaseSizeBeforeDelete = represenTorgaRepository.findAll().size();

        // Get the represenTorga
        restRepresenTorgaMockMvc.perform(delete("/api/represen-torgas/{id}", represenTorga.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RepresenTorga> represenTorgaList = represenTorgaRepository.findAll();
        assertThat(represenTorgaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RepresenTorga.class);
        RepresenTorga represenTorga1 = new RepresenTorga();
        represenTorga1.setId(1L);
        RepresenTorga represenTorga2 = new RepresenTorga();
        represenTorga2.setId(represenTorga1.getId());
        assertThat(represenTorga1).isEqualTo(represenTorga2);
        represenTorga2.setId(2L);
        assertThat(represenTorga1).isNotEqualTo(represenTorga2);
        represenTorga1.setId(null);
        assertThat(represenTorga1).isNotEqualTo(represenTorga2);
    }
}
