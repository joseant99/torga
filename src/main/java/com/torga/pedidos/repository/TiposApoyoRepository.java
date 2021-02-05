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
	
	@Query("SELECT u FROM TiposApoyo u WHERE  u.productoApoyo.id = ?1 and u.ancho>= ?2 and (u.id <61 or u.id>113) and(u.nombre = 'bancada 32.5' or u.nombre = 'bancada 57.5' or u.nombre = 'bancada 70' or u.nombre = 'bancada 82.5' or u.nombre = 'bancada 95' or u.nombre = 'bancada 120' or u.nombre = 'bancada 145' or u.nombre = 'bancada 170' or u.nombre = 'bancada 195' or u.nombre = 'bancada 220' or u.nombre = 'bancada 245' or u.nombre = 'Zocalo 25' or u.nombre = 'Zocalo 37.5'  or u.nombre = 'Zocalo 50'  or u.nombre = 'Zocalo 62.5'  or u.nombre = 'Zocalo 75'  or u.nombre = 'Zocalo 87.5'  or u.nombre = 'Zocalo 100'  or u.nombre = 'Zocalo 112.5'  or u.nombre = 'Zocalo 125'  or u.nombre = 'Zocalo 137.5'  or u.nombre = 'Zocalo 150'  or u.nombre = 'Zocalo 162.5'  or u.nombre = 'Zocalo 175' or u.nombre = 'Zocalo 187.5'  or u.nombre = 'Zocalo 200'  or u.nombre = 'Zocalo 212.5'  or u.nombre = 'Zocalo 225'  or u.nombre = 'Zocalo 237.5'  or u.nombre = 'Zocalo 250') order by u.ancho")
	Collection<TiposApoyo> findAncho3(Long id, Float ancho);
}
