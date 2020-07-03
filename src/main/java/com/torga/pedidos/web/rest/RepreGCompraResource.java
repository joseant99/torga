package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.RepreGCompra;
import com.torga.pedidos.repository.RepreGCompraRepository;
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
 * REST controller for managing RepreGCompra.
 */
@RestController
@RequestMapping("/api")
public class RepreGCompraResource {

    private final Logger log = LoggerFactory.getLogger(RepreGCompraResource.class);

    private static final String ENTITY_NAME = "repreGCompra";

    private final RepreGCompraRepository repreGCompraRepository;

    public RepreGCompraResource(RepreGCompraRepository repreGCompraRepository) {
        this.repreGCompraRepository = repreGCompraRepository;
    }

    /**
     * POST  /repre-g-compras : Create a new repreGCompra.
     *
     * @param repreGCompra the repreGCompra to create
     * @return the ResponseEntity with status 201 (Created) and with body the new repreGCompra, or with status 400 (Bad Request) if the repreGCompra has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/repre-g-compras")
    @Timed
    public ResponseEntity<RepreGCompra> createRepreGCompra(@RequestBody RepreGCompra repreGCompra) throws URISyntaxException {
        log.debug("REST request to save RepreGCompra : {}", repreGCompra);
        if (repreGCompra.getId() != null) {
            throw new BadRequestAlertException("A new repreGCompra cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RepreGCompra result = repreGCompraRepository.save(repreGCompra);
        return ResponseEntity.created(new URI("/api/repre-g-compras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /repre-g-compras : Updates an existing repreGCompra.
     *
     * @param repreGCompra the repreGCompra to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated repreGCompra,
     * or with status 400 (Bad Request) if the repreGCompra is not valid,
     * or with status 500 (Internal Server Error) if the repreGCompra couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/repre-g-compras")
    @Timed
    public ResponseEntity<RepreGCompra> updateRepreGCompra(@RequestBody RepreGCompra repreGCompra) throws URISyntaxException {
        log.debug("REST request to update RepreGCompra : {}", repreGCompra);
        if (repreGCompra.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RepreGCompra result = repreGCompraRepository.save(repreGCompra);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, repreGCompra.getId().toString()))
            .body(result);
    }

    /**
     * GET  /repre-g-compras : get all the repreGCompras.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of repreGCompras in body
     */
    @GetMapping("/repre-g-compras")
    @Timed
    public ResponseEntity<List<RepreGCompra>> getAllRepreGCompras(Pageable pageable) {
        log.debug("REST request to get a page of RepreGCompras");
        Page<RepreGCompra> page = repreGCompraRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/repre-g-compras");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /repre-g-compras/:id : get the "id" repreGCompra.
     *
     * @param id the id of the repreGCompra to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the repreGCompra, or with status 404 (Not Found)
     */
    @GetMapping("/repre-g-compras/{id}")
    @Timed
    public ResponseEntity<RepreGCompra> getRepreGCompra(@PathVariable Long id) {
        log.debug("REST request to get RepreGCompra : {}", id);
        Optional<RepreGCompra> repreGCompra = repreGCompraRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(repreGCompra);
    }

    /**
     * DELETE  /repre-g-compras/:id : delete the "id" repreGCompra.
     *
     * @param id the id of the repreGCompra to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/repre-g-compras/{id}")
    @Timed
    public ResponseEntity<Void> deleteRepreGCompra(@PathVariable Long id) {
        log.debug("REST request to delete RepreGCompra : {}", id);

        repreGCompraRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
