package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.ReferenciaClientes;
import com.torga.pedidos.repository.ReferenciaClientesRepository;
import com.torga.pedidos.service.ReferenciaClientesService;
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
 * Test class for the ReferenciaClientesResource REST controller.
 *
 * @see ReferenciaClientesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class ReferenciaClientesResourceIntTest {

    private static final String DEFAULT_REFERENCIA_CLIENTE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCIA_CLIENTE = "BBBBBBBBBB";

    @Autowired
    private ReferenciaClientesRepository referenciaClientesRepository;

    @Autowired
    private ReferenciaClientesService referenciaClientesService;

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

    private MockMvc restReferenciaClientesMockMvc;

    private ReferenciaClientes referenciaClientes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReferenciaClientesResource referenciaClientesResource = new ReferenciaClientesResource(referenciaClientesService);
        this.restReferenciaClientesMockMvc = MockMvcBuilders.standaloneSetup(referenciaClientesResource)
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
    public static ReferenciaClientes createEntity(EntityManager em) {
        ReferenciaClientes referenciaClientes = new ReferenciaClientes()
            .referenciaCliente(DEFAULT_REFERENCIA_CLIENTE);
        return referenciaClientes;
    }

    @Before
    public void initTest() {
        referenciaClientes = createEntity(em);
    }

    @Test
    @Transactional
    public void createReferenciaClientes() throws Exception {
        int databaseSizeBeforeCreate = referenciaClientesRepository.findAll().size();

        // Create the ReferenciaClientes
        restReferenciaClientesMockMvc.perform(post("/api/referencia-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referenciaClientes)))
            .andExpect(status().isCreated());

        // Validate the ReferenciaClientes in the database
        List<ReferenciaClientes> referenciaClientesList = referenciaClientesRepository.findAll();
        assertThat(referenciaClientesList).hasSize(databaseSizeBeforeCreate + 1);
        ReferenciaClientes testReferenciaClientes = referenciaClientesList.get(referenciaClientesList.size() - 1);
        assertThat(testReferenciaClientes.getReferenciaCliente()).isEqualTo(DEFAULT_REFERENCIA_CLIENTE);
    }

    @Test
    @Transactional
    public void createReferenciaClientesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = referenciaClientesRepository.findAll().size();

        // Create the ReferenciaClientes with an existing ID
        referenciaClientes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReferenciaClientesMockMvc.perform(post("/api/referencia-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referenciaClientes)))
            .andExpect(status().isBadRequest());

        // Validate the ReferenciaClientes in the database
        List<ReferenciaClientes> referenciaClientesList = referenciaClientesRepository.findAll();
        assertThat(referenciaClientesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkReferenciaClienteIsRequired() throws Exception {
        int databaseSizeBeforeTest = referenciaClientesRepository.findAll().size();
        // set the field null
        referenciaClientes.setReferenciaCliente(null);

        // Create the ReferenciaClientes, which fails.

        restReferenciaClientesMockMvc.perform(post("/api/referencia-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referenciaClientes)))
            .andExpect(status().isBadRequest());

        List<ReferenciaClientes> referenciaClientesList = referenciaClientesRepository.findAll();
        assertThat(referenciaClientesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReferenciaClientes() throws Exception {
        // Initialize the database
        referenciaClientesRepository.saveAndFlush(referenciaClientes);

        // Get all the referenciaClientesList
        restReferenciaClientesMockMvc.perform(get("/api/referencia-clientes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(referenciaClientes.getId().intValue())))
            .andExpect(jsonPath("$.[*].referenciaCliente").value(hasItem(DEFAULT_REFERENCIA_CLIENTE.toString())));
    }
    
    @Test
    @Transactional
    public void getReferenciaClientes() throws Exception {
        // Initialize the database
        referenciaClientesRepository.saveAndFlush(referenciaClientes);

        // Get the referenciaClientes
        restReferenciaClientesMockMvc.perform(get("/api/referencia-clientes/{id}", referenciaClientes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(referenciaClientes.getId().intValue()))
            .andExpect(jsonPath("$.referenciaCliente").value(DEFAULT_REFERENCIA_CLIENTE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReferenciaClientes() throws Exception {
        // Get the referenciaClientes
        restReferenciaClientesMockMvc.perform(get("/api/referencia-clientes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReferenciaClientes() throws Exception {
        // Initialize the database
        referenciaClientesService.save(referenciaClientes);

        int databaseSizeBeforeUpdate = referenciaClientesRepository.findAll().size();

        // Update the referenciaClientes
        ReferenciaClientes updatedReferenciaClientes = referenciaClientesRepository.findById(referenciaClientes.getId()).get();
        // Disconnect from session so that the updates on updatedReferenciaClientes are not directly saved in db
        em.detach(updatedReferenciaClientes);
        updatedReferenciaClientes
            .referenciaCliente(UPDATED_REFERENCIA_CLIENTE);

        restReferenciaClientesMockMvc.perform(put("/api/referencia-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReferenciaClientes)))
            .andExpect(status().isOk());

        // Validate the ReferenciaClientes in the database
        List<ReferenciaClientes> referenciaClientesList = referenciaClientesRepository.findAll();
        assertThat(referenciaClientesList).hasSize(databaseSizeBeforeUpdate);
        ReferenciaClientes testReferenciaClientes = referenciaClientesList.get(referenciaClientesList.size() - 1);
        assertThat(testReferenciaClientes.getReferenciaCliente()).isEqualTo(UPDATED_REFERENCIA_CLIENTE);
    }

    @Test
    @Transactional
    public void updateNonExistingReferenciaClientes() throws Exception {
        int databaseSizeBeforeUpdate = referenciaClientesRepository.findAll().size();

        // Create the ReferenciaClientes

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReferenciaClientesMockMvc.perform(put("/api/referencia-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referenciaClientes)))
            .andExpect(status().isBadRequest());

        // Validate the ReferenciaClientes in the database
        List<ReferenciaClientes> referenciaClientesList = referenciaClientesRepository.findAll();
        assertThat(referenciaClientesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReferenciaClientes() throws Exception {
        // Initialize the database
        referenciaClientesService.save(referenciaClientes);

        int databaseSizeBeforeDelete = referenciaClientesRepository.findAll().size();

        // Get the referenciaClientes
        restReferenciaClientesMockMvc.perform(delete("/api/referencia-clientes/{id}", referenciaClientes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReferenciaClientes> referenciaClientesList = referenciaClientesRepository.findAll();
        assertThat(referenciaClientesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReferenciaClientes.class);
        ReferenciaClientes referenciaClientes1 = new ReferenciaClientes();
        referenciaClientes1.setId(1L);
        ReferenciaClientes referenciaClientes2 = new ReferenciaClientes();
        referenciaClientes2.setId(referenciaClientes1.getId());
        assertThat(referenciaClientes1).isEqualTo(referenciaClientes2);
        referenciaClientes2.setId(2L);
        assertThat(referenciaClientes1).isNotEqualTo(referenciaClientes2);
        referenciaClientes1.setId(null);
        assertThat(referenciaClientes1).isNotEqualTo(referenciaClientes2);
    }
}
