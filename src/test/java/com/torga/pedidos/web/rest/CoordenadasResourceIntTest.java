package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Coordenadas;
import com.torga.pedidos.repository.CoordenadasRepository;
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
 * Test class for the CoordenadasResource REST controller.
 *
 * @see CoordenadasResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class CoordenadasResourceIntTest {

    private static final String DEFAULT_CP = "AAAAAAAAAA";
    private static final String UPDATED_CP = "BBBBBBBBBB";

    private static final String DEFAULT_LATITUD = "AAAAAAAAAA";
    private static final String UPDATED_LATITUD = "BBBBBBBBBB";

    private static final String DEFAULT_LONGITUD = "AAAAAAAAAA";
    private static final String UPDATED_LONGITUD = "BBBBBBBBBB";

    @Autowired
    private CoordenadasRepository coordenadasRepository;

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

    private MockMvc restCoordenadasMockMvc;

    private Coordenadas coordenadas;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CoordenadasResource coordenadasResource = new CoordenadasResource(coordenadasRepository);
        this.restCoordenadasMockMvc = MockMvcBuilders.standaloneSetup(coordenadasResource)
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
    public static Coordenadas createEntity(EntityManager em) {
        Coordenadas coordenadas = new Coordenadas()
            .cp(DEFAULT_CP)
            .latitud(DEFAULT_LATITUD)
            .longitud(DEFAULT_LONGITUD);
        return coordenadas;
    }

    @Before
    public void initTest() {
        coordenadas = createEntity(em);
    }

    @Test
    @Transactional
    public void createCoordenadas() throws Exception {
        int databaseSizeBeforeCreate = coordenadasRepository.findAll().size();

        // Create the Coordenadas
        restCoordenadasMockMvc.perform(post("/api/coordenadas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coordenadas)))
            .andExpect(status().isCreated());

        // Validate the Coordenadas in the database
        List<Coordenadas> coordenadasList = coordenadasRepository.findAll();
        assertThat(coordenadasList).hasSize(databaseSizeBeforeCreate + 1);
        Coordenadas testCoordenadas = coordenadasList.get(coordenadasList.size() - 1);
        assertThat(testCoordenadas.getCp()).isEqualTo(DEFAULT_CP);
        assertThat(testCoordenadas.getLatitud()).isEqualTo(DEFAULT_LATITUD);
        assertThat(testCoordenadas.getLongitud()).isEqualTo(DEFAULT_LONGITUD);
    }

    @Test
    @Transactional
    public void createCoordenadasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = coordenadasRepository.findAll().size();

        // Create the Coordenadas with an existing ID
        coordenadas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCoordenadasMockMvc.perform(post("/api/coordenadas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coordenadas)))
            .andExpect(status().isBadRequest());

        // Validate the Coordenadas in the database
        List<Coordenadas> coordenadasList = coordenadasRepository.findAll();
        assertThat(coordenadasList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCoordenadas() throws Exception {
        // Initialize the database
        coordenadasRepository.saveAndFlush(coordenadas);

        // Get all the coordenadasList
        restCoordenadasMockMvc.perform(get("/api/coordenadas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(coordenadas.getId().intValue())))
            .andExpect(jsonPath("$.[*].cp").value(hasItem(DEFAULT_CP.toString())))
            .andExpect(jsonPath("$.[*].latitud").value(hasItem(DEFAULT_LATITUD.toString())))
            .andExpect(jsonPath("$.[*].longitud").value(hasItem(DEFAULT_LONGITUD.toString())));
    }
    
    @Test
    @Transactional
    public void getCoordenadas() throws Exception {
        // Initialize the database
        coordenadasRepository.saveAndFlush(coordenadas);

        // Get the coordenadas
        restCoordenadasMockMvc.perform(get("/api/coordenadas/{id}", coordenadas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(coordenadas.getId().intValue()))
            .andExpect(jsonPath("$.cp").value(DEFAULT_CP.toString()))
            .andExpect(jsonPath("$.latitud").value(DEFAULT_LATITUD.toString()))
            .andExpect(jsonPath("$.longitud").value(DEFAULT_LONGITUD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCoordenadas() throws Exception {
        // Get the coordenadas
        restCoordenadasMockMvc.perform(get("/api/coordenadas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCoordenadas() throws Exception {
        // Initialize the database
        coordenadasRepository.saveAndFlush(coordenadas);

        int databaseSizeBeforeUpdate = coordenadasRepository.findAll().size();

        // Update the coordenadas
        Coordenadas updatedCoordenadas = coordenadasRepository.findById(coordenadas.getId()).get();
        // Disconnect from session so that the updates on updatedCoordenadas are not directly saved in db
        em.detach(updatedCoordenadas);
        updatedCoordenadas
            .cp(UPDATED_CP)
            .latitud(UPDATED_LATITUD)
            .longitud(UPDATED_LONGITUD);

        restCoordenadasMockMvc.perform(put("/api/coordenadas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCoordenadas)))
            .andExpect(status().isOk());

        // Validate the Coordenadas in the database
        List<Coordenadas> coordenadasList = coordenadasRepository.findAll();
        assertThat(coordenadasList).hasSize(databaseSizeBeforeUpdate);
        Coordenadas testCoordenadas = coordenadasList.get(coordenadasList.size() - 1);
        assertThat(testCoordenadas.getCp()).isEqualTo(UPDATED_CP);
        assertThat(testCoordenadas.getLatitud()).isEqualTo(UPDATED_LATITUD);
        assertThat(testCoordenadas.getLongitud()).isEqualTo(UPDATED_LONGITUD);
    }

    @Test
    @Transactional
    public void updateNonExistingCoordenadas() throws Exception {
        int databaseSizeBeforeUpdate = coordenadasRepository.findAll().size();

        // Create the Coordenadas

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCoordenadasMockMvc.perform(put("/api/coordenadas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coordenadas)))
            .andExpect(status().isBadRequest());

        // Validate the Coordenadas in the database
        List<Coordenadas> coordenadasList = coordenadasRepository.findAll();
        assertThat(coordenadasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCoordenadas() throws Exception {
        // Initialize the database
        coordenadasRepository.saveAndFlush(coordenadas);

        int databaseSizeBeforeDelete = coordenadasRepository.findAll().size();

        // Get the coordenadas
        restCoordenadasMockMvc.perform(delete("/api/coordenadas/{id}", coordenadas.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Coordenadas> coordenadasList = coordenadasRepository.findAll();
        assertThat(coordenadasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Coordenadas.class);
        Coordenadas coordenadas1 = new Coordenadas();
        coordenadas1.setId(1L);
        Coordenadas coordenadas2 = new Coordenadas();
        coordenadas2.setId(coordenadas1.getId());
        assertThat(coordenadas1).isEqualTo(coordenadas2);
        coordenadas2.setId(2L);
        assertThat(coordenadas1).isNotEqualTo(coordenadas2);
        coordenadas1.setId(null);
        assertThat(coordenadas1).isNotEqualTo(coordenadas2);
    }
}
