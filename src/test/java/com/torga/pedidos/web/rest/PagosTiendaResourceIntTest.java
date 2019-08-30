package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.PagosTienda;
import com.torga.pedidos.repository.PagosTiendaRepository;
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
 * Test class for the PagosTiendaResource REST controller.
 *
 * @see PagosTiendaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class PagosTiendaResourceIntTest {

    private static final String DEFAULT_PAGO = "AAAAAAAAAA";
    private static final String UPDATED_PAGO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCUENTO = "AAAAAAAAAA";
    private static final String UPDATED_DESCUENTO = "BBBBBBBBBB";

    private static final Float DEFAULT_PRECIO_TIENDA = 1F;
    private static final Float UPDATED_PRECIO_TIENDA = 2F;

    @Autowired
    private PagosTiendaRepository pagosTiendaRepository;

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

    private MockMvc restPagosTiendaMockMvc;

    private PagosTienda pagosTienda;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PagosTiendaResource pagosTiendaResource = new PagosTiendaResource(pagosTiendaRepository);
        this.restPagosTiendaMockMvc = MockMvcBuilders.standaloneSetup(pagosTiendaResource)
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
    public static PagosTienda createEntity(EntityManager em) {
        PagosTienda pagosTienda = new PagosTienda()
            .pago(DEFAULT_PAGO)
            .descuento(DEFAULT_DESCUENTO)
            .precioTienda(DEFAULT_PRECIO_TIENDA);
        return pagosTienda;
    }

    @Before
    public void initTest() {
        pagosTienda = createEntity(em);
    }

    @Test
    @Transactional
    public void createPagosTienda() throws Exception {
        int databaseSizeBeforeCreate = pagosTiendaRepository.findAll().size();

        // Create the PagosTienda
        restPagosTiendaMockMvc.perform(post("/api/pagos-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagosTienda)))
            .andExpect(status().isCreated());

        // Validate the PagosTienda in the database
        List<PagosTienda> pagosTiendaList = pagosTiendaRepository.findAll();
        assertThat(pagosTiendaList).hasSize(databaseSizeBeforeCreate + 1);
        PagosTienda testPagosTienda = pagosTiendaList.get(pagosTiendaList.size() - 1);
        assertThat(testPagosTienda.getPago()).isEqualTo(DEFAULT_PAGO);
        assertThat(testPagosTienda.getDescuento()).isEqualTo(DEFAULT_DESCUENTO);
        assertThat(testPagosTienda.getPrecioTienda()).isEqualTo(DEFAULT_PRECIO_TIENDA);
    }

    @Test
    @Transactional
    public void createPagosTiendaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pagosTiendaRepository.findAll().size();

        // Create the PagosTienda with an existing ID
        pagosTienda.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPagosTiendaMockMvc.perform(post("/api/pagos-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagosTienda)))
            .andExpect(status().isBadRequest());

        // Validate the PagosTienda in the database
        List<PagosTienda> pagosTiendaList = pagosTiendaRepository.findAll();
        assertThat(pagosTiendaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPagosTiendas() throws Exception {
        // Initialize the database
        pagosTiendaRepository.saveAndFlush(pagosTienda);

        // Get all the pagosTiendaList
        restPagosTiendaMockMvc.perform(get("/api/pagos-tiendas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pagosTienda.getId().intValue())))
            .andExpect(jsonPath("$.[*].pago").value(hasItem(DEFAULT_PAGO.toString())))
            .andExpect(jsonPath("$.[*].descuento").value(hasItem(DEFAULT_DESCUENTO.toString())))
            .andExpect(jsonPath("$.[*].precioTienda").value(hasItem(DEFAULT_PRECIO_TIENDA.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getPagosTienda() throws Exception {
        // Initialize the database
        pagosTiendaRepository.saveAndFlush(pagosTienda);

        // Get the pagosTienda
        restPagosTiendaMockMvc.perform(get("/api/pagos-tiendas/{id}", pagosTienda.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pagosTienda.getId().intValue()))
            .andExpect(jsonPath("$.pago").value(DEFAULT_PAGO.toString()))
            .andExpect(jsonPath("$.descuento").value(DEFAULT_DESCUENTO.toString()))
            .andExpect(jsonPath("$.precioTienda").value(DEFAULT_PRECIO_TIENDA.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPagosTienda() throws Exception {
        // Get the pagosTienda
        restPagosTiendaMockMvc.perform(get("/api/pagos-tiendas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePagosTienda() throws Exception {
        // Initialize the database
        pagosTiendaRepository.saveAndFlush(pagosTienda);

        int databaseSizeBeforeUpdate = pagosTiendaRepository.findAll().size();

        // Update the pagosTienda
        PagosTienda updatedPagosTienda = pagosTiendaRepository.findById(pagosTienda.getId()).get();
        // Disconnect from session so that the updates on updatedPagosTienda are not directly saved in db
        em.detach(updatedPagosTienda);
        updatedPagosTienda
            .pago(UPDATED_PAGO)
            .descuento(UPDATED_DESCUENTO)
            .precioTienda(UPDATED_PRECIO_TIENDA);

        restPagosTiendaMockMvc.perform(put("/api/pagos-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPagosTienda)))
            .andExpect(status().isOk());

        // Validate the PagosTienda in the database
        List<PagosTienda> pagosTiendaList = pagosTiendaRepository.findAll();
        assertThat(pagosTiendaList).hasSize(databaseSizeBeforeUpdate);
        PagosTienda testPagosTienda = pagosTiendaList.get(pagosTiendaList.size() - 1);
        assertThat(testPagosTienda.getPago()).isEqualTo(UPDATED_PAGO);
        assertThat(testPagosTienda.getDescuento()).isEqualTo(UPDATED_DESCUENTO);
        assertThat(testPagosTienda.getPrecioTienda()).isEqualTo(UPDATED_PRECIO_TIENDA);
    }

    @Test
    @Transactional
    public void updateNonExistingPagosTienda() throws Exception {
        int databaseSizeBeforeUpdate = pagosTiendaRepository.findAll().size();

        // Create the PagosTienda

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPagosTiendaMockMvc.perform(put("/api/pagos-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagosTienda)))
            .andExpect(status().isBadRequest());

        // Validate the PagosTienda in the database
        List<PagosTienda> pagosTiendaList = pagosTiendaRepository.findAll();
        assertThat(pagosTiendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePagosTienda() throws Exception {
        // Initialize the database
        pagosTiendaRepository.saveAndFlush(pagosTienda);

        int databaseSizeBeforeDelete = pagosTiendaRepository.findAll().size();

        // Get the pagosTienda
        restPagosTiendaMockMvc.perform(delete("/api/pagos-tiendas/{id}", pagosTienda.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PagosTienda> pagosTiendaList = pagosTiendaRepository.findAll();
        assertThat(pagosTiendaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PagosTienda.class);
        PagosTienda pagosTienda1 = new PagosTienda();
        pagosTienda1.setId(1L);
        PagosTienda pagosTienda2 = new PagosTienda();
        pagosTienda2.setId(pagosTienda1.getId());
        assertThat(pagosTienda1).isEqualTo(pagosTienda2);
        pagosTienda2.setId(2L);
        assertThat(pagosTienda1).isNotEqualTo(pagosTienda2);
        pagosTienda1.setId(null);
        assertThat(pagosTienda1).isNotEqualTo(pagosTienda2);
    }
}
