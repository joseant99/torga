package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.DatosCliente;
import com.torga.pedidos.repository.DatosClienteRepository;
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
 * REST controller for managing DatosCliente.
 */
@RestController
@RequestMapping("/api")
public class DatosClienteResource {

    private final Logger log = LoggerFactory.getLogger(DatosClienteResource.class);

    private static final String ENTITY_NAME = "datosCliente";

    private final DatosClienteRepository datosClienteRepository;

    public DatosClienteResource(DatosClienteRepository datosClienteRepository) {
        this.datosClienteRepository = datosClienteRepository;
    }

    /**
     * POST  /datos-clientes : Create a new datosCliente.
     *
     * @param datosCliente the datosCliente to create
     * @return the ResponseEntity with status 201 (Created) and with body the new datosCliente, or with status 400 (Bad Request) if the datosCliente has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/datos-clientes")
    @Timed
    public ResponseEntity<DatosCliente> createDatosCliente(@RequestBody DatosCliente datosCliente) throws URISyntaxException {
        log.debug("REST request to save DatosCliente : {}", datosCliente);
        if (datosCliente.getId() != null) {
            throw new BadRequestAlertException("A new datosCliente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DatosCliente result = datosClienteRepository.save(datosCliente);
        return ResponseEntity.created(new URI("/api/datos-clientes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /datos-clientes : Updates an existing datosCliente.
     *
     * @param datosCliente the datosCliente to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated datosCliente,
     * or with status 400 (Bad Request) if the datosCliente is not valid,
     * or with status 500 (Internal Server Error) if the datosCliente couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/datos-clientes")
    @Timed
    public ResponseEntity<DatosCliente> updateDatosCliente(@RequestBody DatosCliente datosCliente) throws URISyntaxException {
        log.debug("REST request to update DatosCliente : {}", datosCliente);
        if (datosCliente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DatosCliente result = datosClienteRepository.save(datosCliente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, datosCliente.getId().toString()))
            .body(result);
    }

    /**
     * GET  /datos-clientes : get all the datosClientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of datosClientes in body
     */
    @GetMapping("/datos-clientes")
    @Timed
    public ResponseEntity<List<DatosCliente>> getAllDatosClientes(Pageable pageable) {
        log.debug("REST request to get a page of DatosClientes");
        Page<DatosCliente> page = datosClienteRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/datos-clientes");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /datos-clientes/:id : get the "id" datosCliente.
     *
     * @param id the id of the datosCliente to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the datosCliente, or with status 404 (Not Found)
     */
    @GetMapping("/datos-clientes/{id}")
    @Timed
    public ResponseEntity<DatosCliente> getDatosCliente(@PathVariable Long id) {
        log.debug("REST request to get DatosCliente : {}", id);
        Optional<DatosCliente> datosCliente = datosClienteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(datosCliente);
    }

    /**
     * DELETE  /datos-clientes/:id : delete the "id" datosCliente.
     *
     * @param id the id of the datosCliente to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/datos-clientes/{id}")
    @Timed
    public ResponseEntity<Void> deleteDatosCliente(@PathVariable Long id) {
        log.debug("REST request to delete DatosCliente : {}", id);

        datosClienteRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
