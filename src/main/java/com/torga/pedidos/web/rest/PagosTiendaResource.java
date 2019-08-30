package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.PagosTienda;
import com.torga.pedidos.repository.PagosTiendaRepository;
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
 * REST controller for managing PagosTienda.
 */
@RestController
@RequestMapping("/api")
public class PagosTiendaResource {

    private final Logger log = LoggerFactory.getLogger(PagosTiendaResource.class);

    private static final String ENTITY_NAME = "pagosTienda";

    private final PagosTiendaRepository pagosTiendaRepository;

    public PagosTiendaResource(PagosTiendaRepository pagosTiendaRepository) {
        this.pagosTiendaRepository = pagosTiendaRepository;
    }

    /**
     * POST  /pagos-tiendas : Create a new pagosTienda.
     *
     * @param pagosTienda the pagosTienda to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pagosTienda, or with status 400 (Bad Request) if the pagosTienda has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pagos-tiendas")
    @Timed
    public ResponseEntity<PagosTienda> createPagosTienda(@RequestBody PagosTienda pagosTienda) throws URISyntaxException {
        log.debug("REST request to save PagosTienda : {}", pagosTienda);
        if (pagosTienda.getId() != null) {
            throw new BadRequestAlertException("A new pagosTienda cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PagosTienda result = pagosTiendaRepository.save(pagosTienda);
        return ResponseEntity.created(new URI("/api/pagos-tiendas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pagos-tiendas : Updates an existing pagosTienda.
     *
     * @param pagosTienda the pagosTienda to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pagosTienda,
     * or with status 400 (Bad Request) if the pagosTienda is not valid,
     * or with status 500 (Internal Server Error) if the pagosTienda couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pagos-tiendas")
    @Timed
    public ResponseEntity<PagosTienda> updatePagosTienda(@RequestBody PagosTienda pagosTienda) throws URISyntaxException {
        log.debug("REST request to update PagosTienda : {}", pagosTienda);
        if (pagosTienda.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PagosTienda result = pagosTiendaRepository.save(pagosTienda);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pagosTienda.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pagos-tiendas : get all the pagosTiendas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of pagosTiendas in body
     */
    @GetMapping("/pagos-tiendas")
    @Timed
    public ResponseEntity<List<PagosTienda>> getAllPagosTiendas(Pageable pageable) {
        log.debug("REST request to get a page of PagosTiendas");
        Page<PagosTienda> page = pagosTiendaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/pagos-tiendas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /pagos-tiendas/:id : get the "id" pagosTienda.
     *
     * @param id the id of the pagosTienda to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pagosTienda, or with status 404 (Not Found)
     */
    @GetMapping("/pagos-tiendas/{id}")
    @Timed
    public ResponseEntity<PagosTienda> getPagosTienda(@PathVariable Long id) {
        log.debug("REST request to get PagosTienda : {}", id);
        Optional<PagosTienda> pagosTienda = pagosTiendaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pagosTienda);
    }

    /**
     * DELETE  /pagos-tiendas/:id : delete the "id" pagosTienda.
     *
     * @param id the id of the pagosTienda to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pagos-tiendas/{id}")
    @Timed
    public ResponseEntity<Void> deletePagosTienda(@PathVariable Long id) {
        log.debug("REST request to delete PagosTienda : {}", id);

        pagosTiendaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
