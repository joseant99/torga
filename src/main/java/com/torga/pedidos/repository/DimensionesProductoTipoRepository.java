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
	
	@Query("SELECT u.alto, u.ancho, u.fondo, u.precio, u.productosDormitorio FROM DimensionesProductoTipo u WHERE u.productosDormitorio.categoriasDormi.id = ?1 and u.ancho = ?2")
	Collection<DimensionesProductoTipo> findFiltro(Long id, Float ancho);
	
	@Query("SELECT u FROM DimensionesProductoTipo u WHERE u.productosDormitorio.categoriasDormi.id = ?1 and u.alto = ?2 group by u.productosDormitorio")
	Collection<DimensionesProductoTipo> findFiltroAltura(Long id, Float altura);
	
	@Query("SELECT u FROM DimensionesProductoTipo u WHERE u.productosDormitorio.categoriasDormi.id = ?1 and u.alto = ?2 and u.ancho = ?3 group by u.productosDormitorio")
	Collection<DimensionesProductoTipo> findFiltroAlturaAncho(Long id, Float altura, Float ancho);
}
