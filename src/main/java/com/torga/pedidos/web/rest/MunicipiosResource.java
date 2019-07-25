package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Municipios;
import com.torga.pedidos.repository.MunicipiosRepository;
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
 * REST controller for managing Municipios.
 */
@RestController
@RequestMapping("/api")
public class MunicipiosResource {

    private final Logger log = LoggerFactory.getLogger(MunicipiosResource.class);

    private static final String ENTITY_NAME = "municipios";

    private final MunicipiosRepository municipiosRepository;

    public MunicipiosResource(MunicipiosRepository municipiosRepository) {
        this.municipiosRepository = municipiosRepository;
    }

    /**
     * POST  /municipios : Create a new municipios.
     *
     * @param municipios the municipios to create
     * @return the ResponseEntity with status 201 (Created) and with body the new municipios, or with status 400 (Bad Request) if the municipios has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/municipios")
    @Timed
    public ResponseEntity<Municipios> createMunicipios(@RequestBody Municipios municipios) throws URISyntaxException {
        log.debug("REST request to save Municipios : {}", municipios);
        if (municipios.getId() != null) {
            throw new BadRequestAlertException("A new municipios cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Municipios result = municipiosRepository.save(municipios);
        return ResponseEntity.created(new URI("/api/municipios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /municipios : Updates an existing municipios.
     *
     * @param municipios the municipios to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated municipios,
     * or with status 400 (Bad Request) if the municipios is not valid,
     * or with status 500 (Internal Server Error) if the municipios couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/municipios")
    @Timed
    public ResponseEntity<Municipios> updateMunicipios(@RequestBody Municipios municipios) throws URISyntaxException {
        log.debug("REST request to update Municipios : {}", municipios);
        if (municipios.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Municipios result = municipiosRepository.save(municipios);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, municipios.getId().toString()))
            .body(result);
    }

    /**
     * GET  /municipios : get all the municipios.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of municipios in body
     */
    @GetMapping("/municipios")
    @Timed
    public ResponseEntity<List<Municipios>> getAllMunicipios(Pageable pageable) {
        log.debug("REST request to get a page of Municipios");
        Page<Municipios> page = municipiosRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/municipios");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    
    /**
     * GET  /municipios : get all the municipios.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of municipios in body
     */
    @GetMapping("/municipios1")
    @Timed
    public ResponseEntity<List<Municipios>> getAllMunicipios1() {
        log.debug("REST request to get a page of Municipios");
        List<Municipios> Municipios = municipiosRepository.findAll();
        return ResponseEntity.ok().body(Municipios);
    }

    /**
     * GET  /municipios/:id : get the "id" municipios.
     *
     * @param id the id of the municipios to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the municipios, or with status 404 (Not Found)
     */
    @GetMapping("/municipios/{id}")
    @Timed
    public ResponseEntity<Municipios> getMunicipios(@PathVariable Long id) {
        log.debug("REST request to get Municipios : {}", id);
        Optional<Municipios> municipios = municipiosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(municipios);
    }

    /**
     * DELETE  /municipios/:id : delete the "id" municipios.
     *
     * @param id the id of the municipios to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/municipios/{id}")
    @Timed
    public ResponseEntity<Void> deleteMunicipios(@PathVariable Long id) {
        log.debug("REST request to delete Municipios : {}", id);

        municipiosRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
