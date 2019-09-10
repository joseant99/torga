package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Mensajes;
import com.torga.pedidos.repository.MensajesRepository;
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
 * REST controller for managing Mensajes.
 */
@RestController
@RequestMapping("/api")
public class MensajesResource {

    private final Logger log = LoggerFactory.getLogger(MensajesResource.class);

    private static final String ENTITY_NAME = "mensajes";

    private final MensajesRepository mensajesRepository;

    public MensajesResource(MensajesRepository mensajesRepository) {
        this.mensajesRepository = mensajesRepository;
    }

    /**
     * POST  /mensajes : Create a new mensajes.
     *
     * @param mensajes the mensajes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mensajes, or with status 400 (Bad Request) if the mensajes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mensajes")
    @Timed
    public ResponseEntity<Mensajes> createMensajes(@RequestBody Mensajes mensajes) throws URISyntaxException {
        log.debug("REST request to save Mensajes : {}", mensajes);
        if (mensajes.getId() != null) {
            throw new BadRequestAlertException("A new mensajes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Mensajes result = mensajesRepository.save(mensajes);
        return ResponseEntity.created(new URI("/api/mensajes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mensajes : Updates an existing mensajes.
     *
     * @param mensajes the mensajes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mensajes,
     * or with status 400 (Bad Request) if the mensajes is not valid,
     * or with status 500 (Internal Server Error) if the mensajes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mensajes")
    @Timed
    public ResponseEntity<Mensajes> updateMensajes(@RequestBody Mensajes mensajes) throws URISyntaxException {
        log.debug("REST request to update Mensajes : {}", mensajes);
        if (mensajes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Mensajes result = mensajesRepository.save(mensajes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mensajes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mensajes : get all the mensajes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of mensajes in body
     */
    @GetMapping("/mensajes")
    @Timed
    public ResponseEntity<List<Mensajes>> getAllMensajes(Pageable pageable) {
        log.debug("REST request to get a page of Mensajes");
        Page<Mensajes> page = mensajesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/mensajes");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /mensajes/:id : get the "id" mensajes.
     *
     * @param id the id of the mensajes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mensajes, or with status 404 (Not Found)
     */
    @GetMapping("/mensajes/{id}")
    @Timed
    public ResponseEntity<Mensajes> getMensajes(@PathVariable Long id) {
        log.debug("REST request to get Mensajes : {}", id);
        Optional<Mensajes> mensajes = mensajesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mensajes);
    }

    /**
     * DELETE  /mensajes/:id : delete the "id" mensajes.
     *
     * @param id the id of the mensajes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mensajes/{id}")
    @Timed
    public ResponseEntity<Void> deleteMensajes(@PathVariable Long id) {
        log.debug("REST request to delete Mensajes : {}", id);

        mensajesRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
