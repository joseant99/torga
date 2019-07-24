package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.service.DimensionesProductoService;
import com.torga.pedidos.web.rest.errors.BadRequestAlertException;
import com.torga.pedidos.web.rest.util.HeaderUtil;
import com.torga.pedidos.web.rest.util.PaginationUtil;
import com.torga.pedidos.service.dto.DimensionesProductoDTO;
import com.torga.pedidos.service.dto.DimensionesProductoCriteria;
import com.torga.pedidos.service.DimensionesProductoQueryService;
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
 * REST controller for managing DimensionesProducto.
 */
@RestController
@RequestMapping("/api")
public class DimensionesProductoResource {

    private final Logger log = LoggerFactory.getLogger(DimensionesProductoResource.class);

    private static final String ENTITY_NAME = "dimensionesProducto";

    private final DimensionesProductoService dimensionesProductoService;

    private final DimensionesProductoQueryService dimensionesProductoQueryService;

    public DimensionesProductoResource(DimensionesProductoService dimensionesProductoService, DimensionesProductoQueryService dimensionesProductoQueryService) {
        this.dimensionesProductoService = dimensionesProductoService;
        this.dimensionesProductoQueryService = dimensionesProductoQueryService;
    }

    /**
     * POST  /dimensiones-productos : Create a new dimensionesProducto.
     *
     * @param dimensionesProductoDTO the dimensionesProductoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dimensionesProductoDTO, or with status 400 (Bad Request) if the dimensionesProducto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dimensiones-productos")
    @Timed
    public ResponseEntity<DimensionesProductoDTO> createDimensionesProducto(@Valid @RequestBody DimensionesProductoDTO dimensionesProductoDTO) throws URISyntaxException {
        log.debug("REST request to save DimensionesProducto : {}", dimensionesProductoDTO);
        if (dimensionesProductoDTO.getId() != null) {
            throw new BadRequestAlertException("A new dimensionesProducto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DimensionesProductoDTO result = dimensionesProductoService.save(dimensionesProductoDTO);
        return ResponseEntity.created(new URI("/api/dimensiones-productos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dimensiones-productos : Updates an existing dimensionesProducto.
     *
     * @param dimensionesProductoDTO the dimensionesProductoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dimensionesProductoDTO,
     * or with status 400 (Bad Request) if the dimensionesProductoDTO is not valid,
     * or with status 500 (Internal Server Error) if the dimensionesProductoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dimensiones-productos")
    @Timed
    public ResponseEntity<DimensionesProductoDTO> updateDimensionesProducto(@Valid @RequestBody DimensionesProductoDTO dimensionesProductoDTO) throws URISyntaxException {
        log.debug("REST request to update DimensionesProducto : {}", dimensionesProductoDTO);
        if (dimensionesProductoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DimensionesProductoDTO result = dimensionesProductoService.save(dimensionesProductoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dimensionesProductoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dimensiones-productos : get all the dimensionesProductos.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of dimensionesProductos in body
     */
    @GetMapping("/dimensiones-productos")
    @Timed
    public ResponseEntity<List<DimensionesProductoDTO>> getAllDimensionesProductos(DimensionesProductoCriteria criteria, Pageable pageable) {
        log.debug("REST request to get DimensionesProductos by criteria: {}", criteria);
        Page<DimensionesProductoDTO> page = dimensionesProductoQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/dimensiones-productos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
    * GET  /dimensiones-productos/count : count all the dimensionesProductos.
    *
    * @param criteria the criterias which the requested entities should match
    * @return the ResponseEntity with status 200 (OK) and the count in body
    */
    @GetMapping("/dimensiones-productos/count")
    @Timed
    public ResponseEntity<Long> countDimensionesProductos(DimensionesProductoCriteria criteria) {
        log.debug("REST request to count DimensionesProductos by criteria: {}", criteria);
        return ResponseEntity.ok().body(dimensionesProductoQueryService.countByCriteria(criteria));
    }

    /**
     * GET  /dimensiones-productos/:id : get the "id" dimensionesProducto.
     *
     * @param id the id of the dimensionesProductoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dimensionesProductoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/dimensiones-productos/{id}")
    @Timed
    public ResponseEntity<DimensionesProductoDTO> getDimensionesProducto(@PathVariable Long id) {
        log.debug("REST request to get DimensionesProducto : {}", id);
        Optional<DimensionesProductoDTO> dimensionesProductoDTO = dimensionesProductoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dimensionesProductoDTO);
    }

    /**
     * DELETE  /dimensiones-productos/:id : delete the "id" dimensionesProducto.
     *
     * @param id the id of the dimensionesProductoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dimensiones-productos/{id}")
    @Timed
    public ResponseEntity<Void> deleteDimensionesProducto(@PathVariable Long id) {
        log.debug("REST request to delete DimensionesProducto : {}", id);
        dimensionesProductoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
