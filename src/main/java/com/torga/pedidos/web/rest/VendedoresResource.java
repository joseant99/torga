package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Vendedores;
import com.torga.pedidos.repository.VendedoresRepository;
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
 * REST controller for managing Vendedores.
 */
@RestController
@RequestMapping("/api")
public class VendedoresResource {

    private final Logger log = LoggerFactory.getLogger(VendedoresResource.class);

    private static final String ENTITY_NAME = "vendedores";

    private final VendedoresRepository vendedoresRepository;

    public VendedoresResource(VendedoresRepository vendedoresRepository) {
        this.vendedoresRepository = vendedoresRepository;
    }

    /**
     * POST  /vendedores : Create a new vendedores.
     *
     * @param vendedores the vendedores to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vendedores, or with status 400 (Bad Request) if the vendedores has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vendedores")
    @Timed
    public ResponseEntity<Vendedores> createVendedores(@RequestBody Vendedores vendedores) throws URISyntaxException {
        log.debug("REST request to save Vendedores : {}", vendedores);
        if (vendedores.getId() != null) {
            throw new BadRequestAlertException("A new vendedores cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Vendedores result = vendedoresRepository.save(vendedores);
        return ResponseEntity.created(new URI("/api/vendedores/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vendedores : Updates an existing vendedores.
     *
     * @param vendedores the vendedores to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vendedores,
     * or with status 400 (Bad Request) if the vendedores is not valid,
     * or with status 500 (Internal Server Error) if the vendedores couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vendedores")
    @Timed
    public ResponseEntity<Vendedores> updateVendedores(@RequestBody Vendedores vendedores) throws URISyntaxException {
        log.debug("REST request to update Vendedores : {}", vendedores);
        if (vendedores.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Vendedores result = vendedoresRepository.save(vendedores);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vendedores.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vendedores : get all the vendedores.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of vendedores in body
     */
    @GetMapping("/vendedores")
    @Timed
    public ResponseEntity<List<Vendedores>> getAllVendedores(Pageable pageable) {
        log.debug("REST request to get a page of Vendedores");
        Page<Vendedores> page = vendedoresRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/vendedores");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /vendedores/:id : get the "id" vendedores.
     *
     * @param id the id of the vendedores to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vendedores, or with status 404 (Not Found)
     */
    @GetMapping("/vendedores/{id}")
    @Timed
    public ResponseEntity<Vendedores> getVendedores(@PathVariable Long id) {
        log.debug("REST request to get Vendedores : {}", id);
        Optional<Vendedores> vendedores = vendedoresRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vendedores);
    }

    /**
     * DELETE  /vendedores/:id : delete the "id" vendedores.
     *
     * @param id the id of the vendedores to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vendedores/{id}")
    @Timed
    public ResponseEntity<Void> deleteVendedores(@PathVariable Long id) {
        log.debug("REST request to delete Vendedores : {}", id);

        vendedoresRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
