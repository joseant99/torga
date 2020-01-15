package com.torga.pedidos.repository;

import com.torga.pedidos.domain.IvaProductoTienda;
import com.torga.pedidos.domain.ProductosDormitorio;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the IvaProductoTienda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IvaProductoTiendaRepository extends JpaRepository<IvaProductoTienda, Long> {
	@Query("Select u from IvaProductoTienda u where u.datosUsuario.id = ?1")
	Collection<IvaProductoTienda> findByCategoriaDormi(Long id);
}
