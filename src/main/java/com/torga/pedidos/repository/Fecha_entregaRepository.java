package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Fecha_entrega;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Fecha_entrega entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Fecha_entregaRepository extends JpaRepository<Fecha_entrega, Long> {

}
