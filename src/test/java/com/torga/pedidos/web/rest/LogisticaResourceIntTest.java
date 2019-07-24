package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Logistica;
import com.torga.pedidos.repository.LogisticaRepository;
import com.torga.pedidos.service.LogisticaService;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.torga.pedidos.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the LogisticaResource REST controller.
 *
 * @see LogisticaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class LogisticaResourceIntTest {

    private static final String DEFAULT_NUM_PEDIDO = "AAAAAAAAAA";
    private static final String UPDATED_NUM_PEDIDO = "BBBBBBBBBB";

    private static final String DEFAULT_RUTA = "AAAAAAAAAA";
    private static final String UPDATED_RUTA = "BBBBBBBBBB";

    private static final String DEFAULT_CARRO = "AAAAAAAAAA";
    private static final String UPDATED_CARRO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_ENTREGA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_ENTREGA = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_PEDIDO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_PEDIDO = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private LogisticaRepository logisticaRepository;

    @Autowired
    private LogisticaService logisticaService;

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

    private MockMvc restLogisticaMockMvc;

    private Logistica logistica;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LogisticaResource logisticaResource = new LogisticaResource(logisticaService);
        this.restLogisticaMockMvc = MockMvcBuilders.standaloneSetup(logisticaResource)
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
    public static Logistica createEntity(EntityManager em) {
        Logistica logistica = new Logistica()
            .numPedido(DEFAULT_NUM_PEDIDO)
            .ruta(DEFAULT_RUTA)
            .carro(DEFAULT_CARRO)
            .fechaEntrega(DEFAULT_FECHA_ENTREGA)
            .fechaPedido(DEFAULT_FECHA_PEDIDO);
        return logistica;
    }

    @Before
    public void initTest() {
        logistica = createEntity(em);
    }

    @Test
    @Transactional
    public void createLogistica() throws Exception {
        int databaseSizeBeforeCreate = logisticaRepository.findAll().size();

        // Create the Logistica
        restLogisticaMockMvc.perform(post("/api/logisticas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(logistica)))
            .andExpect(status().isCreated());

        // Validate the Logistica in the database
        List<Logistica> logisticaList = logisticaRepository.findAll();
        assertThat(logisticaList).hasSize(databaseSizeBeforeCreate + 1);
        Logistica testLogistica = logisticaList.get(logisticaList.size() - 1);
        assertThat(testLogistica.getNumPedido()).isEqualTo(DEFAULT_NUM_PEDIDO);
        assertThat(testLogistica.getRuta()).isEqualTo(DEFAULT_RUTA);
        assertThat(testLogistica.getCarro()).isEqualTo(DEFAULT_CARRO);
        assertThat(testLogistica.getFechaEntrega()).isEqualTo(DEFAULT_FECHA_ENTREGA);
        assertThat(testLogistica.getFechaPedido()).isEqualTo(DEFAULT_FECHA_PEDIDO);
    }

    @Test
    @Transactional
    public void createLogisticaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = logisticaRepository.findAll().size();

        // Create the Logistica with an existing ID
        logistica.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLogisticaMockMvc.perform(post("/api/logisticas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(logistica)))
            .andExpect(status().isBadRequest());

        // Validate the Logistica in the database
        List<Logistica> logisticaList = logisticaRepository.findAll();
        assertThat(logisticaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNumPedidoIsRequired() throws Exception {
        int databaseSizeBeforeTest = logisticaRepository.findAll().size();
        // set the field null
        logistica.setNumPedido(null);

        // Create the Logistica, which fails.

        restLogisticaMockMvc.perform(post("/api/logisticas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(logistica)))
            .andExpect(status().isBadRequest());

        List<Logistica> logisticaList = logisticaRepository.findAll();
        assertThat(logisticaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLogisticas() throws Exception {
        // Initialize the database
        logisticaRepository.saveAndFlush(logistica);

        // Get all the logisticaList
        restLogisticaMockMvc.perform(get("/api/logisticas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(logistica.getId().intValue())))
            .andExpect(jsonPath("$.[*].numPedido").value(hasItem(DEFAULT_NUM_PEDIDO.toString())))
            .andExpect(jsonPath("$.[*].ruta").value(hasItem(DEFAULT_RUTA.toString())))
            .andExpect(jsonPath("$.[*].carro").value(hasItem(DEFAULT_CARRO.toString())))
            .andExpect(jsonPath("$.[*].fechaEntrega").value(hasItem(DEFAULT_FECHA_ENTREGA.toString())))
            .andExpect(jsonPath("$.[*].fechaPedido").value(hasItem(DEFAULT_FECHA_PEDIDO.toString())));
    }
    
    @Test
    @Transactional
    public void getLogistica() throws Exception {
        // Initialize the database
        logisticaRepository.saveAndFlush(logistica);

        // Get the logistica
        restLogisticaMockMvc.perform(get("/api/logisticas/{id}", logistica.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(logistica.getId().intValue()))
            .andExpect(jsonPath("$.numPedido").value(DEFAULT_NUM_PEDIDO.toString()))
            .andExpect(jsonPath("$.ruta").value(DEFAULT_RUTA.toString()))
            .andExpect(jsonPath("$.carro").value(DEFAULT_CARRO.toString()))
            .andExpect(jsonPath("$.fechaEntrega").value(DEFAULT_FECHA_ENTREGA.toString()))
            .andExpect(jsonPath("$.fechaPedido").value(DEFAULT_FECHA_PEDIDO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLogistica() throws Exception {
        // Get the logistica
        restLogisticaMockMvc.perform(get("/api/logisticas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLogistica() throws Exception {
        // Initialize the database
        logisticaService.save(logistica);

        int databaseSizeBeforeUpdate = logisticaRepository.findAll().size();

        // Update the logistica
        Logistica updatedLogistica = logisticaRepository.findById(logistica.getId()).get();
        // Disconnect from session so that the updates on updatedLogistica are not directly saved in db
        em.detach(updatedLogistica);
        updatedLogistica
            .numPedido(UPDATED_NUM_PEDIDO)
            .ruta(UPDATED_RUTA)
            .carro(UPDATED_CARRO)
            .fechaEntrega(UPDATED_FECHA_ENTREGA)
            .fechaPedido(UPDATED_FECHA_PEDIDO);

        restLogisticaMockMvc.perform(put("/api/logisticas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLogistica)))
            .andExpect(status().isOk());

        // Validate the Logistica in the database
        List<Logistica> logisticaList = logisticaRepository.findAll();
        assertThat(logisticaList).hasSize(databaseSizeBeforeUpdate);
        Logistica testLogistica = logisticaList.get(logisticaList.size() - 1);
        assertThat(testLogistica.getNumPedido()).isEqualTo(UPDATED_NUM_PEDIDO);
        assertThat(testLogistica.getRuta()).isEqualTo(UPDATED_RUTA);
        assertThat(testLogistica.getCarro()).isEqualTo(UPDATED_CARRO);
        assertThat(testLogistica.getFechaEntrega()).isEqualTo(UPDATED_FECHA_ENTREGA);
        assertThat(testLogistica.getFechaPedido()).isEqualTo(UPDATED_FECHA_PEDIDO);
    }

    @Test
    @Transactional
    public void updateNonExistingLogistica() throws Exception {
        int databaseSizeBeforeUpdate = logisticaRepository.findAll().size();

        // Create the Logistica

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLogisticaMockMvc.perform(put("/api/logisticas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(logistica)))
            .andExpect(status().isBadRequest());

        // Validate the Logistica in the database
        List<Logistica> logisticaList = logisticaRepository.findAll();
        assertThat(logisticaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLogistica() throws Exception {
        // Initialize the database
        logisticaService.save(logistica);

        int databaseSizeBeforeDelete = logisticaRepository.findAll().size();

        // Get the logistica
        restLogisticaMockMvc.perform(delete("/api/logisticas/{id}", logistica.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Logistica> logisticaList = logisticaRepository.findAll();
        assertThat(logisticaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Logistica.class);
        Logistica logistica1 = new Logistica();
        logistica1.setId(1L);
        Logistica logistica2 = new Logistica();
        logistica2.setId(logistica1.getId());
        assertThat(logistica1).isEqualTo(logistica2);
        logistica2.setId(2L);
        assertThat(logistica1).isNotEqualTo(logistica2);
        logistica1.setId(null);
        assertThat(logistica1).isNotEqualTo(logistica2);
    }
}
