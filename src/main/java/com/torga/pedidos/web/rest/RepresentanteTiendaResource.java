package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.RepresentanteTienda;
import com.torga.pedidos.repository.RepresentanteTiendaRepository;
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
 * REST controller for managing RepresentanteTienda.
 */
@RestController
@RequestMapping("/api")
public class RepresentanteTiendaResource {

    private final Logger log = LoggerFactory.getLogger(RepresentanteTiendaResource.class);

    private static final String ENTITY_NAME = "representanteTienda";

    private final RepresentanteTiendaRepository representanteTiendaRepository;

    public RepresentanteTiendaResource(RepresentanteTiendaRepository representanteTiendaRepository) {
        this.representanteTiendaRepository = representanteTiendaRepository;
    }

    /**
     * POST  /representante-tiendas : Create a new representanteTienda.
     *
     * @param representanteTienda the representanteTienda to create
     * @return the ResponseEntity with status 201 (Created) and with body the new representanteTienda, or with status 400 (Bad Request) if the representanteTienda has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/representante-tiendas")
    @Timed
    public ResponseEntity<RepresentanteTienda> createRepresentanteTienda(@RequestBody RepresentanteTienda representanteTienda) throws URISyntaxException {
        log.debug("REST request to save RepresentanteTienda : {}", representanteTienda);
        if (representanteTienda.getId() != null) {
            throw new BadRequestAlertException("A new representanteTienda cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RepresentanteTienda result = representanteTiendaRepository.save(representanteTienda);
        return ResponseEntity.created(new URI("/api/representante-tiendas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /representante-tiendas : Updates an existing representanteTienda.
     *
     * @param representanteTienda the representanteTienda to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated representanteTienda,
     * or with status 400 (Bad Request) if the representanteTienda is not valid,
     * or with status 500 (Internal Server Error) if the representanteTienda couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/representante-tiendas")
    @Timed
    public ResponseEntity<RepresentanteTienda> updateRepresentanteTienda(@RequestBody RepresentanteTienda representanteTienda) throws URISyntaxException {
        log.debug("REST request to update RepresentanteTienda : {}", representanteTienda);
        if (representanteTienda.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RepresentanteTienda result = representanteTiendaRepository.save(representanteTienda);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, representanteTienda.getId().toString()))
            .body(result);
    }

    /**
     * GET  /representante-tiendas : get all the representanteTiendas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of representanteTiendas in body
     */
    @GetMapping("/representante-tiendas")
    @Timed
    public ResponseEntity<List<RepresentanteTienda>> getAllRepresentanteTiendas(Pageable pageable) {
        log.debug("REST request to get a page of RepresentanteTiendas");
        Page<RepresentanteTienda> page = representanteTiendaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/representante-tiendas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /representante-tiendas/:id : get the "id" representanteTienda.
     *
     * @param id the id of the representanteTienda to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the representanteTienda, or with status 404 (Not Found)
     */
    @GetMapping("/representante-tiendas/{id}")
    @Timed
    public ResponseEntity<RepresentanteTienda> getRepresentanteTienda(@PathVariable Long id) {
        log.debug("REST request to get RepresentanteTienda : {}", id);
        Optional<RepresentanteTienda> representanteTienda = representanteTiendaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(representanteTienda);
    }

    /**
     * DELETE  /representante-tiendas/:id : delete the "id" representanteTienda.
     *
     * @param id the id of the representanteTienda to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/representante-tiendas/{id}")
    @Timed
    public ResponseEntity<Void> deleteRepresentanteTienda(@PathVariable Long id) {
        log.debug("REST request to delete RepresentanteTienda : {}", id);

        representanteTiendaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
