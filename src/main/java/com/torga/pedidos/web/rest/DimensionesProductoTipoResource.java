package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.DimensionesProductoTipo;
import com.torga.pedidos.repository.DimensionesProductoTipoRepository;
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
 * REST controller for managing DimensionesProductoTipo.
 */
@RestController
@RequestMapping("/api")
public class DimensionesProductoTipoResource {

    private final Logger log = LoggerFactory.getLogger(DimensionesProductoTipoResource.class);

    private static final String ENTITY_NAME = "dimensionesProductoTipo";

    private final DimensionesProductoTipoRepository dimensionesProductoTipoRepository;

    public DimensionesProductoTipoResource(DimensionesProductoTipoRepository dimensionesProductoTipoRepository) {
        this.dimensionesProductoTipoRepository = dimensionesProductoTipoRepository;
    }

    /**
     * POST  /dimensiones-producto-tipos : Create a new dimensionesProductoTipo.
     *
     * @param dimensionesProductoTipo the dimensionesProductoTipo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dimensionesProductoTipo, or with status 400 (Bad Request) if the dimensionesProductoTipo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dimensiones-producto-tipos")
    @Timed
    public ResponseEntity<DimensionesProductoTipo> createDimensionesProductoTipo(@Valid @RequestBody DimensionesProductoTipo dimensionesProductoTipo) throws URISyntaxException {
        log.debug("REST request to save DimensionesProductoTipo : {}", dimensionesProductoTipo);
        if (dimensionesProductoTipo.getId() != null) {
            throw new BadRequestAlertException("A new dimensionesProductoTipo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DimensionesProductoTipo result = dimensionesProductoTipoRepository.save(dimensionesProductoTipo);
        return ResponseEntity.created(new URI("/api/dimensiones-producto-tipos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dimensiones-producto-tipos : Updates an existing dimensionesProductoTipo.
     *
     * @param dimensionesProductoTipo the dimensionesProductoTipo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dimensionesProductoTipo,
     * or with status 400 (Bad Request) if the dimensionesProductoTipo is not valid,
     * or with status 500 (Internal Server Error) if the dimensionesProductoTipo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dimensiones-producto-tipos")
    @Timed
    public ResponseEntity<DimensionesProductoTipo> updateDimensionesProductoTipo(@Valid @RequestBody DimensionesProductoTipo dimensionesProductoTipo) throws URISyntaxException {
        log.debug("REST request to update DimensionesProductoTipo : {}", dimensionesProductoTipo);
        if (dimensionesProductoTipo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DimensionesProductoTipo result = dimensionesProductoTipoRepository.save(dimensionesProductoTipo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dimensionesProductoTipo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dimensiones-producto-tipos : get all the dimensionesProductoTipos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of dimensionesProductoTipos in body
     */
    @GetMapping("/dimensiones-producto-tipos")
    @Timed
    public ResponseEntity<List<DimensionesProductoTipo>> getAllDimensionesProductoTipos(Pageable pageable) {
        log.debug("REST request to get a page of DimensionesProductoTipos");
        Page<DimensionesProductoTipo> page = dimensionesProductoTipoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/dimensiones-producto-tipos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    
    
    @GetMapping("/dimensiones-producto-tipos-buscado-prod/{id}")
    @Timed
    public ResponseEntity<Collection<DimensionesProductoTipo>> getDimensionProducto(@PathVariable Long id) {
        log.debug("REST request to get a page of DimensionesProductoTipos");
        Collection<DimensionesProductoTipo> page = dimensionesProductoTipoRepository.findProducto(id);
        return ResponseEntity.ok().body(page);
    }
    
    @GetMapping("/dimensiones-producto-tipos-buscado-dimensiones/{id}")
    @Timed
    public ResponseEntity<Collection<DimensionesProductoTipo>> getDimension(@PathVariable Long id) {
        log.debug("REST request to get a page of DimensionesProductoTipos");
        Collection<DimensionesProductoTipo> page = dimensionesProductoTipoRepository.findDimensiones(id);
        return ResponseEntity.ok().body(page);
    }
    
    @GetMapping("/dimensiones-producto-tipos-filtrado/{id}/{ancho}")
    @Timed
    public ResponseEntity<Collection<DimensionesProductoTipo>> getDimensionProductoFiltrado(@PathVariable("id") Long id , @PathVariable("ancho") Float ancho ) {
        log.debug("REST request to get a page of DimensionesProductoTipos");
        Collection<DimensionesProductoTipo> page = dimensionesProductoTipoRepository.findFiltro(id,ancho);
        return ResponseEntity.ok().body(page);
    }
    
    @GetMapping("/dimensiones-producto-tipos-filtrado-altura/{id}/{altura}")
    @Timed
    public ResponseEntity<Collection<DimensionesProductoTipo>> getDimensionProductoFiltradoAltura(@PathVariable("id") Long id , @PathVariable("altura") Float altura ) {
        log.debug("REST request to get a page of DimensionesProductoTipos");
        Collection<DimensionesProductoTipo> page = dimensionesProductoTipoRepository.findFiltroAltura(id,altura);
        return ResponseEntity.ok().body(page);
    }
    
    @GetMapping("/dimensiones-producto-tipos-filtrado-altura-ancho/{id}/{ancho}/{altura}")
    @Timed
    public ResponseEntity<Collection<DimensionesProductoTipo>> getDimensionProductoFiltradoAlturaAncho(@PathVariable("id") Long id , @PathVariable("altura") Float altura , @PathVariable("ancho") Float ancho ) {
        log.debug("REST request to get a page of DimensionesProductoTipos");
        Collection<DimensionesProductoTipo> page = dimensionesProductoTipoRepository.findFiltroAlturaAncho(id,altura,ancho);
        return ResponseEntity.ok().body(page);
    }
    
    
    
    

    /**
     * GET  /dimensiones-producto-tipos/:id : get the "id" dimensionesProductoTipo.
     *
     * @param id the id of the dimensionesProductoTipo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dimensionesProductoTipo, or with status 404 (Not Found)
     */
    @GetMapping("/dimensiones-producto-tipos/{id}")
    @Timed
    public ResponseEntity<DimensionesProductoTipo> getDimensionesProductoTipo(@PathVariable Long id) {
        log.debug("REST request to get DimensionesProductoTipo : {}", id);
        Optional<DimensionesProductoTipo> dimensionesProductoTipo = dimensionesProductoTipoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dimensionesProductoTipo);
    }

    /**
     * DELETE  /dimensiones-producto-tipos/:id : delete the "id" dimensionesProductoTipo.
     *
     * @param id the id of the dimensionesProductoTipo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dimensiones-producto-tipos/{id}")
    @Timed
    public ResponseEntity<Void> deleteDimensionesProductoTipo(@PathVariable Long id) {
        log.debug("REST request to delete DimensionesProductoTipo : {}", id);

        dimensionesProductoTipoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
