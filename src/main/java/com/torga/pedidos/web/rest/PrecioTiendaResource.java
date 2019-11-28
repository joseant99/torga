package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.PrecioTienda;
import com.torga.pedidos.repository.PrecioTiendaRepository;
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
 * REST controller for managing PrecioTienda.
 */
@RestController
@RequestMapping("/api")
public class PrecioTiendaResource {

    private final Logger log = LoggerFactory.getLogger(PrecioTiendaResource.class);

    private static final String ENTITY_NAME = "precioTienda";

    private final PrecioTiendaRepository precioTiendaRepository;

    public PrecioTiendaResource(PrecioTiendaRepository precioTiendaRepository) {
        this.precioTiendaRepository = precioTiendaRepository;
    }

    /**
     * POST  /precio-tiendas : Create a new precioTienda.
     *
     * @param precioTienda the precioTienda to create
     * @return the ResponseEntity with status 201 (Created) and with body the new precioTienda, or with status 400 (Bad Request) if the precioTienda has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/precio-tiendas")
    @Timed
    public ResponseEntity<PrecioTienda> createPrecioTienda(@RequestBody PrecioTienda precioTienda) throws URISyntaxException {
        log.debug("REST request to save PrecioTienda : {}", precioTienda);
        if (precioTienda.getId() != null) {
            throw new BadRequestAlertException("A new precioTienda cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrecioTienda result = precioTiendaRepository.save(precioTienda);
        return ResponseEntity.created(new URI("/api/precio-tiendas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /precio-tiendas : Updates an existing precioTienda.
     *
     * @param precioTienda the precioTienda to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated precioTienda,
     * or with status 400 (Bad Request) if the precioTienda is not valid,
     * or with status 500 (Internal Server Error) if the precioTienda couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/precio-tiendas")
    @Timed
    public ResponseEntity<PrecioTienda> updatePrecioTienda(@RequestBody PrecioTienda precioTienda) throws URISyntaxException {
        log.debug("REST request to update PrecioTienda : {}", precioTienda);
        if (precioTienda.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PrecioTienda result = precioTiendaRepository.save(precioTienda);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, precioTienda.getId().toString()))
            .body(result);
    }

    /**
     * GET  /precio-tiendas : get all the precioTiendas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of precioTiendas in body
     */
    @GetMapping("/precio-tiendas")
    @Timed
    public ResponseEntity<List<PrecioTienda>> getAllPrecioTiendas(Pageable pageable) {
        log.debug("REST request to get a page of PrecioTiendas");
        Page<PrecioTienda> page = precioTiendaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/precio-tiendas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    
    /**
     * GET  /precio-tiendas : get all the precioTiendas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of precioTiendas in body
     */
    @GetMapping("/precio-tiendas-buscado/{id}")
    @Timed
    public ResponseEntity<Collection<PrecioTienda>> getAllPrecioTiendasBus(@PathVariable Long id) {
        log.debug("REST request to get a page of PrecioTiendas");
        Collection<PrecioTienda> page = precioTiendaRepository.findProducto(id);
        return ResponseEntity.ok().body(page);
    }
    

    /**
     * GET  /precio-tiendas/:id : get the "id" precioTienda.
     *
     * @param id the id of the precioTienda to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the precioTienda, or with status 404 (Not Found)
     */
    @GetMapping("/precio-tiendas/{id}")
    @Timed
    public ResponseEntity<PrecioTienda> getPrecioTienda(@PathVariable Long id) {
        log.debug("REST request to get PrecioTienda : {}", id);
        Optional<PrecioTienda> precioTienda = precioTiendaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(precioTienda);
    }

    /**
     * DELETE  /precio-tiendas/:id : delete the "id" precioTienda.
     *
     * @param id the id of the precioTienda to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/precio-tiendas/{id}")
    @Timed
    public ResponseEntity<Void> deletePrecioTienda(@PathVariable Long id) {
        log.debug("REST request to delete PrecioTienda : {}", id);

        precioTiendaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
