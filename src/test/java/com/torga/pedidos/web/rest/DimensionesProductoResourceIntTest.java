package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.DimensionesProducto;
import com.torga.pedidos.domain.ProductosDormitorio;
import com.torga.pedidos.repository.DimensionesProductoRepository;
import com.torga.pedidos.service.DimensionesProductoService;
import com.torga.pedidos.service.dto.DimensionesProductoDTO;
import com.torga.pedidos.service.mapper.DimensionesProductoMapper;
import com.torga.pedidos.web.rest.errors.ExceptionTranslator;
import com.torga.pedidos.service.dto.DimensionesProductoCriteria;
import com.torga.pedidos.service.DimensionesProductoQueryService;

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
 * Test class for the DimensionesProductoResource REST controller.
 *
 * @see DimensionesProductoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class DimensionesProductoResourceIntTest {

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

    private static final Float DEFAULT_ANCHO_IDEAL = 1F;
    private static final Float UPDATED_ANCHO_IDEAL = 2F;

    @Autowired
    private DimensionesProductoRepository dimensionesProductoRepository;

    @Autowired
    private DimensionesProductoMapper dimensionesProductoMapper;

    @Autowired
    private DimensionesProductoService dimensionesProductoService;

    @Autowired
    private DimensionesProductoQueryService dimensionesProductoQueryService;

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

    private MockMvc restDimensionesProductoMockMvc;

    private DimensionesProducto dimensionesProducto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DimensionesProductoResource dimensionesProductoResource = new DimensionesProductoResource(dimensionesProductoService, dimensionesProductoQueryService);
        this.restDimensionesProductoMockMvc = MockMvcBuilders.standaloneSetup(dimensionesProductoResource)
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
    public static DimensionesProducto createEntity(EntityManager em) {
        DimensionesProducto dimensionesProducto = new DimensionesProducto()
            .ancho(DEFAULT_ANCHO)
            .alto(DEFAULT_ALTO)
            .fondo(DEFAULT_FONDO)
            .mensaje(DEFAULT_MENSAJE)
            .imagen(DEFAULT_IMAGEN)
            .imagenContentType(DEFAULT_IMAGEN_CONTENT_TYPE)
            .precio(DEFAULT_PRECIO)
            .anchoIdeal(DEFAULT_ANCHO_IDEAL);
        // Add required entity
        ProductosDormitorio productosDormitorio = ProductosDormitorioResourceIntTest.createEntity(em);
        em.persist(productosDormitorio);
        em.flush();
        dimensionesProducto.setProductosDormitorio(productosDormitorio);
        return dimensionesProducto;
    }

    @Before
    public void initTest() {
        dimensionesProducto = createEntity(em);
    }

    @Test
    @Transactional
    public void createDimensionesProducto() throws Exception {
        int databaseSizeBeforeCreate = dimensionesProductoRepository.findAll().size();

        // Create the DimensionesProducto
        DimensionesProductoDTO dimensionesProductoDTO = dimensionesProductoMapper.toDto(dimensionesProducto);
        restDimensionesProductoMockMvc.perform(post("/api/dimensiones-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dimensionesProductoDTO)))
            .andExpect(status().isCreated());

        // Validate the DimensionesProducto in the database
        List<DimensionesProducto> dimensionesProductoList = dimensionesProductoRepository.findAll();
        assertThat(dimensionesProductoList).hasSize(databaseSizeBeforeCreate + 1);
        DimensionesProducto testDimensionesProducto = dimensionesProductoList.get(dimensionesProductoList.size() - 1);
        assertThat(testDimensionesProducto.getAncho()).isEqualTo(DEFAULT_ANCHO);
        assertThat(testDimensionesProducto.getAlto()).isEqualTo(DEFAULT_ALTO);
        assertThat(testDimensionesProducto.getFondo()).isEqualTo(DEFAULT_FONDO);
        assertThat(testDimensionesProducto.getMensaje()).isEqualTo(DEFAULT_MENSAJE);
        assertThat(testDimensionesProducto.getImagen()).isEqualTo(DEFAULT_IMAGEN);
        assertThat(testDimensionesProducto.getImagenContentType()).isEqualTo(DEFAULT_IMAGEN_CONTENT_TYPE);
        assertThat(testDimensionesProducto.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testDimensionesProducto.getAnchoIdeal()).isEqualTo(DEFAULT_ANCHO_IDEAL);
    }

    @Test
    @Transactional
    public void createDimensionesProductoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dimensionesProductoRepository.findAll().size();

        // Create the DimensionesProducto with an existing ID
        dimensionesProducto.setId(1L);
        DimensionesProductoDTO dimensionesProductoDTO = dimensionesProductoMapper.toDto(dimensionesProducto);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDimensionesProductoMockMvc.perform(post("/api/dimensiones-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dimensionesProductoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DimensionesProducto in the database
        List<DimensionesProducto> dimensionesProductoList = dimensionesProductoRepository.findAll();
        assertThat(dimensionesProductoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAnchoIsRequired() throws Exception {
        int databaseSizeBeforeTest = dimensionesProductoRepository.findAll().size();
        // set the field null
        dimensionesProducto.setAncho(null);

        // Create the DimensionesProducto, which fails.
        DimensionesProductoDTO dimensionesProductoDTO = dimensionesProductoMapper.toDto(dimensionesProducto);

        restDimensionesProductoMockMvc.perform(post("/api/dimensiones-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dimensionesProductoDTO)))
            .andExpect(status().isBadRequest());

        List<DimensionesProducto> dimensionesProductoList = dimensionesProductoRepository.findAll();
        assertThat(dimensionesProductoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAltoIsRequired() throws Exception {
        int databaseSizeBeforeTest = dimensionesProductoRepository.findAll().size();
        // set the field null
        dimensionesProducto.setAlto(null);

        // Create the DimensionesProducto, which fails.
        DimensionesProductoDTO dimensionesProductoDTO = dimensionesProductoMapper.toDto(dimensionesProducto);

        restDimensionesProductoMockMvc.perform(post("/api/dimensiones-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dimensionesProductoDTO)))
            .andExpect(status().isBadRequest());

        List<DimensionesProducto> dimensionesProductoList = dimensionesProductoRepository.findAll();
        assertThat(dimensionesProductoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFondoIsRequired() throws Exception {
        int databaseSizeBeforeTest = dimensionesProductoRepository.findAll().size();
        // set the field null
        dimensionesProducto.setFondo(null);

        // Create the DimensionesProducto, which fails.
        DimensionesProductoDTO dimensionesProductoDTO = dimensionesProductoMapper.toDto(dimensionesProducto);

        restDimensionesProductoMockMvc.perform(post("/api/dimensiones-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dimensionesProductoDTO)))
            .andExpect(status().isBadRequest());

        List<DimensionesProducto> dimensionesProductoList = dimensionesProductoRepository.findAll();
        assertThat(dimensionesProductoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMensajeIsRequired() throws Exception {
        int databaseSizeBeforeTest = dimensionesProductoRepository.findAll().size();
        // set the field null
        dimensionesProducto.setMensaje(null);

        // Create the DimensionesProducto, which fails.
        DimensionesProductoDTO dimensionesProductoDTO = dimensionesProductoMapper.toDto(dimensionesProducto);

        restDimensionesProductoMockMvc.perform(post("/api/dimensiones-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dimensionesProductoDTO)))
            .andExpect(status().isBadRequest());

        List<DimensionesProducto> dimensionesProductoList = dimensionesProductoRepository.findAll();
        assertThat(dimensionesProductoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrecioIsRequired() throws Exception {
        int databaseSizeBeforeTest = dimensionesProductoRepository.findAll().size();
        // set the field null
        dimensionesProducto.setPrecio(null);

        // Create the DimensionesProducto, which fails.
        DimensionesProductoDTO dimensionesProductoDTO = dimensionesProductoMapper.toDto(dimensionesProducto);

        restDimensionesProductoMockMvc.perform(post("/api/dimensiones-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dimensionesProductoDTO)))
            .andExpect(status().isBadRequest());

        List<DimensionesProducto> dimensionesProductoList = dimensionesProductoRepository.findAll();
        assertThat(dimensionesProductoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDimensionesProductos() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList
        restDimensionesProductoMockMvc.perform(get("/api/dimensiones-productos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dimensionesProducto.getId().intValue())))
            .andExpect(jsonPath("$.[*].ancho").value(hasItem(DEFAULT_ANCHO.doubleValue())))
            .andExpect(jsonPath("$.[*].alto").value(hasItem(DEFAULT_ALTO.doubleValue())))
            .andExpect(jsonPath("$.[*].fondo").value(hasItem(DEFAULT_FONDO.doubleValue())))
            .andExpect(jsonPath("$.[*].mensaje").value(hasItem(DEFAULT_MENSAJE.toString())))
            .andExpect(jsonPath("$.[*].imagenContentType").value(hasItem(DEFAULT_IMAGEN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN))))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())))
            .andExpect(jsonPath("$.[*].anchoIdeal").value(hasItem(DEFAULT_ANCHO_IDEAL.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getDimensionesProducto() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get the dimensionesProducto
        restDimensionesProductoMockMvc.perform(get("/api/dimensiones-productos/{id}", dimensionesProducto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dimensionesProducto.getId().intValue()))
            .andExpect(jsonPath("$.ancho").value(DEFAULT_ANCHO.doubleValue()))
            .andExpect(jsonPath("$.alto").value(DEFAULT_ALTO.doubleValue()))
            .andExpect(jsonPath("$.fondo").value(DEFAULT_FONDO.doubleValue()))
            .andExpect(jsonPath("$.mensaje").value(DEFAULT_MENSAJE.toString()))
            .andExpect(jsonPath("$.imagenContentType").value(DEFAULT_IMAGEN_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagen").value(Base64Utils.encodeToString(DEFAULT_IMAGEN)))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()))
            .andExpect(jsonPath("$.anchoIdeal").value(DEFAULT_ANCHO_IDEAL.doubleValue()));
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByAnchoIsEqualToSomething() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList where ancho equals to DEFAULT_ANCHO
        defaultDimensionesProductoShouldBeFound("ancho.equals=" + DEFAULT_ANCHO);

        // Get all the dimensionesProductoList where ancho equals to UPDATED_ANCHO
        defaultDimensionesProductoShouldNotBeFound("ancho.equals=" + UPDATED_ANCHO);
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByAnchoIsInShouldWork() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList where ancho in DEFAULT_ANCHO or UPDATED_ANCHO
        defaultDimensionesProductoShouldBeFound("ancho.in=" + DEFAULT_ANCHO + "," + UPDATED_ANCHO);

        // Get all the dimensionesProductoList where ancho equals to UPDATED_ANCHO
        defaultDimensionesProductoShouldNotBeFound("ancho.in=" + UPDATED_ANCHO);
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByAnchoIsNullOrNotNull() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList where ancho is not null
        defaultDimensionesProductoShouldBeFound("ancho.specified=true");

        // Get all the dimensionesProductoList where ancho is null
        defaultDimensionesProductoShouldNotBeFound("ancho.specified=false");
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByAltoIsEqualToSomething() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList where alto equals to DEFAULT_ALTO
        defaultDimensionesProductoShouldBeFound("alto.equals=" + DEFAULT_ALTO);

        // Get all the dimensionesProductoList where alto equals to UPDATED_ALTO
        defaultDimensionesProductoShouldNotBeFound("alto.equals=" + UPDATED_ALTO);
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByAltoIsInShouldWork() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList where alto in DEFAULT_ALTO or UPDATED_ALTO
        defaultDimensionesProductoShouldBeFound("alto.in=" + DEFAULT_ALTO + "," + UPDATED_ALTO);

        // Get all the dimensionesProductoList where alto equals to UPDATED_ALTO
        defaultDimensionesProductoShouldNotBeFound("alto.in=" + UPDATED_ALTO);
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByAltoIsNullOrNotNull() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList where alto is not null
        defaultDimensionesProductoShouldBeFound("alto.specified=true");

        // Get all the dimensionesProductoList where alto is null
        defaultDimensionesProductoShouldNotBeFound("alto.specified=false");
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByFondoIsEqualToSomething() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList where fondo equals to DEFAULT_FONDO
        defaultDimensionesProductoShouldBeFound("fondo.equals=" + DEFAULT_FONDO);

        // Get all the dimensionesProductoList where fondo equals to UPDATED_FONDO
        defaultDimensionesProductoShouldNotBeFound("fondo.equals=" + UPDATED_FONDO);
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByFondoIsInShouldWork() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList where fondo in DEFAULT_FONDO or UPDATED_FONDO
        defaultDimensionesProductoShouldBeFound("fondo.in=" + DEFAULT_FONDO + "," + UPDATED_FONDO);

        // Get all the dimensionesProductoList where fondo equals to UPDATED_FONDO
        defaultDimensionesProductoShouldNotBeFound("fondo.in=" + UPDATED_FONDO);
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByFondoIsNullOrNotNull() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList where fondo is not null
        defaultDimensionesProductoShouldBeFound("fondo.specified=true");

        // Get all the dimensionesProductoList where fondo is null
        defaultDimensionesProductoShouldNotBeFound("fondo.specified=false");
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByMensajeIsEqualToSomething() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList where mensaje equals to DEFAULT_MENSAJE
        defaultDimensionesProductoShouldBeFound("mensaje.equals=" + DEFAULT_MENSAJE);

        // Get all the dimensionesProductoList where mensaje equals to UPDATED_MENSAJE
        defaultDimensionesProductoShouldNotBeFound("mensaje.equals=" + UPDATED_MENSAJE);
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByMensajeIsInShouldWork() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList where mensaje in DEFAULT_MENSAJE or UPDATED_MENSAJE
        defaultDimensionesProductoShouldBeFound("mensaje.in=" + DEFAULT_MENSAJE + "," + UPDATED_MENSAJE);

        // Get all the dimensionesProductoList where mensaje equals to UPDATED_MENSAJE
        defaultDimensionesProductoShouldNotBeFound("mensaje.in=" + UPDATED_MENSAJE);
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByMensajeIsNullOrNotNull() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList where mensaje is not null
        defaultDimensionesProductoShouldBeFound("mensaje.specified=true");

        // Get all the dimensionesProductoList where mensaje is null
        defaultDimensionesProductoShouldNotBeFound("mensaje.specified=false");
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByPrecioIsEqualToSomething() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList where precio equals to DEFAULT_PRECIO
        defaultDimensionesProductoShouldBeFound("precio.equals=" + DEFAULT_PRECIO);

        // Get all the dimensionesProductoList where precio equals to UPDATED_PRECIO
        defaultDimensionesProductoShouldNotBeFound("precio.equals=" + UPDATED_PRECIO);
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByPrecioIsInShouldWork() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList where precio in DEFAULT_PRECIO or UPDATED_PRECIO
        defaultDimensionesProductoShouldBeFound("precio.in=" + DEFAULT_PRECIO + "," + UPDATED_PRECIO);

        // Get all the dimensionesProductoList where precio equals to UPDATED_PRECIO
        defaultDimensionesProductoShouldNotBeFound("precio.in=" + UPDATED_PRECIO);
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByPrecioIsNullOrNotNull() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList where precio is not null
        defaultDimensionesProductoShouldBeFound("precio.specified=true");

        // Get all the dimensionesProductoList where precio is null
        defaultDimensionesProductoShouldNotBeFound("precio.specified=false");
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByAnchoIdealIsEqualToSomething() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList where anchoIdeal equals to DEFAULT_ANCHO_IDEAL
        defaultDimensionesProductoShouldBeFound("anchoIdeal.equals=" + DEFAULT_ANCHO_IDEAL);

        // Get all the dimensionesProductoList where anchoIdeal equals to UPDATED_ANCHO_IDEAL
        defaultDimensionesProductoShouldNotBeFound("anchoIdeal.equals=" + UPDATED_ANCHO_IDEAL);
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByAnchoIdealIsInShouldWork() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList where anchoIdeal in DEFAULT_ANCHO_IDEAL or UPDATED_ANCHO_IDEAL
        defaultDimensionesProductoShouldBeFound("anchoIdeal.in=" + DEFAULT_ANCHO_IDEAL + "," + UPDATED_ANCHO_IDEAL);

        // Get all the dimensionesProductoList where anchoIdeal equals to UPDATED_ANCHO_IDEAL
        defaultDimensionesProductoShouldNotBeFound("anchoIdeal.in=" + UPDATED_ANCHO_IDEAL);
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByAnchoIdealIsNullOrNotNull() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        // Get all the dimensionesProductoList where anchoIdeal is not null
        defaultDimensionesProductoShouldBeFound("anchoIdeal.specified=true");

        // Get all the dimensionesProductoList where anchoIdeal is null
        defaultDimensionesProductoShouldNotBeFound("anchoIdeal.specified=false");
    }

    @Test
    @Transactional
    public void getAllDimensionesProductosByProductosDormitorioIsEqualToSomething() throws Exception {
        // Initialize the database
        ProductosDormitorio productosDormitorio = ProductosDormitorioResourceIntTest.createEntity(em);
        em.persist(productosDormitorio);
        em.flush();
        dimensionesProducto.setProductosDormitorio(productosDormitorio);
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);
        Long productosDormitorioId = productosDormitorio.getId();

        // Get all the dimensionesProductoList where productosDormitorio equals to productosDormitorioId
        defaultDimensionesProductoShouldBeFound("productosDormitorioId.equals=" + productosDormitorioId);

        // Get all the dimensionesProductoList where productosDormitorio equals to productosDormitorioId + 1
        defaultDimensionesProductoShouldNotBeFound("productosDormitorioId.equals=" + (productosDormitorioId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultDimensionesProductoShouldBeFound(String filter) throws Exception {
        restDimensionesProductoMockMvc.perform(get("/api/dimensiones-productos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dimensionesProducto.getId().intValue())))
            .andExpect(jsonPath("$.[*].ancho").value(hasItem(DEFAULT_ANCHO.doubleValue())))
            .andExpect(jsonPath("$.[*].alto").value(hasItem(DEFAULT_ALTO.doubleValue())))
            .andExpect(jsonPath("$.[*].fondo").value(hasItem(DEFAULT_FONDO.doubleValue())))
            .andExpect(jsonPath("$.[*].mensaje").value(hasItem(DEFAULT_MENSAJE.toString())))
            .andExpect(jsonPath("$.[*].imagenContentType").value(hasItem(DEFAULT_IMAGEN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN))))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())))
            .andExpect(jsonPath("$.[*].anchoIdeal").value(hasItem(DEFAULT_ANCHO_IDEAL.doubleValue())));

        // Check, that the count call also returns 1
        restDimensionesProductoMockMvc.perform(get("/api/dimensiones-productos/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultDimensionesProductoShouldNotBeFound(String filter) throws Exception {
        restDimensionesProductoMockMvc.perform(get("/api/dimensiones-productos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restDimensionesProductoMockMvc.perform(get("/api/dimensiones-productos/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingDimensionesProducto() throws Exception {
        // Get the dimensionesProducto
        restDimensionesProductoMockMvc.perform(get("/api/dimensiones-productos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDimensionesProducto() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        int databaseSizeBeforeUpdate = dimensionesProductoRepository.findAll().size();

        // Update the dimensionesProducto
        DimensionesProducto updatedDimensionesProducto = dimensionesProductoRepository.findById(dimensionesProducto.getId()).get();
        // Disconnect from session so that the updates on updatedDimensionesProducto are not directly saved in db
        em.detach(updatedDimensionesProducto);
        updatedDimensionesProducto
            .ancho(UPDATED_ANCHO)
            .alto(UPDATED_ALTO)
            .fondo(UPDATED_FONDO)
            .mensaje(UPDATED_MENSAJE)
            .imagen(UPDATED_IMAGEN)
            .imagenContentType(UPDATED_IMAGEN_CONTENT_TYPE)
            .precio(UPDATED_PRECIO)
            .anchoIdeal(UPDATED_ANCHO_IDEAL);
        DimensionesProductoDTO dimensionesProductoDTO = dimensionesProductoMapper.toDto(updatedDimensionesProducto);

        restDimensionesProductoMockMvc.perform(put("/api/dimensiones-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dimensionesProductoDTO)))
            .andExpect(status().isOk());

        // Validate the DimensionesProducto in the database
        List<DimensionesProducto> dimensionesProductoList = dimensionesProductoRepository.findAll();
        assertThat(dimensionesProductoList).hasSize(databaseSizeBeforeUpdate);
        DimensionesProducto testDimensionesProducto = dimensionesProductoList.get(dimensionesProductoList.size() - 1);
        assertThat(testDimensionesProducto.getAncho()).isEqualTo(UPDATED_ANCHO);
        assertThat(testDimensionesProducto.getAlto()).isEqualTo(UPDATED_ALTO);
        assertThat(testDimensionesProducto.getFondo()).isEqualTo(UPDATED_FONDO);
        assertThat(testDimensionesProducto.getMensaje()).isEqualTo(UPDATED_MENSAJE);
        assertThat(testDimensionesProducto.getImagen()).isEqualTo(UPDATED_IMAGEN);
        assertThat(testDimensionesProducto.getImagenContentType()).isEqualTo(UPDATED_IMAGEN_CONTENT_TYPE);
        assertThat(testDimensionesProducto.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testDimensionesProducto.getAnchoIdeal()).isEqualTo(UPDATED_ANCHO_IDEAL);
    }

    @Test
    @Transactional
    public void updateNonExistingDimensionesProducto() throws Exception {
        int databaseSizeBeforeUpdate = dimensionesProductoRepository.findAll().size();

        // Create the DimensionesProducto
        DimensionesProductoDTO dimensionesProductoDTO = dimensionesProductoMapper.toDto(dimensionesProducto);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDimensionesProductoMockMvc.perform(put("/api/dimensiones-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dimensionesProductoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DimensionesProducto in the database
        List<DimensionesProducto> dimensionesProductoList = dimensionesProductoRepository.findAll();
        assertThat(dimensionesProductoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDimensionesProducto() throws Exception {
        // Initialize the database
        dimensionesProductoRepository.saveAndFlush(dimensionesProducto);

        int databaseSizeBeforeDelete = dimensionesProductoRepository.findAll().size();

        // Get the dimensionesProducto
        restDimensionesProductoMockMvc.perform(delete("/api/dimensiones-productos/{id}", dimensionesProducto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DimensionesProducto> dimensionesProductoList = dimensionesProductoRepository.findAll();
        assertThat(dimensionesProductoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DimensionesProducto.class);
        DimensionesProducto dimensionesProducto1 = new DimensionesProducto();
        dimensionesProducto1.setId(1L);
        DimensionesProducto dimensionesProducto2 = new DimensionesProducto();
        dimensionesProducto2.setId(dimensionesProducto1.getId());
        assertThat(dimensionesProducto1).isEqualTo(dimensionesProducto2);
        dimensionesProducto2.setId(2L);
        assertThat(dimensionesProducto1).isNotEqualTo(dimensionesProducto2);
        dimensionesProducto1.setId(null);
        assertThat(dimensionesProducto1).isNotEqualTo(dimensionesProducto2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DimensionesProductoDTO.class);
        DimensionesProductoDTO dimensionesProductoDTO1 = new DimensionesProductoDTO();
        dimensionesProductoDTO1.setId(1L);
        DimensionesProductoDTO dimensionesProductoDTO2 = new DimensionesProductoDTO();
        assertThat(dimensionesProductoDTO1).isNotEqualTo(dimensionesProductoDTO2);
        dimensionesProductoDTO2.setId(dimensionesProductoDTO1.getId());
        assertThat(dimensionesProductoDTO1).isEqualTo(dimensionesProductoDTO2);
        dimensionesProductoDTO2.setId(2L);
        assertThat(dimensionesProductoDTO1).isNotEqualTo(dimensionesProductoDTO2);
        dimensionesProductoDTO1.setId(null);
        assertThat(dimensionesProductoDTO1).isNotEqualTo(dimensionesProductoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(dimensionesProductoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(dimensionesProductoMapper.fromId(null)).isNull();
    }
}
