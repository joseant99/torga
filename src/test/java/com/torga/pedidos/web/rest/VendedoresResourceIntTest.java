package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Vendedores;
import com.torga.pedidos.repository.VendedoresRepository;
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
 * Test class for the VendedoresResource REST controller.
 *
 * @see VendedoresResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class VendedoresResourceIntTest {

    @Autowired
    private VendedoresRepository vendedoresRepository;

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

    private MockMvc restVendedoresMockMvc;

    private Vendedores vendedores;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VendedoresResource vendedoresResource = new VendedoresResource(vendedoresRepository);
        this.restVendedoresMockMvc = MockMvcBuilders.standaloneSetup(vendedoresResource)
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
    public static Vendedores createEntity(EntityManager em) {
        Vendedores vendedores = new Vendedores();
        return vendedores;
    }

    @Before
    public void initTest() {
        vendedores = createEntity(em);
    }

    @Test
    @Transactional
    public void createVendedores() throws Exception {
        int databaseSizeBeforeCreate = vendedoresRepository.findAll().size();

        // Create the Vendedores
        restVendedoresMockMvc.perform(post("/api/vendedores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendedores)))
            .andExpect(status().isCreated());

        // Validate the Vendedores in the database
        List<Vendedores> vendedoresList = vendedoresRepository.findAll();
        assertThat(vendedoresList).hasSize(databaseSizeBeforeCreate + 1);
        Vendedores testVendedores = vendedoresList.get(vendedoresList.size() - 1);
    }

    @Test
    @Transactional
    public void createVendedoresWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vendedoresRepository.findAll().size();

        // Create the Vendedores with an existing ID
        vendedores.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVendedoresMockMvc.perform(post("/api/vendedores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendedores)))
            .andExpect(status().isBadRequest());

        // Validate the Vendedores in the database
        List<Vendedores> vendedoresList = vendedoresRepository.findAll();
        assertThat(vendedoresList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllVendedores() throws Exception {
        // Initialize the database
        vendedoresRepository.saveAndFlush(vendedores);

        // Get all the vendedoresList
        restVendedoresMockMvc.perform(get("/api/vendedores?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vendedores.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getVendedores() throws Exception {
        // Initialize the database
        vendedoresRepository.saveAndFlush(vendedores);

        // Get the vendedores
        restVendedoresMockMvc.perform(get("/api/vendedores/{id}", vendedores.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vendedores.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingVendedores() throws Exception {
        // Get the vendedores
        restVendedoresMockMvc.perform(get("/api/vendedores/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVendedores() throws Exception {
        // Initialize the database
        vendedoresRepository.saveAndFlush(vendedores);

        int databaseSizeBeforeUpdate = vendedoresRepository.findAll().size();

        // Update the vendedores
        Vendedores updatedVendedores = vendedoresRepository.findById(vendedores.getId()).get();
        // Disconnect from session so that the updates on updatedVendedores are not directly saved in db
        em.detach(updatedVendedores);

        restVendedoresMockMvc.perform(put("/api/vendedores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVendedores)))
            .andExpect(status().isOk());

        // Validate the Vendedores in the database
        List<Vendedores> vendedoresList = vendedoresRepository.findAll();
        assertThat(vendedoresList).hasSize(databaseSizeBeforeUpdate);
        Vendedores testVendedores = vendedoresList.get(vendedoresList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingVendedores() throws Exception {
        int databaseSizeBeforeUpdate = vendedoresRepository.findAll().size();

        // Create the Vendedores

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVendedoresMockMvc.perform(put("/api/vendedores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendedores)))
            .andExpect(status().isBadRequest());

        // Validate the Vendedores in the database
        List<Vendedores> vendedoresList = vendedoresRepository.findAll();
        assertThat(vendedoresList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVendedores() throws Exception {
        // Initialize the database
        vendedoresRepository.saveAndFlush(vendedores);

        int databaseSizeBeforeDelete = vendedoresRepository.findAll().size();

        // Get the vendedores
        restVendedoresMockMvc.perform(delete("/api/vendedores/{id}", vendedores.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Vendedores> vendedoresList = vendedoresRepository.findAll();
        assertThat(vendedoresList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vendedores.class);
        Vendedores vendedores1 = new Vendedores();
        vendedores1.setId(1L);
        Vendedores vendedores2 = new Vendedores();
        vendedores2.setId(vendedores1.getId());
        assertThat(vendedores1).isEqualTo(vendedores2);
        vendedores2.setId(2L);
        assertThat(vendedores1).isNotEqualTo(vendedores2);
        vendedores1.setId(null);
        assertThat(vendedores1).isNotEqualTo(vendedores2);
    }
}
