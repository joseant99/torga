package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.TipoProducto;
import com.torga.pedidos.repository.TipoProductoRepository;
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
 * REST controller for managing TipoProducto.
 */
@RestController
@RequestMapping("/api")
public class TipoProductoResource {

    private final Logger log = LoggerFactory.getLogger(TipoProductoResource.class);

    private static final String ENTITY_NAME = "tipoProducto";

    private final TipoProductoRepository tipoProductoRepository;

    public TipoProductoResource(TipoProductoRepository tipoProductoRepository) {
        this.tipoProductoRepository = tipoProductoRepository;
    }

    /**
     * POST  /tipo-productos : Create a new tipoProducto.
     *
     * @param tipoProducto the tipoProducto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoProducto, or with status 400 (Bad Request) if the tipoProducto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-productos")
    @Timed
    public ResponseEntity<TipoProducto> createTipoProducto(@Valid @RequestBody TipoProducto tipoProducto) throws URISyntaxException {
        log.debug("REST request to save TipoProducto : {}", tipoProducto);
        if (tipoProducto.getId() != null) {
            throw new BadRequestAlertException("A new tipoProducto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoProducto result = tipoProductoRepository.save(tipoProducto);
        return ResponseEntity.created(new URI("/api/tipo-productos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-productos : Updates an existing tipoProducto.
     *
     * @param tipoProducto the tipoProducto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoProducto,
     * or with status 400 (Bad Request) if the tipoProducto is not valid,
     * or with status 500 (Internal Server Error) if the tipoProducto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-productos")
    @Timed
    public ResponseEntity<TipoProducto> updateTipoProducto(@Valid @RequestBody TipoProducto tipoProducto) throws URISyntaxException {
        log.debug("REST request to update TipoProducto : {}", tipoProducto);
        if (tipoProducto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoProducto result = tipoProductoRepository.save(tipoProducto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoProducto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-productos : get all the tipoProductos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tipoProductos in body
     */
    @GetMapping("/tipo-productos")
    @Timed
    public ResponseEntity<List<TipoProducto>> getAllTipoProductos(Pageable pageable) {
        log.debug("REST request to get a page of TipoProductos");
        Page<TipoProducto> page = tipoProductoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tipo-productos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    
    /**
     * GET  /tipo-productos : get all the tipoProductos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tipoProductos in body
     */
    @GetMapping("/tipo-productos-bus/{id}")
    @Timed
    public ResponseEntity<Collection<TipoProducto>> getAllTipoProductos12(@PathVariable Long id) {
        Collection<TipoProducto> page = tipoProductoRepository.findByCategoriaDormi(id);
        return ResponseEntity.ok().body(page);
    }

    /**
     * GET  /tipo-productos/:id : get the "id" tipoProducto.
     *
     * @param id the id of the tipoProducto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoProducto, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-productos/{id}")
    @Timed
    public ResponseEntity<TipoProducto> getTipoProducto(@PathVariable Long id) {
        log.debug("REST request to get TipoProducto : {}", id);
        Optional<TipoProducto> tipoProducto = tipoProductoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoProducto);
    }

    /**
     * DELETE  /tipo-productos/:id : delete the "id" tipoProducto.
     *
     * @param id the id of the tipoProducto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-productos/{id}")
    @Timed
    public ResponseEntity<Void> deleteTipoProducto(@PathVariable Long id) {
        log.debug("REST request to delete TipoProducto : {}", id);

        tipoProductoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
