package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.PresupuestoArmarioInteriores;
import com.torga.pedidos.repository.PresupuestoArmarioInterioresRepository;
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
 * Test class for the PresupuestoArmarioInterioresResource REST controller.
 *
 * @see PresupuestoArmarioInterioresResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class PresupuestoArmarioInterioresResourceIntTest {

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    @Autowired
    private PresupuestoArmarioInterioresRepository presupuestoArmarioInterioresRepository;

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

    private MockMvc restPresupuestoArmarioInterioresMockMvc;

    private PresupuestoArmarioInteriores presupuestoArmarioInteriores;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PresupuestoArmarioInterioresResource presupuestoArmarioInterioresResource = new PresupuestoArmarioInterioresResource(presupuestoArmarioInterioresRepository);
        this.restPresupuestoArmarioInterioresMockMvc = MockMvcBuilders.standaloneSetup(presupuestoArmarioInterioresResource)
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
    public static PresupuestoArmarioInteriores createEntity(EntityManager em) {
        PresupuestoArmarioInteriores presupuestoArmarioInteriores = new PresupuestoArmarioInteriores()
            .precio(DEFAULT_PRECIO);
        return presupuestoArmarioInteriores;
    }

    @Before
    public void initTest() {
        presupuestoArmarioInteriores = createEntity(em);
    }

    @Test
    @Transactional
    public void createPresupuestoArmarioInteriores() throws Exception {
        int databaseSizeBeforeCreate = presupuestoArmarioInterioresRepository.findAll().size();

        // Create the PresupuestoArmarioInteriores
        restPresupuestoArmarioInterioresMockMvc.perform(post("/api/presupuesto-armario-interiores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuestoArmarioInteriores)))
            .andExpect(status().isCreated());

        // Validate the PresupuestoArmarioInteriores in the database
        List<PresupuestoArmarioInteriores> presupuestoArmarioInterioresList = presupuestoArmarioInterioresRepository.findAll();
        assertThat(presupuestoArmarioInterioresList).hasSize(databaseSizeBeforeCreate + 1);
        PresupuestoArmarioInteriores testPresupuestoArmarioInteriores = presupuestoArmarioInterioresList.get(presupuestoArmarioInterioresList.size() - 1);
        assertThat(testPresupuestoArmarioInteriores.getPrecio()).isEqualTo(DEFAULT_PRECIO);
    }

    @Test
    @Transactional
    public void createPresupuestoArmarioInterioresWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = presupuestoArmarioInterioresRepository.findAll().size();

        // Create the PresupuestoArmarioInteriores with an existing ID
        presupuestoArmarioInteriores.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPresupuestoArmarioInterioresMockMvc.perform(post("/api/presupuesto-armario-interiores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuestoArmarioInteriores)))
            .andExpect(status().isBadRequest());

        // Validate the PresupuestoArmarioInteriores in the database
        List<PresupuestoArmarioInteriores> presupuestoArmarioInterioresList = presupuestoArmarioInterioresRepository.findAll();
        assertThat(presupuestoArmarioInterioresList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPresupuestoArmarioInteriores() throws Exception {
        // Initialize the database
        presupuestoArmarioInterioresRepository.saveAndFlush(presupuestoArmarioInteriores);

        // Get all the presupuestoArmarioInterioresList
        restPresupuestoArmarioInterioresMockMvc.perform(get("/api/presupuesto-armario-interiores?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(presupuestoArmarioInteriores.getId().intValue())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getPresupuestoArmarioInteriores() throws Exception {
        // Initialize the database
        presupuestoArmarioInterioresRepository.saveAndFlush(presupuestoArmarioInteriores);

        // Get the presupuestoArmarioInteriores
        restPresupuestoArmarioInterioresMockMvc.perform(get("/api/presupuesto-armario-interiores/{id}", presupuestoArmarioInteriores.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(presupuestoArmarioInteriores.getId().intValue()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPresupuestoArmarioInteriores() throws Exception {
        // Get the presupuestoArmarioInteriores
        restPresupuestoArmarioInterioresMockMvc.perform(get("/api/presupuesto-armario-interiores/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePresupuestoArmarioInteriores() throws Exception {
        // Initialize the database
        presupuestoArmarioInterioresRepository.saveAndFlush(presupuestoArmarioInteriores);

        int databaseSizeBeforeUpdate = presupuestoArmarioInterioresRepository.findAll().size();

        // Update the presupuestoArmarioInteriores
        PresupuestoArmarioInteriores updatedPresupuestoArmarioInteriores = presupuestoArmarioInterioresRepository.findById(presupuestoArmarioInteriores.getId()).get();
        // Disconnect from session so that the updates on updatedPresupuestoArmarioInteriores are not directly saved in db
        em.detach(updatedPresupuestoArmarioInteriores);
        updatedPresupuestoArmarioInteriores
            .precio(UPDATED_PRECIO);

        restPresupuestoArmarioInterioresMockMvc.perform(put("/api/presupuesto-armario-interiores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPresupuestoArmarioInteriores)))
            .andExpect(status().isOk());

        // Validate the PresupuestoArmarioInteriores in the database
        List<PresupuestoArmarioInteriores> presupuestoArmarioInterioresList = presupuestoArmarioInterioresRepository.findAll();
        assertThat(presupuestoArmarioInterioresList).hasSize(databaseSizeBeforeUpdate);
        PresupuestoArmarioInteriores testPresupuestoArmarioInteriores = presupuestoArmarioInterioresList.get(presupuestoArmarioInterioresList.size() - 1);
        assertThat(testPresupuestoArmarioInteriores.getPrecio()).isEqualTo(UPDATED_PRECIO);
    }

    @Test
    @Transactional
    public void updateNonExistingPresupuestoArmarioInteriores() throws Exception {
        int databaseSizeBeforeUpdate = presupuestoArmarioInterioresRepository.findAll().size();

        // Create the PresupuestoArmarioInteriores

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPresupuestoArmarioInterioresMockMvc.perform(put("/api/presupuesto-armario-interiores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuestoArmarioInteriores)))
            .andExpect(status().isBadRequest());

        // Validate the PresupuestoArmarioInteriores in the database
        List<PresupuestoArmarioInteriores> presupuestoArmarioInterioresList = presupuestoArmarioInterioresRepository.findAll();
        assertThat(presupuestoArmarioInterioresList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePresupuestoArmarioInteriores() throws Exception {
        // Initialize the database
        presupuestoArmarioInterioresRepository.saveAndFlush(presupuestoArmarioInteriores);

        int databaseSizeBeforeDelete = presupuestoArmarioInterioresRepository.findAll().size();

        // Get the presupuestoArmarioInteriores
        restPresupuestoArmarioInterioresMockMvc.perform(delete("/api/presupuesto-armario-interiores/{id}", presupuestoArmarioInteriores.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PresupuestoArmarioInteriores> presupuestoArmarioInterioresList = presupuestoArmarioInterioresRepository.findAll();
        assertThat(presupuestoArmarioInterioresList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PresupuestoArmarioInteriores.class);
        PresupuestoArmarioInteriores presupuestoArmarioInteriores1 = new PresupuestoArmarioInteriores();
        presupuestoArmarioInteriores1.setId(1L);
        PresupuestoArmarioInteriores presupuestoArmarioInteriores2 = new PresupuestoArmarioInteriores();
        presupuestoArmarioInteriores2.setId(presupuestoArmarioInteriores1.getId());
        assertThat(presupuestoArmarioInteriores1).isEqualTo(presupuestoArmarioInteriores2);
        presupuestoArmarioInteriores2.setId(2L);
        assertThat(presupuestoArmarioInteriores1).isNotEqualTo(presupuestoArmarioInteriores2);
        presupuestoArmarioInteriores1.setId(null);
        assertThat(presupuestoArmarioInteriores1).isNotEqualTo(presupuestoArmarioInteriores2);
    }
}
