package com.torga.pedidos.repository;

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
	@Query("SELECT u FROM Casco u WHERE u.anchoMax >= ?1 and u.anchoMin < ?1 and u.altoMin < ?2 and u.altoMax >= ?2 and u.armario.id = ?3")
	Collection<Casco> findAncho(Float ancho,Float alto, Long id);
}
