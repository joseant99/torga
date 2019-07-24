package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.TiposApoyo;
import com.torga.pedidos.domain.ProductosDormitorio;
import com.torga.pedidos.repository.TiposApoyoRepository;
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
 * Test class for the TiposApoyoResource REST controller.
 *
 * @see TiposApoyoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class TiposApoyoResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGEN = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEN = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGEN_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEN_CONTENT_TYPE = "image/png";

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    private static final Float DEFAULT_ALTURA = 1F;
    private static final Float UPDATED_ALTURA = 2F;

    private static final Float DEFAULT_ANCHO = 1F;
    private static final Float UPDATED_ANCHO = 2F;

    private static final Float DEFAULT_FONDO = 1F;
    private static final Float UPDATED_FONDO = 2F;

    @Autowired
    private TiposApoyoRepository tiposApoyoRepository;

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

    private MockMvc restTiposApoyoMockMvc;

    private TiposApoyo tiposApoyo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TiposApoyoResource tiposApoyoResource = new TiposApoyoResource(tiposApoyoRepository);
        this.restTiposApoyoMockMvc = MockMvcBuilders.standaloneSetup(tiposApoyoResource)
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
    public static TiposApoyo createEntity(EntityManager em) {
        TiposApoyo tiposApoyo = new TiposApoyo()
            .nombre(DEFAULT_NOMBRE)
            .imagen(DEFAULT_IMAGEN)
            .imagenContentType(DEFAULT_IMAGEN_CONTENT_TYPE)
            .precio(DEFAULT_PRECIO)
            .altura(DEFAULT_ALTURA)
            .ancho(DEFAULT_ANCHO)
            .fondo(DEFAULT_FONDO);
        // Add required entity
        ProductosDormitorio productosDormitorio = ProductosDormitorioResourceIntTest.createEntity(em);
        em.persist(productosDormitorio);
        em.flush();
        tiposApoyo.setProductoApoyo(productosDormitorio);
        return tiposApoyo;
    }

    @Before
    public void initTest() {
        tiposApoyo = createEntity(em);
    }

    @Test
    @Transactional
    public void createTiposApoyo() throws Exception {
        int databaseSizeBeforeCreate = tiposApoyoRepository.findAll().size();

        // Create the TiposApoyo
        restTiposApoyoMockMvc.perform(post("/api/tipos-apoyos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tiposApoyo)))
            .andExpect(status().isCreated());

        // Validate the TiposApoyo in the database
        List<TiposApoyo> tiposApoyoList = tiposApoyoRepository.findAll();
        assertThat(tiposApoyoList).hasSize(databaseSizeBeforeCreate + 1);
        TiposApoyo testTiposApoyo = tiposApoyoList.get(tiposApoyoList.size() - 1);
        assertThat(testTiposApoyo.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testTiposApoyo.getImagen()).isEqualTo(DEFAULT_IMAGEN);
        assertThat(testTiposApoyo.getImagenContentType()).isEqualTo(DEFAULT_IMAGEN_CONTENT_TYPE);
        assertThat(testTiposApoyo.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testTiposApoyo.getAltura()).isEqualTo(DEFAULT_ALTURA);
        assertThat(testTiposApoyo.getAncho()).isEqualTo(DEFAULT_ANCHO);
        assertThat(testTiposApoyo.getFondo()).isEqualTo(DEFAULT_FONDO);
    }

    @Test
    @Transactional
    public void createTiposApoyoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tiposApoyoRepository.findAll().size();

        // Create the TiposApoyo with an existing ID
        tiposApoyo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTiposApoyoMockMvc.perform(post("/api/tipos-apoyos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tiposApoyo)))
            .andExpect(status().isBadRequest());

        // Validate the TiposApoyo in the database
        List<TiposApoyo> tiposApoyoList = tiposApoyoRepository.findAll();
        assertThat(tiposApoyoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = tiposApoyoRepository.findAll().size();
        // set the field null
        tiposApoyo.setNombre(null);

        // Create the TiposApoyo, which fails.

        restTiposApoyoMockMvc.perform(post("/api/tipos-apoyos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tiposApoyo)))
            .andExpect(status().isBadRequest());

        List<TiposApoyo> tiposApoyoList = tiposApoyoRepository.findAll();
        assertThat(tiposApoyoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrecioIsRequired() throws Exception {
        int databaseSizeBeforeTest = tiposApoyoRepository.findAll().size();
        // set the field null
        tiposApoyo.setPrecio(null);

        // Create the TiposApoyo, which fails.

        restTiposApoyoMockMvc.perform(post("/api/tipos-apoyos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tiposApoyo)))
            .andExpect(status().isBadRequest());

        List<TiposApoyo> tiposApoyoList = tiposApoyoRepository.findAll();
        assertThat(tiposApoyoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTiposApoyos() throws Exception {
        // Initialize the database
        tiposApoyoRepository.saveAndFlush(tiposApoyo);

        // Get all the tiposApoyoList
        restTiposApoyoMockMvc.perform(get("/api/tipos-apoyos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tiposApoyo.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].imagenContentType").value(hasItem(DEFAULT_IMAGEN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN))))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())))
            .andExpect(jsonPath("$.[*].altura").value(hasItem(DEFAULT_ALTURA.doubleValue())))
            .andExpect(jsonPath("$.[*].ancho").value(hasItem(DEFAULT_ANCHO.doubleValue())))
            .andExpect(jsonPath("$.[*].fondo").value(hasItem(DEFAULT_FONDO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getTiposApoyo() throws Exception {
        // Initialize the database
        tiposApoyoRepository.saveAndFlush(tiposApoyo);

        // Get the tiposApoyo
        restTiposApoyoMockMvc.perform(get("/api/tipos-apoyos/{id}", tiposApoyo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tiposApoyo.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.imagenContentType").value(DEFAULT_IMAGEN_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagen").value(Base64Utils.encodeToString(DEFAULT_IMAGEN)))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()))
            .andExpect(jsonPath("$.altura").value(DEFAULT_ALTURA.doubleValue()))
            .andExpect(jsonPath("$.ancho").value(DEFAULT_ANCHO.doubleValue()))
            .andExpect(jsonPath("$.fondo").value(DEFAULT_FONDO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTiposApoyo() throws Exception {
        // Get the tiposApoyo
        restTiposApoyoMockMvc.perform(get("/api/tipos-apoyos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTiposApoyo() throws Exception {
        // Initialize the database
        tiposApoyoRepository.saveAndFlush(tiposApoyo);

        int databaseSizeBeforeUpdate = tiposApoyoRepository.findAll().size();

        // Update the tiposApoyo
        TiposApoyo updatedTiposApoyo = tiposApoyoRepository.findById(tiposApoyo.getId()).get();
        // Disconnect from session so that the updates on updatedTiposApoyo are not directly saved in db
        em.detach(updatedTiposApoyo);
        updatedTiposApoyo
            .nombre(UPDATED_NOMBRE)
            .imagen(UPDATED_IMAGEN)
            .imagenContentType(UPDATED_IMAGEN_CONTENT_TYPE)
            .precio(UPDATED_PRECIO)
            .altura(UPDATED_ALTURA)
            .ancho(UPDATED_ANCHO)
            .fondo(UPDATED_FONDO);

        restTiposApoyoMockMvc.perform(put("/api/tipos-apoyos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTiposApoyo)))
            .andExpect(status().isOk());

        // Validate the TiposApoyo in the database
        List<TiposApoyo> tiposApoyoList = tiposApoyoRepository.findAll();
        assertThat(tiposApoyoList).hasSize(databaseSizeBeforeUpdate);
        TiposApoyo testTiposApoyo = tiposApoyoList.get(tiposApoyoList.size() - 1);
        assertThat(testTiposApoyo.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testTiposApoyo.getImagen()).isEqualTo(UPDATED_IMAGEN);
        assertThat(testTiposApoyo.getImagenContentType()).isEqualTo(UPDATED_IMAGEN_CONTENT_TYPE);
        assertThat(testTiposApoyo.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testTiposApoyo.getAltura()).isEqualTo(UPDATED_ALTURA);
        assertThat(testTiposApoyo.getAncho()).isEqualTo(UPDATED_ANCHO);
        assertThat(testTiposApoyo.getFondo()).isEqualTo(UPDATED_FONDO);
    }

    @Test
    @Transactional
    public void updateNonExistingTiposApoyo() throws Exception {
        int databaseSizeBeforeUpdate = tiposApoyoRepository.findAll().size();

        // Create the TiposApoyo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTiposApoyoMockMvc.perform(put("/api/tipos-apoyos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tiposApoyo)))
            .andExpect(status().isBadRequest());

        // Validate the TiposApoyo in the database
        List<TiposApoyo> tiposApoyoList = tiposApoyoRepository.findAll();
        assertThat(tiposApoyoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTiposApoyo() throws Exception {
        // Initialize the database
        tiposApoyoRepository.saveAndFlush(tiposApoyo);

        int databaseSizeBeforeDelete = tiposApoyoRepository.findAll().size();

        // Get the tiposApoyo
        restTiposApoyoMockMvc.perform(delete("/api/tipos-apoyos/{id}", tiposApoyo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TiposApoyo> tiposApoyoList = tiposApoyoRepository.findAll();
        assertThat(tiposApoyoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TiposApoyo.class);
        TiposApoyo tiposApoyo1 = new TiposApoyo();
        tiposApoyo1.setId(1L);
        TiposApoyo tiposApoyo2 = new TiposApoyo();
        tiposApoyo2.setId(tiposApoyo1.getId());
        assertThat(tiposApoyo1).isEqualTo(tiposApoyo2);
        tiposApoyo2.setId(2L);
        assertThat(tiposApoyo1).isNotEqualTo(tiposApoyo2);
        tiposApoyo1.setId(null);
        assertThat(tiposApoyo1).isNotEqualTo(tiposApoyo2);
    }
}
