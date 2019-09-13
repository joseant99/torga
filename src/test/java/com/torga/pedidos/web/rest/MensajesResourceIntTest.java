package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Mensajes;
import com.torga.pedidos.repository.MensajesRepository;
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
 * Test class for the MensajesResource REST controller.
 *
 * @see MensajesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class MensajesResourceIntTest {

    private static final String DEFAULT_TEXTO = "AAAAAAAAAA";
    private static final String UPDATED_TEXTO = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGEN = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEN = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGEN_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEN_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_FECHA_VISTO = "AAAAAAAAAA";
    private static final String UPDATED_FECHA_VISTO = "BBBBBBBBBB";

    @Autowired
    private MensajesRepository mensajesRepository;

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

    private MockMvc restMensajesMockMvc;

    private Mensajes mensajes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MensajesResource mensajesResource = new MensajesResource(mensajesRepository);
        this.restMensajesMockMvc = MockMvcBuilders.standaloneSetup(mensajesResource)
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
    public static Mensajes createEntity(EntityManager em) {
        Mensajes mensajes = new Mensajes()
            .texto(DEFAULT_TEXTO)
            .imagen(DEFAULT_IMAGEN)
            .imagenContentType(DEFAULT_IMAGEN_CONTENT_TYPE)
            .fechaVisto(DEFAULT_FECHA_VISTO);
        return mensajes;
    }

    @Before
    public void initTest() {
        mensajes = createEntity(em);
    }

    @Test
    @Transactional
    public void createMensajes() throws Exception {
        int databaseSizeBeforeCreate = mensajesRepository.findAll().size();

        // Create the Mensajes
        restMensajesMockMvc.perform(post("/api/mensajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mensajes)))
            .andExpect(status().isCreated());

        // Validate the Mensajes in the database
        List<Mensajes> mensajesList = mensajesRepository.findAll();
        assertThat(mensajesList).hasSize(databaseSizeBeforeCreate + 1);
        Mensajes testMensajes = mensajesList.get(mensajesList.size() - 1);
        assertThat(testMensajes.getTexto()).isEqualTo(DEFAULT_TEXTO);
        assertThat(testMensajes.getImagen()).isEqualTo(DEFAULT_IMAGEN);
        assertThat(testMensajes.getImagenContentType()).isEqualTo(DEFAULT_IMAGEN_CONTENT_TYPE);
        assertThat(testMensajes.getFechaVisto()).isEqualTo(DEFAULT_FECHA_VISTO);
    }

    @Test
    @Transactional
    public void createMensajesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mensajesRepository.findAll().size();

        // Create the Mensajes with an existing ID
        mensajes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMensajesMockMvc.perform(post("/api/mensajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mensajes)))
            .andExpect(status().isBadRequest());

        // Validate the Mensajes in the database
        List<Mensajes> mensajesList = mensajesRepository.findAll();
        assertThat(mensajesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMensajes() throws Exception {
        // Initialize the database
        mensajesRepository.saveAndFlush(mensajes);

        // Get all the mensajesList
        restMensajesMockMvc.perform(get("/api/mensajes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mensajes.getId().intValue())))
            .andExpect(jsonPath("$.[*].texto").value(hasItem(DEFAULT_TEXTO.toString())))
            .andExpect(jsonPath("$.[*].imagenContentType").value(hasItem(DEFAULT_IMAGEN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN))))
            .andExpect(jsonPath("$.[*].fechaVisto").value(hasItem(DEFAULT_FECHA_VISTO.toString())));
    }
    
    @Test
    @Transactional
    public void getMensajes() throws Exception {
        // Initialize the database
        mensajesRepository.saveAndFlush(mensajes);

        // Get the mensajes
        restMensajesMockMvc.perform(get("/api/mensajes/{id}", mensajes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mensajes.getId().intValue()))
            .andExpect(jsonPath("$.texto").value(DEFAULT_TEXTO.toString()))
            .andExpect(jsonPath("$.imagenContentType").value(DEFAULT_IMAGEN_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagen").value(Base64Utils.encodeToString(DEFAULT_IMAGEN)))
            .andExpect(jsonPath("$.fechaVisto").value(DEFAULT_FECHA_VISTO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMensajes() throws Exception {
        // Get the mensajes
        restMensajesMockMvc.perform(get("/api/mensajes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMensajes() throws Exception {
        // Initialize the database
        mensajesRepository.saveAndFlush(mensajes);

        int databaseSizeBeforeUpdate = mensajesRepository.findAll().size();

        // Update the mensajes
        Mensajes updatedMensajes = mensajesRepository.findById(mensajes.getId()).get();
        // Disconnect from session so that the updates on updatedMensajes are not directly saved in db
        em.detach(updatedMensajes);
        updatedMensajes
            .texto(UPDATED_TEXTO)
            .imagen(UPDATED_IMAGEN)
            .imagenContentType(UPDATED_IMAGEN_CONTENT_TYPE)
            .fechaVisto(UPDATED_FECHA_VISTO);

        restMensajesMockMvc.perform(put("/api/mensajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMensajes)))
            .andExpect(status().isOk());

        // Validate the Mensajes in the database
        List<Mensajes> mensajesList = mensajesRepository.findAll();
        assertThat(mensajesList).hasSize(databaseSizeBeforeUpdate);
        Mensajes testMensajes = mensajesList.get(mensajesList.size() - 1);
        assertThat(testMensajes.getTexto()).isEqualTo(UPDATED_TEXTO);
        assertThat(testMensajes.getImagen()).isEqualTo(UPDATED_IMAGEN);
        assertThat(testMensajes.getImagenContentType()).isEqualTo(UPDATED_IMAGEN_CONTENT_TYPE);
        assertThat(testMensajes.getFechaVisto()).isEqualTo(UPDATED_FECHA_VISTO);
    }

    @Test
    @Transactional
    public void updateNonExistingMensajes() throws Exception {
        int databaseSizeBeforeUpdate = mensajesRepository.findAll().size();

        // Create the Mensajes

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMensajesMockMvc.perform(put("/api/mensajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mensajes)))
            .andExpect(status().isBadRequest());

        // Validate the Mensajes in the database
        List<Mensajes> mensajesList = mensajesRepository.findAll();
        assertThat(mensajesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMensajes() throws Exception {
        // Initialize the database
        mensajesRepository.saveAndFlush(mensajes);

        int databaseSizeBeforeDelete = mensajesRepository.findAll().size();

        // Get the mensajes
        restMensajesMockMvc.perform(delete("/api/mensajes/{id}", mensajes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Mensajes> mensajesList = mensajesRepository.findAll();
        assertThat(mensajesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mensajes.class);
        Mensajes mensajes1 = new Mensajes();
        mensajes1.setId(1L);
        Mensajes mensajes2 = new Mensajes();
        mensajes2.setId(mensajes1.getId());
        assertThat(mensajes1).isEqualTo(mensajes2);
        mensajes2.setId(2L);
        assertThat(mensajes1).isNotEqualTo(mensajes2);
        mensajes1.setId(null);
        assertThat(mensajes1).isNotEqualTo(mensajes2);
    }
}
