package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Cliente;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

	public Cliente findOneByUsuario(String usuario);
	
	public Cliente findOneBycodCliente(String cliente);
	
	public List<Cliente> findAllByRepresentatesId(Long id);
}
