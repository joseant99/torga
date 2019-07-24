package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.CategoriasDormi;
import com.torga.pedidos.repository.CategoriasDormiRepository;
import com.torga.pedidos.service.CategoriasDormiService;
import com.torga.pedidos.service.dto.CategoriasDormiDTO;
import com.torga.pedidos.service.mapper.CategoriasDormiMapper;
import com.torga.pedidos.web.rest.errors.ExceptionTranslator;
import com.torga.pedidos.service.dto.CategoriasDormiCriteria;
import com.torga.pedidos.service.CategoriasDormiQueryService;

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
 * Test class for the CategoriasDormiResource REST controller.
 *
 * @see CategoriasDormiResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class CategoriasDormiResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private CategoriasDormiRepository categoriasDormiRepository;

    @Autowired
    private CategoriasDormiMapper categoriasDormiMapper;

    @Autowired
    private CategoriasDormiService categoriasDormiService;

    @Autowired
    private CategoriasDormiQueryService categoriasDormiQueryService;

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

    private MockMvc restCategoriasDormiMockMvc;

    private CategoriasDormi categoriasDormi;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CategoriasDormiResource categoriasDormiResource = new CategoriasDormiResource(categoriasDormiService, categoriasDormiQueryService);
        this.restCategoriasDormiMockMvc = MockMvcBuilders.standaloneSetup(categoriasDormiResource)
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
    public static CategoriasDormi createEntity(EntityManager em) {
        CategoriasDormi categoriasDormi = new CategoriasDormi()
            .nombre(DEFAULT_NOMBRE);
        return categoriasDormi;
    }

    @Before
    public void initTest() {
        categoriasDormi = createEntity(em);
    }

    @Test
    @Transactional
    public void createCategoriasDormi() throws Exception {
        int databaseSizeBeforeCreate = categoriasDormiRepository.findAll().size();

        // Create the CategoriasDormi
        CategoriasDormiDTO categoriasDormiDTO = categoriasDormiMapper.toDto(categoriasDormi);
        restCategoriasDormiMockMvc.perform(post("/api/categorias-dormis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriasDormiDTO)))
            .andExpect(status().isCreated());

        // Validate the CategoriasDormi in the database
        List<CategoriasDormi> categoriasDormiList = categoriasDormiRepository.findAll();
        assertThat(categoriasDormiList).hasSize(databaseSizeBeforeCreate + 1);
        CategoriasDormi testCategoriasDormi = categoriasDormiList.get(categoriasDormiList.size() - 1);
        assertThat(testCategoriasDormi.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createCategoriasDormiWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = categoriasDormiRepository.findAll().size();

        // Create the CategoriasDormi with an existing ID
        categoriasDormi.setId(1L);
        CategoriasDormiDTO categoriasDormiDTO = categoriasDormiMapper.toDto(categoriasDormi);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCategoriasDormiMockMvc.perform(post("/api/categorias-dormis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriasDormiDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CategoriasDormi in the database
        List<CategoriasDormi> categoriasDormiList = categoriasDormiRepository.findAll();
        assertThat(categoriasDormiList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCategoriasDormis() throws Exception {
        // Initialize the database
        categoriasDormiRepository.saveAndFlush(categoriasDormi);

        // Get all the categoriasDormiList
        restCategoriasDormiMockMvc.perform(get("/api/categorias-dormis?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(categoriasDormi.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }
    
    @Test
    @Transactional
    public void getCategoriasDormi() throws Exception {
        // Initialize the database
        categoriasDormiRepository.saveAndFlush(categoriasDormi);

        // Get the categoriasDormi
        restCategoriasDormiMockMvc.perform(get("/api/categorias-dormis/{id}", categoriasDormi.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(categoriasDormi.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()));
    }

    @Test
    @Transactional
    public void getAllCategoriasDormisByNombreIsEqualToSomething() throws Exception {
        // Initialize the database
        categoriasDormiRepository.saveAndFlush(categoriasDormi);

        // Get all the categoriasDormiList where nombre equals to DEFAULT_NOMBRE
        defaultCategoriasDormiShouldBeFound("nombre.equals=" + DEFAULT_NOMBRE);

        // Get all the categoriasDormiList where nombre equals to UPDATED_NOMBRE
        defaultCategoriasDormiShouldNotBeFound("nombre.equals=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void getAllCategoriasDormisByNombreIsInShouldWork() throws Exception {
        // Initialize the database
        categoriasDormiRepository.saveAndFlush(categoriasDormi);

        // Get all the categoriasDormiList where nombre in DEFAULT_NOMBRE or UPDATED_NOMBRE
        defaultCategoriasDormiShouldBeFound("nombre.in=" + DEFAULT_NOMBRE + "," + UPDATED_NOMBRE);

        // Get all the categoriasDormiList where nombre equals to UPDATED_NOMBRE
        defaultCategoriasDormiShouldNotBeFound("nombre.in=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void getAllCategoriasDormisByNombreIsNullOrNotNull() throws Exception {
        // Initialize the database
        categoriasDormiRepository.saveAndFlush(categoriasDormi);

        // Get all the categoriasDormiList where nombre is not null
        defaultCategoriasDormiShouldBeFound("nombre.specified=true");

        // Get all the categoriasDormiList where nombre is null
        defaultCategoriasDormiShouldNotBeFound("nombre.specified=false");
    }
    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultCategoriasDormiShouldBeFound(String filter) throws Exception {
        restCategoriasDormiMockMvc.perform(get("/api/categorias-dormis?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(categoriasDormi.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));

        // Check, that the count call also returns 1
        restCategoriasDormiMockMvc.perform(get("/api/categorias-dormis/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultCategoriasDormiShouldNotBeFound(String filter) throws Exception {
        restCategoriasDormiMockMvc.perform(get("/api/categorias-dormis?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restCategoriasDormiMockMvc.perform(get("/api/categorias-dormis/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingCategoriasDormi() throws Exception {
        // Get the categoriasDormi
        restCategoriasDormiMockMvc.perform(get("/api/categorias-dormis/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCategoriasDormi() throws Exception {
        // Initialize the database
        categoriasDormiRepository.saveAndFlush(categoriasDormi);

        int databaseSizeBeforeUpdate = categoriasDormiRepository.findAll().size();

        // Update the categoriasDormi
        CategoriasDormi updatedCategoriasDormi = categoriasDormiRepository.findById(categoriasDormi.getId()).get();
        // Disconnect from session so that the updates on updatedCategoriasDormi are not directly saved in db
        em.detach(updatedCategoriasDormi);
        updatedCategoriasDormi
            .nombre(UPDATED_NOMBRE);
        CategoriasDormiDTO categoriasDormiDTO = categoriasDormiMapper.toDto(updatedCategoriasDormi);

        restCategoriasDormiMockMvc.perform(put("/api/categorias-dormis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriasDormiDTO)))
            .andExpect(status().isOk());

        // Validate the CategoriasDormi in the database
        List<CategoriasDormi> categoriasDormiList = categoriasDormiRepository.findAll();
        assertThat(categoriasDormiList).hasSize(databaseSizeBeforeUpdate);
        CategoriasDormi testCategoriasDormi = categoriasDormiList.get(categoriasDormiList.size() - 1);
        assertThat(testCategoriasDormi.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingCategoriasDormi() throws Exception {
        int databaseSizeBeforeUpdate = categoriasDormiRepository.findAll().size();

        // Create the CategoriasDormi
        CategoriasDormiDTO categoriasDormiDTO = categoriasDormiMapper.toDto(categoriasDormi);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCategoriasDormiMockMvc.perform(put("/api/categorias-dormis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriasDormiDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CategoriasDormi in the database
        List<CategoriasDormi> categoriasDormiList = categoriasDormiRepository.findAll();
        assertThat(categoriasDormiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCategoriasDormi() throws Exception {
        // Initialize the database
        categoriasDormiRepository.saveAndFlush(categoriasDormi);

        int databaseSizeBeforeDelete = categoriasDormiRepository.findAll().size();

        // Get the categoriasDormi
        restCategoriasDormiMockMvc.perform(delete("/api/categorias-dormis/{id}", categoriasDormi.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CategoriasDormi> categoriasDormiList = categoriasDormiRepository.findAll();
        assertThat(categoriasDormiList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CategoriasDormi.class);
        CategoriasDormi categoriasDormi1 = new CategoriasDormi();
        categoriasDormi1.setId(1L);
        CategoriasDormi categoriasDormi2 = new CategoriasDormi();
        categoriasDormi2.setId(categoriasDormi1.getId());
        assertThat(categoriasDormi1).isEqualTo(categoriasDormi2);
        categoriasDormi2.setId(2L);
        assertThat(categoriasDormi1).isNotEqualTo(categoriasDormi2);
        categoriasDormi1.setId(null);
        assertThat(categoriasDormi1).isNotEqualTo(categoriasDormi2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CategoriasDormiDTO.class);
        CategoriasDormiDTO categoriasDormiDTO1 = new CategoriasDormiDTO();
        categoriasDormiDTO1.setId(1L);
        CategoriasDormiDTO categoriasDormiDTO2 = new CategoriasDormiDTO();
        assertThat(categoriasDormiDTO1).isNotEqualTo(categoriasDormiDTO2);
        categoriasDormiDTO2.setId(categoriasDormiDTO1.getId());
        assertThat(categoriasDormiDTO1).isEqualTo(categoriasDormiDTO2);
        categoriasDormiDTO2.setId(2L);
        assertThat(categoriasDormiDTO1).isNotEqualTo(categoriasDormiDTO2);
        categoriasDormiDTO1.setId(null);
        assertThat(categoriasDormiDTO1).isNotEqualTo(categoriasDormiDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(categoriasDormiMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(categoriasDormiMapper.fromId(null)).isNull();
    }
}
