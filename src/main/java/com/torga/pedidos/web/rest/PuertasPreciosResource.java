package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Casco;
import com.torga.pedidos.domain.PuertasPrecios;
import com.torga.pedidos.repository.PuertasPreciosRepository;
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
 * REST controller for managing PuertasPrecios.
 */
@RestController
@RequestMapping("/api")
public class PuertasPreciosResource {

    private final Logger log = LoggerFactory.getLogger(PuertasPreciosResource.class);

    private static final String ENTITY_NAME = "puertasPrecios";

    private final PuertasPreciosRepository puertasPreciosRepository;

    public PuertasPreciosResource(PuertasPreciosRepository puertasPreciosRepository) {
        this.puertasPreciosRepository = puertasPreciosRepository;
    }

    /**
     * POST  /puertas-precios : Create a new puertasPrecios.
     *
     * @param puertasPrecios the puertasPrecios to create
     * @return the ResponseEntity with status 201 (Created) and with body the new puertasPrecios, or with status 400 (Bad Request) if the puertasPrecios has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/puertas-precios")
    @Timed
    public ResponseEntity<PuertasPrecios> createPuertasPrecios(@RequestBody PuertasPrecios puertasPrecios) throws URISyntaxException {
        log.debug("REST request to save PuertasPrecios : {}", puertasPrecios);
        if (puertasPrecios.getId() != null) {
            throw new BadRequestAlertException("A new puertasPrecios cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PuertasPrecios result = puertasPreciosRepository.save(puertasPrecios);
        return ResponseEntity.created(new URI("/api/puertas-precios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /puertas-precios : Updates an existing puertasPrecios.
     *
     * @param puertasPrecios the puertasPrecios to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated puertasPrecios,
     * or with status 400 (Bad Request) if the puertasPrecios is not valid,
     * or with status 500 (Internal Server Error) if the puertasPrecios couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/puertas-precios")
    @Timed
    public ResponseEntity<PuertasPrecios> updatePuertasPrecios(@RequestBody PuertasPrecios puertasPrecios) throws URISyntaxException {
        log.debug("REST request to update PuertasPrecios : {}", puertasPrecios);
        if (puertasPrecios.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PuertasPrecios result = puertasPreciosRepository.save(puertasPrecios);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, puertasPrecios.getId().toString()))
            .body(result);
    }

    /**
     * GET  /puertas-precios : get all the puertasPrecios.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of puertasPrecios in body
     */
    @GetMapping("/puertas-precios")
    @Timed
    public ResponseEntity<List<PuertasPrecios>> getAllPuertasPrecios(Pageable pageable) {
        log.debug("REST request to get a page of PuertasPrecios");
        Page<PuertasPrecios> page = puertasPreciosRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/puertas-precios");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /puertas-precios/:id : get the "id" puertasPrecios.
     *
     * @param id the id of the puertasPrecios to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the puertasPrecios, or with status 404 (Not Found)
     */
    @GetMapping("/puertas-precios/{id}")
    @Timed
    public ResponseEntity<PuertasPrecios> getPuertasPrecios(@PathVariable Long id) {
        log.debug("REST request to get PuertasPrecios : {}", id);
        Optional<PuertasPrecios> puertasPrecios = puertasPreciosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(puertasPrecios);
    }
    
    /**
     * GET  /cascos : get all the cascos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cascos in body
     */
    @GetMapping("/puertas-precios-bus/{ancho}/{alto}/{puerta}")
    @Timed
    public ResponseEntity<Collection<PuertasPrecios>> getAllCascosBus( @PathVariable("ancho") String ancho , @PathVariable("alto") Float alto , @PathVariable("puerta") Long puerta ) {
        log.debug("REST request to get a page of Cascos");
        Collection<PuertasPrecios> page = puertasPreciosRepository.findAncho(ancho, alto, puerta);
        return ResponseEntity.ok().body(page);
    }

    /**
     * DELETE  /puertas-precios/:id : delete the "id" puertasPrecios.
     *
     * @param id the id of the puertasPrecios to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/puertas-precios/{id}")
    @Timed
    public ResponseEntity<Void> deletePuertasPrecios(@PathVariable Long id) {
        log.debug("REST request to delete PuertasPrecios : {}", id);

        puertasPreciosRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
