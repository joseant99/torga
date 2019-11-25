package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.PresupuestoArmarioPuertas;
import com.torga.pedidos.repository.PresupuestoArmarioPuertasRepository;
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
 * Test class for the PresupuestoArmarioPuertasResource REST controller.
 *
 * @see PresupuestoArmarioPuertasResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class PresupuestoArmarioPuertasResourceIntTest {

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    @Autowired
    private PresupuestoArmarioPuertasRepository presupuestoArmarioPuertasRepository;

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

    private MockMvc restPresupuestoArmarioPuertasMockMvc;

    private PresupuestoArmarioPuertas presupuestoArmarioPuertas;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PresupuestoArmarioPuertasResource presupuestoArmarioPuertasResource = new PresupuestoArmarioPuertasResource(presupuestoArmarioPuertasRepository);
        this.restPresupuestoArmarioPuertasMockMvc = MockMvcBuilders.standaloneSetup(presupuestoArmarioPuertasResource)
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
    public static PresupuestoArmarioPuertas createEntity(EntityManager em) {
        PresupuestoArmarioPuertas presupuestoArmarioPuertas = new PresupuestoArmarioPuertas()
            .precio(DEFAULT_PRECIO);
        return presupuestoArmarioPuertas;
    }

    @Before
    public void initTest() {
        presupuestoArmarioPuertas = createEntity(em);
    }

    @Test
    @Transactional
    public void createPresupuestoArmarioPuertas() throws Exception {
        int databaseSizeBeforeCreate = presupuestoArmarioPuertasRepository.findAll().size();

        // Create the PresupuestoArmarioPuertas
        restPresupuestoArmarioPuertasMockMvc.perform(post("/api/presupuesto-armario-puertas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuestoArmarioPuertas)))
            .andExpect(status().isCreated());

        // Validate the PresupuestoArmarioPuertas in the database
        List<PresupuestoArmarioPuertas> presupuestoArmarioPuertasList = presupuestoArmarioPuertasRepository.findAll();
        assertThat(presupuestoArmarioPuertasList).hasSize(databaseSizeBeforeCreate + 1);
        PresupuestoArmarioPuertas testPresupuestoArmarioPuertas = presupuestoArmarioPuertasList.get(presupuestoArmarioPuertasList.size() - 1);
        assertThat(testPresupuestoArmarioPuertas.getPrecio()).isEqualTo(DEFAULT_PRECIO);
    }

    @Test
    @Transactional
    public void createPresupuestoArmarioPuertasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = presupuestoArmarioPuertasRepository.findAll().size();

        // Create the PresupuestoArmarioPuertas with an existing ID
        presupuestoArmarioPuertas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPresupuestoArmarioPuertasMockMvc.perform(post("/api/presupuesto-armario-puertas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuestoArmarioPuertas)))
            .andExpect(status().isBadRequest());

        // Validate the PresupuestoArmarioPuertas in the database
        List<PresupuestoArmarioPuertas> presupuestoArmarioPuertasList = presupuestoArmarioPuertasRepository.findAll();
        assertThat(presupuestoArmarioPuertasList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPresupuestoArmarioPuertas() throws Exception {
        // Initialize the database
        presupuestoArmarioPuertasRepository.saveAndFlush(presupuestoArmarioPuertas);

        // Get all the presupuestoArmarioPuertasList
        restPresupuestoArmarioPuertasMockMvc.perform(get("/api/presupuesto-armario-puertas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(presupuestoArmarioPuertas.getId().intValue())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getPresupuestoArmarioPuertas() throws Exception {
        // Initialize the database
        presupuestoArmarioPuertasRepository.saveAndFlush(presupuestoArmarioPuertas);

        // Get the presupuestoArmarioPuertas
        restPresupuestoArmarioPuertasMockMvc.perform(get("/api/presupuesto-armario-puertas/{id}", presupuestoArmarioPuertas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(presupuestoArmarioPuertas.getId().intValue()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPresupuestoArmarioPuertas() throws Exception {
        // Get the presupuestoArmarioPuertas
        restPresupuestoArmarioPuertasMockMvc.perform(get("/api/presupuesto-armario-puertas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePresupuestoArmarioPuertas() throws Exception {
        // Initialize the database
        presupuestoArmarioPuertasRepository.saveAndFlush(presupuestoArmarioPuertas);

        int databaseSizeBeforeUpdate = presupuestoArmarioPuertasRepository.findAll().size();

        // Update the presupuestoArmarioPuertas
        PresupuestoArmarioPuertas updatedPresupuestoArmarioPuertas = presupuestoArmarioPuertasRepository.findById(presupuestoArmarioPuertas.getId()).get();
        // Disconnect from session so that the updates on updatedPresupuestoArmarioPuertas are not directly saved in db
        em.detach(updatedPresupuestoArmarioPuertas);
        updatedPresupuestoArmarioPuertas
            .precio(UPDATED_PRECIO);

        restPresupuestoArmarioPuertasMockMvc.perform(put("/api/presupuesto-armario-puertas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPresupuestoArmarioPuertas)))
            .andExpect(status().isOk());

        // Validate the PresupuestoArmarioPuertas in the database
        List<PresupuestoArmarioPuertas> presupuestoArmarioPuertasList = presupuestoArmarioPuertasRepository.findAll();
        assertThat(presupuestoArmarioPuertasList).hasSize(databaseSizeBeforeUpdate);
        PresupuestoArmarioPuertas testPresupuestoArmarioPuertas = presupuestoArmarioPuertasList.get(presupuestoArmarioPuertasList.size() - 1);
        assertThat(testPresupuestoArmarioPuertas.getPrecio()).isEqualTo(UPDATED_PRECIO);
    }

    @Test
    @Transactional
    public void updateNonExistingPresupuestoArmarioPuertas() throws Exception {
        int databaseSizeBeforeUpdate = presupuestoArmarioPuertasRepository.findAll().size();

        // Create the PresupuestoArmarioPuertas

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPresupuestoArmarioPuertasMockMvc.perform(put("/api/presupuesto-armario-puertas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuestoArmarioPuertas)))
            .andExpect(status().isBadRequest());

        // Validate the PresupuestoArmarioPuertas in the database
        List<PresupuestoArmarioPuertas> presupuestoArmarioPuertasList = presupuestoArmarioPuertasRepository.findAll();
        assertThat(presupuestoArmarioPuertasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePresupuestoArmarioPuertas() throws Exception {
        // Initialize the database
        presupuestoArmarioPuertasRepository.saveAndFlush(presupuestoArmarioPuertas);

        int databaseSizeBeforeDelete = presupuestoArmarioPuertasRepository.findAll().size();

        // Get the presupuestoArmarioPuertas
        restPresupuestoArmarioPuertasMockMvc.perform(delete("/api/presupuesto-armario-puertas/{id}", presupuestoArmarioPuertas.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PresupuestoArmarioPuertas> presupuestoArmarioPuertasList = presupuestoArmarioPuertasRepository.findAll();
        assertThat(presupuestoArmarioPuertasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PresupuestoArmarioPuertas.class);
        PresupuestoArmarioPuertas presupuestoArmarioPuertas1 = new PresupuestoArmarioPuertas();
        presupuestoArmarioPuertas1.setId(1L);
        PresupuestoArmarioPuertas presupuestoArmarioPuertas2 = new PresupuestoArmarioPuertas();
        presupuestoArmarioPuertas2.setId(presupuestoArmarioPuertas1.getId());
        assertThat(presupuestoArmarioPuertas1).isEqualTo(presupuestoArmarioPuertas2);
        presupuestoArmarioPuertas2.setId(2L);
        assertThat(presupuestoArmarioPuertas1).isNotEqualTo(presupuestoArmarioPuertas2);
        presupuestoArmarioPuertas1.setId(null);
        assertThat(presupuestoArmarioPuertas1).isNotEqualTo(presupuestoArmarioPuertas2);
    }
}
