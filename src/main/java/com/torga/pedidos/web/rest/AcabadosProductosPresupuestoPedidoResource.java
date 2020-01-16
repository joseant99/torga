package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.AcabadosProductosPresupuestoPedido;
import com.torga.pedidos.repository.AcabadosProductosPresupuestoPedidoRepository;
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
 * REST controller for managing AcabadosProductosPresupuestoPedido.
 */
@RestController
@RequestMapping("/api")
public class AcabadosProductosPresupuestoPedidoResource {

    private final Logger log = LoggerFactory.getLogger(AcabadosProductosPresupuestoPedidoResource.class);

    private static final String ENTITY_NAME = "acabadosProductosPresupuestoPedido";

    private final AcabadosProductosPresupuestoPedidoRepository acabadosProductosPresupuestoPedidoRepository;

    public AcabadosProductosPresupuestoPedidoResource(AcabadosProductosPresupuestoPedidoRepository acabadosProductosPresupuestoPedidoRepository) {
        this.acabadosProductosPresupuestoPedidoRepository = acabadosProductosPresupuestoPedidoRepository;
    }

    /**
     * POST  /acabados-productos-presupuesto-pedidos : Create a new acabadosProductosPresupuestoPedido.
     *
     * @param acabadosProductosPresupuestoPedido the acabadosProductosPresupuestoPedido to create
     * @return the ResponseEntity with status 201 (Created) and with body the new acabadosProductosPresupuestoPedido, or with status 400 (Bad Request) if the acabadosProductosPresupuestoPedido has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/acabados-productos-presupuesto-pedidos")
    @Timed
    public ResponseEntity<AcabadosProductosPresupuestoPedido> createAcabadosProductosPresupuestoPedido(@RequestBody AcabadosProductosPresupuestoPedido acabadosProductosPresupuestoPedido) throws URISyntaxException {
        log.debug("REST request to save AcabadosProductosPresupuestoPedido : {}", acabadosProductosPresupuestoPedido);
        if (acabadosProductosPresupuestoPedido.getId() != null) {
            throw new BadRequestAlertException("A new acabadosProductosPresupuestoPedido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AcabadosProductosPresupuestoPedido result = acabadosProductosPresupuestoPedidoRepository.save(acabadosProductosPresupuestoPedido);
        return ResponseEntity.created(new URI("/api/acabados-productos-presupuesto-pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /acabados-productos-presupuesto-pedidos : Updates an existing acabadosProductosPresupuestoPedido.
     *
     * @param acabadosProductosPresupuestoPedido the acabadosProductosPresupuestoPedido to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated acabadosProductosPresupuestoPedido,
     * or with status 400 (Bad Request) if the acabadosProductosPresupuestoPedido is not valid,
     * or with status 500 (Internal Server Error) if the acabadosProductosPresupuestoPedido couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/acabados-productos-presupuesto-pedidos")
    @Timed
    public ResponseEntity<AcabadosProductosPresupuestoPedido> updateAcabadosProductosPresupuestoPedido(@RequestBody AcabadosProductosPresupuestoPedido acabadosProductosPresupuestoPedido) throws URISyntaxException {
        log.debug("REST request to update AcabadosProductosPresupuestoPedido : {}", acabadosProductosPresupuestoPedido);
        if (acabadosProductosPresupuestoPedido.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AcabadosProductosPresupuestoPedido result = acabadosProductosPresupuestoPedidoRepository.save(acabadosProductosPresupuestoPedido);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, acabadosProductosPresupuestoPedido.getId().toString()))
            .body(result);
    }

    /**
     * GET  /acabados-productos-presupuesto-pedidos : get all the acabadosProductosPresupuestoPedidos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of acabadosProductosPresupuestoPedidos in body
     */
    @GetMapping("/acabados-productos-presupuesto-pedidos")
    @Timed
    public ResponseEntity<List<AcabadosProductosPresupuestoPedido>> getAllAcabadosProductosPresupuestoPedidos(Pageable pageable) {
        log.debug("REST request to get a page of AcabadosProductosPresupuestoPedidos");
        Page<AcabadosProductosPresupuestoPedido> page = acabadosProductosPresupuestoPedidoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/acabados-productos-presupuesto-pedidos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    /**
     * GET  /acabados-productos-presupuesto-pedidos : get all the acabadosProductosPresupuestoPedidos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of acabadosProductosPresupuestoPedidos in body
     */
    @GetMapping("/acabados-productos-presupuesto-pedidos-busqueda/{id}")
    @Timed
    public ResponseEntity<Collection<AcabadosProductosPresupuestoPedido>> getAllAcabadosProductosPresupuestoPedidosBus(@PathVariable Long id) {
        log.debug("REST request to get a page of AcabadosProductosPresupuestoPedidos");
        Collection<AcabadosProductosPresupuestoPedido> page = acabadosProductosPresupuestoPedidoRepository.findByCategoriaDormi(id);
        return ResponseEntity.ok().body(page);
    }
    
    
    /**
     * GET  /acabados-productos-presupuesto-pedidos/:id : get the "id" acabadosProductosPresupuestoPedido.
     *
     * @param id the id of the acabadosProductosPresupuestoPedido to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the acabadosProductosPresupuestoPedido, or with status 404 (Not Found)
     */
    @GetMapping("/acabados-productos-presupuesto-pedidos/{id}")
    @Timed
    public ResponseEntity<AcabadosProductosPresupuestoPedido> getAcabadosProductosPresupuestoPedido(@PathVariable Long id) {
        log.debug("REST request to get AcabadosProductosPresupuestoPedido : {}", id);
        Optional<AcabadosProductosPresupuestoPedido> acabadosProductosPresupuestoPedido = acabadosProductosPresupuestoPedidoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(acabadosProductosPresupuestoPedido);
    }

    /**
     * DELETE  /acabados-productos-presupuesto-pedidos/:id : delete the "id" acabadosProductosPresupuestoPedido.
     *
     * @param id the id of the acabadosProductosPresupuestoPedido to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/acabados-productos-presupuesto-pedidos/{id}")
    @Timed
    public ResponseEntity<Void> deleteAcabadosProductosPresupuestoPedido(@PathVariable Long id) {
        log.debug("REST request to delete AcabadosProductosPresupuestoPedido : {}", id);

        acabadosProductosPresupuestoPedidoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
