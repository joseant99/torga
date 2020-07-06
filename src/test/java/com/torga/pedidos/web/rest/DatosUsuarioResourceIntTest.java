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

    private static final Float DEFAULT_CODIGO = 1F;
    private static final Float UPDATED_CODIGO = 2F;

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String DEFAULT_F_ALTA = "AAAAAAAAAA";
    private static final String UPDATED_F_ALTA = "BBBBBBBBBB";

    private static final String DEFAULT_F_BAJA = "AAAAAAAAAA";
    private static final String UPDATED_F_BAJA = "BBBBBBBBBB";

    private static final Float DEFAULT_PRIORIDAD_CARGA = 1F;
    private static final Float UPDATED_PRIORIDAD_CARGA = 2F;

    private static final String DEFAULT_AP_IVA = "AAAAAAAAAA";
    private static final String UPDATED_AP_IVA = "BBBBBBBBBB";

    private static final String DEFAULT_AP_REQ = "AAAAAAAAAA";
    private static final String UPDATED_AP_REQ = "BBBBBBBBBB";

    private static final String DEFAULT_VAL_ALBARAN = "AAAAAAAAAA";
    private static final String UPDATED_VAL_ALBARAN = "BBBBBBBBBB";

    private static final String DEFAULT_FAC_X_ALBARAN = "AAAAAAAAAA";
    private static final String UPDATED_FAC_X_ALBARAN = "BBBBBBBBBB";

    private static final Float DEFAULT_DTO_1 = 1F;
    private static final Float UPDATED_DTO_1 = 2F;

    private static final Float DEFAULT_DTO_2 = 1F;
    private static final Float UPDATED_DTO_2 = 2F;

    private static final Float DEFAULT_DTO_3 = 1F;
    private static final Float UPDATED_DTO_3 = 2F;

    private static final Float DEFAULT_DTO_TRAS = 1F;
    private static final Float UPDATED_DTO_TRAS = 2F;

    private static final String DEFAULT_ID_GC = "AAAAAAAAAA";
    private static final String UPDATED_ID_GC = "BBBBBBBBBB";

    private static final String DEFAULT_VAL_PEDIDO = "AAAAAAAAAA";
    private static final String UPDATED_VAL_PEDIDO = "BBBBBBBBBB";

    private static final String DEFAULT_VAL_PUNTOS = "AAAAAAAAAA";
    private static final String UPDATED_VAL_PUNTOS = "BBBBBBBBBB";

    private static final Float DEFAULT_D_PAGO_1 = 1F;
    private static final Float UPDATED_D_PAGO_1 = 2F;

    private static final Float DEFAULT_D_PAGO_2 = 1F;
    private static final Float UPDATED_D_PAGO_2 = 2F;

    private static final Float DEFAULT_D_PAGO_3 = 1F;
    private static final Float UPDATED_D_PAGO_3 = 2F;

    private static final String DEFAULT_DESDE_VACA = "AAAAAAAAAA";
    private static final String UPDATED_DESDE_VACA = "BBBBBBBBBB";

    private static final String DEFAULT_HASTA_VACA = "AAAAAAAAAA";
    private static final String UPDATED_HASTA_VACA = "BBBBBBBBBB";

    private static final String DEFAULT_WEB = "AAAAAAAAAA";
    private static final String UPDATED_WEB = "BBBBBBBBBB";

    private static final String DEFAULT_MOVIL = "AAAAAAAAAA";
    private static final String UPDATED_MOVIL = "BBBBBBBBBB";

    private static final String DEFAULT_FAX = "AAAAAAAAAA";
    private static final String UPDATED_FAX = "BBBBBBBBBB";

    private static final Float DEFAULT_CTA_CONTABLE = 1F;
    private static final Float UPDATED_CTA_CONTABLE = 2F;

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACIONES_PED = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES_PED = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACIONES_ALB = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES_ALB = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACIONES_FAC = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES_FAC = "BBBBBBBBBB";

    private static final String DEFAULT_NO_GIRO_VACA = "AAAAAAAAAA";
    private static final String UPDATED_NO_GIRO_VACA = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACIONES_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES_DIRECCION = "BBBBBBBBBB";

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
            .nombreFiscal(DEFAULT_NOMBRE_FISCAL)
            .codigo(DEFAULT_CODIGO)
            .estado(DEFAULT_ESTADO)
            .fAlta(DEFAULT_F_ALTA)
            .fBaja(DEFAULT_F_BAJA)
            .prioridadCarga(DEFAULT_PRIORIDAD_CARGA)
            .apIVA(DEFAULT_AP_IVA)
            .apReq(DEFAULT_AP_REQ)
            .valAlbaran(DEFAULT_VAL_ALBARAN)
            .facXAlbaran(DEFAULT_FAC_X_ALBARAN)
            .dto1(DEFAULT_DTO_1)
            .dto2(DEFAULT_DTO_2)
            .dto3(DEFAULT_DTO_3)
            .dtoTras(DEFAULT_DTO_TRAS)
            .idGc(DEFAULT_ID_GC)
            .valPedido(DEFAULT_VAL_PEDIDO)
            .valPuntos(DEFAULT_VAL_PUNTOS)
            .dPago1(DEFAULT_D_PAGO_1)
            .dPago2(DEFAULT_D_PAGO_2)
            .dPago3(DEFAULT_D_PAGO_3)
            .desdeVaca(DEFAULT_DESDE_VACA)
            .hastaVaca(DEFAULT_HASTA_VACA)
            .web(DEFAULT_WEB)
            .movil(DEFAULT_MOVIL)
            .fax(DEFAULT_FAX)
            .ctaContable(DEFAULT_CTA_CONTABLE)
            .observaciones(DEFAULT_OBSERVACIONES)
            .observacionesPed(DEFAULT_OBSERVACIONES_PED)
            .observacionesAlb(DEFAULT_OBSERVACIONES_ALB)
            .observacionesFac(DEFAULT_OBSERVACIONES_FAC)
            .noGiroVaca(DEFAULT_NO_GIRO_VACA)
            .observacionesDireccion(DEFAULT_OBSERVACIONES_DIRECCION);
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
        assertThat(testDatosUsuario.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testDatosUsuario.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testDatosUsuario.getfAlta()).isEqualTo(DEFAULT_F_ALTA);
        assertThat(testDatosUsuario.getfBaja()).isEqualTo(DEFAULT_F_BAJA);
        assertThat(testDatosUsuario.getPrioridadCarga()).isEqualTo(DEFAULT_PRIORIDAD_CARGA);
        assertThat(testDatosUsuario.getApIVA()).isEqualTo(DEFAULT_AP_IVA);
        assertThat(testDatosUsuario.getApReq()).isEqualTo(DEFAULT_AP_REQ);
        assertThat(testDatosUsuario.getValAlbaran()).isEqualTo(DEFAULT_VAL_ALBARAN);
        assertThat(testDatosUsuario.getFacXAlbaran()).isEqualTo(DEFAULT_FAC_X_ALBARAN);
        assertThat(testDatosUsuario.getDto1()).isEqualTo(DEFAULT_DTO_1);
        assertThat(testDatosUsuario.getDto2()).isEqualTo(DEFAULT_DTO_2);
        assertThat(testDatosUsuario.getDto3()).isEqualTo(DEFAULT_DTO_3);
        assertThat(testDatosUsuario.getDtoTras()).isEqualTo(DEFAULT_DTO_TRAS);
        assertThat(testDatosUsuario.getIdGc()).isEqualTo(DEFAULT_ID_GC);
        assertThat(testDatosUsuario.getValPedido()).isEqualTo(DEFAULT_VAL_PEDIDO);
        assertThat(testDatosUsuario.getValPuntos()).isEqualTo(DEFAULT_VAL_PUNTOS);
        assertThat(testDatosUsuario.getdPago1()).isEqualTo(DEFAULT_D_PAGO_1);
        assertThat(testDatosUsuario.getdPago2()).isEqualTo(DEFAULT_D_PAGO_2);
        assertThat(testDatosUsuario.getdPago3()).isEqualTo(DEFAULT_D_PAGO_3);
        assertThat(testDatosUsuario.getDesdeVaca()).isEqualTo(DEFAULT_DESDE_VACA);
        assertThat(testDatosUsuario.getHastaVaca()).isEqualTo(DEFAULT_HASTA_VACA);
        assertThat(testDatosUsuario.getWeb()).isEqualTo(DEFAULT_WEB);
        assertThat(testDatosUsuario.getMovil()).isEqualTo(DEFAULT_MOVIL);
        assertThat(testDatosUsuario.getFax()).isEqualTo(DEFAULT_FAX);
        assertThat(testDatosUsuario.getCtaContable()).isEqualTo(DEFAULT_CTA_CONTABLE);
        assertThat(testDatosUsuario.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
        assertThat(testDatosUsuario.getObservacionesPed()).isEqualTo(DEFAULT_OBSERVACIONES_PED);
        assertThat(testDatosUsuario.getObservacionesAlb()).isEqualTo(DEFAULT_OBSERVACIONES_ALB);
        assertThat(testDatosUsuario.getObservacionesFac()).isEqualTo(DEFAULT_OBSERVACIONES_FAC);
        assertThat(testDatosUsuario.getNoGiroVaca()).isEqualTo(DEFAULT_NO_GIRO_VACA);
        assertThat(testDatosUsuario.getObservacionesDireccion()).isEqualTo(DEFAULT_OBSERVACIONES_DIRECCION);
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
            .andExpect(jsonPath("$.[*].nombreFiscal").value(hasItem(DEFAULT_NOMBRE_FISCAL.toString())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.doubleValue())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].fAlta").value(hasItem(DEFAULT_F_ALTA.toString())))
            .andExpect(jsonPath("$.[*].fBaja").value(hasItem(DEFAULT_F_BAJA.toString())))
            .andExpect(jsonPath("$.[*].prioridadCarga").value(hasItem(DEFAULT_PRIORIDAD_CARGA.doubleValue())))
            .andExpect(jsonPath("$.[*].apIVA").value(hasItem(DEFAULT_AP_IVA.toString())))
            .andExpect(jsonPath("$.[*].apReq").value(hasItem(DEFAULT_AP_REQ.toString())))
            .andExpect(jsonPath("$.[*].valAlbaran").value(hasItem(DEFAULT_VAL_ALBARAN.toString())))
            .andExpect(jsonPath("$.[*].facXAlbaran").value(hasItem(DEFAULT_FAC_X_ALBARAN.toString())))
            .andExpect(jsonPath("$.[*].dto1").value(hasItem(DEFAULT_DTO_1.doubleValue())))
            .andExpect(jsonPath("$.[*].dto2").value(hasItem(DEFAULT_DTO_2.doubleValue())))
            .andExpect(jsonPath("$.[*].dto3").value(hasItem(DEFAULT_DTO_3.doubleValue())))
            .andExpect(jsonPath("$.[*].dtoTras").value(hasItem(DEFAULT_DTO_TRAS.doubleValue())))
            .andExpect(jsonPath("$.[*].idGc").value(hasItem(DEFAULT_ID_GC.toString())))
            .andExpect(jsonPath("$.[*].valPedido").value(hasItem(DEFAULT_VAL_PEDIDO.toString())))
            .andExpect(jsonPath("$.[*].valPuntos").value(hasItem(DEFAULT_VAL_PUNTOS.toString())))
            .andExpect(jsonPath("$.[*].dPago1").value(hasItem(DEFAULT_D_PAGO_1.doubleValue())))
            .andExpect(jsonPath("$.[*].dPago2").value(hasItem(DEFAULT_D_PAGO_2.doubleValue())))
            .andExpect(jsonPath("$.[*].dPago3").value(hasItem(DEFAULT_D_PAGO_3.doubleValue())))
            .andExpect(jsonPath("$.[*].desdeVaca").value(hasItem(DEFAULT_DESDE_VACA.toString())))
            .andExpect(jsonPath("$.[*].hastaVaca").value(hasItem(DEFAULT_HASTA_VACA.toString())))
            .andExpect(jsonPath("$.[*].web").value(hasItem(DEFAULT_WEB.toString())))
            .andExpect(jsonPath("$.[*].movil").value(hasItem(DEFAULT_MOVIL.toString())))
            .andExpect(jsonPath("$.[*].fax").value(hasItem(DEFAULT_FAX.toString())))
            .andExpect(jsonPath("$.[*].ctaContable").value(hasItem(DEFAULT_CTA_CONTABLE.doubleValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())))
            .andExpect(jsonPath("$.[*].observacionesPed").value(hasItem(DEFAULT_OBSERVACIONES_PED.toString())))
            .andExpect(jsonPath("$.[*].observacionesAlb").value(hasItem(DEFAULT_OBSERVACIONES_ALB.toString())))
            .andExpect(jsonPath("$.[*].observacionesFac").value(hasItem(DEFAULT_OBSERVACIONES_FAC.toString())))
            .andExpect(jsonPath("$.[*].noGiroVaca").value(hasItem(DEFAULT_NO_GIRO_VACA.toString())))
            .andExpect(jsonPath("$.[*].observacionesDireccion").value(hasItem(DEFAULT_OBSERVACIONES_DIRECCION.toString())));
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
            .andExpect(jsonPath("$.nombreFiscal").value(DEFAULT_NOMBRE_FISCAL.toString()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.doubleValue()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()))
            .andExpect(jsonPath("$.fAlta").value(DEFAULT_F_ALTA.toString()))
            .andExpect(jsonPath("$.fBaja").value(DEFAULT_F_BAJA.toString()))
            .andExpect(jsonPath("$.prioridadCarga").value(DEFAULT_PRIORIDAD_CARGA.doubleValue()))
            .andExpect(jsonPath("$.apIVA").value(DEFAULT_AP_IVA.toString()))
            .andExpect(jsonPath("$.apReq").value(DEFAULT_AP_REQ.toString()))
            .andExpect(jsonPath("$.valAlbaran").value(DEFAULT_VAL_ALBARAN.toString()))
            .andExpect(jsonPath("$.facXAlbaran").value(DEFAULT_FAC_X_ALBARAN.toString()))
            .andExpect(jsonPath("$.dto1").value(DEFAULT_DTO_1.doubleValue()))
            .andExpect(jsonPath("$.dto2").value(DEFAULT_DTO_2.doubleValue()))
            .andExpect(jsonPath("$.dto3").value(DEFAULT_DTO_3.doubleValue()))
            .andExpect(jsonPath("$.dtoTras").value(DEFAULT_DTO_TRAS.doubleValue()))
            .andExpect(jsonPath("$.idGc").value(DEFAULT_ID_GC.toString()))
            .andExpect(jsonPath("$.valPedido").value(DEFAULT_VAL_PEDIDO.toString()))
            .andExpect(jsonPath("$.valPuntos").value(DEFAULT_VAL_PUNTOS.toString()))
            .andExpect(jsonPath("$.dPago1").value(DEFAULT_D_PAGO_1.doubleValue()))
            .andExpect(jsonPath("$.dPago2").value(DEFAULT_D_PAGO_2.doubleValue()))
            .andExpect(jsonPath("$.dPago3").value(DEFAULT_D_PAGO_3.doubleValue()))
            .andExpect(jsonPath("$.desdeVaca").value(DEFAULT_DESDE_VACA.toString()))
            .andExpect(jsonPath("$.hastaVaca").value(DEFAULT_HASTA_VACA.toString()))
            .andExpect(jsonPath("$.web").value(DEFAULT_WEB.toString()))
            .andExpect(jsonPath("$.movil").value(DEFAULT_MOVIL.toString()))
            .andExpect(jsonPath("$.fax").value(DEFAULT_FAX.toString()))
            .andExpect(jsonPath("$.ctaContable").value(DEFAULT_CTA_CONTABLE.doubleValue()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()))
            .andExpect(jsonPath("$.observacionesPed").value(DEFAULT_OBSERVACIONES_PED.toString()))
            .andExpect(jsonPath("$.observacionesAlb").value(DEFAULT_OBSERVACIONES_ALB.toString()))
            .andExpect(jsonPath("$.observacionesFac").value(DEFAULT_OBSERVACIONES_FAC.toString()))
            .andExpect(jsonPath("$.noGiroVaca").value(DEFAULT_NO_GIRO_VACA.toString()))
            .andExpect(jsonPath("$.observacionesDireccion").value(DEFAULT_OBSERVACIONES_DIRECCION.toString()));
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
            .nombreFiscal(UPDATED_NOMBRE_FISCAL)
            .codigo(UPDATED_CODIGO)
            .estado(UPDATED_ESTADO)
            .fAlta(UPDATED_F_ALTA)
            .fBaja(UPDATED_F_BAJA)
            .prioridadCarga(UPDATED_PRIORIDAD_CARGA)
            .apIVA(UPDATED_AP_IVA)
            .apReq(UPDATED_AP_REQ)
            .valAlbaran(UPDATED_VAL_ALBARAN)
            .facXAlbaran(UPDATED_FAC_X_ALBARAN)
            .dto1(UPDATED_DTO_1)
            .dto2(UPDATED_DTO_2)
            .dto3(UPDATED_DTO_3)
            .dtoTras(UPDATED_DTO_TRAS)
            .idGc(UPDATED_ID_GC)
            .valPedido(UPDATED_VAL_PEDIDO)
            .valPuntos(UPDATED_VAL_PUNTOS)
            .dPago1(UPDATED_D_PAGO_1)
            .dPago2(UPDATED_D_PAGO_2)
            .dPago3(UPDATED_D_PAGO_3)
            .desdeVaca(UPDATED_DESDE_VACA)
            .hastaVaca(UPDATED_HASTA_VACA)
            .web(UPDATED_WEB)
            .movil(UPDATED_MOVIL)
            .fax(UPDATED_FAX)
            .ctaContable(UPDATED_CTA_CONTABLE)
            .observaciones(UPDATED_OBSERVACIONES)
            .observacionesPed(UPDATED_OBSERVACIONES_PED)
            .observacionesAlb(UPDATED_OBSERVACIONES_ALB)
            .observacionesFac(UPDATED_OBSERVACIONES_FAC)
            .noGiroVaca(UPDATED_NO_GIRO_VACA)
            .observacionesDireccion(UPDATED_OBSERVACIONES_DIRECCION);

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
        assertThat(testDatosUsuario.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testDatosUsuario.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testDatosUsuario.getfAlta()).isEqualTo(UPDATED_F_ALTA);
        assertThat(testDatosUsuario.getfBaja()).isEqualTo(UPDATED_F_BAJA);
        assertThat(testDatosUsuario.getPrioridadCarga()).isEqualTo(UPDATED_PRIORIDAD_CARGA);
        assertThat(testDatosUsuario.getApIVA()).isEqualTo(UPDATED_AP_IVA);
        assertThat(testDatosUsuario.getApReq()).isEqualTo(UPDATED_AP_REQ);
        assertThat(testDatosUsuario.getValAlbaran()).isEqualTo(UPDATED_VAL_ALBARAN);
        assertThat(testDatosUsuario.getFacXAlbaran()).isEqualTo(UPDATED_FAC_X_ALBARAN);
        assertThat(testDatosUsuario.getDto1()).isEqualTo(UPDATED_DTO_1);
        assertThat(testDatosUsuario.getDto2()).isEqualTo(UPDATED_DTO_2);
        assertThat(testDatosUsuario.getDto3()).isEqualTo(UPDATED_DTO_3);
        assertThat(testDatosUsuario.getDtoTras()).isEqualTo(UPDATED_DTO_TRAS);
        assertThat(testDatosUsuario.getIdGc()).isEqualTo(UPDATED_ID_GC);
        assertThat(testDatosUsuario.getValPedido()).isEqualTo(UPDATED_VAL_PEDIDO);
        assertThat(testDatosUsuario.getValPuntos()).isEqualTo(UPDATED_VAL_PUNTOS);
        assertThat(testDatosUsuario.getdPago1()).isEqualTo(UPDATED_D_PAGO_1);
        assertThat(testDatosUsuario.getdPago2()).isEqualTo(UPDATED_D_PAGO_2);
        assertThat(testDatosUsuario.getdPago3()).isEqualTo(UPDATED_D_PAGO_3);
        assertThat(testDatosUsuario.getDesdeVaca()).isEqualTo(UPDATED_DESDE_VACA);
        assertThat(testDatosUsuario.getHastaVaca()).isEqualTo(UPDATED_HASTA_VACA);
        assertThat(testDatosUsuario.getWeb()).isEqualTo(UPDATED_WEB);
        assertThat(testDatosUsuario.getMovil()).isEqualTo(UPDATED_MOVIL);
        assertThat(testDatosUsuario.getFax()).isEqualTo(UPDATED_FAX);
        assertThat(testDatosUsuario.getCtaContable()).isEqualTo(UPDATED_CTA_CONTABLE);
        assertThat(testDatosUsuario.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
        assertThat(testDatosUsuario.getObservacionesPed()).isEqualTo(UPDATED_OBSERVACIONES_PED);
        assertThat(testDatosUsuario.getObservacionesAlb()).isEqualTo(UPDATED_OBSERVACIONES_ALB);
        assertThat(testDatosUsuario.getObservacionesFac()).isEqualTo(UPDATED_OBSERVACIONES_FAC);
        assertThat(testDatosUsuario.getNoGiroVaca()).isEqualTo(UPDATED_NO_GIRO_VACA);
        assertThat(testDatosUsuario.getObservacionesDireccion()).isEqualTo(UPDATED_OBSERVACIONES_DIRECCION);
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
