package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.RepreGCompra;
import com.torga.pedidos.repository.RepreGCompraRepository;
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
 * Test class for the RepreGCompraResource REST controller.
 *
 * @see RepreGCompraResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class RepreGCompraResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_CIF = "AAAAAAAAAA";
    private static final String UPDATED_CIF = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVO = false;
    private static final Boolean UPDATED_ACTIVO = true;

    private static final String DEFAULT_F_ALTA = "AAAAAAAAAA";
    private static final String UPDATED_F_ALTA = "BBBBBBBBBB";

    private static final String DEFAULT_F_BAJA = "AAAAAAAAAA";
    private static final String UPDATED_F_BAJA = "BBBBBBBBBB";

    private static final Float DEFAULT_COMISION = 1F;
    private static final Float UPDATED_COMISION = 2F;

    private static final Float DEFAULT_DTO_1 = 1F;
    private static final Float UPDATED_DTO_1 = 2F;

    private static final Float DEFAULT_COM_1 = 1F;
    private static final Float UPDATED_COM_1 = 2F;

    private static final Float DEFAULT_DTO_2 = 1F;
    private static final Float UPDATED_DTO_2 = 2F;

    private static final Float DEFAULT_COM_2 = 1F;
    private static final Float UPDATED_COM_2 = 2F;

    private static final Float DEFAULT_DTO_3 = 1F;
    private static final Float UPDATED_DTO_3 = 2F;

    private static final Float DEFAULT_COM_3 = 1F;
    private static final Float UPDATED_COM_3 = 2F;

    private static final Float DEFAULT_DTO_4 = 1F;
    private static final Float UPDATED_DTO_4 = 2F;

    private static final Float DEFAULT_COM_4 = 1F;
    private static final Float UPDATED_COM_4 = 2F;

    private static final Float DEFAULT_DTO_5 = 1F;
    private static final Float UPDATED_DTO_5 = 2F;

    private static final Float DEFAULT_COM_5 = 1F;
    private static final Float UPDATED_COM_5 = 2F;

    private static final Float DEFAULT_DTO_GRUPO = 1F;
    private static final Float UPDATED_DTO_GRUPO = 2F;

    private static final Float DEFAULT_CTA_CONTABLE = 1F;
    private static final Float UPDATED_CTA_CONTABLE = 2F;

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    private static final Boolean DEFAULT_AP_IVA = false;
    private static final Boolean UPDATED_AP_IVA = true;

    private static final Boolean DEFAULT_AP_REQ = false;
    private static final Boolean UPDATED_AP_REQ = true;

    private static final Float DEFAULT_TIPO_IVA = 1F;
    private static final Float UPDATED_TIPO_IVA = 2F;

    private static final Float DEFAULT_RETENCION = 1F;
    private static final Float UPDATED_RETENCION = 2F;

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final Float DEFAULT_CP = 1F;
    private static final Float UPDATED_CP = 2F;

    private static final String DEFAULT_POBLACION = "AAAAAAAAAA";
    private static final String UPDATED_POBLACION = "BBBBBBBBBB";

    private static final String DEFAULT_PROVINCIA = "AAAAAAAAAA";
    private static final String UPDATED_PROVINCIA = "BBBBBBBBBB";

    private static final String DEFAULT_ZONA = "AAAAAAAAAA";
    private static final String UPDATED_ZONA = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_WEB = "AAAAAAAAAA";
    private static final String UPDATED_WEB = "BBBBBBBBBB";

    private static final Float DEFAULT_OBJETIVOS = 1F;
    private static final Float UPDATED_OBJETIVOS = 2F;

    private static final Float DEFAULT_FIJO = 1F;
    private static final Float UPDATED_FIJO = 2F;

    private static final Float DEFAULT_MOVIL = 1F;
    private static final Float UPDATED_MOVIL = 2F;

    private static final String DEFAULT_FAX = "AAAAAAAAAA";
    private static final String UPDATED_FAX = "BBBBBBBBBB";

    private static final Float DEFAULT_CODIGO = 1F;
    private static final Float UPDATED_CODIGO = 2F;

    @Autowired
    private RepreGCompraRepository repreGCompraRepository;

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

    private MockMvc restRepreGCompraMockMvc;

    private RepreGCompra repreGCompra;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RepreGCompraResource repreGCompraResource = new RepreGCompraResource(repreGCompraRepository);
        this.restRepreGCompraMockMvc = MockMvcBuilders.standaloneSetup(repreGCompraResource)
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
    public static RepreGCompra createEntity(EntityManager em) {
        RepreGCompra repreGCompra = new RepreGCompra()
            .nombre(DEFAULT_NOMBRE)
            .cif(DEFAULT_CIF)
            .activo(DEFAULT_ACTIVO)
            .fAlta(DEFAULT_F_ALTA)
            .fBaja(DEFAULT_F_BAJA)
            .comision(DEFAULT_COMISION)
            .dto1(DEFAULT_DTO_1)
            .com1(DEFAULT_COM_1)
            .dto2(DEFAULT_DTO_2)
            .com2(DEFAULT_COM_2)
            .dto3(DEFAULT_DTO_3)
            .com3(DEFAULT_COM_3)
            .dto4(DEFAULT_DTO_4)
            .com4(DEFAULT_COM_4)
            .dto5(DEFAULT_DTO_5)
            .com5(DEFAULT_COM_5)
            .dtoGrupo(DEFAULT_DTO_GRUPO)
            .ctaContable(DEFAULT_CTA_CONTABLE)
            .observaciones(DEFAULT_OBSERVACIONES)
            .apIva(DEFAULT_AP_IVA)
            .apReq(DEFAULT_AP_REQ)
            .tipoIva(DEFAULT_TIPO_IVA)
            .retencion(DEFAULT_RETENCION)
            .direccion(DEFAULT_DIRECCION)
            .cp(DEFAULT_CP)
            .poblacion(DEFAULT_POBLACION)
            .provincia(DEFAULT_PROVINCIA)
            .zona(DEFAULT_ZONA)
            .tipo(DEFAULT_TIPO)
            .email(DEFAULT_EMAIL)
            .web(DEFAULT_WEB)
            .objetivos(DEFAULT_OBJETIVOS)
            .fijo(DEFAULT_FIJO)
            .movil(DEFAULT_MOVIL)
            .fax(DEFAULT_FAX)
            .codigo(DEFAULT_CODIGO);
        return repreGCompra;
    }

    @Before
    public void initTest() {
        repreGCompra = createEntity(em);
    }

    @Test
    @Transactional
    public void createRepreGCompra() throws Exception {
        int databaseSizeBeforeCreate = repreGCompraRepository.findAll().size();

        // Create the RepreGCompra
        restRepreGCompraMockMvc.perform(post("/api/repre-g-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repreGCompra)))
            .andExpect(status().isCreated());

        // Validate the RepreGCompra in the database
        List<RepreGCompra> repreGCompraList = repreGCompraRepository.findAll();
        assertThat(repreGCompraList).hasSize(databaseSizeBeforeCreate + 1);
        RepreGCompra testRepreGCompra = repreGCompraList.get(repreGCompraList.size() - 1);
        assertThat(testRepreGCompra.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testRepreGCompra.getCif()).isEqualTo(DEFAULT_CIF);
        assertThat(testRepreGCompra.isActivo()).isEqualTo(DEFAULT_ACTIVO);
        assertThat(testRepreGCompra.getfAlta()).isEqualTo(DEFAULT_F_ALTA);
        assertThat(testRepreGCompra.getfBaja()).isEqualTo(DEFAULT_F_BAJA);
        assertThat(testRepreGCompra.getComision()).isEqualTo(DEFAULT_COMISION);
        assertThat(testRepreGCompra.getDto1()).isEqualTo(DEFAULT_DTO_1);
        assertThat(testRepreGCompra.getCom1()).isEqualTo(DEFAULT_COM_1);
        assertThat(testRepreGCompra.getDto2()).isEqualTo(DEFAULT_DTO_2);
        assertThat(testRepreGCompra.getCom2()).isEqualTo(DEFAULT_COM_2);
        assertThat(testRepreGCompra.getDto3()).isEqualTo(DEFAULT_DTO_3);
        assertThat(testRepreGCompra.getCom3()).isEqualTo(DEFAULT_COM_3);
        assertThat(testRepreGCompra.getDto4()).isEqualTo(DEFAULT_DTO_4);
        assertThat(testRepreGCompra.getCom4()).isEqualTo(DEFAULT_COM_4);
        assertThat(testRepreGCompra.getDto5()).isEqualTo(DEFAULT_DTO_5);
        assertThat(testRepreGCompra.getCom5()).isEqualTo(DEFAULT_COM_5);
        assertThat(testRepreGCompra.getDtoGrupo()).isEqualTo(DEFAULT_DTO_GRUPO);
        assertThat(testRepreGCompra.getCtaContable()).isEqualTo(DEFAULT_CTA_CONTABLE);
        assertThat(testRepreGCompra.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
        assertThat(testRepreGCompra.isApIva()).isEqualTo(DEFAULT_AP_IVA);
        assertThat(testRepreGCompra.isApReq()).isEqualTo(DEFAULT_AP_REQ);
        assertThat(testRepreGCompra.getTipoIva()).isEqualTo(DEFAULT_TIPO_IVA);
        assertThat(testRepreGCompra.getRetencion()).isEqualTo(DEFAULT_RETENCION);
        assertThat(testRepreGCompra.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
        assertThat(testRepreGCompra.getCp()).isEqualTo(DEFAULT_CP);
        assertThat(testRepreGCompra.getPoblacion()).isEqualTo(DEFAULT_POBLACION);
        assertThat(testRepreGCompra.getProvincia()).isEqualTo(DEFAULT_PROVINCIA);
        assertThat(testRepreGCompra.getZona()).isEqualTo(DEFAULT_ZONA);
        assertThat(testRepreGCompra.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testRepreGCompra.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testRepreGCompra.getWeb()).isEqualTo(DEFAULT_WEB);
        assertThat(testRepreGCompra.getObjetivos()).isEqualTo(DEFAULT_OBJETIVOS);
        assertThat(testRepreGCompra.getFijo()).isEqualTo(DEFAULT_FIJO);
        assertThat(testRepreGCompra.getMovil()).isEqualTo(DEFAULT_MOVIL);
        assertThat(testRepreGCompra.getFax()).isEqualTo(DEFAULT_FAX);
        assertThat(testRepreGCompra.getCodigo()).isEqualTo(DEFAULT_CODIGO);
    }

    @Test
    @Transactional
    public void createRepreGCompraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = repreGCompraRepository.findAll().size();

        // Create the RepreGCompra with an existing ID
        repreGCompra.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRepreGCompraMockMvc.perform(post("/api/repre-g-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repreGCompra)))
            .andExpect(status().isBadRequest());

        // Validate the RepreGCompra in the database
        List<RepreGCompra> repreGCompraList = repreGCompraRepository.findAll();
        assertThat(repreGCompraList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRepreGCompras() throws Exception {
        // Initialize the database
        repreGCompraRepository.saveAndFlush(repreGCompra);

        // Get all the repreGCompraList
        restRepreGCompraMockMvc.perform(get("/api/repre-g-compras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(repreGCompra.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].cif").value(hasItem(DEFAULT_CIF.toString())))
            .andExpect(jsonPath("$.[*].activo").value(hasItem(DEFAULT_ACTIVO.booleanValue())))
            .andExpect(jsonPath("$.[*].fAlta").value(hasItem(DEFAULT_F_ALTA.toString())))
            .andExpect(jsonPath("$.[*].fBaja").value(hasItem(DEFAULT_F_BAJA.toString())))
            .andExpect(jsonPath("$.[*].comision").value(hasItem(DEFAULT_COMISION.doubleValue())))
            .andExpect(jsonPath("$.[*].dto1").value(hasItem(DEFAULT_DTO_1.doubleValue())))
            .andExpect(jsonPath("$.[*].com1").value(hasItem(DEFAULT_COM_1.doubleValue())))
            .andExpect(jsonPath("$.[*].dto2").value(hasItem(DEFAULT_DTO_2.doubleValue())))
            .andExpect(jsonPath("$.[*].com2").value(hasItem(DEFAULT_COM_2.doubleValue())))
            .andExpect(jsonPath("$.[*].dto3").value(hasItem(DEFAULT_DTO_3.doubleValue())))
            .andExpect(jsonPath("$.[*].com3").value(hasItem(DEFAULT_COM_3.doubleValue())))
            .andExpect(jsonPath("$.[*].dto4").value(hasItem(DEFAULT_DTO_4.doubleValue())))
            .andExpect(jsonPath("$.[*].com4").value(hasItem(DEFAULT_COM_4.doubleValue())))
            .andExpect(jsonPath("$.[*].dto5").value(hasItem(DEFAULT_DTO_5.doubleValue())))
            .andExpect(jsonPath("$.[*].com5").value(hasItem(DEFAULT_COM_5.doubleValue())))
            .andExpect(jsonPath("$.[*].dtoGrupo").value(hasItem(DEFAULT_DTO_GRUPO.doubleValue())))
            .andExpect(jsonPath("$.[*].ctaContable").value(hasItem(DEFAULT_CTA_CONTABLE.doubleValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())))
            .andExpect(jsonPath("$.[*].apIva").value(hasItem(DEFAULT_AP_IVA.booleanValue())))
            .andExpect(jsonPath("$.[*].apReq").value(hasItem(DEFAULT_AP_REQ.booleanValue())))
            .andExpect(jsonPath("$.[*].tipoIva").value(hasItem(DEFAULT_TIPO_IVA.doubleValue())))
            .andExpect(jsonPath("$.[*].retencion").value(hasItem(DEFAULT_RETENCION.doubleValue())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].cp").value(hasItem(DEFAULT_CP.doubleValue())))
            .andExpect(jsonPath("$.[*].poblacion").value(hasItem(DEFAULT_POBLACION.toString())))
            .andExpect(jsonPath("$.[*].provincia").value(hasItem(DEFAULT_PROVINCIA.toString())))
            .andExpect(jsonPath("$.[*].zona").value(hasItem(DEFAULT_ZONA.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].web").value(hasItem(DEFAULT_WEB.toString())))
            .andExpect(jsonPath("$.[*].objetivos").value(hasItem(DEFAULT_OBJETIVOS.doubleValue())))
            .andExpect(jsonPath("$.[*].fijo").value(hasItem(DEFAULT_FIJO.doubleValue())))
            .andExpect(jsonPath("$.[*].movil").value(hasItem(DEFAULT_MOVIL.doubleValue())))
            .andExpect(jsonPath("$.[*].fax").value(hasItem(DEFAULT_FAX.toString())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getRepreGCompra() throws Exception {
        // Initialize the database
        repreGCompraRepository.saveAndFlush(repreGCompra);

        // Get the repreGCompra
        restRepreGCompraMockMvc.perform(get("/api/repre-g-compras/{id}", repreGCompra.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(repreGCompra.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.cif").value(DEFAULT_CIF.toString()))
            .andExpect(jsonPath("$.activo").value(DEFAULT_ACTIVO.booleanValue()))
            .andExpect(jsonPath("$.fAlta").value(DEFAULT_F_ALTA.toString()))
            .andExpect(jsonPath("$.fBaja").value(DEFAULT_F_BAJA.toString()))
            .andExpect(jsonPath("$.comision").value(DEFAULT_COMISION.doubleValue()))
            .andExpect(jsonPath("$.dto1").value(DEFAULT_DTO_1.doubleValue()))
            .andExpect(jsonPath("$.com1").value(DEFAULT_COM_1.doubleValue()))
            .andExpect(jsonPath("$.dto2").value(DEFAULT_DTO_2.doubleValue()))
            .andExpect(jsonPath("$.com2").value(DEFAULT_COM_2.doubleValue()))
            .andExpect(jsonPath("$.dto3").value(DEFAULT_DTO_3.doubleValue()))
            .andExpect(jsonPath("$.com3").value(DEFAULT_COM_3.doubleValue()))
            .andExpect(jsonPath("$.dto4").value(DEFAULT_DTO_4.doubleValue()))
            .andExpect(jsonPath("$.com4").value(DEFAULT_COM_4.doubleValue()))
            .andExpect(jsonPath("$.dto5").value(DEFAULT_DTO_5.doubleValue()))
            .andExpect(jsonPath("$.com5").value(DEFAULT_COM_5.doubleValue()))
            .andExpect(jsonPath("$.dtoGrupo").value(DEFAULT_DTO_GRUPO.doubleValue()))
            .andExpect(jsonPath("$.ctaContable").value(DEFAULT_CTA_CONTABLE.doubleValue()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()))
            .andExpect(jsonPath("$.apIva").value(DEFAULT_AP_IVA.booleanValue()))
            .andExpect(jsonPath("$.apReq").value(DEFAULT_AP_REQ.booleanValue()))
            .andExpect(jsonPath("$.tipoIva").value(DEFAULT_TIPO_IVA.doubleValue()))
            .andExpect(jsonPath("$.retencion").value(DEFAULT_RETENCION.doubleValue()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION.toString()))
            .andExpect(jsonPath("$.cp").value(DEFAULT_CP.doubleValue()))
            .andExpect(jsonPath("$.poblacion").value(DEFAULT_POBLACION.toString()))
            .andExpect(jsonPath("$.provincia").value(DEFAULT_PROVINCIA.toString()))
            .andExpect(jsonPath("$.zona").value(DEFAULT_ZONA.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.web").value(DEFAULT_WEB.toString()))
            .andExpect(jsonPath("$.objetivos").value(DEFAULT_OBJETIVOS.doubleValue()))
            .andExpect(jsonPath("$.fijo").value(DEFAULT_FIJO.doubleValue()))
            .andExpect(jsonPath("$.movil").value(DEFAULT_MOVIL.doubleValue()))
            .andExpect(jsonPath("$.fax").value(DEFAULT_FAX.toString()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRepreGCompra() throws Exception {
        // Get the repreGCompra
        restRepreGCompraMockMvc.perform(get("/api/repre-g-compras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRepreGCompra() throws Exception {
        // Initialize the database
        repreGCompraRepository.saveAndFlush(repreGCompra);

        int databaseSizeBeforeUpdate = repreGCompraRepository.findAll().size();

        // Update the repreGCompra
        RepreGCompra updatedRepreGCompra = repreGCompraRepository.findById(repreGCompra.getId()).get();
        // Disconnect from session so that the updates on updatedRepreGCompra are not directly saved in db
        em.detach(updatedRepreGCompra);
        updatedRepreGCompra
            .nombre(UPDATED_NOMBRE)
            .cif(UPDATED_CIF)
            .activo(UPDATED_ACTIVO)
            .fAlta(UPDATED_F_ALTA)
            .fBaja(UPDATED_F_BAJA)
            .comision(UPDATED_COMISION)
            .dto1(UPDATED_DTO_1)
            .com1(UPDATED_COM_1)
            .dto2(UPDATED_DTO_2)
            .com2(UPDATED_COM_2)
            .dto3(UPDATED_DTO_3)
            .com3(UPDATED_COM_3)
            .dto4(UPDATED_DTO_4)
            .com4(UPDATED_COM_4)
            .dto5(UPDATED_DTO_5)
            .com5(UPDATED_COM_5)
            .dtoGrupo(UPDATED_DTO_GRUPO)
            .ctaContable(UPDATED_CTA_CONTABLE)
            .observaciones(UPDATED_OBSERVACIONES)
            .apIva(UPDATED_AP_IVA)
            .apReq(UPDATED_AP_REQ)
            .tipoIva(UPDATED_TIPO_IVA)
            .retencion(UPDATED_RETENCION)
            .direccion(UPDATED_DIRECCION)
            .cp(UPDATED_CP)
            .poblacion(UPDATED_POBLACION)
            .provincia(UPDATED_PROVINCIA)
            .zona(UPDATED_ZONA)
            .tipo(UPDATED_TIPO)
            .email(UPDATED_EMAIL)
            .web(UPDATED_WEB)
            .objetivos(UPDATED_OBJETIVOS)
            .fijo(UPDATED_FIJO)
            .movil(UPDATED_MOVIL)
            .fax(UPDATED_FAX)
            .codigo(UPDATED_CODIGO);

        restRepreGCompraMockMvc.perform(put("/api/repre-g-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRepreGCompra)))
            .andExpect(status().isOk());

        // Validate the RepreGCompra in the database
        List<RepreGCompra> repreGCompraList = repreGCompraRepository.findAll();
        assertThat(repreGCompraList).hasSize(databaseSizeBeforeUpdate);
        RepreGCompra testRepreGCompra = repreGCompraList.get(repreGCompraList.size() - 1);
        assertThat(testRepreGCompra.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testRepreGCompra.getCif()).isEqualTo(UPDATED_CIF);
        assertThat(testRepreGCompra.isActivo()).isEqualTo(UPDATED_ACTIVO);
        assertThat(testRepreGCompra.getfAlta()).isEqualTo(UPDATED_F_ALTA);
        assertThat(testRepreGCompra.getfBaja()).isEqualTo(UPDATED_F_BAJA);
        assertThat(testRepreGCompra.getComision()).isEqualTo(UPDATED_COMISION);
        assertThat(testRepreGCompra.getDto1()).isEqualTo(UPDATED_DTO_1);
        assertThat(testRepreGCompra.getCom1()).isEqualTo(UPDATED_COM_1);
        assertThat(testRepreGCompra.getDto2()).isEqualTo(UPDATED_DTO_2);
        assertThat(testRepreGCompra.getCom2()).isEqualTo(UPDATED_COM_2);
        assertThat(testRepreGCompra.getDto3()).isEqualTo(UPDATED_DTO_3);
        assertThat(testRepreGCompra.getCom3()).isEqualTo(UPDATED_COM_3);
        assertThat(testRepreGCompra.getDto4()).isEqualTo(UPDATED_DTO_4);
        assertThat(testRepreGCompra.getCom4()).isEqualTo(UPDATED_COM_4);
        assertThat(testRepreGCompra.getDto5()).isEqualTo(UPDATED_DTO_5);
        assertThat(testRepreGCompra.getCom5()).isEqualTo(UPDATED_COM_5);
        assertThat(testRepreGCompra.getDtoGrupo()).isEqualTo(UPDATED_DTO_GRUPO);
        assertThat(testRepreGCompra.getCtaContable()).isEqualTo(UPDATED_CTA_CONTABLE);
        assertThat(testRepreGCompra.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
        assertThat(testRepreGCompra.isApIva()).isEqualTo(UPDATED_AP_IVA);
        assertThat(testRepreGCompra.isApReq()).isEqualTo(UPDATED_AP_REQ);
        assertThat(testRepreGCompra.getTipoIva()).isEqualTo(UPDATED_TIPO_IVA);
        assertThat(testRepreGCompra.getRetencion()).isEqualTo(UPDATED_RETENCION);
        assertThat(testRepreGCompra.getDireccion()).isEqualTo(UPDATED_DIRECCION);
        assertThat(testRepreGCompra.getCp()).isEqualTo(UPDATED_CP);
        assertThat(testRepreGCompra.getPoblacion()).isEqualTo(UPDATED_POBLACION);
        assertThat(testRepreGCompra.getProvincia()).isEqualTo(UPDATED_PROVINCIA);
        assertThat(testRepreGCompra.getZona()).isEqualTo(UPDATED_ZONA);
        assertThat(testRepreGCompra.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testRepreGCompra.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testRepreGCompra.getWeb()).isEqualTo(UPDATED_WEB);
        assertThat(testRepreGCompra.getObjetivos()).isEqualTo(UPDATED_OBJETIVOS);
        assertThat(testRepreGCompra.getFijo()).isEqualTo(UPDATED_FIJO);
        assertThat(testRepreGCompra.getMovil()).isEqualTo(UPDATED_MOVIL);
        assertThat(testRepreGCompra.getFax()).isEqualTo(UPDATED_FAX);
        assertThat(testRepreGCompra.getCodigo()).isEqualTo(UPDATED_CODIGO);
    }

    @Test
    @Transactional
    public void updateNonExistingRepreGCompra() throws Exception {
        int databaseSizeBeforeUpdate = repreGCompraRepository.findAll().size();

        // Create the RepreGCompra

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRepreGCompraMockMvc.perform(put("/api/repre-g-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repreGCompra)))
            .andExpect(status().isBadRequest());

        // Validate the RepreGCompra in the database
        List<RepreGCompra> repreGCompraList = repreGCompraRepository.findAll();
        assertThat(repreGCompraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRepreGCompra() throws Exception {
        // Initialize the database
        repreGCompraRepository.saveAndFlush(repreGCompra);

        int databaseSizeBeforeDelete = repreGCompraRepository.findAll().size();

        // Get the repreGCompra
        restRepreGCompraMockMvc.perform(delete("/api/repre-g-compras/{id}", repreGCompra.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RepreGCompra> repreGCompraList = repreGCompraRepository.findAll();
        assertThat(repreGCompraList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RepreGCompra.class);
        RepreGCompra repreGCompra1 = new RepreGCompra();
        repreGCompra1.setId(1L);
        RepreGCompra repreGCompra2 = new RepreGCompra();
        repreGCompra2.setId(repreGCompra1.getId());
        assertThat(repreGCompra1).isEqualTo(repreGCompra2);
        repreGCompra2.setId(2L);
        assertThat(repreGCompra1).isNotEqualTo(repreGCompra2);
        repreGCompra1.setId(null);
        assertThat(repreGCompra1).isNotEqualTo(repreGCompra2);
    }
}
