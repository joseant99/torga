package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Transportistas;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Transportistas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransportistasRepository extends JpaRepository<Transportistas, Long> {
	
	Transportistas findBytransportistaPedido(String transportista);

}
