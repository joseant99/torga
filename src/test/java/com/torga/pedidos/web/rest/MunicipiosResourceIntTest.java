package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Municipios;
import com.torga.pedidos.repository.MunicipiosRepository;
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
 * Test class for the MunicipiosResource REST controller.
 *
 * @see MunicipiosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class MunicipiosResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private MunicipiosRepository municipiosRepository;

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

    private MockMvc restMunicipiosMockMvc;

    private Municipios municipios;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MunicipiosResource municipiosResource = new MunicipiosResource(municipiosRepository);
        this.restMunicipiosMockMvc = MockMvcBuilders.standaloneSetup(municipiosResource)
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
    public static Municipios createEntity(EntityManager em) {
        Municipios municipios = new Municipios()
            .nombre(DEFAULT_NOMBRE);
        return municipios;
    }

    @Before
    public void initTest() {
        municipios = createEntity(em);
    }

    @Test
    @Transactional
    public void createMunicipios() throws Exception {
        int databaseSizeBeforeCreate = municipiosRepository.findAll().size();

        // Create the Municipios
        restMunicipiosMockMvc.perform(post("/api/municipios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(municipios)))
            .andExpect(status().isCreated());

        // Validate the Municipios in the database
        List<Municipios> municipiosList = municipiosRepository.findAll();
        assertThat(municipiosList).hasSize(databaseSizeBeforeCreate + 1);
        Municipios testMunicipios = municipiosList.get(municipiosList.size() - 1);
        assertThat(testMunicipios.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createMunicipiosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = municipiosRepository.findAll().size();

        // Create the Municipios with an existing ID
        municipios.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMunicipiosMockMvc.perform(post("/api/municipios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(municipios)))
            .andExpect(status().isBadRequest());

        // Validate the Municipios in the database
        List<Municipios> municipiosList = municipiosRepository.findAll();
        assertThat(municipiosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMunicipios() throws Exception {
        // Initialize the database
        municipiosRepository.saveAndFlush(municipios);

        // Get all the municipiosList
        restMunicipiosMockMvc.perform(get("/api/municipios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(municipios.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }
    
    @Test
    @Transactional
    public void getMunicipios() throws Exception {
        // Initialize the database
        municipiosRepository.saveAndFlush(municipios);

        // Get the municipios
        restMunicipiosMockMvc.perform(get("/api/municipios/{id}", municipios.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(municipios.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMunicipios() throws Exception {
        // Get the municipios
        restMunicipiosMockMvc.perform(get("/api/municipios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMunicipios() throws Exception {
        // Initialize the database
        municipiosRepository.saveAndFlush(municipios);

        int databaseSizeBeforeUpdate = municipiosRepository.findAll().size();

        // Update the municipios
        Municipios updatedMunicipios = municipiosRepository.findById(municipios.getId()).get();
        // Disconnect from session so that the updates on updatedMunicipios are not directly saved in db
        em.detach(updatedMunicipios);
        updatedMunicipios
            .nombre(UPDATED_NOMBRE);

        restMunicipiosMockMvc.perform(put("/api/municipios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMunicipios)))
            .andExpect(status().isOk());

        // Validate the Municipios in the database
        List<Municipios> municipiosList = municipiosRepository.findAll();
        assertThat(municipiosList).hasSize(databaseSizeBeforeUpdate);
        Municipios testMunicipios = municipiosList.get(municipiosList.size() - 1);
        assertThat(testMunicipios.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingMunicipios() throws Exception {
        int databaseSizeBeforeUpdate = municipiosRepository.findAll().size();

        // Create the Municipios

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMunicipiosMockMvc.perform(put("/api/municipios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(municipios)))
            .andExpect(status().isBadRequest());

        // Validate the Municipios in the database
        List<Municipios> municipiosList = municipiosRepository.findAll();
        assertThat(municipiosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMunicipios() throws Exception {
        // Initialize the database
        municipiosRepository.saveAndFlush(municipios);

        int databaseSizeBeforeDelete = municipiosRepository.findAll().size();

        // Get the municipios
        restMunicipiosMockMvc.perform(delete("/api/municipios/{id}", municipios.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Municipios> municipiosList = municipiosRepository.findAll();
        assertThat(municipiosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Municipios.class);
        Municipios municipios1 = new Municipios();
        municipios1.setId(1L);
        Municipios municipios2 = new Municipios();
        municipios2.setId(municipios1.getId());
        assertThat(municipios1).isEqualTo(municipios2);
        municipios2.setId(2L);
        assertThat(municipios1).isNotEqualTo(municipios2);
        municipios1.setId(null);
        assertThat(municipios1).isNotEqualTo(municipios2);
    }
}
