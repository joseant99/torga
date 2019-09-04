package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.MedEspProductoPedidoPresu;
import com.torga.pedidos.repository.MedEspProductoPedidoPresuRepository;
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
 * Test class for the MedEspProductoPedidoPresuResource REST controller.
 *
 * @see MedEspProductoPedidoPresuResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class MedEspProductoPedidoPresuResourceIntTest {

    private static final Float DEFAULT_ANCHO = 1F;
    private static final Float UPDATED_ANCHO = 2F;

    private static final Float DEFAULT_FONDO = 1F;
    private static final Float UPDATED_FONDO = 2F;

    private static final Float DEFAULT_ALTO = 1F;
    private static final Float UPDATED_ALTO = 2F;

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    @Autowired
    private MedEspProductoPedidoPresuRepository medEspProductoPedidoPresuRepository;

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

    private MockMvc restMedEspProductoPedidoPresuMockMvc;

    private MedEspProductoPedidoPresu medEspProductoPedidoPresu;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MedEspProductoPedidoPresuResource medEspProductoPedidoPresuResource = new MedEspProductoPedidoPresuResource(medEspProductoPedidoPresuRepository);
        this.restMedEspProductoPedidoPresuMockMvc = MockMvcBuilders.standaloneSetup(medEspProductoPedidoPresuResource)
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
    public static MedEspProductoPedidoPresu createEntity(EntityManager em) {
        MedEspProductoPedidoPresu medEspProductoPedidoPresu = new MedEspProductoPedidoPresu()
            .ancho(DEFAULT_ANCHO)
            .fondo(DEFAULT_FONDO)
            .alto(DEFAULT_ALTO)
            .precio(DEFAULT_PRECIO);
        return medEspProductoPedidoPresu;
    }

    @Before
    public void initTest() {
        medEspProductoPedidoPresu = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedEspProductoPedidoPresu() throws Exception {
        int databaseSizeBeforeCreate = medEspProductoPedidoPresuRepository.findAll().size();

        // Create the MedEspProductoPedidoPresu
        restMedEspProductoPedidoPresuMockMvc.perform(post("/api/med-esp-producto-pedido-presus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medEspProductoPedidoPresu)))
            .andExpect(status().isCreated());

        // Validate the MedEspProductoPedidoPresu in the database
        List<MedEspProductoPedidoPresu> medEspProductoPedidoPresuList = medEspProductoPedidoPresuRepository.findAll();
        assertThat(medEspProductoPedidoPresuList).hasSize(databaseSizeBeforeCreate + 1);
        MedEspProductoPedidoPresu testMedEspProductoPedidoPresu = medEspProductoPedidoPresuList.get(medEspProductoPedidoPresuList.size() - 1);
        assertThat(testMedEspProductoPedidoPresu.getAncho()).isEqualTo(DEFAULT_ANCHO);
        assertThat(testMedEspProductoPedidoPresu.getFondo()).isEqualTo(DEFAULT_FONDO);
        assertThat(testMedEspProductoPedidoPresu.getAlto()).isEqualTo(DEFAULT_ALTO);
        assertThat(testMedEspProductoPedidoPresu.getPrecio()).isEqualTo(DEFAULT_PRECIO);
    }

    @Test
    @Transactional
    public void createMedEspProductoPedidoPresuWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medEspProductoPedidoPresuRepository.findAll().size();

        // Create the MedEspProductoPedidoPresu with an existing ID
        medEspProductoPedidoPresu.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedEspProductoPedidoPresuMockMvc.perform(post("/api/med-esp-producto-pedido-presus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medEspProductoPedidoPresu)))
            .andExpect(status().isBadRequest());

        // Validate the MedEspProductoPedidoPresu in the database
        List<MedEspProductoPedidoPresu> medEspProductoPedidoPresuList = medEspProductoPedidoPresuRepository.findAll();
        assertThat(medEspProductoPedidoPresuList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMedEspProductoPedidoPresus() throws Exception {
        // Initialize the database
        medEspProductoPedidoPresuRepository.saveAndFlush(medEspProductoPedidoPresu);

        // Get all the medEspProductoPedidoPresuList
        restMedEspProductoPedidoPresuMockMvc.perform(get("/api/med-esp-producto-pedido-presus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medEspProductoPedidoPresu.getId().intValue())))
            .andExpect(jsonPath("$.[*].ancho").value(hasItem(DEFAULT_ANCHO.doubleValue())))
            .andExpect(jsonPath("$.[*].fondo").value(hasItem(DEFAULT_FONDO.doubleValue())))
            .andExpect(jsonPath("$.[*].alto").value(hasItem(DEFAULT_ALTO.doubleValue())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getMedEspProductoPedidoPresu() throws Exception {
        // Initialize the database
        medEspProductoPedidoPresuRepository.saveAndFlush(medEspProductoPedidoPresu);

        // Get the medEspProductoPedidoPresu
        restMedEspProductoPedidoPresuMockMvc.perform(get("/api/med-esp-producto-pedido-presus/{id}", medEspProductoPedidoPresu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(medEspProductoPedidoPresu.getId().intValue()))
            .andExpect(jsonPath("$.ancho").value(DEFAULT_ANCHO.doubleValue()))
            .andExpect(jsonPath("$.fondo").value(DEFAULT_FONDO.doubleValue()))
            .andExpect(jsonPath("$.alto").value(DEFAULT_ALTO.doubleValue()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMedEspProductoPedidoPresu() throws Exception {
        // Get the medEspProductoPedidoPresu
        restMedEspProductoPedidoPresuMockMvc.perform(get("/api/med-esp-producto-pedido-presus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedEspProductoPedidoPresu() throws Exception {
        // Initialize the database
        medEspProductoPedidoPresuRepository.saveAndFlush(medEspProductoPedidoPresu);

        int databaseSizeBeforeUpdate = medEspProductoPedidoPresuRepository.findAll().size();

        // Update the medEspProductoPedidoPresu
        MedEspProductoPedidoPresu updatedMedEspProductoPedidoPresu = medEspProductoPedidoPresuRepository.findById(medEspProductoPedidoPresu.getId()).get();
        // Disconnect from session so that the updates on updatedMedEspProductoPedidoPresu are not directly saved in db
        em.detach(updatedMedEspProductoPedidoPresu);
        updatedMedEspProductoPedidoPresu
            .ancho(UPDATED_ANCHO)
            .fondo(UPDATED_FONDO)
            .alto(UPDATED_ALTO)
            .precio(UPDATED_PRECIO);

        restMedEspProductoPedidoPresuMockMvc.perform(put("/api/med-esp-producto-pedido-presus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedEspProductoPedidoPresu)))
            .andExpect(status().isOk());

        // Validate the MedEspProductoPedidoPresu in the database
        List<MedEspProductoPedidoPresu> medEspProductoPedidoPresuList = medEspProductoPedidoPresuRepository.findAll();
        assertThat(medEspProductoPedidoPresuList).hasSize(databaseSizeBeforeUpdate);
        MedEspProductoPedidoPresu testMedEspProductoPedidoPresu = medEspProductoPedidoPresuList.get(medEspProductoPedidoPresuList.size() - 1);
        assertThat(testMedEspProductoPedidoPresu.getAncho()).isEqualTo(UPDATED_ANCHO);
        assertThat(testMedEspProductoPedidoPresu.getFondo()).isEqualTo(UPDATED_FONDO);
        assertThat(testMedEspProductoPedidoPresu.getAlto()).isEqualTo(UPDATED_ALTO);
        assertThat(testMedEspProductoPedidoPresu.getPrecio()).isEqualTo(UPDATED_PRECIO);
    }

    @Test
    @Transactional
    public void updateNonExistingMedEspProductoPedidoPresu() throws Exception {
        int databaseSizeBeforeUpdate = medEspProductoPedidoPresuRepository.findAll().size();

        // Create the MedEspProductoPedidoPresu

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedEspProductoPedidoPresuMockMvc.perform(put("/api/med-esp-producto-pedido-presus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medEspProductoPedidoPresu)))
            .andExpect(status().isBadRequest());

        // Validate the MedEspProductoPedidoPresu in the database
        List<MedEspProductoPedidoPresu> medEspProductoPedidoPresuList = medEspProductoPedidoPresuRepository.findAll();
        assertThat(medEspProductoPedidoPresuList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMedEspProductoPedidoPresu() throws Exception {
        // Initialize the database
        medEspProductoPedidoPresuRepository.saveAndFlush(medEspProductoPedidoPresu);

        int databaseSizeBeforeDelete = medEspProductoPedidoPresuRepository.findAll().size();

        // Get the medEspProductoPedidoPresu
        restMedEspProductoPedidoPresuMockMvc.perform(delete("/api/med-esp-producto-pedido-presus/{id}", medEspProductoPedidoPresu.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MedEspProductoPedidoPresu> medEspProductoPedidoPresuList = medEspProductoPedidoPresuRepository.findAll();
        assertThat(medEspProductoPedidoPresuList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedEspProductoPedidoPresu.class);
        MedEspProductoPedidoPresu medEspProductoPedidoPresu1 = new MedEspProductoPedidoPresu();
        medEspProductoPedidoPresu1.setId(1L);
        MedEspProductoPedidoPresu medEspProductoPedidoPresu2 = new MedEspProductoPedidoPresu();
        medEspProductoPedidoPresu2.setId(medEspProductoPedidoPresu1.getId());
        assertThat(medEspProductoPedidoPresu1).isEqualTo(medEspProductoPedidoPresu2);
        medEspProductoPedidoPresu2.setId(2L);
        assertThat(medEspProductoPedidoPresu1).isNotEqualTo(medEspProductoPedidoPresu2);
        medEspProductoPedidoPresu1.setId(null);
        assertThat(medEspProductoPedidoPresu1).isNotEqualTo(medEspProductoPedidoPresu2);
    }
}
