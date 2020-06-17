package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Cajeado;
import com.torga.pedidos.repository.CajeadoRepository;
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

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Cajeado.
 */
@RestController
@RequestMapping("/api")
public class CajeadoResource {

    private final Logger log = LoggerFactory.getLogger(CajeadoResource.class);

    private static final String ENTITY_NAME = "cajeado";

    private final CajeadoRepository cajeadoRepository;

    public CajeadoResource(CajeadoRepository cajeadoRepository) {
        this.cajeadoRepository = cajeadoRepository;
    }

    /**
     * POST  /cajeados : Create a new cajeado.
     *
     * @param cajeado the cajeado to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cajeado, or with status 400 (Bad Request) if the cajeado has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cajeados")
    @Timed
    public ResponseEntity<Cajeado> createCajeado(@RequestBody Cajeado cajeado) throws URISyntaxException {
        log.debug("REST request to save Cajeado : {}", cajeado);
        if (cajeado.getId() != null) {
            throw new BadRequestAlertException("A new cajeado cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cajeado result = cajeadoRepository.save(cajeado);
        return ResponseEntity.created(new URI("/api/cajeados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cajeados : Updates an existing cajeado.
     *
     * @param cajeado the cajeado to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cajeado,
     * or with status 400 (Bad Request) if the cajeado is not valid,
     * or with status 500 (Internal Server Error) if the cajeado couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cajeados")
    @Timed
    public ResponseEntity<Cajeado> updateCajeado(@RequestBody Cajeado cajeado) throws URISyntaxException {
        log.debug("REST request to update Cajeado : {}", cajeado);
        if (cajeado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cajeado result = cajeadoRepository.save(cajeado);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cajeado.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cajeados : get all the cajeados.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cajeados in body
     */
    @GetMapping("/cajeados")
    @Timed
    public ResponseEntity<List<Cajeado>> getAllCajeados(Pageable pageable) {
        log.debug("REST request to get a page of Cajeados");
        Page<Cajeado> page = cajeadoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cajeados");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /cajeados/:id : get the "id" cajeado.
     *
     * @param id the id of the cajeado to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cajeado, or with status 404 (Not Found)
     */
    @GetMapping("/cajeados/{id}")
    @Timed
    public ResponseEntity<Cajeado> getCajeado(@PathVariable Long id) {
        log.debug("REST request to get Cajeado : {}", id);
        Optional<Cajeado> cajeado = cajeadoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cajeado);
    }

    /**
     * DELETE  /cajeados/:id : delete the "id" cajeado.
     *
     * @param id the id of the cajeado to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cajeados/{id}")
    @Timed
    public ResponseEntity<Void> deleteCajeado(@PathVariable Long id) {
        log.debug("REST request to delete Cajeado : {}", id);

        cajeadoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
