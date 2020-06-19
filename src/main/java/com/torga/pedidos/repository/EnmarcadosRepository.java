package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Enmarcados;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Enmarcados entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EnmarcadosRepository extends JpaRepository<Enmarcados, Long> {
	@Query("Select u from Enmarcados u where u.armario.id = ?1 and u.codigo =?2")
	Collection<Enmarcados> buscarArmario(Long id,String letra);
}
