package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Iluminacion;
import com.torga.pedidos.domain.ProductosDormitorio;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Iluminacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IluminacionRepository extends JpaRepository<Iluminacion, Long> {
	@Query("Select u from Iluminacion u where u.productosDormitorio.id = ?1 order by u.id")
	Collection<Iluminacion> findByCategoriaDormi(Long id);

}
