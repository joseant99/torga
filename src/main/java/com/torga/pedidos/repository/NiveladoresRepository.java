package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Enmarcados;
import com.torga.pedidos.domain.Niveladores;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Niveladores entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NiveladoresRepository extends JpaRepository<Niveladores, Long> {
	@Query("Select u from Niveladores u where u.armario.id = ?1")
	Collection<Niveladores> buscarArmario(Long id);
}
