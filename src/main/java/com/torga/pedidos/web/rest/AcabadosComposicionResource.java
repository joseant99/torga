package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.AcabadosComposicion;
import com.torga.pedidos.repository.AcabadosComposicionRepository;
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
 * REST controller for managing AcabadosComposicion.
 */
@RestController
@RequestMapping("/api")
public class AcabadosComposicionResource {

    private final Logger log = LoggerFactory.getLogger(AcabadosComposicionResource.class);

    private static final String ENTITY_NAME = "acabadosComposicion";

    private final AcabadosComposicionRepository acabadosComposicionRepository;

    public AcabadosComposicionResource(AcabadosComposicionRepository acabadosComposicionRepository) {
        this.acabadosComposicionRepository = acabadosComposicionRepository;
    }

    /**
     * POST  /acabados-composicions : Create a new acabadosComposicion.
     *
     * @param acabadosComposicion the acabadosComposicion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new acabadosComposicion, or with status 400 (Bad Request) if the acabadosComposicion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/acabados-composicions")
    @Timed
    public ResponseEntity<AcabadosComposicion> createAcabadosComposicion(@Valid @RequestBody AcabadosComposicion acabadosComposicion) throws URISyntaxException {
        log.debug("REST request to save AcabadosComposicion : {}", acabadosComposicion);
        if (acabadosComposicion.getId() != null) {
            throw new BadRequestAlertException("A new acabadosComposicion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AcabadosComposicion result = acabadosComposicionRepository.save(acabadosComposicion);
        return ResponseEntity.created(new URI("/api/acabados-composicions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /acabados-composicions : Updates an existing acabadosComposicion.
     *
     * @param acabadosComposicion the acabadosComposicion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated acabadosComposicion,
     * or with status 400 (Bad Request) if the acabadosComposicion is not valid,
     * or with status 500 (Internal Server Error) if the acabadosComposicion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/acabados-composicions")
    @Timed
    public ResponseEntity<AcabadosComposicion> updateAcabadosComposicion(@Valid @RequestBody AcabadosComposicion acabadosComposicion) throws URISyntaxException {
        log.debug("REST request to update AcabadosComposicion : {}", acabadosComposicion);
        if (acabadosComposicion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AcabadosComposicion result = acabadosComposicionRepository.save(acabadosComposicion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, acabadosComposicion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /acabados-composicions : get all the acabadosComposicions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of acabadosComposicions in body
     */
    @GetMapping("/acabados-composicions")
    @Timed
    public ResponseEntity<List<AcabadosComposicion>> getAllAcabadosComposicions(Pageable pageable) {
        log.debug("REST request to get a page of AcabadosComposicions");
        Page<AcabadosComposicion> page = acabadosComposicionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/acabados-composicions");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /acabados-composicions/:id : get the "id" acabadosComposicion.
     *
     * @param id the id of the acabadosComposicion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the acabadosComposicion, or with status 404 (Not Found)
     */
    @GetMapping("/acabados-composicions/{id}")
    @Timed
    public ResponseEntity<AcabadosComposicion> getAcabadosComposicion(@PathVariable Long id) {
        log.debug("REST request to get AcabadosComposicion : {}", id);
        Optional<AcabadosComposicion> acabadosComposicion = acabadosComposicionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(acabadosComposicion);
    }

    /**
     * DELETE  /acabados-composicions/:id : delete the "id" acabadosComposicion.
     *
     * @param id the id of the acabadosComposicion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/acabados-composicions/{id}")
    @Timed
    public ResponseEntity<Void> deleteAcabadosComposicion(@PathVariable Long id) {
        log.debug("REST request to delete AcabadosComposicion : {}", id);

        acabadosComposicionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
