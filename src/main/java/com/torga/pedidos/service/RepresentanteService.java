package com.torga.pedidos.service;

import com.torga.pedidos.domain.Cliente;
import com.torga.pedidos.domain.Representante;
import com.torga.pedidos.repository.RepresentanteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Representante.
 */
@Service
@Transactional
public class RepresentanteService {

    private final Logger log = LoggerFactory.getLogger(RepresentanteService.class);

    private final RepresentanteRepository representanteRepository;

    public RepresentanteService(RepresentanteRepository representanteRepository) {
        this.representanteRepository = representanteRepository;
    }
    
    @Transactional(readOnly = true)
    public Representante getRepresentanteNombre(String usuario) {
     log.debug("Request to search by user : {}", usuario);
       return representanteRepository.findOneByNombre(usuario);
    }
    
    
    @Transactional(readOnly = true)
    public Representante getRepresentanteUsuario(String usuario) {
     log.debug("Request to search by user : {}", usuario);
       return representanteRepository.findOneByUsuario(usuario);
    }
    
    /**
     * Save a representante.
     *
     * @param representante the entity to save
     * @return the persisted entity
     */
    public Representante save(Representante representante) {
        log.debug("Request to save Representante : {}", representante);
        return representanteRepository.save(representante);
    }

    /**
     * Get all the representantes.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Representante> findAll() {
        log.debug("Request to get all Representantes");
        return representanteRepository.findAll();
    }


    /**
     * Get one representante by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Representante> findOne(Long id) {
        log.debug("Request to get Representante : {}", id);
        return representanteRepository.findById(id);
    }

    /**
     * Delete the representante by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Representante : {}", id);
        representanteRepository.deleteById(id);
    }
}
