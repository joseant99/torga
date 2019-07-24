package com.torga.pedidos.service;

import com.torga.pedidos.domain.Pedidos;
import com.torga.pedidos.repository.PedidosRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Pedidos.
 */
@Service
@Transactional
public class PedidosService {

    private final Logger log = LoggerFactory.getLogger(PedidosService.class);

    private final PedidosRepository pedidosRepository;

    public PedidosService(PedidosRepository pedidosRepository) {
        this.pedidosRepository = pedidosRepository;
    }

    /**
     * Get a list of pedidos by referenciaclientes_id.
     *
     * @param referenciaclientes_id
     * @return the entity
     */
    @Transactional(readOnly = true)
    public List<Pedidos> findAllByReferenciaclientesID(Long id) {
        log.debug("Request to get Pedidos by referenciaclientes_id : {}", id);
        return pedidosRepository.findAllByReferenciaclientesId(id);
    }
    
    
    @Transactional(readOnly = true)
    public Pedidos findAllBynumPedido(String num_pedido) {
        log.debug("Request to get Pedidos by num_pedido : {}", num_pedido);
        return pedidosRepository.findBynumPedido(num_pedido);
    }
   
    
    
    /**
     * Save a pedidos.
     *
     * @param pedidos the entity to save
     * @return the persisted entity
     */
    public Pedidos save(Pedidos pedidos) {
        log.debug("Request to save Pedidos : {}", pedidos);
        return pedidosRepository.save(pedidos);
    }

    /**
     * Get all the pedidos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Pedidos> findAll(Pageable pageable) {
        log.debug("Request to get all Pedidos");
        return pedidosRepository.findAll(pageable);
    }


    /**
     * Get one pedidos by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Pedidos> findOne(Long id) {
        log.debug("Request to get Pedidos : {}", id);
        return pedidosRepository.findById(id);
    }

    /**
     * Delete the pedidos by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Pedidos : {}", id);
        pedidosRepository.deleteById(id);
    }
}
