package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.ProductosPresupuestoPedidos;
import com.torga.pedidos.repository.ProductosPresupuestoPedidosRepository;
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
 * Test class for the ProductosPresupuestoPedidosResource REST controller.
 *
 * @see ProductosPresupuestoPedidosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class ProductosPresupuestoPedidosResourceIntTest {

    @Autowired
    private ProductosPresupuestoPedidosRepository productosPresupuestoPedidosRepository;

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

    private MockMvc restProductosPresupuestoPedidosMockMvc;

    private ProductosPresupuestoPedidos productosPresupuestoPedidos;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductosPresupuestoPedidosResource productosPresupuestoPedidosResource = new ProductosPresupuestoPedidosResource(productosPresupuestoPedidosRepository);
        this.restProductosPresupuestoPedidosMockMvc = MockMvcBuilders.standaloneSetup(productosPresupuestoPedidosResource)
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
    public static ProductosPresupuestoPedidos createEntity(EntityManager em) {
        ProductosPresupuestoPedidos productosPresupuestoPedidos = new ProductosPresupuestoPedidos();
        return productosPresupuestoPedidos;
    }

    @Before
    public void initTest() {
        productosPresupuestoPedidos = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductosPresupuestoPedidos() throws Exception {
        int databaseSizeBeforeCreate = productosPresupuestoPedidosRepository.findAll().size();

        // Create the ProductosPresupuestoPedidos
        restProductosPresupuestoPedidosMockMvc.perform(post("/api/productos-presupuesto-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productosPresupuestoPedidos)))
            .andExpect(status().isCreated());

        // Validate the ProductosPresupuestoPedidos in the database
        List<ProductosPresupuestoPedidos> productosPresupuestoPedidosList = productosPresupuestoPedidosRepository.findAll();
        assertThat(productosPresupuestoPedidosList).hasSize(databaseSizeBeforeCreate + 1);
        ProductosPresupuestoPedidos testProductosPresupuestoPedidos = productosPresupuestoPedidosList.get(productosPresupuestoPedidosList.size() - 1);
    }

    @Test
    @Transactional
    public void createProductosPresupuestoPedidosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productosPresupuestoPedidosRepository.findAll().size();

        // Create the ProductosPresupuestoPedidos with an existing ID
        productosPresupuestoPedidos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductosPresupuestoPedidosMockMvc.perform(post("/api/productos-presupuesto-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productosPresupuestoPedidos)))
            .andExpect(status().isBadRequest());

        // Validate the ProductosPresupuestoPedidos in the database
        List<ProductosPresupuestoPedidos> productosPresupuestoPedidosList = productosPresupuestoPedidosRepository.findAll();
        assertThat(productosPresupuestoPedidosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProductosPresupuestoPedidos() throws Exception {
        // Initialize the database
        productosPresupuestoPedidosRepository.saveAndFlush(productosPresupuestoPedidos);

        // Get all the productosPresupuestoPedidosList
        restProductosPresupuestoPedidosMockMvc.perform(get("/api/productos-presupuesto-pedidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productosPresupuestoPedidos.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getProductosPresupuestoPedidos() throws Exception {
        // Initialize the database
        productosPresupuestoPedidosRepository.saveAndFlush(productosPresupuestoPedidos);

        // Get the productosPresupuestoPedidos
        restProductosPresupuestoPedidosMockMvc.perform(get("/api/productos-presupuesto-pedidos/{id}", productosPresupuestoPedidos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productosPresupuestoPedidos.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProductosPresupuestoPedidos() throws Exception {
        // Get the productosPresupuestoPedidos
        restProductosPresupuestoPedidosMockMvc.perform(get("/api/productos-presupuesto-pedidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductosPresupuestoPedidos() throws Exception {
        // Initialize the database
        productosPresupuestoPedidosRepository.saveAndFlush(productosPresupuestoPedidos);

        int databaseSizeBeforeUpdate = productosPresupuestoPedidosRepository.findAll().size();

        // Update the productosPresupuestoPedidos
        ProductosPresupuestoPedidos updatedProductosPresupuestoPedidos = productosPresupuestoPedidosRepository.findById(productosPresupuestoPedidos.getId()).get();
        // Disconnect from session so that the updates on updatedProductosPresupuestoPedidos are not directly saved in db
        em.detach(updatedProductosPresupuestoPedidos);

        restProductosPresupuestoPedidosMockMvc.perform(put("/api/productos-presupuesto-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductosPresupuestoPedidos)))
            .andExpect(status().isOk());

        // Validate the ProductosPresupuestoPedidos in the database
        List<ProductosPresupuestoPedidos> productosPresupuestoPedidosList = productosPresupuestoPedidosRepository.findAll();
        assertThat(productosPresupuestoPedidosList).hasSize(databaseSizeBeforeUpdate);
        ProductosPresupuestoPedidos testProductosPresupuestoPedidos = productosPresupuestoPedidosList.get(productosPresupuestoPedidosList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingProductosPresupuestoPedidos() throws Exception {
        int databaseSizeBeforeUpdate = productosPresupuestoPedidosRepository.findAll().size();

        // Create the ProductosPresupuestoPedidos

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductosPresupuestoPedidosMockMvc.perform(put("/api/productos-presupuesto-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productosPresupuestoPedidos)))
            .andExpect(status().isBadRequest());

        // Validate the ProductosPresupuestoPedidos in the database
        List<ProductosPresupuestoPedidos> productosPresupuestoPedidosList = productosPresupuestoPedidosRepository.findAll();
        assertThat(productosPresupuestoPedidosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductosPresupuestoPedidos() throws Exception {
        // Initialize the database
        productosPresupuestoPedidosRepository.saveAndFlush(productosPresupuestoPedidos);

        int databaseSizeBeforeDelete = productosPresupuestoPedidosRepository.findAll().size();

        // Get the productosPresupuestoPedidos
        restProductosPresupuestoPedidosMockMvc.perform(delete("/api/productos-presupuesto-pedidos/{id}", productosPresupuestoPedidos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductosPresupuestoPedidos> productosPresupuestoPedidosList = productosPresupuestoPedidosRepository.findAll();
        assertThat(productosPresupuestoPedidosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductosPresupuestoPedidos.class);
        ProductosPresupuestoPedidos productosPresupuestoPedidos1 = new ProductosPresupuestoPedidos();
        productosPresupuestoPedidos1.setId(1L);
        ProductosPresupuestoPedidos productosPresupuestoPedidos2 = new ProductosPresupuestoPedidos();
        productosPresupuestoPedidos2.setId(productosPresupuestoPedidos1.getId());
        assertThat(productosPresupuestoPedidos1).isEqualTo(productosPresupuestoPedidos2);
        productosPresupuestoPedidos2.setId(2L);
        assertThat(productosPresupuestoPedidos1).isNotEqualTo(productosPresupuestoPedidos2);
        productosPresupuestoPedidos1.setId(null);
        assertThat(productosPresupuestoPedidos1).isNotEqualTo(productosPresupuestoPedidos2);
    }
}
