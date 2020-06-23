package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Armario;
import com.torga.pedidos.repository.ArmarioRepository;
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
 * REST controller for managing Armario.
 */
@RestController
@RequestMapping("/api")
public class ArmarioResource {

    private final Logger log = LoggerFactory.getLogger(ArmarioResource.class);

    private static final String ENTITY_NAME = "armario";

    private final ArmarioRepository armarioRepository;

    public ArmarioResource(ArmarioRepository armarioRepository) {
        this.armarioRepository = armarioRepository;
    }

    /**
     * POST  /armarios : Create a new armario.
     *
     * @param armario the armario to create
     * @return the ResponseEntity with status 201 (Created) and with body the new armario, or with status 400 (Bad Request) if the armario has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/armarios")
    @Timed
    public ResponseEntity<Armario> createArmario(@RequestBody Armario armario) throws URISyntaxException {
        log.debug("REST request to save Armario : {}", armario);
        if (armario.getId() != null) {
            throw new BadRequestAlertException("A new armario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Armario result = armarioRepository.save(armario);
        return ResponseEntity.created(new URI("/api/armarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /armarios : Updates an existing armario.
     *
     * @param armario the armario to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated armario,
     * or with status 400 (Bad Request) if the armario is not valid,
     * or with status 500 (Internal Server Error) if the armario couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/armarios")
    @Timed
    public ResponseEntity<Armario> updateArmario(@RequestBody Armario armario) throws URISyntaxException {
        log.debug("REST request to update Armario : {}", armario);
        if (armario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Armario result = armarioRepository.save(armario);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, armario.getId().toString()))
            .body(result);
    }

    /**
     * GET  /armarios : get all the armarios.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of armarios in body
     */
    @GetMapping("/armarios")
    @Timed
    public ResponseEntity<List<Armario>> getAllArmarios(Pageable pageable) {
        log.debug("REST request to get a page of Armarios");
        Page<Armario> page = armarioRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/armarios");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    

    @GetMapping("/armarios-bus/{min}/{max}")
    @Timed
    public ResponseEntity<Collection<Armario>> getAllArmariosBus(@PathVariable("min") Float min , @PathVariable("max") Float max ) {
        log.debug("REST request to get a page of Armarios");
        Collection<Armario> page = armarioRepository.findAncho(min, max);
        return ResponseEntity.ok().body(page);
    }
    

    @GetMapping("/armarios-bus1/{min}/{max}")
    @Timed
    public ResponseEntity<Collection<Armario>> getAllArmariosBus1(@PathVariable("min") Float min , @PathVariable("max") Float max ) {
        log.debug("REST request to get a page of Armarios");
        Collection<Armario> page = armarioRepository.findAncho1(min, max);
        return ResponseEntity.ok().body(page);
    }
    
    @GetMapping("/armarios-bus2/{min}/{max}")
    @Timed
    public ResponseEntity<Collection<Armario>> getAllArmariosBus2(@PathVariable("min") Float min , @PathVariable("max") Float max ) {
        log.debug("REST request to get a page of Armarios");
        Collection<Armario> page = armarioRepository.findAncho2(min, max);
        return ResponseEntity.ok().body(page);
    }
    
    @GetMapping("/armarios-bus3/{min}/{max}")
    @Timed
    public ResponseEntity<Collection<Armario>> getAllArmariosBus3(@PathVariable("min") Float min , @PathVariable("max") Float max ) {
        log.debug("REST request to get a page of Armarios");
        Collection<Armario> page = armarioRepository.findAncho3(min, max);
        return ResponseEntity.ok().body(page);
    }

    /**
     * GET  /armarios/:id : get the "id" armario.
     *
     * @param id the id of the armario to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the armario, or with status 404 (Not Found)
     */
    @GetMapping("/armarios/{id}")
    @Timed
    public ResponseEntity<Armario> getArmario(@PathVariable Long id) {
        log.debug("REST request to get Armario : {}", id);
        Optional<Armario> armario = armarioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(armario);
    }

    /**
     * DELETE  /armarios/:id : delete the "id" armario.
     *
     * @param id the id of the armario to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/armarios/{id}")
    @Timed
    public ResponseEntity<Void> deleteArmario(@PathVariable Long id) {
        log.debug("REST request to delete Armario : {}", id);

        armarioRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
