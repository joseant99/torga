package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.RepresentanteTienda;
import com.torga.pedidos.repository.RepresentanteTiendaRepository;
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
 * Test class for the RepresentanteTiendaResource REST controller.
 *
 * @see RepresentanteTiendaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class RepresentanteTiendaResourceIntTest {

    @Autowired
    private RepresentanteTiendaRepository representanteTiendaRepository;

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

    private MockMvc restRepresentanteTiendaMockMvc;

    private RepresentanteTienda representanteTienda;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RepresentanteTiendaResource representanteTiendaResource = new RepresentanteTiendaResource(representanteTiendaRepository);
        this.restRepresentanteTiendaMockMvc = MockMvcBuilders.standaloneSetup(representanteTiendaResource)
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
    public static RepresentanteTienda createEntity(EntityManager em) {
        RepresentanteTienda representanteTienda = new RepresentanteTienda();
        return representanteTienda;
    }

    @Before
    public void initTest() {
        representanteTienda = createEntity(em);
    }

    @Test
    @Transactional
    public void createRepresentanteTienda() throws Exception {
        int databaseSizeBeforeCreate = representanteTiendaRepository.findAll().size();

        // Create the RepresentanteTienda
        restRepresentanteTiendaMockMvc.perform(post("/api/representante-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(representanteTienda)))
            .andExpect(status().isCreated());

        // Validate the RepresentanteTienda in the database
        List<RepresentanteTienda> representanteTiendaList = representanteTiendaRepository.findAll();
        assertThat(representanteTiendaList).hasSize(databaseSizeBeforeCreate + 1);
        RepresentanteTienda testRepresentanteTienda = representanteTiendaList.get(representanteTiendaList.size() - 1);
    }

    @Test
    @Transactional
    public void createRepresentanteTiendaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = representanteTiendaRepository.findAll().size();

        // Create the RepresentanteTienda with an existing ID
        representanteTienda.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRepresentanteTiendaMockMvc.perform(post("/api/representante-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(representanteTienda)))
            .andExpect(status().isBadRequest());

        // Validate the RepresentanteTienda in the database
        List<RepresentanteTienda> representanteTiendaList = representanteTiendaRepository.findAll();
        assertThat(representanteTiendaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRepresentanteTiendas() throws Exception {
        // Initialize the database
        representanteTiendaRepository.saveAndFlush(representanteTienda);

        // Get all the representanteTiendaList
        restRepresentanteTiendaMockMvc.perform(get("/api/representante-tiendas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(representanteTienda.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getRepresentanteTienda() throws Exception {
        // Initialize the database
        representanteTiendaRepository.saveAndFlush(representanteTienda);

        // Get the representanteTienda
        restRepresentanteTiendaMockMvc.perform(get("/api/representante-tiendas/{id}", representanteTienda.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(representanteTienda.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRepresentanteTienda() throws Exception {
        // Get the representanteTienda
        restRepresentanteTiendaMockMvc.perform(get("/api/representante-tiendas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRepresentanteTienda() throws Exception {
        // Initialize the database
        representanteTiendaRepository.saveAndFlush(representanteTienda);

        int databaseSizeBeforeUpdate = representanteTiendaRepository.findAll().size();

        // Update the representanteTienda
        RepresentanteTienda updatedRepresentanteTienda = representanteTiendaRepository.findById(representanteTienda.getId()).get();
        // Disconnect from session so that the updates on updatedRepresentanteTienda are not directly saved in db
        em.detach(updatedRepresentanteTienda);

        restRepresentanteTiendaMockMvc.perform(put("/api/representante-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRepresentanteTienda)))
            .andExpect(status().isOk());

        // Validate the RepresentanteTienda in the database
        List<RepresentanteTienda> representanteTiendaList = representanteTiendaRepository.findAll();
        assertThat(representanteTiendaList).hasSize(databaseSizeBeforeUpdate);
        RepresentanteTienda testRepresentanteTienda = representanteTiendaList.get(representanteTiendaList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingRepresentanteTienda() throws Exception {
        int databaseSizeBeforeUpdate = representanteTiendaRepository.findAll().size();

        // Create the RepresentanteTienda

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRepresentanteTiendaMockMvc.perform(put("/api/representante-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(representanteTienda)))
            .andExpect(status().isBadRequest());

        // Validate the RepresentanteTienda in the database
        List<RepresentanteTienda> representanteTiendaList = representanteTiendaRepository.findAll();
        assertThat(representanteTiendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRepresentanteTienda() throws Exception {
        // Initialize the database
        representanteTiendaRepository.saveAndFlush(representanteTienda);

        int databaseSizeBeforeDelete = representanteTiendaRepository.findAll().size();

        // Get the representanteTienda
        restRepresentanteTiendaMockMvc.perform(delete("/api/representante-tiendas/{id}", representanteTienda.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RepresentanteTienda> representanteTiendaList = representanteTiendaRepository.findAll();
        assertThat(representanteTiendaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RepresentanteTienda.class);
        RepresentanteTienda representanteTienda1 = new RepresentanteTienda();
        representanteTienda1.setId(1L);
        RepresentanteTienda representanteTienda2 = new RepresentanteTienda();
        representanteTienda2.setId(representanteTienda1.getId());
        assertThat(representanteTienda1).isEqualTo(representanteTienda2);
        representanteTienda2.setId(2L);
        assertThat(representanteTienda1).isNotEqualTo(representanteTienda2);
        representanteTienda1.setId(null);
        assertThat(representanteTienda1).isNotEqualTo(representanteTienda2);
    }
}
