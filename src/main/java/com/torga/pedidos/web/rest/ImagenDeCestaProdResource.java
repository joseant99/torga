package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.DatosUsuario;
import com.torga.pedidos.domain.ImagenDeCestaProd;
import com.torga.pedidos.repository.ImagenDeCestaProdRepository;
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
 * REST controller for managing ImagenDeCestaProd.
 */
@RestController
@RequestMapping("/api")
public class ImagenDeCestaProdResource {

    private final Logger log = LoggerFactory.getLogger(ImagenDeCestaProdResource.class);

    private static final String ENTITY_NAME = "imagenDeCestaProd";

    private final ImagenDeCestaProdRepository imagenDeCestaProdRepository;

    public ImagenDeCestaProdResource(ImagenDeCestaProdRepository imagenDeCestaProdRepository) {
        this.imagenDeCestaProdRepository = imagenDeCestaProdRepository;
    }

    /**
     * POST  /imagen-de-cesta-prods : Create a new imagenDeCestaProd.
     *
     * @param imagenDeCestaProd the imagenDeCestaProd to create
     * @return the ResponseEntity with status 201 (Created) and with body the new imagenDeCestaProd, or with status 400 (Bad Request) if the imagenDeCestaProd has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/imagen-de-cesta-prods")
    @Timed
    public ResponseEntity<ImagenDeCestaProd> createImagenDeCestaProd(@RequestBody ImagenDeCestaProd imagenDeCestaProd) throws URISyntaxException {
        log.debug("REST request to save ImagenDeCestaProd : {}", imagenDeCestaProd);
        if (imagenDeCestaProd.getId() != null) {
            throw new BadRequestAlertException("A new imagenDeCestaProd cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ImagenDeCestaProd result = imagenDeCestaProdRepository.save(imagenDeCestaProd);
        return ResponseEntity.created(new URI("/api/imagen-de-cesta-prods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /imagen-de-cesta-prods : Updates an existing imagenDeCestaProd.
     *
     * @param imagenDeCestaProd the imagenDeCestaProd to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated imagenDeCestaProd,
     * or with status 400 (Bad Request) if the imagenDeCestaProd is not valid,
     * or with status 500 (Internal Server Error) if the imagenDeCestaProd couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/imagen-de-cesta-prods")
    @Timed
    public ResponseEntity<ImagenDeCestaProd> updateImagenDeCestaProd(@RequestBody ImagenDeCestaProd imagenDeCestaProd) throws URISyntaxException {
        log.debug("REST request to update ImagenDeCestaProd : {}", imagenDeCestaProd);
        if (imagenDeCestaProd.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ImagenDeCestaProd result = imagenDeCestaProdRepository.save(imagenDeCestaProd);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, imagenDeCestaProd.getId().toString()))
            .body(result);
    }

    /**
     * GET  /imagen-de-cesta-prods : get all the imagenDeCestaProds.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of imagenDeCestaProds in body
     */
    @GetMapping("/imagen-de-cesta-prods")
    @Timed
    public ResponseEntity<List<ImagenDeCestaProd>> getAllImagenDeCestaProds(Pageable pageable) {
        log.debug("REST request to get a page of ImagenDeCestaProds");
        Page<ImagenDeCestaProd> page = imagenDeCestaProdRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/imagen-de-cesta-prods");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    @GetMapping("/imagen-de-cesta-prods-id/{id}")
    @Timed
    public ResponseEntity<Collection<ImagenDeCestaProd>> getAllImagenDeCestaProdsId(@PathVariable String id) {
        log.debug("REST request to get a page of DatosUsuarios");
        Collection<ImagenDeCestaProd> page = imagenDeCestaProdRepository.buscandoNombre(id);
        return ResponseEntity.ok().body(page);
    }

    /**
     * GET  /imagen-de-cesta-prods/:id : get the "id" imagenDeCestaProd.
     *
     * @param id the id of the imagenDeCestaProd to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the imagenDeCestaProd, or with status 404 (Not Found)
     */
    @GetMapping("/imagen-de-cesta-prods/{id}")
    @Timed
    public ResponseEntity<ImagenDeCestaProd> getImagenDeCestaProd(@PathVariable Long id) {
        log.debug("REST request to get ImagenDeCestaProd : {}", id);
        Optional<ImagenDeCestaProd> imagenDeCestaProd = imagenDeCestaProdRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(imagenDeCestaProd);
    }

    /**
     * DELETE  /imagen-de-cesta-prods/:id : delete the "id" imagenDeCestaProd.
     *
     * @param id the id of the imagenDeCestaProd to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/imagen-de-cesta-prods/{id}")
    @Timed
    public ResponseEntity<Void> deleteImagenDeCestaProd(@PathVariable Long id) {
        log.debug("REST request to delete ImagenDeCestaProd : {}", id);

        imagenDeCestaProdRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
