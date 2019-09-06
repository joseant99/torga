package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.PagosTorgaTiendas;
import com.torga.pedidos.repository.PagosTorgaTiendasRepository;
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

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PagosTorgaTiendas.
 */
@RestController
@RequestMapping("/api")
public class PagosTorgaTiendasResource {

    private final Logger log = LoggerFactory.getLogger(PagosTorgaTiendasResource.class);

    private static final String ENTITY_NAME = "pagosTorgaTiendas";

    private final PagosTorgaTiendasRepository pagosTorgaTiendasRepository;

    public PagosTorgaTiendasResource(PagosTorgaTiendasRepository pagosTorgaTiendasRepository) {
        this.pagosTorgaTiendasRepository = pagosTorgaTiendasRepository;
    }

    /**
     * POST  /pagos-torga-tiendas : Create a new pagosTorgaTiendas.
     *
     * @param pagosTorgaTiendas the pagosTorgaTiendas to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pagosTorgaTiendas, or with status 400 (Bad Request) if the pagosTorgaTiendas has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pagos-torga-tiendas")
    @Timed
    public ResponseEntity<PagosTorgaTiendas> createPagosTorgaTiendas(@RequestBody PagosTorgaTiendas pagosTorgaTiendas) throws URISyntaxException {
        log.debug("REST request to save PagosTorgaTiendas : {}", pagosTorgaTiendas);
        if (pagosTorgaTiendas.getId() != null) {
            throw new BadRequestAlertException("A new pagosTorgaTiendas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PagosTorgaTiendas result = pagosTorgaTiendasRepository.save(pagosTorgaTiendas);
        return ResponseEntity.created(new URI("/api/pagos-torga-tiendas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pagos-torga-tiendas : Updates an existing pagosTorgaTiendas.
     *
     * @param pagosTorgaTiendas the pagosTorgaTiendas to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pagosTorgaTiendas,
     * or with status 400 (Bad Request) if the pagosTorgaTiendas is not valid,
     * or with status 500 (Internal Server Error) if the pagosTorgaTiendas couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pagos-torga-tiendas")
    @Timed
    public ResponseEntity<PagosTorgaTiendas> updatePagosTorgaTiendas(@RequestBody PagosTorgaTiendas pagosTorgaTiendas) throws URISyntaxException {
        log.debug("REST request to update PagosTorgaTiendas : {}", pagosTorgaTiendas);
        if (pagosTorgaTiendas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PagosTorgaTiendas result = pagosTorgaTiendasRepository.save(pagosTorgaTiendas);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pagosTorgaTiendas.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pagos-torga-tiendas : get all the pagosTorgaTiendas.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of pagosTorgaTiendas in body
     */
    @GetMapping("/pagos-torga-tiendas")
    @Timed
    public ResponseEntity<List<PagosTorgaTiendas>> getAllPagosTorgaTiendas(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of PagosTorgaTiendas");
        Page<PagosTorgaTiendas> page;
        if (eagerload) {
        	page = pagosTorgaTiendasRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = pagosTorgaTiendasRepository.findAllWithEagerRelationships(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/pagos-torga-tiendas?eagerload=%b", eagerload));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /pagos-torga-tiendas/:id : get the "id" pagosTorgaTiendas.
     *
     * @param id the id of the pagosTorgaTiendas to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pagosTorgaTiendas, or with status 404 (Not Found)
     */
    @GetMapping("/pagos-torga-tiendas/{id}")
    @Timed
    public ResponseEntity<PagosTorgaTiendas> getPagosTorgaTiendas(@PathVariable Long id) {
        log.debug("REST request to get PagosTorgaTiendas : {}", id);
        Optional<PagosTorgaTiendas> pagosTorgaTiendas = pagosTorgaTiendasRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(pagosTorgaTiendas);
    }

    /**
     * DELETE  /pagos-torga-tiendas/:id : delete the "id" pagosTorgaTiendas.
     *
     * @param id the id of the pagosTorgaTiendas to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pagos-torga-tiendas/{id}")
    @Timed
    public ResponseEntity<Void> deletePagosTorgaTiendas(@PathVariable Long id) {
        log.debug("REST request to delete PagosTorgaTiendas : {}", id);

        pagosTorgaTiendasRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
