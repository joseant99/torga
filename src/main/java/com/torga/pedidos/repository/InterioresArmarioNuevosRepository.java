package com.torga.pedidos.repository;

import com.torga.pedidos.domain.InterioresArmarioNuevos;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the InterioresArmarioNuevos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InterioresArmarioNuevosRepository extends JpaRepository<InterioresArmarioNuevos, Long> {
	@Query("SELECT u FROM InterioresArmarioNuevos u WHERE u.casco.codigo = ?1 and u.productosDormitorio.id = ?2")
	Collection<InterioresArmarioNuevos> findAncho(String ancho,Long puerta);
}
