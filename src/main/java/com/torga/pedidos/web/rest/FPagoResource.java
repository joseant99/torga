package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.FPago;
import com.torga.pedidos.repository.FPagoRepository;
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
 * REST controller for managing FPago.
 */
@RestController
@RequestMapping("/api")
public class FPagoResource {

    private final Logger log = LoggerFactory.getLogger(FPagoResource.class);

    private static final String ENTITY_NAME = "fPago";

    private final FPagoRepository fPagoRepository;

    public FPagoResource(FPagoRepository fPagoRepository) {
        this.fPagoRepository = fPagoRepository;
    }

    /**
     * POST  /f-pagos : Create a new fPago.
     *
     * @param fPago the fPago to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fPago, or with status 400 (Bad Request) if the fPago has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/f-pagos")
    @Timed
    public ResponseEntity<FPago> createFPago(@RequestBody FPago fPago) throws URISyntaxException {
        log.debug("REST request to save FPago : {}", fPago);
        if (fPago.getId() != null) {
            throw new BadRequestAlertException("A new fPago cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FPago result = fPagoRepository.save(fPago);
        return ResponseEntity.created(new URI("/api/f-pagos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /f-pagos : Updates an existing fPago.
     *
     * @param fPago the fPago to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fPago,
     * or with status 400 (Bad Request) if the fPago is not valid,
     * or with status 500 (Internal Server Error) if the fPago couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/f-pagos")
    @Timed
    public ResponseEntity<FPago> updateFPago(@RequestBody FPago fPago) throws URISyntaxException {
        log.debug("REST request to update FPago : {}", fPago);
        if (fPago.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FPago result = fPagoRepository.save(fPago);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fPago.getId().toString()))
            .body(result);
    }

    /**
     * GET  /f-pagos : get all the fPagos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of fPagos in body
     */
    @GetMapping("/f-pagos")
    @Timed
    public ResponseEntity<List<FPago>> getAllFPagos(Pageable pageable) {
        log.debug("REST request to get a page of FPagos");
        Page<FPago> page = fPagoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/f-pagos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /f-pagos/:id : get the "id" fPago.
     *
     * @param id the id of the fPago to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fPago, or with status 404 (Not Found)
     */
    @GetMapping("/f-pagos/{id}")
    @Timed
    public ResponseEntity<FPago> getFPago(@PathVariable Long id) {
        log.debug("REST request to get FPago : {}", id);
        Optional<FPago> fPago = fPagoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fPago);
    }

    /**
     * DELETE  /f-pagos/:id : delete the "id" fPago.
     *
     * @param id the id of the fPago to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/f-pagos/{id}")
    @Timed
    public ResponseEntity<Void> deleteFPago(@PathVariable Long id) {
        log.debug("REST request to delete FPago : {}", id);

        fPagoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
