package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.PresupuestoArmario;
import com.torga.pedidos.repository.PresupuestoArmarioRepository;
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
 * Test class for the PresupuestoArmarioResource REST controller.
 *
 * @see PresupuestoArmarioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class PresupuestoArmarioResourceIntTest {

    private static final Float DEFAULT_ANCHO = 1F;
    private static final Float UPDATED_ANCHO = 2F;

    private static final Float DEFAULT_ALTO = 1F;
    private static final Float UPDATED_ALTO = 2F;

    private static final Float DEFAULT_FONDO = 1F;
    private static final Float UPDATED_FONDO = 2F;

    private static final Float DEFAULT_CASCO_PRECIO = 1F;
    private static final Float UPDATED_CASCO_PRECIO = 2F;

    @Autowired
    private PresupuestoArmarioRepository presupuestoArmarioRepository;

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

    private MockMvc restPresupuestoArmarioMockMvc;

    private PresupuestoArmario presupuestoArmario;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PresupuestoArmarioResource presupuestoArmarioResource = new PresupuestoArmarioResource(presupuestoArmarioRepository);
        this.restPresupuestoArmarioMockMvc = MockMvcBuilders.standaloneSetup(presupuestoArmarioResource)
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
    public static PresupuestoArmario createEntity(EntityManager em) {
        PresupuestoArmario presupuestoArmario = new PresupuestoArmario()
            .ancho(DEFAULT_ANCHO)
            .alto(DEFAULT_ALTO)
            .fondo(DEFAULT_FONDO)
            .cascoPrecio(DEFAULT_CASCO_PRECIO);
        return presupuestoArmario;
    }

    @Before
    public void initTest() {
        presupuestoArmario = createEntity(em);
    }

    @Test
    @Transactional
    public void createPresupuestoArmario() throws Exception {
        int databaseSizeBeforeCreate = presupuestoArmarioRepository.findAll().size();

        // Create the PresupuestoArmario
        restPresupuestoArmarioMockMvc.perform(post("/api/presupuesto-armarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuestoArmario)))
            .andExpect(status().isCreated());

        // Validate the PresupuestoArmario in the database
        List<PresupuestoArmario> presupuestoArmarioList = presupuestoArmarioRepository.findAll();
        assertThat(presupuestoArmarioList).hasSize(databaseSizeBeforeCreate + 1);
        PresupuestoArmario testPresupuestoArmario = presupuestoArmarioList.get(presupuestoArmarioList.size() - 1);
        assertThat(testPresupuestoArmario.getAncho()).isEqualTo(DEFAULT_ANCHO);
        assertThat(testPresupuestoArmario.getAlto()).isEqualTo(DEFAULT_ALTO);
        assertThat(testPresupuestoArmario.getFondo()).isEqualTo(DEFAULT_FONDO);
        assertThat(testPresupuestoArmario.getCascoPrecio()).isEqualTo(DEFAULT_CASCO_PRECIO);
    }

    @Test
    @Transactional
    public void createPresupuestoArmarioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = presupuestoArmarioRepository.findAll().size();

        // Create the PresupuestoArmario with an existing ID
        presupuestoArmario.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPresupuestoArmarioMockMvc.perform(post("/api/presupuesto-armarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuestoArmario)))
            .andExpect(status().isBadRequest());

        // Validate the PresupuestoArmario in the database
        List<PresupuestoArmario> presupuestoArmarioList = presupuestoArmarioRepository.findAll();
        assertThat(presupuestoArmarioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPresupuestoArmarios() throws Exception {
        // Initialize the database
        presupuestoArmarioRepository.saveAndFlush(presupuestoArmario);

        // Get all the presupuestoArmarioList
        restPresupuestoArmarioMockMvc.perform(get("/api/presupuesto-armarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(presupuestoArmario.getId().intValue())))
            .andExpect(jsonPath("$.[*].ancho").value(hasItem(DEFAULT_ANCHO.doubleValue())))
            .andExpect(jsonPath("$.[*].alto").value(hasItem(DEFAULT_ALTO.doubleValue())))
            .andExpect(jsonPath("$.[*].fondo").value(hasItem(DEFAULT_FONDO.doubleValue())))
            .andExpect(jsonPath("$.[*].cascoPrecio").value(hasItem(DEFAULT_CASCO_PRECIO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getPresupuestoArmario() throws Exception {
        // Initialize the database
        presupuestoArmarioRepository.saveAndFlush(presupuestoArmario);

        // Get the presupuestoArmario
        restPresupuestoArmarioMockMvc.perform(get("/api/presupuesto-armarios/{id}", presupuestoArmario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(presupuestoArmario.getId().intValue()))
            .andExpect(jsonPath("$.ancho").value(DEFAULT_ANCHO.doubleValue()))
            .andExpect(jsonPath("$.alto").value(DEFAULT_ALTO.doubleValue()))
            .andExpect(jsonPath("$.fondo").value(DEFAULT_FONDO.doubleValue()))
            .andExpect(jsonPath("$.cascoPrecio").value(DEFAULT_CASCO_PRECIO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPresupuestoArmario() throws Exception {
        // Get the presupuestoArmario
        restPresupuestoArmarioMockMvc.perform(get("/api/presupuesto-armarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePresupuestoArmario() throws Exception {
        // Initialize the database
        presupuestoArmarioRepository.saveAndFlush(presupuestoArmario);

        int databaseSizeBeforeUpdate = presupuestoArmarioRepository.findAll().size();

        // Update the presupuestoArmario
        PresupuestoArmario updatedPresupuestoArmario = presupuestoArmarioRepository.findById(presupuestoArmario.getId()).get();
        // Disconnect from session so that the updates on updatedPresupuestoArmario are not directly saved in db
        em.detach(updatedPresupuestoArmario);
        updatedPresupuestoArmario
            .ancho(UPDATED_ANCHO)
            .alto(UPDATED_ALTO)
            .fondo(UPDATED_FONDO)
            .cascoPrecio(UPDATED_CASCO_PRECIO);

        restPresupuestoArmarioMockMvc.perform(put("/api/presupuesto-armarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPresupuestoArmario)))
            .andExpect(status().isOk());

        // Validate the PresupuestoArmario in the database
        List<PresupuestoArmario> presupuestoArmarioList = presupuestoArmarioRepository.findAll();
        assertThat(presupuestoArmarioList).hasSize(databaseSizeBeforeUpdate);
        PresupuestoArmario testPresupuestoArmario = presupuestoArmarioList.get(presupuestoArmarioList.size() - 1);
        assertThat(testPresupuestoArmario.getAncho()).isEqualTo(UPDATED_ANCHO);
        assertThat(testPresupuestoArmario.getAlto()).isEqualTo(UPDATED_ALTO);
        assertThat(testPresupuestoArmario.getFondo()).isEqualTo(UPDATED_FONDO);
        assertThat(testPresupuestoArmario.getCascoPrecio()).isEqualTo(UPDATED_CASCO_PRECIO);
    }

    @Test
    @Transactional
    public void updateNonExistingPresupuestoArmario() throws Exception {
        int databaseSizeBeforeUpdate = presupuestoArmarioRepository.findAll().size();

        // Create the PresupuestoArmario

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPresupuestoArmarioMockMvc.perform(put("/api/presupuesto-armarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuestoArmario)))
            .andExpect(status().isBadRequest());

        // Validate the PresupuestoArmario in the database
        List<PresupuestoArmario> presupuestoArmarioList = presupuestoArmarioRepository.findAll();
        assertThat(presupuestoArmarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePresupuestoArmario() throws Exception {
        // Initialize the database
        presupuestoArmarioRepository.saveAndFlush(presupuestoArmario);

        int databaseSizeBeforeDelete = presupuestoArmarioRepository.findAll().size();

        // Get the presupuestoArmario
        restPresupuestoArmarioMockMvc.perform(delete("/api/presupuesto-armarios/{id}", presupuestoArmario.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PresupuestoArmario> presupuestoArmarioList = presupuestoArmarioRepository.findAll();
        assertThat(presupuestoArmarioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PresupuestoArmario.class);
        PresupuestoArmario presupuestoArmario1 = new PresupuestoArmario();
        presupuestoArmario1.setId(1L);
        PresupuestoArmario presupuestoArmario2 = new PresupuestoArmario();
        presupuestoArmario2.setId(presupuestoArmario1.getId());
        assertThat(presupuestoArmario1).isEqualTo(presupuestoArmario2);
        presupuestoArmario2.setId(2L);
        assertThat(presupuestoArmario1).isNotEqualTo(presupuestoArmario2);
        presupuestoArmario1.setId(null);
        assertThat(presupuestoArmario1).isNotEqualTo(presupuestoArmario2);
    }
}
