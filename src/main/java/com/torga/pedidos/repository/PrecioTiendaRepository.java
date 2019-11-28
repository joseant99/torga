package com.torga.pedidos.repository;

import com.torga.pedidos.domain.PrecioTienda;
import com.torga.pedidos.domain.PrecioTiendaProductos;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PrecioTienda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrecioTiendaRepository extends JpaRepository<PrecioTienda, Long> {

	@Query("SELECT u.precio FROM PrecioTienda u WHERE u.datosUsuario.id = ?1")
	Collection<PrecioTienda> findProducto(Long id);
}
