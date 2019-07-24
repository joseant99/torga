package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Transportistas;
import com.torga.pedidos.security.AuthoritiesConstants;
import com.torga.pedidos.service.TransportistasService;
import com.torga.pedidos.service.UserService;
import com.torga.pedidos.web.rest.errors.BadRequestAlertException;
import com.torga.pedidos.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Transportistas.
 */
@RestController
@RequestMapping("/api")
public class TransportistasResource {

    private final Logger log = LoggerFactory.getLogger(TransportistasResource.class);

    private static final String ENTITY_NAME = "transportistas";
    
    @Autowired
    private UserService userService;

    private final TransportistasService transportistasService;

    public TransportistasResource(TransportistasService transportistasService) {
        this.transportistasService = transportistasService;
    }

    /**
     * POST  /transportistas : Create a new transportistas.
     *
     * @param transportistas the transportistas to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transportistas, or with status 400 (Bad Request) if the transportistas has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transportistas")
    @Timed
    public ResponseEntity<Transportistas> createTransportistas(@Valid @RequestBody Transportistas transportistas) throws URISyntaxException {
        log.debug("REST request to save Transportistas : {}", transportistas);
        if (transportistas.getId() != null) {
            throw new BadRequestAlertException("A new transportistas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Transportistas result = transportistasService.save(transportistas);
        return ResponseEntity.created(new URI("/api/transportistas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transportistas : Updates an existing transportistas.
     *
     * @param transportistas the transportistas to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transportistas,
     * or with status 400 (Bad Request) if the transportistas is not valid,
     * or with status 500 (Internal Server Error) if the transportistas couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transportistas")
    @Timed
    public ResponseEntity<Transportistas> updateTransportistas(@Valid @RequestBody Transportistas transportistas) throws URISyntaxException {
        log.debug("REST request to update Transportistas : {}", transportistas);
        if (transportistas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Transportistas result = transportistasService.save(transportistas);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transportistas.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transportistas : get all the transportistas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of transportistas in body
     */
    @GetMapping("/transportistas")
    @Timed
    public List<Transportistas> getAllTransportistas() {
        log.debug("REST request to get all Transportistas");
        return transportistasService.findAll();
    }

    /**
     * GET  /transportistas/:id : get the "id" transportistas.
     *
     * @param id the id of the transportistas to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transportistas, or with status 404 (Not Found)
     */
    @GetMapping("/transportistas/{id}")
    @Timed
    public ResponseEntity<Transportistas> getTransportistas(@PathVariable Long id) {
        log.debug("REST request to get Transportistas : {}", id);
        Optional<Transportistas> transportistas = transportistasService.findOne(id);
        return ResponseUtil.wrapOrNotFound(transportistas);
    }

    /**
     * DELETE  /transportistas/:id : delete the "id" transportistas.
     *
     * @param id the id of the transportistas to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transportistas/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransportistas(@PathVariable Long id) {
        log.debug("REST request to delete Transportistas : {}", id);
        transportistasService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    @RequestMapping(value="/names", method=RequestMethod.GET)
    public @ResponseBody Class<? extends String> getProvidersNames() {
        return ENTITY_NAME.getClass();
    }
}
