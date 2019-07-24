package com.torga.pedidos.service;

import com.torga.pedidos.domain.Cliente;
import com.torga.pedidos.repository.ClienteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Cliente.
 */
@Service
@Transactional
public class ClienteService {

    private final Logger log = LoggerFactory.getLogger(ClienteService.class);

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Transactional(readOnly = true)
    public List<Cliente> getListClienteRepresentanteId(Long id) {
     log.debug("Request to search by RepresentanteId : {}", id);
       return clienteRepository.findAllByRepresentatesId(id);
    }
    
    @Transactional(readOnly = true)
    public Cliente getClientecodCliente(String getClientecodCliente) {
     log.debug("Request to search by getClientecodCliente : {}", getClientecodCliente);
       return clienteRepository.findOneBycodCliente(getClientecodCliente);
    }
    
    
    @Transactional(readOnly = true)
    public Cliente getClienteUsuario(String usuario) {
     log.debug("Request to search by user : {}", usuario);
       return clienteRepository.findOneByUsuario(usuario);
    }
    
    /**
     * Save a cliente.
     *
     * @param cliente the entity to save
     * @return the persisted entity
     */
    public Cliente save(Cliente cliente) {
        log.debug("Request to save Cliente : {}", cliente);
        return clienteRepository.save(cliente);
    }

    /**
     * Get all the clientes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Cliente> findAll(Pageable pageable) {
        log.debug("Request to get all Clientes");
        return clienteRepository.findAll(pageable);
    }


    /**
     * Get one cliente by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Cliente> findOne(Long id) {
        log.debug("Request to get Cliente : {}", id);
        return clienteRepository.findById(id);
    }

    /**
     * Delete the cliente by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Cliente : {}", id);
        clienteRepository.deleteById(id);
    }
}
