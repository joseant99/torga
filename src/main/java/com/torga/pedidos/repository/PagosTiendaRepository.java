package com.torga.pedidos.repository;

import com.torga.pedidos.domain.PagosTienda;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PagosTienda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagosTiendaRepository extends JpaRepository<PagosTienda, Long> {

}
