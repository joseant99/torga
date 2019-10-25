package com.torga.pedidos.repository;

import com.torga.pedidos.domain.RepresenTorga;
import com.torga.pedidos.domain.RepresentanteTienda;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RepresentanteTienda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepresentanteTiendaRepository extends JpaRepository<RepresentanteTienda, Long> {

	@Query("SELECT u FROM RepresentanteTienda u WHERE u.represenTorga.id = ?1")
	Collection<RepresentanteTienda> findIdUsu(Long id);
}
