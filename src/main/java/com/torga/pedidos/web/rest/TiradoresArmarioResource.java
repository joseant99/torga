package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.TiradoresArmario;
import com.torga.pedidos.repository.TiradoresArmarioRepository;
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
 * REST controller for managing TiradoresArmario.
 */
@RestController
@RequestMapping("/api")
public class TiradoresArmarioResource {

    private final Logger log = LoggerFactory.getLogger(TiradoresArmarioResource.class);

    private static final String ENTITY_NAME = "tiradoresArmario";

    private final TiradoresArmarioRepository tiradoresArmarioRepository;

    public TiradoresArmarioResource(TiradoresArmarioRepository tiradoresArmarioRepository) {
        this.tiradoresArmarioRepository = tiradoresArmarioRepository;
    }

    /**
     * POST  /tiradores-armarios : Create a new tiradoresArmario.
     *
     * @param tiradoresArmario the tiradoresArmario to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tiradoresArmario, or with status 400 (Bad Request) if the tiradoresArmario has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tiradores-armarios")
    @Timed
    public ResponseEntity<TiradoresArmario> createTiradoresArmario(@RequestBody TiradoresArmario tiradoresArmario) throws URISyntaxException {
        log.debug("REST request to save TiradoresArmario : {}", tiradoresArmario);
        if (tiradoresArmario.getId() != null) {
            throw new BadRequestAlertException("A new tiradoresArmario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TiradoresArmario result = tiradoresArmarioRepository.save(tiradoresArmario);
        return ResponseEntity.created(new URI("/api/tiradores-armarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tiradores-armarios : Updates an existing tiradoresArmario.
     *
     * @param tiradoresArmario the tiradoresArmario to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tiradoresArmario,
     * or with status 400 (Bad Request) if the tiradoresArmario is not valid,
     * or with status 500 (Internal Server Error) if the tiradoresArmario couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tiradores-armarios")
    @Timed
    public ResponseEntity<TiradoresArmario> updateTiradoresArmario(@RequestBody TiradoresArmario tiradoresArmario) throws URISyntaxException {
        log.debug("REST request to update TiradoresArmario : {}", tiradoresArmario);
        if (tiradoresArmario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TiradoresArmario result = tiradoresArmarioRepository.save(tiradoresArmario);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tiradoresArmario.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tiradores-armarios : get all the tiradoresArmarios.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tiradoresArmarios in body
     */
    @GetMapping("/tiradores-armarios")
    @Timed
    public ResponseEntity<List<TiradoresArmario>> getAllTiradoresArmarios(Pageable pageable) {
        log.debug("REST request to get a page of TiradoresArmarios");
        Page<TiradoresArmario> page = tiradoresArmarioRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tiradores-armarios");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /tiradores-armarios/:id : get the "id" tiradoresArmario.
     *
     * @param id the id of the tiradoresArmario to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tiradoresArmario, or with status 404 (Not Found)
     */
    @GetMapping("/tiradores-armarios/{id}")
    @Timed
    public ResponseEntity<TiradoresArmario> getTiradoresArmario(@PathVariable Long id) {
        log.debug("REST request to get TiradoresArmario : {}", id);
        Optional<TiradoresArmario> tiradoresArmario = tiradoresArmarioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tiradoresArmario);
    }

    /**
     * DELETE  /tiradores-armarios/:id : delete the "id" tiradoresArmario.
     *
     * @param id the id of the tiradoresArmario to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tiradores-armarios/{id}")
    @Timed
    public ResponseEntity<Void> deleteTiradoresArmario(@PathVariable Long id) {
        log.debug("REST request to delete TiradoresArmario : {}", id);

        tiradoresArmarioRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
