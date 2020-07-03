package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.FPago;
import com.torga.pedidos.repository.FPagoRepository;
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
 * Test class for the FPagoResource REST controller.
 *
 * @see FPagoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class FPagoResourceIntTest {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_VENCIMIENTOS = "AAAAAAAAAA";
    private static final String UPDATED_VENCIMIENTOS = "BBBBBBBBBB";

    private static final Float DEFAULT_D_1 = 1F;
    private static final Float UPDATED_D_1 = 2F;

    private static final Float DEFAULT_D_2 = 1F;
    private static final Float UPDATED_D_2 = 2F;

    private static final Float DEFAULT_D_3 = 1F;
    private static final Float UPDATED_D_3 = 2F;

    private static final Float DEFAULT_D_4 = 1F;
    private static final Float UPDATED_D_4 = 2F;

    private static final Float DEFAULT_D_5 = 1F;
    private static final Float UPDATED_D_5 = 2F;

    private static final Float DEFAULT_D_6 = 1F;
    private static final Float UPDATED_D_6 = 2F;

    private static final Float DEFAULT_D_7 = 1F;
    private static final Float UPDATED_D_7 = 2F;

    private static final Float DEFAULT_D_8 = 1F;
    private static final Float UPDATED_D_8 = 2F;

    private static final String DEFAULT_D_TOPP = "AAAAAAAAAA";
    private static final String UPDATED_D_TOPP = "BBBBBBBBBB";

    @Autowired
    private FPagoRepository fPagoRepository;

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

    private MockMvc restFPagoMockMvc;

    private FPago fPago;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FPagoResource fPagoResource = new FPagoResource(fPagoRepository);
        this.restFPagoMockMvc = MockMvcBuilders.standaloneSetup(fPagoResource)
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
    public static FPago createEntity(EntityManager em) {
        FPago fPago = new FPago()
            .descripcion(DEFAULT_DESCRIPCION)
            .vencimientos(DEFAULT_VENCIMIENTOS)
            .d1(DEFAULT_D_1)
            .d2(DEFAULT_D_2)
            .d3(DEFAULT_D_3)
            .d4(DEFAULT_D_4)
            .d5(DEFAULT_D_5)
            .d6(DEFAULT_D_6)
            .d7(DEFAULT_D_7)
            .d8(DEFAULT_D_8)
            .dTopp(DEFAULT_D_TOPP);
        return fPago;
    }

    @Before
    public void initTest() {
        fPago = createEntity(em);
    }

    @Test
    @Transactional
    public void createFPago() throws Exception {
        int databaseSizeBeforeCreate = fPagoRepository.findAll().size();

        // Create the FPago
        restFPagoMockMvc.perform(post("/api/f-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fPago)))
            .andExpect(status().isCreated());

        // Validate the FPago in the database
        List<FPago> fPagoList = fPagoRepository.findAll();
        assertThat(fPagoList).hasSize(databaseSizeBeforeCreate + 1);
        FPago testFPago = fPagoList.get(fPagoList.size() - 1);
        assertThat(testFPago.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testFPago.getVencimientos()).isEqualTo(DEFAULT_VENCIMIENTOS);
        assertThat(testFPago.getd1()).isEqualTo(DEFAULT_D_1);
        assertThat(testFPago.getd2()).isEqualTo(DEFAULT_D_2);
        assertThat(testFPago.getd3()).isEqualTo(DEFAULT_D_3);
        assertThat(testFPago.getd4()).isEqualTo(DEFAULT_D_4);
        assertThat(testFPago.getd5()).isEqualTo(DEFAULT_D_5);
        assertThat(testFPago.getd6()).isEqualTo(DEFAULT_D_6);
        assertThat(testFPago.getd7()).isEqualTo(DEFAULT_D_7);
        assertThat(testFPago.getd8()).isEqualTo(DEFAULT_D_8);
        assertThat(testFPago.getdTopp()).isEqualTo(DEFAULT_D_TOPP);
    }

    @Test
    @Transactional
    public void createFPagoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fPagoRepository.findAll().size();

        // Create the FPago with an existing ID
        fPago.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFPagoMockMvc.perform(post("/api/f-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fPago)))
            .andExpect(status().isBadRequest());

        // Validate the FPago in the database
        List<FPago> fPagoList = fPagoRepository.findAll();
        assertThat(fPagoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFPagos() throws Exception {
        // Initialize the database
        fPagoRepository.saveAndFlush(fPago);

        // Get all the fPagoList
        restFPagoMockMvc.perform(get("/api/f-pagos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fPago.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].vencimientos").value(hasItem(DEFAULT_VENCIMIENTOS.toString())))
            .andExpect(jsonPath("$.[*].d1").value(hasItem(DEFAULT_D_1.doubleValue())))
            .andExpect(jsonPath("$.[*].d2").value(hasItem(DEFAULT_D_2.doubleValue())))
            .andExpect(jsonPath("$.[*].d3").value(hasItem(DEFAULT_D_3.doubleValue())))
            .andExpect(jsonPath("$.[*].d4").value(hasItem(DEFAULT_D_4.doubleValue())))
            .andExpect(jsonPath("$.[*].d5").value(hasItem(DEFAULT_D_5.doubleValue())))
            .andExpect(jsonPath("$.[*].d6").value(hasItem(DEFAULT_D_6.doubleValue())))
            .andExpect(jsonPath("$.[*].d7").value(hasItem(DEFAULT_D_7.doubleValue())))
            .andExpect(jsonPath("$.[*].d8").value(hasItem(DEFAULT_D_8.doubleValue())))
            .andExpect(jsonPath("$.[*].dTopp").value(hasItem(DEFAULT_D_TOPP.toString())));
    }
    
    @Test
    @Transactional
    public void getFPago() throws Exception {
        // Initialize the database
        fPagoRepository.saveAndFlush(fPago);

        // Get the fPago
        restFPagoMockMvc.perform(get("/api/f-pagos/{id}", fPago.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fPago.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.vencimientos").value(DEFAULT_VENCIMIENTOS.toString()))
            .andExpect(jsonPath("$.d1").value(DEFAULT_D_1.doubleValue()))
            .andExpect(jsonPath("$.d2").value(DEFAULT_D_2.doubleValue()))
            .andExpect(jsonPath("$.d3").value(DEFAULT_D_3.doubleValue()))
            .andExpect(jsonPath("$.d4").value(DEFAULT_D_4.doubleValue()))
            .andExpect(jsonPath("$.d5").value(DEFAULT_D_5.doubleValue()))
            .andExpect(jsonPath("$.d6").value(DEFAULT_D_6.doubleValue()))
            .andExpect(jsonPath("$.d7").value(DEFAULT_D_7.doubleValue()))
            .andExpect(jsonPath("$.d8").value(DEFAULT_D_8.doubleValue()))
            .andExpect(jsonPath("$.dTopp").value(DEFAULT_D_TOPP.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFPago() throws Exception {
        // Get the fPago
        restFPagoMockMvc.perform(get("/api/f-pagos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFPago() throws Exception {
        // Initialize the database
        fPagoRepository.saveAndFlush(fPago);

        int databaseSizeBeforeUpdate = fPagoRepository.findAll().size();

        // Update the fPago
        FPago updatedFPago = fPagoRepository.findById(fPago.getId()).get();
        // Disconnect from session so that the updates on updatedFPago are not directly saved in db
        em.detach(updatedFPago);
        updatedFPago
            .descripcion(UPDATED_DESCRIPCION)
            .vencimientos(UPDATED_VENCIMIENTOS)
            .d1(UPDATED_D_1)
            .d2(UPDATED_D_2)
            .d3(UPDATED_D_3)
            .d4(UPDATED_D_4)
            .d5(UPDATED_D_5)
            .d6(UPDATED_D_6)
            .d7(UPDATED_D_7)
            .d8(UPDATED_D_8)
            .dTopp(UPDATED_D_TOPP);

        restFPagoMockMvc.perform(put("/api/f-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFPago)))
            .andExpect(status().isOk());

        // Validate the FPago in the database
        List<FPago> fPagoList = fPagoRepository.findAll();
        assertThat(fPagoList).hasSize(databaseSizeBeforeUpdate);
        FPago testFPago = fPagoList.get(fPagoList.size() - 1);
        assertThat(testFPago.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testFPago.getVencimientos()).isEqualTo(UPDATED_VENCIMIENTOS);
        assertThat(testFPago.getd1()).isEqualTo(UPDATED_D_1);
        assertThat(testFPago.getd2()).isEqualTo(UPDATED_D_2);
        assertThat(testFPago.getd3()).isEqualTo(UPDATED_D_3);
        assertThat(testFPago.getd4()).isEqualTo(UPDATED_D_4);
        assertThat(testFPago.getd5()).isEqualTo(UPDATED_D_5);
        assertThat(testFPago.getd6()).isEqualTo(UPDATED_D_6);
        assertThat(testFPago.getd7()).isEqualTo(UPDATED_D_7);
        assertThat(testFPago.getd8()).isEqualTo(UPDATED_D_8);
        assertThat(testFPago.getdTopp()).isEqualTo(UPDATED_D_TOPP);
    }

    @Test
    @Transactional
    public void updateNonExistingFPago() throws Exception {
        int databaseSizeBeforeUpdate = fPagoRepository.findAll().size();

        // Create the FPago

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFPagoMockMvc.perform(put("/api/f-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fPago)))
            .andExpect(status().isBadRequest());

        // Validate the FPago in the database
        List<FPago> fPagoList = fPagoRepository.findAll();
        assertThat(fPagoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFPago() throws Exception {
        // Initialize the database
        fPagoRepository.saveAndFlush(fPago);

        int databaseSizeBeforeDelete = fPagoRepository.findAll().size();

        // Get the fPago
        restFPagoMockMvc.perform(delete("/api/f-pagos/{id}", fPago.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FPago> fPagoList = fPagoRepository.findAll();
        assertThat(fPagoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FPago.class);
        FPago fPago1 = new FPago();
        fPago1.setId(1L);
        FPago fPago2 = new FPago();
        fPago2.setId(fPago1.getId());
        assertThat(fPago1).isEqualTo(fPago2);
        fPago2.setId(2L);
        assertThat(fPago1).isNotEqualTo(fPago2);
        fPago1.setId(null);
        assertThat(fPago1).isNotEqualTo(fPago2);
    }
}
