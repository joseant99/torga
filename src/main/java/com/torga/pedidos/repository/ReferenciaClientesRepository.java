package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Cliente;
import com.torga.pedidos.domain.ReferenciaClientes;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ReferenciaClientes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReferenciaClientesRepository extends JpaRepository<ReferenciaClientes, Long> {

	
	public List<ReferenciaClientes> findAllByClienteId(Long id);
	
	public ReferenciaClientes findByreferenciaClienteAndClienteId(String ref, Long id);

}
