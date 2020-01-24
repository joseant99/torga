package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.PrecioFinalPresu;
import com.torga.pedidos.repository.PrecioFinalPresuRepository;
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
 * Test class for the PrecioFinalPresuResource REST controller.
 *
 * @see PrecioFinalPresuResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class PrecioFinalPresuResourceIntTest {

    private static final String DEFAULT_PRECIO_PRODS = "AAAAAAAAAA";
    private static final String UPDATED_PRECIO_PRODS = "BBBBBBBBBB";

    private static final Float DEFAULT_TOTAL_SIN_IVA = 1F;
    private static final Float UPDATED_TOTAL_SIN_IVA = 2F;

    private static final Float DEFAULT_IVA = 1F;
    private static final Float UPDATED_IVA = 2F;

    private static final Float DEFAULT_TOTAL_CON_IVA = 1F;
    private static final Float UPDATED_TOTAL_CON_IVA = 2F;

    private static final Float DEFAULT_DESCUENTO_PORCENTAJE = 1F;
    private static final Float UPDATED_DESCUENTO_PORCENTAJE = 2F;

    private static final Float DEFAULT_PRECIO_DESCUENTO = 1F;
    private static final Float UPDATED_PRECIO_DESCUENTO = 2F;

    @Autowired
    private PrecioFinalPresuRepository precioFinalPresuRepository;

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

    private MockMvc restPrecioFinalPresuMockMvc;

    private PrecioFinalPresu precioFinalPresu;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrecioFinalPresuResource precioFinalPresuResource = new PrecioFinalPresuResource(precioFinalPresuRepository);
        this.restPrecioFinalPresuMockMvc = MockMvcBuilders.standaloneSetup(precioFinalPresuResource)
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
    public static PrecioFinalPresu createEntity(EntityManager em) {
        PrecioFinalPresu precioFinalPresu = new PrecioFinalPresu()
            .precioProds(DEFAULT_PRECIO_PRODS)
            .totalSinIva(DEFAULT_TOTAL_SIN_IVA)
            .iva(DEFAULT_IVA)
            .totalConIva(DEFAULT_TOTAL_CON_IVA)
            .descuentoPorcentaje(DEFAULT_DESCUENTO_PORCENTAJE)
            .precioDescuento(DEFAULT_PRECIO_DESCUENTO);
        return precioFinalPresu;
    }

    @Before
    public void initTest() {
        precioFinalPresu = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrecioFinalPresu() throws Exception {
        int databaseSizeBeforeCreate = precioFinalPresuRepository.findAll().size();

        // Create the PrecioFinalPresu
        restPrecioFinalPresuMockMvc.perform(post("/api/precio-final-presus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(precioFinalPresu)))
            .andExpect(status().isCreated());

        // Validate the PrecioFinalPresu in the database
        List<PrecioFinalPresu> precioFinalPresuList = precioFinalPresuRepository.findAll();
        assertThat(precioFinalPresuList).hasSize(databaseSizeBeforeCreate + 1);
        PrecioFinalPresu testPrecioFinalPresu = precioFinalPresuList.get(precioFinalPresuList.size() - 1);
        assertThat(testPrecioFinalPresu.getPrecioProds()).isEqualTo(DEFAULT_PRECIO_PRODS);
        assertThat(testPrecioFinalPresu.getTotalSinIva()).isEqualTo(DEFAULT_TOTAL_SIN_IVA);
        assertThat(testPrecioFinalPresu.getIva()).isEqualTo(DEFAULT_IVA);
        assertThat(testPrecioFinalPresu.getTotalConIva()).isEqualTo(DEFAULT_TOTAL_CON_IVA);
        assertThat(testPrecioFinalPresu.getDescuentoPorcentaje()).isEqualTo(DEFAULT_DESCUENTO_PORCENTAJE);
        assertThat(testPrecioFinalPresu.getPrecioDescuento()).isEqualTo(DEFAULT_PRECIO_DESCUENTO);
    }

    @Test
    @Transactional
    public void createPrecioFinalPresuWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = precioFinalPresuRepository.findAll().size();

        // Create the PrecioFinalPresu with an existing ID
        precioFinalPresu.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrecioFinalPresuMockMvc.perform(post("/api/precio-final-presus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(precioFinalPresu)))
            .andExpect(status().isBadRequest());

        // Validate the PrecioFinalPresu in the database
        List<PrecioFinalPresu> precioFinalPresuList = precioFinalPresuRepository.findAll();
        assertThat(precioFinalPresuList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPrecioFinalPresus() throws Exception {
        // Initialize the database
        precioFinalPresuRepository.saveAndFlush(precioFinalPresu);

        // Get all the precioFinalPresuList
        restPrecioFinalPresuMockMvc.perform(get("/api/precio-final-presus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(precioFinalPresu.getId().intValue())))
            .andExpect(jsonPath("$.[*].precioProds").value(hasItem(DEFAULT_PRECIO_PRODS.toString())))
            .andExpect(jsonPath("$.[*].totalSinIva").value(hasItem(DEFAULT_TOTAL_SIN_IVA.doubleValue())))
            .andExpect(jsonPath("$.[*].iva").value(hasItem(DEFAULT_IVA.doubleValue())))
            .andExpect(jsonPath("$.[*].totalConIva").value(hasItem(DEFAULT_TOTAL_CON_IVA.doubleValue())))
            .andExpect(jsonPath("$.[*].descuentoPorcentaje").value(hasItem(DEFAULT_DESCUENTO_PORCENTAJE.doubleValue())))
            .andExpect(jsonPath("$.[*].precioDescuento").value(hasItem(DEFAULT_PRECIO_DESCUENTO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getPrecioFinalPresu() throws Exception {
        // Initialize the database
        precioFinalPresuRepository.saveAndFlush(precioFinalPresu);

        // Get the precioFinalPresu
        restPrecioFinalPresuMockMvc.perform(get("/api/precio-final-presus/{id}", precioFinalPresu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(precioFinalPresu.getId().intValue()))
            .andExpect(jsonPath("$.precioProds").value(DEFAULT_PRECIO_PRODS.toString()))
            .andExpect(jsonPath("$.totalSinIva").value(DEFAULT_TOTAL_SIN_IVA.doubleValue()))
            .andExpect(jsonPath("$.iva").value(DEFAULT_IVA.doubleValue()))
            .andExpect(jsonPath("$.totalConIva").value(DEFAULT_TOTAL_CON_IVA.doubleValue()))
            .andExpect(jsonPath("$.descuentoPorcentaje").value(DEFAULT_DESCUENTO_PORCENTAJE.doubleValue()))
            .andExpect(jsonPath("$.precioDescuento").value(DEFAULT_PRECIO_DESCUENTO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPrecioFinalPresu() throws Exception {
        // Get the precioFinalPresu
        restPrecioFinalPresuMockMvc.perform(get("/api/precio-final-presus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrecioFinalPresu() throws Exception {
        // Initialize the database
        precioFinalPresuRepository.saveAndFlush(precioFinalPresu);

        int databaseSizeBeforeUpdate = precioFinalPresuRepository.findAll().size();

        // Update the precioFinalPresu
        PrecioFinalPresu updatedPrecioFinalPresu = precioFinalPresuRepository.findById(precioFinalPresu.getId()).get();
        // Disconnect from session so that the updates on updatedPrecioFinalPresu are not directly saved in db
        em.detach(updatedPrecioFinalPresu);
        updatedPrecioFinalPresu
            .precioProds(UPDATED_PRECIO_PRODS)
            .totalSinIva(UPDATED_TOTAL_SIN_IVA)
            .iva(UPDATED_IVA)
            .totalConIva(UPDATED_TOTAL_CON_IVA)
            .descuentoPorcentaje(UPDATED_DESCUENTO_PORCENTAJE)
            .precioDescuento(UPDATED_PRECIO_DESCUENTO);

        restPrecioFinalPresuMockMvc.perform(put("/api/precio-final-presus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrecioFinalPresu)))
            .andExpect(status().isOk());

        // Validate the PrecioFinalPresu in the database
        List<PrecioFinalPresu> precioFinalPresuList = precioFinalPresuRepository.findAll();
        assertThat(precioFinalPresuList).hasSize(databaseSizeBeforeUpdate);
        PrecioFinalPresu testPrecioFinalPresu = precioFinalPresuList.get(precioFinalPresuList.size() - 1);
        assertThat(testPrecioFinalPresu.getPrecioProds()).isEqualTo(UPDATED_PRECIO_PRODS);
        assertThat(testPrecioFinalPresu.getTotalSinIva()).isEqualTo(UPDATED_TOTAL_SIN_IVA);
        assertThat(testPrecioFinalPresu.getIva()).isEqualTo(UPDATED_IVA);
        assertThat(testPrecioFinalPresu.getTotalConIva()).isEqualTo(UPDATED_TOTAL_CON_IVA);
        assertThat(testPrecioFinalPresu.getDescuentoPorcentaje()).isEqualTo(UPDATED_DESCUENTO_PORCENTAJE);
        assertThat(testPrecioFinalPresu.getPrecioDescuento()).isEqualTo(UPDATED_PRECIO_DESCUENTO);
    }

    @Test
    @Transactional
    public void updateNonExistingPrecioFinalPresu() throws Exception {
        int databaseSizeBeforeUpdate = precioFinalPresuRepository.findAll().size();

        // Create the PrecioFinalPresu

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrecioFinalPresuMockMvc.perform(put("/api/precio-final-presus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(precioFinalPresu)))
            .andExpect(status().isBadRequest());

        // Validate the PrecioFinalPresu in the database
        List<PrecioFinalPresu> precioFinalPresuList = precioFinalPresuRepository.findAll();
        assertThat(precioFinalPresuList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrecioFinalPresu() throws Exception {
        // Initialize the database
        precioFinalPresuRepository.saveAndFlush(precioFinalPresu);

        int databaseSizeBeforeDelete = precioFinalPresuRepository.findAll().size();

        // Get the precioFinalPresu
        restPrecioFinalPresuMockMvc.perform(delete("/api/precio-final-presus/{id}", precioFinalPresu.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PrecioFinalPresu> precioFinalPresuList = precioFinalPresuRepository.findAll();
        assertThat(precioFinalPresuList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrecioFinalPresu.class);
        PrecioFinalPresu precioFinalPresu1 = new PrecioFinalPresu();
        precioFinalPresu1.setId(1L);
        PrecioFinalPresu precioFinalPresu2 = new PrecioFinalPresu();
        precioFinalPresu2.setId(precioFinalPresu1.getId());
        assertThat(precioFinalPresu1).isEqualTo(precioFinalPresu2);
        precioFinalPresu2.setId(2L);
        assertThat(precioFinalPresu1).isNotEqualTo(precioFinalPresu2);
        precioFinalPresu1.setId(null);
        assertThat(precioFinalPresu1).isNotEqualTo(precioFinalPresu2);
    }
}
