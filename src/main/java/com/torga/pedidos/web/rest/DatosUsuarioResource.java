package com.torga.pedidos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.torga.pedidos.domain.DatosUsuario;
import com.torga.pedidos.repository.DatosUsuarioRepository;
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
 * REST controller for managing DatosUsuario.
 */
@RestController
@RequestMapping("/api")
public class DatosUsuarioResource {

    private final Logger log = LoggerFactory.getLogger(DatosUsuarioResource.class);

    private static final String ENTITY_NAME = "datosUsuario";

    private final DatosUsuarioRepository datosUsuarioRepository;

    public DatosUsuarioResource(DatosUsuarioRepository datosUsuarioRepository) {
        this.datosUsuarioRepository = datosUsuarioRepository;
    }

    /**
     * POST  /datos-usuarios : Create a new datosUsuario.
     *
     * @param datosUsuario the datosUsuario to create
     * @return the ResponseEntity with status 201 (Created) and with body the new datosUsuario, or with status 400 (Bad Request) if the datosUsuario has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/datos-usuarios")
    @Timed
    public ResponseEntity<DatosUsuario> createDatosUsuario(@RequestBody DatosUsuario datosUsuario) throws URISyntaxException {
        log.debug("REST request to save DatosUsuario : {}", datosUsuario);
        if (datosUsuario.getId() != null) {
            throw new BadRequestAlertException("A new datosUsuario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DatosUsuario result = datosUsuarioRepository.save(datosUsuario);
        return ResponseEntity.created(new URI("/api/datos-usuarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /datos-usuarios : Updates an existing datosUsuario.
     *
     * @param datosUsuario the datosUsuario to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated datosUsuario,
     * or with status 400 (Bad Request) if the datosUsuario is not valid,
     * or with status 500 (Internal Server Error) if the datosUsuario couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/datos-usuarios")
    @Timed
    public ResponseEntity<DatosUsuario> updateDatosUsuario(@RequestBody DatosUsuario datosUsuario) throws URISyntaxException {
        log.debug("REST request to update DatosUsuario : {}", datosUsuario);
        if (datosUsuario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DatosUsuario result = datosUsuarioRepository.save(datosUsuario);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, datosUsuario.getId().toString()))
            .body(result);
    }

    /**
     * GET  /datos-usuarios : get all the datosUsuarios.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of datosUsuarios in body
     */
    @GetMapping("/datos-usuarios")
    @Timed
    public ResponseEntity<List<DatosUsuario>> getAllDatosUsuarios(Pageable pageable) {
        log.debug("REST request to get a page of DatosUsuarios");
        Page<DatosUsuario> page = datosUsuarioRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/datos-usuarios");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    /**
     * GET  /datos-usuarios : get all the datosUsuarios.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of datosUsuarios in body
     */
    @GetMapping("/datos-usuarios-busquing/{id}")
    @Timed
    public ResponseEntity<Collection<DatosUsuario>> getAllDatosUsuarios13(@PathVariable Long id) {
        Collection<DatosUsuario> page = datosUsuarioRepository.busquing1(id);
        return ResponseEntity.ok().body(page);
    }

    /**
     * GET  /datos-usuarios/:id : get the "id" datosUsuario.
     *
     * @param id the id of the datosUsuario to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the datosUsuario, or with status 404 (Not Found)
     */
    @GetMapping("/datos-usuarios/{id}")
    @Timed
    public ResponseEntity<DatosUsuario> getDatosUsuario(@PathVariable Long id) {
        log.debug("REST request to get DatosUsuario : {}", id);
        Optional<DatosUsuario> datosUsuario = datosUsuarioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(datosUsuario);
    }
    
    @GetMapping("/datos-usuarios-id/{id}")
    @Timed
    public ResponseEntity<List<DatosUsuario>> getAllDatosUsuariosId(@PathVariable Long id) {
        log.debug("REST request to get a page of DatosUsuarios");
        List<DatosUsuario> page = datosUsuarioRepository.findByUserIsCurrentUser();
        return ResponseEntity.ok().body(page);
    }
    
    @GetMapping("/datos-usuarios-id12/{id}")
    @Timed
    public ResponseEntity<Collection<DatosUsuario>> getAllDatosUsuariosId12(@PathVariable Long id) {
        Collection<DatosUsuario> page = datosUsuarioRepository.busquing12(id);
        return ResponseEntity.ok().body(page);
    }
    
    @GetMapping("/datos-usuarios-reprebus12/{id}")
    @Timed
    public ResponseEntity<Collection<DatosUsuario>> getAllDatosUsuariosIdreprebus12(@PathVariable Long id) {
        Collection<DatosUsuario> page = datosUsuarioRepository.busquingRepre(id);
        return ResponseEntity.ok().body(page);
    }
    
    @GetMapping("/datos-usuarios-id99/{nombre}")
    @Timed
    public ResponseEntity<Collection<DatosUsuario>> getAllDatosUsuariosId99(@PathVariable String nombre) {
        Collection<DatosUsuario> page = datosUsuarioRepository.busquing99(nombre);
        return ResponseEntity.ok().body(page);
    }
    
    @GetMapping("/datos-usuarios-id1")
    @Timed
    public ResponseEntity<Collection<DatosUsuario>> getAllDatosUsuariosId1() {
        log.debug("REST request to get a page of DatosUsuarios");
        Collection<DatosUsuario> page = datosUsuarioRepository.busquing();
        return ResponseEntity.ok().body(page);
    }

    /**
     * DELETE  /datos-usuarios/:id : delete the "id" datosUsuario.
     *
     * @param id the id of the datosUsuario to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/datos-usuarios/{id}")
    @Timed
    public ResponseEntity<Void> deleteDatosUsuario(@PathVariable Long id) {
        log.debug("REST request to delete DatosUsuario : {}", id);

        datosUsuarioRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
