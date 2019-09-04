package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.MedidasEspeciales;
import com.torga.pedidos.repository.MedidasEspecialesRepository;
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
 * Test class for the MedidasEspecialesResource REST controller.
 *
 * @see MedidasEspecialesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class MedidasEspecialesResourceIntTest {

    private static final Float DEFAULT_ANCHO = 1F;
    private static final Float UPDATED_ANCHO = 2F;

    private static final Float DEFAULT_FONDO = 1F;
    private static final Float UPDATED_FONDO = 2F;

    private static final Float DEFAULT_ALTO = 1F;
    private static final Float UPDATED_ALTO = 2F;

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    private static final Float DEFAULT_MIN = 1F;
    private static final Float UPDATED_MIN = 2F;

    private static final Float DEFAULT_MAX = 1F;
    private static final Float UPDATED_MAX = 2F;

    @Autowired
    private MedidasEspecialesRepository medidasEspecialesRepository;

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

    private MockMvc restMedidasEspecialesMockMvc;

    private MedidasEspeciales medidasEspeciales;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MedidasEspecialesResource medidasEspecialesResource = new MedidasEspecialesResource(medidasEspecialesRepository);
        this.restMedidasEspecialesMockMvc = MockMvcBuilders.standaloneSetup(medidasEspecialesResource)
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
    public static MedidasEspeciales createEntity(EntityManager em) {
        MedidasEspeciales medidasEspeciales = new MedidasEspeciales()
            .ancho(DEFAULT_ANCHO)
            .fondo(DEFAULT_FONDO)
            .alto(DEFAULT_ALTO)
            .precio(DEFAULT_PRECIO)
            .min(DEFAULT_MIN)
            .max(DEFAULT_MAX);
        return medidasEspeciales;
    }

    @Before
    public void initTest() {
        medidasEspeciales = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedidasEspeciales() throws Exception {
        int databaseSizeBeforeCreate = medidasEspecialesRepository.findAll().size();

        // Create the MedidasEspeciales
        restMedidasEspecialesMockMvc.perform(post("/api/medidas-especiales")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medidasEspeciales)))
            .andExpect(status().isCreated());

        // Validate the MedidasEspeciales in the database
        List<MedidasEspeciales> medidasEspecialesList = medidasEspecialesRepository.findAll();
        assertThat(medidasEspecialesList).hasSize(databaseSizeBeforeCreate + 1);
        MedidasEspeciales testMedidasEspeciales = medidasEspecialesList.get(medidasEspecialesList.size() - 1);
        assertThat(testMedidasEspeciales.getAncho()).isEqualTo(DEFAULT_ANCHO);
        assertThat(testMedidasEspeciales.getFondo()).isEqualTo(DEFAULT_FONDO);
        assertThat(testMedidasEspeciales.getAlto()).isEqualTo(DEFAULT_ALTO);
        assertThat(testMedidasEspeciales.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testMedidasEspeciales.getMin()).isEqualTo(DEFAULT_MIN);
        assertThat(testMedidasEspeciales.getMax()).isEqualTo(DEFAULT_MAX);
    }

    @Test
    @Transactional
    public void createMedidasEspecialesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medidasEspecialesRepository.findAll().size();

        // Create the MedidasEspeciales with an existing ID
        medidasEspeciales.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedidasEspecialesMockMvc.perform(post("/api/medidas-especiales")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medidasEspeciales)))
            .andExpect(status().isBadRequest());

        // Validate the MedidasEspeciales in the database
        List<MedidasEspeciales> medidasEspecialesList = medidasEspecialesRepository.findAll();
        assertThat(medidasEspecialesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMedidasEspeciales() throws Exception {
        // Initialize the database
        medidasEspecialesRepository.saveAndFlush(medidasEspeciales);

        // Get all the medidasEspecialesList
        restMedidasEspecialesMockMvc.perform(get("/api/medidas-especiales?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medidasEspeciales.getId().intValue())))
            .andExpect(jsonPath("$.[*].ancho").value(hasItem(DEFAULT_ANCHO.doubleValue())))
            .andExpect(jsonPath("$.[*].fondo").value(hasItem(DEFAULT_FONDO.doubleValue())))
            .andExpect(jsonPath("$.[*].alto").value(hasItem(DEFAULT_ALTO.doubleValue())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())))
            .andExpect(jsonPath("$.[*].min").value(hasItem(DEFAULT_MIN.doubleValue())))
            .andExpect(jsonPath("$.[*].max").value(hasItem(DEFAULT_MAX.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getMedidasEspeciales() throws Exception {
        // Initialize the database
        medidasEspecialesRepository.saveAndFlush(medidasEspeciales);

        // Get the medidasEspeciales
        restMedidasEspecialesMockMvc.perform(get("/api/medidas-especiales/{id}", medidasEspeciales.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(medidasEspeciales.getId().intValue()))
            .andExpect(jsonPath("$.ancho").value(DEFAULT_ANCHO.doubleValue()))
            .andExpect(jsonPath("$.fondo").value(DEFAULT_FONDO.doubleValue()))
            .andExpect(jsonPath("$.alto").value(DEFAULT_ALTO.doubleValue()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()))
            .andExpect(jsonPath("$.min").value(DEFAULT_MIN.doubleValue()))
            .andExpect(jsonPath("$.max").value(DEFAULT_MAX.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMedidasEspeciales() throws Exception {
        // Get the medidasEspeciales
        restMedidasEspecialesMockMvc.perform(get("/api/medidas-especiales/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedidasEspeciales() throws Exception {
        // Initialize the database
        medidasEspecialesRepository.saveAndFlush(medidasEspeciales);

        int databaseSizeBeforeUpdate = medidasEspecialesRepository.findAll().size();

        // Update the medidasEspeciales
        MedidasEspeciales updatedMedidasEspeciales = medidasEspecialesRepository.findById(medidasEspeciales.getId()).get();
        // Disconnect from session so that the updates on updatedMedidasEspeciales are not directly saved in db
        em.detach(updatedMedidasEspeciales);
        updatedMedidasEspeciales
            .ancho(UPDATED_ANCHO)
            .fondo(UPDATED_FONDO)
            .alto(UPDATED_ALTO)
            .precio(UPDATED_PRECIO)
            .min(UPDATED_MIN)
            .max(UPDATED_MAX);

        restMedidasEspecialesMockMvc.perform(put("/api/medidas-especiales")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedidasEspeciales)))
            .andExpect(status().isOk());

        // Validate the MedidasEspeciales in the database
        List<MedidasEspeciales> medidasEspecialesList = medidasEspecialesRepository.findAll();
        assertThat(medidasEspecialesList).hasSize(databaseSizeBeforeUpdate);
        MedidasEspeciales testMedidasEspeciales = medidasEspecialesList.get(medidasEspecialesList.size() - 1);
        assertThat(testMedidasEspeciales.getAncho()).isEqualTo(UPDATED_ANCHO);
        assertThat(testMedidasEspeciales.getFondo()).isEqualTo(UPDATED_FONDO);
        assertThat(testMedidasEspeciales.getAlto()).isEqualTo(UPDATED_ALTO);
        assertThat(testMedidasEspeciales.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testMedidasEspeciales.getMin()).isEqualTo(UPDATED_MIN);
        assertThat(testMedidasEspeciales.getMax()).isEqualTo(UPDATED_MAX);
    }

    @Test
    @Transactional
    public void updateNonExistingMedidasEspeciales() throws Exception {
        int databaseSizeBeforeUpdate = medidasEspecialesRepository.findAll().size();

        // Create the MedidasEspeciales

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedidasEspecialesMockMvc.perform(put("/api/medidas-especiales")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medidasEspeciales)))
            .andExpect(status().isBadRequest());

        // Validate the MedidasEspeciales in the database
        List<MedidasEspeciales> medidasEspecialesList = medidasEspecialesRepository.findAll();
        assertThat(medidasEspecialesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMedidasEspeciales() throws Exception {
        // Initialize the database
        medidasEspecialesRepository.saveAndFlush(medidasEspeciales);

        int databaseSizeBeforeDelete = medidasEspecialesRepository.findAll().size();

        // Get the medidasEspeciales
        restMedidasEspecialesMockMvc.perform(delete("/api/medidas-especiales/{id}", medidasEspeciales.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MedidasEspeciales> medidasEspecialesList = medidasEspecialesRepository.findAll();
        assertThat(medidasEspecialesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedidasEspeciales.class);
        MedidasEspeciales medidasEspeciales1 = new MedidasEspeciales();
        medidasEspeciales1.setId(1L);
        MedidasEspeciales medidasEspeciales2 = new MedidasEspeciales();
        medidasEspeciales2.setId(medidasEspeciales1.getId());
        assertThat(medidasEspeciales1).isEqualTo(medidasEspeciales2);
        medidasEspeciales2.setId(2L);
        assertThat(medidasEspeciales1).isNotEqualTo(medidasEspeciales2);
        medidasEspeciales1.setId(null);
        assertThat(medidasEspeciales1).isNotEqualTo(medidasEspeciales2);
    }
}
