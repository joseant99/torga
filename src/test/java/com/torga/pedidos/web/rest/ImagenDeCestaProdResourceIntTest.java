package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.ImagenDeCestaProd;
import com.torga.pedidos.repository.ImagenDeCestaProdRepository;
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
 * Test class for the ImagenDeCestaProdResource REST controller.
 *
 * @see ImagenDeCestaProdResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class ImagenDeCestaProdResourceIntTest {

    private static final String DEFAULT_IMAGEN = "AAAAAAAAAA";
    private static final String UPDATED_IMAGEN = "BBBBBBBBBB";

    @Autowired
    private ImagenDeCestaProdRepository imagenDeCestaProdRepository;

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

    private MockMvc restImagenDeCestaProdMockMvc;

    private ImagenDeCestaProd imagenDeCestaProd;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ImagenDeCestaProdResource imagenDeCestaProdResource = new ImagenDeCestaProdResource(imagenDeCestaProdRepository);
        this.restImagenDeCestaProdMockMvc = MockMvcBuilders.standaloneSetup(imagenDeCestaProdResource)
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
    public static ImagenDeCestaProd createEntity(EntityManager em) {
        ImagenDeCestaProd imagenDeCestaProd = new ImagenDeCestaProd()
            .imagen(DEFAULT_IMAGEN);
        return imagenDeCestaProd;
    }

    @Before
    public void initTest() {
        imagenDeCestaProd = createEntity(em);
    }

    @Test
    @Transactional
    public void createImagenDeCestaProd() throws Exception {
        int databaseSizeBeforeCreate = imagenDeCestaProdRepository.findAll().size();

        // Create the ImagenDeCestaProd
        restImagenDeCestaProdMockMvc.perform(post("/api/imagen-de-cesta-prods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imagenDeCestaProd)))
            .andExpect(status().isCreated());

        // Validate the ImagenDeCestaProd in the database
        List<ImagenDeCestaProd> imagenDeCestaProdList = imagenDeCestaProdRepository.findAll();
        assertThat(imagenDeCestaProdList).hasSize(databaseSizeBeforeCreate + 1);
        ImagenDeCestaProd testImagenDeCestaProd = imagenDeCestaProdList.get(imagenDeCestaProdList.size() - 1);
        assertThat(testImagenDeCestaProd.getImagen()).isEqualTo(DEFAULT_IMAGEN);
    }

    @Test
    @Transactional
    public void createImagenDeCestaProdWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = imagenDeCestaProdRepository.findAll().size();

        // Create the ImagenDeCestaProd with an existing ID
        imagenDeCestaProd.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImagenDeCestaProdMockMvc.perform(post("/api/imagen-de-cesta-prods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imagenDeCestaProd)))
            .andExpect(status().isBadRequest());

        // Validate the ImagenDeCestaProd in the database
        List<ImagenDeCestaProd> imagenDeCestaProdList = imagenDeCestaProdRepository.findAll();
        assertThat(imagenDeCestaProdList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllImagenDeCestaProds() throws Exception {
        // Initialize the database
        imagenDeCestaProdRepository.saveAndFlush(imagenDeCestaProd);

        // Get all the imagenDeCestaProdList
        restImagenDeCestaProdMockMvc.perform(get("/api/imagen-de-cesta-prods?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(imagenDeCestaProd.getId().intValue())))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(DEFAULT_IMAGEN.toString())));
    }
    
    @Test
    @Transactional
    public void getImagenDeCestaProd() throws Exception {
        // Initialize the database
        imagenDeCestaProdRepository.saveAndFlush(imagenDeCestaProd);

        // Get the imagenDeCestaProd
        restImagenDeCestaProdMockMvc.perform(get("/api/imagen-de-cesta-prods/{id}", imagenDeCestaProd.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(imagenDeCestaProd.getId().intValue()))
            .andExpect(jsonPath("$.imagen").value(DEFAULT_IMAGEN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingImagenDeCestaProd() throws Exception {
        // Get the imagenDeCestaProd
        restImagenDeCestaProdMockMvc.perform(get("/api/imagen-de-cesta-prods/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImagenDeCestaProd() throws Exception {
        // Initialize the database
        imagenDeCestaProdRepository.saveAndFlush(imagenDeCestaProd);

        int databaseSizeBeforeUpdate = imagenDeCestaProdRepository.findAll().size();

        // Update the imagenDeCestaProd
        ImagenDeCestaProd updatedImagenDeCestaProd = imagenDeCestaProdRepository.findById(imagenDeCestaProd.getId()).get();
        // Disconnect from session so that the updates on updatedImagenDeCestaProd are not directly saved in db
        em.detach(updatedImagenDeCestaProd);
        updatedImagenDeCestaProd
            .imagen(UPDATED_IMAGEN);

        restImagenDeCestaProdMockMvc.perform(put("/api/imagen-de-cesta-prods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedImagenDeCestaProd)))
            .andExpect(status().isOk());

        // Validate the ImagenDeCestaProd in the database
        List<ImagenDeCestaProd> imagenDeCestaProdList = imagenDeCestaProdRepository.findAll();
        assertThat(imagenDeCestaProdList).hasSize(databaseSizeBeforeUpdate);
        ImagenDeCestaProd testImagenDeCestaProd = imagenDeCestaProdList.get(imagenDeCestaProdList.size() - 1);
        assertThat(testImagenDeCestaProd.getImagen()).isEqualTo(UPDATED_IMAGEN);
    }

    @Test
    @Transactional
    public void updateNonExistingImagenDeCestaProd() throws Exception {
        int databaseSizeBeforeUpdate = imagenDeCestaProdRepository.findAll().size();

        // Create the ImagenDeCestaProd

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImagenDeCestaProdMockMvc.perform(put("/api/imagen-de-cesta-prods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imagenDeCestaProd)))
            .andExpect(status().isBadRequest());

        // Validate the ImagenDeCestaProd in the database
        List<ImagenDeCestaProd> imagenDeCestaProdList = imagenDeCestaProdRepository.findAll();
        assertThat(imagenDeCestaProdList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteImagenDeCestaProd() throws Exception {
        // Initialize the database
        imagenDeCestaProdRepository.saveAndFlush(imagenDeCestaProd);

        int databaseSizeBeforeDelete = imagenDeCestaProdRepository.findAll().size();

        // Get the imagenDeCestaProd
        restImagenDeCestaProdMockMvc.perform(delete("/api/imagen-de-cesta-prods/{id}", imagenDeCestaProd.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ImagenDeCestaProd> imagenDeCestaProdList = imagenDeCestaProdRepository.findAll();
        assertThat(imagenDeCestaProdList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ImagenDeCestaProd.class);
        ImagenDeCestaProd imagenDeCestaProd1 = new ImagenDeCestaProd();
        imagenDeCestaProd1.setId(1L);
        ImagenDeCestaProd imagenDeCestaProd2 = new ImagenDeCestaProd();
        imagenDeCestaProd2.setId(imagenDeCestaProd1.getId());
        assertThat(imagenDeCestaProd1).isEqualTo(imagenDeCestaProd2);
        imagenDeCestaProd2.setId(2L);
        assertThat(imagenDeCestaProd1).isNotEqualTo(imagenDeCestaProd2);
        imagenDeCestaProd1.setId(null);
        assertThat(imagenDeCestaProd1).isNotEqualTo(imagenDeCestaProd2);
    }
}
