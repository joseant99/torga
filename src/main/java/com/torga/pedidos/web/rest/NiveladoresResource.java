package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Niveladores;
import com.torga.pedidos.repository.NiveladoresRepository;
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
 * REST controller for managing Niveladores.
 */
@RestController
@RequestMapping("/api")
public class NiveladoresResource {

    private final Logger log = LoggerFactory.getLogger(NiveladoresResource.class);

    private static final String ENTITY_NAME = "niveladores";

    private final NiveladoresRepository niveladoresRepository;

    public NiveladoresResource(NiveladoresRepository niveladoresRepository) {
        this.niveladoresRepository = niveladoresRepository;
    }

    /**
     * POST  /niveladores : Create a new niveladores.
     *
     * @param niveladores the niveladores to create
     * @return the ResponseEntity with status 201 (Created) and with body the new niveladores, or with status 400 (Bad Request) if the niveladores has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/niveladores")
    @Timed
    public ResponseEntity<Niveladores> createNiveladores(@RequestBody Niveladores niveladores) throws URISyntaxException {
        log.debug("REST request to save Niveladores : {}", niveladores);
        if (niveladores.getId() != null) {
            throw new BadRequestAlertException("A new niveladores cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Niveladores result = niveladoresRepository.save(niveladores);
        return ResponseEntity.created(new URI("/api/niveladores/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /niveladores : Updates an existing niveladores.
     *
     * @param niveladores the niveladores to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated niveladores,
     * or with status 400 (Bad Request) if the niveladores is not valid,
     * or with status 500 (Internal Server Error) if the niveladores couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/niveladores")
    @Timed
    public ResponseEntity<Niveladores> updateNiveladores(@RequestBody Niveladores niveladores) throws URISyntaxException {
        log.debug("REST request to update Niveladores : {}", niveladores);
        if (niveladores.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Niveladores result = niveladoresRepository.save(niveladores);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, niveladores.getId().toString()))
            .body(result);
    }

    /**
     * GET  /niveladores : get all the niveladores.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of niveladores in body
     */
    @GetMapping("/niveladores")
    @Timed
    public ResponseEntity<List<Niveladores>> getAllNiveladores(Pageable pageable) {
        log.debug("REST request to get a page of Niveladores");
        Page<Niveladores> page = niveladoresRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/niveladores");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /niveladores/:id : get the "id" niveladores.
     *
     * @param id the id of the niveladores to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the niveladores, or with status 404 (Not Found)
     */
    @GetMapping("/niveladores/{id}")
    @Timed
    public ResponseEntity<Niveladores> getNiveladores(@PathVariable Long id) {
        log.debug("REST request to get Niveladores : {}", id);
        Optional<Niveladores> niveladores = niveladoresRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(niveladores);
    }

    /**
     * DELETE  /niveladores/:id : delete the "id" niveladores.
     *
     * @param id the id of the niveladores to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/niveladores/{id}")
    @Timed
    public ResponseEntity<Void> deleteNiveladores(@PathVariable Long id) {
        log.debug("REST request to delete Niveladores : {}", id);

        niveladoresRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
