package com.torga.pedidos.repository;

import com.torga.pedidos.domain.AcabadosComposicion;
import com.torga.pedidos.domain.ProductosDormitorio;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AcabadosComposicion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcabadosComposicionRepository extends JpaRepository<AcabadosComposicion, Long> {
	@Query("Select u from AcabadosComposicion u where u.productosComposicion.id = ?1")
	Collection<AcabadosComposicion> findByCategoriaDormi(Long id);
}
