package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.RepresenTorga;
import com.torga.pedidos.repository.RepresenTorgaRepository;
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
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing RepresenTorga.
 */
@RestController
@RequestMapping("/api")
public class RepresenTorgaResource {

    private final Logger log = LoggerFactory.getLogger(RepresenTorgaResource.class);

    private static final String ENTITY_NAME = "represenTorga";

    private final RepresenTorgaRepository represenTorgaRepository;

    public RepresenTorgaResource(RepresenTorgaRepository represenTorgaRepository) {
        this.represenTorgaRepository = represenTorgaRepository;
    }

    /**
     * POST  /represen-torgas : Create a new represenTorga.
     *
     * @param represenTorga the represenTorga to create
     * @return the ResponseEntity with status 201 (Created) and with body the new represenTorga, or with status 400 (Bad Request) if the represenTorga has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/represen-torgas")
    @Timed
    public ResponseEntity<RepresenTorga> createRepresenTorga(@RequestBody RepresenTorga represenTorga) throws URISyntaxException {
        log.debug("REST request to save RepresenTorga : {}", represenTorga);
        if (represenTorga.getId() != null) {
            throw new BadRequestAlertException("A new represenTorga cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RepresenTorga result = represenTorgaRepository.save(represenTorga);
        return ResponseEntity.created(new URI("/api/represen-torgas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /represen-torgas : Updates an existing represenTorga.
     *
     * @param represenTorga the represenTorga to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated represenTorga,
     * or with status 400 (Bad Request) if the represenTorga is not valid,
     * or with status 500 (Internal Server Error) if the represenTorga couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/represen-torgas")
    @Timed
    public ResponseEntity<RepresenTorga> updateRepresenTorga(@RequestBody RepresenTorga represenTorga) throws URISyntaxException {
        log.debug("REST request to update RepresenTorga : {}", represenTorga);
        if (represenTorga.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RepresenTorga result = represenTorgaRepository.save(represenTorga);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, represenTorga.getId().toString()))
            .body(result);
    }

    /**
     * GET  /represen-torgas : get all the represenTorgas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of represenTorgas in body
     */
    @GetMapping("/represen-torgas")
    @Timed
    public ResponseEntity<List<RepresenTorga>> getAllRepresenTorgas(Pageable pageable) {
        log.debug("REST request to get a page of RepresenTorgas");
        Page<RepresenTorga> page = represenTorgaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/represen-torgas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    

    @GetMapping("/represen-torgas-id/{id}")
    @Timed
    public ResponseEntity<Collection<RepresenTorga>> getAllRepresenTorgasId(@PathVariable Long id) {
        log.debug("REST request to get a page of RepresenTorgas");
        Collection<RepresenTorga> page = represenTorgaRepository.findIdUsu(id);
        return ResponseEntity.ok().body(page);
    }

    /**
     * GET  /represen-torgas/:id : get the "id" represenTorga.
     *
     * @param id the id of the represenTorga to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the represenTorga, or with status 404 (Not Found)
     */
    @GetMapping("/represen-torgas/{id}")
    @Timed
    public ResponseEntity<RepresenTorga> getRepresenTorga(@PathVariable Long id) {
        log.debug("REST request to get RepresenTorga : {}", id);
        Optional<RepresenTorga> represenTorga = represenTorgaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(represenTorga);
    }

    /**
     * DELETE  /represen-torgas/:id : delete the "id" represenTorga.
     *
     * @param id the id of the represenTorga to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/represen-torgas/{id}")
    @Timed
    public ResponseEntity<Void> deleteRepresenTorga(@PathVariable Long id) {
        log.debug("REST request to delete RepresenTorga : {}", id);

        represenTorgaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
