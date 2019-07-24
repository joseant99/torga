package com.torga.pedidos.service;

import com.torga.pedidos.service.dto.CategoriasDormiDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing CategoriasDormi.
 */
public interface CategoriasDormiService {

    /**
     * Save a categoriasDormi.
     *
     * @param categoriasDormiDTO the entity to save
     * @return the persisted entity
     */
    CategoriasDormiDTO save(CategoriasDormiDTO categoriasDormiDTO);

    /**
     * Get all the categoriasDormis.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CategoriasDormiDTO> findAll(Pageable pageable);


    /**
     * Get the "id" categoriasDormi.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CategoriasDormiDTO> findOne(Long id);

    /**
     * Delete the "id" categoriasDormi.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
