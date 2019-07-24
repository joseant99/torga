package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Cliente;
import com.torga.pedidos.domain.Representante;
import com.torga.pedidos.service.RepresentanteService;
import com.torga.pedidos.web.rest.errors.BadRequestAlertException;
import com.torga.pedidos.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Representante.
 */
@RestController
@RequestMapping("/api")
public class RepresentanteResource {

    private final Logger log = LoggerFactory.getLogger(RepresentanteResource.class);

    private static final String ENTITY_NAME = "representante";

    private final RepresentanteService representanteService;

    public RepresentanteResource(RepresentanteService representanteService) {
        this.representanteService = representanteService;
    }
    
    /**
     * GET  /representante/:usuario : get  all representante with the "usuario".
     *
     * @param user of the representante 
     * @return the ResponseEntity with status 200 (OK) and with body the representante, or with status 404 (Not Found)
     */
    @GetMapping("/representante/{usuario}")
    @Timed
    public ResponseEntity<Representante> getRepresentanteByUser(@PathVariable String usuario) {
        log.debug("REST request to get representante by user : {}", usuario);
        Representante representante = representanteService.getRepresentanteUsuario(usuario);
        return ResponseEntity.ok()
                .body(representante);
    }

    /**
     * POST  /representantes : Create a new representante.
     *
     * @param representante the representante to create
     * @return the ResponseEntity with status 201 (Created) and with body the new representante, or with status 400 (Bad Request) if the representante has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/representantes")
    @Timed
    public ResponseEntity<Representante> createRepresentante(@Valid @RequestBody Representante representante) throws URISyntaxException {
        log.debug("REST request to save Representante : {}", representante);
        if (representante.getId() != null) {
            throw new BadRequestAlertException("A new representante cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Representante result = representanteService.save(representante);
        return ResponseEntity.created(new URI("/api/representantes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /representantes : Updates an existing representante.
     *
     * @param representante the representante to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated representante,
     * or with status 400 (Bad Request) if the representante is not valid,
     * or with status 500 (Internal Server Error) if the representante couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/representantes")
    @Timed
    public ResponseEntity<Representante> updateRepresentante(@Valid @RequestBody Representante representante) throws URISyntaxException {
        log.debug("REST request to update Representante : {}", representante);
        if (representante.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Representante result = representanteService.save(representante);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, representante.getId().toString()))
            .body(result);
    }

    /**
     * GET  /representantes : get all the representantes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of representantes in body
     */
    @GetMapping("/representantes")
    @Timed
    public List<Representante> getAllRepresentantes() {
        log.debug("REST request to get all Representantes");
        return representanteService.findAll();
    }

    /**
     * GET  /representantes/:id : get the "id" representante.
     *
     * @param id the id of the representante to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the representante, or with status 404 (Not Found)
     */
    @GetMapping("/representantes/{id}")
    @Timed
    public ResponseEntity<Representante> getRepresentante(@PathVariable Long id) {
        log.debug("REST request to get Representante : {}", id);
        Optional<Representante> representante = representanteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(representante);
    }

    /**
     * DELETE  /representantes/:id : delete the "id" representante.
     *
     * @param id the id of the representante to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/representantes/{id}")
    @Timed
    public ResponseEntity<Void> deleteRepresentante(@PathVariable Long id) {
        log.debug("REST request to delete Representante : {}", id);
        representanteService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
