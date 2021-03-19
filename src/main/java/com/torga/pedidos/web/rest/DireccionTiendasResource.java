package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.DireccionTiendas;
import com.torga.pedidos.repository.DireccionTiendasRepository;
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
 * REST controller for managing DireccionTiendas.
 */
@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
@RequestMapping("/api")
public class DireccionTiendasResource {

    private final Logger log = LoggerFactory.getLogger(DireccionTiendasResource.class);

    private static final String ENTITY_NAME = "direccionTiendas";

    private final DireccionTiendasRepository direccionTiendasRepository;

    public DireccionTiendasResource(DireccionTiendasRepository direccionTiendasRepository) {
        this.direccionTiendasRepository = direccionTiendasRepository;
    }

    /**
     * POST  /direccion-tiendas : Create a new direccionTiendas.
     *
     * @param direccionTiendas the direccionTiendas to create
     * @return the ResponseEntity with status 201 (Created) and with body the new direccionTiendas, or with status 400 (Bad Request) if the direccionTiendas has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/direccion-tiendas")
    @Timed
    public ResponseEntity<DireccionTiendas> createDireccionTiendas(@RequestBody DireccionTiendas direccionTiendas) throws URISyntaxException {
        log.debug("REST request to save DireccionTiendas : {}", direccionTiendas);
        if (direccionTiendas.getId() != null) {
            throw new BadRequestAlertException("A new direccionTiendas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DireccionTiendas result = direccionTiendasRepository.save(direccionTiendas);
        return ResponseEntity.created(new URI("/api/direccion-tiendas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /direccion-tiendas : Updates an existing direccionTiendas.
     *
     * @param direccionTiendas the direccionTiendas to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated direccionTiendas,
     * or with status 400 (Bad Request) if the direccionTiendas is not valid,
     * or with status 500 (Internal Server Error) if the direccionTiendas couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/direccion-tiendas")
    @Timed
    public ResponseEntity<DireccionTiendas> updateDireccionTiendas(@RequestBody DireccionTiendas direccionTiendas) throws URISyntaxException {
        log.debug("REST request to update DireccionTiendas : {}", direccionTiendas);
        if (direccionTiendas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DireccionTiendas result = direccionTiendasRepository.save(direccionTiendas);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, direccionTiendas.getId().toString()))
            .body(result);
    }

    /**
     * GET  /direccion-tiendas : get all the direccionTiendas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of direccionTiendas in body
     */
    @GetMapping("/direccion-tiendas")
    @Timed
    public ResponseEntity<List<DireccionTiendas>> getAllDireccionTiendas(Pageable pageable) {
        log.debug("REST request to get a page of DireccionTiendas");
        Page<DireccionTiendas> page = direccionTiendasRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/direccion-tiendas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    /**
     * GET  /direccion-tiendas : get all the direccionTiendas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of direccionTiendas in body
     */
    @GetMapping("/direccion-tiendas-solo-comerciales")
    @Timed
    public ResponseEntity<Collection<DireccionTiendas>> getAllDireccionTiendasSoloComerciales(Pageable pageable) {
        log.debug("REST request to get a page of DireccionTiendas");
        Collection<DireccionTiendas> page = direccionTiendasRepository.soloComerciales();
        return ResponseEntity.ok().body(page);
    }
    
    /**
     * GET  /direccion-tiendas : get all the direccionTiendas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of direccionTiendas in body
     */
    @GetMapping("/direccion-tiendas-bus/{id}")
    @Timed
    public ResponseEntity<Collection<DireccionTiendas>> getAllDireccionTiendasBus(@PathVariable Long id) {
        log.debug("REST request to get a page of DireccionTiendas");
        Collection<DireccionTiendas> page = direccionTiendasRepository.findByCategoriaDormi(id);
        return ResponseEntity.ok().body(page);
    }
    

    /**
     * GET  /direccion-tiendas/:id : get the "id" direccionTiendas.
     *
     * @param id the id of the direccionTiendas to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the direccionTiendas, or with status 404 (Not Found)
     */
    @GetMapping("/direccion-tiendas/{id}")
    @Timed
    public ResponseEntity<DireccionTiendas> getDireccionTiendas(@PathVariable Long id) {
        log.debug("REST request to get DireccionTiendas : {}", id);
        Optional<DireccionTiendas> direccionTiendas = direccionTiendasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(direccionTiendas);
    }

    /**
     * DELETE  /direccion-tiendas/:id : delete the "id" direccionTiendas.
     *
     * @param id the id of the direccionTiendas to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/direccion-tiendas/{id}")
    @Timed
    public ResponseEntity<Void> deleteDireccionTiendas(@PathVariable Long id) {
        log.debug("REST request to delete DireccionTiendas : {}", id);

        direccionTiendasRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
