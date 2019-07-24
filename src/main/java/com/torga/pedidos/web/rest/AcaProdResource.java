package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.AcaProd;
import com.torga.pedidos.repository.AcaProdRepository;
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
 * REST controller for managing AcaProd.
 */
@RestController
@RequestMapping("/api")
public class AcaProdResource {

    private final Logger log = LoggerFactory.getLogger(AcaProdResource.class);

    private static final String ENTITY_NAME = "acaProd";

    private final AcaProdRepository acaProdRepository;

    public AcaProdResource(AcaProdRepository acaProdRepository) {
        this.acaProdRepository = acaProdRepository;
    }

    /**
     * POST  /aca-prods : Create a new acaProd.
     *
     * @param acaProd the acaProd to create
     * @return the ResponseEntity with status 201 (Created) and with body the new acaProd, or with status 400 (Bad Request) if the acaProd has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/aca-prods")
    @Timed
    public ResponseEntity<AcaProd> createAcaProd(@Valid @RequestBody AcaProd acaProd) throws URISyntaxException {
        log.debug("REST request to save AcaProd : {}", acaProd);
        if (acaProd.getId() != null) {
            throw new BadRequestAlertException("A new acaProd cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AcaProd result = acaProdRepository.save(acaProd);
        return ResponseEntity.created(new URI("/api/aca-prods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /aca-prods : Updates an existing acaProd.
     *
     * @param acaProd the acaProd to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated acaProd,
     * or with status 400 (Bad Request) if the acaProd is not valid,
     * or with status 500 (Internal Server Error) if the acaProd couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/aca-prods")
    @Timed
    public ResponseEntity<AcaProd> updateAcaProd(@Valid @RequestBody AcaProd acaProd) throws URISyntaxException {
        log.debug("REST request to update AcaProd : {}", acaProd);
        if (acaProd.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AcaProd result = acaProdRepository.save(acaProd);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, acaProd.getId().toString()))
            .body(result);
    }

    /**
     * GET  /aca-prods : get all the acaProds.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of acaProds in body
     */
    @GetMapping("/aca-prods")
    @Timed
    public ResponseEntity<List<AcaProd>> getAllAcaProds(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of AcaProds");
        Page<AcaProd> page;
        if (eagerload) {
            page = acaProdRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = acaProdRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/aca-prods?eagerload=%b", eagerload));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /aca-prods/:id : get the "id" acaProd.
     *
     * @param id the id of the acaProd to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the acaProd, or with status 404 (Not Found)
     */
    @GetMapping("/aca-prods/{id}")
    @Timed
    public ResponseEntity<AcaProd> getAcaProd(@PathVariable Long id) {
        log.debug("REST request to get AcaProd : {}", id);
        Optional<AcaProd> acaProd = acaProdRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(acaProd);
    }

    /**
     * DELETE  /aca-prods/:id : delete the "id" acaProd.
     *
     * @param id the id of the acaProd to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/aca-prods/{id}")
    @Timed
    public ResponseEntity<Void> deleteAcaProd(@PathVariable Long id) {
        log.debug("REST request to delete AcaProd : {}", id);

        acaProdRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
