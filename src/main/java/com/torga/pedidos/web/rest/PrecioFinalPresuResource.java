package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.PrecioFinalPresu;
import com.torga.pedidos.repository.PrecioFinalPresuRepository;
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
 * REST controller for managing PrecioFinalPresu.
 */
@RestController
@RequestMapping("/api")
public class PrecioFinalPresuResource {

    private final Logger log = LoggerFactory.getLogger(PrecioFinalPresuResource.class);

    private static final String ENTITY_NAME = "precioFinalPresu";

    private final PrecioFinalPresuRepository precioFinalPresuRepository;

    public PrecioFinalPresuResource(PrecioFinalPresuRepository precioFinalPresuRepository) {
        this.precioFinalPresuRepository = precioFinalPresuRepository;
    }

    /**
     * POST  /precio-final-presus : Create a new precioFinalPresu.
     *
     * @param precioFinalPresu the precioFinalPresu to create
     * @return the ResponseEntity with status 201 (Created) and with body the new precioFinalPresu, or with status 400 (Bad Request) if the precioFinalPresu has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/precio-final-presus")
    @Timed
    public ResponseEntity<PrecioFinalPresu> createPrecioFinalPresu(@RequestBody PrecioFinalPresu precioFinalPresu) throws URISyntaxException {
        log.debug("REST request to save PrecioFinalPresu : {}", precioFinalPresu);
        if (precioFinalPresu.getId() != null) {
            throw new BadRequestAlertException("A new precioFinalPresu cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrecioFinalPresu result = precioFinalPresuRepository.save(precioFinalPresu);
        return ResponseEntity.created(new URI("/api/precio-final-presus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /precio-final-presus : Updates an existing precioFinalPresu.
     *
     * @param precioFinalPresu the precioFinalPresu to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated precioFinalPresu,
     * or with status 400 (Bad Request) if the precioFinalPresu is not valid,
     * or with status 500 (Internal Server Error) if the precioFinalPresu couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/precio-final-presus")
    @Timed
    public ResponseEntity<PrecioFinalPresu> updatePrecioFinalPresu(@RequestBody PrecioFinalPresu precioFinalPresu) throws URISyntaxException {
        log.debug("REST request to update PrecioFinalPresu : {}", precioFinalPresu);
        if (precioFinalPresu.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PrecioFinalPresu result = precioFinalPresuRepository.save(precioFinalPresu);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, precioFinalPresu.getId().toString()))
            .body(result);
    }

    /**
     * GET  /precio-final-presus : get all the precioFinalPresus.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of precioFinalPresus in body
     */
    @GetMapping("/precio-final-presus")
    @Timed
    public ResponseEntity<List<PrecioFinalPresu>> getAllPrecioFinalPresus(Pageable pageable) {
        log.debug("REST request to get a page of PrecioFinalPresus");
        Page<PrecioFinalPresu> page = precioFinalPresuRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/precio-final-presus");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    /**
     * GET  /precio-final-presus : get all the precioFinalPresus.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of precioFinalPresus in body
     */
    @GetMapping("/precio-final-presus-bus/{id}")
    @Timed
    public ResponseEntity<Collection<PrecioFinalPresu>> getAllPrecioFinalPresusBus(@PathVariable Long id) {
        log.debug("REST request to get a page of PrecioFinalPresus");
        Collection<PrecioFinalPresu> page = precioFinalPresuRepository.findByCategoriaDormi(id);
        return ResponseEntity.ok().body(page);
    }
    
    
    
    /**
     * GET  /precio-final-presus/:id : get the "id" precioFinalPresu.
     *
     * @param id the id of the precioFinalPresu to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the precioFinalPresu, or with status 404 (Not Found)
     */
    @GetMapping("/precio-final-presus/{id}")
    @Timed
    public ResponseEntity<PrecioFinalPresu> getPrecioFinalPresu(@PathVariable Long id) {
        log.debug("REST request to get PrecioFinalPresu : {}", id);
        Optional<PrecioFinalPresu> precioFinalPresu = precioFinalPresuRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(precioFinalPresu);
    }

    /**
     * DELETE  /precio-final-presus/:id : delete the "id" precioFinalPresu.
     *
     * @param id the id of the precioFinalPresu to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/precio-final-presus/{id}")
    @Timed
    public ResponseEntity<Void> deletePrecioFinalPresu(@PathVariable Long id) {
        log.debug("REST request to delete PrecioFinalPresu : {}", id);

        precioFinalPresuRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
