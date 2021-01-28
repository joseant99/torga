package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Fecha_entrega;
import com.torga.pedidos.repository.Fecha_entregaRepository;
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
 * REST controller for managing Fecha_entrega.
 */
@RestController
@RequestMapping("/api")
public class Fecha_entregaResource {

    private final Logger log = LoggerFactory.getLogger(Fecha_entregaResource.class);

    private static final String ENTITY_NAME = "fecha_entrega";

    private final Fecha_entregaRepository fecha_entregaRepository;

    public Fecha_entregaResource(Fecha_entregaRepository fecha_entregaRepository) {
        this.fecha_entregaRepository = fecha_entregaRepository;
    }

    /**
     * POST  /fecha-entregas : Create a new fecha_entrega.
     *
     * @param fecha_entrega the fecha_entrega to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fecha_entrega, or with status 400 (Bad Request) if the fecha_entrega has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fecha-entregas")
    @Timed
    public ResponseEntity<Fecha_entrega> createFecha_entrega(@RequestBody Fecha_entrega fecha_entrega) throws URISyntaxException {
        log.debug("REST request to save Fecha_entrega : {}", fecha_entrega);
        if (fecha_entrega.getId() != null) {
            throw new BadRequestAlertException("A new fecha_entrega cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fecha_entrega result = fecha_entregaRepository.save(fecha_entrega);
        return ResponseEntity.created(new URI("/api/fecha-entregas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fecha-entregas : Updates an existing fecha_entrega.
     *
     * @param fecha_entrega the fecha_entrega to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fecha_entrega,
     * or with status 400 (Bad Request) if the fecha_entrega is not valid,
     * or with status 500 (Internal Server Error) if the fecha_entrega couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fecha-entregas")
    @Timed
    public ResponseEntity<Fecha_entrega> updateFecha_entrega(@RequestBody Fecha_entrega fecha_entrega) throws URISyntaxException {
        log.debug("REST request to update Fecha_entrega : {}", fecha_entrega);
        if (fecha_entrega.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Fecha_entrega result = fecha_entregaRepository.save(fecha_entrega);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fecha_entrega.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fecha-entregas : get all the fecha_entregas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of fecha_entregas in body
     */
    @GetMapping("/fecha-entregas")
    @Timed
    public ResponseEntity<List<Fecha_entrega>> getAllFecha_entregas(Pageable pageable) {
        log.debug("REST request to get a page of Fecha_entregas");
        Page<Fecha_entrega> page = fecha_entregaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/fecha-entregas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /fecha-entregas/:id : get the "id" fecha_entrega.
     *
     * @param id the id of the fecha_entrega to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fecha_entrega, or with status 404 (Not Found)
     */
    @GetMapping("/fecha-entregas/{id}")
    @Timed
    public ResponseEntity<Fecha_entrega> getFecha_entrega(@PathVariable Long id) {
        log.debug("REST request to get Fecha_entrega : {}", id);
        Optional<Fecha_entrega> fecha_entrega = fecha_entregaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fecha_entrega);
    }

    /**
     * DELETE  /fecha-entregas/:id : delete the "id" fecha_entrega.
     *
     * @param id the id of the fecha_entrega to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fecha-entregas/{id}")
    @Timed
    public ResponseEntity<Void> deleteFecha_entrega(@PathVariable Long id) {
        log.debug("REST request to delete Fecha_entrega : {}", id);

        fecha_entregaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
