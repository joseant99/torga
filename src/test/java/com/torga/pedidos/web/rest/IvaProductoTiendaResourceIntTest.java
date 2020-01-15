package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.IvaProductoTienda;
import com.torga.pedidos.repository.IvaProductoTiendaRepository;
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
 * Test class for the IvaProductoTiendaResource REST controller.
 *
 * @see IvaProductoTiendaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class IvaProductoTiendaResourceIntTest {

    private static final Float DEFAULT_IVA = 1F;
    private static final Float UPDATED_IVA = 2F;

    @Autowired
    private IvaProductoTiendaRepository ivaProductoTiendaRepository;

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

    private MockMvc restIvaProductoTiendaMockMvc;

    private IvaProductoTienda ivaProductoTienda;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IvaProductoTiendaResource ivaProductoTiendaResource = new IvaProductoTiendaResource(ivaProductoTiendaRepository);
        this.restIvaProductoTiendaMockMvc = MockMvcBuilders.standaloneSetup(ivaProductoTiendaResource)
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
    public static IvaProductoTienda createEntity(EntityManager em) {
        IvaProductoTienda ivaProductoTienda = new IvaProductoTienda()
            .iva(DEFAULT_IVA);
        return ivaProductoTienda;
    }

    @Before
    public void initTest() {
        ivaProductoTienda = createEntity(em);
    }

    @Test
    @Transactional
    public void createIvaProductoTienda() throws Exception {
        int databaseSizeBeforeCreate = ivaProductoTiendaRepository.findAll().size();

        // Create the IvaProductoTienda
        restIvaProductoTiendaMockMvc.perform(post("/api/iva-producto-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ivaProductoTienda)))
            .andExpect(status().isCreated());

        // Validate the IvaProductoTienda in the database
        List<IvaProductoTienda> ivaProductoTiendaList = ivaProductoTiendaRepository.findAll();
        assertThat(ivaProductoTiendaList).hasSize(databaseSizeBeforeCreate + 1);
        IvaProductoTienda testIvaProductoTienda = ivaProductoTiendaList.get(ivaProductoTiendaList.size() - 1);
        assertThat(testIvaProductoTienda.getIva()).isEqualTo(DEFAULT_IVA);
    }

    @Test
    @Transactional
    public void createIvaProductoTiendaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ivaProductoTiendaRepository.findAll().size();

        // Create the IvaProductoTienda with an existing ID
        ivaProductoTienda.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIvaProductoTiendaMockMvc.perform(post("/api/iva-producto-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ivaProductoTienda)))
            .andExpect(status().isBadRequest());

        // Validate the IvaProductoTienda in the database
        List<IvaProductoTienda> ivaProductoTiendaList = ivaProductoTiendaRepository.findAll();
        assertThat(ivaProductoTiendaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIvaProductoTiendas() throws Exception {
        // Initialize the database
        ivaProductoTiendaRepository.saveAndFlush(ivaProductoTienda);

        // Get all the ivaProductoTiendaList
        restIvaProductoTiendaMockMvc.perform(get("/api/iva-producto-tiendas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ivaProductoTienda.getId().intValue())))
            .andExpect(jsonPath("$.[*].iva").value(hasItem(DEFAULT_IVA.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getIvaProductoTienda() throws Exception {
        // Initialize the database
        ivaProductoTiendaRepository.saveAndFlush(ivaProductoTienda);

        // Get the ivaProductoTienda
        restIvaProductoTiendaMockMvc.perform(get("/api/iva-producto-tiendas/{id}", ivaProductoTienda.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ivaProductoTienda.getId().intValue()))
            .andExpect(jsonPath("$.iva").value(DEFAULT_IVA.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingIvaProductoTienda() throws Exception {
        // Get the ivaProductoTienda
        restIvaProductoTiendaMockMvc.perform(get("/api/iva-producto-tiendas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIvaProductoTienda() throws Exception {
        // Initialize the database
        ivaProductoTiendaRepository.saveAndFlush(ivaProductoTienda);

        int databaseSizeBeforeUpdate = ivaProductoTiendaRepository.findAll().size();

        // Update the ivaProductoTienda
        IvaProductoTienda updatedIvaProductoTienda = ivaProductoTiendaRepository.findById(ivaProductoTienda.getId()).get();
        // Disconnect from session so that the updates on updatedIvaProductoTienda are not directly saved in db
        em.detach(updatedIvaProductoTienda);
        updatedIvaProductoTienda
            .iva(UPDATED_IVA);

        restIvaProductoTiendaMockMvc.perform(put("/api/iva-producto-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIvaProductoTienda)))
            .andExpect(status().isOk());

        // Validate the IvaProductoTienda in the database
        List<IvaProductoTienda> ivaProductoTiendaList = ivaProductoTiendaRepository.findAll();
        assertThat(ivaProductoTiendaList).hasSize(databaseSizeBeforeUpdate);
        IvaProductoTienda testIvaProductoTienda = ivaProductoTiendaList.get(ivaProductoTiendaList.size() - 1);
        assertThat(testIvaProductoTienda.getIva()).isEqualTo(UPDATED_IVA);
    }

    @Test
    @Transactional
    public void updateNonExistingIvaProductoTienda() throws Exception {
        int databaseSizeBeforeUpdate = ivaProductoTiendaRepository.findAll().size();

        // Create the IvaProductoTienda

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIvaProductoTiendaMockMvc.perform(put("/api/iva-producto-tiendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ivaProductoTienda)))
            .andExpect(status().isBadRequest());

        // Validate the IvaProductoTienda in the database
        List<IvaProductoTienda> ivaProductoTiendaList = ivaProductoTiendaRepository.findAll();
        assertThat(ivaProductoTiendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIvaProductoTienda() throws Exception {
        // Initialize the database
        ivaProductoTiendaRepository.saveAndFlush(ivaProductoTienda);

        int databaseSizeBeforeDelete = ivaProductoTiendaRepository.findAll().size();

        // Get the ivaProductoTienda
        restIvaProductoTiendaMockMvc.perform(delete("/api/iva-producto-tiendas/{id}", ivaProductoTienda.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IvaProductoTienda> ivaProductoTiendaList = ivaProductoTiendaRepository.findAll();
        assertThat(ivaProductoTiendaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IvaProductoTienda.class);
        IvaProductoTienda ivaProductoTienda1 = new IvaProductoTienda();
        ivaProductoTienda1.setId(1L);
        IvaProductoTienda ivaProductoTienda2 = new IvaProductoTienda();
        ivaProductoTienda2.setId(ivaProductoTienda1.getId());
        assertThat(ivaProductoTienda1).isEqualTo(ivaProductoTienda2);
        ivaProductoTienda2.setId(2L);
        assertThat(ivaProductoTienda1).isNotEqualTo(ivaProductoTienda2);
        ivaProductoTienda1.setId(null);
        assertThat(ivaProductoTienda1).isNotEqualTo(ivaProductoTienda2);
    }
}
