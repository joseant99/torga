package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Armario;
import com.torga.pedidos.repository.ArmarioRepository;
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
 * Test class for the ArmarioResource REST controller.
 *
 * @see ArmarioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class ArmarioResourceIntTest {

    private static final String DEFAULT_MENSAJE = "AAAAAAAAAA";
    private static final String UPDATED_MENSAJE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGEN = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEN = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGEN_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEN_CONTENT_TYPE = "image/png";

    private static final Float DEFAULT_NUMERO_PUERTAS = 1F;
    private static final Float UPDATED_NUMERO_PUERTAS = 2F;

    private static final Float DEFAULT_ANCHO_MIN = 1F;
    private static final Float UPDATED_ANCHO_MIN = 2F;

    private static final Float DEFAULT_ANCHO_MAX = 1F;
    private static final Float UPDATED_ANCHO_MAX = 2F;

    private static final Float DEFAULT_NUM_COSTADO = 1F;
    private static final Float UPDATED_NUM_COSTADO = 2F;

    @Autowired
    private ArmarioRepository armarioRepository;

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

    private MockMvc restArmarioMockMvc;

    private Armario armario;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArmarioResource armarioResource = new ArmarioResource(armarioRepository);
        this.restArmarioMockMvc = MockMvcBuilders.standaloneSetup(armarioResource)
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
    public static Armario createEntity(EntityManager em) {
        Armario armario = new Armario()
            .mensaje(DEFAULT_MENSAJE)
            .imagen(DEFAULT_IMAGEN)
            .imagenContentType(DEFAULT_IMAGEN_CONTENT_TYPE)
            .numeroPuertas(DEFAULT_NUMERO_PUERTAS)
            .anchoMin(DEFAULT_ANCHO_MIN)
            .anchoMax(DEFAULT_ANCHO_MAX)
            .numCostado(DEFAULT_NUM_COSTADO);
        return armario;
    }

    @Before
    public void initTest() {
        armario = createEntity(em);
    }

    @Test
    @Transactional
    public void createArmario() throws Exception {
        int databaseSizeBeforeCreate = armarioRepository.findAll().size();

        // Create the Armario
        restArmarioMockMvc.perform(post("/api/armarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(armario)))
            .andExpect(status().isCreated());

        // Validate the Armario in the database
        List<Armario> armarioList = armarioRepository.findAll();
        assertThat(armarioList).hasSize(databaseSizeBeforeCreate + 1);
        Armario testArmario = armarioList.get(armarioList.size() - 1);
        assertThat(testArmario.getMensaje()).isEqualTo(DEFAULT_MENSAJE);
        assertThat(testArmario.getImagen()).isEqualTo(DEFAULT_IMAGEN);
        assertThat(testArmario.getImagenContentType()).isEqualTo(DEFAULT_IMAGEN_CONTENT_TYPE);
        assertThat(testArmario.getNumeroPuertas()).isEqualTo(DEFAULT_NUMERO_PUERTAS);
        assertThat(testArmario.getAnchoMin()).isEqualTo(DEFAULT_ANCHO_MIN);
        assertThat(testArmario.getAnchoMax()).isEqualTo(DEFAULT_ANCHO_MAX);
        assertThat(testArmario.getNumCostado()).isEqualTo(DEFAULT_NUM_COSTADO);
    }

    @Test
    @Transactional
    public void createArmarioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = armarioRepository.findAll().size();

        // Create the Armario with an existing ID
        armario.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArmarioMockMvc.perform(post("/api/armarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(armario)))
            .andExpect(status().isBadRequest());

        // Validate the Armario in the database
        List<Armario> armarioList = armarioRepository.findAll();
        assertThat(armarioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllArmarios() throws Exception {
        // Initialize the database
        armarioRepository.saveAndFlush(armario);

        // Get all the armarioList
        restArmarioMockMvc.perform(get("/api/armarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(armario.getId().intValue())))
            .andExpect(jsonPath("$.[*].mensaje").value(hasItem(DEFAULT_MENSAJE.toString())))
            .andExpect(jsonPath("$.[*].imagenContentType").value(hasItem(DEFAULT_IMAGEN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN))))
            .andExpect(jsonPath("$.[*].numeroPuertas").value(hasItem(DEFAULT_NUMERO_PUERTAS.doubleValue())))
            .andExpect(jsonPath("$.[*].anchoMin").value(hasItem(DEFAULT_ANCHO_MIN.doubleValue())))
            .andExpect(jsonPath("$.[*].anchoMax").value(hasItem(DEFAULT_ANCHO_MAX.doubleValue())))
            .andExpect(jsonPath("$.[*].numCostado").value(hasItem(DEFAULT_NUM_COSTADO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getArmario() throws Exception {
        // Initialize the database
        armarioRepository.saveAndFlush(armario);

        // Get the armario
        restArmarioMockMvc.perform(get("/api/armarios/{id}", armario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(armario.getId().intValue()))
            .andExpect(jsonPath("$.mensaje").value(DEFAULT_MENSAJE.toString()))
            .andExpect(jsonPath("$.imagenContentType").value(DEFAULT_IMAGEN_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagen").value(Base64Utils.encodeToString(DEFAULT_IMAGEN)))
            .andExpect(jsonPath("$.numeroPuertas").value(DEFAULT_NUMERO_PUERTAS.doubleValue()))
            .andExpect(jsonPath("$.anchoMin").value(DEFAULT_ANCHO_MIN.doubleValue()))
            .andExpect(jsonPath("$.anchoMax").value(DEFAULT_ANCHO_MAX.doubleValue()))
            .andExpect(jsonPath("$.numCostado").value(DEFAULT_NUM_COSTADO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingArmario() throws Exception {
        // Get the armario
        restArmarioMockMvc.perform(get("/api/armarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArmario() throws Exception {
        // Initialize the database
        armarioRepository.saveAndFlush(armario);

        int databaseSizeBeforeUpdate = armarioRepository.findAll().size();

        // Update the armario
        Armario updatedArmario = armarioRepository.findById(armario.getId()).get();
        // Disconnect from session so that the updates on updatedArmario are not directly saved in db
        em.detach(updatedArmario);
        updatedArmario
            .mensaje(UPDATED_MENSAJE)
            .imagen(UPDATED_IMAGEN)
            .imagenContentType(UPDATED_IMAGEN_CONTENT_TYPE)
            .numeroPuertas(UPDATED_NUMERO_PUERTAS)
            .anchoMin(UPDATED_ANCHO_MIN)
            .anchoMax(UPDATED_ANCHO_MAX)
            .numCostado(UPDATED_NUM_COSTADO);

        restArmarioMockMvc.perform(put("/api/armarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedArmario)))
            .andExpect(status().isOk());

        // Validate the Armario in the database
        List<Armario> armarioList = armarioRepository.findAll();
        assertThat(armarioList).hasSize(databaseSizeBeforeUpdate);
        Armario testArmario = armarioList.get(armarioList.size() - 1);
        assertThat(testArmario.getMensaje()).isEqualTo(UPDATED_MENSAJE);
        assertThat(testArmario.getImagen()).isEqualTo(UPDATED_IMAGEN);
        assertThat(testArmario.getImagenContentType()).isEqualTo(UPDATED_IMAGEN_CONTENT_TYPE);
        assertThat(testArmario.getNumeroPuertas()).isEqualTo(UPDATED_NUMERO_PUERTAS);
        assertThat(testArmario.getAnchoMin()).isEqualTo(UPDATED_ANCHO_MIN);
        assertThat(testArmario.getAnchoMax()).isEqualTo(UPDATED_ANCHO_MAX);
        assertThat(testArmario.getNumCostado()).isEqualTo(UPDATED_NUM_COSTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingArmario() throws Exception {
        int databaseSizeBeforeUpdate = armarioRepository.findAll().size();

        // Create the Armario

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArmarioMockMvc.perform(put("/api/armarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(armario)))
            .andExpect(status().isBadRequest());

        // Validate the Armario in the database
        List<Armario> armarioList = armarioRepository.findAll();
        assertThat(armarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArmario() throws Exception {
        // Initialize the database
        armarioRepository.saveAndFlush(armario);

        int databaseSizeBeforeDelete = armarioRepository.findAll().size();

        // Get the armario
        restArmarioMockMvc.perform(delete("/api/armarios/{id}", armario.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Armario> armarioList = armarioRepository.findAll();
        assertThat(armarioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Armario.class);
        Armario armario1 = new Armario();
        armario1.setId(1L);
        Armario armario2 = new Armario();
        armario2.setId(armario1.getId());
        assertThat(armario1).isEqualTo(armario2);
        armario2.setId(2L);
        assertThat(armario1).isNotEqualTo(armario2);
        armario1.setId(null);
        assertThat(armario1).isNotEqualTo(armario2);
    }
}
