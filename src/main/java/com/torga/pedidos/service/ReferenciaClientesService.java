package com.torga.pedidos.service;

import com.torga.pedidos.domain.Cliente;
import com.torga.pedidos.domain.ReferenciaClientes;
import com.torga.pedidos.repository.ReferenciaClientesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing ReferenciaClientes.
 */
@Service
@Transactional
public class ReferenciaClientesService {

    private final Logger log = LoggerFactory.getLogger(ReferenciaClientesService.class);

    private final ReferenciaClientesRepository referenciaClientesRepository;

    public ReferenciaClientesService(ReferenciaClientesRepository referenciaClientesRepository) {
        this.referenciaClientesRepository = referenciaClientesRepository;
    }
    
    @Transactional(readOnly = true)
    public ReferenciaClientes findByreferenciaClienteAndclienteId(String ref, Long client) {
        log.debug("Request to get ReferenciaClientes : {}", ref, client);
        return referenciaClientesRepository.findByreferenciaClienteAndClienteId(ref,  client);
    }
    
    
    /**
     * Get all the referenciaClientes by client_id.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ReferenciaClientes> findAllByClienteId(Long id) {
        log.debug("Request to get all ReferenciaClientes by client_id");
        return referenciaClientesRepository.findAllByClienteId(id);
    }
    

    /**
     * Save a referenciaClientes.
     *
     * @param referenciaClientes the entity to save
     * @return the persisted entity
     */
    public ReferenciaClientes save(ReferenciaClientes referenciaClientes) {
        log.debug("Request to save ReferenciaClientes : {}", referenciaClientes);
        return referenciaClientesRepository.save(referenciaClientes);
    }

    /**
     * Get all the referenciaClientes.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ReferenciaClientes> findAll() {
        log.debug("Request to get all ReferenciaClientes");
        return referenciaClientesRepository.findAll();
    }


    /**
     * Get one referenciaClientes by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ReferenciaClientes> findOne(Long id) {
        log.debug("Request to get ReferenciaClientes : {}", id);
        return referenciaClientesRepository.findById(id);
    }

    /**
     * Delete the referenciaClientes by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ReferenciaClientes : {}", id);
        referenciaClientesRepository.deleteById(id);
    }
}
