package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.PresupuestoPedido;
import com.torga.pedidos.repository.PresupuestoPedidoRepository;
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
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PresupuestoPedido.
 */
@RestController
@RequestMapping("/api")
public class PresupuestoPedidoResource {

    private final Logger log = LoggerFactory.getLogger(PresupuestoPedidoResource.class);

    private static final String ENTITY_NAME = "presupuestoPedido";

    private final PresupuestoPedidoRepository presupuestoPedidoRepository;

    public PresupuestoPedidoResource(PresupuestoPedidoRepository presupuestoPedidoRepository) {
        this.presupuestoPedidoRepository = presupuestoPedidoRepository;
    }

    /**
     * POST  /presupuesto-pedidos : Create a new presupuestoPedido.
     *
     * @param presupuestoPedido the presupuestoPedido to create
     * @return the ResponseEntity with status 201 (Created) and with body the new presupuestoPedido, or with status 400 (Bad Request) if the presupuestoPedido has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/presupuesto-pedidos")
    @Timed
    public ResponseEntity<PresupuestoPedido> createPresupuestoPedido(@Valid @RequestBody PresupuestoPedido presupuestoPedido) throws URISyntaxException {
        log.debug("REST request to save PresupuestoPedido : {}", presupuestoPedido);
        if (presupuestoPedido.getId() != null) {
            throw new BadRequestAlertException("A new presupuestoPedido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PresupuestoPedido result = presupuestoPedidoRepository.save(presupuestoPedido);
        return ResponseEntity.created(new URI("/api/presupuesto-pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /presupuesto-pedidos : Updates an existing presupuestoPedido.
     *
     * @param presupuestoPedido the presupuestoPedido to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated presupuestoPedido,
     * or with status 400 (Bad Request) if the presupuestoPedido is not valid,
     * or with status 500 (Internal Server Error) if the presupuestoPedido couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/presupuesto-pedidos")
    @Timed
    public ResponseEntity<PresupuestoPedido> updatePresupuestoPedido(@Valid @RequestBody PresupuestoPedido presupuestoPedido) throws URISyntaxException {
        log.debug("REST request to update PresupuestoPedido : {}", presupuestoPedido);
        if (presupuestoPedido.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PresupuestoPedido result = presupuestoPedidoRepository.save(presupuestoPedido);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, presupuestoPedido.getId().toString()))
            .body(result);
    }

    /**
     * GET  /presupuesto-pedidos : get all the presupuestoPedidos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of presupuestoPedidos in body
     */
    @GetMapping("/presupuesto-pedidos")
    @Timed
    public ResponseEntity<List<PresupuestoPedido>> getAllPresupuestoPedidos(Pageable pageable) {
        log.debug("REST request to get a page of PresupuestoPedidos");
        Page<PresupuestoPedido> page = presupuestoPedidoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/presupuesto-pedidos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    /**
     * GET  /presupuesto-pedidos : get all the presupuestoPedidos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of presupuestoPedidos in body
     */
    @GetMapping("/presupuesto-pedidos1")
    @Timed
    public ResponseEntity<Collection<PresupuestoPedido>> getAllPresupuestoPedidos1() {
        log.debug("REST request to get a page of PresupuestoPedidos");
        Collection<PresupuestoPedido> page = presupuestoPedidoRepository.findByPresupuesto();
        return ResponseEntity.ok().body(page);
    }

    /**
     * GET  /presupuesto-pedidos/:id : get the "id" presupuestoPedido.
     *
     * @param id the id of the presupuestoPedido to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the presupuestoPedido, or with status 404 (Not Found)
     */
    @GetMapping("/presupuesto-pedidos/{id}")
    @Timed
    public ResponseEntity<PresupuestoPedido> getPresupuestoPedido(@PathVariable Long id) {
        log.debug("REST request to get PresupuestoPedido : {}", id);
        Optional<PresupuestoPedido> presupuestoPedido = presupuestoPedidoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(presupuestoPedido);
    }

    /**
     * DELETE  /presupuesto-pedidos/:id : delete the "id" presupuestoPedido.
     *
     * @param id the id of the presupuestoPedido to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/presupuesto-pedidos/{id}")
    @Timed
    public ResponseEntity<Void> deletePresupuestoPedido(@PathVariable Long id) {
        log.debug("REST request to delete PresupuestoPedido : {}", id);

        presupuestoPedidoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
