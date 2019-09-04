package com.torga.pedidos.repository;

import com.torga.pedidos.domain.MedEspProductoPedidoPresu;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MedEspProductoPedidoPresu entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedEspProductoPedidoPresuRepository extends JpaRepository<MedEspProductoPedidoPresu, Long> {

}
