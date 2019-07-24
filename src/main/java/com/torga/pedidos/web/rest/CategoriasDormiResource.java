package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.service.CategoriasDormiService;
import com.torga.pedidos.web.rest.errors.BadRequestAlertException;
import com.torga.pedidos.web.rest.util.HeaderUtil;
import com.torga.pedidos.web.rest.util.PaginationUtil;
import com.torga.pedidos.service.dto.CategoriasDormiDTO;
import com.torga.pedidos.service.dto.CategoriasDormiCriteria;
import com.torga.pedidos.service.CategoriasDormiQueryService;
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
 * REST controller for managing CategoriasDormi.
 */
@RestController
@RequestMapping("/api")
public class CategoriasDormiResource {

    private final Logger log = LoggerFactory.getLogger(CategoriasDormiResource.class);

    private static final String ENTITY_NAME = "categoriasDormi";

    private final CategoriasDormiService categoriasDormiService;

    private final CategoriasDormiQueryService categoriasDormiQueryService;

    public CategoriasDormiResource(CategoriasDormiService categoriasDormiService, CategoriasDormiQueryService categoriasDormiQueryService) {
        this.categoriasDormiService = categoriasDormiService;
        this.categoriasDormiQueryService = categoriasDormiQueryService;
    }

    /**
     * POST  /categorias-dormis : Create a new categoriasDormi.
     *
     * @param categoriasDormiDTO the categoriasDormiDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new categoriasDormiDTO, or with status 400 (Bad Request) if the categoriasDormi has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/categorias-dormis")
    @Timed
    public ResponseEntity<CategoriasDormiDTO> createCategoriasDormi(@RequestBody CategoriasDormiDTO categoriasDormiDTO) throws URISyntaxException {
        log.debug("REST request to save CategoriasDormi : {}", categoriasDormiDTO);
        if (categoriasDormiDTO.getId() != null) {
            throw new BadRequestAlertException("A new categoriasDormi cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CategoriasDormiDTO result = categoriasDormiService.save(categoriasDormiDTO);
        return ResponseEntity.created(new URI("/api/categorias-dormis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /categorias-dormis : Updates an existing categoriasDormi.
     *
     * @param categoriasDormiDTO the categoriasDormiDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated categoriasDormiDTO,
     * or with status 400 (Bad Request) if the categoriasDormiDTO is not valid,
     * or with status 500 (Internal Server Error) if the categoriasDormiDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/categorias-dormis")
    @Timed
    public ResponseEntity<CategoriasDormiDTO> updateCategoriasDormi(@RequestBody CategoriasDormiDTO categoriasDormiDTO) throws URISyntaxException {
        log.debug("REST request to update CategoriasDormi : {}", categoriasDormiDTO);
        if (categoriasDormiDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CategoriasDormiDTO result = categoriasDormiService.save(categoriasDormiDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, categoriasDormiDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /categorias-dormis : get all the categoriasDormis.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of categoriasDormis in body
     */
    @GetMapping("/categorias-dormis")
    @Timed
    public ResponseEntity<List<CategoriasDormiDTO>> getAllCategoriasDormis(CategoriasDormiCriteria criteria, Pageable pageable) {
        log.debug("REST request to get CategoriasDormis by criteria: {}", criteria);
        Page<CategoriasDormiDTO> page = categoriasDormiQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/categorias-dormis");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
   

    /**
    * GET  /categorias-dormis/count : count all the categoriasDormis.
    *
    * @param criteria the criterias which the requested entities should match
    * @return the ResponseEntity with status 200 (OK) and the count in body
    */
    @GetMapping("/categorias-dormis/count")
    @Timed
    public ResponseEntity<Long> countCategoriasDormis(CategoriasDormiCriteria criteria) {
        log.debug("REST request to count CategoriasDormis by criteria: {}", criteria);
        return ResponseEntity.ok().body(categoriasDormiQueryService.countByCriteria(criteria));
    }

    /**
     * GET  /categorias-dormis/:id : get the "id" categoriasDormi.
     *
     * @param id the id of the categoriasDormiDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the categoriasDormiDTO, or with status 404 (Not Found)
     */
    @GetMapping("/categorias-dormis/{id}")
    @Timed
    public ResponseEntity<CategoriasDormiDTO> getCategoriasDormi(@PathVariable Long id) {
        log.debug("REST request to get CategoriasDormi : {}", id);
        Optional<CategoriasDormiDTO> categoriasDormiDTO = categoriasDormiService.findOne(id);
        return ResponseUtil.wrapOrNotFound(categoriasDormiDTO);
    }

    /**
     * DELETE  /categorias-dormis/:id : delete the "id" categoriasDormi.
     *
     * @param id the id of the categoriasDormiDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/categorias-dormis/{id}")
    @Timed
    public ResponseEntity<Void> deleteCategoriasDormi(@PathVariable Long id) {
        log.debug("REST request to delete CategoriasDormi : {}", id);
        categoriasDormiService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
