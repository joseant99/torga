package com.torga.pedidos.service;

import com.torga.pedidos.domain.Transportistas;
import com.torga.pedidos.repository.TransportistasRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Transportistas.
 */
@Service
@Transactional
public class TransportistasService {

    private final Logger log = LoggerFactory.getLogger(TransportistasService.class);

    private final TransportistasRepository transportistasRepository;

    public TransportistasService(TransportistasRepository transportistasRepository) {
        this.transportistasRepository = transportistasRepository;
    }

    
    /**
     * Get one transportistas by name.
     *
     * @param name of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Transportistas findOneByName(String transportista) {
        log.debug("Request to get Transportistas : {}", transportista);
        return transportistasRepository.findBytransportistaPedido(transportista);
    }
    /**
     * Save a transportistas.
     *
     * @param transportistas the entity to save
     * @return the persisted entity
     */
    public Transportistas save(Transportistas transportistas) {
        log.debug("Request to save Transportistas : {}", transportistas);
        return transportistasRepository.save(transportistas);
    }

    /**
     * Get all the transportistas.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Transportistas> findAll() {
        log.debug("Request to get all Transportistas");
        return transportistasRepository.findAll();
    }


    /**
     * Get one transportistas by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Transportistas> findOne(Long id) {
        log.debug("Request to get Transportistas : {}", id);
        return transportistasRepository.findById(id);
    }

    /**
     * Delete the transportistas by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Transportistas : {}", id);
        transportistasRepository.deleteById(id);
    }
}
