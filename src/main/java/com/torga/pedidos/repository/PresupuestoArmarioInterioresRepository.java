package com.torga.pedidos.repository;

import com.torga.pedidos.domain.PresupuestoArmario;
import com.torga.pedidos.domain.PresupuestoArmarioInteriores;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PresupuestoArmarioInteriores entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PresupuestoArmarioInterioresRepository extends JpaRepository<PresupuestoArmarioInteriores, Long> {
	@Query("Select u from PresupuestoArmarioInteriores u where u.presupuestoArmario.id = ?1")
	Collection<PresupuestoArmarioInteriores> findByPresupuestoArmario(Long id);
}
