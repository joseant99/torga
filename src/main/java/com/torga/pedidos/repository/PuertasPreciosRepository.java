package com.torga.pedidos.repository;

import com.torga.pedidos.domain.PuertasPrecios;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PuertasPrecios entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PuertasPreciosRepository extends JpaRepository<PuertasPrecios, Long> {
	@Query("SELECT u FROM PuertasPrecios u WHERE u.tipo = ?1 and u.alto =?2 and u.productosDormitorio.id = ?3")
	Collection<PuertasPrecios> findAncho(String ancho,Float alto , Long puerta);
	
	@Query("SELECT u FROM PuertasPrecios u WHERE  u.casco.id =?1 and u.productosDormitorio.id = ?2")
	Collection<PuertasPrecios> findAncho1(Long casco , Long puerta);
}
