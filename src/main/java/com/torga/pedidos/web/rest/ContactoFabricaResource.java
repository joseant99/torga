package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.ContactoFabrica;
import com.torga.pedidos.repository.ContactoFabricaRepository;
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
 * REST controller for managing ContactoFabrica.
 */
@RestController
@RequestMapping("/api")
public class ContactoFabricaResource {

    private final Logger log = LoggerFactory.getLogger(ContactoFabricaResource.class);

    private static final String ENTITY_NAME = "contactoFabrica";

    private final ContactoFabricaRepository contactoFabricaRepository;

    public ContactoFabricaResource(ContactoFabricaRepository contactoFabricaRepository) {
        this.contactoFabricaRepository = contactoFabricaRepository;
    }

    /**
     * POST  /contacto-fabricas : Create a new contactoFabrica.
     *
     * @param contactoFabrica the contactoFabrica to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contactoFabrica, or with status 400 (Bad Request) if the contactoFabrica has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contacto-fabricas")
    @Timed
    public ResponseEntity<ContactoFabrica> createContactoFabrica(@RequestBody ContactoFabrica contactoFabrica) throws URISyntaxException {
        log.debug("REST request to save ContactoFabrica : {}", contactoFabrica);
        if (contactoFabrica.getId() != null) {
            throw new BadRequestAlertException("A new contactoFabrica cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContactoFabrica result = contactoFabricaRepository.save(contactoFabrica);
        return ResponseEntity.created(new URI("/api/contacto-fabricas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contacto-fabricas : Updates an existing contactoFabrica.
     *
     * @param contactoFabrica the contactoFabrica to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contactoFabrica,
     * or with status 400 (Bad Request) if the contactoFabrica is not valid,
     * or with status 500 (Internal Server Error) if the contactoFabrica couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contacto-fabricas")
    @Timed
    public ResponseEntity<ContactoFabrica> updateContactoFabrica(@RequestBody ContactoFabrica contactoFabrica) throws URISyntaxException {
        log.debug("REST request to update ContactoFabrica : {}", contactoFabrica);
        if (contactoFabrica.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ContactoFabrica result = contactoFabricaRepository.save(contactoFabrica);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contactoFabrica.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contacto-fabricas : get all the contactoFabricas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of contactoFabricas in body
     */
    @GetMapping("/contacto-fabricas")
    @Timed
    public ResponseEntity<List<ContactoFabrica>> getAllContactoFabricas(Pageable pageable) {
        log.debug("REST request to get a page of ContactoFabricas");
        Page<ContactoFabrica> page = contactoFabricaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/contacto-fabricas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /contacto-fabricas/:id : get the "id" contactoFabrica.
     *
     * @param id the id of the contactoFabrica to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contactoFabrica, or with status 404 (Not Found)
     */
    @GetMapping("/contacto-fabricas/{id}")
    @Timed
    public ResponseEntity<ContactoFabrica> getContactoFabrica(@PathVariable Long id) {
        log.debug("REST request to get ContactoFabrica : {}", id);
        Optional<ContactoFabrica> contactoFabrica = contactoFabricaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contactoFabrica);
    }

    /**
     * DELETE  /contacto-fabricas/:id : delete the "id" contactoFabrica.
     *
     * @param id the id of the contactoFabrica to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contacto-fabricas/{id}")
    @Timed
    public ResponseEntity<Void> deleteContactoFabrica(@PathVariable Long id) {
        log.debug("REST request to delete ContactoFabrica : {}", id);

        contactoFabricaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
