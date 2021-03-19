package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Exposicion;
import com.torga.pedidos.repository.ExposicionRepository;
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
 * Test class for the ExposicionResource REST controller.
 *
 * @see ExposicionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class ExposicionResourceIntTest {

    private static final String DEFAULT_COD_CLI = "AAAAAAAAAA";
    private static final String UPDATED_COD_CLI = "BBBBBBBBBB";

    private static final Integer DEFAULT_ID_DIRECCION = 1;
    private static final Integer UPDATED_ID_DIRECCION = 2;

    private static final Integer DEFAULT_ID_CATALOGO = 1;
    private static final Integer UPDATED_ID_CATALOGO = 2;

    private static final Integer DEFAULT_TIENE = 1;
    private static final Integer UPDATED_TIENE = 2;

    private static final String DEFAULT_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_COLOR = "BBBBBBBBBB";

    @Autowired
    private ExposicionRepository exposicionRepository;

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

    private MockMvc restExposicionMockMvc;

    private Exposicion exposicion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExposicionResource exposicionResource = new ExposicionResource(exposicionRepository);
        this.restExposicionMockMvc = MockMvcBuilders.standaloneSetup(exposicionResource)
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
    public static Exposicion createEntity(EntityManager em) {
        Exposicion exposicion = new Exposicion()
            .codCli(DEFAULT_COD_CLI)
            .idDireccion(DEFAULT_ID_DIRECCION)
            .idCatalogo(DEFAULT_ID_CATALOGO)
            .tiene(DEFAULT_TIENE)
            .color(DEFAULT_COLOR);
        return exposicion;
    }

    @Before
    public void initTest() {
        exposicion = createEntity(em);
    }

    @Test
    @Transactional
    public void createExposicion() throws Exception {
        int databaseSizeBeforeCreate = exposicionRepository.findAll().size();

        // Create the Exposicion
        restExposicionMockMvc.perform(post("/api/exposicions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exposicion)))
            .andExpect(status().isCreated());

        // Validate the Exposicion in the database
        List<Exposicion> exposicionList = exposicionRepository.findAll();
        assertThat(exposicionList).hasSize(databaseSizeBeforeCreate + 1);
        Exposicion testExposicion = exposicionList.get(exposicionList.size() - 1);
        assertThat(testExposicion.getCodCli()).isEqualTo(DEFAULT_COD_CLI);
        assertThat(testExposicion.getIdDireccion()).isEqualTo(DEFAULT_ID_DIRECCION);
        assertThat(testExposicion.getIdCatalogo()).isEqualTo(DEFAULT_ID_CATALOGO);
        assertThat(testExposicion.getTiene()).isEqualTo(DEFAULT_TIENE);
        assertThat(testExposicion.getColor()).isEqualTo(DEFAULT_COLOR);
    }

    @Test
    @Transactional
    public void createExposicionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = exposicionRepository.findAll().size();

        // Create the Exposicion with an existing ID
        exposicion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExposicionMockMvc.perform(post("/api/exposicions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exposicion)))
            .andExpect(status().isBadRequest());

        // Validate the Exposicion in the database
        List<Exposicion> exposicionList = exposicionRepository.findAll();
        assertThat(exposicionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllExposicions() throws Exception {
        // Initialize the database
        exposicionRepository.saveAndFlush(exposicion);

        // Get all the exposicionList
        restExposicionMockMvc.perform(get("/api/exposicions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(exposicion.getId().intValue())))
            .andExpect(jsonPath("$.[*].codCli").value(hasItem(DEFAULT_COD_CLI.toString())))
            .andExpect(jsonPath("$.[*].idDireccion").value(hasItem(DEFAULT_ID_DIRECCION)))
            .andExpect(jsonPath("$.[*].idCatalogo").value(hasItem(DEFAULT_ID_CATALOGO)))
            .andExpect(jsonPath("$.[*].tiene").value(hasItem(DEFAULT_TIENE)))
            .andExpect(jsonPath("$.[*].color").value(hasItem(DEFAULT_COLOR.toString())));
    }
    
    @Test
    @Transactional
    public void getExposicion() throws Exception {
        // Initialize the database
        exposicionRepository.saveAndFlush(exposicion);

        // Get the exposicion
        restExposicionMockMvc.perform(get("/api/exposicions/{id}", exposicion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(exposicion.getId().intValue()))
            .andExpect(jsonPath("$.codCli").value(DEFAULT_COD_CLI.toString()))
            .andExpect(jsonPath("$.idDireccion").value(DEFAULT_ID_DIRECCION))
            .andExpect(jsonPath("$.idCatalogo").value(DEFAULT_ID_CATALOGO))
            .andExpect(jsonPath("$.tiene").value(DEFAULT_TIENE))
            .andExpect(jsonPath("$.color").value(DEFAULT_COLOR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExposicion() throws Exception {
        // Get the exposicion
        restExposicionMockMvc.perform(get("/api/exposicions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExposicion() throws Exception {
        // Initialize the database
        exposicionRepository.saveAndFlush(exposicion);

        int databaseSizeBeforeUpdate = exposicionRepository.findAll().size();

        // Update the exposicion
        Exposicion updatedExposicion = exposicionRepository.findById(exposicion.getId()).get();
        // Disconnect from session so that the updates on updatedExposicion are not directly saved in db
        em.detach(updatedExposicion);
        updatedExposicion
            .codCli(UPDATED_COD_CLI)
            .idDireccion(UPDATED_ID_DIRECCION)
            .idCatalogo(UPDATED_ID_CATALOGO)
            .tiene(UPDATED_TIENE)
            .color(UPDATED_COLOR);

        restExposicionMockMvc.perform(put("/api/exposicions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExposicion)))
            .andExpect(status().isOk());

        // Validate the Exposicion in the database
        List<Exposicion> exposicionList = exposicionRepository.findAll();
        assertThat(exposicionList).hasSize(databaseSizeBeforeUpdate);
        Exposicion testExposicion = exposicionList.get(exposicionList.size() - 1);
        assertThat(testExposicion.getCodCli()).isEqualTo(UPDATED_COD_CLI);
        assertThat(testExposicion.getIdDireccion()).isEqualTo(UPDATED_ID_DIRECCION);
        assertThat(testExposicion.getIdCatalogo()).isEqualTo(UPDATED_ID_CATALOGO);
        assertThat(testExposicion.getTiene()).isEqualTo(UPDATED_TIENE);
        assertThat(testExposicion.getColor()).isEqualTo(UPDATED_COLOR);
    }

    @Test
    @Transactional
    public void updateNonExistingExposicion() throws Exception {
        int databaseSizeBeforeUpdate = exposicionRepository.findAll().size();

        // Create the Exposicion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExposicionMockMvc.perform(put("/api/exposicions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exposicion)))
            .andExpect(status().isBadRequest());

        // Validate the Exposicion in the database
        List<Exposicion> exposicionList = exposicionRepository.findAll();
        assertThat(exposicionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExposicion() throws Exception {
        // Initialize the database
        exposicionRepository.saveAndFlush(exposicion);

        int databaseSizeBeforeDelete = exposicionRepository.findAll().size();

        // Get the exposicion
        restExposicionMockMvc.perform(delete("/api/exposicions/{id}", exposicion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Exposicion> exposicionList = exposicionRepository.findAll();
        assertThat(exposicionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Exposicion.class);
        Exposicion exposicion1 = new Exposicion();
        exposicion1.setId(1L);
        Exposicion exposicion2 = new Exposicion();
        exposicion2.setId(exposicion1.getId());
        assertThat(exposicion1).isEqualTo(exposicion2);
        exposicion2.setId(2L);
        assertThat(exposicion1).isNotEqualTo(exposicion2);
        exposicion1.setId(null);
        assertThat(exposicion1).isNotEqualTo(exposicion2);
    }
}
