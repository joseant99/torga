package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.DatosCliente;
import com.torga.pedidos.repository.DatosClienteRepository;
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
 * Test class for the DatosClienteResource REST controller.
 *
 * @see DatosClienteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class DatosClienteResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_CORREO = "AAAAAAAAAA";
    private static final String UPDATED_CORREO = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO_POSTAL = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_POSTAL = "BBBBBBBBBB";

    private static final String DEFAULT_FINES = "AAAAAAAAAA";
    private static final String UPDATED_FINES = "BBBBBBBBBB";

    private static final String DEFAULT_ENVIAR = "AAAAAAAAAA";
    private static final String UPDATED_ENVIAR = "BBBBBBBBBB";

    @Autowired
    private DatosClienteRepository datosClienteRepository;

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

    private MockMvc restDatosClienteMockMvc;

    private DatosCliente datosCliente;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DatosClienteResource datosClienteResource = new DatosClienteResource(datosClienteRepository);
        this.restDatosClienteMockMvc = MockMvcBuilders.standaloneSetup(datosClienteResource)
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
    public static DatosCliente createEntity(EntityManager em) {
        DatosCliente datosCliente = new DatosCliente()
            .nombre(DEFAULT_NOMBRE)
            .correo(DEFAULT_CORREO)
            .telefono(DEFAULT_TELEFONO)
            .direccion(DEFAULT_DIRECCION)
            .codigoPostal(DEFAULT_CODIGO_POSTAL)
            .fines(DEFAULT_FINES)
            .enviar(DEFAULT_ENVIAR);
        return datosCliente;
    }

    @Before
    public void initTest() {
        datosCliente = createEntity(em);
    }

    @Test
    @Transactional
    public void createDatosCliente() throws Exception {
        int databaseSizeBeforeCreate = datosClienteRepository.findAll().size();

        // Create the DatosCliente
        restDatosClienteMockMvc.perform(post("/api/datos-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(datosCliente)))
            .andExpect(status().isCreated());

        // Validate the DatosCliente in the database
        List<DatosCliente> datosClienteList = datosClienteRepository.findAll();
        assertThat(datosClienteList).hasSize(databaseSizeBeforeCreate + 1);
        DatosCliente testDatosCliente = datosClienteList.get(datosClienteList.size() - 1);
        assertThat(testDatosCliente.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testDatosCliente.getCorreo()).isEqualTo(DEFAULT_CORREO);
        assertThat(testDatosCliente.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testDatosCliente.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
        assertThat(testDatosCliente.getCodigoPostal()).isEqualTo(DEFAULT_CODIGO_POSTAL);
        assertThat(testDatosCliente.getFines()).isEqualTo(DEFAULT_FINES);
        assertThat(testDatosCliente.getEnviar()).isEqualTo(DEFAULT_ENVIAR);
    }

    @Test
    @Transactional
    public void createDatosClienteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = datosClienteRepository.findAll().size();

        // Create the DatosCliente with an existing ID
        datosCliente.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDatosClienteMockMvc.perform(post("/api/datos-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(datosCliente)))
            .andExpect(status().isBadRequest());

        // Validate the DatosCliente in the database
        List<DatosCliente> datosClienteList = datosClienteRepository.findAll();
        assertThat(datosClienteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDatosClientes() throws Exception {
        // Initialize the database
        datosClienteRepository.saveAndFlush(datosCliente);

        // Get all the datosClienteList
        restDatosClienteMockMvc.perform(get("/api/datos-clientes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(datosCliente.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].correo").value(hasItem(DEFAULT_CORREO.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].codigoPostal").value(hasItem(DEFAULT_CODIGO_POSTAL.toString())))
            .andExpect(jsonPath("$.[*].fines").value(hasItem(DEFAULT_FINES.toString())))
            .andExpect(jsonPath("$.[*].enviar").value(hasItem(DEFAULT_ENVIAR.toString())));
    }
    
    @Test
    @Transactional
    public void getDatosCliente() throws Exception {
        // Initialize the database
        datosClienteRepository.saveAndFlush(datosCliente);

        // Get the datosCliente
        restDatosClienteMockMvc.perform(get("/api/datos-clientes/{id}", datosCliente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(datosCliente.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.correo").value(DEFAULT_CORREO.toString()))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO.toString()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION.toString()))
            .andExpect(jsonPath("$.codigoPostal").value(DEFAULT_CODIGO_POSTAL.toString()))
            .andExpect(jsonPath("$.fines").value(DEFAULT_FINES.toString()))
            .andExpect(jsonPath("$.enviar").value(DEFAULT_ENVIAR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDatosCliente() throws Exception {
        // Get the datosCliente
        restDatosClienteMockMvc.perform(get("/api/datos-clientes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDatosCliente() throws Exception {
        // Initialize the database
        datosClienteRepository.saveAndFlush(datosCliente);

        int databaseSizeBeforeUpdate = datosClienteRepository.findAll().size();

        // Update the datosCliente
        DatosCliente updatedDatosCliente = datosClienteRepository.findById(datosCliente.getId()).get();
        // Disconnect from session so that the updates on updatedDatosCliente are not directly saved in db
        em.detach(updatedDatosCliente);
        updatedDatosCliente
            .nombre(UPDATED_NOMBRE)
            .correo(UPDATED_CORREO)
            .telefono(UPDATED_TELEFONO)
            .direccion(UPDATED_DIRECCION)
            .codigoPostal(UPDATED_CODIGO_POSTAL)
            .fines(UPDATED_FINES)
            .enviar(UPDATED_ENVIAR);

        restDatosClienteMockMvc.perform(put("/api/datos-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDatosCliente)))
            .andExpect(status().isOk());

        // Validate the DatosCliente in the database
        List<DatosCliente> datosClienteList = datosClienteRepository.findAll();
        assertThat(datosClienteList).hasSize(databaseSizeBeforeUpdate);
        DatosCliente testDatosCliente = datosClienteList.get(datosClienteList.size() - 1);
        assertThat(testDatosCliente.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testDatosCliente.getCorreo()).isEqualTo(UPDATED_CORREO);
        assertThat(testDatosCliente.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testDatosCliente.getDireccion()).isEqualTo(UPDATED_DIRECCION);
        assertThat(testDatosCliente.getCodigoPostal()).isEqualTo(UPDATED_CODIGO_POSTAL);
        assertThat(testDatosCliente.getFines()).isEqualTo(UPDATED_FINES);
        assertThat(testDatosCliente.getEnviar()).isEqualTo(UPDATED_ENVIAR);
    }

    @Test
    @Transactional
    public void updateNonExistingDatosCliente() throws Exception {
        int databaseSizeBeforeUpdate = datosClienteRepository.findAll().size();

        // Create the DatosCliente

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDatosClienteMockMvc.perform(put("/api/datos-clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(datosCliente)))
            .andExpect(status().isBadRequest());

        // Validate the DatosCliente in the database
        List<DatosCliente> datosClienteList = datosClienteRepository.findAll();
        assertThat(datosClienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDatosCliente() throws Exception {
        // Initialize the database
        datosClienteRepository.saveAndFlush(datosCliente);

        int databaseSizeBeforeDelete = datosClienteRepository.findAll().size();

        // Get the datosCliente
        restDatosClienteMockMvc.perform(delete("/api/datos-clientes/{id}", datosCliente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DatosCliente> datosClienteList = datosClienteRepository.findAll();
        assertThat(datosClienteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DatosCliente.class);
        DatosCliente datosCliente1 = new DatosCliente();
        datosCliente1.setId(1L);
        DatosCliente datosCliente2 = new DatosCliente();
        datosCliente2.setId(datosCliente1.getId());
        assertThat(datosCliente1).isEqualTo(datosCliente2);
        datosCliente2.setId(2L);
        assertThat(datosCliente1).isNotEqualTo(datosCliente2);
        datosCliente1.setId(null);
        assertThat(datosCliente1).isNotEqualTo(datosCliente2);
    }
}
