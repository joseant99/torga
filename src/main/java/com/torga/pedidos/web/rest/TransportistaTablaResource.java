package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.TransportistaTabla;
import com.torga.pedidos.repository.TransportistaTablaRepository;
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
 * REST controller for managing TransportistaTabla.
 */
@RestController
@RequestMapping("/api")
public class TransportistaTablaResource {

    private final Logger log = LoggerFactory.getLogger(TransportistaTablaResource.class);

    private static final String ENTITY_NAME = "transportistaTabla";

    private final TransportistaTablaRepository transportistaTablaRepository;

    public TransportistaTablaResource(TransportistaTablaRepository transportistaTablaRepository) {
        this.transportistaTablaRepository = transportistaTablaRepository;
    }

    /**
     * POST  /transportista-tablas : Create a new transportistaTabla.
     *
     * @param transportistaTabla the transportistaTabla to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transportistaTabla, or with status 400 (Bad Request) if the transportistaTabla has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transportista-tablas")
    @Timed
    public ResponseEntity<TransportistaTabla> createTransportistaTabla(@RequestBody TransportistaTabla transportistaTabla) throws URISyntaxException {
        log.debug("REST request to save TransportistaTabla : {}", transportistaTabla);
        if (transportistaTabla.getId() != null) {
            throw new BadRequestAlertException("A new transportistaTabla cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransportistaTabla result = transportistaTablaRepository.save(transportistaTabla);
        return ResponseEntity.created(new URI("/api/transportista-tablas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transportista-tablas : Updates an existing transportistaTabla.
     *
     * @param transportistaTabla the transportistaTabla to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transportistaTabla,
     * or with status 400 (Bad Request) if the transportistaTabla is not valid,
     * or with status 500 (Internal Server Error) if the transportistaTabla couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transportista-tablas")
    @Timed
    public ResponseEntity<TransportistaTabla> updateTransportistaTabla(@RequestBody TransportistaTabla transportistaTabla) throws URISyntaxException {
        log.debug("REST request to update TransportistaTabla : {}", transportistaTabla);
        if (transportistaTabla.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransportistaTabla result = transportistaTablaRepository.save(transportistaTabla);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transportistaTabla.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transportista-tablas : get all the transportistaTablas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of transportistaTablas in body
     */
    @GetMapping("/transportista-tablas")
    @Timed
    public ResponseEntity<List<TransportistaTabla>> getAllTransportistaTablas(Pageable pageable) {
        log.debug("REST request to get a page of TransportistaTablas");
        Page<TransportistaTabla> page = transportistaTablaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/transportista-tablas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /transportista-tablas/:id : get the "id" transportistaTabla.
     *
     * @param id the id of the transportistaTabla to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transportistaTabla, or with status 404 (Not Found)
     */
    @GetMapping("/transportista-tablas/{id}")
    @Timed
    public ResponseEntity<TransportistaTabla> getTransportistaTabla(@PathVariable Long id) {
        log.debug("REST request to get TransportistaTabla : {}", id);
        Optional<TransportistaTabla> transportistaTabla = transportistaTablaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(transportistaTabla);
    }

    /**
     * DELETE  /transportista-tablas/:id : delete the "id" transportistaTabla.
     *
     * @param id the id of the transportistaTabla to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transportista-tablas/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransportistaTabla(@PathVariable Long id) {
        log.debug("REST request to delete TransportistaTabla : {}", id);

        transportistaTablaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
