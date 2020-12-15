package com.torga.pedidos.repository;

import com.torga.pedidos.domain.PuertasPrecios;
import com.torga.pedidos.domain.TiposApoyo;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TiposApoyo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TiposApoyoRepository extends JpaRepository<TiposApoyo, Long> {
	
	@Query("SELECT u FROM TiposApoyo u WHERE  u.productoApoyo.id =?1 and u.id<61 or u.id>113")
	Collection<TiposApoyo> findAncho1(Long id);
	
	@Query("SELECT u FROM TiposApoyo u WHERE  u.productoApoyo.id =?1 and u.id>60 and u.id<151 ")
	Collection<TiposApoyo> findAncho2(Long id);
	
	@Query("SELECT u FROM TiposApoyo u WHERE  u.productoApoyo.id = ?1 and u.ancho>= ?2 and (u.id <61 or u.id>113) order by u.ancho")
	Collection<TiposApoyo> findAncho3(Long id, Float ancho);
}
