package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.InterioresArmarios;
import com.torga.pedidos.repository.InterioresArmariosRepository;
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
 * REST controller for managing InterioresArmarios.
 */
@RestController
@RequestMapping("/api")
public class InterioresArmariosResource {

    private final Logger log = LoggerFactory.getLogger(InterioresArmariosResource.class);

    private static final String ENTITY_NAME = "interioresArmarios";

    private final InterioresArmariosRepository interioresArmariosRepository;

    public InterioresArmariosResource(InterioresArmariosRepository interioresArmariosRepository) {
        this.interioresArmariosRepository = interioresArmariosRepository;
    }

    /**
     * POST  /interiores-armarios : Create a new interioresArmarios.
     *
     * @param interioresArmarios the interioresArmarios to create
     * @return the ResponseEntity with status 201 (Created) and with body the new interioresArmarios, or with status 400 (Bad Request) if the interioresArmarios has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/interiores-armarios")
    @Timed
    public ResponseEntity<InterioresArmarios> createInterioresArmarios(@RequestBody InterioresArmarios interioresArmarios) throws URISyntaxException {
        log.debug("REST request to save InterioresArmarios : {}", interioresArmarios);
        if (interioresArmarios.getId() != null) {
            throw new BadRequestAlertException("A new interioresArmarios cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InterioresArmarios result = interioresArmariosRepository.save(interioresArmarios);
        return ResponseEntity.created(new URI("/api/interiores-armarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /interiores-armarios : Updates an existing interioresArmarios.
     *
     * @param interioresArmarios the interioresArmarios to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated interioresArmarios,
     * or with status 400 (Bad Request) if the interioresArmarios is not valid,
     * or with status 500 (Internal Server Error) if the interioresArmarios couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/interiores-armarios")
    @Timed
    public ResponseEntity<InterioresArmarios> updateInterioresArmarios(@RequestBody InterioresArmarios interioresArmarios) throws URISyntaxException {
        log.debug("REST request to update InterioresArmarios : {}", interioresArmarios);
        if (interioresArmarios.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InterioresArmarios result = interioresArmariosRepository.save(interioresArmarios);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, interioresArmarios.getId().toString()))
            .body(result);
    }

    /**
     * GET  /interiores-armarios : get all the interioresArmarios.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of interioresArmarios in body
     */
    @GetMapping("/interiores-armarios")
    @Timed
    public ResponseEntity<List<InterioresArmarios>> getAllInterioresArmarios(Pageable pageable) {
        log.debug("REST request to get a page of InterioresArmarios");
        Page<InterioresArmarios> page = interioresArmariosRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/interiores-armarios");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /interiores-armarios/:id : get the "id" interioresArmarios.
     *
     * @param id the id of the interioresArmarios to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the interioresArmarios, or with status 404 (Not Found)
     */
    @GetMapping("/interiores-armarios/{id}")
    @Timed
    public ResponseEntity<InterioresArmarios> getInterioresArmarios(@PathVariable Long id) {
        log.debug("REST request to get InterioresArmarios : {}", id);
        Optional<InterioresArmarios> interioresArmarios = interioresArmariosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(interioresArmarios);
    }

    /**
     * DELETE  /interiores-armarios/:id : delete the "id" interioresArmarios.
     *
     * @param id the id of the interioresArmarios to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/interiores-armarios/{id}")
    @Timed
    public ResponseEntity<Void> deleteInterioresArmarios(@PathVariable Long id) {
        log.debug("REST request to delete InterioresArmarios : {}", id);

        interioresArmariosRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
