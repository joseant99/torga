package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Casco;
import com.torga.pedidos.repository.CascoRepository;
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
 * Test class for the CascoResource REST controller.
 *
 * @see CascoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class CascoResourceIntTest {

    private static final Float DEFAULT_ANCHO = 1F;
    private static final Float UPDATED_ANCHO = 2F;

    private static final Float DEFAULT_ALTO = 1F;
    private static final Float UPDATED_ALTO = 2F;

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    private static final Float DEFAULT_PRECIO_COSTADO = 1F;
    private static final Float UPDATED_PRECIO_COSTADO = 2F;

    private static final Float DEFAULT_ANCHO_MIN = 1F;
    private static final Float UPDATED_ANCHO_MIN = 2F;

    private static final Float DEFAULT_ANCHO_MAX = 1F;
    private static final Float UPDATED_ANCHO_MAX = 2F;

    private static final Float DEFAULT_ALTO_MIN = 1F;
    private static final Float UPDATED_ALTO_MIN = 2F;

    private static final Float DEFAULT_ALTO_MAX = 1F;
    private static final Float UPDATED_ALTO_MAX = 2F;

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final Float DEFAULT_PILOTO = 1F;
    private static final Float UPDATED_PILOTO = 2F;

    @Autowired
    private CascoRepository cascoRepository;

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

    private MockMvc restCascoMockMvc;

    private Casco casco;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CascoResource cascoResource = new CascoResource(cascoRepository);
        this.restCascoMockMvc = MockMvcBuilders.standaloneSetup(cascoResource)
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
    public static Casco createEntity(EntityManager em) {
        Casco casco = new Casco()
            .ancho(DEFAULT_ANCHO)
            .alto(DEFAULT_ALTO)
            .precio(DEFAULT_PRECIO)
            .precioCostado(DEFAULT_PRECIO_COSTADO)
            .anchoMin(DEFAULT_ANCHO_MIN)
            .anchoMax(DEFAULT_ANCHO_MAX)
            .altoMin(DEFAULT_ALTO_MIN)
            .altoMax(DEFAULT_ALTO_MAX)
            .codigo(DEFAULT_CODIGO)
            .piloto(DEFAULT_PILOTO);
        return casco;
    }

    @Before
    public void initTest() {
        casco = createEntity(em);
    }

    @Test
    @Transactional
    public void createCasco() throws Exception {
        int databaseSizeBeforeCreate = cascoRepository.findAll().size();

        // Create the Casco
        restCascoMockMvc.perform(post("/api/cascos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(casco)))
            .andExpect(status().isCreated());

        // Validate the Casco in the database
        List<Casco> cascoList = cascoRepository.findAll();
        assertThat(cascoList).hasSize(databaseSizeBeforeCreate + 1);
        Casco testCasco = cascoList.get(cascoList.size() - 1);
        assertThat(testCasco.getAncho()).isEqualTo(DEFAULT_ANCHO);
        assertThat(testCasco.getAlto()).isEqualTo(DEFAULT_ALTO);
        assertThat(testCasco.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testCasco.getPrecioCostado()).isEqualTo(DEFAULT_PRECIO_COSTADO);
        assertThat(testCasco.getAnchoMin()).isEqualTo(DEFAULT_ANCHO_MIN);
        assertThat(testCasco.getAnchoMax()).isEqualTo(DEFAULT_ANCHO_MAX);
        assertThat(testCasco.getAltoMin()).isEqualTo(DEFAULT_ALTO_MIN);
        assertThat(testCasco.getAltoMax()).isEqualTo(DEFAULT_ALTO_MAX);
        assertThat(testCasco.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testCasco.getPiloto()).isEqualTo(DEFAULT_PILOTO);
    }

    @Test
    @Transactional
    public void createCascoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cascoRepository.findAll().size();

        // Create the Casco with an existing ID
        casco.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCascoMockMvc.perform(post("/api/cascos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(casco)))
            .andExpect(status().isBadRequest());

        // Validate the Casco in the database
        List<Casco> cascoList = cascoRepository.findAll();
        assertThat(cascoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCascos() throws Exception {
        // Initialize the database
        cascoRepository.saveAndFlush(casco);

        // Get all the cascoList
        restCascoMockMvc.perform(get("/api/cascos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(casco.getId().intValue())))
            .andExpect(jsonPath("$.[*].ancho").value(hasItem(DEFAULT_ANCHO.doubleValue())))
            .andExpect(jsonPath("$.[*].alto").value(hasItem(DEFAULT_ALTO.doubleValue())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())))
            .andExpect(jsonPath("$.[*].precioCostado").value(hasItem(DEFAULT_PRECIO_COSTADO.doubleValue())))
            .andExpect(jsonPath("$.[*].anchoMin").value(hasItem(DEFAULT_ANCHO_MIN.doubleValue())))
            .andExpect(jsonPath("$.[*].anchoMax").value(hasItem(DEFAULT_ANCHO_MAX.doubleValue())))
            .andExpect(jsonPath("$.[*].altoMin").value(hasItem(DEFAULT_ALTO_MIN.doubleValue())))
            .andExpect(jsonPath("$.[*].altoMax").value(hasItem(DEFAULT_ALTO_MAX.doubleValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].piloto").value(hasItem(DEFAULT_PILOTO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getCasco() throws Exception {
        // Initialize the database
        cascoRepository.saveAndFlush(casco);

        // Get the casco
        restCascoMockMvc.perform(get("/api/cascos/{id}", casco.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(casco.getId().intValue()))
            .andExpect(jsonPath("$.ancho").value(DEFAULT_ANCHO.doubleValue()))
            .andExpect(jsonPath("$.alto").value(DEFAULT_ALTO.doubleValue()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()))
            .andExpect(jsonPath("$.precioCostado").value(DEFAULT_PRECIO_COSTADO.doubleValue()))
            .andExpect(jsonPath("$.anchoMin").value(DEFAULT_ANCHO_MIN.doubleValue()))
            .andExpect(jsonPath("$.anchoMax").value(DEFAULT_ANCHO_MAX.doubleValue()))
            .andExpect(jsonPath("$.altoMin").value(DEFAULT_ALTO_MIN.doubleValue()))
            .andExpect(jsonPath("$.altoMax").value(DEFAULT_ALTO_MAX.doubleValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.piloto").value(DEFAULT_PILOTO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCasco() throws Exception {
        // Get the casco
        restCascoMockMvc.perform(get("/api/cascos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCasco() throws Exception {
        // Initialize the database
        cascoRepository.saveAndFlush(casco);

        int databaseSizeBeforeUpdate = cascoRepository.findAll().size();

        // Update the casco
        Casco updatedCasco = cascoRepository.findById(casco.getId()).get();
        // Disconnect from session so that the updates on updatedCasco are not directly saved in db
        em.detach(updatedCasco);
        updatedCasco
            .ancho(UPDATED_ANCHO)
            .alto(UPDATED_ALTO)
            .precio(UPDATED_PRECIO)
            .precioCostado(UPDATED_PRECIO_COSTADO)
            .anchoMin(UPDATED_ANCHO_MIN)
            .anchoMax(UPDATED_ANCHO_MAX)
            .altoMin(UPDATED_ALTO_MIN)
            .altoMax(UPDATED_ALTO_MAX)
            .codigo(UPDATED_CODIGO)
            .piloto(UPDATED_PILOTO);

        restCascoMockMvc.perform(put("/api/cascos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCasco)))
            .andExpect(status().isOk());

        // Validate the Casco in the database
        List<Casco> cascoList = cascoRepository.findAll();
        assertThat(cascoList).hasSize(databaseSizeBeforeUpdate);
        Casco testCasco = cascoList.get(cascoList.size() - 1);
        assertThat(testCasco.getAncho()).isEqualTo(UPDATED_ANCHO);
        assertThat(testCasco.getAlto()).isEqualTo(UPDATED_ALTO);
        assertThat(testCasco.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testCasco.getPrecioCostado()).isEqualTo(UPDATED_PRECIO_COSTADO);
        assertThat(testCasco.getAnchoMin()).isEqualTo(UPDATED_ANCHO_MIN);
        assertThat(testCasco.getAnchoMax()).isEqualTo(UPDATED_ANCHO_MAX);
        assertThat(testCasco.getAltoMin()).isEqualTo(UPDATED_ALTO_MIN);
        assertThat(testCasco.getAltoMax()).isEqualTo(UPDATED_ALTO_MAX);
        assertThat(testCasco.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testCasco.getPiloto()).isEqualTo(UPDATED_PILOTO);
    }

    @Test
    @Transactional
    public void updateNonExistingCasco() throws Exception {
        int databaseSizeBeforeUpdate = cascoRepository.findAll().size();

        // Create the Casco

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCascoMockMvc.perform(put("/api/cascos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(casco)))
            .andExpect(status().isBadRequest());

        // Validate the Casco in the database
        List<Casco> cascoList = cascoRepository.findAll();
        assertThat(cascoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCasco() throws Exception {
        // Initialize the database
        cascoRepository.saveAndFlush(casco);

        int databaseSizeBeforeDelete = cascoRepository.findAll().size();

        // Get the casco
        restCascoMockMvc.perform(delete("/api/cascos/{id}", casco.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Casco> cascoList = cascoRepository.findAll();
        assertThat(cascoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Casco.class);
        Casco casco1 = new Casco();
        casco1.setId(1L);
        Casco casco2 = new Casco();
        casco2.setId(casco1.getId());
        assertThat(casco1).isEqualTo(casco2);
        casco2.setId(2L);
        assertThat(casco1).isNotEqualTo(casco2);
        casco1.setId(null);
        assertThat(casco1).isNotEqualTo(casco2);
    }
}
