package com.torga.pedidos.repository;

import com.torga.pedidos.domain.RepresentanteTienda;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RepresentanteTienda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepresentanteTiendaRepository extends JpaRepository<RepresentanteTienda, Long> {

}
