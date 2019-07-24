package com.torga.pedidos.service.impl;

import com.torga.pedidos.service.CategoriasDormiService;
import com.torga.pedidos.domain.CategoriasDormi;
import com.torga.pedidos.repository.CategoriasDormiRepository;
import com.torga.pedidos.service.dto.CategoriasDormiDTO;
import com.torga.pedidos.service.mapper.CategoriasDormiMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing CategoriasDormi.
 */
@Service
@Transactional
public class CategoriasDormiServiceImpl implements CategoriasDormiService {

    private final Logger log = LoggerFactory.getLogger(CategoriasDormiServiceImpl.class);

    private final CategoriasDormiRepository categoriasDormiRepository;

    private final CategoriasDormiMapper categoriasDormiMapper;

    public CategoriasDormiServiceImpl(CategoriasDormiRepository categoriasDormiRepository, CategoriasDormiMapper categoriasDormiMapper) {
        this.categoriasDormiRepository = categoriasDormiRepository;
        this.categoriasDormiMapper = categoriasDormiMapper;
    }

    /**
     * Save a categoriasDormi.
     *
     * @param categoriasDormiDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CategoriasDormiDTO save(CategoriasDormiDTO categoriasDormiDTO) {
        log.debug("Request to save CategoriasDormi : {}", categoriasDormiDTO);

        CategoriasDormi categoriasDormi = categoriasDormiMapper.toEntity(categoriasDormiDTO);
        categoriasDormi = categoriasDormiRepository.save(categoriasDormi);
        return categoriasDormiMapper.toDto(categoriasDormi);
    }

    /**
     * Get all the categoriasDormis.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CategoriasDormiDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CategoriasDormis");
        return categoriasDormiRepository.findAll(pageable)
            .map(categoriasDormiMapper::toDto);
    }


    /**
     * Get one categoriasDormi by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CategoriasDormiDTO> findOne(Long id) {
        log.debug("Request to get CategoriasDormi : {}", id);
        return categoriasDormiRepository.findById(id)
            .map(categoriasDormiMapper::toDto);
    }

    /**
     * Delete the categoriasDormi by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CategoriasDormi : {}", id);
        categoriasDormiRepository.deleteById(id);
    }
}
