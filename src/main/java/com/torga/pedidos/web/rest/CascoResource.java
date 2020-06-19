package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Casco;
import com.torga.pedidos.repository.CascoRepository;
import com.torga.pedidos.web.rest.errors.BadRequestAlertException;
import com.torga.pedidos.web.rest.util.HeaderUtil;
import com.torga.pedidos.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

import org.hibernate.mapping.Collection;
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
 * REST controller for managing Casco.
 */
@RestController
@RequestMapping("/api")
public class CascoResource {

    private final Logger log = LoggerFactory.getLogger(CascoResource.class);

    private static final String ENTITY_NAME = "casco";

    private final CascoRepository cascoRepository;

    public CascoResource(CascoRepository cascoRepository) {
        this.cascoRepository = cascoRepository;
    }

    /**
     * POST  /cascos : Create a new casco.
     *
     * @param casco the casco to create
     * @return the ResponseEntity with status 201 (Created) and with body the new casco, or with status 400 (Bad Request) if the casco has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cascos")
    @Timed
    public ResponseEntity<Casco> createCasco(@RequestBody Casco casco) throws URISyntaxException {
        log.debug("REST request to save Casco : {}", casco);
        if (casco.getId() != null) {
            throw new BadRequestAlertException("A new casco cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Casco result = cascoRepository.save(casco);
        return ResponseEntity.created(new URI("/api/cascos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cascos : Updates an existing casco.
     *
     * @param casco the casco to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated casco,
     * or with status 400 (Bad Request) if the casco is not valid,
     * or with status 500 (Internal Server Error) if the casco couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cascos")
    @Timed
    public ResponseEntity<Casco> updateCasco(@RequestBody Casco casco) throws URISyntaxException {
        log.debug("REST request to update Casco : {}", casco);
        if (casco.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Casco result = cascoRepository.save(casco);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, casco.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cascos : get all the cascos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cascos in body
     */
    @GetMapping("/cascos")
    @Timed
    public ResponseEntity<List<Casco>> getAllCascos(Pageable pageable) {
        log.debug("REST request to get a page of Cascos");
        Page<Casco> page = cascoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cascos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /cascos/:id : get the "id" casco.
     *
     * @param id the id of the casco to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the casco, or with status 404 (Not Found)
     */
    @GetMapping("/cascos/{id}")
    @Timed
    public ResponseEntity<Casco> getCasco(@PathVariable Long id) {
        log.debug("REST request to get Casco : {}", id);
        Optional<Casco> casco = cascoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(casco);
    }
    
    /**
     * GET  /cascos : get all the cascos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cascos in body
     */
    @GetMapping("/cascos-bus/{ancho}/{alto}/{id}")
    @Timed
    public ResponseEntity<java.util.Collection<Casco>> getAllCascosBus( @PathVariable("ancho") Float ancho , @PathVariable("alto") Float alto ,@PathVariable("id") Long id ) {
        log.debug("REST request to get a page of Cascos");
        java.util.Collection<Casco> page =   cascoRepository.findAncho(ancho,alto,id);
        return ResponseEntity.ok().body(page);
    }

    /**
     * DELETE  /cascos/:id : delete the "id" casco.
     *
     * @param id the id of the casco to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cascos/{id}")
    @Timed
    public ResponseEntity<Void> deleteCasco(@PathVariable Long id) {
        log.debug("REST request to delete Casco : {}", id);

        cascoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
