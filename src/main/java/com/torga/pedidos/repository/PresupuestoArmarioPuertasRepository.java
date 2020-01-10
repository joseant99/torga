package com.torga.pedidos.repository;

import com.torga.pedidos.domain.PresupuestoArmarioInteriores;
import com.torga.pedidos.domain.PresupuestoArmarioPuertas;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PresupuestoArmarioPuertas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PresupuestoArmarioPuertasRepository extends JpaRepository<PresupuestoArmarioPuertas, Long> {
	@Query("Select u from PresupuestoArmarioPuertas u where u.presupuestoArmario.id = ?1")
	Collection<PresupuestoArmarioPuertas> findByPresupuestoArmario(Long id);
}
