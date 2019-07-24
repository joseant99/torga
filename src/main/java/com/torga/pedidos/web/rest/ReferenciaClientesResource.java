package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.ReferenciaClientes;
import com.torga.pedidos.service.ReferenciaClientesService;
import com.torga.pedidos.web.rest.errors.BadRequestAlertException;
import com.torga.pedidos.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ReferenciaClientes.
 */
@RestController
@RequestMapping("/api")
public class ReferenciaClientesResource {

    private final Logger log = LoggerFactory.getLogger(ReferenciaClientesResource.class);

    private static final String ENTITY_NAME = "referenciaClientes";

    private final ReferenciaClientesService referenciaClientesService;

    public ReferenciaClientesResource(ReferenciaClientesService referenciaClientesService) {
        this.referenciaClientesService = referenciaClientesService;
    }
    
    /**
     * GET  /referencia-cliente/:client_id : get referenciaClientes by client_id.
     *
     * @param client_id of the referenciaClientes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the referenciaClientes, or with status 404 (Not Found)
     */
    @GetMapping("/referencia-cliente/{id}")
    @Timed
    public ResponseEntity<List<ReferenciaClientes>> getReferenciaClientesByClienteID(@PathVariable Long id) {
        log.debug("REST request to get ReferenciaClientes by client_id: {}", id);
        List<ReferenciaClientes> referenciaClientes = referenciaClientesService.findAllByClienteId(id);
        return ResponseEntity.ok()
                .body(referenciaClientes);
    }

    /**
     * POST  /referencia-clientes : Create a new referenciaClientes.
     *
     * @param referenciaClientes the referenciaClientes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new referenciaClientes, or with status 400 (Bad Request) if the referenciaClientes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/referencia-clientes")
    @Timed
    public ResponseEntity<ReferenciaClientes> createReferenciaClientes(@Valid @RequestBody ReferenciaClientes referenciaClientes) throws URISyntaxException {
        log.debug("REST request to save ReferenciaClientes : {}", referenciaClientes);
        if (referenciaClientes.getId() != null) {
            throw new BadRequestAlertException("A new referenciaClientes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReferenciaClientes result = referenciaClientesService.save(referenciaClientes);
        return ResponseEntity.created(new URI("/api/referencia-clientes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /referencia-clientes : Updates an existing referenciaClientes.
     *
     * @param referenciaClientes the referenciaClientes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated referenciaClientes,
     * or with status 400 (Bad Request) if the referenciaClientes is not valid,
     * or with status 500 (Internal Server Error) if the referenciaClientes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/referencia-clientes")
    @Timed
    public ResponseEntity<ReferenciaClientes> updateReferenciaClientes(@Valid @RequestBody ReferenciaClientes referenciaClientes) throws URISyntaxException {
        log.debug("REST request to update ReferenciaClientes : {}", referenciaClientes);
        if (referenciaClientes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReferenciaClientes result = referenciaClientesService.save(referenciaClientes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, referenciaClientes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /referencia-clientes : get all the referenciaClientes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of referenciaClientes in body
     */
    @GetMapping("/referencia-clientes")
    @Timed
    public List<ReferenciaClientes> getAllReferenciaClientes() {
        log.debug("REST request to get all ReferenciaClientes");
        return referenciaClientesService.findAll();
    }

    /**
     * GET  /referencia-clientes/:id : get the "id" referenciaClientes.
     *
     * @param id the id of the referenciaClientes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the referenciaClientes, or with status 404 (Not Found)
     */
    @GetMapping("/referencia-clientes/{id}")
    @Timed
    public ResponseEntity<ReferenciaClientes> getReferenciaClientes(@PathVariable Long id) {
        log.debug("REST request to get ReferenciaClientes : {}", id);
        Optional<ReferenciaClientes> referenciaClientes = referenciaClientesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(referenciaClientes);
    }

    /**
     * DELETE  /referencia-clientes/:id : delete the "id" referenciaClientes.
     *
     * @param id the id of the referenciaClientes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/referencia-clientes/{id}")
    @Timed
    public ResponseEntity<Void> deleteReferenciaClientes(@PathVariable Long id) {
        log.debug("REST request to delete ReferenciaClientes : {}", id);
        referenciaClientesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
