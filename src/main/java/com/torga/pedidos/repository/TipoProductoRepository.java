package com.torga.pedidos.repository;

import com.torga.pedidos.domain.ProductosDormitorio;
import com.torga.pedidos.domain.TipoProducto;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoProducto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoProductoRepository extends JpaRepository<TipoProducto, Long> {
	@Query("Select u from TipoProducto u where u.productosDormitorio.id = ?1 order by u.id")
	Collection<TipoProducto> findByCategoriaDormi(Long id);
}
