package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.Logistica;
import com.torga.pedidos.service.LogisticaService;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Logistica.
 */
@RestController
@RequestMapping("/api")
public class LogisticaResource {

    private final Logger log = LoggerFactory.getLogger(LogisticaResource.class);

    private static final String ENTITY_NAME = "logistica";

    private final LogisticaService logisticaService;

    public LogisticaResource(LogisticaService logisticaService) {
        this.logisticaService = logisticaService;
    }
    /**
     * GET  /logisticas/:referenciaclientesID : get list logistica.
     *
     * @param referenciaclientesID
     * @return the ResponseEntity with status 200 (OK) and with body the logistica, or with status 404 (Not Found)
     */
    @GetMapping("/logistica/{id}")
    @Timed
    public ResponseEntity<List<Logistica>> getLogisticaByreferenciaclientesID(@PathVariable Long id) {
        log.debug("REST request to get Logistica by referenciaclientesID: {}", id);
        List<Logistica> logistica = logisticaService.findAllByReferenciaclientesId(id);
        return ResponseEntity.ok()
                .body(logistica);
    }

    /**
     * POST  /logisticas : Create a new logistica.
     *
     * @param logistica the logistica to create
     * @return the ResponseEntity with status 201 (Created) and with body the new logistica, or with status 400 (Bad Request) if the logistica has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/logisticas")
    @Timed
    public ResponseEntity<Logistica> createLogistica(@Valid @RequestBody Logistica logistica) throws URISyntaxException {
        log.debug("REST request to save Logistica : {}", logistica);
        if (logistica.getId() != null) {
            throw new BadRequestAlertException("A new logistica cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Logistica result = logisticaService.save(logistica);
        return ResponseEntity.created(new URI("/api/logisticas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /logisticas : Updates an existing logistica.
     *
     * @param logistica the logistica to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated logistica,
     * or with status 400 (Bad Request) if the logistica is not valid,
     * or with status 500 (Internal Server Error) if the logistica couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/logisticas")
    @Timed
    public ResponseEntity<Logistica> updateLogistica(@Valid @RequestBody Logistica logistica) throws URISyntaxException {
        log.debug("REST request to update Logistica : {}", logistica);
        if (logistica.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Logistica result = logisticaService.save(logistica);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, logistica.getId().toString()))
            .body(result);
    }

    /**
     * GET  /logisticas : get all the logisticas.
     *
     * @param pageable the pagination information
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of logisticas in body
     */
    @GetMapping("/logisticas")
    @Timed
    public ResponseEntity<List<Logistica>> getAllLogisticas(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("pedidos-is-null".equals(filter)) {
            log.debug("REST request to get all Logisticas where pedidos is null");
            return new ResponseEntity<>(logisticaService.findAllWherePedidosIsNull(),
                    HttpStatus.OK);
        }
        log.debug("REST request to get a page of Logisticas");
        Page<Logistica> page = logisticaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/logisticas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /logisticas/:id : get the "id" logistica.
     *
     * @param id the id of the logistica to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the logistica, or with status 404 (Not Found)
     */
    @GetMapping("/logisticas/{id}")
    @Timed
    public ResponseEntity<Logistica> getLogistica(@PathVariable Long id) {
        log.debug("REST request to get Logistica : {}", id);
        Optional<Logistica> logistica = logisticaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(logistica);
    }

    /**
     * DELETE  /logisticas/:id : delete the "id" logistica.
     *
     * @param id the id of the logistica to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/logisticas/{id}")
    @Timed
    public ResponseEntity<Void> deleteLogistica(@PathVariable Long id) {
        log.debug("REST request to delete Logistica : {}", id);
        logisticaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
