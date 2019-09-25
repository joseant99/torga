package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Puertas;
import com.torga.pedidos.repository.PuertasRepository;
import com.torga.pedidos.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
import java.util.ArrayList;
import java.util.List;


import static com.torga.pedidos.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PuertasResource REST controller.
 *
 * @see PuertasResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class PuertasResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGEN = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEN = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGEN_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEN_CONTENT_TYPE = "image/png";

    @Autowired
    private PuertasRepository puertasRepository;

    @Mock
    private PuertasRepository puertasRepositoryMock;

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

    private MockMvc restPuertasMockMvc;

    private Puertas puertas;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PuertasResource puertasResource = new PuertasResource(puertasRepository);
        this.restPuertasMockMvc = MockMvcBuilders.standaloneSetup(puertasResource)
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
    public static Puertas createEntity(EntityManager em) {
        Puertas puertas = new Puertas()
            .nombre(DEFAULT_NOMBRE)
            .imagen(DEFAULT_IMAGEN)
            .imagenContentType(DEFAULT_IMAGEN_CONTENT_TYPE);
        return puertas;
    }

    @Before
    public void initTest() {
        puertas = createEntity(em);
    }

    @Test
    @Transactional
    public void createPuertas() throws Exception {
        int databaseSizeBeforeCreate = puertasRepository.findAll().size();

        // Create the Puertas
        restPuertasMockMvc.perform(post("/api/puertas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(puertas)))
            .andExpect(status().isCreated());

        // Validate the Puertas in the database
        List<Puertas> puertasList = puertasRepository.findAll();
        assertThat(puertasList).hasSize(databaseSizeBeforeCreate + 1);
        Puertas testPuertas = puertasList.get(puertasList.size() - 1);
        assertThat(testPuertas.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testPuertas.getImagen()).isEqualTo(DEFAULT_IMAGEN);
        assertThat(testPuertas.getImagenContentType()).isEqualTo(DEFAULT_IMAGEN_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createPuertasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = puertasRepository.findAll().size();

        // Create the Puertas with an existing ID
        puertas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPuertasMockMvc.perform(post("/api/puertas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(puertas)))
            .andExpect(status().isBadRequest());

        // Validate the Puertas in the database
        List<Puertas> puertasList = puertasRepository.findAll();
        assertThat(puertasList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPuertas() throws Exception {
        // Initialize the database
        puertasRepository.saveAndFlush(puertas);

        // Get all the puertasList
        restPuertasMockMvc.perform(get("/api/puertas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(puertas.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].imagenContentType").value(hasItem(DEFAULT_IMAGEN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN))));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllPuertasWithEagerRelationshipsIsEnabled() throws Exception {
        PuertasResource puertasResource = new PuertasResource(puertasRepositoryMock);
        when(puertasRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restPuertasMockMvc = MockMvcBuilders.standaloneSetup(puertasResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPuertasMockMvc.perform(get("/api/puertas?eagerload=true"))
        .andExpect(status().isOk());

        verify(puertasRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllPuertasWithEagerRelationshipsIsNotEnabled() throws Exception {
        PuertasResource puertasResource = new PuertasResource(puertasRepositoryMock);
            when(puertasRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restPuertasMockMvc = MockMvcBuilders.standaloneSetup(puertasResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPuertasMockMvc.perform(get("/api/puertas?eagerload=true"))
        .andExpect(status().isOk());

            verify(puertasRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getPuertas() throws Exception {
        // Initialize the database
        puertasRepository.saveAndFlush(puertas);

        // Get the puertas
        restPuertasMockMvc.perform(get("/api/puertas/{id}", puertas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(puertas.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.imagenContentType").value(DEFAULT_IMAGEN_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagen").value(Base64Utils.encodeToString(DEFAULT_IMAGEN)));
    }

    @Test
    @Transactional
    public void getNonExistingPuertas() throws Exception {
        // Get the puertas
        restPuertasMockMvc.perform(get("/api/puertas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePuertas() throws Exception {
        // Initialize the database
        puertasRepository.saveAndFlush(puertas);

        int databaseSizeBeforeUpdate = puertasRepository.findAll().size();

        // Update the puertas
        Puertas updatedPuertas = puertasRepository.findById(puertas.getId()).get();
        // Disconnect from session so that the updates on updatedPuertas are not directly saved in db
        em.detach(updatedPuertas);
        updatedPuertas
            .nombre(UPDATED_NOMBRE)
            .imagen(UPDATED_IMAGEN)
            .imagenContentType(UPDATED_IMAGEN_CONTENT_TYPE);

        restPuertasMockMvc.perform(put("/api/puertas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPuertas)))
            .andExpect(status().isOk());

        // Validate the Puertas in the database
        List<Puertas> puertasList = puertasRepository.findAll();
        assertThat(puertasList).hasSize(databaseSizeBeforeUpdate);
        Puertas testPuertas = puertasList.get(puertasList.size() - 1);
        assertThat(testPuertas.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPuertas.getImagen()).isEqualTo(UPDATED_IMAGEN);
        assertThat(testPuertas.getImagenContentType()).isEqualTo(UPDATED_IMAGEN_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingPuertas() throws Exception {
        int databaseSizeBeforeUpdate = puertasRepository.findAll().size();

        // Create the Puertas

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPuertasMockMvc.perform(put("/api/puertas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(puertas)))
            .andExpect(status().isBadRequest());

        // Validate the Puertas in the database
        List<Puertas> puertasList = puertasRepository.findAll();
        assertThat(puertasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePuertas() throws Exception {
        // Initialize the database
        puertasRepository.saveAndFlush(puertas);

        int databaseSizeBeforeDelete = puertasRepository.findAll().size();

        // Get the puertas
        restPuertasMockMvc.perform(delete("/api/puertas/{id}", puertas.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Puertas> puertasList = puertasRepository.findAll();
        assertThat(puertasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Puertas.class);
        Puertas puertas1 = new Puertas();
        puertas1.setId(1L);
        Puertas puertas2 = new Puertas();
        puertas2.setId(puertas1.getId());
        assertThat(puertas1).isEqualTo(puertas2);
        puertas2.setId(2L);
        assertThat(puertas1).isNotEqualTo(puertas2);
        puertas1.setId(null);
        assertThat(puertas1).isNotEqualTo(puertas2);
    }
}
