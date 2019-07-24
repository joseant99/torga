package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Transportistas;
import com.torga.pedidos.repository.TransportistasRepository;
import com.torga.pedidos.service.TransportistasService;
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
 * Test class for the TransportistasResource REST controller.
 *
 * @see TransportistasResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class TransportistasResourceIntTest {

    private static final String DEFAULT_TRANSPORTISTA_PEDIDO = "AAAAAAAAAA";
    private static final String UPDATED_TRANSPORTISTA_PEDIDO = "BBBBBBBBBB";

    @Autowired
    private TransportistasRepository transportistasRepository;

    @Autowired
    private TransportistasService transportistasService;

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

    private MockMvc restTransportistasMockMvc;

    private Transportistas transportistas;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransportistasResource transportistasResource = new TransportistasResource(transportistasService);
        this.restTransportistasMockMvc = MockMvcBuilders.standaloneSetup(transportistasResource)
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
    public static Transportistas createEntity(EntityManager em) {
        Transportistas transportistas = new Transportistas()
            .transportistaPedido(DEFAULT_TRANSPORTISTA_PEDIDO);
        return transportistas;
    }

    @Before
    public void initTest() {
        transportistas = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransportistas() throws Exception {
        int databaseSizeBeforeCreate = transportistasRepository.findAll().size();

        // Create the Transportistas
        restTransportistasMockMvc.perform(post("/api/transportistas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportistas)))
            .andExpect(status().isCreated());

        // Validate the Transportistas in the database
        List<Transportistas> transportistasList = transportistasRepository.findAll();
        assertThat(transportistasList).hasSize(databaseSizeBeforeCreate + 1);
        Transportistas testTransportistas = transportistasList.get(transportistasList.size() - 1);
        assertThat(testTransportistas.getTransportistaPedido()).isEqualTo(DEFAULT_TRANSPORTISTA_PEDIDO);
    }

    @Test
    @Transactional
    public void createTransportistasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transportistasRepository.findAll().size();

        // Create the Transportistas with an existing ID
        transportistas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransportistasMockMvc.perform(post("/api/transportistas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportistas)))
            .andExpect(status().isBadRequest());

        // Validate the Transportistas in the database
        List<Transportistas> transportistasList = transportistasRepository.findAll();
        assertThat(transportistasList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTransportistaPedidoIsRequired() throws Exception {
        int databaseSizeBeforeTest = transportistasRepository.findAll().size();
        // set the field null
        transportistas.setTransportistaPedido(null);

        // Create the Transportistas, which fails.

        restTransportistasMockMvc.perform(post("/api/transportistas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportistas)))
            .andExpect(status().isBadRequest());

        List<Transportistas> transportistasList = transportistasRepository.findAll();
        assertThat(transportistasList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTransportistas() throws Exception {
        // Initialize the database
        transportistasRepository.saveAndFlush(transportistas);

        // Get all the transportistasList
        restTransportistasMockMvc.perform(get("/api/transportistas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transportistas.getId().intValue())))
            .andExpect(jsonPath("$.[*].transportistaPedido").value(hasItem(DEFAULT_TRANSPORTISTA_PEDIDO.toString())));
    }
    
    @Test
    @Transactional
    public void getTransportistas() throws Exception {
        // Initialize the database
        transportistasRepository.saveAndFlush(transportistas);

        // Get the transportistas
        restTransportistasMockMvc.perform(get("/api/transportistas/{id}", transportistas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transportistas.getId().intValue()))
            .andExpect(jsonPath("$.transportistaPedido").value(DEFAULT_TRANSPORTISTA_PEDIDO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTransportistas() throws Exception {
        // Get the transportistas
        restTransportistasMockMvc.perform(get("/api/transportistas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransportistas() throws Exception {
        // Initialize the database
        transportistasService.save(transportistas);

        int databaseSizeBeforeUpdate = transportistasRepository.findAll().size();

        // Update the transportistas
        Transportistas updatedTransportistas = transportistasRepository.findById(transportistas.getId()).get();
        // Disconnect from session so that the updates on updatedTransportistas are not directly saved in db
        em.detach(updatedTransportistas);
        updatedTransportistas
            .transportistaPedido(UPDATED_TRANSPORTISTA_PEDIDO);

        restTransportistasMockMvc.perform(put("/api/transportistas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransportistas)))
            .andExpect(status().isOk());

        // Validate the Transportistas in the database
        List<Transportistas> transportistasList = transportistasRepository.findAll();
        assertThat(transportistasList).hasSize(databaseSizeBeforeUpdate);
        Transportistas testTransportistas = transportistasList.get(transportistasList.size() - 1);
        assertThat(testTransportistas.getTransportistaPedido()).isEqualTo(UPDATED_TRANSPORTISTA_PEDIDO);
    }

    @Test
    @Transactional
    public void updateNonExistingTransportistas() throws Exception {
        int databaseSizeBeforeUpdate = transportistasRepository.findAll().size();

        // Create the Transportistas

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransportistasMockMvc.perform(put("/api/transportistas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportistas)))
            .andExpect(status().isBadRequest());

        // Validate the Transportistas in the database
        List<Transportistas> transportistasList = transportistasRepository.findAll();
        assertThat(transportistasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransportistas() throws Exception {
        // Initialize the database
        transportistasService.save(transportistas);

        int databaseSizeBeforeDelete = transportistasRepository.findAll().size();

        // Get the transportistas
        restTransportistasMockMvc.perform(delete("/api/transportistas/{id}", transportistas.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Transportistas> transportistasList = transportistasRepository.findAll();
        assertThat(transportistasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Transportistas.class);
        Transportistas transportistas1 = new Transportistas();
        transportistas1.setId(1L);
        Transportistas transportistas2 = new Transportistas();
        transportistas2.setId(transportistas1.getId());
        assertThat(transportistas1).isEqualTo(transportistas2);
        transportistas2.setId(2L);
        assertThat(transportistas1).isNotEqualTo(transportistas2);
        transportistas1.setId(null);
        assertThat(transportistas1).isNotEqualTo(transportistas2);
    }
}
