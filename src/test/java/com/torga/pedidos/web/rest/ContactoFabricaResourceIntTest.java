package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.ContactoFabrica;
import com.torga.pedidos.repository.ContactoFabricaRepository;
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
 * Test class for the ContactoFabricaResource REST controller.
 *
 * @see ContactoFabricaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class ContactoFabricaResourceIntTest {

    private static final String DEFAULT_FECHA_INICIO = "AAAAAAAAAA";
    private static final String UPDATED_FECHA_INICIO = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String DEFAULT_ALBARAN = "AAAAAAAAAA";
    private static final String UPDATED_ALBARAN = "BBBBBBBBBB";

    private static final String DEFAULT_FACTURA = "AAAAAAAAAA";
    private static final String UPDATED_FACTURA = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    @Autowired
    private ContactoFabricaRepository contactoFabricaRepository;

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

    private MockMvc restContactoFabricaMockMvc;

    private ContactoFabrica contactoFabrica;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContactoFabricaResource contactoFabricaResource = new ContactoFabricaResource(contactoFabricaRepository);
        this.restContactoFabricaMockMvc = MockMvcBuilders.standaloneSetup(contactoFabricaResource)
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
    public static ContactoFabrica createEntity(EntityManager em) {
        ContactoFabrica contactoFabrica = new ContactoFabrica()
            .fechaInicio(DEFAULT_FECHA_INICIO)
            .tipo(DEFAULT_TIPO)
            .estado(DEFAULT_ESTADO)
            .albaran(DEFAULT_ALBARAN)
            .factura(DEFAULT_FACTURA)
            .codigo(DEFAULT_CODIGO);
        return contactoFabrica;
    }

    @Before
    public void initTest() {
        contactoFabrica = createEntity(em);
    }

    @Test
    @Transactional
    public void createContactoFabrica() throws Exception {
        int databaseSizeBeforeCreate = contactoFabricaRepository.findAll().size();

        // Create the ContactoFabrica
        restContactoFabricaMockMvc.perform(post("/api/contacto-fabricas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactoFabrica)))
            .andExpect(status().isCreated());

        // Validate the ContactoFabrica in the database
        List<ContactoFabrica> contactoFabricaList = contactoFabricaRepository.findAll();
        assertThat(contactoFabricaList).hasSize(databaseSizeBeforeCreate + 1);
        ContactoFabrica testContactoFabrica = contactoFabricaList.get(contactoFabricaList.size() - 1);
        assertThat(testContactoFabrica.getFechaInicio()).isEqualTo(DEFAULT_FECHA_INICIO);
        assertThat(testContactoFabrica.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testContactoFabrica.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testContactoFabrica.getAlbaran()).isEqualTo(DEFAULT_ALBARAN);
        assertThat(testContactoFabrica.getFactura()).isEqualTo(DEFAULT_FACTURA);
        assertThat(testContactoFabrica.getCodigo()).isEqualTo(DEFAULT_CODIGO);
    }

    @Test
    @Transactional
    public void createContactoFabricaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contactoFabricaRepository.findAll().size();

        // Create the ContactoFabrica with an existing ID
        contactoFabrica.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContactoFabricaMockMvc.perform(post("/api/contacto-fabricas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactoFabrica)))
            .andExpect(status().isBadRequest());

        // Validate the ContactoFabrica in the database
        List<ContactoFabrica> contactoFabricaList = contactoFabricaRepository.findAll();
        assertThat(contactoFabricaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllContactoFabricas() throws Exception {
        // Initialize the database
        contactoFabricaRepository.saveAndFlush(contactoFabrica);

        // Get all the contactoFabricaList
        restContactoFabricaMockMvc.perform(get("/api/contacto-fabricas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contactoFabrica.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].albaran").value(hasItem(DEFAULT_ALBARAN.toString())))
            .andExpect(jsonPath("$.[*].factura").value(hasItem(DEFAULT_FACTURA.toString())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())));
    }
    
    @Test
    @Transactional
    public void getContactoFabrica() throws Exception {
        // Initialize the database
        contactoFabricaRepository.saveAndFlush(contactoFabrica);

        // Get the contactoFabrica
        restContactoFabricaMockMvc.perform(get("/api/contacto-fabricas/{id}", contactoFabrica.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contactoFabrica.getId().intValue()))
            .andExpect(jsonPath("$.fechaInicio").value(DEFAULT_FECHA_INICIO.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()))
            .andExpect(jsonPath("$.albaran").value(DEFAULT_ALBARAN.toString()))
            .andExpect(jsonPath("$.factura").value(DEFAULT_FACTURA.toString()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingContactoFabrica() throws Exception {
        // Get the contactoFabrica
        restContactoFabricaMockMvc.perform(get("/api/contacto-fabricas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContactoFabrica() throws Exception {
        // Initialize the database
        contactoFabricaRepository.saveAndFlush(contactoFabrica);

        int databaseSizeBeforeUpdate = contactoFabricaRepository.findAll().size();

        // Update the contactoFabrica
        ContactoFabrica updatedContactoFabrica = contactoFabricaRepository.findById(contactoFabrica.getId()).get();
        // Disconnect from session so that the updates on updatedContactoFabrica are not directly saved in db
        em.detach(updatedContactoFabrica);
        updatedContactoFabrica
            .fechaInicio(UPDATED_FECHA_INICIO)
            .tipo(UPDATED_TIPO)
            .estado(UPDATED_ESTADO)
            .albaran(UPDATED_ALBARAN)
            .factura(UPDATED_FACTURA)
            .codigo(UPDATED_CODIGO);

        restContactoFabricaMockMvc.perform(put("/api/contacto-fabricas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContactoFabrica)))
            .andExpect(status().isOk());

        // Validate the ContactoFabrica in the database
        List<ContactoFabrica> contactoFabricaList = contactoFabricaRepository.findAll();
        assertThat(contactoFabricaList).hasSize(databaseSizeBeforeUpdate);
        ContactoFabrica testContactoFabrica = contactoFabricaList.get(contactoFabricaList.size() - 1);
        assertThat(testContactoFabrica.getFechaInicio()).isEqualTo(UPDATED_FECHA_INICIO);
        assertThat(testContactoFabrica.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testContactoFabrica.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testContactoFabrica.getAlbaran()).isEqualTo(UPDATED_ALBARAN);
        assertThat(testContactoFabrica.getFactura()).isEqualTo(UPDATED_FACTURA);
        assertThat(testContactoFabrica.getCodigo()).isEqualTo(UPDATED_CODIGO);
    }

    @Test
    @Transactional
    public void updateNonExistingContactoFabrica() throws Exception {
        int databaseSizeBeforeUpdate = contactoFabricaRepository.findAll().size();

        // Create the ContactoFabrica

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContactoFabricaMockMvc.perform(put("/api/contacto-fabricas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactoFabrica)))
            .andExpect(status().isBadRequest());

        // Validate the ContactoFabrica in the database
        List<ContactoFabrica> contactoFabricaList = contactoFabricaRepository.findAll();
        assertThat(contactoFabricaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContactoFabrica() throws Exception {
        // Initialize the database
        contactoFabricaRepository.saveAndFlush(contactoFabrica);

        int databaseSizeBeforeDelete = contactoFabricaRepository.findAll().size();

        // Get the contactoFabrica
        restContactoFabricaMockMvc.perform(delete("/api/contacto-fabricas/{id}", contactoFabrica.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ContactoFabrica> contactoFabricaList = contactoFabricaRepository.findAll();
        assertThat(contactoFabricaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContactoFabrica.class);
        ContactoFabrica contactoFabrica1 = new ContactoFabrica();
        contactoFabrica1.setId(1L);
        ContactoFabrica contactoFabrica2 = new ContactoFabrica();
        contactoFabrica2.setId(contactoFabrica1.getId());
        assertThat(contactoFabrica1).isEqualTo(contactoFabrica2);
        contactoFabrica2.setId(2L);
        assertThat(contactoFabrica1).isNotEqualTo(contactoFabrica2);
        contactoFabrica1.setId(null);
        assertThat(contactoFabrica1).isNotEqualTo(contactoFabrica2);
    }
}
