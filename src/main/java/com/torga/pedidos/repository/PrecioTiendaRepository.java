package com.torga.pedidos.repository;

import com.torga.pedidos.domain.PrecioTienda;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PrecioTienda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrecioTiendaRepository extends JpaRepository<PrecioTienda, Long> {

}
