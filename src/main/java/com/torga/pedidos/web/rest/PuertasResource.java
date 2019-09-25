package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Puertas;
import com.torga.pedidos.repository.PuertasRepository;
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
 * REST controller for managing Puertas.
 */
@RestController
@RequestMapping("/api")
public class PuertasResource {

    private final Logger log = LoggerFactory.getLogger(PuertasResource.class);

    private static final String ENTITY_NAME = "puertas";

    private final PuertasRepository puertasRepository;

    public PuertasResource(PuertasRepository puertasRepository) {
        this.puertasRepository = puertasRepository;
    }

    /**
     * POST  /puertas : Create a new puertas.
     *
     * @param puertas the puertas to create
     * @return the ResponseEntity with status 201 (Created) and with body the new puertas, or with status 400 (Bad Request) if the puertas has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/puertas")
    @Timed
    public ResponseEntity<Puertas> createPuertas(@RequestBody Puertas puertas) throws URISyntaxException {
        log.debug("REST request to save Puertas : {}", puertas);
        if (puertas.getId() != null) {
            throw new BadRequestAlertException("A new puertas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Puertas result = puertasRepository.save(puertas);
        return ResponseEntity.created(new URI("/api/puertas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /puertas : Updates an existing puertas.
     *
     * @param puertas the puertas to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated puertas,
     * or with status 400 (Bad Request) if the puertas is not valid,
     * or with status 500 (Internal Server Error) if the puertas couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/puertas")
    @Timed
    public ResponseEntity<Puertas> updatePuertas(@RequestBody Puertas puertas) throws URISyntaxException {
        log.debug("REST request to update Puertas : {}", puertas);
        if (puertas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Puertas result = puertasRepository.save(puertas);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, puertas.getId().toString()))
            .body(result);
    }

    /**
     * GET  /puertas : get all the puertas.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of puertas in body
     */
    @GetMapping("/puertas")
    @Timed
    public ResponseEntity<List<Puertas>> getAllPuertas(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Puertas");
        Page<Puertas> page;
        if (eagerload) {
            page = puertasRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = puertasRepository.findAllWithEagerRelationships(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/puertas?eagerload=%b", eagerload));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /puertas/:id : get the "id" puertas.
     *
     * @param id the id of the puertas to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the puertas, or with status 404 (Not Found)
     */
    @GetMapping("/puertas/{id}")
    @Timed
    public ResponseEntity<Puertas> getPuertas(@PathVariable Long id) {
        log.debug("REST request to get Puertas : {}", id);
        Optional<Puertas> puertas = puertasRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(puertas);
    }

    /**
     * DELETE  /puertas/:id : delete the "id" puertas.
     *
     * @param id the id of the puertas to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/puertas/{id}")
    @Timed
    public ResponseEntity<Void> deletePuertas(@PathVariable Long id) {
        log.debug("REST request to delete Puertas : {}", id);

        puertasRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
