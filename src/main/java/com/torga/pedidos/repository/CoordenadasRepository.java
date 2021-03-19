package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Coordenadas;
import com.torga.pedidos.domain.DireccionTiendas;

import java.util.Collection;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Coordenadas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CoordenadasRepository extends JpaRepository<Coordenadas, Long> {
	
	@Query("Select u from Coordenadas u")
	Collection<Coordenadas> todos();

}
