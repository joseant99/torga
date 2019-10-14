package com.torga.pedidos.repository;

import com.torga.pedidos.domain.DimensionesProductoTipo;
import com.torga.pedidos.domain.PrecioTiendaProductos;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PrecioTiendaProductos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrecioTiendaProductosRepository extends JpaRepository<PrecioTiendaProductos, Long> {
	@Query("SELECT u.id, u.porcentaje, u.productosDormitorio.id FROM PrecioTiendaProductos u WHERE u.productosDormitorio.categoriasDormi.id = ?1 and u.datosUsuario.id = ?2 order by u.productosDormitorio.id")
	Collection<PrecioTiendaProductos> findProducto(Long id, Long tienda);
}
