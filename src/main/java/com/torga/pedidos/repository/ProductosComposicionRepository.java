package com.torga.pedidos.repository;

import com.torga.pedidos.domain.ProductosComposicion;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductosComposicion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductosComposicionRepository extends JpaRepository<ProductosComposicion, Long> {
	@Query("Select u from ProductosComposicion u where u.composicion.id = ?1 order by u.id")
	Collection<ProductosComposicion> findByCom(Long id);
}
