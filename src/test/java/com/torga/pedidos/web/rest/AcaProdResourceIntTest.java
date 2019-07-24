package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.AcaProd;
import com.torga.pedidos.domain.Acabados;
import com.torga.pedidos.domain.ProductosDormitorio;
import com.torga.pedidos.repository.AcaProdRepository;
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
 * Test class for the AcaProdResource REST controller.
 *
 * @see AcaProdResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class AcaProdResourceIntTest {

    private static final byte[] DEFAULT_IMAGEN = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEN = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGEN_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEN_CONTENT_TYPE = "image/png";

    @Autowired
    private AcaProdRepository acaProdRepository;

    @Mock
    private AcaProdRepository acaProdRepositoryMock;

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

    private MockMvc restAcaProdMockMvc;

    private AcaProd acaProd;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AcaProdResource acaProdResource = new AcaProdResource(acaProdRepository);
        this.restAcaProdMockMvc = MockMvcBuilders.standaloneSetup(acaProdResource)
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
    public static AcaProd createEntity(EntityManager em) {
        AcaProd acaProd = new AcaProd()
            .imagen(DEFAULT_IMAGEN)
            .imagenContentType(DEFAULT_IMAGEN_CONTENT_TYPE);
        // Add required entity
        Acabados acabados = AcabadosResourceIntTest.createEntity(em);
        em.persist(acabados);
        em.flush();
        acaProd.getAcabados().add(acabados);
        // Add required entity
        ProductosDormitorio productosDormitorio = ProductosDormitorioResourceIntTest.createEntity(em);
        em.persist(productosDormitorio);
        em.flush();
        acaProd.setProductosDormitorio(productosDormitorio);
        return acaProd;
    }

    @Before
    public void initTest() {
        acaProd = createEntity(em);
    }

    @Test
    @Transactional
    public void createAcaProd() throws Exception {
        int databaseSizeBeforeCreate = acaProdRepository.findAll().size();

        // Create the AcaProd
        restAcaProdMockMvc.perform(post("/api/aca-prods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acaProd)))
            .andExpect(status().isCreated());

        // Validate the AcaProd in the database
        List<AcaProd> acaProdList = acaProdRepository.findAll();
        assertThat(acaProdList).hasSize(databaseSizeBeforeCreate + 1);
        AcaProd testAcaProd = acaProdList.get(acaProdList.size() - 1);
        assertThat(testAcaProd.getImagen()).isEqualTo(DEFAULT_IMAGEN);
        assertThat(testAcaProd.getImagenContentType()).isEqualTo(DEFAULT_IMAGEN_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createAcaProdWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = acaProdRepository.findAll().size();

        // Create the AcaProd with an existing ID
        acaProd.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcaProdMockMvc.perform(post("/api/aca-prods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acaProd)))
            .andExpect(status().isBadRequest());

        // Validate the AcaProd in the database
        List<AcaProd> acaProdList = acaProdRepository.findAll();
        assertThat(acaProdList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAcaProds() throws Exception {
        // Initialize the database
        acaProdRepository.saveAndFlush(acaProd);

        // Get all the acaProdList
        restAcaProdMockMvc.perform(get("/api/aca-prods?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(acaProd.getId().intValue())))
            .andExpect(jsonPath("$.[*].imagenContentType").value(hasItem(DEFAULT_IMAGEN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN))));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllAcaProdsWithEagerRelationshipsIsEnabled() throws Exception {
        AcaProdResource acaProdResource = new AcaProdResource(acaProdRepositoryMock);
        when(acaProdRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restAcaProdMockMvc = MockMvcBuilders.standaloneSetup(acaProdResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAcaProdMockMvc.perform(get("/api/aca-prods?eagerload=true"))
        .andExpect(status().isOk());

        verify(acaProdRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllAcaProdsWithEagerRelationshipsIsNotEnabled() throws Exception {
        AcaProdResource acaProdResource = new AcaProdResource(acaProdRepositoryMock);
            when(acaProdRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restAcaProdMockMvc = MockMvcBuilders.standaloneSetup(acaProdResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAcaProdMockMvc.perform(get("/api/aca-prods?eagerload=true"))
        .andExpect(status().isOk());

            verify(acaProdRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getAcaProd() throws Exception {
        // Initialize the database
        acaProdRepository.saveAndFlush(acaProd);

        // Get the acaProd
        restAcaProdMockMvc.perform(get("/api/aca-prods/{id}", acaProd.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(acaProd.getId().intValue()))
            .andExpect(jsonPath("$.imagenContentType").value(DEFAULT_IMAGEN_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagen").value(Base64Utils.encodeToString(DEFAULT_IMAGEN)));
    }

    @Test
    @Transactional
    public void getNonExistingAcaProd() throws Exception {
        // Get the acaProd
        restAcaProdMockMvc.perform(get("/api/aca-prods/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAcaProd() throws Exception {
        // Initialize the database
        acaProdRepository.saveAndFlush(acaProd);

        int databaseSizeBeforeUpdate = acaProdRepository.findAll().size();

        // Update the acaProd
        AcaProd updatedAcaProd = acaProdRepository.findById(acaProd.getId()).get();
        // Disconnect from session so that the updates on updatedAcaProd are not directly saved in db
        em.detach(updatedAcaProd);
        updatedAcaProd
            .imagen(UPDATED_IMAGEN)
            .imagenContentType(UPDATED_IMAGEN_CONTENT_TYPE);

        restAcaProdMockMvc.perform(put("/api/aca-prods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAcaProd)))
            .andExpect(status().isOk());

        // Validate the AcaProd in the database
        List<AcaProd> acaProdList = acaProdRepository.findAll();
        assertThat(acaProdList).hasSize(databaseSizeBeforeUpdate);
        AcaProd testAcaProd = acaProdList.get(acaProdList.size() - 1);
        assertThat(testAcaProd.getImagen()).isEqualTo(UPDATED_IMAGEN);
        assertThat(testAcaProd.getImagenContentType()).isEqualTo(UPDATED_IMAGEN_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingAcaProd() throws Exception {
        int databaseSizeBeforeUpdate = acaProdRepository.findAll().size();

        // Create the AcaProd

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAcaProdMockMvc.perform(put("/api/aca-prods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acaProd)))
            .andExpect(status().isBadRequest());

        // Validate the AcaProd in the database
        List<AcaProd> acaProdList = acaProdRepository.findAll();
        assertThat(acaProdList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAcaProd() throws Exception {
        // Initialize the database
        acaProdRepository.saveAndFlush(acaProd);

        int databaseSizeBeforeDelete = acaProdRepository.findAll().size();

        // Get the acaProd
        restAcaProdMockMvc.perform(delete("/api/aca-prods/{id}", acaProd.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AcaProd> acaProdList = acaProdRepository.findAll();
        assertThat(acaProdList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AcaProd.class);
        AcaProd acaProd1 = new AcaProd();
        acaProd1.setId(1L);
        AcaProd acaProd2 = new AcaProd();
        acaProd2.setId(acaProd1.getId());
        assertThat(acaProd1).isEqualTo(acaProd2);
        acaProd2.setId(2L);
        assertThat(acaProd1).isNotEqualTo(acaProd2);
        acaProd1.setId(null);
        assertThat(acaProd1).isNotEqualTo(acaProd2);
    }
}
