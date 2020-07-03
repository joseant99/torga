package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.TransportistaTabla;
import com.torga.pedidos.repository.TransportistaTablaRepository;
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
 * Test class for the TransportistaTablaResource REST controller.
 *
 * @see TransportistaTablaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class TransportistaTablaResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE_FISCAL = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_FISCAL = "BBBBBBBBBB";

    private static final Float DEFAULT_CP = 1F;
    private static final Float UPDATED_CP = 2F;

    @Autowired
    private TransportistaTablaRepository transportistaTablaRepository;

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

    private MockMvc restTransportistaTablaMockMvc;

    private TransportistaTabla transportistaTabla;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransportistaTablaResource transportistaTablaResource = new TransportistaTablaResource(transportistaTablaRepository);
        this.restTransportistaTablaMockMvc = MockMvcBuilders.standaloneSetup(transportistaTablaResource)
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
    public static TransportistaTabla createEntity(EntityManager em) {
        TransportistaTabla transportistaTabla = new TransportistaTabla()
            .nombre(DEFAULT_NOMBRE)
            .telefono(DEFAULT_TELEFONO)
            .email(DEFAULT_EMAIL)
            .direccion(DEFAULT_DIRECCION)
            .nombreFiscal(DEFAULT_NOMBRE_FISCAL)
            .cp(DEFAULT_CP);
        return transportistaTabla;
    }

    @Before
    public void initTest() {
        transportistaTabla = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransportistaTabla() throws Exception {
        int databaseSizeBeforeCreate = transportistaTablaRepository.findAll().size();

        // Create the TransportistaTabla
        restTransportistaTablaMockMvc.perform(post("/api/transportista-tablas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportistaTabla)))
            .andExpect(status().isCreated());

        // Validate the TransportistaTabla in the database
        List<TransportistaTabla> transportistaTablaList = transportistaTablaRepository.findAll();
        assertThat(transportistaTablaList).hasSize(databaseSizeBeforeCreate + 1);
        TransportistaTabla testTransportistaTabla = transportistaTablaList.get(transportistaTablaList.size() - 1);
        assertThat(testTransportistaTabla.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testTransportistaTabla.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testTransportistaTabla.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testTransportistaTabla.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
        assertThat(testTransportistaTabla.getNombreFiscal()).isEqualTo(DEFAULT_NOMBRE_FISCAL);
        assertThat(testTransportistaTabla.getCp()).isEqualTo(DEFAULT_CP);
    }

    @Test
    @Transactional
    public void createTransportistaTablaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transportistaTablaRepository.findAll().size();

        // Create the TransportistaTabla with an existing ID
        transportistaTabla.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransportistaTablaMockMvc.perform(post("/api/transportista-tablas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportistaTabla)))
            .andExpect(status().isBadRequest());

        // Validate the TransportistaTabla in the database
        List<TransportistaTabla> transportistaTablaList = transportistaTablaRepository.findAll();
        assertThat(transportistaTablaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTransportistaTablas() throws Exception {
        // Initialize the database
        transportistaTablaRepository.saveAndFlush(transportistaTabla);

        // Get all the transportistaTablaList
        restTransportistaTablaMockMvc.perform(get("/api/transportista-tablas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transportistaTabla.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].nombreFiscal").value(hasItem(DEFAULT_NOMBRE_FISCAL.toString())))
            .andExpect(jsonPath("$.[*].cp").value(hasItem(DEFAULT_CP.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getTransportistaTabla() throws Exception {
        // Initialize the database
        transportistaTablaRepository.saveAndFlush(transportistaTabla);

        // Get the transportistaTabla
        restTransportistaTablaMockMvc.perform(get("/api/transportista-tablas/{id}", transportistaTabla.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transportistaTabla.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION.toString()))
            .andExpect(jsonPath("$.nombreFiscal").value(DEFAULT_NOMBRE_FISCAL.toString()))
            .andExpect(jsonPath("$.cp").value(DEFAULT_CP.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTransportistaTabla() throws Exception {
        // Get the transportistaTabla
        restTransportistaTablaMockMvc.perform(get("/api/transportista-tablas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransportistaTabla() throws Exception {
        // Initialize the database
        transportistaTablaRepository.saveAndFlush(transportistaTabla);

        int databaseSizeBeforeUpdate = transportistaTablaRepository.findAll().size();

        // Update the transportistaTabla
        TransportistaTabla updatedTransportistaTabla = transportistaTablaRepository.findById(transportistaTabla.getId()).get();
        // Disconnect from session so that the updates on updatedTransportistaTabla are not directly saved in db
        em.detach(updatedTransportistaTabla);
        updatedTransportistaTabla
            .nombre(UPDATED_NOMBRE)
            .telefono(UPDATED_TELEFONO)
            .email(UPDATED_EMAIL)
            .direccion(UPDATED_DIRECCION)
            .nombreFiscal(UPDATED_NOMBRE_FISCAL)
            .cp(UPDATED_CP);

        restTransportistaTablaMockMvc.perform(put("/api/transportista-tablas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransportistaTabla)))
            .andExpect(status().isOk());

        // Validate the TransportistaTabla in the database
        List<TransportistaTabla> transportistaTablaList = transportistaTablaRepository.findAll();
        assertThat(transportistaTablaList).hasSize(databaseSizeBeforeUpdate);
        TransportistaTabla testTransportistaTabla = transportistaTablaList.get(transportistaTablaList.size() - 1);
        assertThat(testTransportistaTabla.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testTransportistaTabla.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testTransportistaTabla.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testTransportistaTabla.getDireccion()).isEqualTo(UPDATED_DIRECCION);
        assertThat(testTransportistaTabla.getNombreFiscal()).isEqualTo(UPDATED_NOMBRE_FISCAL);
        assertThat(testTransportistaTabla.getCp()).isEqualTo(UPDATED_CP);
    }

    @Test
    @Transactional
    public void updateNonExistingTransportistaTabla() throws Exception {
        int databaseSizeBeforeUpdate = transportistaTablaRepository.findAll().size();

        // Create the TransportistaTabla

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransportistaTablaMockMvc.perform(put("/api/transportista-tablas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportistaTabla)))
            .andExpect(status().isBadRequest());

        // Validate the TransportistaTabla in the database
        List<TransportistaTabla> transportistaTablaList = transportistaTablaRepository.findAll();
        assertThat(transportistaTablaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransportistaTabla() throws Exception {
        // Initialize the database
        transportistaTablaRepository.saveAndFlush(transportistaTabla);

        int databaseSizeBeforeDelete = transportistaTablaRepository.findAll().size();

        // Get the transportistaTabla
        restTransportistaTablaMockMvc.perform(delete("/api/transportista-tablas/{id}", transportistaTabla.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TransportistaTabla> transportistaTablaList = transportistaTablaRepository.findAll();
        assertThat(transportistaTablaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransportistaTabla.class);
        TransportistaTabla transportistaTabla1 = new TransportistaTabla();
        transportistaTabla1.setId(1L);
        TransportistaTabla transportistaTabla2 = new TransportistaTabla();
        transportistaTabla2.setId(transportistaTabla1.getId());
        assertThat(transportistaTabla1).isEqualTo(transportistaTabla2);
        transportistaTabla2.setId(2L);
        assertThat(transportistaTabla1).isNotEqualTo(transportistaTabla2);
        transportistaTabla1.setId(null);
        assertThat(transportistaTabla1).isNotEqualTo(transportistaTabla2);
    }
}
