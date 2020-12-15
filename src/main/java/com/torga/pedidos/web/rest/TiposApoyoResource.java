package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.PuertasPrecios;
import com.torga.pedidos.domain.TiposApoyo;
import com.torga.pedidos.repository.TiposApoyoRepository;
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
 * REST controller for managing TiposApoyo.
 */
@RestController
@RequestMapping("/api")
public class TiposApoyoResource {

    private final Logger log = LoggerFactory.getLogger(TiposApoyoResource.class);

    private static final String ENTITY_NAME = "tiposApoyo";

    private final TiposApoyoRepository tiposApoyoRepository;

    public TiposApoyoResource(TiposApoyoRepository tiposApoyoRepository) {
        this.tiposApoyoRepository = tiposApoyoRepository;
    }

    /**
     * POST  /tipos-apoyos : Create a new tiposApoyo.
     *
     * @param tiposApoyo the tiposApoyo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tiposApoyo, or with status 400 (Bad Request) if the tiposApoyo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipos-apoyos")
    @Timed
    public ResponseEntity<TiposApoyo> createTiposApoyo(@Valid @RequestBody TiposApoyo tiposApoyo) throws URISyntaxException {
        log.debug("REST request to save TiposApoyo : {}", tiposApoyo);
        if (tiposApoyo.getId() != null) {
            throw new BadRequestAlertException("A new tiposApoyo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TiposApoyo result = tiposApoyoRepository.save(tiposApoyo);
        return ResponseEntity.created(new URI("/api/tipos-apoyos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipos-apoyos : Updates an existing tiposApoyo.
     *
     * @param tiposApoyo the tiposApoyo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tiposApoyo,
     * or with status 400 (Bad Request) if the tiposApoyo is not valid,
     * or with status 500 (Internal Server Error) if the tiposApoyo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipos-apoyos")
    @Timed
    public ResponseEntity<TiposApoyo> updateTiposApoyo(@Valid @RequestBody TiposApoyo tiposApoyo) throws URISyntaxException {
        log.debug("REST request to update TiposApoyo : {}", tiposApoyo);
        if (tiposApoyo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TiposApoyo result = tiposApoyoRepository.save(tiposApoyo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tiposApoyo.getId().toString()))
            .body(result);
    }
    
    /**
     * GET  /cascos : get all the cascos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cascos in body
     */
    @GetMapping("/tipos-apoyos-id/{id}")
    @Timed
    public ResponseEntity<Collection<TiposApoyo>> getAllCascosBus1( @PathVariable("id") Long id ) {
        log.debug("REST request to get a page of Cascos");
        Collection<TiposApoyo> page = tiposApoyoRepository.findAncho1(id);
        return ResponseEntity.ok().body(page);
    }
    
    /**
     * GET  /cascos : get all the cascos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cascos in body
     */
    @GetMapping("/tipos-apoyos-id2/{id}/{ancho}")
    @Timed
    public ResponseEntity<Collection<TiposApoyo>> getAllCascosBus3( @PathVariable("id") Long id ,@PathVariable("ancho") Float ancho) {
        log.debug("REST request to get a page of Cascos");
        Collection<TiposApoyo> page = tiposApoyoRepository.findAncho3(id,ancho);
        return ResponseEntity.ok().body(page);
    }
    /**
     * GET  /cascos : get all the cascos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cascos in body
     */
    @GetMapping("/tipos-apoyos-id1/{id}")
    @Timed
    public ResponseEntity<Collection<TiposApoyo>> getAllCascosBus2( @PathVariable("id") Long id ) {
        log.debug("REST request to get a page of Cascos");
        Collection<TiposApoyo> page = tiposApoyoRepository.findAncho2(id);
        return ResponseEntity.ok().body(page);
    }

    /**
     * GET  /tipos-apoyos : get all the tiposApoyos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tiposApoyos in body
     */
    @GetMapping("/tipos-apoyos")
    @Timed
    public ResponseEntity<List<TiposApoyo>> getAllTiposApoyos(Pageable pageable) {
        log.debug("REST request to get a page of TiposApoyos");
        Page<TiposApoyo> page = tiposApoyoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tipos-apoyos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /tipos-apoyos/:id : get the "id" tiposApoyo.
     *
     * @param id the id of the tiposApoyo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tiposApoyo, or with status 404 (Not Found)
     */
    @GetMapping("/tipos-apoyos/{id}")
    @Timed
    public ResponseEntity<TiposApoyo> getTiposApoyo(@PathVariable Long id) {
        log.debug("REST request to get TiposApoyo : {}", id);
        Optional<TiposApoyo> tiposApoyo = tiposApoyoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tiposApoyo);
    }

    /**
     * DELETE  /tipos-apoyos/:id : delete the "id" tiposApoyo.
     *
     * @param id the id of the tiposApoyo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipos-apoyos/{id}")
    @Timed
    public ResponseEntity<Void> deleteTiposApoyo(@PathVariable Long id) {
        log.debug("REST request to delete TiposApoyo : {}", id);

        tiposApoyoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
