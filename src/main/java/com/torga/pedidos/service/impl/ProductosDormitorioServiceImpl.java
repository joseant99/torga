package com.torga.pedidos.service.impl;

import com.torga.pedidos.service.ProductosDormitorioService;
import com.torga.pedidos.domain.ProductosDormitorio;
import com.torga.pedidos.repository.ProductosDormitorioRepository;
import com.torga.pedidos.service.dto.ProductosDormitorioDTO;
import com.torga.pedidos.service.mapper.ProductosDormitorioMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing ProductosDormitorio.
 */
@Service
@Transactional
public class ProductosDormitorioServiceImpl implements ProductosDormitorioService {

    private final Logger log = LoggerFactory.getLogger(ProductosDormitorioServiceImpl.class);

    private final ProductosDormitorioRepository productosDormitorioRepository;

    private final ProductosDormitorioMapper productosDormitorioMapper;

    public ProductosDormitorioServiceImpl(ProductosDormitorioRepository productosDormitorioRepository, ProductosDormitorioMapper productosDormitorioMapper) {
        this.productosDormitorioRepository = productosDormitorioRepository;
        this.productosDormitorioMapper = productosDormitorioMapper;
    }

    /**
     * Save a productosDormitorio.
     *
     * @param productosDormitorioDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProductosDormitorioDTO save(ProductosDormitorioDTO productosDormitorioDTO) {
        log.debug("Request to save ProductosDormitorio : {}", productosDormitorioDTO);

        ProductosDormitorio productosDormitorio = productosDormitorioMapper.toEntity(productosDormitorioDTO);
        productosDormitorio = productosDormitorioRepository.save(productosDormitorio);
        return productosDormitorioMapper.toDto(productosDormitorio);
    }

    /**
     * Get all the productosDormitorios.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProductosDormitorioDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ProductosDormitorios");
        return productosDormitorioRepository.findAll(pageable)
            .map(productosDormitorioMapper::toDto);
    }


    /**
     * Get one productosDormitorio by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ProductosDormitorioDTO> findOne(Long id) {
        log.debug("Request to get ProductosDormitorio : {}", id);
        return productosDormitorioRepository.findById(id)
            .map(productosDormitorioMapper::toDto);
    }

    /**
     * Delete the productosDormitorio by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductosDormitorio : {}", id);
        productosDormitorioRepository.deleteById(id);
    }
}
