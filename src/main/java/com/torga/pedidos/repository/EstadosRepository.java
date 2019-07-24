package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Estados;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Estados entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadosRepository extends JpaRepository<Estados, Long> {
	
	Estados findByestadoPedido(String estado);
}
