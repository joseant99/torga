package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.MedEspProductoPedidoPresu;
import com.torga.pedidos.repository.MedEspProductoPedidoPresuRepository;
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
 * REST controller for managing MedEspProductoPedidoPresu.
 */
@RestController
@RequestMapping("/api")
public class MedEspProductoPedidoPresuResource {

    private final Logger log = LoggerFactory.getLogger(MedEspProductoPedidoPresuResource.class);

    private static final String ENTITY_NAME = "medEspProductoPedidoPresu";

    private final MedEspProductoPedidoPresuRepository medEspProductoPedidoPresuRepository;

    public MedEspProductoPedidoPresuResource(MedEspProductoPedidoPresuRepository medEspProductoPedidoPresuRepository) {
        this.medEspProductoPedidoPresuRepository = medEspProductoPedidoPresuRepository;
    }

    /**
     * POST  /med-esp-producto-pedido-presus : Create a new medEspProductoPedidoPresu.
     *
     * @param medEspProductoPedidoPresu the medEspProductoPedidoPresu to create
     * @return the ResponseEntity with status 201 (Created) and with body the new medEspProductoPedidoPresu, or with status 400 (Bad Request) if the medEspProductoPedidoPresu has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/med-esp-producto-pedido-presus")
    @Timed
    public ResponseEntity<MedEspProductoPedidoPresu> createMedEspProductoPedidoPresu(@RequestBody MedEspProductoPedidoPresu medEspProductoPedidoPresu) throws URISyntaxException {
        log.debug("REST request to save MedEspProductoPedidoPresu : {}", medEspProductoPedidoPresu);
        if (medEspProductoPedidoPresu.getId() != null) {
            throw new BadRequestAlertException("A new medEspProductoPedidoPresu cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedEspProductoPedidoPresu result = medEspProductoPedidoPresuRepository.save(medEspProductoPedidoPresu);
        return ResponseEntity.created(new URI("/api/med-esp-producto-pedido-presus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /med-esp-producto-pedido-presus : Updates an existing medEspProductoPedidoPresu.
     *
     * @param medEspProductoPedidoPresu the medEspProductoPedidoPresu to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated medEspProductoPedidoPresu,
     * or with status 400 (Bad Request) if the medEspProductoPedidoPresu is not valid,
     * or with status 500 (Internal Server Error) if the medEspProductoPedidoPresu couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/med-esp-producto-pedido-presus")
    @Timed
    public ResponseEntity<MedEspProductoPedidoPresu> updateMedEspProductoPedidoPresu(@RequestBody MedEspProductoPedidoPresu medEspProductoPedidoPresu) throws URISyntaxException {
        log.debug("REST request to update MedEspProductoPedidoPresu : {}", medEspProductoPedidoPresu);
        if (medEspProductoPedidoPresu.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MedEspProductoPedidoPresu result = medEspProductoPedidoPresuRepository.save(medEspProductoPedidoPresu);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, medEspProductoPedidoPresu.getId().toString()))
            .body(result);
    }

    /**
     * GET  /med-esp-producto-pedido-presus : get all the medEspProductoPedidoPresus.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of medEspProductoPedidoPresus in body
     */
    @GetMapping("/med-esp-producto-pedido-presus")
    @Timed
    public ResponseEntity<List<MedEspProductoPedidoPresu>> getAllMedEspProductoPedidoPresus(Pageable pageable) {
        log.debug("REST request to get a page of MedEspProductoPedidoPresus");
        Page<MedEspProductoPedidoPresu> page = medEspProductoPedidoPresuRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/med-esp-producto-pedido-presus");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /med-esp-producto-pedido-presus/:id : get the "id" medEspProductoPedidoPresu.
     *
     * @param id the id of the medEspProductoPedidoPresu to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the medEspProductoPedidoPresu, or with status 404 (Not Found)
     */
    @GetMapping("/med-esp-producto-pedido-presus/{id}")
    @Timed
    public ResponseEntity<MedEspProductoPedidoPresu> getMedEspProductoPedidoPresu(@PathVariable Long id) {
        log.debug("REST request to get MedEspProductoPedidoPresu : {}", id);
        Optional<MedEspProductoPedidoPresu> medEspProductoPedidoPresu = medEspProductoPedidoPresuRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(medEspProductoPedidoPresu);
    }

    /**
     * DELETE  /med-esp-producto-pedido-presus/:id : delete the "id" medEspProductoPedidoPresu.
     *
     * @param id the id of the medEspProductoPedidoPresu to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/med-esp-producto-pedido-presus/{id}")
    @Timed
    public ResponseEntity<Void> deleteMedEspProductoPedidoPresu(@PathVariable Long id) {
        log.debug("REST request to delete MedEspProductoPedidoPresu : {}", id);

        medEspProductoPedidoPresuRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
