package com.torga.pedidos.service;

import com.torga.pedidos.domain.Logistica;
import com.torga.pedidos.repository.LogisticaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing Logistica.
 */
@Service
@Transactional
public class LogisticaService {

    private final Logger log = LoggerFactory.getLogger(LogisticaService.class);

    private final LogisticaRepository logisticaRepository;

    public LogisticaService(LogisticaRepository logisticaRepository) {
        this.logisticaRepository = logisticaRepository;
    }
    
    @Transactional(readOnly = true) 
    public Logistica findOneBynumPedido(String id) {
        log.debug("Request to get all logisticas by referenciaclientesID");
        return logisticaRepository.findOneBynumPedido(id);
    }
    
    
    /**
     *  get all the logisticas where Pedidos is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Logistica> findAllByReferenciaclientesId(Long id) {
        log.debug("Request to get all logisticas by referenciaclientesID");
        return logisticaRepository.findAllByReferenciaclientesId(id);
    }
    /**
     * Save a logistica.
     *
     * @param logistica the entity to save
     * @return the persisted entity
     */
    public Logistica save(Logistica logistica) {
        log.debug("Request to save Logistica : {}", logistica);
        return logisticaRepository.save(logistica);
    }

    /**
     * Get all the logisticas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Logistica> findAll(Pageable pageable) {
        log.debug("Request to get all Logisticas");
        return logisticaRepository.findAll(pageable);
    }



    /**
     *  get all the logisticas where Pedidos is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Logistica> findAllWherePedidosIsNull() {
        log.debug("Request to get all logisticas where Pedidos is null");
        return StreamSupport
            .stream(logisticaRepository.findAll().spliterator(), false)
            .filter(logistica -> logistica.getPedidos() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one logistica by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Logistica> findOne(Long id) {
        log.debug("Request to get Logistica : {}", id);
        return logisticaRepository.findById(id);
    }

    /**
     * Delete the logistica by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Logistica : {}", id);
        logisticaRepository.deleteById(id);
    }
}
