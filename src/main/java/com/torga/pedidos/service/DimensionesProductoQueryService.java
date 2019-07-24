package com.torga.pedidos.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.torga.pedidos.domain.DimensionesProducto;
import com.torga.pedidos.domain.*; // for static metamodels
import com.torga.pedidos.repository.DimensionesProductoRepository;
import com.torga.pedidos.service.dto.DimensionesProductoCriteria;
import com.torga.pedidos.service.dto.DimensionesProductoDTO;
import com.torga.pedidos.service.mapper.DimensionesProductoMapper;

/**
 * Service for executing complex queries for DimensionesProducto entities in the database.
 * The main input is a {@link DimensionesProductoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link DimensionesProductoDTO} or a {@link Page} of {@link DimensionesProductoDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class DimensionesProductoQueryService extends QueryService<DimensionesProducto> {

    private final Logger log = LoggerFactory.getLogger(DimensionesProductoQueryService.class);

    private final DimensionesProductoRepository dimensionesProductoRepository;

    private final DimensionesProductoMapper dimensionesProductoMapper;

    public DimensionesProductoQueryService(DimensionesProductoRepository dimensionesProductoRepository, DimensionesProductoMapper dimensionesProductoMapper) {
        this.dimensionesProductoRepository = dimensionesProductoRepository;
        this.dimensionesProductoMapper = dimensionesProductoMapper;
    }

    /**
     * Return a {@link List} of {@link DimensionesProductoDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<DimensionesProductoDTO> findByCriteria(DimensionesProductoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<DimensionesProducto> specification = createSpecification(criteria);
        return dimensionesProductoMapper.toDto(dimensionesProductoRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link DimensionesProductoDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<DimensionesProductoDTO> findByCriteria(DimensionesProductoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<DimensionesProducto> specification = createSpecification(criteria);
        return dimensionesProductoRepository.findAll(specification, page)
            .map(dimensionesProductoMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(DimensionesProductoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<DimensionesProducto> specification = createSpecification(criteria);
        return dimensionesProductoRepository.count(specification);
    }

    /**
     * Function to convert DimensionesProductoCriteria to a {@link Specification}
     */
    private Specification<DimensionesProducto> createSpecification(DimensionesProductoCriteria criteria) {
        Specification<DimensionesProducto> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), DimensionesProducto_.id));
            }
            if (criteria.getAncho() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getAncho(), DimensionesProducto_.ancho));
            }
            if (criteria.getAlto() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getAlto(), DimensionesProducto_.alto));
            }
            if (criteria.getFondo() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFondo(), DimensionesProducto_.fondo));
            }
            if (criteria.getMensaje() != null) {
                specification = specification.and(buildStringSpecification(criteria.getMensaje(), DimensionesProducto_.mensaje));
            }
            if (criteria.getPrecio() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getPrecio(), DimensionesProducto_.precio));
            }
            if (criteria.getAnchoIdeal() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getAnchoIdeal(), DimensionesProducto_.anchoIdeal));
            }
            if (criteria.getProductosDormitorioId() != null) {
                specification = specification.and(buildSpecification(criteria.getProductosDormitorioId(),
                    root -> root.join(DimensionesProducto_.productosDormitorio, JoinType.LEFT).get(ProductosDormitorio_.id)));
            }
        }
        return specification;
    }
}
