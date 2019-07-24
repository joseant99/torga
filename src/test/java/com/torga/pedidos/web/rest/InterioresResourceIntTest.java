package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Interiores;
import com.torga.pedidos.domain.ProductosDormitorio;
import com.torga.pedidos.domain.DimensionesProductoTipo;
import com.torga.pedidos.repository.InterioresRepository;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.torga.pedidos.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the InterioresResource REST controller.
 *
 * @see InterioresResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class InterioresResourceIntTest {

    private static final byte[] DEFAULT_IMAGEN = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEN = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGEN_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEN_CONTENT_TYPE = "image/png";

    @Autowired
    private InterioresRepository interioresRepository;

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

    private MockMvc restInterioresMockMvc;

    private Interiores interiores;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InterioresResource interioresResource = new InterioresResource(interioresRepository);
        this.restInterioresMockMvc = MockMvcBuilders.standaloneSetup(interioresResource)
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
    public static Interiores createEntity(EntityManager em) {
        Interiores interiores = new Interiores()
            .imagen(DEFAULT_IMAGEN)
            .imagenContentType(DEFAULT_IMAGEN_CONTENT_TYPE);
        // Add required entity
        ProductosDormitorio productosDormitorio = ProductosDormitorioResourceIntTest.createEntity(em);
        em.persist(productosDormitorio);
        em.flush();
        interiores.setProductosDormitorio(productosDormitorio);
        // Add required entity
        DimensionesProductoTipo dimensionesProductoTipo = DimensionesProductoTipoResourceIntTest.createEntity(em);
        em.persist(dimensionesProductoTipo);
        em.flush();
        interiores.setDimensionesProductoTipo(dimensionesProductoTipo);
        return interiores;
    }

    @Before
    public void initTest() {
        interiores = createEntity(em);
    }

    @Test
    @Transactional
    public void createInteriores() throws Exception {
        int databaseSizeBeforeCreate = interioresRepository.findAll().size();

        // Create the Interiores
        restInterioresMockMvc.perform(post("/api/interiores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interiores)))
            .andExpect(status().isCreated());

        // Validate the Interiores in the database
        List<Interiores> interioresList = interioresRepository.findAll();
        assertThat(interioresList).hasSize(databaseSizeBeforeCreate + 1);
        Interiores testInteriores = interioresList.get(interioresList.size() - 1);
        assertThat(testInteriores.getImagen()).isEqualTo(DEFAULT_IMAGEN);
        assertThat(testInteriores.getImagenContentType()).isEqualTo(DEFAULT_IMAGEN_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createInterioresWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = interioresRepository.findAll().size();

        // Create the Interiores with an existing ID
        interiores.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInterioresMockMvc.perform(post("/api/interiores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interiores)))
            .andExpect(status().isBadRequest());

        // Validate the Interiores in the database
        List<Interiores> interioresList = interioresRepository.findAll();
        assertThat(interioresList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInteriores() throws Exception {
        // Initialize the database
        interioresRepository.saveAndFlush(interiores);

        // Get all the interioresList
        restInterioresMockMvc.perform(get("/api/interiores?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(interiores.getId().intValue())))
            .andExpect(jsonPath("$.[*].imagenContentType").value(hasItem(DEFAULT_IMAGEN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN))));
    }
    
    @Test
    @Transactional
    public void getInteriores() throws Exception {
        // Initialize the database
        interioresRepository.saveAndFlush(interiores);

        // Get the interiores
        restInterioresMockMvc.perform(get("/api/interiores/{id}", interiores.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(interiores.getId().intValue()))
            .andExpect(jsonPath("$.imagenContentType").value(DEFAULT_IMAGEN_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagen").value(Base64Utils.encodeToString(DEFAULT_IMAGEN)));
    }

    @Test
    @Transactional
    public void getNonExistingInteriores() throws Exception {
        // Get the interiores
        restInterioresMockMvc.perform(get("/api/interiores/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInteriores() throws Exception {
        // Initialize the database
        interioresRepository.saveAndFlush(interiores);

        int databaseSizeBeforeUpdate = interioresRepository.findAll().size();

        // Update the interiores
        Interiores updatedInteriores = interioresRepository.findById(interiores.getId()).get();
        // Disconnect from session so that the updates on updatedInteriores are not directly saved in db
        em.detach(updatedInteriores);
        updatedInteriores
            .imagen(UPDATED_IMAGEN)
            .imagenContentType(UPDATED_IMAGEN_CONTENT_TYPE);

        restInterioresMockMvc.perform(put("/api/interiores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInteriores)))
            .andExpect(status().isOk());

        // Validate the Interiores in the database
        List<Interiores> interioresList = interioresRepository.findAll();
        assertThat(interioresList).hasSize(databaseSizeBeforeUpdate);
        Interiores testInteriores = interioresList.get(interioresList.size() - 1);
        assertThat(testInteriores.getImagen()).isEqualTo(UPDATED_IMAGEN);
        assertThat(testInteriores.getImagenContentType()).isEqualTo(UPDATED_IMAGEN_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingInteriores() throws Exception {
        int databaseSizeBeforeUpdate = interioresRepository.findAll().size();

        // Create the Interiores

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInterioresMockMvc.perform(put("/api/interiores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interiores)))
            .andExpect(status().isBadRequest());

        // Validate the Interiores in the database
        List<Interiores> interioresList = interioresRepository.findAll();
        assertThat(interioresList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInteriores() throws Exception {
        // Initialize the database
        interioresRepository.saveAndFlush(interiores);

        int databaseSizeBeforeDelete = interioresRepository.findAll().size();

        // Get the interiores
        restInterioresMockMvc.perform(delete("/api/interiores/{id}", interiores.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Interiores> interioresList = interioresRepository.findAll();
        assertThat(interioresList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Interiores.class);
        Interiores interiores1 = new Interiores();
        interiores1.setId(1L);
        Interiores interiores2 = new Interiores();
        interiores2.setId(interiores1.getId());
        assertThat(interiores1).isEqualTo(interiores2);
        interiores2.setId(2L);
        assertThat(interiores1).isNotEqualTo(interiores2);
        interiores1.setId(null);
        assertThat(interiores1).isNotEqualTo(interiores2);
    }
}
