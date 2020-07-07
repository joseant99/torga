package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Usb;
import com.torga.pedidos.repository.UsbRepository;
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
 * REST controller for managing Usb.
 */
@RestController
@RequestMapping("/api")
public class UsbResource {

    private final Logger log = LoggerFactory.getLogger(UsbResource.class);

    private static final String ENTITY_NAME = "usb";

    private final UsbRepository usbRepository;

    public UsbResource(UsbRepository usbRepository) {
        this.usbRepository = usbRepository;
    }

    /**
     * POST  /usbs : Create a new usb.
     *
     * @param usb the usb to create
     * @return the ResponseEntity with status 201 (Created) and with body the new usb, or with status 400 (Bad Request) if the usb has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/usbs")
    @Timed
    public ResponseEntity<Usb> createUsb(@RequestBody Usb usb) throws URISyntaxException {
        log.debug("REST request to save Usb : {}", usb);
        if (usb.getId() != null) {
            throw new BadRequestAlertException("A new usb cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Usb result = usbRepository.save(usb);
        return ResponseEntity.created(new URI("/api/usbs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /usbs : Updates an existing usb.
     *
     * @param usb the usb to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated usb,
     * or with status 400 (Bad Request) if the usb is not valid,
     * or with status 500 (Internal Server Error) if the usb couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/usbs")
    @Timed
    public ResponseEntity<Usb> updateUsb(@RequestBody Usb usb) throws URISyntaxException {
        log.debug("REST request to update Usb : {}", usb);
        if (usb.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Usb result = usbRepository.save(usb);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, usb.getId().toString()))
            .body(result);
    }

    /**
     * GET  /usbs : get all the usbs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of usbs in body
     */
    @GetMapping("/usbs")
    @Timed
    public ResponseEntity<List<Usb>> getAllUsbs(Pageable pageable) {
        log.debug("REST request to get a page of Usbs");
        Page<Usb> page = usbRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/usbs");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /usbs/:id : get the "id" usb.
     *
     * @param id the id of the usb to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the usb, or with status 404 (Not Found)
     */
    @GetMapping("/usbs/{id}")
    @Timed
    public ResponseEntity<Usb> getUsb(@PathVariable Long id) {
        log.debug("REST request to get Usb : {}", id);
        Optional<Usb> usb = usbRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(usb);
    }

    /**
     * DELETE  /usbs/:id : delete the "id" usb.
     *
     * @param id the id of the usb to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/usbs/{id}")
    @Timed
    public ResponseEntity<Void> deleteUsb(@PathVariable Long id) {
        log.debug("REST request to delete Usb : {}", id);

        usbRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
