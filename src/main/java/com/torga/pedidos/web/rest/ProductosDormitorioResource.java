package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.service.ProductosDormitorioService;
import com.torga.pedidos.web.rest.errors.BadRequestAlertException;
import com.torga.pedidos.web.rest.util.HeaderUtil;
import com.torga.pedidos.web.rest.util.PaginationUtil;
import com.torga.pedidos.service.dto.ProductosDormitorioDTO;
import com.torga.pedidos.service.dto.ProductosDormitorioCriteria;
import com.torga.pedidos.domain.ProductosDormitorio;
import com.torga.pedidos.repository.ProductosDormitorioRepository;
import com.torga.pedidos.service.ProductosDormitorioQueryService;
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
 * REST controller for managing ProductosDormitorio.
 */
@RestController
@RequestMapping("/api")
public class ProductosDormitorioResource {

    private final Logger log = LoggerFactory.getLogger(ProductosDormitorioResource.class);

    private static final String ENTITY_NAME = "productosDormitorio";

    private final ProductosDormitorioService productosDormitorioService;

    private final ProductosDormitorioQueryService productosDormitorioQueryService;

    public ProductosDormitorioResource(ProductosDormitorioService productosDormitorioService, ProductosDormitorioQueryService productosDormitorioQueryService) {
        this.productosDormitorioService = productosDormitorioService;
        this.productosDormitorioQueryService = productosDormitorioQueryService;
    }

    /**
     * POST  /productos-dormitorios : Create a new productosDormitorio.
     *
     * @param productosDormitorioDTO the productosDormitorioDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productosDormitorioDTO, or with status 400 (Bad Request) if the productosDormitorio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/productos-dormitorios")
    @Timed
    public ResponseEntity<ProductosDormitorioDTO> createProductosDormitorio(@Valid @RequestBody ProductosDormitorioDTO productosDormitorioDTO) throws URISyntaxException {
        log.debug("REST request to save ProductosDormitorio : {}", productosDormitorioDTO);
        if (productosDormitorioDTO.getId() != null) {
            throw new BadRequestAlertException("A new productosDormitorio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductosDormitorioDTO result = productosDormitorioService.save(productosDormitorioDTO);
        return ResponseEntity.created(new URI("/api/productos-dormitorios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /productos-dormitorios : Updates an existing productosDormitorio.
     *
     * @param productosDormitorioDTO the productosDormitorioDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productosDormitorioDTO,
     * or with status 400 (Bad Request) if the productosDormitorioDTO is not valid,
     * or with status 500 (Internal Server Error) if the productosDormitorioDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/productos-dormitorios")
    @Timed
    public ResponseEntity<ProductosDormitorioDTO> updateProductosDormitorio(@Valid @RequestBody ProductosDormitorioDTO productosDormitorioDTO) throws URISyntaxException {
        log.debug("REST request to update ProductosDormitorio : {}", productosDormitorioDTO);
        if (productosDormitorioDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductosDormitorioDTO result = productosDormitorioService.save(productosDormitorioDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productosDormitorioDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /productos-dormitorios : get all the productosDormitorios.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of productosDormitorios in body
     */
    @GetMapping("/productos-dormitorios")
    @Timed
    public ResponseEntity<List<ProductosDormitorioDTO>> getAllProductosDormitorios(ProductosDormitorioCriteria criteria, Pageable pageable) {
        log.debug("REST request to get ProductosDormitorios by criteria: {}", criteria);
        Page<ProductosDormitorioDTO> page = productosDormitorioQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/productos-dormitorios");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    

    @GetMapping("/productos-dormitorios-categoria/{id}")
    @Timed
    public ResponseEntity<Collection<ProductosDormitorio>> getProductosDormitoriosCategoria(@PathVariable Long id) {
        Collection<ProductosDormitorio> page =  (Collection<ProductosDormitorio>) productosDormitorioQueryService.findByCategoria(id);
        return ResponseEntity.ok().body(page);
    }
    /**
    * GET  /productos-dormitorios/count : count all the productosDormitorios.
    *
    * @param criteria the criterias which the requested entities should match
    * @return the ResponseEntity with status 200 (OK) and the count in body
    */
    @GetMapping("/productos-dormitorios/count")
    @Timed
    public ResponseEntity<Long> countProductosDormitorios(ProductosDormitorioCriteria criteria) {
        log.debug("REST request to count ProductosDormitorios by criteria: {}", criteria);
        return ResponseEntity.ok().body(productosDormitorioQueryService.countByCriteria(criteria));
    }

    /**
     * GET  /productos-dormitorios/:id : get the "id" productosDormitorio.
     *
     * @param id the id of the productosDormitorioDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productosDormitorioDTO, or with status 404 (Not Found)
     */
    @GetMapping("/productos-dormitorios/{id}")
    @Timed
    public ResponseEntity<ProductosDormitorioDTO> getProductosDormitorio(@PathVariable Long id) {
        log.debug("REST request to get ProductosDormitorio : {}", id);
        Optional<ProductosDormitorioDTO> productosDormitorioDTO = productosDormitorioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productosDormitorioDTO);
    }

    /**
     * DELETE  /productos-dormitorios/:id : delete the "id" productosDormitorio.
     *
     * @param id the id of the productosDormitorioDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/productos-dormitorios/{id}")
    @Timed
    public ResponseEntity<Void> deleteProductosDormitorio(@PathVariable Long id) {
        log.debug("REST request to delete ProductosDormitorio : {}", id);
        productosDormitorioService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
