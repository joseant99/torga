package com.torga.pedidos.repository;

import com.torga.pedidos.domain.AcabadosProductosPresupuestoPedido;
import com.torga.pedidos.domain.ProductosDormitorio;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AcabadosProductosPresupuestoPedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcabadosProductosPresupuestoPedidoRepository extends JpaRepository<AcabadosProductosPresupuestoPedido, Long> {
	@Query("Select u from AcabadosProductosPresupuestoPedido u where u.productosPresupuestoPedidos.id = ?1 order by u.orden")
	Collection<AcabadosProductosPresupuestoPedido> findByCategoriaDormi(Long id);
}
