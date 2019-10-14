package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.PrecioTiendaProductos;
import com.torga.pedidos.repository.PrecioTiendaProductosRepository;
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
 * Test class for the PrecioTiendaProductosResource REST controller.
 *
 * @see PrecioTiendaProductosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class PrecioTiendaProductosResourceIntTest {

    private static final Float DEFAULT_PORCENTAJE = 1F;
    private static final Float UPDATED_PORCENTAJE = 2F;

    @Autowired
    private PrecioTiendaProductosRepository precioTiendaProductosRepository;

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

    private MockMvc restPrecioTiendaProductosMockMvc;

    private PrecioTiendaProductos precioTiendaProductos;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrecioTiendaProductosResource precioTiendaProductosResource = new PrecioTiendaProductosResource(precioTiendaProductosRepository);
        this.restPrecioTiendaProductosMockMvc = MockMvcBuilders.standaloneSetup(precioTiendaProductosResource)
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
    public static PrecioTiendaProductos createEntity(EntityManager em) {
        PrecioTiendaProductos precioTiendaProductos = new PrecioTiendaProductos()
            .porcentaje(DEFAULT_PORCENTAJE);
        return precioTiendaProductos;
    }

    @Before
    public void initTest() {
        precioTiendaProductos = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrecioTiendaProductos() throws Exception {
        int databaseSizeBeforeCreate = precioTiendaProductosRepository.findAll().size();

        // Create the PrecioTiendaProductos
        restPrecioTiendaProductosMockMvc.perform(post("/api/precio-tienda-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(precioTiendaProductos)))
            .andExpect(status().isCreated());

        // Validate the PrecioTiendaProductos in the database
        List<PrecioTiendaProductos> precioTiendaProductosList = precioTiendaProductosRepository.findAll();
        assertThat(precioTiendaProductosList).hasSize(databaseSizeBeforeCreate + 1);
        PrecioTiendaProductos testPrecioTiendaProductos = precioTiendaProductosList.get(precioTiendaProductosList.size() - 1);
        assertThat(testPrecioTiendaProductos.getPorcentaje()).isEqualTo(DEFAULT_PORCENTAJE);
    }

    @Test
    @Transactional
    public void createPrecioTiendaProductosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = precioTiendaProductosRepository.findAll().size();

        // Create the PrecioTiendaProductos with an existing ID
        precioTiendaProductos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrecioTiendaProductosMockMvc.perform(post("/api/precio-tienda-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(precioTiendaProductos)))
            .andExpect(status().isBadRequest());

        // Validate the PrecioTiendaProductos in the database
        List<PrecioTiendaProductos> precioTiendaProductosList = precioTiendaProductosRepository.findAll();
        assertThat(precioTiendaProductosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPrecioTiendaProductos() throws Exception {
        // Initialize the database
        precioTiendaProductosRepository.saveAndFlush(precioTiendaProductos);

        // Get all the precioTiendaProductosList
        restPrecioTiendaProductosMockMvc.perform(get("/api/precio-tienda-productos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(precioTiendaProductos.getId().intValue())))
            .andExpect(jsonPath("$.[*].porcentaje").value(hasItem(DEFAULT_PORCENTAJE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getPrecioTiendaProductos() throws Exception {
        // Initialize the database
        precioTiendaProductosRepository.saveAndFlush(precioTiendaProductos);

        // Get the precioTiendaProductos
        restPrecioTiendaProductosMockMvc.perform(get("/api/precio-tienda-productos/{id}", precioTiendaProductos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(precioTiendaProductos.getId().intValue()))
            .andExpect(jsonPath("$.porcentaje").value(DEFAULT_PORCENTAJE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPrecioTiendaProductos() throws Exception {
        // Get the precioTiendaProductos
        restPrecioTiendaProductosMockMvc.perform(get("/api/precio-tienda-productos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrecioTiendaProductos() throws Exception {
        // Initialize the database
        precioTiendaProductosRepository.saveAndFlush(precioTiendaProductos);

        int databaseSizeBeforeUpdate = precioTiendaProductosRepository.findAll().size();

        // Update the precioTiendaProductos
        PrecioTiendaProductos updatedPrecioTiendaProductos = precioTiendaProductosRepository.findById(precioTiendaProductos.getId()).get();
        // Disconnect from session so that the updates on updatedPrecioTiendaProductos are not directly saved in db
        em.detach(updatedPrecioTiendaProductos);
        updatedPrecioTiendaProductos
            .porcentaje(UPDATED_PORCENTAJE);

        restPrecioTiendaProductosMockMvc.perform(put("/api/precio-tienda-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrecioTiendaProductos)))
            .andExpect(status().isOk());

        // Validate the PrecioTiendaProductos in the database
        List<PrecioTiendaProductos> precioTiendaProductosList = precioTiendaProductosRepository.findAll();
        assertThat(precioTiendaProductosList).hasSize(databaseSizeBeforeUpdate);
        PrecioTiendaProductos testPrecioTiendaProductos = precioTiendaProductosList.get(precioTiendaProductosList.size() - 1);
        assertThat(testPrecioTiendaProductos.getPorcentaje()).isEqualTo(UPDATED_PORCENTAJE);
    }

    @Test
    @Transactional
    public void updateNonExistingPrecioTiendaProductos() throws Exception {
        int databaseSizeBeforeUpdate = precioTiendaProductosRepository.findAll().size();

        // Create the PrecioTiendaProductos

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrecioTiendaProductosMockMvc.perform(put("/api/precio-tienda-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(precioTiendaProductos)))
            .andExpect(status().isBadRequest());

        // Validate the PrecioTiendaProductos in the database
        List<PrecioTiendaProductos> precioTiendaProductosList = precioTiendaProductosRepository.findAll();
        assertThat(precioTiendaProductosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrecioTiendaProductos() throws Exception {
        // Initialize the database
        precioTiendaProductosRepository.saveAndFlush(precioTiendaProductos);

        int databaseSizeBeforeDelete = precioTiendaProductosRepository.findAll().size();

        // Get the precioTiendaProductos
        restPrecioTiendaProductosMockMvc.perform(delete("/api/precio-tienda-productos/{id}", precioTiendaProductos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PrecioTiendaProductos> precioTiendaProductosList = precioTiendaProductosRepository.findAll();
        assertThat(precioTiendaProductosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrecioTiendaProductos.class);
        PrecioTiendaProductos precioTiendaProductos1 = new PrecioTiendaProductos();
        precioTiendaProductos1.setId(1L);
        PrecioTiendaProductos precioTiendaProductos2 = new PrecioTiendaProductos();
        precioTiendaProductos2.setId(precioTiendaProductos1.getId());
        assertThat(precioTiendaProductos1).isEqualTo(precioTiendaProductos2);
        precioTiendaProductos2.setId(2L);
        assertThat(precioTiendaProductos1).isNotEqualTo(precioTiendaProductos2);
        precioTiendaProductos1.setId(null);
        assertThat(precioTiendaProductos1).isNotEqualTo(precioTiendaProductos2);
    }
}
