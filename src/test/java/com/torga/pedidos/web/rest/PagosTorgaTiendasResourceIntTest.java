package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.PagosTorgaTiendas;
import com.torga.pedidos.repository.PagosTorgaTiendasRepository;
import com.torga.pedidos.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static com.torga.pedidos.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PagosTorgaTiendasResource REST controller.
 *
 * @see PagosTorgaTiendasResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class PagosTorgaTiendasResourceIntTest {

    private static final String DEFAULT_GRUPO = "AAAAAAAAAA";
    private static final String UPDATED_GRUPO = "BBBBBBBBBB";

    @Autowired
    private PagosTorgaTiendasRepository pagosTorgaTiendasRepository;

    @Mock
    private PagosTorgaTiendasRepository pagosTorgaTiendasRepositoryMock;

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

    private MockMvc restPagosTorgaTiendasMockMvc;

    private PagosTorgaTiendas pagosTorgaTiendas;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PagosTorgaTiendasResource pagosTorgaTiendasResource = new PagosTorgaTiendasResource(pagosTorgaTiendasRepository);
        this.restPagosTorgaTiendasMockMvc = MockMvcBuilders.standaloneSetup(pagosTorgaTiendasResource)
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
    public static PagosTorgaTiendas createEntity(EntityManager em) {
        PagosTorgaTiendas pagosTorgaTiendas = new PagosTorgaTiendas()
            .grupo(DEFAULT_GRUPO);
        return pagosTorgaTiendas;
    }

    @Before
    public void initTest() {
        pagosTorgaTiendas = createEntity(em);
    }

    @Test
    @Transactional
    public void createPagosTorgaTiendas() throws Exception {
        int databaseSizeBeforeCreate = pagosTorgaTiendasRepository.findAll().size();

        // Create the PagosTorgaTiendas
        restPagosTorgaTiendasMockMvc.perform(post("/api/pagos-torga-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagosTorgaTiendas)))
            .andExpect(status().isCreated());

        // Validate the PagosTorgaTiendas in the database
        List<PagosTorgaTiendas> pagosTorgaTiendasList = pagosTorgaTiendasRepository.findAll();
        assertThat(pagosTorgaTiendasList).hasSize(databaseSizeBeforeCreate + 1);
        PagosTorgaTiendas testPagosTorgaTiendas = pagosTorgaTiendasList.get(pagosTorgaTiendasList.size() - 1);
        assertThat(testPagosTorgaTiendas.getGrupo()).isEqualTo(DEFAULT_GRUPO);
    }

    @Test
    @Transactional
    public void createPagosTorgaTiendasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pagosTorgaTiendasRepository.findAll().size();

        // Create the PagosTorgaTiendas with an existing ID
        pagosTorgaTiendas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPagosTorgaTiendasMockMvc.perform(post("/api/pagos-torga-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagosTorgaTiendas)))
            .andExpect(status().isBadRequest());

        // Validate the PagosTorgaTiendas in the database
        List<PagosTorgaTiendas> pagosTorgaTiendasList = pagosTorgaTiendasRepository.findAll();
        assertThat(pagosTorgaTiendasList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPagosTorgaTiendas() throws Exception {
        // Initialize the database
        pagosTorgaTiendasRepository.saveAndFlush(pagosTorgaTiendas);

        // Get all the pagosTorgaTiendasList
        restPagosTorgaTiendasMockMvc.perform(get("/api/pagos-torga-tiendas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pagosTorgaTiendas.getId().intValue())))
            .andExpect(jsonPath("$.[*].grupo").value(hasItem(DEFAULT_GRUPO.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllPagosTorgaTiendasWithEagerRelationshipsIsEnabled() throws Exception {
        PagosTorgaTiendasResource pagosTorgaTiendasResource = new PagosTorgaTiendasResource(pagosTorgaTiendasRepositoryMock);
        when(pagosTorgaTiendasRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restPagosTorgaTiendasMockMvc = MockMvcBuilders.standaloneSetup(pagosTorgaTiendasResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPagosTorgaTiendasMockMvc.perform(get("/api/pagos-torga-tiendas?eagerload=true"))
        .andExpect(status().isOk());

        verify(pagosTorgaTiendasRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllPagosTorgaTiendasWithEagerRelationshipsIsNotEnabled() throws Exception {
        PagosTorgaTiendasResource pagosTorgaTiendasResource = new PagosTorgaTiendasResource(pagosTorgaTiendasRepositoryMock);
            when(pagosTorgaTiendasRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restPagosTorgaTiendasMockMvc = MockMvcBuilders.standaloneSetup(pagosTorgaTiendasResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPagosTorgaTiendasMockMvc.perform(get("/api/pagos-torga-tiendas?eagerload=true"))
        .andExpect(status().isOk());

            verify(pagosTorgaTiendasRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getPagosTorgaTiendas() throws Exception {
        // Initialize the database
        pagosTorgaTiendasRepository.saveAndFlush(pagosTorgaTiendas);

        // Get the pagosTorgaTiendas
        restPagosTorgaTiendasMockMvc.perform(get("/api/pagos-torga-tiendas/{id}", pagosTorgaTiendas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pagosTorgaTiendas.getId().intValue()))
            .andExpect(jsonPath("$.grupo").value(DEFAULT_GRUPO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPagosTorgaTiendas() throws Exception {
        // Get the pagosTorgaTiendas
        restPagosTorgaTiendasMockMvc.perform(get("/api/pagos-torga-tiendas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePagosTorgaTiendas() throws Exception {
        // Initialize the database
        pagosTorgaTiendasRepository.saveAndFlush(pagosTorgaTiendas);

        int databaseSizeBeforeUpdate = pagosTorgaTiendasRepository.findAll().size();

        // Update the pagosTorgaTiendas
        PagosTorgaTiendas updatedPagosTorgaTiendas = pagosTorgaTiendasRepository.findById(pagosTorgaTiendas.getId()).get();
        // Disconnect from session so that the updates on updatedPagosTorgaTiendas are not directly saved in db
        em.detach(updatedPagosTorgaTiendas);
        updatedPagosTorgaTiendas
            .grupo(UPDATED_GRUPO);

        restPagosTorgaTiendasMockMvc.perform(put("/api/pagos-torga-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPagosTorgaTiendas)))
            .andExpect(status().isOk());

        // Validate the PagosTorgaTiendas in the database
        List<PagosTorgaTiendas> pagosTorgaTiendasList = pagosTorgaTiendasRepository.findAll();
        assertThat(pagosTorgaTiendasList).hasSize(databaseSizeBeforeUpdate);
        PagosTorgaTiendas testPagosTorgaTiendas = pagosTorgaTiendasList.get(pagosTorgaTiendasList.size() - 1);
        assertThat(testPagosTorgaTiendas.getGrupo()).isEqualTo(UPDATED_GRUPO);
    }

    @Test
    @Transactional
    public void updateNonExistingPagosTorgaTiendas() throws Exception {
        int databaseSizeBeforeUpdate = pagosTorgaTiendasRepository.findAll().size();

        // Create the PagosTorgaTiendas

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPagosTorgaTiendasMockMvc.perform(put("/api/pagos-torga-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagosTorgaTiendas)))
            .andExpect(status().isBadRequest());

        // Validate the PagosTorgaTiendas in the database
        List<PagosTorgaTiendas> pagosTorgaTiendasList = pagosTorgaTiendasRepository.findAll();
        assertThat(pagosTorgaTiendasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePagosTorgaTiendas() throws Exception {
        // Initialize the database
        pagosTorgaTiendasRepository.saveAndFlush(pagosTorgaTiendas);

        int databaseSizeBeforeDelete = pagosTorgaTiendasRepository.findAll().size();

        // Get the pagosTorgaTiendas
        restPagosTorgaTiendasMockMvc.perform(delete("/api/pagos-torga-tiendas/{id}", pagosTorgaTiendas.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PagosTorgaTiendas> pagosTorgaTiendasList = pagosTorgaTiendasRepository.findAll();
        assertThat(pagosTorgaTiendasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PagosTorgaTiendas.class);
        PagosTorgaTiendas pagosTorgaTiendas1 = new PagosTorgaTiendas();
        pagosTorgaTiendas1.setId(1L);
        PagosTorgaTiendas pagosTorgaTiendas2 = new PagosTorgaTiendas();
        pagosTorgaTiendas2.setId(pagosTorgaTiendas1.getId());
        assertThat(pagosTorgaTiendas1).isEqualTo(pagosTorgaTiendas2);
        pagosTorgaTiendas2.setId(2L);
        assertThat(pagosTorgaTiendas1).isNotEqualTo(pagosTorgaTiendas2);
        pagosTorgaTiendas1.setId(null);
        assertThat(pagosTorgaTiendas1).isNotEqualTo(pagosTorgaTiendas2);
    }
}
