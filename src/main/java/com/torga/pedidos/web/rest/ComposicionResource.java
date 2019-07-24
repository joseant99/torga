package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Composicion;
import com.torga.pedidos.repository.ComposicionRepository;
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

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Composicion.
 */
@RestController
@RequestMapping("/api")
public class ComposicionResource {

    private final Logger log = LoggerFactory.getLogger(ComposicionResource.class);

    private static final String ENTITY_NAME = "composicion";

    private final ComposicionRepository composicionRepository;

    public ComposicionResource(ComposicionRepository composicionRepository) {
        this.composicionRepository = composicionRepository;
    }

    /**
     * POST  /composicions : Create a new composicion.
     *
     * @param composicion the composicion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new composicion, or with status 400 (Bad Request) if the composicion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/composicions")
    @Timed
    public ResponseEntity<Composicion> createComposicion(@Valid @RequestBody Composicion composicion) throws URISyntaxException {
        log.debug("REST request to save Composicion : {}", composicion);
        if (composicion.getId() != null) {
            throw new BadRequestAlertException("A new composicion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Composicion result = composicionRepository.save(composicion);
        return ResponseEntity.created(new URI("/api/composicions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /composicions : Updates an existing composicion.
     *
     * @param composicion the composicion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated composicion,
     * or with status 400 (Bad Request) if the composicion is not valid,
     * or with status 500 (Internal Server Error) if the composicion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/composicions")
    @Timed
    public ResponseEntity<Composicion> updateComposicion(@Valid @RequestBody Composicion composicion) throws URISyntaxException {
        log.debug("REST request to update Composicion : {}", composicion);
        if (composicion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Composicion result = composicionRepository.save(composicion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, composicion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /composicions : get all the composicions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of composicions in body
     */
    @GetMapping("/composicions")
    @Timed
    public ResponseEntity<List<Composicion>> getAllComposicions(Pageable pageable) {
        log.debug("REST request to get a page of Composicions");
        Page<Composicion> page = composicionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/composicions");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /composicions/:id : get the "id" composicion.
     *
     * @param id the id of the composicion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the composicion, or with status 404 (Not Found)
     */
    @GetMapping("/composicions/{id}")
    @Timed
    public ResponseEntity<Composicion> getComposicion(@PathVariable Long id) {
        log.debug("REST request to get Composicion : {}", id);
        Optional<Composicion> composicion = composicionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(composicion);
    }

    /**
     * DELETE  /composicions/:id : delete the "id" composicion.
     *
     * @param id the id of the composicion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/composicions/{id}")
    @Timed
    public ResponseEntity<Void> deleteComposicion(@PathVariable Long id) {
        log.debug("REST request to delete Composicion : {}", id);

        composicionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
