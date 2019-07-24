package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.DimensionesProductoTipo;
import com.torga.pedidos.domain.ProductosDormitorio;
import com.torga.pedidos.repository.DimensionesProductoTipoRepository;
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
 * Test class for the DimensionesProductoTipoResource REST controller.
 *
 * @see DimensionesProductoTipoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class DimensionesProductoTipoResourceIntTest {

    private static final Float DEFAULT_ANCHO = 1F;
    private static final Float UPDATED_ANCHO = 2F;

    private static final Float DEFAULT_ALTO = 1F;
    private static final Float UPDATED_ALTO = 2F;

    private static final Float DEFAULT_FONDO = 1F;
    private static final Float UPDATED_FONDO = 2F;

    private static final String DEFAULT_MENSAJE = "AAAAAAAAAA";
    private static final String UPDATED_MENSAJE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGEN = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEN = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGEN_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEN_CONTENT_TYPE = "image/png";

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    private static final String DEFAULT_ANCHO_MESITA_IDEAL = "AAAAAAAAAA";
    private static final String UPDATED_ANCHO_MESITA_IDEAL = "BBBBBBBBBB";

    @Autowired
    private DimensionesProductoTipoRepository dimensionesProductoTipoRepository;

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

    private MockMvc restDimensionesProductoTipoMockMvc;

    private DimensionesProductoTipo dimensionesProductoTipo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DimensionesProductoTipoResource dimensionesProductoTipoResource = new DimensionesProductoTipoResource(dimensionesProductoTipoRepository);
        this.restDimensionesProductoTipoMockMvc = MockMvcBuilders.standaloneSetup(dimensionesProductoTipoResource)
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
    public static DimensionesProductoTipo createEntity(EntityManager em) {
        DimensionesProductoTipo dimensionesProductoTipo = new DimensionesProductoTipo()
            .ancho(DEFAULT_ANCHO)
            .alto(DEFAULT_ALTO)
            .fondo(DEFAULT_FONDO)
            .mensaje(DEFAULT_MENSAJE)
            .imagen(DEFAULT_IMAGEN)
            .imagenContentType(DEFAULT_IMAGEN_CONTENT_TYPE)
            .precio(DEFAULT_PRECIO)
            .anchoMesitaIdeal(DEFAULT_ANCHO_MESITA_IDEAL);
        // Add required entity
        ProductosDormitorio productosDormitorio = ProductosDormitorioResourceIntTest.createEntity(em);
        em.persist(productosDormitorio);
        em.flush();
        dimensionesProductoTipo.setProductosDormitorio(productosDormitorio);
        return dimensionesProductoTipo;
    }

    @Before
    public void initTest() {
        dimensionesProductoTipo = createEntity(em);
    }

    @Test
    @Transactional
    public void createDimensionesProductoTipo() throws Exception {
        int databaseSizeBeforeCreate = dimensionesProductoTipoRepository.findAll().size();

        // Create the DimensionesProductoTipo
        restDimensionesProductoTipoMockMvc.perform(post("/api/dimensiones-producto-tipos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dimensionesProductoTipo)))
            .andExpect(status().isCreated());

        // Validate the DimensionesProductoTipo in the database
        List<DimensionesProductoTipo> dimensionesProductoTipoList = dimensionesProductoTipoRepository.findAll();
        assertThat(dimensionesProductoTipoList).hasSize(databaseSizeBeforeCreate + 1);
        DimensionesProductoTipo testDimensionesProductoTipo = dimensionesProductoTipoList.get(dimensionesProductoTipoList.size() - 1);
        assertThat(testDimensionesProductoTipo.getAncho()).isEqualTo(DEFAULT_ANCHO);
        assertThat(testDimensionesProductoTipo.getAlto()).isEqualTo(DEFAULT_ALTO);
        assertThat(testDimensionesProductoTipo.getFondo()).isEqualTo(DEFAULT_FONDO);
        assertThat(testDimensionesProductoTipo.getMensaje()).isEqualTo(DEFAULT_MENSAJE);
        assertThat(testDimensionesProductoTipo.getImagen()).isEqualTo(DEFAULT_IMAGEN);
        assertThat(testDimensionesProductoTipo.getImagenContentType()).isEqualTo(DEFAULT_IMAGEN_CONTENT_TYPE);
        assertThat(testDimensionesProductoTipo.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testDimensionesProductoTipo.getAnchoMesitaIdeal()).isEqualTo(DEFAULT_ANCHO_MESITA_IDEAL);
    }

    @Test
    @Transactional
    public void createDimensionesProductoTipoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dimensionesProductoTipoRepository.findAll().size();

        // Create the DimensionesProductoTipo with an existing ID
        dimensionesProductoTipo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDimensionesProductoTipoMockMvc.perform(post("/api/dimensiones-producto-tipos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dimensionesProductoTipo)))
            .andExpect(status().isBadRequest());

        // Validate the DimensionesProductoTipo in the database
        List<DimensionesProductoTipo> dimensionesProductoTipoList = dimensionesProductoTipoRepository.findAll();
        assertThat(dimensionesProductoTipoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAnchoIsRequired() throws Exception {
        int databaseSizeBeforeTest = dimensionesProductoTipoRepository.findAll().size();
        // set the field null
        dimensionesProductoTipo.setAncho(null);

        // Create the DimensionesProductoTipo, which fails.

        restDimensionesProductoTipoMockMvc.perform(post("/api/dimensiones-producto-tipos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dimensionesProductoTipo)))
            .andExpect(status().isBadRequest());

        List<DimensionesProductoTipo> dimensionesProductoTipoList = dimensionesProductoTipoRepository.findAll();
        assertThat(dimensionesProductoTipoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAltoIsRequired() throws Exception {
        int databaseSizeBeforeTest = dimensionesProductoTipoRepository.findAll().size();
        // set the field null
        dimensionesProductoTipo.setAlto(null);

        // Create the DimensionesProductoTipo, which fails.

        restDimensionesProductoTipoMockMvc.perform(post("/api/dimensiones-producto-tipos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dimensionesProductoTipo)))
            .andExpect(status().isBadRequest());

        List<DimensionesProductoTipo> dimensionesProductoTipoList = dimensionesProductoTipoRepository.findAll();
        assertThat(dimensionesProductoTipoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFondoIsRequired() throws Exception {
        int databaseSizeBeforeTest = dimensionesProductoTipoRepository.findAll().size();
        // set the field null
        dimensionesProductoTipo.setFondo(null);

        // Create the DimensionesProductoTipo, which fails.

        restDimensionesProductoTipoMockMvc.perform(post("/api/dimensiones-producto-tipos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dimensionesProductoTipo)))
            .andExpect(status().isBadRequest());

        List<DimensionesProductoTipo> dimensionesProductoTipoList = dimensionesProductoTipoRepository.findAll();
        assertThat(dimensionesProductoTipoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMensajeIsRequired() throws Exception {
        int databaseSizeBeforeTest = dimensionesProductoTipoRepository.findAll().size();
        // set the field null
        dimensionesProductoTipo.setMensaje(null);

        // Create the DimensionesProductoTipo, which fails.

        restDimensionesProductoTipoMockMvc.perform(post("/api/dimensiones-producto-tipos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dimensionesProductoTipo)))
            .andExpect(status().isBadRequest());

        List<DimensionesProductoTipo> dimensionesProductoTipoList = dimensionesProductoTipoRepository.findAll();
        assertThat(dimensionesProductoTipoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrecioIsRequired() throws Exception {
        int databaseSizeBeforeTest = dimensionesProductoTipoRepository.findAll().size();
        // set the field null
        dimensionesProductoTipo.setPrecio(null);

        // Create the DimensionesProductoTipo, which fails.

        restDimensionesProductoTipoMockMvc.perform(post("/api/dimensiones-producto-tipos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dimensionesProductoTipo)))
            .andExpect(status().isBadRequest());

        List<DimensionesProductoTipo> dimensionesProductoTipoList = dimensionesProductoTipoRepository.findAll();
        assertThat(dimensionesProductoTipoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAnchoMesitaIdealIsRequired() throws Exception {
        int databaseSizeBeforeTest = dimensionesProductoTipoRepository.findAll().size();
        // set the field null
        dimensionesProductoTipo.setAnchoMesitaIdeal(null);

        // Create the DimensionesProductoTipo, which fails.

        restDimensionesProductoTipoMockMvc.perform(post("/api/dimensiones-producto-tipos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dimensionesProductoTipo)))
            .andExpect(status().isBadRequest());

        List<DimensionesProductoTipo> dimensionesProductoTipoList = dimensionesProductoTipoRepository.findAll();
        assertThat(dimensionesProductoTipoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDimensionesProductoTipos() throws Exception {
        // Initialize the database
        dimensionesProductoTipoRepository.saveAndFlush(dimensionesProductoTipo);

        // Get all the dimensionesProductoTipoList
        restDimensionesProductoTipoMockMvc.perform(get("/api/dimensiones-producto-tipos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dimensionesProductoTipo.getId().intValue())))
            .andExpect(jsonPath("$.[*].ancho").value(hasItem(DEFAULT_ANCHO.doubleValue())))
            .andExpect(jsonPath("$.[*].alto").value(hasItem(DEFAULT_ALTO.doubleValue())))
            .andExpect(jsonPath("$.[*].fondo").value(hasItem(DEFAULT_FONDO.doubleValue())))
            .andExpect(jsonPath("$.[*].mensaje").value(hasItem(DEFAULT_MENSAJE.toString())))
            .andExpect(jsonPath("$.[*].imagenContentType").value(hasItem(DEFAULT_IMAGEN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN))))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())))
            .andExpect(jsonPath("$.[*].anchoMesitaIdeal").value(hasItem(DEFAULT_ANCHO_MESITA_IDEAL.toString())));
    }
    
    @Test
    @Transactional
    public void getDimensionesProductoTipo() throws Exception {
        // Initialize the database
        dimensionesProductoTipoRepository.saveAndFlush(dimensionesProductoTipo);

        // Get the dimensionesProductoTipo
        restDimensionesProductoTipoMockMvc.perform(get("/api/dimensiones-producto-tipos/{id}", dimensionesProductoTipo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dimensionesProductoTipo.getId().intValue()))
            .andExpect(jsonPath("$.ancho").value(DEFAULT_ANCHO.doubleValue()))
            .andExpect(jsonPath("$.alto").value(DEFAULT_ALTO.doubleValue()))
            .andExpect(jsonPath("$.fondo").value(DEFAULT_FONDO.doubleValue()))
            .andExpect(jsonPath("$.mensaje").value(DEFAULT_MENSAJE.toString()))
            .andExpect(jsonPath("$.imagenContentType").value(DEFAULT_IMAGEN_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagen").value(Base64Utils.encodeToString(DEFAULT_IMAGEN)))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()))
            .andExpect(jsonPath("$.anchoMesitaIdeal").value(DEFAULT_ANCHO_MESITA_IDEAL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDimensionesProductoTipo() throws Exception {
        // Get the dimensionesProductoTipo
        restDimensionesProductoTipoMockMvc.perform(get("/api/dimensiones-producto-tipos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDimensionesProductoTipo() throws Exception {
        // Initialize the database
        dimensionesProductoTipoRepository.saveAndFlush(dimensionesProductoTipo);

        int databaseSizeBeforeUpdate = dimensionesProductoTipoRepository.findAll().size();

        // Update the dimensionesProductoTipo
        DimensionesProductoTipo updatedDimensionesProductoTipo = dimensionesProductoTipoRepository.findById(dimensionesProductoTipo.getId()).get();
        // Disconnect from session so that the updates on updatedDimensionesProductoTipo are not directly saved in db
        em.detach(updatedDimensionesProductoTipo);
        updatedDimensionesProductoTipo
            .ancho(UPDATED_ANCHO)
            .alto(UPDATED_ALTO)
            .fondo(UPDATED_FONDO)
            .mensaje(UPDATED_MENSAJE)
            .imagen(UPDATED_IMAGEN)
            .imagenContentType(UPDATED_IMAGEN_CONTENT_TYPE)
            .precio(UPDATED_PRECIO)
            .anchoMesitaIdeal(UPDATED_ANCHO_MESITA_IDEAL);

        restDimensionesProductoTipoMockMvc.perform(put("/api/dimensiones-producto-tipos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDimensionesProductoTipo)))
            .andExpect(status().isOk());

        // Validate the DimensionesProductoTipo in the database
        List<DimensionesProductoTipo> dimensionesProductoTipoList = dimensionesProductoTipoRepository.findAll();
        assertThat(dimensionesProductoTipoList).hasSize(databaseSizeBeforeUpdate);
        DimensionesProductoTipo testDimensionesProductoTipo = dimensionesProductoTipoList.get(dimensionesProductoTipoList.size() - 1);
        assertThat(testDimensionesProductoTipo.getAncho()).isEqualTo(UPDATED_ANCHO);
        assertThat(testDimensionesProductoTipo.getAlto()).isEqualTo(UPDATED_ALTO);
        assertThat(testDimensionesProductoTipo.getFondo()).isEqualTo(UPDATED_FONDO);
        assertThat(testDimensionesProductoTipo.getMensaje()).isEqualTo(UPDATED_MENSAJE);
        assertThat(testDimensionesProductoTipo.getImagen()).isEqualTo(UPDATED_IMAGEN);
        assertThat(testDimensionesProductoTipo.getImagenContentType()).isEqualTo(UPDATED_IMAGEN_CONTENT_TYPE);
        assertThat(testDimensionesProductoTipo.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testDimensionesProductoTipo.getAnchoMesitaIdeal()).isEqualTo(UPDATED_ANCHO_MESITA_IDEAL);
    }

    @Test
    @Transactional
    public void updateNonExistingDimensionesProductoTipo() throws Exception {
        int databaseSizeBeforeUpdate = dimensionesProductoTipoRepository.findAll().size();

        // Create the DimensionesProductoTipo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDimensionesProductoTipoMockMvc.perform(put("/api/dimensiones-producto-tipos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dimensionesProductoTipo)))
            .andExpect(status().isBadRequest());

        // Validate the DimensionesProductoTipo in the database
        List<DimensionesProductoTipo> dimensionesProductoTipoList = dimensionesProductoTipoRepository.findAll();
        assertThat(dimensionesProductoTipoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDimensionesProductoTipo() throws Exception {
        // Initialize the database
        dimensionesProductoTipoRepository.saveAndFlush(dimensionesProductoTipo);

        int databaseSizeBeforeDelete = dimensionesProductoTipoRepository.findAll().size();

        // Get the dimensionesProductoTipo
        restDimensionesProductoTipoMockMvc.perform(delete("/api/dimensiones-producto-tipos/{id}", dimensionesProductoTipo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DimensionesProductoTipo> dimensionesProductoTipoList = dimensionesProductoTipoRepository.findAll();
        assertThat(dimensionesProductoTipoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DimensionesProductoTipo.class);
        DimensionesProductoTipo dimensionesProductoTipo1 = new DimensionesProductoTipo();
        dimensionesProductoTipo1.setId(1L);
        DimensionesProductoTipo dimensionesProductoTipo2 = new DimensionesProductoTipo();
        dimensionesProductoTipo2.setId(dimensionesProductoTipo1.getId());
        assertThat(dimensionesProductoTipo1).isEqualTo(dimensionesProductoTipo2);
        dimensionesProductoTipo2.setId(2L);
        assertThat(dimensionesProductoTipo1).isNotEqualTo(dimensionesProductoTipo2);
        dimensionesProductoTipo1.setId(null);
        assertThat(dimensionesProductoTipo1).isNotEqualTo(dimensionesProductoTipo2);
    }
}
