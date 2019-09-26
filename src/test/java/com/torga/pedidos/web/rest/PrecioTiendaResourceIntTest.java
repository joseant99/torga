package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.PrecioTienda;
import com.torga.pedidos.repository.PrecioTiendaRepository;
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
 * Test class for the PrecioTiendaResource REST controller.
 *
 * @see PrecioTiendaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class PrecioTiendaResourceIntTest {

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    @Autowired
    private PrecioTiendaRepository precioTiendaRepository;

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

    private MockMvc restPrecioTiendaMockMvc;

    private PrecioTienda precioTienda;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrecioTiendaResource precioTiendaResource = new PrecioTiendaResource(precioTiendaRepository);
        this.restPrecioTiendaMockMvc = MockMvcBuilders.standaloneSetup(precioTiendaResource)
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
    public static PrecioTienda createEntity(EntityManager em) {
        PrecioTienda precioTienda = new PrecioTienda()
            .precio(DEFAULT_PRECIO);
        return precioTienda;
    }

    @Before
    public void initTest() {
        precioTienda = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrecioTienda() throws Exception {
        int databaseSizeBeforeCreate = precioTiendaRepository.findAll().size();

        // Create the PrecioTienda
        restPrecioTiendaMockMvc.perform(post("/api/precio-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(precioTienda)))
            .andExpect(status().isCreated());

        // Validate the PrecioTienda in the database
        List<PrecioTienda> precioTiendaList = precioTiendaRepository.findAll();
        assertThat(precioTiendaList).hasSize(databaseSizeBeforeCreate + 1);
        PrecioTienda testPrecioTienda = precioTiendaList.get(precioTiendaList.size() - 1);
        assertThat(testPrecioTienda.getPrecio()).isEqualTo(DEFAULT_PRECIO);
    }

    @Test
    @Transactional
    public void createPrecioTiendaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = precioTiendaRepository.findAll().size();

        // Create the PrecioTienda with an existing ID
        precioTienda.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrecioTiendaMockMvc.perform(post("/api/precio-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(precioTienda)))
            .andExpect(status().isBadRequest());

        // Validate the PrecioTienda in the database
        List<PrecioTienda> precioTiendaList = precioTiendaRepository.findAll();
        assertThat(precioTiendaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPrecioTiendas() throws Exception {
        // Initialize the database
        precioTiendaRepository.saveAndFlush(precioTienda);

        // Get all the precioTiendaList
        restPrecioTiendaMockMvc.perform(get("/api/precio-tiendas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(precioTienda.getId().intValue())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getPrecioTienda() throws Exception {
        // Initialize the database
        precioTiendaRepository.saveAndFlush(precioTienda);

        // Get the precioTienda
        restPrecioTiendaMockMvc.perform(get("/api/precio-tiendas/{id}", precioTienda.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(precioTienda.getId().intValue()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPrecioTienda() throws Exception {
        // Get the precioTienda
        restPrecioTiendaMockMvc.perform(get("/api/precio-tiendas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrecioTienda() throws Exception {
        // Initialize the database
        precioTiendaRepository.saveAndFlush(precioTienda);

        int databaseSizeBeforeUpdate = precioTiendaRepository.findAll().size();

        // Update the precioTienda
        PrecioTienda updatedPrecioTienda = precioTiendaRepository.findById(precioTienda.getId()).get();
        // Disconnect from session so that the updates on updatedPrecioTienda are not directly saved in db
        em.detach(updatedPrecioTienda);
        updatedPrecioTienda
            .precio(UPDATED_PRECIO);

        restPrecioTiendaMockMvc.perform(put("/api/precio-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrecioTienda)))
            .andExpect(status().isOk());

        // Validate the PrecioTienda in the database
        List<PrecioTienda> precioTiendaList = precioTiendaRepository.findAll();
        assertThat(precioTiendaList).hasSize(databaseSizeBeforeUpdate);
        PrecioTienda testPrecioTienda = precioTiendaList.get(precioTiendaList.size() - 1);
        assertThat(testPrecioTienda.getPrecio()).isEqualTo(UPDATED_PRECIO);
    }

    @Test
    @Transactional
    public void updateNonExistingPrecioTienda() throws Exception {
        int databaseSizeBeforeUpdate = precioTiendaRepository.findAll().size();

        // Create the PrecioTienda

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrecioTiendaMockMvc.perform(put("/api/precio-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(precioTienda)))
            .andExpect(status().isBadRequest());

        // Validate the PrecioTienda in the database
        List<PrecioTienda> precioTiendaList = precioTiendaRepository.findAll();
        assertThat(precioTiendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrecioTienda() throws Exception {
        // Initialize the database
        precioTiendaRepository.saveAndFlush(precioTienda);

        int databaseSizeBeforeDelete = precioTiendaRepository.findAll().size();

        // Get the precioTienda
        restPrecioTiendaMockMvc.perform(delete("/api/precio-tiendas/{id}", precioTienda.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PrecioTienda> precioTiendaList = precioTiendaRepository.findAll();
        assertThat(precioTiendaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrecioTienda.class);
        PrecioTienda precioTienda1 = new PrecioTienda();
        precioTienda1.setId(1L);
        PrecioTienda precioTienda2 = new PrecioTienda();
        precioTienda2.setId(precioTienda1.getId());
        assertThat(precioTienda1).isEqualTo(precioTienda2);
        precioTienda2.setId(2L);
        assertThat(precioTienda1).isNotEqualTo(precioTienda2);
        precioTienda1.setId(null);
        assertThat(precioTienda1).isNotEqualTo(precioTienda2);
    }
}
