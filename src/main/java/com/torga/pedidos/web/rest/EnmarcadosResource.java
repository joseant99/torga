package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.DatosUsuario;
import com.torga.pedidos.domain.Enmarcados;
import com.torga.pedidos.repository.EnmarcadosRepository;
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
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Enmarcados.
 */
@RestController
@RequestMapping("/api")
public class EnmarcadosResource {

    private final Logger log = LoggerFactory.getLogger(EnmarcadosResource.class);

    private static final String ENTITY_NAME = "enmarcados";

    private final EnmarcadosRepository enmarcadosRepository;

    public EnmarcadosResource(EnmarcadosRepository enmarcadosRepository) {
        this.enmarcadosRepository = enmarcadosRepository;
    }

    /**
     * POST  /enmarcados : Create a new enmarcados.
     *
     * @param enmarcados the enmarcados to create
     * @return the ResponseEntity with status 201 (Created) and with body the new enmarcados, or with status 400 (Bad Request) if the enmarcados has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/enmarcados")
    @Timed
    public ResponseEntity<Enmarcados> createEnmarcados(@RequestBody Enmarcados enmarcados) throws URISyntaxException {
        log.debug("REST request to save Enmarcados : {}", enmarcados);
        if (enmarcados.getId() != null) {
            throw new BadRequestAlertException("A new enmarcados cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Enmarcados result = enmarcadosRepository.save(enmarcados);
        return ResponseEntity.created(new URI("/api/enmarcados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /enmarcados : Updates an existing enmarcados.
     *
     * @param enmarcados the enmarcados to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated enmarcados,
     * or with status 400 (Bad Request) if the enmarcados is not valid,
     * or with status 500 (Internal Server Error) if the enmarcados couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/enmarcados")
    @Timed
    public ResponseEntity<Enmarcados> updateEnmarcados(@RequestBody Enmarcados enmarcados) throws URISyntaxException {
        log.debug("REST request to update Enmarcados : {}", enmarcados);
        if (enmarcados.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Enmarcados result = enmarcadosRepository.save(enmarcados);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, enmarcados.getId().toString()))
            .body(result);
    }

    /**
     * GET  /enmarcados : get all the enmarcados.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of enmarcados in body
     */
    @GetMapping("/enmarcados")
    @Timed
    public ResponseEntity<List<Enmarcados>> getAllEnmarcados(Pageable pageable) {
        log.debug("REST request to get a page of Enmarcados");
        Page<Enmarcados> page = enmarcadosRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/enmarcados");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    
    /**
     * GET  /enmarcados : get all the enmarcados.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of enmarcados in body
     */
    @GetMapping("/enmarcados-id/{id}/{letra}")
    @Timed
    public ResponseEntity<Collection<Enmarcados>> getAllEnmarcados1(@PathVariable Long id ,@PathVariable String letra) {
        Collection<Enmarcados> page = enmarcadosRepository.buscarArmario(id,letra);
        return ResponseEntity.ok().body(page);
    }
    
    
    
    /**
     * GET  /enmarcados/:id : get the "id" enmarcados.
     *
     * @param id the id of the enmarcados to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the enmarcados, or with status 404 (Not Found)
     */
    @GetMapping("/enmarcados/{id}")
    @Timed
    public ResponseEntity<Enmarcados> getEnmarcados(@PathVariable Long id) {
        log.debug("REST request to get Enmarcados : {}", id);
        Optional<Enmarcados> enmarcados = enmarcadosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(enmarcados);
    }

    /**
     * DELETE  /enmarcados/:id : delete the "id" enmarcados.
     *
     * @param id the id of the enmarcados to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/enmarcados/{id}")
    @Timed
    public ResponseEntity<Void> deleteEnmarcados(@PathVariable Long id) {
        log.debug("REST request to delete Enmarcados : {}", id);

        enmarcadosRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
