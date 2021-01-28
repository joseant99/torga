package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Fecha_entrega;
import com.torga.pedidos.repository.Fecha_entregaRepository;
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
 * Test class for the Fecha_entregaResource REST controller.
 *
 * @see Fecha_entregaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class Fecha_entregaResourceIntTest {

    private static final String DEFAULT_FECHA = "AAAAAAAAAA";
    private static final String UPDATED_FECHA = "BBBBBBBBBB";

    @Autowired
    private Fecha_entregaRepository fecha_entregaRepository;

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

    private MockMvc restFecha_entregaMockMvc;

    private Fecha_entrega fecha_entrega;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Fecha_entregaResource fecha_entregaResource = new Fecha_entregaResource(fecha_entregaRepository);
        this.restFecha_entregaMockMvc = MockMvcBuilders.standaloneSetup(fecha_entregaResource)
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
    public static Fecha_entrega createEntity(EntityManager em) {
        Fecha_entrega fecha_entrega = new Fecha_entrega()
            .fecha(DEFAULT_FECHA);
        return fecha_entrega;
    }

    @Before
    public void initTest() {
        fecha_entrega = createEntity(em);
    }

    @Test
    @Transactional
    public void createFecha_entrega() throws Exception {
        int databaseSizeBeforeCreate = fecha_entregaRepository.findAll().size();

        // Create the Fecha_entrega
        restFecha_entregaMockMvc.perform(post("/api/fecha-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fecha_entrega)))
            .andExpect(status().isCreated());

        // Validate the Fecha_entrega in the database
        List<Fecha_entrega> fecha_entregaList = fecha_entregaRepository.findAll();
        assertThat(fecha_entregaList).hasSize(databaseSizeBeforeCreate + 1);
        Fecha_entrega testFecha_entrega = fecha_entregaList.get(fecha_entregaList.size() - 1);
        assertThat(testFecha_entrega.getFecha()).isEqualTo(DEFAULT_FECHA);
    }

    @Test
    @Transactional
    public void createFecha_entregaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fecha_entregaRepository.findAll().size();

        // Create the Fecha_entrega with an existing ID
        fecha_entrega.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFecha_entregaMockMvc.perform(post("/api/fecha-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fecha_entrega)))
            .andExpect(status().isBadRequest());

        // Validate the Fecha_entrega in the database
        List<Fecha_entrega> fecha_entregaList = fecha_entregaRepository.findAll();
        assertThat(fecha_entregaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFecha_entregas() throws Exception {
        // Initialize the database
        fecha_entregaRepository.saveAndFlush(fecha_entrega);

        // Get all the fecha_entregaList
        restFecha_entregaMockMvc.perform(get("/api/fecha-entregas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fecha_entrega.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())));
    }
    
    @Test
    @Transactional
    public void getFecha_entrega() throws Exception {
        // Initialize the database
        fecha_entregaRepository.saveAndFlush(fecha_entrega);

        // Get the fecha_entrega
        restFecha_entregaMockMvc.perform(get("/api/fecha-entregas/{id}", fecha_entrega.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fecha_entrega.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFecha_entrega() throws Exception {
        // Get the fecha_entrega
        restFecha_entregaMockMvc.perform(get("/api/fecha-entregas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFecha_entrega() throws Exception {
        // Initialize the database
        fecha_entregaRepository.saveAndFlush(fecha_entrega);

        int databaseSizeBeforeUpdate = fecha_entregaRepository.findAll().size();

        // Update the fecha_entrega
        Fecha_entrega updatedFecha_entrega = fecha_entregaRepository.findById(fecha_entrega.getId()).get();
        // Disconnect from session so that the updates on updatedFecha_entrega are not directly saved in db
        em.detach(updatedFecha_entrega);
        updatedFecha_entrega
            .fecha(UPDATED_FECHA);

        restFecha_entregaMockMvc.perform(put("/api/fecha-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFecha_entrega)))
            .andExpect(status().isOk());

        // Validate the Fecha_entrega in the database
        List<Fecha_entrega> fecha_entregaList = fecha_entregaRepository.findAll();
        assertThat(fecha_entregaList).hasSize(databaseSizeBeforeUpdate);
        Fecha_entrega testFecha_entrega = fecha_entregaList.get(fecha_entregaList.size() - 1);
        assertThat(testFecha_entrega.getFecha()).isEqualTo(UPDATED_FECHA);
    }

    @Test
    @Transactional
    public void updateNonExistingFecha_entrega() throws Exception {
        int databaseSizeBeforeUpdate = fecha_entregaRepository.findAll().size();

        // Create the Fecha_entrega

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFecha_entregaMockMvc.perform(put("/api/fecha-entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fecha_entrega)))
            .andExpect(status().isBadRequest());

        // Validate the Fecha_entrega in the database
        List<Fecha_entrega> fecha_entregaList = fecha_entregaRepository.findAll();
        assertThat(fecha_entregaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFecha_entrega() throws Exception {
        // Initialize the database
        fecha_entregaRepository.saveAndFlush(fecha_entrega);

        int databaseSizeBeforeDelete = fecha_entregaRepository.findAll().size();

        // Get the fecha_entrega
        restFecha_entregaMockMvc.perform(delete("/api/fecha-entregas/{id}", fecha_entrega.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Fecha_entrega> fecha_entregaList = fecha_entregaRepository.findAll();
        assertThat(fecha_entregaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fecha_entrega.class);
        Fecha_entrega fecha_entrega1 = new Fecha_entrega();
        fecha_entrega1.setId(1L);
        Fecha_entrega fecha_entrega2 = new Fecha_entrega();
        fecha_entrega2.setId(fecha_entrega1.getId());
        assertThat(fecha_entrega1).isEqualTo(fecha_entrega2);
        fecha_entrega2.setId(2L);
        assertThat(fecha_entrega1).isNotEqualTo(fecha_entrega2);
        fecha_entrega1.setId(null);
        assertThat(fecha_entrega1).isNotEqualTo(fecha_entrega2);
    }
}
