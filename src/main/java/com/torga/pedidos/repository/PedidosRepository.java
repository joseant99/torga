package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Pedidos;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Pedidos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PedidosRepository extends JpaRepository<Pedidos, Long> {
	
	public List<Pedidos> findAllByReferenciaclientesId(Long id);
	
	public Pedidos findBynumPedido(String num_pedido);

}
