package com.torga.pedidos.repository;

import com.torga.pedidos.domain.DimensionesProductoTipo;

import java.awt.List;
import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DimensionesProductoTipo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DimensionesProductoTipoRepository extends JpaRepository<DimensionesProductoTipo, Long> {
	
	@Query("SELECT u FROM DimensionesProductoTipo u WHERE u.productosDormitorio.id = ?1")
	Collection<DimensionesProductoTipo> findProducto(Long id);

}
