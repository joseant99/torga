package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.PrecioTiendaProductos;
import com.torga.pedidos.repository.PrecioTiendaProductosRepository;
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
 * REST controller for managing PrecioTiendaProductos.
 */
@RestController
@RequestMapping("/api")
public class PrecioTiendaProductosResource {

    private final Logger log = LoggerFactory.getLogger(PrecioTiendaProductosResource.class);

    private static final String ENTITY_NAME = "precioTiendaProductos";

    private final PrecioTiendaProductosRepository precioTiendaProductosRepository;

    public PrecioTiendaProductosResource(PrecioTiendaProductosRepository precioTiendaProductosRepository) {
        this.precioTiendaProductosRepository = precioTiendaProductosRepository;
    }

    /**
     * POST  /precio-tienda-productos : Create a new precioTiendaProductos.
     *
     * @param precioTiendaProductos the precioTiendaProductos to create
     * @return the ResponseEntity with status 201 (Created) and with body the new precioTiendaProductos, or with status 400 (Bad Request) if the precioTiendaProductos has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/precio-tienda-productos")
    @Timed
    public ResponseEntity<PrecioTiendaProductos> createPrecioTiendaProductos(@RequestBody PrecioTiendaProductos precioTiendaProductos) throws URISyntaxException {
        log.debug("REST request to save PrecioTiendaProductos : {}", precioTiendaProductos);
        if (precioTiendaProductos.getId() != null) {
            throw new BadRequestAlertException("A new precioTiendaProductos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrecioTiendaProductos result = precioTiendaProductosRepository.save(precioTiendaProductos);
        return ResponseEntity.created(new URI("/api/precio-tienda-productos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /precio-tienda-productos : Updates an existing precioTiendaProductos.
     *
     * @param precioTiendaProductos the precioTiendaProductos to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated precioTiendaProductos,
     * or with status 400 (Bad Request) if the precioTiendaProductos is not valid,
     * or with status 500 (Internal Server Error) if the precioTiendaProductos couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/precio-tienda-productos")
    @Timed
    public ResponseEntity<PrecioTiendaProductos> updatePrecioTiendaProductos(@RequestBody PrecioTiendaProductos precioTiendaProductos) throws URISyntaxException {
        log.debug("REST request to update PrecioTiendaProductos : {}", precioTiendaProductos);
        if (precioTiendaProductos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PrecioTiendaProductos result = precioTiendaProductosRepository.save(precioTiendaProductos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, precioTiendaProductos.getId().toString()))
            .body(result);
    }

    /**
     * GET  /precio-tienda-productos : get all the precioTiendaProductos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of precioTiendaProductos in body
     */
    @GetMapping("/precio-tienda-productos")
    @Timed
    public ResponseEntity<List<PrecioTiendaProductos>> getAllPrecioTiendaProductos(Pageable pageable) {
        log.debug("REST request to get a page of PrecioTiendaProductos");
        Page<PrecioTiendaProductos> page = precioTiendaProductosRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/precio-tienda-productos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    

    @GetMapping("/precio-tienda-productos-idBus/{id}/{tienda}")
    @Timed
    public ResponseEntity<Collection<PrecioTiendaProductos>> getAllPrecioTiendaProductosId(@PathVariable("id") Long id , @PathVariable("tienda") Long tienda ) {
        log.debug("REST request to get a page of PrecioTiendaProductos");
        Collection<PrecioTiendaProductos> page = precioTiendaProductosRepository.findProducto(id,tienda);
        return ResponseEntity.ok().body(page);
    }

    /**
     * GET  /precio-tienda-productos/:id : get the "id" precioTiendaProductos.
     *
     * @param id the id of the precioTiendaProductos to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the precioTiendaProductos, or with status 404 (Not Found)
     */
    @GetMapping("/precio-tienda-productos/{id}")
    @Timed
    public ResponseEntity<PrecioTiendaProductos> getPrecioTiendaProductos(@PathVariable Long id) {
        log.debug("REST request to get PrecioTiendaProductos : {}", id);
        Optional<PrecioTiendaProductos> precioTiendaProductos = precioTiendaProductosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(precioTiendaProductos);
    }

    /**
     * DELETE  /precio-tienda-productos/:id : delete the "id" precioTiendaProductos.
     *
     * @param id the id of the precioTiendaProductos to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/precio-tienda-productos/{id}")
    @Timed
    public ResponseEntity<Void> deletePrecioTiendaProductos(@PathVariable Long id) {
        log.debug("REST request to delete PrecioTiendaProductos : {}", id);

        precioTiendaProductosRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
