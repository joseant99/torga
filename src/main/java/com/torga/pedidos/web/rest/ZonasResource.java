package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Zonas;
import com.torga.pedidos.repository.ZonasRepository;
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
 * REST controller for managing Zonas.
 */
@RestController
@RequestMapping("/api")
public class ZonasResource {

    private final Logger log = LoggerFactory.getLogger(ZonasResource.class);

    private static final String ENTITY_NAME = "zonas";

    private final ZonasRepository zonasRepository;

    public ZonasResource(ZonasRepository zonasRepository) {
        this.zonasRepository = zonasRepository;
    }

    /**
     * POST  /zonas : Create a new zonas.
     *
     * @param zonas the zonas to create
     * @return the ResponseEntity with status 201 (Created) and with body the new zonas, or with status 400 (Bad Request) if the zonas has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/zonas")
    @Timed
    public ResponseEntity<Zonas> createZonas(@RequestBody Zonas zonas) throws URISyntaxException {
        log.debug("REST request to save Zonas : {}", zonas);
        if (zonas.getId() != null) {
            throw new BadRequestAlertException("A new zonas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Zonas result = zonasRepository.save(zonas);
        return ResponseEntity.created(new URI("/api/zonas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /zonas : Updates an existing zonas.
     *
     * @param zonas the zonas to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated zonas,
     * or with status 400 (Bad Request) if the zonas is not valid,
     * or with status 500 (Internal Server Error) if the zonas couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/zonas")
    @Timed
    public ResponseEntity<Zonas> updateZonas(@RequestBody Zonas zonas) throws URISyntaxException {
        log.debug("REST request to update Zonas : {}", zonas);
        if (zonas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Zonas result = zonasRepository.save(zonas);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, zonas.getId().toString()))
            .body(result);
    }

    /**
     * GET  /zonas : get all the zonas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of zonas in body
     */
    @GetMapping("/zonas")
    @Timed
    public ResponseEntity<List<Zonas>> getAllZonas(Pageable pageable) {
        log.debug("REST request to get a page of Zonas");
        Page<Zonas> page = zonasRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/zonas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /zonas/:id : get the "id" zonas.
     *
     * @param id the id of the zonas to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the zonas, or with status 404 (Not Found)
     */
    @GetMapping("/zonas/{id}")
    @Timed
    public ResponseEntity<Zonas> getZonas(@PathVariable Long id) {
        log.debug("REST request to get Zonas : {}", id);
        Optional<Zonas> zonas = zonasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(zonas);
    }

    /**
     * DELETE  /zonas/:id : delete the "id" zonas.
     *
     * @param id the id of the zonas to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/zonas/{id}")
    @Timed
    public ResponseEntity<Void> deleteZonas(@PathVariable Long id) {
        log.debug("REST request to delete Zonas : {}", id);

        zonasRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
