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

import com.torga.pedidos.domain.CategoriasDormi;
import com.torga.pedidos.domain.*; // for static metamodels
import com.torga.pedidos.repository.CategoriasDormiRepository;
import com.torga.pedidos.service.dto.CategoriasDormiCriteria;
import com.torga.pedidos.service.dto.CategoriasDormiDTO;
import com.torga.pedidos.service.mapper.CategoriasDormiMapper;

/**
 * Service for executing complex queries for CategoriasDormi entities in the database.
 * The main input is a {@link CategoriasDormiCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link CategoriasDormiDTO} or a {@link Page} of {@link CategoriasDormiDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class CategoriasDormiQueryService extends QueryService<CategoriasDormi> {

    private final Logger log = LoggerFactory.getLogger(CategoriasDormiQueryService.class);

    private final CategoriasDormiRepository categoriasDormiRepository;

    private final CategoriasDormiMapper categoriasDormiMapper;

    public CategoriasDormiQueryService(CategoriasDormiRepository categoriasDormiRepository, CategoriasDormiMapper categoriasDormiMapper) {
        this.categoriasDormiRepository = categoriasDormiRepository;
        this.categoriasDormiMapper = categoriasDormiMapper;
    }

    /**
     * Return a {@link List} of {@link CategoriasDormiDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<CategoriasDormiDTO> findByCriteria(CategoriasDormiCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<CategoriasDormi> specification = createSpecification(criteria);
        return categoriasDormiMapper.toDto(categoriasDormiRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link CategoriasDormiDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<CategoriasDormiDTO> findByCriteria(CategoriasDormiCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<CategoriasDormi> specification = createSpecification(criteria);
        return categoriasDormiRepository.findAll(specification, page)
            .map(categoriasDormiMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(CategoriasDormiCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<CategoriasDormi> specification = createSpecification(criteria);
        return categoriasDormiRepository.count(specification);
    }

    /**
     * Function to convert CategoriasDormiCriteria to a {@link Specification}
     */
    private Specification<CategoriasDormi> createSpecification(CategoriasDormiCriteria criteria) {
        Specification<CategoriasDormi> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), CategoriasDormi_.id));
            }
            if (criteria.getNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombre(), CategoriasDormi_.nombre));
            }
        }
        return specification;
    }
}
