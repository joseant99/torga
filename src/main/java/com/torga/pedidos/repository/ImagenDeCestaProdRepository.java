package com.torga.pedidos.repository;

import com.torga.pedidos.domain.DatosUsuario;
import com.torga.pedidos.domain.ImagenDeCestaProd;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ImagenDeCestaProd entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImagenDeCestaProdRepository extends JpaRepository<ImagenDeCestaProd, Long> {
	@Query("Select u from ImagenDeCestaProd u where u.nombreCesta = ?1")
	Collection<ImagenDeCestaProd> buscandoNombre(String id);
}
