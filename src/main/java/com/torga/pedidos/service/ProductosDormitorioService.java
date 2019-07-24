package com.torga.pedidos.service;

import com.torga.pedidos.domain.Pedidos;
import com.torga.pedidos.domain.ProductosDormitorio;
import com.torga.pedidos.repository.ProductosDormitorioRepository;
import com.torga.pedidos.service.dto.ProductosDormitorioDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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
    
    /**
     * Get a list of ProductosDormitorio by referenciaclientes_id.
     *
     * @param categoriasId
     * @return the entity
     */
    static Page<ProductosDormitorio> findAllBycategoriasDormi(Long id) {
		// TODO Auto-generated method stub
		return null;
	}
}
