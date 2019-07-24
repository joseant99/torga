package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Interiores;
import com.torga.pedidos.repository.InterioresRepository;
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
 * REST controller for managing Interiores.
 */
@RestController
@RequestMapping("/api")
public class InterioresResource {

    private final Logger log = LoggerFactory.getLogger(InterioresResource.class);

    private static final String ENTITY_NAME = "interiores";

    private final InterioresRepository interioresRepository;

    public InterioresResource(InterioresRepository interioresRepository) {
        this.interioresRepository = interioresRepository;
    }

    /**
     * POST  /interiores : Create a new interiores.
     *
     * @param interiores the interiores to create
     * @return the ResponseEntity with status 201 (Created) and with body the new interiores, or with status 400 (Bad Request) if the interiores has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/interiores")
    @Timed
    public ResponseEntity<Interiores> createInteriores(@Valid @RequestBody Interiores interiores) throws URISyntaxException {
        log.debug("REST request to save Interiores : {}", interiores);
        if (interiores.getId() != null) {
            throw new BadRequestAlertException("A new interiores cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Interiores result = interioresRepository.save(interiores);
        return ResponseEntity.created(new URI("/api/interiores/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /interiores : Updates an existing interiores.
     *
     * @param interiores the interiores to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated interiores,
     * or with status 400 (Bad Request) if the interiores is not valid,
     * or with status 500 (Internal Server Error) if the interiores couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/interiores")
    @Timed
    public ResponseEntity<Interiores> updateInteriores(@Valid @RequestBody Interiores interiores) throws URISyntaxException {
        log.debug("REST request to update Interiores : {}", interiores);
        if (interiores.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Interiores result = interioresRepository.save(interiores);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, interiores.getId().toString()))
            .body(result);
    }

    /**
     * GET  /interiores : get all the interiores.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of interiores in body
     */
    @GetMapping("/interiores")
    @Timed
    public ResponseEntity<List<Interiores>> getAllInteriores(Pageable pageable) {
        log.debug("REST request to get a page of Interiores");
        Page<Interiores> page = interioresRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/interiores");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /interiores/:id : get the "id" interiores.
     *
     * @param id the id of the interiores to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the interiores, or with status 404 (Not Found)
     */
    @GetMapping("/interiores/{id}")
    @Timed
    public ResponseEntity<Interiores> getInteriores(@PathVariable Long id) {
        log.debug("REST request to get Interiores : {}", id);
        Optional<Interiores> interiores = interioresRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(interiores);
    }

    /**
     * DELETE  /interiores/:id : delete the "id" interiores.
     *
     * @param id the id of the interiores to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/interiores/{id}")
    @Timed
    public ResponseEntity<Void> deleteInteriores(@PathVariable Long id) {
        log.debug("REST request to delete Interiores : {}", id);

        interioresRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
