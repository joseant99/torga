package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.IluminacionProdPrePed;
import com.torga.pedidos.repository.IluminacionProdPrePedRepository;
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
 * Test class for the IluminacionProdPrePedResource REST controller.
 *
 * @see IluminacionProdPrePedResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class IluminacionProdPrePedResourceIntTest {

    @Autowired
    private IluminacionProdPrePedRepository iluminacionProdPrePedRepository;

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

    private MockMvc restIluminacionProdPrePedMockMvc;

    private IluminacionProdPrePed iluminacionProdPrePed;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IluminacionProdPrePedResource iluminacionProdPrePedResource = new IluminacionProdPrePedResource(iluminacionProdPrePedRepository);
        this.restIluminacionProdPrePedMockMvc = MockMvcBuilders.standaloneSetup(iluminacionProdPrePedResource)
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
    public static IluminacionProdPrePed createEntity(EntityManager em) {
        IluminacionProdPrePed iluminacionProdPrePed = new IluminacionProdPrePed();
        return iluminacionProdPrePed;
    }

    @Before
    public void initTest() {
        iluminacionProdPrePed = createEntity(em);
    }

    @Test
    @Transactional
    public void createIluminacionProdPrePed() throws Exception {
        int databaseSizeBeforeCreate = iluminacionProdPrePedRepository.findAll().size();

        // Create the IluminacionProdPrePed
        restIluminacionProdPrePedMockMvc.perform(post("/api/iluminacion-prod-pre-peds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iluminacionProdPrePed)))
            .andExpect(status().isCreated());

        // Validate the IluminacionProdPrePed in the database
        List<IluminacionProdPrePed> iluminacionProdPrePedList = iluminacionProdPrePedRepository.findAll();
        assertThat(iluminacionProdPrePedList).hasSize(databaseSizeBeforeCreate + 1);
        IluminacionProdPrePed testIluminacionProdPrePed = iluminacionProdPrePedList.get(iluminacionProdPrePedList.size() - 1);
    }

    @Test
    @Transactional
    public void createIluminacionProdPrePedWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = iluminacionProdPrePedRepository.findAll().size();

        // Create the IluminacionProdPrePed with an existing ID
        iluminacionProdPrePed.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIluminacionProdPrePedMockMvc.perform(post("/api/iluminacion-prod-pre-peds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iluminacionProdPrePed)))
            .andExpect(status().isBadRequest());

        // Validate the IluminacionProdPrePed in the database
        List<IluminacionProdPrePed> iluminacionProdPrePedList = iluminacionProdPrePedRepository.findAll();
        assertThat(iluminacionProdPrePedList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIluminacionProdPrePeds() throws Exception {
        // Initialize the database
        iluminacionProdPrePedRepository.saveAndFlush(iluminacionProdPrePed);

        // Get all the iluminacionProdPrePedList
        restIluminacionProdPrePedMockMvc.perform(get("/api/iluminacion-prod-pre-peds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(iluminacionProdPrePed.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getIluminacionProdPrePed() throws Exception {
        // Initialize the database
        iluminacionProdPrePedRepository.saveAndFlush(iluminacionProdPrePed);

        // Get the iluminacionProdPrePed
        restIluminacionProdPrePedMockMvc.perform(get("/api/iluminacion-prod-pre-peds/{id}", iluminacionProdPrePed.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(iluminacionProdPrePed.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingIluminacionProdPrePed() throws Exception {
        // Get the iluminacionProdPrePed
        restIluminacionProdPrePedMockMvc.perform(get("/api/iluminacion-prod-pre-peds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIluminacionProdPrePed() throws Exception {
        // Initialize the database
        iluminacionProdPrePedRepository.saveAndFlush(iluminacionProdPrePed);

        int databaseSizeBeforeUpdate = iluminacionProdPrePedRepository.findAll().size();

        // Update the iluminacionProdPrePed
        IluminacionProdPrePed updatedIluminacionProdPrePed = iluminacionProdPrePedRepository.findById(iluminacionProdPrePed.getId()).get();
        // Disconnect from session so that the updates on updatedIluminacionProdPrePed are not directly saved in db
        em.detach(updatedIluminacionProdPrePed);

        restIluminacionProdPrePedMockMvc.perform(put("/api/iluminacion-prod-pre-peds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIluminacionProdPrePed)))
            .andExpect(status().isOk());

        // Validate the IluminacionProdPrePed in the database
        List<IluminacionProdPrePed> iluminacionProdPrePedList = iluminacionProdPrePedRepository.findAll();
        assertThat(iluminacionProdPrePedList).hasSize(databaseSizeBeforeUpdate);
        IluminacionProdPrePed testIluminacionProdPrePed = iluminacionProdPrePedList.get(iluminacionProdPrePedList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingIluminacionProdPrePed() throws Exception {
        int databaseSizeBeforeUpdate = iluminacionProdPrePedRepository.findAll().size();

        // Create the IluminacionProdPrePed

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIluminacionProdPrePedMockMvc.perform(put("/api/iluminacion-prod-pre-peds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iluminacionProdPrePed)))
            .andExpect(status().isBadRequest());

        // Validate the IluminacionProdPrePed in the database
        List<IluminacionProdPrePed> iluminacionProdPrePedList = iluminacionProdPrePedRepository.findAll();
        assertThat(iluminacionProdPrePedList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIluminacionProdPrePed() throws Exception {
        // Initialize the database
        iluminacionProdPrePedRepository.saveAndFlush(iluminacionProdPrePed);

        int databaseSizeBeforeDelete = iluminacionProdPrePedRepository.findAll().size();

        // Get the iluminacionProdPrePed
        restIluminacionProdPrePedMockMvc.perform(delete("/api/iluminacion-prod-pre-peds/{id}", iluminacionProdPrePed.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IluminacionProdPrePed> iluminacionProdPrePedList = iluminacionProdPrePedRepository.findAll();
        assertThat(iluminacionProdPrePedList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IluminacionProdPrePed.class);
        IluminacionProdPrePed iluminacionProdPrePed1 = new IluminacionProdPrePed();
        iluminacionProdPrePed1.setId(1L);
        IluminacionProdPrePed iluminacionProdPrePed2 = new IluminacionProdPrePed();
        iluminacionProdPrePed2.setId(iluminacionProdPrePed1.getId());
        assertThat(iluminacionProdPrePed1).isEqualTo(iluminacionProdPrePed2);
        iluminacionProdPrePed2.setId(2L);
        assertThat(iluminacionProdPrePed1).isNotEqualTo(iluminacionProdPrePed2);
        iluminacionProdPrePed1.setId(null);
        assertThat(iluminacionProdPrePed1).isNotEqualTo(iluminacionProdPrePed2);
    }
}
