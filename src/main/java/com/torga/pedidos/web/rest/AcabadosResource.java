package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Acabados;
import com.torga.pedidos.repository.AcabadosRepository;
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
 * REST controller for managing Acabados.
 */
@RestController
@RequestMapping("/api")
public class AcabadosResource {

    private final Logger log = LoggerFactory.getLogger(AcabadosResource.class);

    private static final String ENTITY_NAME = "acabados";

    private final AcabadosRepository acabadosRepository;

    public AcabadosResource(AcabadosRepository acabadosRepository) {
        this.acabadosRepository = acabadosRepository;
    }

    /**
     * POST  /acabados : Create a new acabados.
     *
     * @param acabados the acabados to create
     * @return the ResponseEntity with status 201 (Created) and with body the new acabados, or with status 400 (Bad Request) if the acabados has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/acabados")
    @Timed
    public ResponseEntity<Acabados> createAcabados(@Valid @RequestBody Acabados acabados) throws URISyntaxException {
        log.debug("REST request to save Acabados : {}", acabados);
        if (acabados.getId() != null) {
            throw new BadRequestAlertException("A new acabados cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Acabados result = acabadosRepository.save(acabados);
        return ResponseEntity.created(new URI("/api/acabados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /acabados : Updates an existing acabados.
     *
     * @param acabados the acabados to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated acabados,
     * or with status 400 (Bad Request) if the acabados is not valid,
     * or with status 500 (Internal Server Error) if the acabados couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/acabados")
    @Timed
    public ResponseEntity<Acabados> updateAcabados(@Valid @RequestBody Acabados acabados) throws URISyntaxException {
        log.debug("REST request to update Acabados : {}", acabados);
        if (acabados.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Acabados result = acabadosRepository.save(acabados);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, acabados.getId().toString()))
            .body(result);
    }

    /**
     * GET  /acabados : get all the acabados.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of acabados in body
     */
    @GetMapping("/acabados")
    @Timed
    public ResponseEntity<List<Acabados>> getAllAcabados(Pageable pageable) {
        log.debug("REST request to get a page of Acabados");
        Page<Acabados> page = acabadosRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/acabados");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /acabados/:id : get the "id" acabados.
     *
     * @param id the id of the acabados to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the acabados, or with status 404 (Not Found)
     */
    @GetMapping("/acabados/{id}")
    @Timed
    public ResponseEntity<Acabados> getAcabados(@PathVariable Long id) {
        log.debug("REST request to get Acabados : {}", id);
        Optional<Acabados> acabados = acabadosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(acabados);
    }

    /**
     * DELETE  /acabados/:id : delete the "id" acabados.
     *
     * @param id the id of the acabados to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/acabados/{id}")
    @Timed
    public ResponseEntity<Void> deleteAcabados(@PathVariable Long id) {
        log.debug("REST request to delete Acabados : {}", id);

        acabadosRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
