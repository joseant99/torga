package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.PresupuestoPedido;
import com.torga.pedidos.repository.PresupuestoPedidoRepository;
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
 * Test class for the PresupuestoPedidoResource REST controller.
 *
 * @see PresupuestoPedidoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class PresupuestoPedidoResourceIntTest {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final Integer DEFAULT_PEDIDO = 1;
    private static final Integer UPDATED_PEDIDO = 2;

    private static final String DEFAULT_FECHA_PRESUPUESTO = "AAAAAAAAAA";
    private static final String UPDATED_FECHA_PRESUPUESTO = "BBBBBBBBBB";

    private static final String DEFAULT_FECHA_PEDIDO = "AAAAAAAAAA";
    private static final String UPDATED_FECHA_PEDIDO = "BBBBBBBBBB";

    @Autowired
    private PresupuestoPedidoRepository presupuestoPedidoRepository;

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

    private MockMvc restPresupuestoPedidoMockMvc;

    private PresupuestoPedido presupuestoPedido;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PresupuestoPedidoResource presupuestoPedidoResource = new PresupuestoPedidoResource(presupuestoPedidoRepository);
        this.restPresupuestoPedidoMockMvc = MockMvcBuilders.standaloneSetup(presupuestoPedidoResource)
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
    public static PresupuestoPedido createEntity(EntityManager em) {
        PresupuestoPedido presupuestoPedido = new PresupuestoPedido()
            .codigo(DEFAULT_CODIGO)
            .pedido(DEFAULT_PEDIDO)
            .fecha_presupuesto(DEFAULT_FECHA_PRESUPUESTO)
            .fecha_pedido(DEFAULT_FECHA_PEDIDO);
        return presupuestoPedido;
    }

    @Before
    public void initTest() {
        presupuestoPedido = createEntity(em);
    }

    @Test
    @Transactional
    public void createPresupuestoPedido() throws Exception {
        int databaseSizeBeforeCreate = presupuestoPedidoRepository.findAll().size();

        // Create the PresupuestoPedido
        restPresupuestoPedidoMockMvc.perform(post("/api/presupuesto-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuestoPedido)))
            .andExpect(status().isCreated());

        // Validate the PresupuestoPedido in the database
        List<PresupuestoPedido> presupuestoPedidoList = presupuestoPedidoRepository.findAll();
        assertThat(presupuestoPedidoList).hasSize(databaseSizeBeforeCreate + 1);
        PresupuestoPedido testPresupuestoPedido = presupuestoPedidoList.get(presupuestoPedidoList.size() - 1);
        assertThat(testPresupuestoPedido.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testPresupuestoPedido.getPedido()).isEqualTo(DEFAULT_PEDIDO);
        assertThat(testPresupuestoPedido.getFecha_presupuesto()).isEqualTo(DEFAULT_FECHA_PRESUPUESTO);
        assertThat(testPresupuestoPedido.getFecha_pedido()).isEqualTo(DEFAULT_FECHA_PEDIDO);
    }

    @Test
    @Transactional
    public void createPresupuestoPedidoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = presupuestoPedidoRepository.findAll().size();

        // Create the PresupuestoPedido with an existing ID
        presupuestoPedido.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPresupuestoPedidoMockMvc.perform(post("/api/presupuesto-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuestoPedido)))
            .andExpect(status().isBadRequest());

        // Validate the PresupuestoPedido in the database
        List<PresupuestoPedido> presupuestoPedidoList = presupuestoPedidoRepository.findAll();
        assertThat(presupuestoPedidoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPresupuestoPedidos() throws Exception {
        // Initialize the database
        presupuestoPedidoRepository.saveAndFlush(presupuestoPedido);

        // Get all the presupuestoPedidoList
        restPresupuestoPedidoMockMvc.perform(get("/api/presupuesto-pedidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(presupuestoPedido.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].pedido").value(hasItem(DEFAULT_PEDIDO)))
            .andExpect(jsonPath("$.[*].fecha_presupuesto").value(hasItem(DEFAULT_FECHA_PRESUPUESTO.toString())))
            .andExpect(jsonPath("$.[*].fecha_pedido").value(hasItem(DEFAULT_FECHA_PEDIDO.toString())));
    }
    
    @Test
    @Transactional
    public void getPresupuestoPedido() throws Exception {
        // Initialize the database
        presupuestoPedidoRepository.saveAndFlush(presupuestoPedido);

        // Get the presupuestoPedido
        restPresupuestoPedidoMockMvc.perform(get("/api/presupuesto-pedidos/{id}", presupuestoPedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(presupuestoPedido.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.pedido").value(DEFAULT_PEDIDO))
            .andExpect(jsonPath("$.fecha_presupuesto").value(DEFAULT_FECHA_PRESUPUESTO.toString()))
            .andExpect(jsonPath("$.fecha_pedido").value(DEFAULT_FECHA_PEDIDO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPresupuestoPedido() throws Exception {
        // Get the presupuestoPedido
        restPresupuestoPedidoMockMvc.perform(get("/api/presupuesto-pedidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePresupuestoPedido() throws Exception {
        // Initialize the database
        presupuestoPedidoRepository.saveAndFlush(presupuestoPedido);

        int databaseSizeBeforeUpdate = presupuestoPedidoRepository.findAll().size();

        // Update the presupuestoPedido
        PresupuestoPedido updatedPresupuestoPedido = presupuestoPedidoRepository.findById(presupuestoPedido.getId()).get();
        // Disconnect from session so that the updates on updatedPresupuestoPedido are not directly saved in db
        em.detach(updatedPresupuestoPedido);
        updatedPresupuestoPedido
            .codigo(UPDATED_CODIGO)
            .pedido(UPDATED_PEDIDO)
            .fecha_presupuesto(UPDATED_FECHA_PRESUPUESTO)
            .fecha_pedido(UPDATED_FECHA_PEDIDO);

        restPresupuestoPedidoMockMvc.perform(put("/api/presupuesto-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPresupuestoPedido)))
            .andExpect(status().isOk());

        // Validate the PresupuestoPedido in the database
        List<PresupuestoPedido> presupuestoPedidoList = presupuestoPedidoRepository.findAll();
        assertThat(presupuestoPedidoList).hasSize(databaseSizeBeforeUpdate);
        PresupuestoPedido testPresupuestoPedido = presupuestoPedidoList.get(presupuestoPedidoList.size() - 1);
        assertThat(testPresupuestoPedido.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testPresupuestoPedido.getPedido()).isEqualTo(UPDATED_PEDIDO);
        assertThat(testPresupuestoPedido.getFecha_presupuesto()).isEqualTo(UPDATED_FECHA_PRESUPUESTO);
        assertThat(testPresupuestoPedido.getFecha_pedido()).isEqualTo(UPDATED_FECHA_PEDIDO);
    }

    @Test
    @Transactional
    public void updateNonExistingPresupuestoPedido() throws Exception {
        int databaseSizeBeforeUpdate = presupuestoPedidoRepository.findAll().size();

        // Create the PresupuestoPedido

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPresupuestoPedidoMockMvc.perform(put("/api/presupuesto-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuestoPedido)))
            .andExpect(status().isBadRequest());

        // Validate the PresupuestoPedido in the database
        List<PresupuestoPedido> presupuestoPedidoList = presupuestoPedidoRepository.findAll();
        assertThat(presupuestoPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePresupuestoPedido() throws Exception {
        // Initialize the database
        presupuestoPedidoRepository.saveAndFlush(presupuestoPedido);

        int databaseSizeBeforeDelete = presupuestoPedidoRepository.findAll().size();

        // Get the presupuestoPedido
        restPresupuestoPedidoMockMvc.perform(delete("/api/presupuesto-pedidos/{id}", presupuestoPedido.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PresupuestoPedido> presupuestoPedidoList = presupuestoPedidoRepository.findAll();
        assertThat(presupuestoPedidoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PresupuestoPedido.class);
        PresupuestoPedido presupuestoPedido1 = new PresupuestoPedido();
        presupuestoPedido1.setId(1L);
        PresupuestoPedido presupuestoPedido2 = new PresupuestoPedido();
        presupuestoPedido2.setId(presupuestoPedido1.getId());
        assertThat(presupuestoPedido1).isEqualTo(presupuestoPedido2);
        presupuestoPedido2.setId(2L);
        assertThat(presupuestoPedido1).isNotEqualTo(presupuestoPedido2);
        presupuestoPedido1.setId(null);
        assertThat(presupuestoPedido1).isNotEqualTo(presupuestoPedido2);
    }
}
