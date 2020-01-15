package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.IvaProductoTienda;
import com.torga.pedidos.repository.IvaProductoTiendaRepository;
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
 * REST controller for managing IvaProductoTienda.
 */
@RestController
@RequestMapping("/api")
public class IvaProductoTiendaResource {

    private final Logger log = LoggerFactory.getLogger(IvaProductoTiendaResource.class);

    private static final String ENTITY_NAME = "ivaProductoTienda";

    private final IvaProductoTiendaRepository ivaProductoTiendaRepository;

    public IvaProductoTiendaResource(IvaProductoTiendaRepository ivaProductoTiendaRepository) {
        this.ivaProductoTiendaRepository = ivaProductoTiendaRepository;
    }

    /**
     * POST  /iva-producto-tiendas : Create a new ivaProductoTienda.
     *
     * @param ivaProductoTienda the ivaProductoTienda to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ivaProductoTienda, or with status 400 (Bad Request) if the ivaProductoTienda has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/iva-producto-tiendas")
    @Timed
    public ResponseEntity<IvaProductoTienda> createIvaProductoTienda(@RequestBody IvaProductoTienda ivaProductoTienda) throws URISyntaxException {
        log.debug("REST request to save IvaProductoTienda : {}", ivaProductoTienda);
        if (ivaProductoTienda.getId() != null) {
            throw new BadRequestAlertException("A new ivaProductoTienda cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IvaProductoTienda result = ivaProductoTiendaRepository.save(ivaProductoTienda);
        return ResponseEntity.created(new URI("/api/iva-producto-tiendas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /iva-producto-tiendas : Updates an existing ivaProductoTienda.
     *
     * @param ivaProductoTienda the ivaProductoTienda to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ivaProductoTienda,
     * or with status 400 (Bad Request) if the ivaProductoTienda is not valid,
     * or with status 500 (Internal Server Error) if the ivaProductoTienda couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/iva-producto-tiendas")
    @Timed
    public ResponseEntity<IvaProductoTienda> updateIvaProductoTienda(@RequestBody IvaProductoTienda ivaProductoTienda) throws URISyntaxException {
        log.debug("REST request to update IvaProductoTienda : {}", ivaProductoTienda);
        if (ivaProductoTienda.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IvaProductoTienda result = ivaProductoTiendaRepository.save(ivaProductoTienda);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ivaProductoTienda.getId().toString()))
            .body(result);
    }

    /**
     * GET  /iva-producto-tiendas : get all the ivaProductoTiendas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ivaProductoTiendas in body
     */
    @GetMapping("/iva-producto-tiendas")
    @Timed
    public ResponseEntity<List<IvaProductoTienda>> getAllIvaProductoTiendas(Pageable pageable) {
        log.debug("REST request to get a page of IvaProductoTiendas");
        Page<IvaProductoTienda> page = ivaProductoTiendaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/iva-producto-tiendas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    
    /**
     * GET  /iva-producto-tiendas : get all the ivaProductoTiendas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ivaProductoTiendas in body
     */
    @GetMapping("/iva-producto-tiendas-bus/{id}")
    @Timed
    public ResponseEntity<Collection<IvaProductoTienda>> getAllIvaProductoTiendasBus(@PathVariable Long id) {
        log.debug("REST request to get a page of IvaProductoTiendas");
        Collection<IvaProductoTienda> page = ivaProductoTiendaRepository.findByCategoriaDormi(id);
        return ResponseEntity.ok().body(page);
    }
    /**
     * GET  /iva-producto-tiendas/:id : get the "id" ivaProductoTienda.
     *
     * @param id the id of the ivaProductoTienda to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ivaProductoTienda, or with status 404 (Not Found)
     */
    @GetMapping("/iva-producto-tiendas/{id}")
    @Timed
    public ResponseEntity<IvaProductoTienda> getIvaProductoTienda(@PathVariable Long id) {
        log.debug("REST request to get IvaProductoTienda : {}", id);
        Optional<IvaProductoTienda> ivaProductoTienda = ivaProductoTiendaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ivaProductoTienda);
    }

    /**
     * DELETE  /iva-producto-tiendas/:id : delete the "id" ivaProductoTienda.
     *
     * @param id the id of the ivaProductoTienda to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/iva-producto-tiendas/{id}")
    @Timed
    public ResponseEntity<Void> deleteIvaProductoTienda(@PathVariable Long id) {
        log.debug("REST request to delete IvaProductoTienda : {}", id);

        ivaProductoTiendaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
