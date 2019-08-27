package com.torga.pedidos.repository;

import com.torga.pedidos.domain.AcabadosProductosPresupuestoPedido;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AcabadosProductosPresupuestoPedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcabadosProductosPresupuestoPedidoRepository extends JpaRepository<AcabadosProductosPresupuestoPedido, Long> {

}
