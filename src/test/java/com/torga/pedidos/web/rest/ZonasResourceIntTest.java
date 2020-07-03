package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Zonas;
import com.torga.pedidos.repository.ZonasRepository;
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
 * Test class for the ZonasResource REST controller.
 *
 * @see ZonasResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class ZonasResourceIntTest {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private ZonasRepository zonasRepository;

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

    private MockMvc restZonasMockMvc;

    private Zonas zonas;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ZonasResource zonasResource = new ZonasResource(zonasRepository);
        this.restZonasMockMvc = MockMvcBuilders.standaloneSetup(zonasResource)
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
    public static Zonas createEntity(EntityManager em) {
        Zonas zonas = new Zonas()
            .descripcion(DEFAULT_DESCRIPCION);
        return zonas;
    }

    @Before
    public void initTest() {
        zonas = createEntity(em);
    }

    @Test
    @Transactional
    public void createZonas() throws Exception {
        int databaseSizeBeforeCreate = zonasRepository.findAll().size();

        // Create the Zonas
        restZonasMockMvc.perform(post("/api/zonas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zonas)))
            .andExpect(status().isCreated());

        // Validate the Zonas in the database
        List<Zonas> zonasList = zonasRepository.findAll();
        assertThat(zonasList).hasSize(databaseSizeBeforeCreate + 1);
        Zonas testZonas = zonasList.get(zonasList.size() - 1);
        assertThat(testZonas.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createZonasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = zonasRepository.findAll().size();

        // Create the Zonas with an existing ID
        zonas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restZonasMockMvc.perform(post("/api/zonas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zonas)))
            .andExpect(status().isBadRequest());

        // Validate the Zonas in the database
        List<Zonas> zonasList = zonasRepository.findAll();
        assertThat(zonasList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllZonas() throws Exception {
        // Initialize the database
        zonasRepository.saveAndFlush(zonas);

        // Get all the zonasList
        restZonasMockMvc.perform(get("/api/zonas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(zonas.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    
    @Test
    @Transactional
    public void getZonas() throws Exception {
        // Initialize the database
        zonasRepository.saveAndFlush(zonas);

        // Get the zonas
        restZonasMockMvc.perform(get("/api/zonas/{id}", zonas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(zonas.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingZonas() throws Exception {
        // Get the zonas
        restZonasMockMvc.perform(get("/api/zonas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateZonas() throws Exception {
        // Initialize the database
        zonasRepository.saveAndFlush(zonas);

        int databaseSizeBeforeUpdate = zonasRepository.findAll().size();

        // Update the zonas
        Zonas updatedZonas = zonasRepository.findById(zonas.getId()).get();
        // Disconnect from session so that the updates on updatedZonas are not directly saved in db
        em.detach(updatedZonas);
        updatedZonas
            .descripcion(UPDATED_DESCRIPCION);

        restZonasMockMvc.perform(put("/api/zonas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedZonas)))
            .andExpect(status().isOk());

        // Validate the Zonas in the database
        List<Zonas> zonasList = zonasRepository.findAll();
        assertThat(zonasList).hasSize(databaseSizeBeforeUpdate);
        Zonas testZonas = zonasList.get(zonasList.size() - 1);
        assertThat(testZonas.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingZonas() throws Exception {
        int databaseSizeBeforeUpdate = zonasRepository.findAll().size();

        // Create the Zonas

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restZonasMockMvc.perform(put("/api/zonas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zonas)))
            .andExpect(status().isBadRequest());

        // Validate the Zonas in the database
        List<Zonas> zonasList = zonasRepository.findAll();
        assertThat(zonasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteZonas() throws Exception {
        // Initialize the database
        zonasRepository.saveAndFlush(zonas);

        int databaseSizeBeforeDelete = zonasRepository.findAll().size();

        // Get the zonas
        restZonasMockMvc.perform(delete("/api/zonas/{id}", zonas.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Zonas> zonasList = zonasRepository.findAll();
        assertThat(zonasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Zonas.class);
        Zonas zonas1 = new Zonas();
        zonas1.setId(1L);
        Zonas zonas2 = new Zonas();
        zonas2.setId(zonas1.getId());
        assertThat(zonas1).isEqualTo(zonas2);
        zonas2.setId(2L);
        assertThat(zonas1).isNotEqualTo(zonas2);
        zonas1.setId(null);
        assertThat(zonas1).isNotEqualTo(zonas2);
    }
}
