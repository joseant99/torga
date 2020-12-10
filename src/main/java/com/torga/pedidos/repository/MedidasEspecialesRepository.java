package com.torga.pedidos.repository;

import com.torga.pedidos.domain.MedidasEspeciales;
import com.torga.pedidos.domain.ProductosDormitorio;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MedidasEspeciales entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedidasEspecialesRepository extends JpaRepository<MedidasEspeciales, Long> {
	@Query("Select u from MedidasEspeciales u where u.productosDormitorio.id = ?1 and u.ancho = 1 order by u.id")
	Collection<MedidasEspeciales> findByProd(Long id);
	@Query("Select u from MedidasEspeciales u where u.productosDormitorio.id = ?1 and u.alto = 1 order by u.id")
	Collection<MedidasEspeciales> findByProd1(Long id);
	@Query("Select u from MedidasEspeciales u where u.productosDormitorio.id = ?1 and u.fondo = 1 order by u.id")
	Collection<MedidasEspeciales> findByProd2(Long id);
}
