package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Enmarcados;
import com.torga.pedidos.repository.EnmarcadosRepository;
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
 * Test class for the EnmarcadosResource REST controller.
 *
 * @see EnmarcadosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class EnmarcadosResourceIntTest {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    private static final Float DEFAULT_ANCHO_MIN = 1F;
    private static final Float UPDATED_ANCHO_MIN = 2F;

    private static final Float DEFAULT_ANCHO_MAX = 1F;
    private static final Float UPDATED_ANCHO_MAX = 2F;

    @Autowired
    private EnmarcadosRepository enmarcadosRepository;

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

    private MockMvc restEnmarcadosMockMvc;

    private Enmarcados enmarcados;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EnmarcadosResource enmarcadosResource = new EnmarcadosResource(enmarcadosRepository);
        this.restEnmarcadosMockMvc = MockMvcBuilders.standaloneSetup(enmarcadosResource)
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
    public static Enmarcados createEntity(EntityManager em) {
        Enmarcados enmarcados = new Enmarcados()
            .codigo(DEFAULT_CODIGO)
            .precio(DEFAULT_PRECIO)
            .anchoMin(DEFAULT_ANCHO_MIN)
            .anchoMax(DEFAULT_ANCHO_MAX);
        return enmarcados;
    }

    @Before
    public void initTest() {
        enmarcados = createEntity(em);
    }

    @Test
    @Transactional
    public void createEnmarcados() throws Exception {
        int databaseSizeBeforeCreate = enmarcadosRepository.findAll().size();

        // Create the Enmarcados
        restEnmarcadosMockMvc.perform(post("/api/enmarcados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enmarcados)))
            .andExpect(status().isCreated());

        // Validate the Enmarcados in the database
        List<Enmarcados> enmarcadosList = enmarcadosRepository.findAll();
        assertThat(enmarcadosList).hasSize(databaseSizeBeforeCreate + 1);
        Enmarcados testEnmarcados = enmarcadosList.get(enmarcadosList.size() - 1);
        assertThat(testEnmarcados.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testEnmarcados.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testEnmarcados.getAnchoMin()).isEqualTo(DEFAULT_ANCHO_MIN);
        assertThat(testEnmarcados.getAnchoMax()).isEqualTo(DEFAULT_ANCHO_MAX);
    }

    @Test
    @Transactional
    public void createEnmarcadosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = enmarcadosRepository.findAll().size();

        // Create the Enmarcados with an existing ID
        enmarcados.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnmarcadosMockMvc.perform(post("/api/enmarcados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enmarcados)))
            .andExpect(status().isBadRequest());

        // Validate the Enmarcados in the database
        List<Enmarcados> enmarcadosList = enmarcadosRepository.findAll();
        assertThat(enmarcadosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEnmarcados() throws Exception {
        // Initialize the database
        enmarcadosRepository.saveAndFlush(enmarcados);

        // Get all the enmarcadosList
        restEnmarcadosMockMvc.perform(get("/api/enmarcados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enmarcados.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())))
            .andExpect(jsonPath("$.[*].anchoMin").value(hasItem(DEFAULT_ANCHO_MIN.doubleValue())))
            .andExpect(jsonPath("$.[*].anchoMax").value(hasItem(DEFAULT_ANCHO_MAX.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getEnmarcados() throws Exception {
        // Initialize the database
        enmarcadosRepository.saveAndFlush(enmarcados);

        // Get the enmarcados
        restEnmarcadosMockMvc.perform(get("/api/enmarcados/{id}", enmarcados.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(enmarcados.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()))
            .andExpect(jsonPath("$.anchoMin").value(DEFAULT_ANCHO_MIN.doubleValue()))
            .andExpect(jsonPath("$.anchoMax").value(DEFAULT_ANCHO_MAX.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEnmarcados() throws Exception {
        // Get the enmarcados
        restEnmarcadosMockMvc.perform(get("/api/enmarcados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEnmarcados() throws Exception {
        // Initialize the database
        enmarcadosRepository.saveAndFlush(enmarcados);

        int databaseSizeBeforeUpdate = enmarcadosRepository.findAll().size();

        // Update the enmarcados
        Enmarcados updatedEnmarcados = enmarcadosRepository.findById(enmarcados.getId()).get();
        // Disconnect from session so that the updates on updatedEnmarcados are not directly saved in db
        em.detach(updatedEnmarcados);
        updatedEnmarcados
            .codigo(UPDATED_CODIGO)
            .precio(UPDATED_PRECIO)
            .anchoMin(UPDATED_ANCHO_MIN)
            .anchoMax(UPDATED_ANCHO_MAX);

        restEnmarcadosMockMvc.perform(put("/api/enmarcados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEnmarcados)))
            .andExpect(status().isOk());

        // Validate the Enmarcados in the database
        List<Enmarcados> enmarcadosList = enmarcadosRepository.findAll();
        assertThat(enmarcadosList).hasSize(databaseSizeBeforeUpdate);
        Enmarcados testEnmarcados = enmarcadosList.get(enmarcadosList.size() - 1);
        assertThat(testEnmarcados.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testEnmarcados.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testEnmarcados.getAnchoMin()).isEqualTo(UPDATED_ANCHO_MIN);
        assertThat(testEnmarcados.getAnchoMax()).isEqualTo(UPDATED_ANCHO_MAX);
    }

    @Test
    @Transactional
    public void updateNonExistingEnmarcados() throws Exception {
        int databaseSizeBeforeUpdate = enmarcadosRepository.findAll().size();

        // Create the Enmarcados

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEnmarcadosMockMvc.perform(put("/api/enmarcados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enmarcados)))
            .andExpect(status().isBadRequest());

        // Validate the Enmarcados in the database
        List<Enmarcados> enmarcadosList = enmarcadosRepository.findAll();
        assertThat(enmarcadosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEnmarcados() throws Exception {
        // Initialize the database
        enmarcadosRepository.saveAndFlush(enmarcados);

        int databaseSizeBeforeDelete = enmarcadosRepository.findAll().size();

        // Get the enmarcados
        restEnmarcadosMockMvc.perform(delete("/api/enmarcados/{id}", enmarcados.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Enmarcados> enmarcadosList = enmarcadosRepository.findAll();
        assertThat(enmarcadosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Enmarcados.class);
        Enmarcados enmarcados1 = new Enmarcados();
        enmarcados1.setId(1L);
        Enmarcados enmarcados2 = new Enmarcados();
        enmarcados2.setId(enmarcados1.getId());
        assertThat(enmarcados1).isEqualTo(enmarcados2);
        enmarcados2.setId(2L);
        assertThat(enmarcados1).isNotEqualTo(enmarcados2);
        enmarcados1.setId(null);
        assertThat(enmarcados1).isNotEqualTo(enmarcados2);
    }
}
