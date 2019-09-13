package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.InteriorArmarioDentro;
import com.torga.pedidos.repository.InteriorArmarioDentroRepository;
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
 * REST controller for managing InteriorArmarioDentro.
 */
@RestController
@RequestMapping("/api")
public class InteriorArmarioDentroResource {

    private final Logger log = LoggerFactory.getLogger(InteriorArmarioDentroResource.class);

    private static final String ENTITY_NAME = "interiorArmarioDentro";

    private final InteriorArmarioDentroRepository interiorArmarioDentroRepository;

    public InteriorArmarioDentroResource(InteriorArmarioDentroRepository interiorArmarioDentroRepository) {
        this.interiorArmarioDentroRepository = interiorArmarioDentroRepository;
    }

    /**
     * POST  /interior-armario-dentros : Create a new interiorArmarioDentro.
     *
     * @param interiorArmarioDentro the interiorArmarioDentro to create
     * @return the ResponseEntity with status 201 (Created) and with body the new interiorArmarioDentro, or with status 400 (Bad Request) if the interiorArmarioDentro has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/interior-armario-dentros")
    @Timed
    public ResponseEntity<InteriorArmarioDentro> createInteriorArmarioDentro(@RequestBody InteriorArmarioDentro interiorArmarioDentro) throws URISyntaxException {
        log.debug("REST request to save InteriorArmarioDentro : {}", interiorArmarioDentro);
        if (interiorArmarioDentro.getId() != null) {
            throw new BadRequestAlertException("A new interiorArmarioDentro cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InteriorArmarioDentro result = interiorArmarioDentroRepository.save(interiorArmarioDentro);
        return ResponseEntity.created(new URI("/api/interior-armario-dentros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /interior-armario-dentros : Updates an existing interiorArmarioDentro.
     *
     * @param interiorArmarioDentro the interiorArmarioDentro to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated interiorArmarioDentro,
     * or with status 400 (Bad Request) if the interiorArmarioDentro is not valid,
     * or with status 500 (Internal Server Error) if the interiorArmarioDentro couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/interior-armario-dentros")
    @Timed
    public ResponseEntity<InteriorArmarioDentro> updateInteriorArmarioDentro(@RequestBody InteriorArmarioDentro interiorArmarioDentro) throws URISyntaxException {
        log.debug("REST request to update InteriorArmarioDentro : {}", interiorArmarioDentro);
        if (interiorArmarioDentro.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InteriorArmarioDentro result = interiorArmarioDentroRepository.save(interiorArmarioDentro);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, interiorArmarioDentro.getId().toString()))
            .body(result);
    }

    /**
     * GET  /interior-armario-dentros : get all the interiorArmarioDentros.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of interiorArmarioDentros in body
     */
    @GetMapping("/interior-armario-dentros")
    @Timed
    public ResponseEntity<List<InteriorArmarioDentro>> getAllInteriorArmarioDentros(Pageable pageable) {
        log.debug("REST request to get a page of InteriorArmarioDentros");
        Page<InteriorArmarioDentro> page = interiorArmarioDentroRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/interior-armario-dentros");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /interior-armario-dentros/:id : get the "id" interiorArmarioDentro.
     *
     * @param id the id of the interiorArmarioDentro to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the interiorArmarioDentro, or with status 404 (Not Found)
     */
    @GetMapping("/interior-armario-dentros/{id}")
    @Timed
    public ResponseEntity<InteriorArmarioDentro> getInteriorArmarioDentro(@PathVariable Long id) {
        log.debug("REST request to get InteriorArmarioDentro : {}", id);
        Optional<InteriorArmarioDentro> interiorArmarioDentro = interiorArmarioDentroRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(interiorArmarioDentro);
    }

    /**
     * DELETE  /interior-armario-dentros/:id : delete the "id" interiorArmarioDentro.
     *
     * @param id the id of the interiorArmarioDentro to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/interior-armario-dentros/{id}")
    @Timed
    public ResponseEntity<Void> deleteInteriorArmarioDentro(@PathVariable Long id) {
        log.debug("REST request to delete InteriorArmarioDentro : {}", id);

        interiorArmarioDentroRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
