package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.torga.pedidos.domain.Provincias;
import com.torga.pedidos.repository.ProvinciasRepository;
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
 * REST controller for managing Provincias.
 */
@RestController
@RequestMapping("/api")
public class ProvinciasResource {

    private final Logger log = LoggerFactory.getLogger(ProvinciasResource.class);

    private static final String ENTITY_NAME = "provincias";

    private final ProvinciasRepository provinciasRepository;

    public ProvinciasResource(ProvinciasRepository provinciasRepository) {
        this.provinciasRepository = provinciasRepository;
    }

    /**
     * POST  /provincias : Create a new provincias.
     *
     * @param provincias the provincias to create
     * @return the ResponseEntity with status 201 (Created) and with body the new provincias, or with status 400 (Bad Request) if the provincias has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/provincias")
    @Timed
    public ResponseEntity<Provincias> createProvincias(@RequestBody Provincias provincias) throws URISyntaxException {
        log.debug("REST request to save Provincias : {}", provincias);
        if (provincias.getId() != null) {
            throw new BadRequestAlertException("A new provincias cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Provincias result = provinciasRepository.save(provincias);
        return ResponseEntity.created(new URI("/api/provincias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /provincias : Updates an existing provincias.
     *
     * @param provincias the provincias to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated provincias,
     * or with status 400 (Bad Request) if the provincias is not valid,
     * or with status 500 (Internal Server Error) if the provincias couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/provincias")
    @Timed
    public ResponseEntity<Provincias> updateProvincias(@RequestBody Provincias provincias) throws URISyntaxException {
        log.debug("REST request to update Provincias : {}", provincias);
        if (provincias.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Provincias result = provinciasRepository.save(provincias);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, provincias.getId().toString()))
            .body(result);
    }

    /**
     * GET  /provincias : get all the provincias.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of provincias in body
     */
    @GetMapping("/provincias")
    @Timed
    public ResponseEntity<List<Provincias>> getAllProvincias(Pageable pageable)  {
        log.debug("REST request to get a page of Provincias");
        Page<Provincias> page = provinciasRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/provincias");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    /**
     * GET  /provincias : get all the provincias.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of provincias in body
     */
    @GetMapping("/provincias105")
    @Timed
    public ResponseEntity<String> getAllProvincias105(Pageable pageable) throws JsonProcessingException {
        log.debug("REST request to get a page of Provincias");
        Page<Provincias> page = provinciasRepository.findAll(pageable);
        ObjectMapper mapper = new ObjectMapper();
        String jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(page.getContent());
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/provincias");
        return ResponseEntity.ok().headers(headers).body(jsonString);
    }

    /**
     * GET  /provincias/:id : get the "id" provincias.
     *
     * @param id the id of the provincias to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the provincias, or with status 404 (Not Found)
     */
    @GetMapping("/provincias/{id}")
    @Timed
    public ResponseEntity<Provincias> getProvincias(@PathVariable Long id) {
        log.debug("REST request to get Provincias : {}", id);
        Optional<Provincias> provincias = provinciasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(provincias);
    }

    /**
     * DELETE  /provincias/:id : delete the "id" provincias.
     *
     * @param id the id of the provincias to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/provincias/{id}")
    @Timed
    public ResponseEntity<Void> deleteProvincias(@PathVariable Long id) {
        log.debug("REST request to delete Provincias : {}", id);

        provinciasRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
