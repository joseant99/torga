package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.InterioresArmarioNuevos;
import com.torga.pedidos.repository.InterioresArmarioNuevosRepository;
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
 * Test class for the InterioresArmarioNuevosResource REST controller.
 *
 * @see InterioresArmarioNuevosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class InterioresArmarioNuevosResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Float DEFAULT_ANCHO = 1F;
    private static final Float UPDATED_ANCHO = 2F;

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    private static final Float DEFAULT_LUZ = 1F;
    private static final Float UPDATED_LUZ = 2F;

    private static final Float DEFAULT_A = 1F;
    private static final Float UPDATED_A = 2F;

    private static final Float DEFAULT_B = 1F;
    private static final Float UPDATED_B = 2F;

    private static final Float DEFAULT_C = 1F;
    private static final Float UPDATED_C = 2F;

    private static final Float DEFAULT_D = 1F;
    private static final Float UPDATED_D = 2F;

    private static final Float DEFAULT_E = 1F;
    private static final Float UPDATED_E = 2F;

    private static final Float DEFAULT_PILOTO = 1F;
    private static final Float UPDATED_PILOTO = 2F;

    @Autowired
    private InterioresArmarioNuevosRepository interioresArmarioNuevosRepository;

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

    private MockMvc restInterioresArmarioNuevosMockMvc;

    private InterioresArmarioNuevos interioresArmarioNuevos;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InterioresArmarioNuevosResource interioresArmarioNuevosResource = new InterioresArmarioNuevosResource(interioresArmarioNuevosRepository);
        this.restInterioresArmarioNuevosMockMvc = MockMvcBuilders.standaloneSetup(interioresArmarioNuevosResource)
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
    public static InterioresArmarioNuevos createEntity(EntityManager em) {
        InterioresArmarioNuevos interioresArmarioNuevos = new InterioresArmarioNuevos()
            .nombre(DEFAULT_NOMBRE)
            .ancho(DEFAULT_ANCHO)
            .precio(DEFAULT_PRECIO)
            .luz(DEFAULT_LUZ)
            .a(DEFAULT_A)
            .b(DEFAULT_B)
            .c(DEFAULT_C)
            .d(DEFAULT_D)
            .e(DEFAULT_E)
            .piloto(DEFAULT_PILOTO);
        return interioresArmarioNuevos;
    }

    @Before
    public void initTest() {
        interioresArmarioNuevos = createEntity(em);
    }

    @Test
    @Transactional
    public void createInterioresArmarioNuevos() throws Exception {
        int databaseSizeBeforeCreate = interioresArmarioNuevosRepository.findAll().size();

        // Create the InterioresArmarioNuevos
        restInterioresArmarioNuevosMockMvc.perform(post("/api/interiores-armario-nuevos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interioresArmarioNuevos)))
            .andExpect(status().isCreated());

        // Validate the InterioresArmarioNuevos in the database
        List<InterioresArmarioNuevos> interioresArmarioNuevosList = interioresArmarioNuevosRepository.findAll();
        assertThat(interioresArmarioNuevosList).hasSize(databaseSizeBeforeCreate + 1);
        InterioresArmarioNuevos testInterioresArmarioNuevos = interioresArmarioNuevosList.get(interioresArmarioNuevosList.size() - 1);
        assertThat(testInterioresArmarioNuevos.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testInterioresArmarioNuevos.getAncho()).isEqualTo(DEFAULT_ANCHO);
        assertThat(testInterioresArmarioNuevos.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testInterioresArmarioNuevos.getLuz()).isEqualTo(DEFAULT_LUZ);
        assertThat(testInterioresArmarioNuevos.getA()).isEqualTo(DEFAULT_A);
        assertThat(testInterioresArmarioNuevos.getB()).isEqualTo(DEFAULT_B);
        assertThat(testInterioresArmarioNuevos.getC()).isEqualTo(DEFAULT_C);
        assertThat(testInterioresArmarioNuevos.getD()).isEqualTo(DEFAULT_D);
        assertThat(testInterioresArmarioNuevos.getE()).isEqualTo(DEFAULT_E);
        assertThat(testInterioresArmarioNuevos.getPiloto()).isEqualTo(DEFAULT_PILOTO);
    }

    @Test
    @Transactional
    public void createInterioresArmarioNuevosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = interioresArmarioNuevosRepository.findAll().size();

        // Create the InterioresArmarioNuevos with an existing ID
        interioresArmarioNuevos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInterioresArmarioNuevosMockMvc.perform(post("/api/interiores-armario-nuevos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interioresArmarioNuevos)))
            .andExpect(status().isBadRequest());

        // Validate the InterioresArmarioNuevos in the database
        List<InterioresArmarioNuevos> interioresArmarioNuevosList = interioresArmarioNuevosRepository.findAll();
        assertThat(interioresArmarioNuevosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInterioresArmarioNuevos() throws Exception {
        // Initialize the database
        interioresArmarioNuevosRepository.saveAndFlush(interioresArmarioNuevos);

        // Get all the interioresArmarioNuevosList
        restInterioresArmarioNuevosMockMvc.perform(get("/api/interiores-armario-nuevos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(interioresArmarioNuevos.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].ancho").value(hasItem(DEFAULT_ANCHO.doubleValue())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())))
            .andExpect(jsonPath("$.[*].luz").value(hasItem(DEFAULT_LUZ.doubleValue())))
            .andExpect(jsonPath("$.[*].a").value(hasItem(DEFAULT_A.doubleValue())))
            .andExpect(jsonPath("$.[*].b").value(hasItem(DEFAULT_B.doubleValue())))
            .andExpect(jsonPath("$.[*].c").value(hasItem(DEFAULT_C.doubleValue())))
            .andExpect(jsonPath("$.[*].d").value(hasItem(DEFAULT_D.doubleValue())))
            .andExpect(jsonPath("$.[*].e").value(hasItem(DEFAULT_E.doubleValue())))
            .andExpect(jsonPath("$.[*].piloto").value(hasItem(DEFAULT_PILOTO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getInterioresArmarioNuevos() throws Exception {
        // Initialize the database
        interioresArmarioNuevosRepository.saveAndFlush(interioresArmarioNuevos);

        // Get the interioresArmarioNuevos
        restInterioresArmarioNuevosMockMvc.perform(get("/api/interiores-armario-nuevos/{id}", interioresArmarioNuevos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(interioresArmarioNuevos.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.ancho").value(DEFAULT_ANCHO.doubleValue()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()))
            .andExpect(jsonPath("$.luz").value(DEFAULT_LUZ.doubleValue()))
            .andExpect(jsonPath("$.a").value(DEFAULT_A.doubleValue()))
            .andExpect(jsonPath("$.b").value(DEFAULT_B.doubleValue()))
            .andExpect(jsonPath("$.c").value(DEFAULT_C.doubleValue()))
            .andExpect(jsonPath("$.d").value(DEFAULT_D.doubleValue()))
            .andExpect(jsonPath("$.e").value(DEFAULT_E.doubleValue()))
            .andExpect(jsonPath("$.piloto").value(DEFAULT_PILOTO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingInterioresArmarioNuevos() throws Exception {
        // Get the interioresArmarioNuevos
        restInterioresArmarioNuevosMockMvc.perform(get("/api/interiores-armario-nuevos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInterioresArmarioNuevos() throws Exception {
        // Initialize the database
        interioresArmarioNuevosRepository.saveAndFlush(interioresArmarioNuevos);

        int databaseSizeBeforeUpdate = interioresArmarioNuevosRepository.findAll().size();

        // Update the interioresArmarioNuevos
        InterioresArmarioNuevos updatedInterioresArmarioNuevos = interioresArmarioNuevosRepository.findById(interioresArmarioNuevos.getId()).get();
        // Disconnect from session so that the updates on updatedInterioresArmarioNuevos are not directly saved in db
        em.detach(updatedInterioresArmarioNuevos);
        updatedInterioresArmarioNuevos
            .nombre(UPDATED_NOMBRE)
            .ancho(UPDATED_ANCHO)
            .precio(UPDATED_PRECIO)
            .luz(UPDATED_LUZ)
            .a(UPDATED_A)
            .b(UPDATED_B)
            .c(UPDATED_C)
            .d(UPDATED_D)
            .e(UPDATED_E)
            .piloto(UPDATED_PILOTO);

        restInterioresArmarioNuevosMockMvc.perform(put("/api/interiores-armario-nuevos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInterioresArmarioNuevos)))
            .andExpect(status().isOk());

        // Validate the InterioresArmarioNuevos in the database
        List<InterioresArmarioNuevos> interioresArmarioNuevosList = interioresArmarioNuevosRepository.findAll();
        assertThat(interioresArmarioNuevosList).hasSize(databaseSizeBeforeUpdate);
        InterioresArmarioNuevos testInterioresArmarioNuevos = interioresArmarioNuevosList.get(interioresArmarioNuevosList.size() - 1);
        assertThat(testInterioresArmarioNuevos.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testInterioresArmarioNuevos.getAncho()).isEqualTo(UPDATED_ANCHO);
        assertThat(testInterioresArmarioNuevos.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testInterioresArmarioNuevos.getLuz()).isEqualTo(UPDATED_LUZ);
        assertThat(testInterioresArmarioNuevos.getA()).isEqualTo(UPDATED_A);
        assertThat(testInterioresArmarioNuevos.getB()).isEqualTo(UPDATED_B);
        assertThat(testInterioresArmarioNuevos.getC()).isEqualTo(UPDATED_C);
        assertThat(testInterioresArmarioNuevos.getD()).isEqualTo(UPDATED_D);
        assertThat(testInterioresArmarioNuevos.getE()).isEqualTo(UPDATED_E);
        assertThat(testInterioresArmarioNuevos.getPiloto()).isEqualTo(UPDATED_PILOTO);
    }

    @Test
    @Transactional
    public void updateNonExistingInterioresArmarioNuevos() throws Exception {
        int databaseSizeBeforeUpdate = interioresArmarioNuevosRepository.findAll().size();

        // Create the InterioresArmarioNuevos

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInterioresArmarioNuevosMockMvc.perform(put("/api/interiores-armario-nuevos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interioresArmarioNuevos)))
            .andExpect(status().isBadRequest());

        // Validate the InterioresArmarioNuevos in the database
        List<InterioresArmarioNuevos> interioresArmarioNuevosList = interioresArmarioNuevosRepository.findAll();
        assertThat(interioresArmarioNuevosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInterioresArmarioNuevos() throws Exception {
        // Initialize the database
        interioresArmarioNuevosRepository.saveAndFlush(interioresArmarioNuevos);

        int databaseSizeBeforeDelete = interioresArmarioNuevosRepository.findAll().size();

        // Get the interioresArmarioNuevos
        restInterioresArmarioNuevosMockMvc.perform(delete("/api/interiores-armario-nuevos/{id}", interioresArmarioNuevos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<InterioresArmarioNuevos> interioresArmarioNuevosList = interioresArmarioNuevosRepository.findAll();
        assertThat(interioresArmarioNuevosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InterioresArmarioNuevos.class);
        InterioresArmarioNuevos interioresArmarioNuevos1 = new InterioresArmarioNuevos();
        interioresArmarioNuevos1.setId(1L);
        InterioresArmarioNuevos interioresArmarioNuevos2 = new InterioresArmarioNuevos();
        interioresArmarioNuevos2.setId(interioresArmarioNuevos1.getId());
        assertThat(interioresArmarioNuevos1).isEqualTo(interioresArmarioNuevos2);
        interioresArmarioNuevos2.setId(2L);
        assertThat(interioresArmarioNuevos1).isNotEqualTo(interioresArmarioNuevos2);
        interioresArmarioNuevos1.setId(null);
        assertThat(interioresArmarioNuevos1).isNotEqualTo(interioresArmarioNuevos2);
    }
}
