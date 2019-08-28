package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.IluminacionProdPrePed;
import com.torga.pedidos.repository.IluminacionProdPrePedRepository;
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
 * REST controller for managing IluminacionProdPrePed.
 */
@RestController
@RequestMapping("/api")
public class IluminacionProdPrePedResource {

    private final Logger log = LoggerFactory.getLogger(IluminacionProdPrePedResource.class);

    private static final String ENTITY_NAME = "iluminacionProdPrePed";

    private final IluminacionProdPrePedRepository iluminacionProdPrePedRepository;

    public IluminacionProdPrePedResource(IluminacionProdPrePedRepository iluminacionProdPrePedRepository) {
        this.iluminacionProdPrePedRepository = iluminacionProdPrePedRepository;
    }

    /**
     * POST  /iluminacion-prod-pre-peds : Create a new iluminacionProdPrePed.
     *
     * @param iluminacionProdPrePed the iluminacionProdPrePed to create
     * @return the ResponseEntity with status 201 (Created) and with body the new iluminacionProdPrePed, or with status 400 (Bad Request) if the iluminacionProdPrePed has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/iluminacion-prod-pre-peds")
    @Timed
    public ResponseEntity<IluminacionProdPrePed> createIluminacionProdPrePed(@RequestBody IluminacionProdPrePed iluminacionProdPrePed) throws URISyntaxException {
        log.debug("REST request to save IluminacionProdPrePed : {}", iluminacionProdPrePed);
        if (iluminacionProdPrePed.getId() != null) {
            throw new BadRequestAlertException("A new iluminacionProdPrePed cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IluminacionProdPrePed result = iluminacionProdPrePedRepository.save(iluminacionProdPrePed);
        return ResponseEntity.created(new URI("/api/iluminacion-prod-pre-peds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /iluminacion-prod-pre-peds : Updates an existing iluminacionProdPrePed.
     *
     * @param iluminacionProdPrePed the iluminacionProdPrePed to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated iluminacionProdPrePed,
     * or with status 400 (Bad Request) if the iluminacionProdPrePed is not valid,
     * or with status 500 (Internal Server Error) if the iluminacionProdPrePed couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/iluminacion-prod-pre-peds")
    @Timed
    public ResponseEntity<IluminacionProdPrePed> updateIluminacionProdPrePed(@RequestBody IluminacionProdPrePed iluminacionProdPrePed) throws URISyntaxException {
        log.debug("REST request to update IluminacionProdPrePed : {}", iluminacionProdPrePed);
        if (iluminacionProdPrePed.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IluminacionProdPrePed result = iluminacionProdPrePedRepository.save(iluminacionProdPrePed);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, iluminacionProdPrePed.getId().toString()))
            .body(result);
    }

    /**
     * GET  /iluminacion-prod-pre-peds : get all the iluminacionProdPrePeds.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of iluminacionProdPrePeds in body
     */
    @GetMapping("/iluminacion-prod-pre-peds")
    @Timed
    public ResponseEntity<List<IluminacionProdPrePed>> getAllIluminacionProdPrePeds(Pageable pageable) {
        log.debug("REST request to get a page of IluminacionProdPrePeds");
        Page<IluminacionProdPrePed> page = iluminacionProdPrePedRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/iluminacion-prod-pre-peds");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /iluminacion-prod-pre-peds/:id : get the "id" iluminacionProdPrePed.
     *
     * @param id the id of the iluminacionProdPrePed to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the iluminacionProdPrePed, or with status 404 (Not Found)
     */
    @GetMapping("/iluminacion-prod-pre-peds/{id}")
    @Timed
    public ResponseEntity<IluminacionProdPrePed> getIluminacionProdPrePed(@PathVariable Long id) {
        log.debug("REST request to get IluminacionProdPrePed : {}", id);
        Optional<IluminacionProdPrePed> iluminacionProdPrePed = iluminacionProdPrePedRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(iluminacionProdPrePed);
    }

    /**
     * DELETE  /iluminacion-prod-pre-peds/:id : delete the "id" iluminacionProdPrePed.
     *
     * @param id the id of the iluminacionProdPrePed to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/iluminacion-prod-pre-peds/{id}")
    @Timed
    public ResponseEntity<Void> deleteIluminacionProdPrePed(@PathVariable Long id) {
        log.debug("REST request to delete IluminacionProdPrePed : {}", id);

        iluminacionProdPrePedRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
