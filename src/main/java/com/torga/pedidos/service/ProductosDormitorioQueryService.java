package com.torga.pedidos.service;

import java.util.Collection;
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

import com.torga.pedidos.domain.ProductosDormitorio;
import com.torga.pedidos.domain.*; // for static metamodels
import com.torga.pedidos.repository.ProductosDormitorioRepository;
import com.torga.pedidos.service.dto.ProductosDormitorioCriteria;
import com.torga.pedidos.service.dto.ProductosDormitorioDTO;
import com.torga.pedidos.service.mapper.ProductosDormitorioMapper;

/**
 * Service for executing complex queries for ProductosDormitorio entities in the database.
 * The main input is a {@link ProductosDormitorioCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link ProductosDormitorioDTO} or a {@link Page} of {@link ProductosDormitorioDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ProductosDormitorioQueryService extends QueryService<ProductosDormitorio> {

    private final Logger log = LoggerFactory.getLogger(ProductosDormitorioQueryService.class);

    private final ProductosDormitorioRepository productosDormitorioRepository;

    private final ProductosDormitorioMapper productosDormitorioMapper;

    public ProductosDormitorioQueryService(ProductosDormitorioRepository productosDormitorioRepository, ProductosDormitorioMapper productosDormitorioMapper) {
        this.productosDormitorioRepository = productosDormitorioRepository;
        this.productosDormitorioMapper = productosDormitorioMapper;
    }

    /**
     * Return a {@link List} of {@link ProductosDormitorioDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<ProductosDormitorioDTO> findByCriteria(ProductosDormitorioCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<ProductosDormitorio> specification = createSpecification(criteria);
        return productosDormitorioMapper.toDto(productosDormitorioRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link ProductosDormitorioDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<ProductosDormitorioDTO> findByCriteria(ProductosDormitorioCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<ProductosDormitorio> specification = createSpecification(criteria);
        return productosDormitorioRepository.findAll(specification, page)
            .map(productosDormitorioMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ProductosDormitorioCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<ProductosDormitorio> specification = createSpecification(criteria);
        return productosDormitorioRepository.count(specification);
    }

    /**
     * Function to convert ProductosDormitorioCriteria to a {@link Specification}
     */
    private Specification<ProductosDormitorio> createSpecification(ProductosDormitorioCriteria criteria) {
        Specification<ProductosDormitorio> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), ProductosDormitorio_.id));
            }
            if (criteria.getNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombre(), ProductosDormitorio_.nombre));
            }
            if (criteria.getCategoriasDormiId() != null) {
                specification = specification.and(buildSpecification(criteria.getCategoriasDormiId(),
                    root -> root.join(ProductosDormitorio_.categoriasDormi, JoinType.LEFT).get(CategoriasDormi_.id)));
            }
            if (criteria.getPuertasId() != null) {
                specification = specification.and(buildSpecification(criteria.getPuertasId(),
                    root -> root.join(ProductosDormitorio_.puertas, JoinType.LEFT).get(Puertas_.id)));
            }
        }
        return specification;
    }

	public Collection<ProductosDormitorio> findByCategoria(Long id) {
		return (Collection<ProductosDormitorio>) (productosDormitorioRepository.findByCategoriaDormi(id));
	}
	
	public Collection<ProductosDormitorio> findByCategoria1(Long id) {
		return (Collection<ProductosDormitorio>) (productosDormitorioRepository.findByCategoriaDormi1(id));
	}

	public Collection<ProductosDormitorio> findByCategoriaDormi12(Long id) {
		// TODO Auto-generated method stub
		return (Collection<ProductosDormitorio>) (productosDormitorioRepository.findByCategoriaDormi12(id));
	}
}
