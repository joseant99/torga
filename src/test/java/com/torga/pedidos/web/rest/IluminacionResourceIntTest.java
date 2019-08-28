package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Iluminacion;
import com.torga.pedidos.repository.IluminacionRepository;
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
 * Test class for the IluminacionResource REST controller.
 *
 * @see IluminacionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class IluminacionResourceIntTest {

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    @Autowired
    private IluminacionRepository iluminacionRepository;

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

    private MockMvc restIluminacionMockMvc;

    private Iluminacion iluminacion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IluminacionResource iluminacionResource = new IluminacionResource(iluminacionRepository);
        this.restIluminacionMockMvc = MockMvcBuilders.standaloneSetup(iluminacionResource)
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
    public static Iluminacion createEntity(EntityManager em) {
        Iluminacion iluminacion = new Iluminacion()
            .precio(DEFAULT_PRECIO);
        return iluminacion;
    }

    @Before
    public void initTest() {
        iluminacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createIluminacion() throws Exception {
        int databaseSizeBeforeCreate = iluminacionRepository.findAll().size();

        // Create the Iluminacion
        restIluminacionMockMvc.perform(post("/api/iluminacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iluminacion)))
            .andExpect(status().isCreated());

        // Validate the Iluminacion in the database
        List<Iluminacion> iluminacionList = iluminacionRepository.findAll();
        assertThat(iluminacionList).hasSize(databaseSizeBeforeCreate + 1);
        Iluminacion testIluminacion = iluminacionList.get(iluminacionList.size() - 1);
        assertThat(testIluminacion.getPrecio()).isEqualTo(DEFAULT_PRECIO);
    }

    @Test
    @Transactional
    public void createIluminacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = iluminacionRepository.findAll().size();

        // Create the Iluminacion with an existing ID
        iluminacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIluminacionMockMvc.perform(post("/api/iluminacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iluminacion)))
            .andExpect(status().isBadRequest());

        // Validate the Iluminacion in the database
        List<Iluminacion> iluminacionList = iluminacionRepository.findAll();
        assertThat(iluminacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIluminacions() throws Exception {
        // Initialize the database
        iluminacionRepository.saveAndFlush(iluminacion);

        // Get all the iluminacionList
        restIluminacionMockMvc.perform(get("/api/iluminacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(iluminacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getIluminacion() throws Exception {
        // Initialize the database
        iluminacionRepository.saveAndFlush(iluminacion);

        // Get the iluminacion
        restIluminacionMockMvc.perform(get("/api/iluminacions/{id}", iluminacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(iluminacion.getId().intValue()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingIluminacion() throws Exception {
        // Get the iluminacion
        restIluminacionMockMvc.perform(get("/api/iluminacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIluminacion() throws Exception {
        // Initialize the database
        iluminacionRepository.saveAndFlush(iluminacion);

        int databaseSizeBeforeUpdate = iluminacionRepository.findAll().size();

        // Update the iluminacion
        Iluminacion updatedIluminacion = iluminacionRepository.findById(iluminacion.getId()).get();
        // Disconnect from session so that the updates on updatedIluminacion are not directly saved in db
        em.detach(updatedIluminacion);
        updatedIluminacion
            .precio(UPDATED_PRECIO);

        restIluminacionMockMvc.perform(put("/api/iluminacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIluminacion)))
            .andExpect(status().isOk());

        // Validate the Iluminacion in the database
        List<Iluminacion> iluminacionList = iluminacionRepository.findAll();
        assertThat(iluminacionList).hasSize(databaseSizeBeforeUpdate);
        Iluminacion testIluminacion = iluminacionList.get(iluminacionList.size() - 1);
        assertThat(testIluminacion.getPrecio()).isEqualTo(UPDATED_PRECIO);
    }

    @Test
    @Transactional
    public void updateNonExistingIluminacion() throws Exception {
        int databaseSizeBeforeUpdate = iluminacionRepository.findAll().size();

        // Create the Iluminacion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIluminacionMockMvc.perform(put("/api/iluminacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iluminacion)))
            .andExpect(status().isBadRequest());

        // Validate the Iluminacion in the database
        List<Iluminacion> iluminacionList = iluminacionRepository.findAll();
        assertThat(iluminacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIluminacion() throws Exception {
        // Initialize the database
        iluminacionRepository.saveAndFlush(iluminacion);

        int databaseSizeBeforeDelete = iluminacionRepository.findAll().size();

        // Get the iluminacion
        restIluminacionMockMvc.perform(delete("/api/iluminacions/{id}", iluminacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Iluminacion> iluminacionList = iluminacionRepository.findAll();
        assertThat(iluminacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Iluminacion.class);
        Iluminacion iluminacion1 = new Iluminacion();
        iluminacion1.setId(1L);
        Iluminacion iluminacion2 = new Iluminacion();
        iluminacion2.setId(iluminacion1.getId());
        assertThat(iluminacion1).isEqualTo(iluminacion2);
        iluminacion2.setId(2L);
        assertThat(iluminacion1).isNotEqualTo(iluminacion2);
        iluminacion1.setId(null);
        assertThat(iluminacion1).isNotEqualTo(iluminacion2);
    }
}
