package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.ProductosDormitorio;
import com.torga.pedidos.domain.CategoriasDormi;
import com.torga.pedidos.repository.ProductosDormitorioRepository;
import com.torga.pedidos.service.ProductosDormitorioService;
import com.torga.pedidos.service.dto.ProductosDormitorioDTO;
import com.torga.pedidos.service.mapper.ProductosDormitorioMapper;
import com.torga.pedidos.web.rest.errors.ExceptionTranslator;
import com.torga.pedidos.service.dto.ProductosDormitorioCriteria;
import com.torga.pedidos.service.ProductosDormitorioQueryService;

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
 * Test class for the ProductosDormitorioResource REST controller.
 *
 * @see ProductosDormitorioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class ProductosDormitorioResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGEN = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEN = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGEN_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEN_CONTENT_TYPE = "image/png";

    @Autowired
    private ProductosDormitorioRepository productosDormitorioRepository;

    @Autowired
    private ProductosDormitorioMapper productosDormitorioMapper;

    @Autowired
    private ProductosDormitorioService productosDormitorioService;

    @Autowired
    private ProductosDormitorioQueryService productosDormitorioQueryService;

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

    private MockMvc restProductosDormitorioMockMvc;

    private ProductosDormitorio productosDormitorio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductosDormitorioResource productosDormitorioResource = new ProductosDormitorioResource(productosDormitorioService, productosDormitorioQueryService);
        this.restProductosDormitorioMockMvc = MockMvcBuilders.standaloneSetup(productosDormitorioResource)
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
    public static ProductosDormitorio createEntity(EntityManager em) {
        ProductosDormitorio productosDormitorio = new ProductosDormitorio()
            .nombre(DEFAULT_NOMBRE)
            .imagen(DEFAULT_IMAGEN)
            .imagenContentType(DEFAULT_IMAGEN_CONTENT_TYPE);
        return productosDormitorio;
    }

    @Before
    public void initTest() {
        productosDormitorio = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductosDormitorio() throws Exception {
        int databaseSizeBeforeCreate = productosDormitorioRepository.findAll().size();

        // Create the ProductosDormitorio
        ProductosDormitorioDTO productosDormitorioDTO = productosDormitorioMapper.toDto(productosDormitorio);
        restProductosDormitorioMockMvc.perform(post("/api/productos-dormitorios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productosDormitorioDTO)))
            .andExpect(status().isCreated());

        // Validate the ProductosDormitorio in the database
        List<ProductosDormitorio> productosDormitorioList = productosDormitorioRepository.findAll();
        assertThat(productosDormitorioList).hasSize(databaseSizeBeforeCreate + 1);
        ProductosDormitorio testProductosDormitorio = productosDormitorioList.get(productosDormitorioList.size() - 1);
        assertThat(testProductosDormitorio.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testProductosDormitorio.getImagen()).isEqualTo(DEFAULT_IMAGEN);
        assertThat(testProductosDormitorio.getImagenContentType()).isEqualTo(DEFAULT_IMAGEN_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createProductosDormitorioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productosDormitorioRepository.findAll().size();

        // Create the ProductosDormitorio with an existing ID
        productosDormitorio.setId(1L);
        ProductosDormitorioDTO productosDormitorioDTO = productosDormitorioMapper.toDto(productosDormitorio);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductosDormitorioMockMvc.perform(post("/api/productos-dormitorios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productosDormitorioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProductosDormitorio in the database
        List<ProductosDormitorio> productosDormitorioList = productosDormitorioRepository.findAll();
        assertThat(productosDormitorioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = productosDormitorioRepository.findAll().size();
        // set the field null
        productosDormitorio.setNombre(null);

        // Create the ProductosDormitorio, which fails.
        ProductosDormitorioDTO productosDormitorioDTO = productosDormitorioMapper.toDto(productosDormitorio);

        restProductosDormitorioMockMvc.perform(post("/api/productos-dormitorios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productosDormitorioDTO)))
            .andExpect(status().isBadRequest());

        List<ProductosDormitorio> productosDormitorioList = productosDormitorioRepository.findAll();
        assertThat(productosDormitorioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProductosDormitorios() throws Exception {
        // Initialize the database
        productosDormitorioRepository.saveAndFlush(productosDormitorio);

        // Get all the productosDormitorioList
        restProductosDormitorioMockMvc.perform(get("/api/productos-dormitorios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productosDormitorio.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].imagenContentType").value(hasItem(DEFAULT_IMAGEN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN))));
    }
    
    @Test
    @Transactional
    public void getProductosDormitorio() throws Exception {
        // Initialize the database
        productosDormitorioRepository.saveAndFlush(productosDormitorio);

        // Get the productosDormitorio
        restProductosDormitorioMockMvc.perform(get("/api/productos-dormitorios/{id}", productosDormitorio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productosDormitorio.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.imagenContentType").value(DEFAULT_IMAGEN_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagen").value(Base64Utils.encodeToString(DEFAULT_IMAGEN)));
    }

    @Test
    @Transactional
    public void getAllProductosDormitoriosByNombreIsEqualToSomething() throws Exception {
        // Initialize the database
        productosDormitorioRepository.saveAndFlush(productosDormitorio);

        // Get all the productosDormitorioList where nombre equals to DEFAULT_NOMBRE
        defaultProductosDormitorioShouldBeFound("nombre.equals=" + DEFAULT_NOMBRE);

        // Get all the productosDormitorioList where nombre equals to UPDATED_NOMBRE
        defaultProductosDormitorioShouldNotBeFound("nombre.equals=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void getAllProductosDormitoriosByNombreIsInShouldWork() throws Exception {
        // Initialize the database
        productosDormitorioRepository.saveAndFlush(productosDormitorio);

        // Get all the productosDormitorioList where nombre in DEFAULT_NOMBRE or UPDATED_NOMBRE
        defaultProductosDormitorioShouldBeFound("nombre.in=" + DEFAULT_NOMBRE + "," + UPDATED_NOMBRE);

        // Get all the productosDormitorioList where nombre equals to UPDATED_NOMBRE
        defaultProductosDormitorioShouldNotBeFound("nombre.in=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void getAllProductosDormitoriosByNombreIsNullOrNotNull() throws Exception {
        // Initialize the database
        productosDormitorioRepository.saveAndFlush(productosDormitorio);

        // Get all the productosDormitorioList where nombre is not null
        defaultProductosDormitorioShouldBeFound("nombre.specified=true");

        // Get all the productosDormitorioList where nombre is null
        defaultProductosDormitorioShouldNotBeFound("nombre.specified=false");
    }

    @Test
    @Transactional
    public void getAllProductosDormitoriosByCategoriasDormiIsEqualToSomething() throws Exception {
        // Initialize the database
        CategoriasDormi categoriasDormi = CategoriasDormiResourceIntTest.createEntity(em);
        em.persist(categoriasDormi);
        em.flush();
        productosDormitorio.setCategoriasDormi(categoriasDormi);
        productosDormitorioRepository.saveAndFlush(productosDormitorio);
        Long categoriasDormiId = categoriasDormi.getId();

        // Get all the productosDormitorioList where categoriasDormi equals to categoriasDormiId
        defaultProductosDormitorioShouldBeFound("categoriasDormiId.equals=" + categoriasDormiId);

        // Get all the productosDormitorioList where categoriasDormi equals to categoriasDormiId + 1
        defaultProductosDormitorioShouldNotBeFound("categoriasDormiId.equals=" + (categoriasDormiId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultProductosDormitorioShouldBeFound(String filter) throws Exception {
        restProductosDormitorioMockMvc.perform(get("/api/productos-dormitorios?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productosDormitorio.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].imagenContentType").value(hasItem(DEFAULT_IMAGEN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN))));

        // Check, that the count call also returns 1
        restProductosDormitorioMockMvc.perform(get("/api/productos-dormitorios/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultProductosDormitorioShouldNotBeFound(String filter) throws Exception {
        restProductosDormitorioMockMvc.perform(get("/api/productos-dormitorios?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restProductosDormitorioMockMvc.perform(get("/api/productos-dormitorios/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingProductosDormitorio() throws Exception {
        // Get the productosDormitorio
        restProductosDormitorioMockMvc.perform(get("/api/productos-dormitorios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductosDormitorio() throws Exception {
        // Initialize the database
        productosDormitorioRepository.saveAndFlush(productosDormitorio);

        int databaseSizeBeforeUpdate = productosDormitorioRepository.findAll().size();

        // Update the productosDormitorio
        ProductosDormitorio updatedProductosDormitorio = productosDormitorioRepository.findById(productosDormitorio.getId()).get();
        // Disconnect from session so that the updates on updatedProductosDormitorio are not directly saved in db
        em.detach(updatedProductosDormitorio);
        updatedProductosDormitorio
            .nombre(UPDATED_NOMBRE)
            .imagen(UPDATED_IMAGEN)
            .imagenContentType(UPDATED_IMAGEN_CONTENT_TYPE);
        ProductosDormitorioDTO productosDormitorioDTO = productosDormitorioMapper.toDto(updatedProductosDormitorio);

        restProductosDormitorioMockMvc.perform(put("/api/productos-dormitorios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productosDormitorioDTO)))
            .andExpect(status().isOk());

        // Validate the ProductosDormitorio in the database
        List<ProductosDormitorio> productosDormitorioList = productosDormitorioRepository.findAll();
        assertThat(productosDormitorioList).hasSize(databaseSizeBeforeUpdate);
        ProductosDormitorio testProductosDormitorio = productosDormitorioList.get(productosDormitorioList.size() - 1);
        assertThat(testProductosDormitorio.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testProductosDormitorio.getImagen()).isEqualTo(UPDATED_IMAGEN);
        assertThat(testProductosDormitorio.getImagenContentType()).isEqualTo(UPDATED_IMAGEN_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingProductosDormitorio() throws Exception {
        int databaseSizeBeforeUpdate = productosDormitorioRepository.findAll().size();

        // Create the ProductosDormitorio
        ProductosDormitorioDTO productosDormitorioDTO = productosDormitorioMapper.toDto(productosDormitorio);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductosDormitorioMockMvc.perform(put("/api/productos-dormitorios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productosDormitorioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProductosDormitorio in the database
        List<ProductosDormitorio> productosDormitorioList = productosDormitorioRepository.findAll();
        assertThat(productosDormitorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductosDormitorio() throws Exception {
        // Initialize the database
        productosDormitorioRepository.saveAndFlush(productosDormitorio);

        int databaseSizeBeforeDelete = productosDormitorioRepository.findAll().size();

        // Get the productosDormitorio
        restProductosDormitorioMockMvc.perform(delete("/api/productos-dormitorios/{id}", productosDormitorio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductosDormitorio> productosDormitorioList = productosDormitorioRepository.findAll();
        assertThat(productosDormitorioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductosDormitorio.class);
        ProductosDormitorio productosDormitorio1 = new ProductosDormitorio();
        productosDormitorio1.setId(1L);
        ProductosDormitorio productosDormitorio2 = new ProductosDormitorio();
        productosDormitorio2.setId(productosDormitorio1.getId());
        assertThat(productosDormitorio1).isEqualTo(productosDormitorio2);
        productosDormitorio2.setId(2L);
        assertThat(productosDormitorio1).isNotEqualTo(productosDormitorio2);
        productosDormitorio1.setId(null);
        assertThat(productosDormitorio1).isNotEqualTo(productosDormitorio2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductosDormitorioDTO.class);
        ProductosDormitorioDTO productosDormitorioDTO1 = new ProductosDormitorioDTO();
        productosDormitorioDTO1.setId(1L);
        ProductosDormitorioDTO productosDormitorioDTO2 = new ProductosDormitorioDTO();
        assertThat(productosDormitorioDTO1).isNotEqualTo(productosDormitorioDTO2);
        productosDormitorioDTO2.setId(productosDormitorioDTO1.getId());
        assertThat(productosDormitorioDTO1).isEqualTo(productosDormitorioDTO2);
        productosDormitorioDTO2.setId(2L);
        assertThat(productosDormitorioDTO1).isNotEqualTo(productosDormitorioDTO2);
        productosDormitorioDTO1.setId(null);
        assertThat(productosDormitorioDTO1).isNotEqualTo(productosDormitorioDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(productosDormitorioMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(productosDormitorioMapper.fromId(null)).isNull();
    }
}
