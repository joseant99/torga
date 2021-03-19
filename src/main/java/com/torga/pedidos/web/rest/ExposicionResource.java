package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Exposicion;
import com.torga.pedidos.repository.ExposicionRepository;
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
 * REST controller for managing Exposicion.
 */
@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
@RequestMapping("/api")
public class ExposicionResource {

    private final Logger log = LoggerFactory.getLogger(ExposicionResource.class);

    private static final String ENTITY_NAME = "exposicion";

    private final ExposicionRepository exposicionRepository;

    public ExposicionResource(ExposicionRepository exposicionRepository) {
        this.exposicionRepository = exposicionRepository;
    }

    /**
     * POST  /exposicions : Create a new exposicion.
     *
     * @param exposicion the exposicion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new exposicion, or with status 400 (Bad Request) if the exposicion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/exposicions")
    @Timed
    public ResponseEntity<Exposicion> createExposicion(@RequestBody Exposicion exposicion) throws URISyntaxException {
        log.debug("REST request to save Exposicion : {}", exposicion);
        if (exposicion.getId() != null) {
            throw new BadRequestAlertException("A new exposicion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Exposicion result = exposicionRepository.save(exposicion);
        return ResponseEntity.created(new URI("/api/exposicions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /exposicions : Updates an existing exposicion.
     *
     * @param exposicion the exposicion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated exposicion,
     * or with status 400 (Bad Request) if the exposicion is not valid,
     * or with status 500 (Internal Server Error) if the exposicion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/exposicions")
    @Timed
    public ResponseEntity<Exposicion> updateExposicion(@RequestBody Exposicion exposicion) throws URISyntaxException {
        log.debug("REST request to update Exposicion : {}", exposicion);
        if (exposicion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Exposicion result = exposicionRepository.save(exposicion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, exposicion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /exposicions : get all the exposicions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of exposicions in body
     */
    @GetMapping("/exposicions")
    @Timed
    public ResponseEntity<List<Exposicion>> getAllExposicions(Pageable pageable) {
        log.debug("REST request to get a page of Exposicions");
        Page<Exposicion> page = exposicionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/exposicions");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    /**
     * GET  /exposicions : get all the exposicions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of exposicions in body
     */
    @GetMapping("/exposicions1")
    @Timed
    public ResponseEntity<Collection<Exposicion>> getAllExposicions1(Pageable pageable) {
        log.debug("REST request to get a page of Exposicions");
        Collection<Exposicion> page = exposicionRepository.todos();
        return ResponseEntity.ok().body(page);
    }

    /**
     * GET  /exposicions/:id : get the "id" exposicion.
     *
     * @param id the id of the exposicion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the exposicion, or with status 404 (Not Found)
     */
    @GetMapping("/exposicions/{id}")
    @Timed
    public ResponseEntity<Exposicion> getExposicion(@PathVariable Long id) {
        log.debug("REST request to get Exposicion : {}", id);
        Optional<Exposicion> exposicion = exposicionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(exposicion);
    }

    /**
     * DELETE  /exposicions/:id : delete the "id" exposicion.
     *
     * @param id the id of the exposicion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/exposicions/{id}")
    @Timed
    public ResponseEntity<Void> deleteExposicion(@PathVariable Long id) {
        log.debug("REST request to delete Exposicion : {}", id);

        exposicionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
