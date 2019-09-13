package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.InteriorArmarioDentro;
import com.torga.pedidos.repository.InteriorArmarioDentroRepository;
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
 * Test class for the InteriorArmarioDentroResource REST controller.
 *
 * @see InteriorArmarioDentroResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class InteriorArmarioDentroResourceIntTest {

    private static final byte[] DEFAULT_IMAGEN = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEN = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGEN_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEN_CONTENT_TYPE = "image/png";

    private static final Float DEFAULT_ANCHO = 1F;
    private static final Float UPDATED_ANCHO = 2F;

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Float DEFAULT_PRECIO_LUZ = 1F;
    private static final Float UPDATED_PRECIO_LUZ = 2F;

    @Autowired
    private InteriorArmarioDentroRepository interiorArmarioDentroRepository;

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

    private MockMvc restInteriorArmarioDentroMockMvc;

    private InteriorArmarioDentro interiorArmarioDentro;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InteriorArmarioDentroResource interiorArmarioDentroResource = new InteriorArmarioDentroResource(interiorArmarioDentroRepository);
        this.restInteriorArmarioDentroMockMvc = MockMvcBuilders.standaloneSetup(interiorArmarioDentroResource)
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
    public static InteriorArmarioDentro createEntity(EntityManager em) {
        InteriorArmarioDentro interiorArmarioDentro = new InteriorArmarioDentro()
            .imagen(DEFAULT_IMAGEN)
            .imagenContentType(DEFAULT_IMAGEN_CONTENT_TYPE)
            .ancho(DEFAULT_ANCHO)
            .precio(DEFAULT_PRECIO)
            .nombre(DEFAULT_NOMBRE)
            .precioLuz(DEFAULT_PRECIO_LUZ);
        return interiorArmarioDentro;
    }

    @Before
    public void initTest() {
        interiorArmarioDentro = createEntity(em);
    }

    @Test
    @Transactional
    public void createInteriorArmarioDentro() throws Exception {
        int databaseSizeBeforeCreate = interiorArmarioDentroRepository.findAll().size();

        // Create the InteriorArmarioDentro
        restInteriorArmarioDentroMockMvc.perform(post("/api/interior-armario-dentros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interiorArmarioDentro)))
            .andExpect(status().isCreated());

        // Validate the InteriorArmarioDentro in the database
        List<InteriorArmarioDentro> interiorArmarioDentroList = interiorArmarioDentroRepository.findAll();
        assertThat(interiorArmarioDentroList).hasSize(databaseSizeBeforeCreate + 1);
        InteriorArmarioDentro testInteriorArmarioDentro = interiorArmarioDentroList.get(interiorArmarioDentroList.size() - 1);
        assertThat(testInteriorArmarioDentro.getImagen()).isEqualTo(DEFAULT_IMAGEN);
        assertThat(testInteriorArmarioDentro.getImagenContentType()).isEqualTo(DEFAULT_IMAGEN_CONTENT_TYPE);
        assertThat(testInteriorArmarioDentro.getAncho()).isEqualTo(DEFAULT_ANCHO);
        assertThat(testInteriorArmarioDentro.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testInteriorArmarioDentro.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testInteriorArmarioDentro.getPrecioLuz()).isEqualTo(DEFAULT_PRECIO_LUZ);
    }

    @Test
    @Transactional
    public void createInteriorArmarioDentroWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = interiorArmarioDentroRepository.findAll().size();

        // Create the InteriorArmarioDentro with an existing ID
        interiorArmarioDentro.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInteriorArmarioDentroMockMvc.perform(post("/api/interior-armario-dentros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interiorArmarioDentro)))
            .andExpect(status().isBadRequest());

        // Validate the InteriorArmarioDentro in the database
        List<InteriorArmarioDentro> interiorArmarioDentroList = interiorArmarioDentroRepository.findAll();
        assertThat(interiorArmarioDentroList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInteriorArmarioDentros() throws Exception {
        // Initialize the database
        interiorArmarioDentroRepository.saveAndFlush(interiorArmarioDentro);

        // Get all the interiorArmarioDentroList
        restInteriorArmarioDentroMockMvc.perform(get("/api/interior-armario-dentros?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(interiorArmarioDentro.getId().intValue())))
            .andExpect(jsonPath("$.[*].imagenContentType").value(hasItem(DEFAULT_IMAGEN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN))))
            .andExpect(jsonPath("$.[*].ancho").value(hasItem(DEFAULT_ANCHO.doubleValue())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].precioLuz").value(hasItem(DEFAULT_PRECIO_LUZ.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getInteriorArmarioDentro() throws Exception {
        // Initialize the database
        interiorArmarioDentroRepository.saveAndFlush(interiorArmarioDentro);

        // Get the interiorArmarioDentro
        restInteriorArmarioDentroMockMvc.perform(get("/api/interior-armario-dentros/{id}", interiorArmarioDentro.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(interiorArmarioDentro.getId().intValue()))
            .andExpect(jsonPath("$.imagenContentType").value(DEFAULT_IMAGEN_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagen").value(Base64Utils.encodeToString(DEFAULT_IMAGEN)))
            .andExpect(jsonPath("$.ancho").value(DEFAULT_ANCHO.doubleValue()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.precioLuz").value(DEFAULT_PRECIO_LUZ.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingInteriorArmarioDentro() throws Exception {
        // Get the interiorArmarioDentro
        restInteriorArmarioDentroMockMvc.perform(get("/api/interior-armario-dentros/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInteriorArmarioDentro() throws Exception {
        // Initialize the database
        interiorArmarioDentroRepository.saveAndFlush(interiorArmarioDentro);

        int databaseSizeBeforeUpdate = interiorArmarioDentroRepository.findAll().size();

        // Update the interiorArmarioDentro
        InteriorArmarioDentro updatedInteriorArmarioDentro = interiorArmarioDentroRepository.findById(interiorArmarioDentro.getId()).get();
        // Disconnect from session so that the updates on updatedInteriorArmarioDentro are not directly saved in db
        em.detach(updatedInteriorArmarioDentro);
        updatedInteriorArmarioDentro
            .imagen(UPDATED_IMAGEN)
            .imagenContentType(UPDATED_IMAGEN_CONTENT_TYPE)
            .ancho(UPDATED_ANCHO)
            .precio(UPDATED_PRECIO)
            .nombre(UPDATED_NOMBRE)
            .precioLuz(UPDATED_PRECIO_LUZ);

        restInteriorArmarioDentroMockMvc.perform(put("/api/interior-armario-dentros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInteriorArmarioDentro)))
            .andExpect(status().isOk());

        // Validate the InteriorArmarioDentro in the database
        List<InteriorArmarioDentro> interiorArmarioDentroList = interiorArmarioDentroRepository.findAll();
        assertThat(interiorArmarioDentroList).hasSize(databaseSizeBeforeUpdate);
        InteriorArmarioDentro testInteriorArmarioDentro = interiorArmarioDentroList.get(interiorArmarioDentroList.size() - 1);
        assertThat(testInteriorArmarioDentro.getImagen()).isEqualTo(UPDATED_IMAGEN);
        assertThat(testInteriorArmarioDentro.getImagenContentType()).isEqualTo(UPDATED_IMAGEN_CONTENT_TYPE);
        assertThat(testInteriorArmarioDentro.getAncho()).isEqualTo(UPDATED_ANCHO);
        assertThat(testInteriorArmarioDentro.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testInteriorArmarioDentro.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testInteriorArmarioDentro.getPrecioLuz()).isEqualTo(UPDATED_PRECIO_LUZ);
    }

    @Test
    @Transactional
    public void updateNonExistingInteriorArmarioDentro() throws Exception {
        int databaseSizeBeforeUpdate = interiorArmarioDentroRepository.findAll().size();

        // Create the InteriorArmarioDentro

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInteriorArmarioDentroMockMvc.perform(put("/api/interior-armario-dentros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interiorArmarioDentro)))
            .andExpect(status().isBadRequest());

        // Validate the InteriorArmarioDentro in the database
        List<InteriorArmarioDentro> interiorArmarioDentroList = interiorArmarioDentroRepository.findAll();
        assertThat(interiorArmarioDentroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInteriorArmarioDentro() throws Exception {
        // Initialize the database
        interiorArmarioDentroRepository.saveAndFlush(interiorArmarioDentro);

        int databaseSizeBeforeDelete = interiorArmarioDentroRepository.findAll().size();

        // Get the interiorArmarioDentro
        restInteriorArmarioDentroMockMvc.perform(delete("/api/interior-armario-dentros/{id}", interiorArmarioDentro.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<InteriorArmarioDentro> interiorArmarioDentroList = interiorArmarioDentroRepository.findAll();
        assertThat(interiorArmarioDentroList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InteriorArmarioDentro.class);
        InteriorArmarioDentro interiorArmarioDentro1 = new InteriorArmarioDentro();
        interiorArmarioDentro1.setId(1L);
        InteriorArmarioDentro interiorArmarioDentro2 = new InteriorArmarioDentro();
        interiorArmarioDentro2.setId(interiorArmarioDentro1.getId());
        assertThat(interiorArmarioDentro1).isEqualTo(interiorArmarioDentro2);
        interiorArmarioDentro2.setId(2L);
        assertThat(interiorArmarioDentro1).isNotEqualTo(interiorArmarioDentro2);
        interiorArmarioDentro1.setId(null);
        assertThat(interiorArmarioDentro1).isNotEqualTo(interiorArmarioDentro2);
    }
}
