package com.torga.pedidos.repository;

import com.torga.pedidos.domain.PrecioFinalPresu;
import com.torga.pedidos.domain.ProductosDormitorio;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PrecioFinalPresu entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrecioFinalPresuRepository extends JpaRepository<PrecioFinalPresu, Long> {
	@Query("Select u from PrecioFinalPresu u where u.presupuestoPedido.id = ?1 order by u.id")
	Collection<PrecioFinalPresu> findByCategoriaDormi(Long id);
}
