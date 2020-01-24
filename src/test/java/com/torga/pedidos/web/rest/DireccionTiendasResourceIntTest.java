package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.DireccionTiendas;
import com.torga.pedidos.repository.DireccionTiendasRepository;
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
 * Test class for the DireccionTiendasResource REST controller.
 *
 * @see DireccionTiendasResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class DireccionTiendasResourceIntTest {

    private static final Float DEFAULT_NUMERO = 1F;
    private static final Float UPDATED_NUMERO = 2F;

    private static final Float DEFAULT_COD_POSTAL = 1F;
    private static final Float UPDATED_COD_POSTAL = 2F;

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    @Autowired
    private DireccionTiendasRepository direccionTiendasRepository;

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

    private MockMvc restDireccionTiendasMockMvc;

    private DireccionTiendas direccionTiendas;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DireccionTiendasResource direccionTiendasResource = new DireccionTiendasResource(direccionTiendasRepository);
        this.restDireccionTiendasMockMvc = MockMvcBuilders.standaloneSetup(direccionTiendasResource)
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
    public static DireccionTiendas createEntity(EntityManager em) {
        DireccionTiendas direccionTiendas = new DireccionTiendas()
            .numero(DEFAULT_NUMERO)
            .codPostal(DEFAULT_COD_POSTAL)
            .direccion(DEFAULT_DIRECCION);
        return direccionTiendas;
    }

    @Before
    public void initTest() {
        direccionTiendas = createEntity(em);
    }

    @Test
    @Transactional
    public void createDireccionTiendas() throws Exception {
        int databaseSizeBeforeCreate = direccionTiendasRepository.findAll().size();

        // Create the DireccionTiendas
        restDireccionTiendasMockMvc.perform(post("/api/direccion-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccionTiendas)))
            .andExpect(status().isCreated());

        // Validate the DireccionTiendas in the database
        List<DireccionTiendas> direccionTiendasList = direccionTiendasRepository.findAll();
        assertThat(direccionTiendasList).hasSize(databaseSizeBeforeCreate + 1);
        DireccionTiendas testDireccionTiendas = direccionTiendasList.get(direccionTiendasList.size() - 1);
        assertThat(testDireccionTiendas.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testDireccionTiendas.getCodPostal()).isEqualTo(DEFAULT_COD_POSTAL);
        assertThat(testDireccionTiendas.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
    }

    @Test
    @Transactional
    public void createDireccionTiendasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = direccionTiendasRepository.findAll().size();

        // Create the DireccionTiendas with an existing ID
        direccionTiendas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDireccionTiendasMockMvc.perform(post("/api/direccion-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccionTiendas)))
            .andExpect(status().isBadRequest());

        // Validate the DireccionTiendas in the database
        List<DireccionTiendas> direccionTiendasList = direccionTiendasRepository.findAll();
        assertThat(direccionTiendasList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDireccionTiendas() throws Exception {
        // Initialize the database
        direccionTiendasRepository.saveAndFlush(direccionTiendas);

        // Get all the direccionTiendasList
        restDireccionTiendasMockMvc.perform(get("/api/direccion-tiendas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(direccionTiendas.getId().intValue())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO.doubleValue())))
            .andExpect(jsonPath("$.[*].codPostal").value(hasItem(DEFAULT_COD_POSTAL.doubleValue())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())));
    }
    
    @Test
    @Transactional
    public void getDireccionTiendas() throws Exception {
        // Initialize the database
        direccionTiendasRepository.saveAndFlush(direccionTiendas);

        // Get the direccionTiendas
        restDireccionTiendasMockMvc.perform(get("/api/direccion-tiendas/{id}", direccionTiendas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(direccionTiendas.getId().intValue()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO.doubleValue()))
            .andExpect(jsonPath("$.codPostal").value(DEFAULT_COD_POSTAL.doubleValue()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDireccionTiendas() throws Exception {
        // Get the direccionTiendas
        restDireccionTiendasMockMvc.perform(get("/api/direccion-tiendas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDireccionTiendas() throws Exception {
        // Initialize the database
        direccionTiendasRepository.saveAndFlush(direccionTiendas);

        int databaseSizeBeforeUpdate = direccionTiendasRepository.findAll().size();

        // Update the direccionTiendas
        DireccionTiendas updatedDireccionTiendas = direccionTiendasRepository.findById(direccionTiendas.getId()).get();
        // Disconnect from session so that the updates on updatedDireccionTiendas are not directly saved in db
        em.detach(updatedDireccionTiendas);
        updatedDireccionTiendas
            .numero(UPDATED_NUMERO)
            .codPostal(UPDATED_COD_POSTAL)
            .direccion(UPDATED_DIRECCION);

        restDireccionTiendasMockMvc.perform(put("/api/direccion-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDireccionTiendas)))
            .andExpect(status().isOk());

        // Validate the DireccionTiendas in the database
        List<DireccionTiendas> direccionTiendasList = direccionTiendasRepository.findAll();
        assertThat(direccionTiendasList).hasSize(databaseSizeBeforeUpdate);
        DireccionTiendas testDireccionTiendas = direccionTiendasList.get(direccionTiendasList.size() - 1);
        assertThat(testDireccionTiendas.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testDireccionTiendas.getCodPostal()).isEqualTo(UPDATED_COD_POSTAL);
        assertThat(testDireccionTiendas.getDireccion()).isEqualTo(UPDATED_DIRECCION);
    }

    @Test
    @Transactional
    public void updateNonExistingDireccionTiendas() throws Exception {
        int databaseSizeBeforeUpdate = direccionTiendasRepository.findAll().size();

        // Create the DireccionTiendas

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDireccionTiendasMockMvc.perform(put("/api/direccion-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccionTiendas)))
            .andExpect(status().isBadRequest());

        // Validate the DireccionTiendas in the database
        List<DireccionTiendas> direccionTiendasList = direccionTiendasRepository.findAll();
        assertThat(direccionTiendasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDireccionTiendas() throws Exception {
        // Initialize the database
        direccionTiendasRepository.saveAndFlush(direccionTiendas);

        int databaseSizeBeforeDelete = direccionTiendasRepository.findAll().size();

        // Get the direccionTiendas
        restDireccionTiendasMockMvc.perform(delete("/api/direccion-tiendas/{id}", direccionTiendas.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DireccionTiendas> direccionTiendasList = direccionTiendasRepository.findAll();
        assertThat(direccionTiendasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DireccionTiendas.class);
        DireccionTiendas direccionTiendas1 = new DireccionTiendas();
        direccionTiendas1.setId(1L);
        DireccionTiendas direccionTiendas2 = new DireccionTiendas();
        direccionTiendas2.setId(direccionTiendas1.getId());
        assertThat(direccionTiendas1).isEqualTo(direccionTiendas2);
        direccionTiendas2.setId(2L);
        assertThat(direccionTiendas1).isNotEqualTo(direccionTiendas2);
        direccionTiendas1.setId(null);
        assertThat(direccionTiendas1).isNotEqualTo(direccionTiendas2);
    }
}
