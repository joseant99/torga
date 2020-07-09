package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.PuertasPrecios;
import com.torga.pedidos.repository.PuertasPreciosRepository;
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
 * Test class for the PuertasPreciosResource REST controller.
 *
 * @see PuertasPreciosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class PuertasPreciosResourceIntTest {

    private static final Float DEFAULT_ANCHO = 1F;
    private static final Float UPDATED_ANCHO = 2F;

    private static final Float DEFAULT_ALTO = 1F;
    private static final Float UPDATED_ALTO = 2F;

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final Float DEFAULT_PUERTA_1 = 1F;
    private static final Float UPDATED_PUERTA_1 = 2F;

    private static final Float DEFAULT_PUERTA_2 = 1F;
    private static final Float UPDATED_PUERTA_2 = 2F;

    private static final Float DEFAULT_PUERTA_3 = 1F;
    private static final Float UPDATED_PUERTA_3 = 2F;

    private static final Float DEFAULT_PUERTA_4 = 1F;
    private static final Float UPDATED_PUERTA_4 = 2F;

    private static final Float DEFAULT_PUERTA_5 = 1F;
    private static final Float UPDATED_PUERTA_5 = 2F;

    private static final Float DEFAULT_PUERTA_6 = 1F;
    private static final Float UPDATED_PUERTA_6 = 2F;

    private static final Float DEFAULT_PUERTA_7 = 1F;
    private static final Float UPDATED_PUERTA_7 = 2F;

    private static final Float DEFAULT_PUERTA_8 = 1F;
    private static final Float UPDATED_PUERTA_8 = 2F;

    @Autowired
    private PuertasPreciosRepository puertasPreciosRepository;

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

    private MockMvc restPuertasPreciosMockMvc;

    private PuertasPrecios puertasPrecios;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PuertasPreciosResource puertasPreciosResource = new PuertasPreciosResource(puertasPreciosRepository);
        this.restPuertasPreciosMockMvc = MockMvcBuilders.standaloneSetup(puertasPreciosResource)
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
    public static PuertasPrecios createEntity(EntityManager em) {
        PuertasPrecios puertasPrecios = new PuertasPrecios()
            .ancho(DEFAULT_ANCHO)
            .alto(DEFAULT_ALTO)
            .precio(DEFAULT_PRECIO)
            .tipo(DEFAULT_TIPO)
            .puerta1(DEFAULT_PUERTA_1)
            .puerta2(DEFAULT_PUERTA_2)
            .puerta3(DEFAULT_PUERTA_3)
            .puerta4(DEFAULT_PUERTA_4)
            .puerta5(DEFAULT_PUERTA_5)
            .puerta6(DEFAULT_PUERTA_6)
            .puerta7(DEFAULT_PUERTA_7)
            .puerta8(DEFAULT_PUERTA_8);
        return puertasPrecios;
    }

    @Before
    public void initTest() {
        puertasPrecios = createEntity(em);
    }

    @Test
    @Transactional
    public void createPuertasPrecios() throws Exception {
        int databaseSizeBeforeCreate = puertasPreciosRepository.findAll().size();

        // Create the PuertasPrecios
        restPuertasPreciosMockMvc.perform(post("/api/puertas-precios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(puertasPrecios)))
            .andExpect(status().isCreated());

        // Validate the PuertasPrecios in the database
        List<PuertasPrecios> puertasPreciosList = puertasPreciosRepository.findAll();
        assertThat(puertasPreciosList).hasSize(databaseSizeBeforeCreate + 1);
        PuertasPrecios testPuertasPrecios = puertasPreciosList.get(puertasPreciosList.size() - 1);
        assertThat(testPuertasPrecios.getAncho()).isEqualTo(DEFAULT_ANCHO);
        assertThat(testPuertasPrecios.getAlto()).isEqualTo(DEFAULT_ALTO);
        assertThat(testPuertasPrecios.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testPuertasPrecios.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testPuertasPrecios.getPuerta1()).isEqualTo(DEFAULT_PUERTA_1);
        assertThat(testPuertasPrecios.getPuerta2()).isEqualTo(DEFAULT_PUERTA_2);
        assertThat(testPuertasPrecios.getPuerta3()).isEqualTo(DEFAULT_PUERTA_3);
        assertThat(testPuertasPrecios.getPuerta4()).isEqualTo(DEFAULT_PUERTA_4);
        assertThat(testPuertasPrecios.getPuerta5()).isEqualTo(DEFAULT_PUERTA_5);
        assertThat(testPuertasPrecios.getPuerta6()).isEqualTo(DEFAULT_PUERTA_6);
        assertThat(testPuertasPrecios.getPuerta7()).isEqualTo(DEFAULT_PUERTA_7);
        assertThat(testPuertasPrecios.getPuerta8()).isEqualTo(DEFAULT_PUERTA_8);
    }

    @Test
    @Transactional
    public void createPuertasPreciosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = puertasPreciosRepository.findAll().size();

        // Create the PuertasPrecios with an existing ID
        puertasPrecios.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPuertasPreciosMockMvc.perform(post("/api/puertas-precios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(puertasPrecios)))
            .andExpect(status().isBadRequest());

        // Validate the PuertasPrecios in the database
        List<PuertasPrecios> puertasPreciosList = puertasPreciosRepository.findAll();
        assertThat(puertasPreciosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPuertasPrecios() throws Exception {
        // Initialize the database
        puertasPreciosRepository.saveAndFlush(puertasPrecios);

        // Get all the puertasPreciosList
        restPuertasPreciosMockMvc.perform(get("/api/puertas-precios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(puertasPrecios.getId().intValue())))
            .andExpect(jsonPath("$.[*].ancho").value(hasItem(DEFAULT_ANCHO.doubleValue())))
            .andExpect(jsonPath("$.[*].alto").value(hasItem(DEFAULT_ALTO.doubleValue())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].puerta1").value(hasItem(DEFAULT_PUERTA_1.doubleValue())))
            .andExpect(jsonPath("$.[*].puerta2").value(hasItem(DEFAULT_PUERTA_2.doubleValue())))
            .andExpect(jsonPath("$.[*].puerta3").value(hasItem(DEFAULT_PUERTA_3.doubleValue())))
            .andExpect(jsonPath("$.[*].puerta4").value(hasItem(DEFAULT_PUERTA_4.doubleValue())))
            .andExpect(jsonPath("$.[*].puerta5").value(hasItem(DEFAULT_PUERTA_5.doubleValue())))
            .andExpect(jsonPath("$.[*].puerta6").value(hasItem(DEFAULT_PUERTA_6.doubleValue())))
            .andExpect(jsonPath("$.[*].puerta7").value(hasItem(DEFAULT_PUERTA_7.doubleValue())))
            .andExpect(jsonPath("$.[*].puerta8").value(hasItem(DEFAULT_PUERTA_8.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getPuertasPrecios() throws Exception {
        // Initialize the database
        puertasPreciosRepository.saveAndFlush(puertasPrecios);

        // Get the puertasPrecios
        restPuertasPreciosMockMvc.perform(get("/api/puertas-precios/{id}", puertasPrecios.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(puertasPrecios.getId().intValue()))
            .andExpect(jsonPath("$.ancho").value(DEFAULT_ANCHO.doubleValue()))
            .andExpect(jsonPath("$.alto").value(DEFAULT_ALTO.doubleValue()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.puerta1").value(DEFAULT_PUERTA_1.doubleValue()))
            .andExpect(jsonPath("$.puerta2").value(DEFAULT_PUERTA_2.doubleValue()))
            .andExpect(jsonPath("$.puerta3").value(DEFAULT_PUERTA_3.doubleValue()))
            .andExpect(jsonPath("$.puerta4").value(DEFAULT_PUERTA_4.doubleValue()))
            .andExpect(jsonPath("$.puerta5").value(DEFAULT_PUERTA_5.doubleValue()))
            .andExpect(jsonPath("$.puerta6").value(DEFAULT_PUERTA_6.doubleValue()))
            .andExpect(jsonPath("$.puerta7").value(DEFAULT_PUERTA_7.doubleValue()))
            .andExpect(jsonPath("$.puerta8").value(DEFAULT_PUERTA_8.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPuertasPrecios() throws Exception {
        // Get the puertasPrecios
        restPuertasPreciosMockMvc.perform(get("/api/puertas-precios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePuertasPrecios() throws Exception {
        // Initialize the database
        puertasPreciosRepository.saveAndFlush(puertasPrecios);

        int databaseSizeBeforeUpdate = puertasPreciosRepository.findAll().size();

        // Update the puertasPrecios
        PuertasPrecios updatedPuertasPrecios = puertasPreciosRepository.findById(puertasPrecios.getId()).get();
        // Disconnect from session so that the updates on updatedPuertasPrecios are not directly saved in db
        em.detach(updatedPuertasPrecios);
        updatedPuertasPrecios
            .ancho(UPDATED_ANCHO)
            .alto(UPDATED_ALTO)
            .precio(UPDATED_PRECIO)
            .tipo(UPDATED_TIPO)
            .puerta1(UPDATED_PUERTA_1)
            .puerta2(UPDATED_PUERTA_2)
            .puerta3(UPDATED_PUERTA_3)
            .puerta4(UPDATED_PUERTA_4)
            .puerta5(UPDATED_PUERTA_5)
            .puerta6(UPDATED_PUERTA_6)
            .puerta7(UPDATED_PUERTA_7)
            .puerta8(UPDATED_PUERTA_8);

        restPuertasPreciosMockMvc.perform(put("/api/puertas-precios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPuertasPrecios)))
            .andExpect(status().isOk());

        // Validate the PuertasPrecios in the database
        List<PuertasPrecios> puertasPreciosList = puertasPreciosRepository.findAll();
        assertThat(puertasPreciosList).hasSize(databaseSizeBeforeUpdate);
        PuertasPrecios testPuertasPrecios = puertasPreciosList.get(puertasPreciosList.size() - 1);
        assertThat(testPuertasPrecios.getAncho()).isEqualTo(UPDATED_ANCHO);
        assertThat(testPuertasPrecios.getAlto()).isEqualTo(UPDATED_ALTO);
        assertThat(testPuertasPrecios.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testPuertasPrecios.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testPuertasPrecios.getPuerta1()).isEqualTo(UPDATED_PUERTA_1);
        assertThat(testPuertasPrecios.getPuerta2()).isEqualTo(UPDATED_PUERTA_2);
        assertThat(testPuertasPrecios.getPuerta3()).isEqualTo(UPDATED_PUERTA_3);
        assertThat(testPuertasPrecios.getPuerta4()).isEqualTo(UPDATED_PUERTA_4);
        assertThat(testPuertasPrecios.getPuerta5()).isEqualTo(UPDATED_PUERTA_5);
        assertThat(testPuertasPrecios.getPuerta6()).isEqualTo(UPDATED_PUERTA_6);
        assertThat(testPuertasPrecios.getPuerta7()).isEqualTo(UPDATED_PUERTA_7);
        assertThat(testPuertasPrecios.getPuerta8()).isEqualTo(UPDATED_PUERTA_8);
    }

    @Test
    @Transactional
    public void updateNonExistingPuertasPrecios() throws Exception {
        int databaseSizeBeforeUpdate = puertasPreciosRepository.findAll().size();

        // Create the PuertasPrecios

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPuertasPreciosMockMvc.perform(put("/api/puertas-precios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(puertasPrecios)))
            .andExpect(status().isBadRequest());

        // Validate the PuertasPrecios in the database
        List<PuertasPrecios> puertasPreciosList = puertasPreciosRepository.findAll();
        assertThat(puertasPreciosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePuertasPrecios() throws Exception {
        // Initialize the database
        puertasPreciosRepository.saveAndFlush(puertasPrecios);

        int databaseSizeBeforeDelete = puertasPreciosRepository.findAll().size();

        // Get the puertasPrecios
        restPuertasPreciosMockMvc.perform(delete("/api/puertas-precios/{id}", puertasPrecios.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PuertasPrecios> puertasPreciosList = puertasPreciosRepository.findAll();
        assertThat(puertasPreciosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PuertasPrecios.class);
        PuertasPrecios puertasPrecios1 = new PuertasPrecios();
        puertasPrecios1.setId(1L);
        PuertasPrecios puertasPrecios2 = new PuertasPrecios();
        puertasPrecios2.setId(puertasPrecios1.getId());
        assertThat(puertasPrecios1).isEqualTo(puertasPrecios2);
        puertasPrecios2.setId(2L);
        assertThat(puertasPrecios1).isNotEqualTo(puertasPrecios2);
        puertasPrecios1.setId(null);
        assertThat(puertasPrecios1).isNotEqualTo(puertasPrecios2);
    }
}
