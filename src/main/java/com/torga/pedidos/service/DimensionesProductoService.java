package com.torga.pedidos.service;

import com.torga.pedidos.service.dto.DimensionesProductoDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing DimensionesProducto.
 */
public interface DimensionesProductoService {

    /**
     * Save a dimensionesProducto.
     *
     * @param dimensionesProductoDTO the entity to save
     * @return the persisted entity
     */
    DimensionesProductoDTO save(DimensionesProductoDTO dimensionesProductoDTO);

    /**
     * Get all the dimensionesProductos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<DimensionesProductoDTO> findAll(Pageable pageable);


    /**
     * Get the "id" dimensionesProducto.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<DimensionesProductoDTO> findOne(Long id);

    /**
     * Delete the "id" dimensionesProducto.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
