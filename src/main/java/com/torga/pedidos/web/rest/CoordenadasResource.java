package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Coordenadas;
import com.torga.pedidos.repository.CoordenadasRepository;
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
 * REST controller for managing Coordenadas.
 */
@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
@RequestMapping("/api")
public class CoordenadasResource {

    private final Logger log = LoggerFactory.getLogger(CoordenadasResource.class);

    private static final String ENTITY_NAME = "coordenadas";

    private final CoordenadasRepository coordenadasRepository;

    public CoordenadasResource(CoordenadasRepository coordenadasRepository) {
        this.coordenadasRepository = coordenadasRepository;
    }

    /**
     * POST  /coordenadas : Create a new coordenadas.
     *
     * @param coordenadas the coordenadas to create
     * @return the ResponseEntity with status 201 (Created) and with body the new coordenadas, or with status 400 (Bad Request) if the coordenadas has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/coordenadas")
    @Timed
    public ResponseEntity<Coordenadas> createCoordenadas(@RequestBody Coordenadas coordenadas) throws URISyntaxException {
        log.debug("REST request to save Coordenadas : {}", coordenadas);
        if (coordenadas.getId() != null) {
            throw new BadRequestAlertException("A new coordenadas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Coordenadas result = coordenadasRepository.save(coordenadas);
        return ResponseEntity.created(new URI("/api/coordenadas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /coordenadas : Updates an existing coordenadas.
     *
     * @param coordenadas the coordenadas to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated coordenadas,
     * or with status 400 (Bad Request) if the coordenadas is not valid,
     * or with status 500 (Internal Server Error) if the coordenadas couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/coordenadas")
    @Timed
    public ResponseEntity<Coordenadas> updateCoordenadas(@RequestBody Coordenadas coordenadas) throws URISyntaxException {
        log.debug("REST request to update Coordenadas : {}", coordenadas);
        if (coordenadas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Coordenadas result = coordenadasRepository.save(coordenadas);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, coordenadas.getId().toString()))
            .body(result);
    }

    /**
     * GET  /coordenadas : get all the coordenadas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of coordenadas in body
     */
    @GetMapping("/coordenadas")
    @Timed
    public ResponseEntity<List<Coordenadas>> getAllCoordenadas(Pageable pageable) {
        log.debug("REST request to get a page of Coordenadas");
        Page<Coordenadas> page = coordenadasRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/coordenadas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    /**
     * GET  /coordenadas : get all the coordenadas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of coordenadas in body
     */
    @GetMapping("/coordenadas1")
    @Timed
    public ResponseEntity<Collection<Coordenadas>> getAllCoordenadas1(Pageable pageable) {
    	Collection<Coordenadas> page = coordenadasRepository.todos();
        return ResponseEntity.ok().body(page);
    }

    /**
     * GET  /coordenadas/:id : get the "id" coordenadas.
     *
     * @param id the id of the coordenadas to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the coordenadas, or with status 404 (Not Found)
     */
    @GetMapping("/coordenadas/{id}")
    @Timed
    public ResponseEntity<Coordenadas> getCoordenadas(@PathVariable Long id) {
        log.debug("REST request to get Coordenadas : {}", id);
        Optional<Coordenadas> coordenadas = coordenadasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(coordenadas);
    }

    /**
     * DELETE  /coordenadas/:id : delete the "id" coordenadas.
     *
     * @param id the id of the coordenadas to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/coordenadas/{id}")
    @Timed
    public ResponseEntity<Void> deleteCoordenadas(@PathVariable Long id) {
        log.debug("REST request to delete Coordenadas : {}", id);

        coordenadasRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
