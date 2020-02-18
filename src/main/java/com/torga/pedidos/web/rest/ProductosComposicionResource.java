package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.ProductosComposicion;
import com.torga.pedidos.repository.ProductosComposicionRepository;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ProductosComposicion.
 */
@RestController
@RequestMapping("/api")
public class ProductosComposicionResource {

    private final Logger log = LoggerFactory.getLogger(ProductosComposicionResource.class);

    private static final String ENTITY_NAME = "productosComposicion";

    private final ProductosComposicionRepository productosComposicionRepository;

    public ProductosComposicionResource(ProductosComposicionRepository productosComposicionRepository) {
        this.productosComposicionRepository = productosComposicionRepository;
    }

    /**
     * POST  /productos-composicions : Create a new productosComposicion.
     *
     * @param productosComposicion the productosComposicion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productosComposicion, or with status 400 (Bad Request) if the productosComposicion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/productos-composicions")
    @Timed
    public ResponseEntity<ProductosComposicion> createProductosComposicion(@Valid @RequestBody ProductosComposicion productosComposicion) throws URISyntaxException {
        log.debug("REST request to save ProductosComposicion : {}", productosComposicion);
        if (productosComposicion.getId() != null) {
            throw new BadRequestAlertException("A new productosComposicion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductosComposicion result = productosComposicionRepository.save(productosComposicion);
        return ResponseEntity.created(new URI("/api/productos-composicions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /productos-composicions : Updates an existing productosComposicion.
     *
     * @param productosComposicion the productosComposicion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productosComposicion,
     * or with status 400 (Bad Request) if the productosComposicion is not valid,
     * or with status 500 (Internal Server Error) if the productosComposicion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/productos-composicions")
    @Timed
    public ResponseEntity<ProductosComposicion> updateProductosComposicion(@Valid @RequestBody ProductosComposicion productosComposicion) throws URISyntaxException {
        log.debug("REST request to update ProductosComposicion : {}", productosComposicion);
        if (productosComposicion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductosComposicion result = productosComposicionRepository.save(productosComposicion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productosComposicion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /productos-composicions : get all the productosComposicions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of productosComposicions in body
     */
    @GetMapping("/productos-composicions")
    @Timed
    public ResponseEntity<List<ProductosComposicion>> getAllProductosComposicions(Pageable pageable) {
        log.debug("REST request to get a page of ProductosComposicions");
        Page<ProductosComposicion> page = productosComposicionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/productos-composicions");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    
    /**
     * GET  /productos-composicions : get all the productosComposicions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of productosComposicions in body
     */
    @GetMapping("/productos-composicions-bus/{id}")
    @Timed
    public ResponseEntity<Collection<ProductosComposicion>> getAllProductosComposicionsBy(@PathVariable Long id) {
        log.debug("REST request to get a page of ProductosComposicions");
        Collection<ProductosComposicion> page = productosComposicionRepository.findByCom(id);
        return ResponseEntity.ok().body(page);
    }
    
    
    
    /**
     * GET  /productos-composicions/:id : get the "id" productosComposicion.
     *
     * @param id the id of the productosComposicion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productosComposicion, or with status 404 (Not Found)
     */
    @GetMapping("/productos-composicions/{id}")
    @Timed
    public ResponseEntity<ProductosComposicion> getProductosComposicion(@PathVariable Long id) {
        log.debug("REST request to get ProductosComposicion : {}", id);
        Optional<ProductosComposicion> productosComposicion = productosComposicionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productosComposicion);
    }

    /**
     * DELETE  /productos-composicions/:id : delete the "id" productosComposicion.
     *
     * @param id the id of the productosComposicion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/productos-composicions/{id}")
    @Timed
    public ResponseEntity<Void> deleteProductosComposicion(@PathVariable Long id) {
        log.debug("REST request to delete ProductosComposicion : {}", id);

        productosComposicionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
