package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Provincias;
import com.torga.pedidos.repository.ProvinciasRepository;
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
 * Test class for the ProvinciasResource REST controller.
 *
 * @see ProvinciasResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class ProvinciasResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private ProvinciasRepository provinciasRepository;

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

    private MockMvc restProvinciasMockMvc;

    private Provincias provincias;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProvinciasResource provinciasResource = new ProvinciasResource(provinciasRepository);
        this.restProvinciasMockMvc = MockMvcBuilders.standaloneSetup(provinciasResource)
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
    public static Provincias createEntity(EntityManager em) {
        Provincias provincias = new Provincias()
            .nombre(DEFAULT_NOMBRE);
        return provincias;
    }

    @Before
    public void initTest() {
        provincias = createEntity(em);
    }

    @Test
    @Transactional
    public void createProvincias() throws Exception {
        int databaseSizeBeforeCreate = provinciasRepository.findAll().size();

        // Create the Provincias
        restProvinciasMockMvc.perform(post("/api/provincias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(provincias)))
            .andExpect(status().isCreated());

        // Validate the Provincias in the database
        List<Provincias> provinciasList = provinciasRepository.findAll();
        assertThat(provinciasList).hasSize(databaseSizeBeforeCreate + 1);
        Provincias testProvincias = provinciasList.get(provinciasList.size() - 1);
        assertThat(testProvincias.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createProvinciasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = provinciasRepository.findAll().size();

        // Create the Provincias with an existing ID
        provincias.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProvinciasMockMvc.perform(post("/api/provincias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(provincias)))
            .andExpect(status().isBadRequest());

        // Validate the Provincias in the database
        List<Provincias> provinciasList = provinciasRepository.findAll();
        assertThat(provinciasList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProvincias() throws Exception {
        // Initialize the database
        provinciasRepository.saveAndFlush(provincias);

        // Get all the provinciasList
        restProvinciasMockMvc.perform(get("/api/provincias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(provincias.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }
    
    @Test
    @Transactional
    public void getProvincias() throws Exception {
        // Initialize the database
        provinciasRepository.saveAndFlush(provincias);

        // Get the provincias
        restProvinciasMockMvc.perform(get("/api/provincias/{id}", provincias.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(provincias.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProvincias() throws Exception {
        // Get the provincias
        restProvinciasMockMvc.perform(get("/api/provincias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProvincias() throws Exception {
        // Initialize the database
        provinciasRepository.saveAndFlush(provincias);

        int databaseSizeBeforeUpdate = provinciasRepository.findAll().size();

        // Update the provincias
        Provincias updatedProvincias = provinciasRepository.findById(provincias.getId()).get();
        // Disconnect from session so that the updates on updatedProvincias are not directly saved in db
        em.detach(updatedProvincias);
        updatedProvincias
            .nombre(UPDATED_NOMBRE);

        restProvinciasMockMvc.perform(put("/api/provincias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProvincias)))
            .andExpect(status().isOk());

        // Validate the Provincias in the database
        List<Provincias> provinciasList = provinciasRepository.findAll();
        assertThat(provinciasList).hasSize(databaseSizeBeforeUpdate);
        Provincias testProvincias = provinciasList.get(provinciasList.size() - 1);
        assertThat(testProvincias.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingProvincias() throws Exception {
        int databaseSizeBeforeUpdate = provinciasRepository.findAll().size();

        // Create the Provincias

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProvinciasMockMvc.perform(put("/api/provincias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(provincias)))
            .andExpect(status().isBadRequest());

        // Validate the Provincias in the database
        List<Provincias> provinciasList = provinciasRepository.findAll();
        assertThat(provinciasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProvincias() throws Exception {
        // Initialize the database
        provinciasRepository.saveAndFlush(provincias);

        int databaseSizeBeforeDelete = provinciasRepository.findAll().size();

        // Get the provincias
        restProvinciasMockMvc.perform(delete("/api/provincias/{id}", provincias.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Provincias> provinciasList = provinciasRepository.findAll();
        assertThat(provinciasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Provincias.class);
        Provincias provincias1 = new Provincias();
        provincias1.setId(1L);
        Provincias provincias2 = new Provincias();
        provincias2.setId(provincias1.getId());
        assertThat(provincias1).isEqualTo(provincias2);
        provincias2.setId(2L);
        assertThat(provincias1).isNotEqualTo(provincias2);
        provincias1.setId(null);
        assertThat(provincias1).isNotEqualTo(provincias2);
    }
}
