package com.torga.pedidos.repository;

import com.torga.pedidos.domain.ProductosDormitorio;
import com.torga.pedidos.domain.ProductosPresupuestoPedidos;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductosPresupuestoPedidos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductosPresupuestoPedidosRepository extends JpaRepository<ProductosPresupuestoPedidos, Long> {

	@Query("Select u from ProductosPresupuestoPedidos u where u.presupuestoPedido.id = ?1 order by u.id")
	Collection<ProductosPresupuestoPedidos> findByProd(Long id);
}
