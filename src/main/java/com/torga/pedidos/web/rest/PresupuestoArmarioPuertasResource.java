package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.PresupuestoArmarioPuertas;
import com.torga.pedidos.repository.PresupuestoArmarioPuertasRepository;
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
 * REST controller for managing PresupuestoArmarioPuertas.
 */
@RestController
@RequestMapping("/api")
public class PresupuestoArmarioPuertasResource {

    private final Logger log = LoggerFactory.getLogger(PresupuestoArmarioPuertasResource.class);

    private static final String ENTITY_NAME = "presupuestoArmarioPuertas";

    private final PresupuestoArmarioPuertasRepository presupuestoArmarioPuertasRepository;

    public PresupuestoArmarioPuertasResource(PresupuestoArmarioPuertasRepository presupuestoArmarioPuertasRepository) {
        this.presupuestoArmarioPuertasRepository = presupuestoArmarioPuertasRepository;
    }

    /**
     * POST  /presupuesto-armario-puertas : Create a new presupuestoArmarioPuertas.
     *
     * @param presupuestoArmarioPuertas the presupuestoArmarioPuertas to create
     * @return the ResponseEntity with status 201 (Created) and with body the new presupuestoArmarioPuertas, or with status 400 (Bad Request) if the presupuestoArmarioPuertas has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/presupuesto-armario-puertas")
    @Timed
    public ResponseEntity<PresupuestoArmarioPuertas> createPresupuestoArmarioPuertas(@RequestBody PresupuestoArmarioPuertas presupuestoArmarioPuertas) throws URISyntaxException {
        log.debug("REST request to save PresupuestoArmarioPuertas : {}", presupuestoArmarioPuertas);
        if (presupuestoArmarioPuertas.getId() != null) {
            throw new BadRequestAlertException("A new presupuestoArmarioPuertas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PresupuestoArmarioPuertas result = presupuestoArmarioPuertasRepository.save(presupuestoArmarioPuertas);
        return ResponseEntity.created(new URI("/api/presupuesto-armario-puertas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /presupuesto-armario-puertas : Updates an existing presupuestoArmarioPuertas.
     *
     * @param presupuestoArmarioPuertas the presupuestoArmarioPuertas to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated presupuestoArmarioPuertas,
     * or with status 400 (Bad Request) if the presupuestoArmarioPuertas is not valid,
     * or with status 500 (Internal Server Error) if the presupuestoArmarioPuertas couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/presupuesto-armario-puertas")
    @Timed
    public ResponseEntity<PresupuestoArmarioPuertas> updatePresupuestoArmarioPuertas(@RequestBody PresupuestoArmarioPuertas presupuestoArmarioPuertas) throws URISyntaxException {
        log.debug("REST request to update PresupuestoArmarioPuertas : {}", presupuestoArmarioPuertas);
        if (presupuestoArmarioPuertas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PresupuestoArmarioPuertas result = presupuestoArmarioPuertasRepository.save(presupuestoArmarioPuertas);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, presupuestoArmarioPuertas.getId().toString()))
            .body(result);
    }

    /**
     * GET  /presupuesto-armario-puertas : get all the presupuestoArmarioPuertas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of presupuestoArmarioPuertas in body
     */
    @GetMapping("/presupuesto-armario-puertas")
    @Timed
    public ResponseEntity<List<PresupuestoArmarioPuertas>> getAllPresupuestoArmarioPuertas(Pageable pageable) {
        log.debug("REST request to get a page of PresupuestoArmarioPuertas");
        Page<PresupuestoArmarioPuertas> page = presupuestoArmarioPuertasRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/presupuesto-armario-puertas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    /**
     * GET  /presupuesto-armario-puertas : get all the presupuestoArmarioPuertas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of presupuestoArmarioPuertas in body
     */
    @GetMapping("/presupuesto-armario-puertas-busqueda/{id}")
    @Timed
    public ResponseEntity<Collection<PresupuestoArmarioPuertas>> getAllPresupuestoArmarioPuertasBusqueda(@PathVariable Long id) {
        log.debug("REST request to get a page of PresupuestoArmarioPuertas");
        Collection<PresupuestoArmarioPuertas> page = presupuestoArmarioPuertasRepository.findByPresupuestoArmario(id);
        return ResponseEntity.ok().body(page);
    }

    /**
     * GET  /presupuesto-armario-puertas/:id : get the "id" presupuestoArmarioPuertas.
     *
     * @param id the id of the presupuestoArmarioPuertas to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the presupuestoArmarioPuertas, or with status 404 (Not Found)
     */
    @GetMapping("/presupuesto-armario-puertas/{id}")
    @Timed
    public ResponseEntity<PresupuestoArmarioPuertas> getPresupuestoArmarioPuertas(@PathVariable Long id) {
        log.debug("REST request to get PresupuestoArmarioPuertas : {}", id);
        Optional<PresupuestoArmarioPuertas> presupuestoArmarioPuertas = presupuestoArmarioPuertasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(presupuestoArmarioPuertas);
    }

    /**
     * DELETE  /presupuesto-armario-puertas/:id : delete the "id" presupuestoArmarioPuertas.
     *
     * @param id the id of the presupuestoArmarioPuertas to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/presupuesto-armario-puertas/{id}")
    @Timed
    public ResponseEntity<Void> deletePresupuestoArmarioPuertas(@PathVariable Long id) {
        log.debug("REST request to delete PresupuestoArmarioPuertas : {}", id);

        presupuestoArmarioPuertasRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
