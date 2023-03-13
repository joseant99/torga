package com.torga.pedidos.repository;

import com.torga.pedidos.domain.DireccionTiendas;
import com.torga.pedidos.domain.ProductosDormitorio;

import java.util.Collection;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DireccionTiendas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DireccionTiendasRepository extends JpaRepository<DireccionTiendas, Long> {
	@Query("Select u from DireccionTiendas u where u.datosUsuario.id = ?1 and u.tipoDir != 'COMERCIAL' order by u.id")
	Collection<DireccionTiendas> findByCategoriaDormi(Long id);
	
	@Query("Select u from DireccionTiendas u where u.tipoDir = 'COMERCIAL' and u.activo = 0")
	Collection<DireccionTiendas> soloComerciales();
}
