package com.torga.pedidos.web.rest;

import com.torga.pedidos.TorgaPedidosApp;

import com.torga.pedidos.domain.ProductosComposicion;
import com.torga.pedidos.domain.ProductosDormitorio;
import com.torga.pedidos.domain.DimensionesProductoTipo;
import com.torga.pedidos.domain.Composicion;
import com.torga.pedidos.repository.ProductosComposicionRepository;
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
 * Test class for the ProductosComposicionResource REST controller.
 *
 * @see ProductosComposicionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgaPedidosApp.class)
public class ProductosComposicionResourceIntTest {

    @Autowired
    private ProductosComposicionRepository productosComposicionRepository;

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

    private MockMvc restProductosComposicionMockMvc;

    private ProductosComposicion productosComposicion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductosComposicionResource productosComposicionResource = new ProductosComposicionResource(productosComposicionRepository);
        this.restProductosComposicionMockMvc = MockMvcBuilders.standaloneSetup(productosComposicionResource)
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
    public static ProductosComposicion createEntity(EntityManager em) {
        ProductosComposicion productosComposicion = new ProductosComposicion();
        // Add required entity
        ProductosDormitorio productosDormitorio = ProductosDormitorioResourceIntTest.createEntity(em);
        em.persist(productosDormitorio);
        em.flush();
        productosComposicion.setProductosDormitorio(productosDormitorio);
        // Add required entity
        DimensionesProductoTipo dimensionesProductoTipo = DimensionesProductoTipoResourceIntTest.createEntity(em);
        em.persist(dimensionesProductoTipo);
        em.flush();
        productosComposicion.setDimensionesProductoTipo(dimensionesProductoTipo);
        // Add required entity
        Composicion composicion = ComposicionResourceIntTest.createEntity(em);
        em.persist(composicion);
        em.flush();
        productosComposicion.setComposicion(composicion);
        return productosComposicion;
    }

    @Before
    public void initTest() {
        productosComposicion = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductosComposicion() throws Exception {
        int databaseSizeBeforeCreate = productosComposicionRepository.findAll().size();

        // Create the ProductosComposicion
        restProductosComposicionMockMvc.perform(post("/api/productos-composicions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productosComposicion)))
            .andExpect(status().isCreated());

        // Validate the ProductosComposicion in the database
        List<ProductosComposicion> productosComposicionList = productosComposicionRepository.findAll();
        assertThat(productosComposicionList).hasSize(databaseSizeBeforeCreate + 1);
        ProductosComposicion testProductosComposicion = productosComposicionList.get(productosComposicionList.size() - 1);
    }

    @Test
    @Transactional
    public void createProductosComposicionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productosComposicionRepository.findAll().size();

        // Create the ProductosComposicion with an existing ID
        productosComposicion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductosComposicionMockMvc.perform(post("/api/productos-composicions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productosComposicion)))
            .andExpect(status().isBadRequest());

        // Validate the ProductosComposicion in the database
        List<ProductosComposicion> productosComposicionList = productosComposicionRepository.findAll();
        assertThat(productosComposicionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProductosComposicions() throws Exception {
        // Initialize the database
        productosComposicionRepository.saveAndFlush(productosComposicion);

        // Get all the productosComposicionList
        restProductosComposicionMockMvc.perform(get("/api/productos-composicions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productosComposicion.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getProductosComposicion() throws Exception {
        // Initialize the database
        productosComposicionRepository.saveAndFlush(productosComposicion);

        // Get the productosComposicion
        restProductosComposicionMockMvc.perform(get("/api/productos-composicions/{id}", productosComposicion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productosComposicion.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProductosComposicion() throws Exception {
        // Get the productosComposicion
        restProductosComposicionMockMvc.perform(get("/api/productos-composicions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductosComposicion() throws Exception {
        // Initialize the database
        productosComposicionRepository.saveAndFlush(productosComposicion);

        int databaseSizeBeforeUpdate = productosComposicionRepository.findAll().size();

        // Update the productosComposicion
        ProductosComposicion updatedProductosComposicion = productosComposicionRepository.findById(productosComposicion.getId()).get();
        // Disconnect from session so that the updates on updatedProductosComposicion are not directly saved in db
        em.detach(updatedProductosComposicion);

        restProductosComposicionMockMvc.perform(put("/api/productos-composicions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductosComposicion)))
            .andExpect(status().isOk());

        // Validate the ProductosComposicion in the database
        List<ProductosComposicion> productosComposicionList = productosComposicionRepository.findAll();
        assertThat(productosComposicionList).hasSize(databaseSizeBeforeUpdate);
        ProductosComposicion testProductosComposicion = productosComposicionList.get(productosComposicionList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingProductosComposicion() throws Exception {
        int databaseSizeBeforeUpdate = productosComposicionRepository.findAll().size();

        // Create the ProductosComposicion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductosComposicionMockMvc.perform(put("/api/productos-composicions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productosComposicion)))
            .andExpect(status().isBadRequest());

        // Validate the ProductosComposicion in the database
        List<ProductosComposicion> productosComposicionList = productosComposicionRepository.findAll();
        assertThat(productosComposicionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductosComposicion() throws Exception {
        // Initialize the database
        productosComposicionRepository.saveAndFlush(productosComposicion);

        int databaseSizeBeforeDelete = productosComposicionRepository.findAll().size();

        // Get the productosComposicion
        restProductosComposicionMockMvc.perform(delete("/api/productos-composicions/{id}", productosComposicion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductosComposicion> productosComposicionList = productosComposicionRepository.findAll();
        assertThat(productosComposicionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductosComposicion.class);
        ProductosComposicion productosComposicion1 = new ProductosComposicion();
        productosComposicion1.setId(1L);
        ProductosComposicion productosComposicion2 = new ProductosComposicion();
        productosComposicion2.setId(productosComposicion1.getId());
        assertThat(productosComposicion1).isEqualTo(productosComposicion2);
        productosComposicion2.setId(2L);
        assertThat(productosComposicion1).isNotEqualTo(productosComposicion2);
        productosComposicion1.setId(null);
        assertThat(productosComposicion1).isNotEqualTo(productosComposicion2);
    }
}
