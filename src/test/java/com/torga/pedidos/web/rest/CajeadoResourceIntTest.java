package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Cajeado;
import com.torga.pedidos.repository.CajeadoRepository;
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
 * Test class for the CajeadoResource REST controller.
 *
 * @see CajeadoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class CajeadoResourceIntTest {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    private static final Float DEFAULT_PILOTO = 1F;
    private static final Float UPDATED_PILOTO = 2F;

    @Autowired
    private CajeadoRepository cajeadoRepository;

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

    private MockMvc restCajeadoMockMvc;

    private Cajeado cajeado;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CajeadoResource cajeadoResource = new CajeadoResource(cajeadoRepository);
        this.restCajeadoMockMvc = MockMvcBuilders.standaloneSetup(cajeadoResource)
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
    public static Cajeado createEntity(EntityManager em) {
        Cajeado cajeado = new Cajeado()
            .codigo(DEFAULT_CODIGO)
            .tipo(DEFAULT_TIPO)
            .precio(DEFAULT_PRECIO)
            .piloto(DEFAULT_PILOTO);
        return cajeado;
    }

    @Before
    public void initTest() {
        cajeado = createEntity(em);
    }

    @Test
    @Transactional
    public void createCajeado() throws Exception {
        int databaseSizeBeforeCreate = cajeadoRepository.findAll().size();

        // Create the Cajeado
        restCajeadoMockMvc.perform(post("/api/cajeados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cajeado)))
            .andExpect(status().isCreated());

        // Validate the Cajeado in the database
        List<Cajeado> cajeadoList = cajeadoRepository.findAll();
        assertThat(cajeadoList).hasSize(databaseSizeBeforeCreate + 1);
        Cajeado testCajeado = cajeadoList.get(cajeadoList.size() - 1);
        assertThat(testCajeado.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testCajeado.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testCajeado.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testCajeado.getPiloto()).isEqualTo(DEFAULT_PILOTO);
    }

    @Test
    @Transactional
    public void createCajeadoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cajeadoRepository.findAll().size();

        // Create the Cajeado with an existing ID
        cajeado.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCajeadoMockMvc.perform(post("/api/cajeados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cajeado)))
            .andExpect(status().isBadRequest());

        // Validate the Cajeado in the database
        List<Cajeado> cajeadoList = cajeadoRepository.findAll();
        assertThat(cajeadoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCajeados() throws Exception {
        // Initialize the database
        cajeadoRepository.saveAndFlush(cajeado);

        // Get all the cajeadoList
        restCajeadoMockMvc.perform(get("/api/cajeados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cajeado.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())))
            .andExpect(jsonPath("$.[*].piloto").value(hasItem(DEFAULT_PILOTO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getCajeado() throws Exception {
        // Initialize the database
        cajeadoRepository.saveAndFlush(cajeado);

        // Get the cajeado
        restCajeadoMockMvc.perform(get("/api/cajeados/{id}", cajeado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cajeado.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()))
            .andExpect(jsonPath("$.piloto").value(DEFAULT_PILOTO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCajeado() throws Exception {
        // Get the cajeado
        restCajeadoMockMvc.perform(get("/api/cajeados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCajeado() throws Exception {
        // Initialize the database
        cajeadoRepository.saveAndFlush(cajeado);

        int databaseSizeBeforeUpdate = cajeadoRepository.findAll().size();

        // Update the cajeado
        Cajeado updatedCajeado = cajeadoRepository.findById(cajeado.getId()).get();
        // Disconnect from session so that the updates on updatedCajeado are not directly saved in db
        em.detach(updatedCajeado);
        updatedCajeado
            .codigo(UPDATED_CODIGO)
            .tipo(UPDATED_TIPO)
            .precio(UPDATED_PRECIO)
            .piloto(UPDATED_PILOTO);

        restCajeadoMockMvc.perform(put("/api/cajeados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCajeado)))
            .andExpect(status().isOk());

        // Validate the Cajeado in the database
        List<Cajeado> cajeadoList = cajeadoRepository.findAll();
        assertThat(cajeadoList).hasSize(databaseSizeBeforeUpdate);
        Cajeado testCajeado = cajeadoList.get(cajeadoList.size() - 1);
        assertThat(testCajeado.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testCajeado.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testCajeado.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testCajeado.getPiloto()).isEqualTo(UPDATED_PILOTO);
    }

    @Test
    @Transactional
    public void updateNonExistingCajeado() throws Exception {
        int databaseSizeBeforeUpdate = cajeadoRepository.findAll().size();

        // Create the Cajeado

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCajeadoMockMvc.perform(put("/api/cajeados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cajeado)))
            .andExpect(status().isBadRequest());

        // Validate the Cajeado in the database
        List<Cajeado> cajeadoList = cajeadoRepository.findAll();
        assertThat(cajeadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCajeado() throws Exception {
        // Initialize the database
        cajeadoRepository.saveAndFlush(cajeado);

        int databaseSizeBeforeDelete = cajeadoRepository.findAll().size();

        // Get the cajeado
        restCajeadoMockMvc.perform(delete("/api/cajeados/{id}", cajeado.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cajeado> cajeadoList = cajeadoRepository.findAll();
        assertThat(cajeadoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cajeado.class);
        Cajeado cajeado1 = new Cajeado();
        cajeado1.setId(1L);
        Cajeado cajeado2 = new Cajeado();
        cajeado2.setId(cajeado1.getId());
        assertThat(cajeado1).isEqualTo(cajeado2);
        cajeado2.setId(2L);
        assertThat(cajeado1).isNotEqualTo(cajeado2);
        cajeado1.setId(null);
        assertThat(cajeado1).isNotEqualTo(cajeado2);
    }
}
