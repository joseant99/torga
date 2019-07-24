package com.torga.pedidos.repository;

import com.torga.pedidos.domain.ProductosPresupuestoPedidos;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductosPresupuestoPedidos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductosPresupuestoPedidosRepository extends JpaRepository<ProductosPresupuestoPedidos, Long> {

}
