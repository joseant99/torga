package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Iluminacion;
import com.torga.pedidos.repository.IluminacionRepository;
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
 * REST controller for managing Iluminacion.
 */
@RestController
@RequestMapping("/api")
public class IluminacionResource {

    private final Logger log = LoggerFactory.getLogger(IluminacionResource.class);

    private static final String ENTITY_NAME = "iluminacion";

    private final IluminacionRepository iluminacionRepository;

    public IluminacionResource(IluminacionRepository iluminacionRepository) {
        this.iluminacionRepository = iluminacionRepository;
    }

    /**
     * POST  /iluminacions : Create a new iluminacion.
     *
     * @param iluminacion the iluminacion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new iluminacion, or with status 400 (Bad Request) if the iluminacion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/iluminacions")
    @Timed
    public ResponseEntity<Iluminacion> createIluminacion(@RequestBody Iluminacion iluminacion) throws URISyntaxException {
        log.debug("REST request to save Iluminacion : {}", iluminacion);
        if (iluminacion.getId() != null) {
            throw new BadRequestAlertException("A new iluminacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Iluminacion result = iluminacionRepository.save(iluminacion);
        return ResponseEntity.created(new URI("/api/iluminacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /iluminacions : Updates an existing iluminacion.
     *
     * @param iluminacion the iluminacion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated iluminacion,
     * or with status 400 (Bad Request) if the iluminacion is not valid,
     * or with status 500 (Internal Server Error) if the iluminacion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/iluminacions")
    @Timed
    public ResponseEntity<Iluminacion> updateIluminacion(@RequestBody Iluminacion iluminacion) throws URISyntaxException {
        log.debug("REST request to update Iluminacion : {}", iluminacion);
        if (iluminacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Iluminacion result = iluminacionRepository.save(iluminacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, iluminacion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /iluminacions : get all the iluminacions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of iluminacions in body
     */
    @GetMapping("/iluminacions")
    @Timed
    public ResponseEntity<List<Iluminacion>> getAllIluminacions(Pageable pageable) {
        log.debug("REST request to get a page of Iluminacions");
        Page<Iluminacion> page = iluminacionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/iluminacions");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /iluminacions/:id : get the "id" iluminacion.
     *
     * @param id the id of the iluminacion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the iluminacion, or with status 404 (Not Found)
     */
    @GetMapping("/iluminacions/{id}")
    @Timed
    public ResponseEntity<Iluminacion> getIluminacion(@PathVariable Long id) {
        log.debug("REST request to get Iluminacion : {}", id);
        Optional<Iluminacion> iluminacion = iluminacionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(iluminacion);
    }

    /**
     * DELETE  /iluminacions/:id : delete the "id" iluminacion.
     *
     * @param id the id of the iluminacion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/iluminacions/{id}")
    @Timed
    public ResponseEntity<Void> deleteIluminacion(@PathVariable Long id) {
        log.debug("REST request to delete Iluminacion : {}", id);

        iluminacionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
