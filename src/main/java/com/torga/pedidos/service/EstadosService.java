package com.torga.pedidos.service;

import com.torga.pedidos.domain.Estados;
import com.torga.pedidos.repository.EstadosRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Estados.
 */
@Service
@Transactional
public class EstadosService {

    private final Logger log = LoggerFactory.getLogger(EstadosService.class);

    private final EstadosRepository estadosRepository;

    public EstadosService(EstadosRepository estadosRepository) {
        this.estadosRepository = estadosRepository;
    }

    
    /**
    * Get one estados by name.
    *
    * @param name  of the entity
    * @return the entity
    */
   @Transactional(readOnly = true)
   public Estados findOneByName(String id) {
       log.debug("Request to get Estados : {}", id);
       return estadosRepository.findByestadoPedido(id);
   }
    /**
     * Save a estados.
     *
     * @param estados the entity to save
     * @return the persisted entity
     */
    public Estados save(Estados estados) {
        log.debug("Request to save Estados : {}", estados);
        return estadosRepository.save(estados);
    }

    /**
     * Get all the estados.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Estados> findAll() {
        log.debug("Request to get all Estados");
        return estadosRepository.findAll();
    }


    /**
     * Get one estados by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Estados> findOne(Long id) {
        log.debug("Request to get Estados : {}", id);
        return estadosRepository.findById(id);
    }

    /**
     * Delete the estados by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Estados : {}", id);
        estadosRepository.deleteById(id);
    }
}
