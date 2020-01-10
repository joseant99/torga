package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.PresupuestoArmarioInteriores;
import com.torga.pedidos.repository.PresupuestoArmarioInterioresRepository;
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
 * REST controller for managing PresupuestoArmarioInteriores.
 */
@RestController
@RequestMapping("/api")
public class PresupuestoArmarioInterioresResource {

    private final Logger log = LoggerFactory.getLogger(PresupuestoArmarioInterioresResource.class);

    private static final String ENTITY_NAME = "presupuestoArmarioInteriores";

    private final PresupuestoArmarioInterioresRepository presupuestoArmarioInterioresRepository;

    public PresupuestoArmarioInterioresResource(PresupuestoArmarioInterioresRepository presupuestoArmarioInterioresRepository) {
        this.presupuestoArmarioInterioresRepository = presupuestoArmarioInterioresRepository;
    }

    /**
     * POST  /presupuesto-armario-interiores : Create a new presupuestoArmarioInteriores.
     *
     * @param presupuestoArmarioInteriores the presupuestoArmarioInteriores to create
     * @return the ResponseEntity with status 201 (Created) and with body the new presupuestoArmarioInteriores, or with status 400 (Bad Request) if the presupuestoArmarioInteriores has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/presupuesto-armario-interiores")
    @Timed
    public ResponseEntity<PresupuestoArmarioInteriores> createPresupuestoArmarioInteriores(@RequestBody PresupuestoArmarioInteriores presupuestoArmarioInteriores) throws URISyntaxException {
        log.debug("REST request to save PresupuestoArmarioInteriores : {}", presupuestoArmarioInteriores);
        if (presupuestoArmarioInteriores.getId() != null) {
            throw new BadRequestAlertException("A new presupuestoArmarioInteriores cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PresupuestoArmarioInteriores result = presupuestoArmarioInterioresRepository.save(presupuestoArmarioInteriores);
        return ResponseEntity.created(new URI("/api/presupuesto-armario-interiores/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /presupuesto-armario-interiores : Updates an existing presupuestoArmarioInteriores.
     *
     * @param presupuestoArmarioInteriores the presupuestoArmarioInteriores to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated presupuestoArmarioInteriores,
     * or with status 400 (Bad Request) if the presupuestoArmarioInteriores is not valid,
     * or with status 500 (Internal Server Error) if the presupuestoArmarioInteriores couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/presupuesto-armario-interiores")
    @Timed
    public ResponseEntity<PresupuestoArmarioInteriores> updatePresupuestoArmarioInteriores(@RequestBody PresupuestoArmarioInteriores presupuestoArmarioInteriores) throws URISyntaxException {
        log.debug("REST request to update PresupuestoArmarioInteriores : {}", presupuestoArmarioInteriores);
        if (presupuestoArmarioInteriores.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PresupuestoArmarioInteriores result = presupuestoArmarioInterioresRepository.save(presupuestoArmarioInteriores);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, presupuestoArmarioInteriores.getId().toString()))
            .body(result);
    }

    /**
     * GET  /presupuesto-armario-interiores : get all the presupuestoArmarioInteriores.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of presupuestoArmarioInteriores in body
     */
    @GetMapping("/presupuesto-armario-interiores")
    @Timed
    public ResponseEntity<List<PresupuestoArmarioInteriores>> getAllPresupuestoArmarioInteriores(Pageable pageable) {
        log.debug("REST request to get a page of PresupuestoArmarioInteriores");
        Page<PresupuestoArmarioInteriores> page = presupuestoArmarioInterioresRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/presupuesto-armario-interiores");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    /**
     * GET  /presupuesto-armario-interiores : get all the presupuestoArmarioInteriores.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of presupuestoArmarioInteriores in body
     */
    @GetMapping("/presupuesto-armario-interiores-busqueda/{id}")
    @Timed
    public ResponseEntity<Collection<PresupuestoArmarioInteriores>> getAllPresupuestoArmarioInterioresBus(@PathVariable Long id) {
        log.debug("REST request to get a page of PresupuestoArmarioInteriores");
        Collection<PresupuestoArmarioInteriores> page = presupuestoArmarioInterioresRepository.findByPresupuestoArmario(id);
        return ResponseEntity.ok().body(page);
    }

    /**
     * GET  /presupuesto-armario-interiores/:id : get the "id" presupuestoArmarioInteriores.
     *
     * @param id the id of the presupuestoArmarioInteriores to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the presupuestoArmarioInteriores, or with status 404 (Not Found)
     */
    @GetMapping("/presupuesto-armario-interiores/{id}")
    @Timed
    public ResponseEntity<PresupuestoArmarioInteriores> getPresupuestoArmarioInteriores(@PathVariable Long id) {
        log.debug("REST request to get PresupuestoArmarioInteriores : {}", id);
        Optional<PresupuestoArmarioInteriores> presupuestoArmarioInteriores = presupuestoArmarioInterioresRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(presupuestoArmarioInteriores);
    }

    /**
     * DELETE  /presupuesto-armario-interiores/:id : delete the "id" presupuestoArmarioInteriores.
     *
     * @param id the id of the presupuestoArmarioInteriores to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/presupuesto-armario-interiores/{id}")
    @Timed
    public ResponseEntity<Void> deletePresupuestoArmarioInteriores(@PathVariable Long id) {
        log.debug("REST request to delete PresupuestoArmarioInteriores : {}", id);

        presupuestoArmarioInterioresRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
