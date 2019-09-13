package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.ImagenesContactoFabrica;
import com.torga.pedidos.repository.ImagenesContactoFabricaRepository;
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
 * Test class for the ImagenesContactoFabricaResource REST controller.
 *
 * @see ImagenesContactoFabricaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class ImagenesContactoFabricaResourceIntTest {

    private static final byte[] DEFAULT_IMAGEN = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEN = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGEN_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEN_CONTENT_TYPE = "image/png";

    @Autowired
    private ImagenesContactoFabricaRepository imagenesContactoFabricaRepository;

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

    private MockMvc restImagenesContactoFabricaMockMvc;

    private ImagenesContactoFabrica imagenesContactoFabrica;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ImagenesContactoFabricaResource imagenesContactoFabricaResource = new ImagenesContactoFabricaResource(imagenesContactoFabricaRepository);
        this.restImagenesContactoFabricaMockMvc = MockMvcBuilders.standaloneSetup(imagenesContactoFabricaResource)
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
    public static ImagenesContactoFabrica createEntity(EntityManager em) {
        ImagenesContactoFabrica imagenesContactoFabrica = new ImagenesContactoFabrica()
            .imagen(DEFAULT_IMAGEN)
            .imagenContentType(DEFAULT_IMAGEN_CONTENT_TYPE);
        return imagenesContactoFabrica;
    }

    @Before
    public void initTest() {
        imagenesContactoFabrica = createEntity(em);
    }

    @Test
    @Transactional
    public void createImagenesContactoFabrica() throws Exception {
        int databaseSizeBeforeCreate = imagenesContactoFabricaRepository.findAll().size();

        // Create the ImagenesContactoFabrica
        restImagenesContactoFabricaMockMvc.perform(post("/api/imagenes-contacto-fabricas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imagenesContactoFabrica)))
            .andExpect(status().isCreated());

        // Validate the ImagenesContactoFabrica in the database
        List<ImagenesContactoFabrica> imagenesContactoFabricaList = imagenesContactoFabricaRepository.findAll();
        assertThat(imagenesContactoFabricaList).hasSize(databaseSizeBeforeCreate + 1);
        ImagenesContactoFabrica testImagenesContactoFabrica = imagenesContactoFabricaList.get(imagenesContactoFabricaList.size() - 1);
        assertThat(testImagenesContactoFabrica.getImagen()).isEqualTo(DEFAULT_IMAGEN);
        assertThat(testImagenesContactoFabrica.getImagenContentType()).isEqualTo(DEFAULT_IMAGEN_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createImagenesContactoFabricaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = imagenesContactoFabricaRepository.findAll().size();

        // Create the ImagenesContactoFabrica with an existing ID
        imagenesContactoFabrica.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImagenesContactoFabricaMockMvc.perform(post("/api/imagenes-contacto-fabricas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imagenesContactoFabrica)))
            .andExpect(status().isBadRequest());

        // Validate the ImagenesContactoFabrica in the database
        List<ImagenesContactoFabrica> imagenesContactoFabricaList = imagenesContactoFabricaRepository.findAll();
        assertThat(imagenesContactoFabricaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllImagenesContactoFabricas() throws Exception {
        // Initialize the database
        imagenesContactoFabricaRepository.saveAndFlush(imagenesContactoFabrica);

        // Get all the imagenesContactoFabricaList
        restImagenesContactoFabricaMockMvc.perform(get("/api/imagenes-contacto-fabricas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(imagenesContactoFabrica.getId().intValue())))
            .andExpect(jsonPath("$.[*].imagenContentType").value(hasItem(DEFAULT_IMAGEN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN))));
    }
    
    @Test
    @Transactional
    public void getImagenesContactoFabrica() throws Exception {
        // Initialize the database
        imagenesContactoFabricaRepository.saveAndFlush(imagenesContactoFabrica);

        // Get the imagenesContactoFabrica
        restImagenesContactoFabricaMockMvc.perform(get("/api/imagenes-contacto-fabricas/{id}", imagenesContactoFabrica.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(imagenesContactoFabrica.getId().intValue()))
            .andExpect(jsonPath("$.imagenContentType").value(DEFAULT_IMAGEN_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagen").value(Base64Utils.encodeToString(DEFAULT_IMAGEN)));
    }

    @Test
    @Transactional
    public void getNonExistingImagenesContactoFabrica() throws Exception {
        // Get the imagenesContactoFabrica
        restImagenesContactoFabricaMockMvc.perform(get("/api/imagenes-contacto-fabricas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImagenesContactoFabrica() throws Exception {
        // Initialize the database
        imagenesContactoFabricaRepository.saveAndFlush(imagenesContactoFabrica);

        int databaseSizeBeforeUpdate = imagenesContactoFabricaRepository.findAll().size();

        // Update the imagenesContactoFabrica
        ImagenesContactoFabrica updatedImagenesContactoFabrica = imagenesContactoFabricaRepository.findById(imagenesContactoFabrica.getId()).get();
        // Disconnect from session so that the updates on updatedImagenesContactoFabrica are not directly saved in db
        em.detach(updatedImagenesContactoFabrica);
        updatedImagenesContactoFabrica
            .imagen(UPDATED_IMAGEN)
            .imagenContentType(UPDATED_IMAGEN_CONTENT_TYPE);

        restImagenesContactoFabricaMockMvc.perform(put("/api/imagenes-contacto-fabricas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedImagenesContactoFabrica)))
            .andExpect(status().isOk());

        // Validate the ImagenesContactoFabrica in the database
        List<ImagenesContactoFabrica> imagenesContactoFabricaList = imagenesContactoFabricaRepository.findAll();
        assertThat(imagenesContactoFabricaList).hasSize(databaseSizeBeforeUpdate);
        ImagenesContactoFabrica testImagenesContactoFabrica = imagenesContactoFabricaList.get(imagenesContactoFabricaList.size() - 1);
        assertThat(testImagenesContactoFabrica.getImagen()).isEqualTo(UPDATED_IMAGEN);
        assertThat(testImagenesContactoFabrica.getImagenContentType()).isEqualTo(UPDATED_IMAGEN_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingImagenesContactoFabrica() throws Exception {
        int databaseSizeBeforeUpdate = imagenesContactoFabricaRepository.findAll().size();

        // Create the ImagenesContactoFabrica

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImagenesContactoFabricaMockMvc.perform(put("/api/imagenes-contacto-fabricas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imagenesContactoFabrica)))
            .andExpect(status().isBadRequest());

        // Validate the ImagenesContactoFabrica in the database
        List<ImagenesContactoFabrica> imagenesContactoFabricaList = imagenesContactoFabricaRepository.findAll();
        assertThat(imagenesContactoFabricaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteImagenesContactoFabrica() throws Exception {
        // Initialize the database
        imagenesContactoFabricaRepository.saveAndFlush(imagenesContactoFabrica);

        int databaseSizeBeforeDelete = imagenesContactoFabricaRepository.findAll().size();

        // Get the imagenesContactoFabrica
        restImagenesContactoFabricaMockMvc.perform(delete("/api/imagenes-contacto-fabricas/{id}", imagenesContactoFabrica.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ImagenesContactoFabrica> imagenesContactoFabricaList = imagenesContactoFabricaRepository.findAll();
        assertThat(imagenesContactoFabricaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ImagenesContactoFabrica.class);
        ImagenesContactoFabrica imagenesContactoFabrica1 = new ImagenesContactoFabrica();
        imagenesContactoFabrica1.setId(1L);
        ImagenesContactoFabrica imagenesContactoFabrica2 = new ImagenesContactoFabrica();
        imagenesContactoFabrica2.setId(imagenesContactoFabrica1.getId());
        assertThat(imagenesContactoFabrica1).isEqualTo(imagenesContactoFabrica2);
        imagenesContactoFabrica2.setId(2L);
        assertThat(imagenesContactoFabrica1).isNotEqualTo(imagenesContactoFabrica2);
        imagenesContactoFabrica1.setId(null);
        assertThat(imagenesContactoFabrica1).isNotEqualTo(imagenesContactoFabrica2);
    }
}
