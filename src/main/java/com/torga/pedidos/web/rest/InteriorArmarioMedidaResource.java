package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.InteriorArmarioMedida;
import com.torga.pedidos.repository.InteriorArmarioMedidaRepository;
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
 * REST controller for managing InteriorArmarioMedida.
 */
@RestController
@RequestMapping("/api")
public class InteriorArmarioMedidaResource {

    private final Logger log = LoggerFactory.getLogger(InteriorArmarioMedidaResource.class);

    private static final String ENTITY_NAME = "interiorArmarioMedida";

    private final InteriorArmarioMedidaRepository interiorArmarioMedidaRepository;

    public InteriorArmarioMedidaResource(InteriorArmarioMedidaRepository interiorArmarioMedidaRepository) {
        this.interiorArmarioMedidaRepository = interiorArmarioMedidaRepository;
    }

    /**
     * POST  /interior-armario-medidas : Create a new interiorArmarioMedida.
     *
     * @param interiorArmarioMedida the interiorArmarioMedida to create
     * @return the ResponseEntity with status 201 (Created) and with body the new interiorArmarioMedida, or with status 400 (Bad Request) if the interiorArmarioMedida has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/interior-armario-medidas")
    @Timed
    public ResponseEntity<InteriorArmarioMedida> createInteriorArmarioMedida(@RequestBody InteriorArmarioMedida interiorArmarioMedida) throws URISyntaxException {
        log.debug("REST request to save InteriorArmarioMedida : {}", interiorArmarioMedida);
        if (interiorArmarioMedida.getId() != null) {
            throw new BadRequestAlertException("A new interiorArmarioMedida cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InteriorArmarioMedida result = interiorArmarioMedidaRepository.save(interiorArmarioMedida);
        return ResponseEntity.created(new URI("/api/interior-armario-medidas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /interior-armario-medidas : Updates an existing interiorArmarioMedida.
     *
     * @param interiorArmarioMedida the interiorArmarioMedida to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated interiorArmarioMedida,
     * or with status 400 (Bad Request) if the interiorArmarioMedida is not valid,
     * or with status 500 (Internal Server Error) if the interiorArmarioMedida couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/interior-armario-medidas")
    @Timed
    public ResponseEntity<InteriorArmarioMedida> updateInteriorArmarioMedida(@RequestBody InteriorArmarioMedida interiorArmarioMedida) throws URISyntaxException {
        log.debug("REST request to update InteriorArmarioMedida : {}", interiorArmarioMedida);
        if (interiorArmarioMedida.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InteriorArmarioMedida result = interiorArmarioMedidaRepository.save(interiorArmarioMedida);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, interiorArmarioMedida.getId().toString()))
            .body(result);
    }

    /**
     * GET  /interior-armario-medidas : get all the interiorArmarioMedidas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of interiorArmarioMedidas in body
     */
    @GetMapping("/interior-armario-medidas")
    @Timed
    public ResponseEntity<List<InteriorArmarioMedida>> getAllInteriorArmarioMedidas(Pageable pageable) {
        log.debug("REST request to get a page of InteriorArmarioMedidas");
        Page<InteriorArmarioMedida> page = interiorArmarioMedidaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/interior-armario-medidas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /interior-armario-medidas/:id : get the "id" interiorArmarioMedida.
     *
     * @param id the id of the interiorArmarioMedida to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the interiorArmarioMedida, or with status 404 (Not Found)
     */
    @GetMapping("/interior-armario-medidas/{id}")
    @Timed
    public ResponseEntity<InteriorArmarioMedida> getInteriorArmarioMedida(@PathVariable Long id) {
        log.debug("REST request to get InteriorArmarioMedida : {}", id);
        Optional<InteriorArmarioMedida> interiorArmarioMedida = interiorArmarioMedidaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(interiorArmarioMedida);
    }

    /**
     * DELETE  /interior-armario-medidas/:id : delete the "id" interiorArmarioMedida.
     *
     * @param id the id of the interiorArmarioMedida to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/interior-armario-medidas/{id}")
    @Timed
    public ResponseEntity<Void> deleteInteriorArmarioMedida(@PathVariable Long id) {
        log.debug("REST request to delete InteriorArmarioMedida : {}", id);

        interiorArmarioMedidaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
