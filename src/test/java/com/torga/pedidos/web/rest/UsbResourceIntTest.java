package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.Usb;
import com.torga.pedidos.repository.UsbRepository;
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
 * Test class for the UsbResource REST controller.
 *
 * @see UsbResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class UsbResourceIntTest {

    private static final String DEFAULT_MENSAJE = "AAAAAAAAAA";
    private static final String UPDATED_MENSAJE = "BBBBBBBBBB";

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    @Autowired
    private UsbRepository usbRepository;

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

    private MockMvc restUsbMockMvc;

    private Usb usb;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UsbResource usbResource = new UsbResource(usbRepository);
        this.restUsbMockMvc = MockMvcBuilders.standaloneSetup(usbResource)
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
    public static Usb createEntity(EntityManager em) {
        Usb usb = new Usb()
            .mensaje(DEFAULT_MENSAJE)
            .precio(DEFAULT_PRECIO);
        return usb;
    }

    @Before
    public void initTest() {
        usb = createEntity(em);
    }

    @Test
    @Transactional
    public void createUsb() throws Exception {
        int databaseSizeBeforeCreate = usbRepository.findAll().size();

        // Create the Usb
        restUsbMockMvc.perform(post("/api/usbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usb)))
            .andExpect(status().isCreated());

        // Validate the Usb in the database
        List<Usb> usbList = usbRepository.findAll();
        assertThat(usbList).hasSize(databaseSizeBeforeCreate + 1);
        Usb testUsb = usbList.get(usbList.size() - 1);
        assertThat(testUsb.getMensaje()).isEqualTo(DEFAULT_MENSAJE);
        assertThat(testUsb.getPrecio()).isEqualTo(DEFAULT_PRECIO);
    }

    @Test
    @Transactional
    public void createUsbWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = usbRepository.findAll().size();

        // Create the Usb with an existing ID
        usb.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUsbMockMvc.perform(post("/api/usbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usb)))
            .andExpect(status().isBadRequest());

        // Validate the Usb in the database
        List<Usb> usbList = usbRepository.findAll();
        assertThat(usbList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUsbs() throws Exception {
        // Initialize the database
        usbRepository.saveAndFlush(usb);

        // Get all the usbList
        restUsbMockMvc.perform(get("/api/usbs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(usb.getId().intValue())))
            .andExpect(jsonPath("$.[*].mensaje").value(hasItem(DEFAULT_MENSAJE.toString())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getUsb() throws Exception {
        // Initialize the database
        usbRepository.saveAndFlush(usb);

        // Get the usb
        restUsbMockMvc.perform(get("/api/usbs/{id}", usb.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(usb.getId().intValue()))
            .andExpect(jsonPath("$.mensaje").value(DEFAULT_MENSAJE.toString()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUsb() throws Exception {
        // Get the usb
        restUsbMockMvc.perform(get("/api/usbs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUsb() throws Exception {
        // Initialize the database
        usbRepository.saveAndFlush(usb);

        int databaseSizeBeforeUpdate = usbRepository.findAll().size();

        // Update the usb
        Usb updatedUsb = usbRepository.findById(usb.getId()).get();
        // Disconnect from session so that the updates on updatedUsb are not directly saved in db
        em.detach(updatedUsb);
        updatedUsb
            .mensaje(UPDATED_MENSAJE)
            .precio(UPDATED_PRECIO);

        restUsbMockMvc.perform(put("/api/usbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUsb)))
            .andExpect(status().isOk());

        // Validate the Usb in the database
        List<Usb> usbList = usbRepository.findAll();
        assertThat(usbList).hasSize(databaseSizeBeforeUpdate);
        Usb testUsb = usbList.get(usbList.size() - 1);
        assertThat(testUsb.getMensaje()).isEqualTo(UPDATED_MENSAJE);
        assertThat(testUsb.getPrecio()).isEqualTo(UPDATED_PRECIO);
    }

    @Test
    @Transactional
    public void updateNonExistingUsb() throws Exception {
        int databaseSizeBeforeUpdate = usbRepository.findAll().size();

        // Create the Usb

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsbMockMvc.perform(put("/api/usbs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usb)))
            .andExpect(status().isBadRequest());

        // Validate the Usb in the database
        List<Usb> usbList = usbRepository.findAll();
        assertThat(usbList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUsb() throws Exception {
        // Initialize the database
        usbRepository.saveAndFlush(usb);

        int databaseSizeBeforeDelete = usbRepository.findAll().size();

        // Get the usb
        restUsbMockMvc.perform(delete("/api/usbs/{id}", usb.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Usb> usbList = usbRepository.findAll();
        assertThat(usbList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Usb.class);
        Usb usb1 = new Usb();
        usb1.setId(1L);
        Usb usb2 = new Usb();
        usb2.setId(usb1.getId());
        assertThat(usb1).isEqualTo(usb2);
        usb2.setId(2L);
        assertThat(usb1).isNotEqualTo(usb2);
        usb1.setId(null);
        assertThat(usb1).isNotEqualTo(usb2);
    }
}
