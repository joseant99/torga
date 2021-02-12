package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.MedidasEspeciales;
import com.torga.pedidos.repository.MedidasEspecialesRepository;
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
 * REST controller for managing MedidasEspeciales.
 */
@RestController
@RequestMapping("/api")
public class MedidasEspecialesResource {

    private final Logger log = LoggerFactory.getLogger(MedidasEspecialesResource.class);

    private static final String ENTITY_NAME = "medidasEspeciales";

    private final MedidasEspecialesRepository medidasEspecialesRepository;

    public MedidasEspecialesResource(MedidasEspecialesRepository medidasEspecialesRepository) {
        this.medidasEspecialesRepository = medidasEspecialesRepository;
    }

    /**
     * POST  /medidas-especiales : Create a new medidasEspeciales.
     *
     * @param medidasEspeciales the medidasEspeciales to create
     * @return the ResponseEntity with status 201 (Created) and with body the new medidasEspeciales, or with status 400 (Bad Request) if the medidasEspeciales has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/medidas-especiales")
    @Timed
    public ResponseEntity<MedidasEspeciales> createMedidasEspeciales(@RequestBody MedidasEspeciales medidasEspeciales) throws URISyntaxException {
        log.debug("REST request to save MedidasEspeciales : {}", medidasEspeciales);
        if (medidasEspeciales.getId() != null) {
            throw new BadRequestAlertException("A new medidasEspeciales cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedidasEspeciales result = medidasEspecialesRepository.save(medidasEspeciales);
        return ResponseEntity.created(new URI("/api/medidas-especiales/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /medidas-especiales : Updates an existing medidasEspeciales.
     *
     * @param medidasEspeciales the medidasEspeciales to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated medidasEspeciales,
     * or with status 400 (Bad Request) if the medidasEspeciales is not valid,
     * or with status 500 (Internal Server Error) if the medidasEspeciales couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/medidas-especiales")
    @Timed
    public ResponseEntity<MedidasEspeciales> updateMedidasEspeciales(@RequestBody MedidasEspeciales medidasEspeciales) throws URISyntaxException {
        log.debug("REST request to update MedidasEspeciales : {}", medidasEspeciales);
        if (medidasEspeciales.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MedidasEspeciales result = medidasEspecialesRepository.save(medidasEspeciales);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, medidasEspeciales.getId().toString()))
            .body(result);
    }

    /**
     * GET  /medidas-especiales : get all the medidasEspeciales.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of medidasEspeciales in body
     */
    @GetMapping("/medidas-especiales")
    @Timed
    public ResponseEntity<List<MedidasEspeciales>> getAllMedidasEspeciales(Pageable pageable) {
        log.debug("REST request to get a page of MedidasEspeciales");
        Page<MedidasEspeciales> page = medidasEspecialesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/medidas-especiales");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    
    
    /**
     * GET  /medidas-especiales : get all the medidasEspeciales.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of medidasEspeciales in body
     */
    @GetMapping("/medidas-especiales-bus/{id}/{altura}")
    @Timed
    public ResponseEntity<Collection<MedidasEspeciales>> getAllMedidasEspecialesProds(@PathVariable Long id, @PathVariable Float altura) {
        log.debug("REST request to get a page of MedidasEspeciales");
        Collection<MedidasEspeciales> page = medidasEspecialesRepository.findByProd(id,altura);
        return ResponseEntity.ok().body(page);
    }
    
    /**
     * GET  /medidas-especiales : get all the medidasEspeciales.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of medidasEspeciales in body
     */
    @GetMapping("/medidas-especiales-bus1/{id}/{altura}")
    @Timed
    public ResponseEntity<Collection<MedidasEspeciales>> getAllMedidasEspecialesProds1(@PathVariable Long id, @PathVariable Float altura) {
        log.debug("REST request to get a page of MedidasEspeciales");
        Collection<MedidasEspeciales> page = medidasEspecialesRepository.findByProd1(id,altura);
        return ResponseEntity.ok().body(page);
    }
    
    /**
     * GET  /medidas-especiales : get all the medidasEspeciales.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of medidasEspeciales in body
     */
    @GetMapping("/medidas-especiales-bus2/{id}/{altura}")
    @Timed
    public ResponseEntity<Collection<MedidasEspeciales>> getAllMedidasEspecialesProds2(@PathVariable Long id, @PathVariable Float altura) {
        log.debug("REST request to get a page of MedidasEspeciales");
        Collection<MedidasEspeciales> page = medidasEspecialesRepository.findByProd2(id,altura);
        return ResponseEntity.ok().body(page);
    }
    
    /**
     * GET  /medidas-especiales : get all the medidasEspeciales.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of medidasEspeciales in body
     */
    @GetMapping("/medidas-especiales-bus-mesa/{id}/{altura}")
    @Timed
    public ResponseEntity<Collection<MedidasEspeciales>> getAllMedidasEspecialesProdsMesa(@PathVariable Long id, @PathVariable Float altura) {
        log.debug("REST request to get a page of MedidasEspeciales");
        Collection<MedidasEspeciales> page = medidasEspecialesRepository.findByProdMesa(id,altura);
        return ResponseEntity.ok().body(page);
    }
    
    /**
     * GET  /medidas-especiales : get all the medidasEspeciales.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of medidasEspeciales in body
     */
    @GetMapping("/medidas-especiales-bus1-mesa/{id}/{altura}")
    @Timed
    public ResponseEntity<Collection<MedidasEspeciales>> getAllMedidasEspecialesProds1Mesa(@PathVariable Long id, @PathVariable Float altura) {
        log.debug("REST request to get a page of MedidasEspeciales");
        Collection<MedidasEspeciales> page = medidasEspecialesRepository.findByProd1Mesa(id,altura);
        return ResponseEntity.ok().body(page);
    }
    
    /**
     * GET  /medidas-especiales : get all the medidasEspeciales.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of medidasEspeciales in body
     */
    @GetMapping("/medidas-especiales-bus2-mesa/{id}/{altura}")
    @Timed
    public ResponseEntity<Collection<MedidasEspeciales>> getAllMedidasEspecialesProds2Mesa(@PathVariable Long id, @PathVariable Float altura) {
        log.debug("REST request to get a page of MedidasEspeciales");
        Collection<MedidasEspeciales> page = medidasEspecialesRepository.findByProd2Mesa(id,altura);
        return ResponseEntity.ok().body(page);
    }

    /**
     * GET  /medidas-especiales/:id : get the "id" medidasEspeciales.
     *
     * @param id the id of the medidasEspeciales to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the medidasEspeciales, or with status 404 (Not Found)
     */
    @GetMapping("/medidas-especiales/{id}")
    @Timed
    public ResponseEntity<MedidasEspeciales> getMedidasEspeciales(@PathVariable Long id) {
        log.debug("REST request to get MedidasEspeciales : {}", id);
        Optional<MedidasEspeciales> medidasEspeciales = medidasEspecialesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(medidasEspeciales);
    }

    /**
     * DELETE  /medidas-especiales/:id : delete the "id" medidasEspeciales.
     *
     * @param id the id of the medidasEspeciales to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/medidas-especiales/{id}")
    @Timed
    public ResponseEntity<Void> deleteMedidasEspeciales(@PathVariable Long id) {
        log.debug("REST request to delete MedidasEspeciales : {}", id);

        medidasEspecialesRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
