package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Coordenadas;
import com.torga.pedidos.domain.Exposicion;

import java.util.Collection;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Exposicion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExposicionRepository extends JpaRepository<Exposicion, Long> {
	
	@Query("Select u from Exposicion u")
	Collection<Exposicion> todos();

}
