package com.torga.pedidos.service.impl;

import com.torga.pedidos.service.DimensionesProductoService;
import com.torga.pedidos.domain.DimensionesProducto;
import com.torga.pedidos.repository.DimensionesProductoRepository;
import com.torga.pedidos.service.dto.DimensionesProductoDTO;
import com.torga.pedidos.service.mapper.DimensionesProductoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing DimensionesProducto.
 */
@Service
@Transactional
public class DimensionesProductoServiceImpl implements DimensionesProductoService {

    private final Logger log = LoggerFactory.getLogger(DimensionesProductoServiceImpl.class);

    private final DimensionesProductoRepository dimensionesProductoRepository;

    private final DimensionesProductoMapper dimensionesProductoMapper;

    public DimensionesProductoServiceImpl(DimensionesProductoRepository dimensionesProductoRepository, DimensionesProductoMapper dimensionesProductoMapper) {
        this.dimensionesProductoRepository = dimensionesProductoRepository;
        this.dimensionesProductoMapper = dimensionesProductoMapper;
    }

    /**
     * Save a dimensionesProducto.
     *
     * @param dimensionesProductoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DimensionesProductoDTO save(DimensionesProductoDTO dimensionesProductoDTO) {
        log.debug("Request to save DimensionesProducto : {}", dimensionesProductoDTO);

        DimensionesProducto dimensionesProducto = dimensionesProductoMapper.toEntity(dimensionesProductoDTO);
        dimensionesProducto = dimensionesProductoRepository.save(dimensionesProducto);
        return dimensionesProductoMapper.toDto(dimensionesProducto);
    }

    /**
     * Get all the dimensionesProductos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DimensionesProductoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all DimensionesProductos");
        return dimensionesProductoRepository.findAll(pageable)
            .map(dimensionesProductoMapper::toDto);
    }


    /**
     * Get one dimensionesProducto by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DimensionesProductoDTO> findOne(Long id) {
        log.debug("Request to get DimensionesProducto : {}", id);
        return dimensionesProductoRepository.findById(id)
            .map(dimensionesProductoMapper::toDto);
    }

    /**
     * Delete the dimensionesProducto by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DimensionesProducto : {}", id);
        dimensionesProductoRepository.deleteById(id);
    }
}
