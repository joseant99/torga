package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Pedidos;
import com.torga.pedidos.repository.PedidosRepository;
import com.torga.pedidos.service.PedidosService;
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
 * Test class for the PedidosResource REST controller.
 *
 * @see PedidosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class PedidosResourceIntTest {

    private static final String DEFAULT_NUM_PEDIDO = "AAAAAAAAAA";
    private static final String UPDATED_NUM_PEDIDO = "BBBBBBBBBB";

    private static final String DEFAULT_FACTURA = "AAAAAAAAAA";
    private static final String UPDATED_FACTURA = "BBBBBBBBBB";

    private static final String DEFAULT_CONFIRMACION = "AAAAAAAAAA";
    private static final String UPDATED_CONFIRMACION = "BBBBBBBBBB";

    private static final Float DEFAULT_IMPORTE = 1F;
    private static final Float UPDATED_IMPORTE = 2F;

    @Autowired
    private PedidosRepository pedidosRepository;

    @Autowired
    private PedidosService pedidosService;

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

    private MockMvc restPedidosMockMvc;

    private Pedidos pedidos;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PedidosResource pedidosResource = new PedidosResource(pedidosService);
        this.restPedidosMockMvc = MockMvcBuilders.standaloneSetup(pedidosResource)
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
    public static Pedidos createEntity(EntityManager em) {
        Pedidos pedidos = new Pedidos()
            .numPedido(DEFAULT_NUM_PEDIDO)
            .factura(DEFAULT_FACTURA)
            .confirmacion(DEFAULT_CONFIRMACION)
            .importe(DEFAULT_IMPORTE);
        return pedidos;
    }

    @Before
    public void initTest() {
        pedidos = createEntity(em);
    }

    @Test
    @Transactional
    public void createPedidos() throws Exception {
        int databaseSizeBeforeCreate = pedidosRepository.findAll().size();

        // Create the Pedidos
        restPedidosMockMvc.perform(post("/api/pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pedidos)))
            .andExpect(status().isCreated());

        // Validate the Pedidos in the database
        List<Pedidos> pedidosList = pedidosRepository.findAll();
        assertThat(pedidosList).hasSize(databaseSizeBeforeCreate + 1);
        Pedidos testPedidos = pedidosList.get(pedidosList.size() - 1);
        assertThat(testPedidos.getNumPedido()).isEqualTo(DEFAULT_NUM_PEDIDO);
        assertThat(testPedidos.getFactura()).isEqualTo(DEFAULT_FACTURA);
        assertThat(testPedidos.getConfirmacion()).isEqualTo(DEFAULT_CONFIRMACION);
        assertThat(testPedidos.getImporte()).isEqualTo(DEFAULT_IMPORTE);
    }

    @Test
    @Transactional
    public void createPedidosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pedidosRepository.findAll().size();

        // Create the Pedidos with an existing ID
        pedidos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPedidosMockMvc.perform(post("/api/pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pedidos)))
            .andExpect(status().isBadRequest());

        // Validate the Pedidos in the database
        List<Pedidos> pedidosList = pedidosRepository.findAll();
        assertThat(pedidosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNumPedidoIsRequired() throws Exception {
        int databaseSizeBeforeTest = pedidosRepository.findAll().size();
        // set the field null
        pedidos.setNumPedido(null);

        // Create the Pedidos, which fails.

        restPedidosMockMvc.perform(post("/api/pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pedidos)))
            .andExpect(status().isBadRequest());

        List<Pedidos> pedidosList = pedidosRepository.findAll();
        assertThat(pedidosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPedidos() throws Exception {
        // Initialize the database
        pedidosRepository.saveAndFlush(pedidos);

        // Get all the pedidosList
        restPedidosMockMvc.perform(get("/api/pedidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pedidos.getId().intValue())))
            .andExpect(jsonPath("$.[*].numPedido").value(hasItem(DEFAULT_NUM_PEDIDO.toString())))
            .andExpect(jsonPath("$.[*].factura").value(hasItem(DEFAULT_FACTURA.toString())))
            .andExpect(jsonPath("$.[*].confirmacion").value(hasItem(DEFAULT_CONFIRMACION.toString())))
            .andExpect(jsonPath("$.[*].importe").value(hasItem(DEFAULT_IMPORTE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getPedidos() throws Exception {
        // Initialize the database
        pedidosRepository.saveAndFlush(pedidos);

        // Get the pedidos
        restPedidosMockMvc.perform(get("/api/pedidos/{id}", pedidos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pedidos.getId().intValue()))
            .andExpect(jsonPath("$.numPedido").value(DEFAULT_NUM_PEDIDO.toString()))
            .andExpect(jsonPath("$.factura").value(DEFAULT_FACTURA.toString()))
            .andExpect(jsonPath("$.confirmacion").value(DEFAULT_CONFIRMACION.toString()))
            .andExpect(jsonPath("$.importe").value(DEFAULT_IMPORTE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPedidos() throws Exception {
        // Get the pedidos
        restPedidosMockMvc.perform(get("/api/pedidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePedidos() throws Exception {
        // Initialize the database
        pedidosService.save(pedidos);

        int databaseSizeBeforeUpdate = pedidosRepository.findAll().size();

        // Update the pedidos
        Pedidos updatedPedidos = pedidosRepository.findById(pedidos.getId()).get();
        // Disconnect from session so that the updates on updatedPedidos are not directly saved in db
        em.detach(updatedPedidos);
        updatedPedidos
            .numPedido(UPDATED_NUM_PEDIDO)
            .factura(UPDATED_FACTURA)
            .confirmacion(UPDATED_CONFIRMACION)
            .importe(UPDATED_IMPORTE);

        restPedidosMockMvc.perform(put("/api/pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPedidos)))
            .andExpect(status().isOk());

        // Validate the Pedidos in the database
        List<Pedidos> pedidosList = pedidosRepository.findAll();
        assertThat(pedidosList).hasSize(databaseSizeBeforeUpdate);
        Pedidos testPedidos = pedidosList.get(pedidosList.size() - 1);
        assertThat(testPedidos.getNumPedido()).isEqualTo(UPDATED_NUM_PEDIDO);
        assertThat(testPedidos.getFactura()).isEqualTo(UPDATED_FACTURA);
        assertThat(testPedidos.getConfirmacion()).isEqualTo(UPDATED_CONFIRMACION);
        assertThat(testPedidos.getImporte()).isEqualTo(UPDATED_IMPORTE);
    }

    @Test
    @Transactional
    public void updateNonExistingPedidos() throws Exception {
        int databaseSizeBeforeUpdate = pedidosRepository.findAll().size();

        // Create the Pedidos

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPedidosMockMvc.perform(put("/api/pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pedidos)))
            .andExpect(status().isBadRequest());

        // Validate the Pedidos in the database
        List<Pedidos> pedidosList = pedidosRepository.findAll();
        assertThat(pedidosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePedidos() throws Exception {
        // Initialize the database
        pedidosService.save(pedidos);

        int databaseSizeBeforeDelete = pedidosRepository.findAll().size();

        // Get the pedidos
        restPedidosMockMvc.perform(delete("/api/pedidos/{id}", pedidos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Pedidos> pedidosList = pedidosRepository.findAll();
        assertThat(pedidosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pedidos.class);
        Pedidos pedidos1 = new Pedidos();
        pedidos1.setId(1L);
        Pedidos pedidos2 = new Pedidos();
        pedidos2.setId(pedidos1.getId());
        assertThat(pedidos1).isEqualTo(pedidos2);
        pedidos2.setId(2L);
        assertThat(pedidos1).isNotEqualTo(pedidos2);
        pedidos1.setId(null);
        assertThat(pedidos1).isNotEqualTo(pedidos2);
    }
}
