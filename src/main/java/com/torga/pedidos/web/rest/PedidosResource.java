package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Pedidos;
import com.torga.pedidos.service.PedidosService;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Pedidos.
 */
@RestController
@RequestMapping("/api")
public class PedidosResource {

    private final Logger log = LoggerFactory.getLogger(PedidosResource.class);

    private static final String ENTITY_NAME = "pedidos";

    private final PedidosService pedidosService;

    public PedidosResource(PedidosService pedidosService) {
        this.pedidosService = pedidosService;
    }
    
    
    /**
     * GET  /pedidos/:referenciaclientes_id : get list of pedidos.
     *
     * @param referenciaclientes_id
     * @return the ResponseEntity with status 200 (OK) and with body the pedidos, or with status 404 (Not Found)
     */
    @GetMapping("/pedido/{id}")
    @Timed
    public ResponseEntity<List<Pedidos>> getPedidosByreferenciaclientes(@PathVariable Long id) {
        log.debug("REST request to get Pedidos BY referenciaclientes : {}", id);
        List<Pedidos> pedidos = pedidosService.findAllByReferenciaclientesID(id);
        return ResponseEntity.ok()
                .body(pedidos);
    }
    
    
    /**
     * POST  /pedidos : Create a new pedidos.
     *
     * @param pedidos the pedidos to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pedidos, or with status 400 (Bad Request) if the pedidos has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pedidos")
    @Timed
    public ResponseEntity<Pedidos> createPedidos(@Valid @RequestBody Pedidos pedidos) throws URISyntaxException {
        log.debug("REST request to save Pedidos : {}", pedidos);
        if (pedidos.getId() != null) {
            throw new BadRequestAlertException("A new pedidos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pedidos result = pedidosService.save(pedidos);
        return ResponseEntity.created(new URI("/api/pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pedidos : Updates an existing pedidos.
     *
     * @param pedidos the pedidos to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pedidos,
     * or with status 400 (Bad Request) if the pedidos is not valid,
     * or with status 500 (Internal Server Error) if the pedidos couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pedidos")
    @Timed
    public ResponseEntity<Pedidos> updatePedidos(@Valid @RequestBody Pedidos pedidos) throws URISyntaxException {
        log.debug("REST request to update Pedidos : {}", pedidos);
        if (pedidos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Pedidos result = pedidosService.save(pedidos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pedidos.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pedidos : get all the pedidos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of pedidos in body
     */
    @GetMapping("/pedidos")
    @Timed
    public ResponseEntity<List<Pedidos>> getAllPedidos(Pageable pageable) {
        log.debug("REST request to get a page of Pedidos");
        Page<Pedidos> page = pedidosService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/pedidos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /pedidos/:id : get the "id" pedidos.
     *
     * @param id the id of the pedidos to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pedidos, or with status 404 (Not Found)
     */
    @GetMapping("/pedidos/{id}")
    @Timed
    public ResponseEntity<Pedidos> getPedidos(@PathVariable Long id) {
        log.debug("REST request to get Pedidos : {}", id);
        Optional<Pedidos> pedidos = pedidosService.findOne(id);
        return ResponseUtil.wrapOrNotFound(pedidos);
    }

    /**
     * DELETE  /pedidos/:id : delete the "id" pedidos.
     *
     * @param id the id of the pedidos to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pedidos/{id}")
    @Timed
    public ResponseEntity<Void> deletePedidos(@PathVariable Long id) {
        log.debug("REST request to delete Pedidos : {}", id);
        pedidosService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
