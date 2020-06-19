package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Armario;
import com.torga.pedidos.domain.DimensionesProductoTipo;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Armario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArmarioRepository extends JpaRepository<Armario, Long> {

	@Query("SELECT u FROM Armario u WHERE u.anchoMin <= ?1 and u.anchoMax >= ?2")
	Collection<Armario> findAncho(Float anchoMin, Float anchoMax);
	
	@Query("SELECT u FROM Armario u WHERE u.anchoMin <= ?1 and u.anchoMax >= ?2 and u.id>22 and u.id<25")
	Collection<Armario> findAncho1(Float anchoMin, Float anchoMax);
	
	@Query("SELECT u FROM Armario u WHERE u.anchoMin <= ?1 and u.anchoMax >= ?2 and u.id>24")
	Collection<Armario> findAncho2(Float anchoMin, Float anchoMax);
}
