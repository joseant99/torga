package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Logistica;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Logistica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LogisticaRepository extends JpaRepository<Logistica, Long> {

	public List<Logistica> findAllByReferenciaclientesId(Long id);
	
	public Logistica findOneBynumPedido(String numPedido);
}
