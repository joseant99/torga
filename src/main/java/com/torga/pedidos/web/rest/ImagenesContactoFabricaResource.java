package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.ImagenesContactoFabrica;
import com.torga.pedidos.repository.ImagenesContactoFabricaRepository;
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
 * REST controller for managing ImagenesContactoFabrica.
 */
@RestController
@RequestMapping("/api")
public class ImagenesContactoFabricaResource {

    private final Logger log = LoggerFactory.getLogger(ImagenesContactoFabricaResource.class);

    private static final String ENTITY_NAME = "imagenesContactoFabrica";

    private final ImagenesContactoFabricaRepository imagenesContactoFabricaRepository;

    public ImagenesContactoFabricaResource(ImagenesContactoFabricaRepository imagenesContactoFabricaRepository) {
        this.imagenesContactoFabricaRepository = imagenesContactoFabricaRepository;
    }

    /**
     * POST  /imagenes-contacto-fabricas : Create a new imagenesContactoFabrica.
     *
     * @param imagenesContactoFabrica the imagenesContactoFabrica to create
     * @return the ResponseEntity with status 201 (Created) and with body the new imagenesContactoFabrica, or with status 400 (Bad Request) if the imagenesContactoFabrica has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/imagenes-contacto-fabricas")
    @Timed
    public ResponseEntity<ImagenesContactoFabrica> createImagenesContactoFabrica(@RequestBody ImagenesContactoFabrica imagenesContactoFabrica) throws URISyntaxException {
        log.debug("REST request to save ImagenesContactoFabrica : {}", imagenesContactoFabrica);
        if (imagenesContactoFabrica.getId() != null) {
            throw new BadRequestAlertException("A new imagenesContactoFabrica cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ImagenesContactoFabrica result = imagenesContactoFabricaRepository.save(imagenesContactoFabrica);
        return ResponseEntity.created(new URI("/api/imagenes-contacto-fabricas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /imagenes-contacto-fabricas : Updates an existing imagenesContactoFabrica.
     *
     * @param imagenesContactoFabrica the imagenesContactoFabrica to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated imagenesContactoFabrica,
     * or with status 400 (Bad Request) if the imagenesContactoFabrica is not valid,
     * or with status 500 (Internal Server Error) if the imagenesContactoFabrica couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/imagenes-contacto-fabricas")
    @Timed
    public ResponseEntity<ImagenesContactoFabrica> updateImagenesContactoFabrica(@RequestBody ImagenesContactoFabrica imagenesContactoFabrica) throws URISyntaxException {
        log.debug("REST request to update ImagenesContactoFabrica : {}", imagenesContactoFabrica);
        if (imagenesContactoFabrica.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ImagenesContactoFabrica result = imagenesContactoFabricaRepository.save(imagenesContactoFabrica);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, imagenesContactoFabrica.getId().toString()))
            .body(result);
    }

    /**
     * GET  /imagenes-contacto-fabricas : get all the imagenesContactoFabricas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of imagenesContactoFabricas in body
     */
    @GetMapping("/imagenes-contacto-fabricas")
    @Timed
    public ResponseEntity<List<ImagenesContactoFabrica>> getAllImagenesContactoFabricas(Pageable pageable) {
        log.debug("REST request to get a page of ImagenesContactoFabricas");
        Page<ImagenesContactoFabrica> page = imagenesContactoFabricaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/imagenes-contacto-fabricas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /imagenes-contacto-fabricas/:id : get the "id" imagenesContactoFabrica.
     *
     * @param id the id of the imagenesContactoFabrica to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the imagenesContactoFabrica, or with status 404 (Not Found)
     */
    @GetMapping("/imagenes-contacto-fabricas/{id}")
    @Timed
    public ResponseEntity<ImagenesContactoFabrica> getImagenesContactoFabrica(@PathVariable Long id) {
        log.debug("REST request to get ImagenesContactoFabrica : {}", id);
        Optional<ImagenesContactoFabrica> imagenesContactoFabrica = imagenesContactoFabricaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(imagenesContactoFabrica);
    }

    /**
     * DELETE  /imagenes-contacto-fabricas/:id : delete the "id" imagenesContactoFabrica.
     *
     * @param id the id of the imagenesContactoFabrica to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/imagenes-contacto-fabricas/{id}")
    @Timed
    public ResponseEntity<Void> deleteImagenesContactoFabrica(@PathVariable Long id) {
        log.debug("REST request to delete ImagenesContactoFabrica : {}", id);

        imagenesContactoFabricaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
