package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.ProductosPresupuestoPedidos;
import com.torga.pedidos.repository.ProductosPresupuestoPedidosRepository;
import com.torga.pedidos.web.rest.errors.BadRequestAlertException;
import com.torga.pedidos.web.rest.util.HeaderUtil;
import com.torga.pedidos.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ProductosPresupuestoPedidos.
 */
@RestController
@RequestMapping("/api")
public class ProductosPresupuestoPedidosResource {

    private final Logger log = LoggerFactory.getLogger(ProductosPresupuestoPedidosResource.class);

    private static final String ENTITY_NAME = "productosPresupuestoPedidos";

    private final ProductosPresupuestoPedidosRepository productosPresupuestoPedidosRepository;

    public ProductosPresupuestoPedidosResource(ProductosPresupuestoPedidosRepository productosPresupuestoPedidosRepository) {
        this.productosPresupuestoPedidosRepository = productosPresupuestoPedidosRepository;
    }

    /**
     * POST  /productos-presupuesto-pedidos : Create a new productosPresupuestoPedidos.
     *
     * @param productosPresupuestoPedidos the productosPresupuestoPedidos to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productosPresupuestoPedidos, or with status 400 (Bad Request) if the productosPresupuestoPedidos has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/productos-presupuesto-pedidos")
    @Timed
    public ResponseEntity<ProductosPresupuestoPedidos> createProductosPresupuestoPedidos(@RequestBody ProductosPresupuestoPedidos productosPresupuestoPedidos) throws URISyntaxException {
        log.debug("REST request to save ProductosPresupuestoPedidos : {}", productosPresupuestoPedidos);
        if (productosPresupuestoPedidos.getId() != null) {
            throw new BadRequestAlertException("A new productosPresupuestoPedidos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductosPresupuestoPedidos result = productosPresupuestoPedidosRepository.save(productosPresupuestoPedidos);
        return ResponseEntity.created(new URI("/api/productos-presupuesto-pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /productos-presupuesto-pedidos : Updates an existing productosPresupuestoPedidos.
     *
     * @param productosPresupuestoPedidos the productosPresupuestoPedidos to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productosPresupuestoPedidos,
     * or with status 400 (Bad Request) if the productosPresupuestoPedidos is not valid,
     * or with status 500 (Internal Server Error) if the productosPresupuestoPedidos couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/productos-presupuesto-pedidos")
    @Timed
    public ResponseEntity<ProductosPresupuestoPedidos> updateProductosPresupuestoPedidos(@RequestBody ProductosPresupuestoPedidos productosPresupuestoPedidos) throws URISyntaxException {
        log.debug("REST request to update ProductosPresupuestoPedidos : {}", productosPresupuestoPedidos);
        if (productosPresupuestoPedidos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductosPresupuestoPedidos result = productosPresupuestoPedidosRepository.save(productosPresupuestoPedidos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productosPresupuestoPedidos.getId().toString()))
            .body(result);
    }

    /**
     * GET  /productos-presupuesto-pedidos : get all the productosPresupuestoPedidos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of productosPresupuestoPedidos in body
     */
    @GetMapping("/productos-presupuesto-pedidos")
    @Timed
    public ResponseEntity<List<ProductosPresupuestoPedidos>> getAllProductosPresupuestoPedidos(Pageable pageable) {
        log.debug("REST request to get a page of ProductosPresupuestoPedidos");
        Page<ProductosPresupuestoPedidos> page = productosPresupuestoPedidosRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/productos-presupuesto-pedidos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    /**
     * GET  /productos-presupuesto-pedidos : get all the productosPresupuestoPedidos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of productosPresupuestoPedidos in body
     */
    @GetMapping("/productos-presupuesto-pedidos1")
    @Timed
    public ResponseEntity<Collection<ProductosPresupuestoPedidos>> getAllProductosPresupuestoPedidos1() {
        Collection<ProductosPresupuestoPedidos> page = productosPresupuestoPedidosRepository.findByProd1();
        return ResponseEntity.ok().body(page);
    }
    
    /**
     * GET  /productos-presupuesto-pedidos : get all the productosPresupuestoPedidos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of productosPresupuestoPedidos in body
     */
    @GetMapping("/productos-presupuesto-pedidos-id/{id}")
    @Timed
    public ResponseEntity<Collection<ProductosPresupuestoPedidos>> getAllProductosPresupuestoPedidosId(@PathVariable Long id) {
        log.debug("REST request to get a page of ProductosPresupuestoPedidos");
        Collection<ProductosPresupuestoPedidos> page = productosPresupuestoPedidosRepository.findByProd(id);
        return ResponseEntity.ok().body(page);
    }

    /**
     * GET  /productos-presupuesto-pedidos/:id : get the "id" productosPresupuestoPedidos.
     *
     * @param id the id of the productosPresupuestoPedidos to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productosPresupuestoPedidos, or with status 404 (Not Found)
     */
    @GetMapping("/productos-presupuesto-pedidos/{id}")
    @Timed
    public ResponseEntity<ProductosPresupuestoPedidos> getProductosPresupuestoPedidos(@PathVariable Long id) {
        log.debug("REST request to get ProductosPresupuestoPedidos : {}", id);
        Optional<ProductosPresupuestoPedidos> productosPresupuestoPedidos = productosPresupuestoPedidosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productosPresupuestoPedidos);
    }

    /**
     * DELETE  /productos-presupuesto-pedidos/:id : delete the "id" productosPresupuestoPedidos.
     *
     * @param id the id of the productosPresupuestoPedidos to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/productos-presupuesto-pedidos/{id}")
    @Timed
    public ResponseEntity<Void> deleteProductosPresupuestoPedidos(@PathVariable Long id) {
        log.debug("REST request to delete ProductosPresupuestoPedidos : {}", id);

        productosPresupuestoPedidosRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
