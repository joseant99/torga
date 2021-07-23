package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.InteriorArmarioMedida;
import com.torga.pedidos.repository.InteriorArmarioMedidaRepository;
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
 * Test class for the InteriorArmarioMedidaResource REST controller.
 *
 * @see InteriorArmarioMedidaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class InteriorArmarioMedidaResourceIntTest {

    private static final Float DEFAULT_NUMERO_HUECO = 1F;
    private static final Float UPDATED_NUMERO_HUECO = 2F;

    private static final Float DEFAULT_EST_1 = 1F;
    private static final Float UPDATED_EST_1 = 2F;

    private static final Float DEFAULT_EST_2 = 1F;
    private static final Float UPDATED_EST_2 = 2F;

    private static final Float DEFAULT_EST_3 = 1F;
    private static final Float UPDATED_EST_3 = 2F;

    private static final Float DEFAULT_EST_4 = 1F;
    private static final Float UPDATED_EST_4 = 2F;

    private static final Float DEFAULT_EST_5 = 1F;
    private static final Float UPDATED_EST_5 = 2F;

    private static final Float DEFAULT_EST_6 = 1F;
    private static final Float UPDATED_EST_6 = 2F;

    private static final Float DEFAULT_EST_7 = 1F;
    private static final Float UPDATED_EST_7 = 2F;

    private static final Float DEFAULT_EST_8 = 1F;
    private static final Float UPDATED_EST_8 = 2F;

    private static final Float DEFAULT_EST_9 = 1F;
    private static final Float UPDATED_EST_9 = 2F;

    private static final Float DEFAULT_EST_10 = 1F;
    private static final Float UPDATED_EST_10 = 2F;

    private static final Float DEFAULT_TUBO_1 = 1F;
    private static final Float UPDATED_TUBO_1 = 2F;

    private static final Float DEFAULT_TUBO_2 = 1F;
    private static final Float UPDATED_TUBO_2 = 2F;

    private static final Float DEFAULT_TUBO_3 = 1F;
    private static final Float UPDATED_TUBO_3 = 2F;

    private static final Float DEFAULT_CAJ_SUE_1 = 1F;
    private static final Float UPDATED_CAJ_SUE_1 = 2F;

    private static final Float DEFAULT_CAJ_SUE_2 = 1F;
    private static final Float UPDATED_CAJ_SUE_2 = 2F;

    private static final Float DEFAULT_CAJ_SUE_3 = 1F;
    private static final Float UPDATED_CAJ_SUE_3 = 2F;

    private static final Float DEFAULT_CAJ_SUE_4 = 1F;
    private static final Float UPDATED_CAJ_SUE_4 = 2F;

    private static final Float DEFAULT_CAJ_SUE_5 = 1F;
    private static final Float UPDATED_CAJ_SUE_5 = 2F;

    private static final Float DEFAULT_HANG = 1F;
    private static final Float UPDATED_HANG = 2F;

    private static final Float DEFAULT_CAMISERO = 1F;
    private static final Float UPDATED_CAMISERO = 2F;

    private static final Float DEFAULT_EST_CRIS_1 = 1F;
    private static final Float UPDATED_EST_CRIS_1 = 2F;

    private static final Float DEFAULT_EST_CRIS_2 = 1F;
    private static final Float UPDATED_EST_CRIS_2 = 2F;

    private static final Float DEFAULT_EST_CRIS_3 = 1F;
    private static final Float UPDATED_EST_CRIS_3 = 2F;

    private static final Float DEFAULT_EST_CRIS_4 = 1F;
    private static final Float UPDATED_EST_CRIS_4 = 2F;

    private static final Float DEFAULT_EST_CRIS_5 = 1F;
    private static final Float UPDATED_EST_CRIS_5 = 2F;

    private static final Float DEFAULT_EST_CRIS_6 = 1F;
    private static final Float UPDATED_EST_CRIS_6 = 2F;

    private static final Float DEFAULT_EST_CRIS_7 = 1F;
    private static final Float UPDATED_EST_CRIS_7 = 2F;

    private static final Float DEFAULT_EST_CRIS_8 = 1F;
    private static final Float UPDATED_EST_CRIS_8 = 2F;

    private static final Float DEFAULT_EST_CRIS_9 = 1F;
    private static final Float UPDATED_EST_CRIS_9 = 2F;

    private static final Float DEFAULT_EST_CRIS_10 = 1F;
    private static final Float UPDATED_EST_CRIS_10 = 2F;

    private static final Float DEFAULT_CAJON_VOL_1 = 1F;
    private static final Float UPDATED_CAJON_VOL_1 = 2F;

    private static final Float DEFAULT_CAJON_VOL_2 = 1F;
    private static final Float UPDATED_CAJON_VOL_2 = 2F;

    private static final Float DEFAULT_CAJON_VOL_3 = 1F;
    private static final Float UPDATED_CAJON_VOL_3 = 2F;

    @Autowired
    private InteriorArmarioMedidaRepository interiorArmarioMedidaRepository;

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

    private MockMvc restInteriorArmarioMedidaMockMvc;

    private InteriorArmarioMedida interiorArmarioMedida;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InteriorArmarioMedidaResource interiorArmarioMedidaResource = new InteriorArmarioMedidaResource(interiorArmarioMedidaRepository);
        this.restInteriorArmarioMedidaMockMvc = MockMvcBuilders.standaloneSetup(interiorArmarioMedidaResource)
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
    public static InteriorArmarioMedida createEntity(EntityManager em) {
        InteriorArmarioMedida interiorArmarioMedida = new InteriorArmarioMedida()
            .numeroHueco(DEFAULT_NUMERO_HUECO)
            .est1(DEFAULT_EST_1)
            .est2(DEFAULT_EST_2)
            .est3(DEFAULT_EST_3)
            .est4(DEFAULT_EST_4)
            .est5(DEFAULT_EST_5)
            .est6(DEFAULT_EST_6)
            .est7(DEFAULT_EST_7)
            .est8(DEFAULT_EST_8)
            .est9(DEFAULT_EST_9)
            .est10(DEFAULT_EST_10)
            .tubo1(DEFAULT_TUBO_1)
            .tubo2(DEFAULT_TUBO_2)
            .tubo3(DEFAULT_TUBO_3)
            .cajSue1(DEFAULT_CAJ_SUE_1)
            .cajSue2(DEFAULT_CAJ_SUE_2)
            .cajSue3(DEFAULT_CAJ_SUE_3)
            .cajSue4(DEFAULT_CAJ_SUE_4)
            .cajSue5(DEFAULT_CAJ_SUE_5)
            .hang(DEFAULT_HANG)
            .camisero(DEFAULT_CAMISERO)
            .estCris1(DEFAULT_EST_CRIS_1)
            .estCris2(DEFAULT_EST_CRIS_2)
            .estCris3(DEFAULT_EST_CRIS_3)
            .estCris4(DEFAULT_EST_CRIS_4)
            .estCris5(DEFAULT_EST_CRIS_5)
            .estCris6(DEFAULT_EST_CRIS_6)
            .estCris7(DEFAULT_EST_CRIS_7)
            .estCris8(DEFAULT_EST_CRIS_8)
            .estCris9(DEFAULT_EST_CRIS_9)
            .estCris10(DEFAULT_EST_CRIS_10)
            .cajonVol1(DEFAULT_CAJON_VOL_1)
            .cajonVol2(DEFAULT_CAJON_VOL_2)
            .cajonVol3(DEFAULT_CAJON_VOL_3);
        return interiorArmarioMedida;
    }

    @Before
    public void initTest() {
        interiorArmarioMedida = createEntity(em);
    }

    @Test
    @Transactional
    public void createInteriorArmarioMedida() throws Exception {
        int databaseSizeBeforeCreate = interiorArmarioMedidaRepository.findAll().size();

        // Create the InteriorArmarioMedida
        restInteriorArmarioMedidaMockMvc.perform(post("/api/interior-armario-medidas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interiorArmarioMedida)))
            .andExpect(status().isCreated());

        // Validate the InteriorArmarioMedida in the database
        List<InteriorArmarioMedida> interiorArmarioMedidaList = interiorArmarioMedidaRepository.findAll();
        assertThat(interiorArmarioMedidaList).hasSize(databaseSizeBeforeCreate + 1);
        InteriorArmarioMedida testInteriorArmarioMedida = interiorArmarioMedidaList.get(interiorArmarioMedidaList.size() - 1);
        assertThat(testInteriorArmarioMedida.getNumeroHueco()).isEqualTo(DEFAULT_NUMERO_HUECO);
        assertThat(testInteriorArmarioMedida.getEst1()).isEqualTo(DEFAULT_EST_1);
        assertThat(testInteriorArmarioMedida.getEst2()).isEqualTo(DEFAULT_EST_2);
        assertThat(testInteriorArmarioMedida.getEst3()).isEqualTo(DEFAULT_EST_3);
        assertThat(testInteriorArmarioMedida.getEst4()).isEqualTo(DEFAULT_EST_4);
        assertThat(testInteriorArmarioMedida.getEst5()).isEqualTo(DEFAULT_EST_5);
        assertThat(testInteriorArmarioMedida.getEst6()).isEqualTo(DEFAULT_EST_6);
        assertThat(testInteriorArmarioMedida.getEst7()).isEqualTo(DEFAULT_EST_7);
        assertThat(testInteriorArmarioMedida.getEst8()).isEqualTo(DEFAULT_EST_8);
        assertThat(testInteriorArmarioMedida.getEst9()).isEqualTo(DEFAULT_EST_9);
        assertThat(testInteriorArmarioMedida.getEst10()).isEqualTo(DEFAULT_EST_10);
        assertThat(testInteriorArmarioMedida.getTubo1()).isEqualTo(DEFAULT_TUBO_1);
        assertThat(testInteriorArmarioMedida.getTubo2()).isEqualTo(DEFAULT_TUBO_2);
        assertThat(testInteriorArmarioMedida.getTubo3()).isEqualTo(DEFAULT_TUBO_3);
        assertThat(testInteriorArmarioMedida.getCajSue1()).isEqualTo(DEFAULT_CAJ_SUE_1);
        assertThat(testInteriorArmarioMedida.getCajSue2()).isEqualTo(DEFAULT_CAJ_SUE_2);
        assertThat(testInteriorArmarioMedida.getCajSue3()).isEqualTo(DEFAULT_CAJ_SUE_3);
        assertThat(testInteriorArmarioMedida.getCajSue4()).isEqualTo(DEFAULT_CAJ_SUE_4);
        assertThat(testInteriorArmarioMedida.getCajSue5()).isEqualTo(DEFAULT_CAJ_SUE_5);
        assertThat(testInteriorArmarioMedida.getHang()).isEqualTo(DEFAULT_HANG);
        assertThat(testInteriorArmarioMedida.getCamisero()).isEqualTo(DEFAULT_CAMISERO);
        assertThat(testInteriorArmarioMedida.getEstCris1()).isEqualTo(DEFAULT_EST_CRIS_1);
        assertThat(testInteriorArmarioMedida.getEstCris2()).isEqualTo(DEFAULT_EST_CRIS_2);
        assertThat(testInteriorArmarioMedida.getEstCris3()).isEqualTo(DEFAULT_EST_CRIS_3);
        assertThat(testInteriorArmarioMedida.getEstCris4()).isEqualTo(DEFAULT_EST_CRIS_4);
        assertThat(testInteriorArmarioMedida.getEstCris5()).isEqualTo(DEFAULT_EST_CRIS_5);
        assertThat(testInteriorArmarioMedida.getEstCris6()).isEqualTo(DEFAULT_EST_CRIS_6);
        assertThat(testInteriorArmarioMedida.getEstCris7()).isEqualTo(DEFAULT_EST_CRIS_7);
        assertThat(testInteriorArmarioMedida.getEstCris8()).isEqualTo(DEFAULT_EST_CRIS_8);
        assertThat(testInteriorArmarioMedida.getEstCris9()).isEqualTo(DEFAULT_EST_CRIS_9);
        assertThat(testInteriorArmarioMedida.getEstCris10()).isEqualTo(DEFAULT_EST_CRIS_10);
        assertThat(testInteriorArmarioMedida.getCajonVol1()).isEqualTo(DEFAULT_CAJON_VOL_1);
        assertThat(testInteriorArmarioMedida.getCajonVol2()).isEqualTo(DEFAULT_CAJON_VOL_2);
        assertThat(testInteriorArmarioMedida.getCajonVol3()).isEqualTo(DEFAULT_CAJON_VOL_3);
    }

    @Test
    @Transactional
    public void createInteriorArmarioMedidaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = interiorArmarioMedidaRepository.findAll().size();

        // Create the InteriorArmarioMedida with an existing ID
        interiorArmarioMedida.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInteriorArmarioMedidaMockMvc.perform(post("/api/interior-armario-medidas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interiorArmarioMedida)))
            .andExpect(status().isBadRequest());

        // Validate the InteriorArmarioMedida in the database
        List<InteriorArmarioMedida> interiorArmarioMedidaList = interiorArmarioMedidaRepository.findAll();
        assertThat(interiorArmarioMedidaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInteriorArmarioMedidas() throws Exception {
        // Initialize the database
        interiorArmarioMedidaRepository.saveAndFlush(interiorArmarioMedida);

        // Get all the interiorArmarioMedidaList
        restInteriorArmarioMedidaMockMvc.perform(get("/api/interior-armario-medidas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(interiorArmarioMedida.getId().intValue())))
            .andExpect(jsonPath("$.[*].numeroHueco").value(hasItem(DEFAULT_NUMERO_HUECO.doubleValue())))
            .andExpect(jsonPath("$.[*].est1").value(hasItem(DEFAULT_EST_1.doubleValue())))
            .andExpect(jsonPath("$.[*].est2").value(hasItem(DEFAULT_EST_2.doubleValue())))
            .andExpect(jsonPath("$.[*].est3").value(hasItem(DEFAULT_EST_3.doubleValue())))
            .andExpect(jsonPath("$.[*].est4").value(hasItem(DEFAULT_EST_4.doubleValue())))
            .andExpect(jsonPath("$.[*].est5").value(hasItem(DEFAULT_EST_5.doubleValue())))
            .andExpect(jsonPath("$.[*].est6").value(hasItem(DEFAULT_EST_6.doubleValue())))
            .andExpect(jsonPath("$.[*].est7").value(hasItem(DEFAULT_EST_7.doubleValue())))
            .andExpect(jsonPath("$.[*].est8").value(hasItem(DEFAULT_EST_8.doubleValue())))
            .andExpect(jsonPath("$.[*].est9").value(hasItem(DEFAULT_EST_9.doubleValue())))
            .andExpect(jsonPath("$.[*].est10").value(hasItem(DEFAULT_EST_10.doubleValue())))
            .andExpect(jsonPath("$.[*].tubo1").value(hasItem(DEFAULT_TUBO_1.doubleValue())))
            .andExpect(jsonPath("$.[*].tubo2").value(hasItem(DEFAULT_TUBO_2.doubleValue())))
            .andExpect(jsonPath("$.[*].tubo3").value(hasItem(DEFAULT_TUBO_3.doubleValue())))
            .andExpect(jsonPath("$.[*].cajSue1").value(hasItem(DEFAULT_CAJ_SUE_1.doubleValue())))
            .andExpect(jsonPath("$.[*].cajSue2").value(hasItem(DEFAULT_CAJ_SUE_2.doubleValue())))
            .andExpect(jsonPath("$.[*].cajSue3").value(hasItem(DEFAULT_CAJ_SUE_3.doubleValue())))
            .andExpect(jsonPath("$.[*].cajSue4").value(hasItem(DEFAULT_CAJ_SUE_4.doubleValue())))
            .andExpect(jsonPath("$.[*].cajSue5").value(hasItem(DEFAULT_CAJ_SUE_5.doubleValue())))
            .andExpect(jsonPath("$.[*].hang").value(hasItem(DEFAULT_HANG.doubleValue())))
            .andExpect(jsonPath("$.[*].camisero").value(hasItem(DEFAULT_CAMISERO.doubleValue())))
            .andExpect(jsonPath("$.[*].estCris1").value(hasItem(DEFAULT_EST_CRIS_1.doubleValue())))
            .andExpect(jsonPath("$.[*].estCris2").value(hasItem(DEFAULT_EST_CRIS_2.doubleValue())))
            .andExpect(jsonPath("$.[*].estCris3").value(hasItem(DEFAULT_EST_CRIS_3.doubleValue())))
            .andExpect(jsonPath("$.[*].estCris4").value(hasItem(DEFAULT_EST_CRIS_4.doubleValue())))
            .andExpect(jsonPath("$.[*].estCris5").value(hasItem(DEFAULT_EST_CRIS_5.doubleValue())))
            .andExpect(jsonPath("$.[*].estCris6").value(hasItem(DEFAULT_EST_CRIS_6.doubleValue())))
            .andExpect(jsonPath("$.[*].estCris7").value(hasItem(DEFAULT_EST_CRIS_7.doubleValue())))
            .andExpect(jsonPath("$.[*].estCris8").value(hasItem(DEFAULT_EST_CRIS_8.doubleValue())))
            .andExpect(jsonPath("$.[*].estCris9").value(hasItem(DEFAULT_EST_CRIS_9.doubleValue())))
            .andExpect(jsonPath("$.[*].estCris10").value(hasItem(DEFAULT_EST_CRIS_10.doubleValue())))
            .andExpect(jsonPath("$.[*].cajonVol1").value(hasItem(DEFAULT_CAJON_VOL_1.doubleValue())))
            .andExpect(jsonPath("$.[*].cajonVol2").value(hasItem(DEFAULT_CAJON_VOL_2.doubleValue())))
            .andExpect(jsonPath("$.[*].cajonVol3").value(hasItem(DEFAULT_CAJON_VOL_3.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getInteriorArmarioMedida() throws Exception {
        // Initialize the database
        interiorArmarioMedidaRepository.saveAndFlush(interiorArmarioMedida);

        // Get the interiorArmarioMedida
        restInteriorArmarioMedidaMockMvc.perform(get("/api/interior-armario-medidas/{id}", interiorArmarioMedida.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(interiorArmarioMedida.getId().intValue()))
            .andExpect(jsonPath("$.numeroHueco").value(DEFAULT_NUMERO_HUECO.doubleValue()))
            .andExpect(jsonPath("$.est1").value(DEFAULT_EST_1.doubleValue()))
            .andExpect(jsonPath("$.est2").value(DEFAULT_EST_2.doubleValue()))
            .andExpect(jsonPath("$.est3").value(DEFAULT_EST_3.doubleValue()))
            .andExpect(jsonPath("$.est4").value(DEFAULT_EST_4.doubleValue()))
            .andExpect(jsonPath("$.est5").value(DEFAULT_EST_5.doubleValue()))
            .andExpect(jsonPath("$.est6").value(DEFAULT_EST_6.doubleValue()))
            .andExpect(jsonPath("$.est7").value(DEFAULT_EST_7.doubleValue()))
            .andExpect(jsonPath("$.est8").value(DEFAULT_EST_8.doubleValue()))
            .andExpect(jsonPath("$.est9").value(DEFAULT_EST_9.doubleValue()))
            .andExpect(jsonPath("$.est10").value(DEFAULT_EST_10.doubleValue()))
            .andExpect(jsonPath("$.tubo1").value(DEFAULT_TUBO_1.doubleValue()))
            .andExpect(jsonPath("$.tubo2").value(DEFAULT_TUBO_2.doubleValue()))
            .andExpect(jsonPath("$.tubo3").value(DEFAULT_TUBO_3.doubleValue()))
            .andExpect(jsonPath("$.cajSue1").value(DEFAULT_CAJ_SUE_1.doubleValue()))
            .andExpect(jsonPath("$.cajSue2").value(DEFAULT_CAJ_SUE_2.doubleValue()))
            .andExpect(jsonPath("$.cajSue3").value(DEFAULT_CAJ_SUE_3.doubleValue()))
            .andExpect(jsonPath("$.cajSue4").value(DEFAULT_CAJ_SUE_4.doubleValue()))
            .andExpect(jsonPath("$.cajSue5").value(DEFAULT_CAJ_SUE_5.doubleValue()))
            .andExpect(jsonPath("$.hang").value(DEFAULT_HANG.doubleValue()))
            .andExpect(jsonPath("$.camisero").value(DEFAULT_CAMISERO.doubleValue()))
            .andExpect(jsonPath("$.estCris1").value(DEFAULT_EST_CRIS_1.doubleValue()))
            .andExpect(jsonPath("$.estCris2").value(DEFAULT_EST_CRIS_2.doubleValue()))
            .andExpect(jsonPath("$.estCris3").value(DEFAULT_EST_CRIS_3.doubleValue()))
            .andExpect(jsonPath("$.estCris4").value(DEFAULT_EST_CRIS_4.doubleValue()))
            .andExpect(jsonPath("$.estCris5").value(DEFAULT_EST_CRIS_5.doubleValue()))
            .andExpect(jsonPath("$.estCris6").value(DEFAULT_EST_CRIS_6.doubleValue()))
            .andExpect(jsonPath("$.estCris7").value(DEFAULT_EST_CRIS_7.doubleValue()))
            .andExpect(jsonPath("$.estCris8").value(DEFAULT_EST_CRIS_8.doubleValue()))
            .andExpect(jsonPath("$.estCris9").value(DEFAULT_EST_CRIS_9.doubleValue()))
            .andExpect(jsonPath("$.estCris10").value(DEFAULT_EST_CRIS_10.doubleValue()))
            .andExpect(jsonPath("$.cajonVol1").value(DEFAULT_CAJON_VOL_1.doubleValue()))
            .andExpect(jsonPath("$.cajonVol2").value(DEFAULT_CAJON_VOL_2.doubleValue()))
            .andExpect(jsonPath("$.cajonVol3").value(DEFAULT_CAJON_VOL_3.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingInteriorArmarioMedida() throws Exception {
        // Get the interiorArmarioMedida
        restInteriorArmarioMedidaMockMvc.perform(get("/api/interior-armario-medidas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInteriorArmarioMedida() throws Exception {
        // Initialize the database
        interiorArmarioMedidaRepository.saveAndFlush(interiorArmarioMedida);

        int databaseSizeBeforeUpdate = interiorArmarioMedidaRepository.findAll().size();

        // Update the interiorArmarioMedida
        InteriorArmarioMedida updatedInteriorArmarioMedida = interiorArmarioMedidaRepository.findById(interiorArmarioMedida.getId()).get();
        // Disconnect from session so that the updates on updatedInteriorArmarioMedida are not directly saved in db
        em.detach(updatedInteriorArmarioMedida);
        updatedInteriorArmarioMedida
            .numeroHueco(UPDATED_NUMERO_HUECO)
            .est1(UPDATED_EST_1)
            .est2(UPDATED_EST_2)
            .est3(UPDATED_EST_3)
            .est4(UPDATED_EST_4)
            .est5(UPDATED_EST_5)
            .est6(UPDATED_EST_6)
            .est7(UPDATED_EST_7)
            .est8(UPDATED_EST_8)
            .est9(UPDATED_EST_9)
            .est10(UPDATED_EST_10)
            .tubo1(UPDATED_TUBO_1)
            .tubo2(UPDATED_TUBO_2)
            .tubo3(UPDATED_TUBO_3)
            .cajSue1(UPDATED_CAJ_SUE_1)
            .cajSue2(UPDATED_CAJ_SUE_2)
            .cajSue3(UPDATED_CAJ_SUE_3)
            .cajSue4(UPDATED_CAJ_SUE_4)
            .cajSue5(UPDATED_CAJ_SUE_5)
            .hang(UPDATED_HANG)
            .camisero(UPDATED_CAMISERO)
            .estCris1(UPDATED_EST_CRIS_1)
            .estCris2(UPDATED_EST_CRIS_2)
            .estCris3(UPDATED_EST_CRIS_3)
            .estCris4(UPDATED_EST_CRIS_4)
            .estCris5(UPDATED_EST_CRIS_5)
            .estCris6(UPDATED_EST_CRIS_6)
            .estCris7(UPDATED_EST_CRIS_7)
            .estCris8(UPDATED_EST_CRIS_8)
            .estCris9(UPDATED_EST_CRIS_9)
            .estCris10(UPDATED_EST_CRIS_10)
            .cajonVol1(UPDATED_CAJON_VOL_1)
            .cajonVol2(UPDATED_CAJON_VOL_2)
            .cajonVol3(UPDATED_CAJON_VOL_3);

        restInteriorArmarioMedidaMockMvc.perform(put("/api/interior-armario-medidas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInteriorArmarioMedida)))
            .andExpect(status().isOk());

        // Validate the InteriorArmarioMedida in the database
        List<InteriorArmarioMedida> interiorArmarioMedidaList = interiorArmarioMedidaRepository.findAll();
        assertThat(interiorArmarioMedidaList).hasSize(databaseSizeBeforeUpdate);
        InteriorArmarioMedida testInteriorArmarioMedida = interiorArmarioMedidaList.get(interiorArmarioMedidaList.size() - 1);
        assertThat(testInteriorArmarioMedida.getNumeroHueco()).isEqualTo(UPDATED_NUMERO_HUECO);
        assertThat(testInteriorArmarioMedida.getEst1()).isEqualTo(UPDATED_EST_1);
        assertThat(testInteriorArmarioMedida.getEst2()).isEqualTo(UPDATED_EST_2);
        assertThat(testInteriorArmarioMedida.getEst3()).isEqualTo(UPDATED_EST_3);
        assertThat(testInteriorArmarioMedida.getEst4()).isEqualTo(UPDATED_EST_4);
        assertThat(testInteriorArmarioMedida.getEst5()).isEqualTo(UPDATED_EST_5);
        assertThat(testInteriorArmarioMedida.getEst6()).isEqualTo(UPDATED_EST_6);
        assertThat(testInteriorArmarioMedida.getEst7()).isEqualTo(UPDATED_EST_7);
        assertThat(testInteriorArmarioMedida.getEst8()).isEqualTo(UPDATED_EST_8);
        assertThat(testInteriorArmarioMedida.getEst9()).isEqualTo(UPDATED_EST_9);
        assertThat(testInteriorArmarioMedida.getEst10()).isEqualTo(UPDATED_EST_10);
        assertThat(testInteriorArmarioMedida.getTubo1()).isEqualTo(UPDATED_TUBO_1);
        assertThat(testInteriorArmarioMedida.getTubo2()).isEqualTo(UPDATED_TUBO_2);
        assertThat(testInteriorArmarioMedida.getTubo3()).isEqualTo(UPDATED_TUBO_3);
        assertThat(testInteriorArmarioMedida.getCajSue1()).isEqualTo(UPDATED_CAJ_SUE_1);
        assertThat(testInteriorArmarioMedida.getCajSue2()).isEqualTo(UPDATED_CAJ_SUE_2);
        assertThat(testInteriorArmarioMedida.getCajSue3()).isEqualTo(UPDATED_CAJ_SUE_3);
        assertThat(testInteriorArmarioMedida.getCajSue4()).isEqualTo(UPDATED_CAJ_SUE_4);
        assertThat(testInteriorArmarioMedida.getCajSue5()).isEqualTo(UPDATED_CAJ_SUE_5);
        assertThat(testInteriorArmarioMedida.getHang()).isEqualTo(UPDATED_HANG);
        assertThat(testInteriorArmarioMedida.getCamisero()).isEqualTo(UPDATED_CAMISERO);
        assertThat(testInteriorArmarioMedida.getEstCris1()).isEqualTo(UPDATED_EST_CRIS_1);
        assertThat(testInteriorArmarioMedida.getEstCris2()).isEqualTo(UPDATED_EST_CRIS_2);
        assertThat(testInteriorArmarioMedida.getEstCris3()).isEqualTo(UPDATED_EST_CRIS_3);
        assertThat(testInteriorArmarioMedida.getEstCris4()).isEqualTo(UPDATED_EST_CRIS_4);
        assertThat(testInteriorArmarioMedida.getEstCris5()).isEqualTo(UPDATED_EST_CRIS_5);
        assertThat(testInteriorArmarioMedida.getEstCris6()).isEqualTo(UPDATED_EST_CRIS_6);
        assertThat(testInteriorArmarioMedida.getEstCris7()).isEqualTo(UPDATED_EST_CRIS_7);
        assertThat(testInteriorArmarioMedida.getEstCris8()).isEqualTo(UPDATED_EST_CRIS_8);
        assertThat(testInteriorArmarioMedida.getEstCris9()).isEqualTo(UPDATED_EST_CRIS_9);
        assertThat(testInteriorArmarioMedida.getEstCris10()).isEqualTo(UPDATED_EST_CRIS_10);
        assertThat(testInteriorArmarioMedida.getCajonVol1()).isEqualTo(UPDATED_CAJON_VOL_1);
        assertThat(testInteriorArmarioMedida.getCajonVol2()).isEqualTo(UPDATED_CAJON_VOL_2);
        assertThat(testInteriorArmarioMedida.getCajonVol3()).isEqualTo(UPDATED_CAJON_VOL_3);
    }

    @Test
    @Transactional
    public void updateNonExistingInteriorArmarioMedida() throws Exception {
        int databaseSizeBeforeUpdate = interiorArmarioMedidaRepository.findAll().size();

        // Create the InteriorArmarioMedida

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInteriorArmarioMedidaMockMvc.perform(put("/api/interior-armario-medidas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interiorArmarioMedida)))
            .andExpect(status().isBadRequest());

        // Validate the InteriorArmarioMedida in the database
        List<InteriorArmarioMedida> interiorArmarioMedidaList = interiorArmarioMedidaRepository.findAll();
        assertThat(interiorArmarioMedidaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInteriorArmarioMedida() throws Exception {
        // Initialize the database
        interiorArmarioMedidaRepository.saveAndFlush(interiorArmarioMedida);

        int databaseSizeBeforeDelete = interiorArmarioMedidaRepository.findAll().size();

        // Get the interiorArmarioMedida
        restInteriorArmarioMedidaMockMvc.perform(delete("/api/interior-armario-medidas/{id}", interiorArmarioMedida.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<InteriorArmarioMedida> interiorArmarioMedidaList = interiorArmarioMedidaRepository.findAll();
        assertThat(interiorArmarioMedidaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InteriorArmarioMedida.class);
        InteriorArmarioMedida interiorArmarioMedida1 = new InteriorArmarioMedida();
        interiorArmarioMedida1.setId(1L);
        InteriorArmarioMedida interiorArmarioMedida2 = new InteriorArmarioMedida();
        interiorArmarioMedida2.setId(interiorArmarioMedida1.getId());
        assertThat(interiorArmarioMedida1).isEqualTo(interiorArmarioMedida2);
        interiorArmarioMedida2.setId(2L);
        assertThat(interiorArmarioMedida1).isNotEqualTo(interiorArmarioMedida2);
        interiorArmarioMedida1.setId(null);
        assertThat(interiorArmarioMedida1).isNotEqualTo(interiorArmarioMedida2);
    }
}
