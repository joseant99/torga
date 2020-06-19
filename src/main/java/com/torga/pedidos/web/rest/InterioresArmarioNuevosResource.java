package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.InterioresArmarioNuevos;
import com.torga.pedidos.repository.InterioresArmarioNuevosRepository;
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
 * REST controller for managing InterioresArmarioNuevos.
 */
@RestController
@RequestMapping("/api")
public class InterioresArmarioNuevosResource {

    private final Logger log = LoggerFactory.getLogger(InterioresArmarioNuevosResource.class);

    private static final String ENTITY_NAME = "interioresArmarioNuevos";

    private final InterioresArmarioNuevosRepository interioresArmarioNuevosRepository;

    public InterioresArmarioNuevosResource(InterioresArmarioNuevosRepository interioresArmarioNuevosRepository) {
        this.interioresArmarioNuevosRepository = interioresArmarioNuevosRepository;
    }

    /**
     * POST  /interiores-armario-nuevos : Create a new interioresArmarioNuevos.
     *
     * @param interioresArmarioNuevos the interioresArmarioNuevos to create
     * @return the ResponseEntity with status 201 (Created) and with body the new interioresArmarioNuevos, or with status 400 (Bad Request) if the interioresArmarioNuevos has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/interiores-armario-nuevos")
    @Timed
    public ResponseEntity<InterioresArmarioNuevos> createInterioresArmarioNuevos(@RequestBody InterioresArmarioNuevos interioresArmarioNuevos) throws URISyntaxException {
        log.debug("REST request to save InterioresArmarioNuevos : {}", interioresArmarioNuevos);
        if (interioresArmarioNuevos.getId() != null) {
            throw new BadRequestAlertException("A new interioresArmarioNuevos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InterioresArmarioNuevos result = interioresArmarioNuevosRepository.save(interioresArmarioNuevos);
        return ResponseEntity.created(new URI("/api/interiores-armario-nuevos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /interiores-armario-nuevos : Updates an existing interioresArmarioNuevos.
     *
     * @param interioresArmarioNuevos the interioresArmarioNuevos to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated interioresArmarioNuevos,
     * or with status 400 (Bad Request) if the interioresArmarioNuevos is not valid,
     * or with status 500 (Internal Server Error) if the interioresArmarioNuevos couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/interiores-armario-nuevos")
    @Timed
    public ResponseEntity<InterioresArmarioNuevos> updateInterioresArmarioNuevos(@RequestBody InterioresArmarioNuevos interioresArmarioNuevos) throws URISyntaxException {
        log.debug("REST request to update InterioresArmarioNuevos : {}", interioresArmarioNuevos);
        if (interioresArmarioNuevos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InterioresArmarioNuevos result = interioresArmarioNuevosRepository.save(interioresArmarioNuevos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, interioresArmarioNuevos.getId().toString()))
            .body(result);
    }

    /**
     * GET  /interiores-armario-nuevos : get all the interioresArmarioNuevos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of interioresArmarioNuevos in body
     */
    @GetMapping("/interiores-armario-nuevos")
    @Timed
    public ResponseEntity<List<InterioresArmarioNuevos>> getAllInterioresArmarioNuevos(Pageable pageable) {
        log.debug("REST request to get a page of InterioresArmarioNuevos");
        Page<InterioresArmarioNuevos> page = interioresArmarioNuevosRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/interiores-armario-nuevos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    /**
     * GET  /cascos : get all the cascos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cascos in body
     */
    @GetMapping("/interiores-armario-nuevos-bus/{ancho}/{puerta}")
    @Timed
    public ResponseEntity<Collection<InterioresArmarioNuevos>> getAllCascosBus( @PathVariable("ancho") String ancho , @PathVariable("puerta") Long puerta ) {
        log.debug("REST request to get a page of Cascos");
        Collection<InterioresArmarioNuevos> page = interioresArmarioNuevosRepository.findAncho(ancho, puerta);
        return ResponseEntity.ok().body(page);
    }
    /**
     * GET  /interiores-armario-nuevos/:id : get the "id" interioresArmarioNuevos.
     *
     * @param id the id of the interioresArmarioNuevos to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the interioresArmarioNuevos, or with status 404 (Not Found)
     */
    @GetMapping("/interiores-armario-nuevos/{id}")
    @Timed
    public ResponseEntity<InterioresArmarioNuevos> getInterioresArmarioNuevos(@PathVariable Long id) {
        log.debug("REST request to get InterioresArmarioNuevos : {}", id);
        Optional<InterioresArmarioNuevos> interioresArmarioNuevos = interioresArmarioNuevosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(interioresArmarioNuevos);
    }

    /**
     * DELETE  /interiores-armario-nuevos/:id : delete the "id" interioresArmarioNuevos.
     *
     * @param id the id of the interioresArmarioNuevos to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/interiores-armario-nuevos/{id}")
    @Timed
    public ResponseEntity<Void> deleteInterioresArmarioNuevos(@PathVariable Long id) {
        log.debug("REST request to delete InterioresArmarioNuevos : {}", id);

        interioresArmarioNuevosRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
