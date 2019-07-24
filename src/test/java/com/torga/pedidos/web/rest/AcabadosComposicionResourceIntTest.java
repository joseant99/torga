package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.AcabadosComposicion;
import com.torga.pedidos.domain.Acabados;
import com.torga.pedidos.repository.AcabadosComposicionRepository;
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
 * Test class for the AcabadosComposicionResource REST controller.
 *
 * @see AcabadosComposicionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class AcabadosComposicionResourceIntTest {

    @Autowired
    private AcabadosComposicionRepository acabadosComposicionRepository;

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

    private MockMvc restAcabadosComposicionMockMvc;

    private AcabadosComposicion acabadosComposicion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AcabadosComposicionResource acabadosComposicionResource = new AcabadosComposicionResource(acabadosComposicionRepository);
        this.restAcabadosComposicionMockMvc = MockMvcBuilders.standaloneSetup(acabadosComposicionResource)
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
    public static AcabadosComposicion createEntity(EntityManager em) {
        AcabadosComposicion acabadosComposicion = new AcabadosComposicion();
        // Add required entity
        Acabados acabados = AcabadosResourceIntTest.createEntity(em);
        em.persist(acabados);
        em.flush();
        acabadosComposicion.setAcabados(acabados);
        return acabadosComposicion;
    }

    @Before
    public void initTest() {
        acabadosComposicion = createEntity(em);
    }

    @Test
    @Transactional
    public void createAcabadosComposicion() throws Exception {
        int databaseSizeBeforeCreate = acabadosComposicionRepository.findAll().size();

        // Create the AcabadosComposicion
        restAcabadosComposicionMockMvc.perform(post("/api/acabados-composicions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acabadosComposicion)))
            .andExpect(status().isCreated());

        // Validate the AcabadosComposicion in the database
        List<AcabadosComposicion> acabadosComposicionList = acabadosComposicionRepository.findAll();
        assertThat(acabadosComposicionList).hasSize(databaseSizeBeforeCreate + 1);
        AcabadosComposicion testAcabadosComposicion = acabadosComposicionList.get(acabadosComposicionList.size() - 1);
    }

    @Test
    @Transactional
    public void createAcabadosComposicionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = acabadosComposicionRepository.findAll().size();

        // Create the AcabadosComposicion with an existing ID
        acabadosComposicion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcabadosComposicionMockMvc.perform(post("/api/acabados-composicions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acabadosComposicion)))
            .andExpect(status().isBadRequest());

        // Validate the AcabadosComposicion in the database
        List<AcabadosComposicion> acabadosComposicionList = acabadosComposicionRepository.findAll();
        assertThat(acabadosComposicionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAcabadosComposicions() throws Exception {
        // Initialize the database
        acabadosComposicionRepository.saveAndFlush(acabadosComposicion);

        // Get all the acabadosComposicionList
        restAcabadosComposicionMockMvc.perform(get("/api/acabados-composicions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(acabadosComposicion.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getAcabadosComposicion() throws Exception {
        // Initialize the database
        acabadosComposicionRepository.saveAndFlush(acabadosComposicion);

        // Get the acabadosComposicion
        restAcabadosComposicionMockMvc.perform(get("/api/acabados-composicions/{id}", acabadosComposicion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(acabadosComposicion.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAcabadosComposicion() throws Exception {
        // Get the acabadosComposicion
        restAcabadosComposicionMockMvc.perform(get("/api/acabados-composicions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAcabadosComposicion() throws Exception {
        // Initialize the database
        acabadosComposicionRepository.saveAndFlush(acabadosComposicion);

        int databaseSizeBeforeUpdate = acabadosComposicionRepository.findAll().size();

        // Update the acabadosComposicion
        AcabadosComposicion updatedAcabadosComposicion = acabadosComposicionRepository.findById(acabadosComposicion.getId()).get();
        // Disconnect from session so that the updates on updatedAcabadosComposicion are not directly saved in db
        em.detach(updatedAcabadosComposicion);

        restAcabadosComposicionMockMvc.perform(put("/api/acabados-composicions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAcabadosComposicion)))
            .andExpect(status().isOk());

        // Validate the AcabadosComposicion in the database
        List<AcabadosComposicion> acabadosComposicionList = acabadosComposicionRepository.findAll();
        assertThat(acabadosComposicionList).hasSize(databaseSizeBeforeUpdate);
        AcabadosComposicion testAcabadosComposicion = acabadosComposicionList.get(acabadosComposicionList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingAcabadosComposicion() throws Exception {
        int databaseSizeBeforeUpdate = acabadosComposicionRepository.findAll().size();

        // Create the AcabadosComposicion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAcabadosComposicionMockMvc.perform(put("/api/acabados-composicions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acabadosComposicion)))
            .andExpect(status().isBadRequest());

        // Validate the AcabadosComposicion in the database
        List<AcabadosComposicion> acabadosComposicionList = acabadosComposicionRepository.findAll();
        assertThat(acabadosComposicionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAcabadosComposicion() throws Exception {
        // Initialize the database
        acabadosComposicionRepository.saveAndFlush(acabadosComposicion);

        int databaseSizeBeforeDelete = acabadosComposicionRepository.findAll().size();

        // Get the acabadosComposicion
        restAcabadosComposicionMockMvc.perform(delete("/api/acabados-composicions/{id}", acabadosComposicion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AcabadosComposicion> acabadosComposicionList = acabadosComposicionRepository.findAll();
        assertThat(acabadosComposicionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AcabadosComposicion.class);
        AcabadosComposicion acabadosComposicion1 = new AcabadosComposicion();
        acabadosComposicion1.setId(1L);
        AcabadosComposicion acabadosComposicion2 = new AcabadosComposicion();
        acabadosComposicion2.setId(acabadosComposicion1.getId());
        assertThat(acabadosComposicion1).isEqualTo(acabadosComposicion2);
        acabadosComposicion2.setId(2L);
        assertThat(acabadosComposicion1).isNotEqualTo(acabadosComposicion2);
        acabadosComposicion1.setId(null);
        assertThat(acabadosComposicion1).isNotEqualTo(acabadosComposicion2);
    }
}
