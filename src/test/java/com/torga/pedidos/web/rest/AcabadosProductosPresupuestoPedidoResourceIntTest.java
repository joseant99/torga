package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.AcabadosProductosPresupuestoPedido;
import com.torga.pedidos.repository.AcabadosProductosPresupuestoPedidoRepository;
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
 * Test class for the AcabadosProductosPresupuestoPedidoResource REST controller.
 *
 * @see AcabadosProductosPresupuestoPedidoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class AcabadosProductosPresupuestoPedidoResourceIntTest {

    @Autowired
    private AcabadosProductosPresupuestoPedidoRepository acabadosProductosPresupuestoPedidoRepository;

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

    private MockMvc restAcabadosProductosPresupuestoPedidoMockMvc;

    private AcabadosProductosPresupuestoPedido acabadosProductosPresupuestoPedido;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AcabadosProductosPresupuestoPedidoResource acabadosProductosPresupuestoPedidoResource = new AcabadosProductosPresupuestoPedidoResource(acabadosProductosPresupuestoPedidoRepository);
        this.restAcabadosProductosPresupuestoPedidoMockMvc = MockMvcBuilders.standaloneSetup(acabadosProductosPresupuestoPedidoResource)
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
    public static AcabadosProductosPresupuestoPedido createEntity(EntityManager em) {
        AcabadosProductosPresupuestoPedido acabadosProductosPresupuestoPedido = new AcabadosProductosPresupuestoPedido();
        return acabadosProductosPresupuestoPedido;
    }

    @Before
    public void initTest() {
        acabadosProductosPresupuestoPedido = createEntity(em);
    }

    @Test
    @Transactional
    public void createAcabadosProductosPresupuestoPedido() throws Exception {
        int databaseSizeBeforeCreate = acabadosProductosPresupuestoPedidoRepository.findAll().size();

        // Create the AcabadosProductosPresupuestoPedido
        restAcabadosProductosPresupuestoPedidoMockMvc.perform(post("/api/acabados-productos-presupuesto-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acabadosProductosPresupuestoPedido)))
            .andExpect(status().isCreated());

        // Validate the AcabadosProductosPresupuestoPedido in the database
        List<AcabadosProductosPresupuestoPedido> acabadosProductosPresupuestoPedidoList = acabadosProductosPresupuestoPedidoRepository.findAll();
        assertThat(acabadosProductosPresupuestoPedidoList).hasSize(databaseSizeBeforeCreate + 1);
        AcabadosProductosPresupuestoPedido testAcabadosProductosPresupuestoPedido = acabadosProductosPresupuestoPedidoList.get(acabadosProductosPresupuestoPedidoList.size() - 1);
    }

    @Test
    @Transactional
    public void createAcabadosProductosPresupuestoPedidoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = acabadosProductosPresupuestoPedidoRepository.findAll().size();

        // Create the AcabadosProductosPresupuestoPedido with an existing ID
        acabadosProductosPresupuestoPedido.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcabadosProductosPresupuestoPedidoMockMvc.perform(post("/api/acabados-productos-presupuesto-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acabadosProductosPresupuestoPedido)))
            .andExpect(status().isBadRequest());

        // Validate the AcabadosProductosPresupuestoPedido in the database
        List<AcabadosProductosPresupuestoPedido> acabadosProductosPresupuestoPedidoList = acabadosProductosPresupuestoPedidoRepository.findAll();
        assertThat(acabadosProductosPresupuestoPedidoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAcabadosProductosPresupuestoPedidos() throws Exception {
        // Initialize the database
        acabadosProductosPresupuestoPedidoRepository.saveAndFlush(acabadosProductosPresupuestoPedido);

        // Get all the acabadosProductosPresupuestoPedidoList
        restAcabadosProductosPresupuestoPedidoMockMvc.perform(get("/api/acabados-productos-presupuesto-pedidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(acabadosProductosPresupuestoPedido.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getAcabadosProductosPresupuestoPedido() throws Exception {
        // Initialize the database
        acabadosProductosPresupuestoPedidoRepository.saveAndFlush(acabadosProductosPresupuestoPedido);

        // Get the acabadosProductosPresupuestoPedido
        restAcabadosProductosPresupuestoPedidoMockMvc.perform(get("/api/acabados-productos-presupuesto-pedidos/{id}", acabadosProductosPresupuestoPedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(acabadosProductosPresupuestoPedido.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAcabadosProductosPresupuestoPedido() throws Exception {
        // Get the acabadosProductosPresupuestoPedido
        restAcabadosProductosPresupuestoPedidoMockMvc.perform(get("/api/acabados-productos-presupuesto-pedidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAcabadosProductosPresupuestoPedido() throws Exception {
        // Initialize the database
        acabadosProductosPresupuestoPedidoRepository.saveAndFlush(acabadosProductosPresupuestoPedido);

        int databaseSizeBeforeUpdate = acabadosProductosPresupuestoPedidoRepository.findAll().size();

        // Update the acabadosProductosPresupuestoPedido
        AcabadosProductosPresupuestoPedido updatedAcabadosProductosPresupuestoPedido = acabadosProductosPresupuestoPedidoRepository.findById(acabadosProductosPresupuestoPedido.getId()).get();
        // Disconnect from session so that the updates on updatedAcabadosProductosPresupuestoPedido are not directly saved in db
        em.detach(updatedAcabadosProductosPresupuestoPedido);

        restAcabadosProductosPresupuestoPedidoMockMvc.perform(put("/api/acabados-productos-presupuesto-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAcabadosProductosPresupuestoPedido)))
            .andExpect(status().isOk());

        // Validate the AcabadosProductosPresupuestoPedido in the database
        List<AcabadosProductosPresupuestoPedido> acabadosProductosPresupuestoPedidoList = acabadosProductosPresupuestoPedidoRepository.findAll();
        assertThat(acabadosProductosPresupuestoPedidoList).hasSize(databaseSizeBeforeUpdate);
        AcabadosProductosPresupuestoPedido testAcabadosProductosPresupuestoPedido = acabadosProductosPresupuestoPedidoList.get(acabadosProductosPresupuestoPedidoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingAcabadosProductosPresupuestoPedido() throws Exception {
        int databaseSizeBeforeUpdate = acabadosProductosPresupuestoPedidoRepository.findAll().size();

        // Create the AcabadosProductosPresupuestoPedido

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAcabadosProductosPresupuestoPedidoMockMvc.perform(put("/api/acabados-productos-presupuesto-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acabadosProductosPresupuestoPedido)))
            .andExpect(status().isBadRequest());

        // Validate the AcabadosProductosPresupuestoPedido in the database
        List<AcabadosProductosPresupuestoPedido> acabadosProductosPresupuestoPedidoList = acabadosProductosPresupuestoPedidoRepository.findAll();
        assertThat(acabadosProductosPresupuestoPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAcabadosProductosPresupuestoPedido() throws Exception {
        // Initialize the database
        acabadosProductosPresupuestoPedidoRepository.saveAndFlush(acabadosProductosPresupuestoPedido);

        int databaseSizeBeforeDelete = acabadosProductosPresupuestoPedidoRepository.findAll().size();

        // Get the acabadosProductosPresupuestoPedido
        restAcabadosProductosPresupuestoPedidoMockMvc.perform(delete("/api/acabados-productos-presupuesto-pedidos/{id}", acabadosProductosPresupuestoPedido.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AcabadosProductosPresupuestoPedido> acabadosProductosPresupuestoPedidoList = acabadosProductosPresupuestoPedidoRepository.findAll();
        assertThat(acabadosProductosPresupuestoPedidoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AcabadosProductosPresupuestoPedido.class);
        AcabadosProductosPresupuestoPedido acabadosProductosPresupuestoPedido1 = new AcabadosProductosPresupuestoPedido();
        acabadosProductosPresupuestoPedido1.setId(1L);
        AcabadosProductosPresupuestoPedido acabadosProductosPresupuestoPedido2 = new AcabadosProductosPresupuestoPedido();
        acabadosProductosPresupuestoPedido2.setId(acabadosProductosPresupuestoPedido1.getId());
        assertThat(acabadosProductosPresupuestoPedido1).isEqualTo(acabadosProductosPresupuestoPedido2);
        acabadosProductosPresupuestoPedido2.setId(2L);
        assertThat(acabadosProductosPresupuestoPedido1).isNotEqualTo(acabadosProductosPresupuestoPedido2);
        acabadosProductosPresupuestoPedido1.setId(null);
        assertThat(acabadosProductosPresupuestoPedido1).isNotEqualTo(acabadosProductosPresupuestoPedido2);
    }
}
