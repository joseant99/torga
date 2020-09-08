package com.torga.pedidos.repository;

import com.torga.pedidos.domain.PresupuestoArmario;
import com.torga.pedidos.domain.ProductosDormitorio;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PresupuestoArmario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PresupuestoArmarioRepository extends JpaRepository<PresupuestoArmario, Long> {
	@Query("Select u from PresupuestoArmario u where u.productosPresupuestoPedidos.presupuestoPedido.id = ?1")
	Collection<PresupuestoArmario> findByPresupuestoArmario(Long id);
	
	@Query("Select MAX(u.id) from PresupuestoArmario u")
	Collection<PresupuestoArmario> findultimaid();
}
