package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Representante;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Representante entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepresentanteRepository extends JpaRepository<Representante, Long> {
	
	public Representante findOneByUsuario(String usuario);
	
	public Representante findOneByNombre(String nombre);

}
