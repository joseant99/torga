package com.torga.pedidos.service;

import com.torga.pedidos.service.dto.ProductosDormitorioDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing ProductosDormitorio.
 */
public interface ProductosDormitorioService {

    /**
     * Save a productosDormitorio.
     *
     * @param productosDormitorioDTO the entity to save
     * @return the persisted entity
     */
    ProductosDormitorioDTO save(ProductosDormitorioDTO productosDormitorioDTO);

    /**
     * Get all the productosDormitorios.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ProductosDormitorioDTO> findAll(Pageable pageable);


    /**
     * Get the "id" productosDormitorio.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ProductosDormitorioDTO> findOne(Long id);


    /**
     * Delete the "id" productosDormitorio.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
