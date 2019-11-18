package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Armario;
import com.torga.pedidos.domain.Casco;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Casco entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CascoRepository extends JpaRepository<Casco, Long> {
	
	@Query("SELECT u FROM Casco u WHERE u.ancho >= ?1 and u.alto >= ?2")
	Collection<Casco> findAncho(Float ancho, Float alto);
}
