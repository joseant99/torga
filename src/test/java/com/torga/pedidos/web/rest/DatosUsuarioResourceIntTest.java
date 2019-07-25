package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.DatosUsuario;
import com.torga.pedidos.repository.DatosUsuarioRepository;
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
 * Test class for the DatosUsuarioResource REST controller.
 *
 * @see DatosUsuarioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class DatosUsuarioResourceIntTest {

    private static final String DEFAULT_NOMBRE_COMPLETO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_COMPLETO = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE_COMERCIAL = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_COMERCIAL = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final String DEFAULT_COD_POSTAL = "AAAAAAAAAA";
    private static final String UPDATED_COD_POSTAL = "BBBBBBBBBB";

    private static final byte[] DEFAULT_LOGO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_LOGO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_LOGO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_LOGO_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_CIF = "AAAAAAAAAA";
    private static final String UPDATED_CIF = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE_FISCAL = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_FISCAL = "BBBBBBBBBB";

    @Autowired
    private DatosUsuarioRepository datosUsuarioRepository;

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

    private MockMvc restDatosUsuarioMockMvc;

    private DatosUsuario datosUsuario;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DatosUsuarioResource datosUsuarioResource = new DatosUsuarioResource(datosUsuarioRepository);
        this.restDatosUsuarioMockMvc = MockMvcBuilders.standaloneSetup(datosUsuarioResource)
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
    public static DatosUsuario createEntity(EntityManager em) {
        DatosUsuario datosUsuario = new DatosUsuario()
            .nombreCompleto(DEFAULT_NOMBRE_COMPLETO)
            .email(DEFAULT_EMAIL)
            .telefono(DEFAULT_TELEFONO)
            .nombreComercial(DEFAULT_NOMBRE_COMERCIAL)
            .direccion(DEFAULT_DIRECCION)
            .codPostal(DEFAULT_COD_POSTAL)
            .logo(DEFAULT_LOGO)
            .logoContentType(DEFAULT_LOGO_CONTENT_TYPE)
            .cif(DEFAULT_CIF)
            .nombreFiscal(DEFAULT_NOMBRE_FISCAL);
        return datosUsuario;
    }

    @Before
    public void initTest() {
        datosUsuario = createEntity(em);
    }

    @Test
    @Transactional
    public void createDatosUsuario() throws Exception {
        int databaseSizeBeforeCreate = datosUsuarioRepository.findAll().size();

        // Create the DatosUsuario
        restDatosUsuarioMockMvc.perform(post("/api/datos-usuarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(datosUsuario)))
            .andExpect(status().isCreated());

        // Validate the DatosUsuario in the database
        List<DatosUsuario> datosUsuarioList = datosUsuarioRepository.findAll();
        assertThat(datosUsuarioList).hasSize(databaseSizeBeforeCreate + 1);
        DatosUsuario testDatosUsuario = datosUsuarioList.get(datosUsuarioList.size() - 1);
        assertThat(testDatosUsuario.getNombreCompleto()).isEqualTo(DEFAULT_NOMBRE_COMPLETO);
        assertThat(testDatosUsuario.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testDatosUsuario.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testDatosUsuario.getNombreComercial()).isEqualTo(DEFAULT_NOMBRE_COMERCIAL);
        assertThat(testDatosUsuario.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
        assertThat(testDatosUsuario.getCodPostal()).isEqualTo(DEFAULT_COD_POSTAL);
        assertThat(testDatosUsuario.getLogo()).isEqualTo(DEFAULT_LOGO);
        assertThat(testDatosUsuario.getLogoContentType()).isEqualTo(DEFAULT_LOGO_CONTENT_TYPE);
        assertThat(testDatosUsuario.getCif()).isEqualTo(DEFAULT_CIF);
        assertThat(testDatosUsuario.getNombreFiscal()).isEqualTo(DEFAULT_NOMBRE_FISCAL);
    }

    @Test
    @Transactional
    public void createDatosUsuarioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = datosUsuarioRepository.findAll().size();

        // Create the DatosUsuario with an existing ID
        datosUsuario.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDatosUsuarioMockMvc.perform(post("/api/datos-usuarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(datosUsuario)))
            .andExpect(status().isBadRequest());

        // Validate the DatosUsuario in the database
        List<DatosUsuario> datosUsuarioList = datosUsuarioRepository.findAll();
        assertThat(datosUsuarioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDatosUsuarios() throws Exception {
        // Initialize the database
        datosUsuarioRepository.saveAndFlush(datosUsuario);

        // Get all the datosUsuarioList
        restDatosUsuarioMockMvc.perform(get("/api/datos-usuarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(datosUsuario.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreCompleto").value(hasItem(DEFAULT_NOMBRE_COMPLETO.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].nombreComercial").value(hasItem(DEFAULT_NOMBRE_COMERCIAL.toString())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].codPostal").value(hasItem(DEFAULT_COD_POSTAL.toString())))
            .andExpect(jsonPath("$.[*].logoContentType").value(hasItem(DEFAULT_LOGO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGO))))
            .andExpect(jsonPath("$.[*].cif").value(hasItem(DEFAULT_CIF.toString())))
            .andExpect(jsonPath("$.[*].nombreFiscal").value(hasItem(DEFAULT_NOMBRE_FISCAL.toString())));
    }
    
    @Test
    @Transactional
    public void getDatosUsuario() throws Exception {
        // Initialize the database
        datosUsuarioRepository.saveAndFlush(datosUsuario);

        // Get the datosUsuario
        restDatosUsuarioMockMvc.perform(get("/api/datos-usuarios/{id}", datosUsuario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(datosUsuario.getId().intValue()))
            .andExpect(jsonPath("$.nombreCompleto").value(DEFAULT_NOMBRE_COMPLETO.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO.toString()))
            .andExpect(jsonPath("$.nombreComercial").value(DEFAULT_NOMBRE_COMERCIAL.toString()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION.toString()))
            .andExpect(jsonPath("$.codPostal").value(DEFAULT_COD_POSTAL.toString()))
            .andExpect(jsonPath("$.logoContentType").value(DEFAULT_LOGO_CONTENT_TYPE))
            .andExpect(jsonPath("$.logo").value(Base64Utils.encodeToString(DEFAULT_LOGO)))
            .andExpect(jsonPath("$.cif").value(DEFAULT_CIF.toString()))
            .andExpect(jsonPath("$.nombreFiscal").value(DEFAULT_NOMBRE_FISCAL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDatosUsuario() throws Exception {
        // Get the datosUsuario
        restDatosUsuarioMockMvc.perform(get("/api/datos-usuarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDatosUsuario() throws Exception {
        // Initialize the database
        datosUsuarioRepository.saveAndFlush(datosUsuario);

        int databaseSizeBeforeUpdate = datosUsuarioRepository.findAll().size();

        // Update the datosUsuario
        DatosUsuario updatedDatosUsuario = datosUsuarioRepository.findById(datosUsuario.getId()).get();
        // Disconnect from session so that the updates on updatedDatosUsuario are not directly saved in db
        em.detach(updatedDatosUsuario);
        updatedDatosUsuario
            .nombreCompleto(UPDATED_NOMBRE_COMPLETO)
            .email(UPDATED_EMAIL)
            .telefono(UPDATED_TELEFONO)
            .nombreComercial(UPDATED_NOMBRE_COMERCIAL)
            .direccion(UPDATED_DIRECCION)
            .codPostal(UPDATED_COD_POSTAL)
            .logo(UPDATED_LOGO)
            .logoContentType(UPDATED_LOGO_CONTENT_TYPE)
            .cif(UPDATED_CIF)
            .nombreFiscal(UPDATED_NOMBRE_FISCAL);

        restDatosUsuarioMockMvc.perform(put("/api/datos-usuarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDatosUsuario)))
            .andExpect(status().isOk());

        // Validate the DatosUsuario in the database
        List<DatosUsuario> datosUsuarioList = datosUsuarioRepository.findAll();
        assertThat(datosUsuarioList).hasSize(databaseSizeBeforeUpdate);
        DatosUsuario testDatosUsuario = datosUsuarioList.get(datosUsuarioList.size() - 1);
        assertThat(testDatosUsuario.getNombreCompleto()).isEqualTo(UPDATED_NOMBRE_COMPLETO);
        assertThat(testDatosUsuario.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testDatosUsuario.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testDatosUsuario.getNombreComercial()).isEqualTo(UPDATED_NOMBRE_COMERCIAL);
        assertThat(testDatosUsuario.getDireccion()).isEqualTo(UPDATED_DIRECCION);
        assertThat(testDatosUsuario.getCodPostal()).isEqualTo(UPDATED_COD_POSTAL);
        assertThat(testDatosUsuario.getLogo()).isEqualTo(UPDATED_LOGO);
        assertThat(testDatosUsuario.getLogoContentType()).isEqualTo(UPDATED_LOGO_CONTENT_TYPE);
        assertThat(testDatosUsuario.getCif()).isEqualTo(UPDATED_CIF);
        assertThat(testDatosUsuario.getNombreFiscal()).isEqualTo(UPDATED_NOMBRE_FISCAL);
    }

    @Test
    @Transactional
    public void updateNonExistingDatosUsuario() throws Exception {
        int databaseSizeBeforeUpdate = datosUsuarioRepository.findAll().size();

        // Create the DatosUsuario

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDatosUsuarioMockMvc.perform(put("/api/datos-usuarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(datosUsuario)))
            .andExpect(status().isBadRequest());

        // Validate the DatosUsuario in the database
        List<DatosUsuario> datosUsuarioList = datosUsuarioRepository.findAll();
        assertThat(datosUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDatosUsuario() throws Exception {
        // Initialize the database
        datosUsuarioRepository.saveAndFlush(datosUsuario);

        int databaseSizeBeforeDelete = datosUsuarioRepository.findAll().size();

        // Get the datosUsuario
        restDatosUsuarioMockMvc.perform(delete("/api/datos-usuarios/{id}", datosUsuario.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DatosUsuario> datosUsuarioList = datosUsuarioRepository.findAll();
        assertThat(datosUsuarioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DatosUsuario.class);
        DatosUsuario datosUsuario1 = new DatosUsuario();
        datosUsuario1.setId(1L);
        DatosUsuario datosUsuario2 = new DatosUsuario();
        datosUsuario2.setId(datosUsuario1.getId());
        assertThat(datosUsuario1).isEqualTo(datosUsuario2);
        datosUsuario2.setId(2L);
        assertThat(datosUsuario1).isNotEqualTo(datosUsuario2);
        datosUsuario1.setId(null);
        assertThat(datosUsuario1).isNotEqualTo(datosUsuario2);
    }
}
