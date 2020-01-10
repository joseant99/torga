package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.PresupuestoArmario;
import com.torga.pedidos.repository.PresupuestoArmarioRepository;
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
 * REST controller for managing PresupuestoArmario.
 */
@RestController
@RequestMapping("/api")
public class PresupuestoArmarioResource {

    private final Logger log = LoggerFactory.getLogger(PresupuestoArmarioResource.class);

    private static final String ENTITY_NAME = "presupuestoArmario";

    private final PresupuestoArmarioRepository presupuestoArmarioRepository;

    public PresupuestoArmarioResource(PresupuestoArmarioRepository presupuestoArmarioRepository) {
        this.presupuestoArmarioRepository = presupuestoArmarioRepository;
    }

    /**
     * POST  /presupuesto-armarios : Create a new presupuestoArmario.
     *
     * @param presupuestoArmario the presupuestoArmario to create
     * @return the ResponseEntity with status 201 (Created) and with body the new presupuestoArmario, or with status 400 (Bad Request) if the presupuestoArmario has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/presupuesto-armarios")
    @Timed
    public ResponseEntity<PresupuestoArmario> createPresupuestoArmario(@RequestBody PresupuestoArmario presupuestoArmario) throws URISyntaxException {
        log.debug("REST request to save PresupuestoArmario : {}", presupuestoArmario);
        if (presupuestoArmario.getId() != null) {
            throw new BadRequestAlertException("A new presupuestoArmario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PresupuestoArmario result = presupuestoArmarioRepository.save(presupuestoArmario);
        return ResponseEntity.created(new URI("/api/presupuesto-armarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /presupuesto-armarios : Updates an existing presupuestoArmario.
     *
     * @param presupuestoArmario the presupuestoArmario to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated presupuestoArmario,
     * or with status 400 (Bad Request) if the presupuestoArmario is not valid,
     * or with status 500 (Internal Server Error) if the presupuestoArmario couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/presupuesto-armarios")
    @Timed
    public ResponseEntity<PresupuestoArmario> updatePresupuestoArmario(@RequestBody PresupuestoArmario presupuestoArmario) throws URISyntaxException {
        log.debug("REST request to update PresupuestoArmario : {}", presupuestoArmario);
        if (presupuestoArmario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PresupuestoArmario result = presupuestoArmarioRepository.save(presupuestoArmario);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, presupuestoArmario.getId().toString()))
            .body(result);
    }

    /**
     * GET  /presupuesto-armarios : get all the presupuestoArmarios.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of presupuestoArmarios in body
     */
    @GetMapping("/presupuesto-armarios")
    @Timed
    public ResponseEntity<List<PresupuestoArmario>> getAllPresupuestoArmarios(Pageable pageable) {
        log.debug("REST request to get a page of PresupuestoArmarios");
        Page<PresupuestoArmario> page = presupuestoArmarioRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/presupuesto-armarios");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    
    
    /**
     * GET  /presupuesto-armarios : get all the presupuestoArmarios.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of presupuestoArmarios in body
     */
    @GetMapping("/presupuesto-armarios-busqueda/{id}")
    @Timed
    public ResponseEntity<Collection<PresupuestoArmario>> getAllPresupuestoArmariosBus(@PathVariable Long id) {
        log.debug("REST request to get a page of PresupuestoArmarios");
        Collection<PresupuestoArmario> page = presupuestoArmarioRepository.findByPresupuestoArmario(id);
        return ResponseEntity.ok().body(page);
    }
    
    

    /**
     * GET  /presupuesto-armarios/:id : get the "id" presupuestoArmario.
     *
     * @param id the id of the presupuestoArmario to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the presupuestoArmario, or with status 404 (Not Found)
     */
    @GetMapping("/presupuesto-armarios/{id}")
    @Timed
    public ResponseEntity<PresupuestoArmario> getPresupuestoArmario(@PathVariable Long id) {
        log.debug("REST request to get PresupuestoArmario : {}", id);
        Optional<PresupuestoArmario> presupuestoArmario = presupuestoArmarioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(presupuestoArmario);
    }

    /**
     * DELETE  /presupuesto-armarios/:id : delete the "id" presupuestoArmario.
     *
     * @param id the id of the presupuestoArmario to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/presupuesto-armarios/{id}")
    @Timed
    public ResponseEntity<Void> deletePresupuestoArmario(@PathVariable Long id) {
        log.debug("REST request to delete PresupuestoArmario : {}", id);

        presupuestoArmarioRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
