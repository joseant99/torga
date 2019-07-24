package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.TipoProducto;
import com.torga.pedidos.domain.ProductosDormitorio;
import com.torga.pedidos.repository.TipoProductoRepository;
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
 * Test class for the TipoProductoResource REST controller.
 *
 * @see TipoProductoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class TipoProductoResourceIntTest {

    private static final String DEFAULT_MENSAJE = "AAAAAAAAAA";
    private static final String UPDATED_MENSAJE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGEN = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEN = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGEN_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEN_CONTENT_TYPE = "image/png";

    @Autowired
    private TipoProductoRepository tipoProductoRepository;

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

    private MockMvc restTipoProductoMockMvc;

    private TipoProducto tipoProducto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoProductoResource tipoProductoResource = new TipoProductoResource(tipoProductoRepository);
        this.restTipoProductoMockMvc = MockMvcBuilders.standaloneSetup(tipoProductoResource)
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
    public static TipoProducto createEntity(EntityManager em) {
        TipoProducto tipoProducto = new TipoProducto()
            .mensaje(DEFAULT_MENSAJE)
            .imagen(DEFAULT_IMAGEN)
            .imagenContentType(DEFAULT_IMAGEN_CONTENT_TYPE);
        // Add required entity
        ProductosDormitorio productosDormitorio = ProductosDormitorioResourceIntTest.createEntity(em);
        em.persist(productosDormitorio);
        em.flush();
        tipoProducto.setProductosDormitorio(productosDormitorio);
        return tipoProducto;
    }

    @Before
    public void initTest() {
        tipoProducto = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoProducto() throws Exception {
        int databaseSizeBeforeCreate = tipoProductoRepository.findAll().size();

        // Create the TipoProducto
        restTipoProductoMockMvc.perform(post("/api/tipo-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoProducto)))
            .andExpect(status().isCreated());

        // Validate the TipoProducto in the database
        List<TipoProducto> tipoProductoList = tipoProductoRepository.findAll();
        assertThat(tipoProductoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoProducto testTipoProducto = tipoProductoList.get(tipoProductoList.size() - 1);
        assertThat(testTipoProducto.getMensaje()).isEqualTo(DEFAULT_MENSAJE);
        assertThat(testTipoProducto.getImagen()).isEqualTo(DEFAULT_IMAGEN);
        assertThat(testTipoProducto.getImagenContentType()).isEqualTo(DEFAULT_IMAGEN_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createTipoProductoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoProductoRepository.findAll().size();

        // Create the TipoProducto with an existing ID
        tipoProducto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoProductoMockMvc.perform(post("/api/tipo-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoProducto)))
            .andExpect(status().isBadRequest());

        // Validate the TipoProducto in the database
        List<TipoProducto> tipoProductoList = tipoProductoRepository.findAll();
        assertThat(tipoProductoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkMensajeIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoProductoRepository.findAll().size();
        // set the field null
        tipoProducto.setMensaje(null);

        // Create the TipoProducto, which fails.

        restTipoProductoMockMvc.perform(post("/api/tipo-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoProducto)))
            .andExpect(status().isBadRequest());

        List<TipoProducto> tipoProductoList = tipoProductoRepository.findAll();
        assertThat(tipoProductoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoProductos() throws Exception {
        // Initialize the database
        tipoProductoRepository.saveAndFlush(tipoProducto);

        // Get all the tipoProductoList
        restTipoProductoMockMvc.perform(get("/api/tipo-productos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoProducto.getId().intValue())))
            .andExpect(jsonPath("$.[*].mensaje").value(hasItem(DEFAULT_MENSAJE.toString())))
            .andExpect(jsonPath("$.[*].imagenContentType").value(hasItem(DEFAULT_IMAGEN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN))));
    }
    
    @Test
    @Transactional
    public void getTipoProducto() throws Exception {
        // Initialize the database
        tipoProductoRepository.saveAndFlush(tipoProducto);

        // Get the tipoProducto
        restTipoProductoMockMvc.perform(get("/api/tipo-productos/{id}", tipoProducto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoProducto.getId().intValue()))
            .andExpect(jsonPath("$.mensaje").value(DEFAULT_MENSAJE.toString()))
            .andExpect(jsonPath("$.imagenContentType").value(DEFAULT_IMAGEN_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagen").value(Base64Utils.encodeToString(DEFAULT_IMAGEN)));
    }

    @Test
    @Transactional
    public void getNonExistingTipoProducto() throws Exception {
        // Get the tipoProducto
        restTipoProductoMockMvc.perform(get("/api/tipo-productos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoProducto() throws Exception {
        // Initialize the database
        tipoProductoRepository.saveAndFlush(tipoProducto);

        int databaseSizeBeforeUpdate = tipoProductoRepository.findAll().size();

        // Update the tipoProducto
        TipoProducto updatedTipoProducto = tipoProductoRepository.findById(tipoProducto.getId()).get();
        // Disconnect from session so that the updates on updatedTipoProducto are not directly saved in db
        em.detach(updatedTipoProducto);
        updatedTipoProducto
            .mensaje(UPDATED_MENSAJE)
            .imagen(UPDATED_IMAGEN)
            .imagenContentType(UPDATED_IMAGEN_CONTENT_TYPE);

        restTipoProductoMockMvc.perform(put("/api/tipo-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoProducto)))
            .andExpect(status().isOk());

        // Validate the TipoProducto in the database
        List<TipoProducto> tipoProductoList = tipoProductoRepository.findAll();
        assertThat(tipoProductoList).hasSize(databaseSizeBeforeUpdate);
        TipoProducto testTipoProducto = tipoProductoList.get(tipoProductoList.size() - 1);
        assertThat(testTipoProducto.getMensaje()).isEqualTo(UPDATED_MENSAJE);
        assertThat(testTipoProducto.getImagen()).isEqualTo(UPDATED_IMAGEN);
        assertThat(testTipoProducto.getImagenContentType()).isEqualTo(UPDATED_IMAGEN_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoProducto() throws Exception {
        int databaseSizeBeforeUpdate = tipoProductoRepository.findAll().size();

        // Create the TipoProducto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoProductoMockMvc.perform(put("/api/tipo-productos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoProducto)))
            .andExpect(status().isBadRequest());

        // Validate the TipoProducto in the database
        List<TipoProducto> tipoProductoList = tipoProductoRepository.findAll();
        assertThat(tipoProductoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoProducto() throws Exception {
        // Initialize the database
        tipoProductoRepository.saveAndFlush(tipoProducto);

        int databaseSizeBeforeDelete = tipoProductoRepository.findAll().size();

        // Get the tipoProducto
        restTipoProductoMockMvc.perform(delete("/api/tipo-productos/{id}", tipoProducto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TipoProducto> tipoProductoList = tipoProductoRepository.findAll();
        assertThat(tipoProductoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoProducto.class);
        TipoProducto tipoProducto1 = new TipoProducto();
        tipoProducto1.setId(1L);
        TipoProducto tipoProducto2 = new TipoProducto();
        tipoProducto2.setId(tipoProducto1.getId());
        assertThat(tipoProducto1).isEqualTo(tipoProducto2);
        tipoProducto2.setId(2L);
        assertThat(tipoProducto1).isNotEqualTo(tipoProducto2);
        tipoProducto1.setId(null);
        assertThat(tipoProducto1).isNotEqualTo(tipoProducto2);
    }
}
