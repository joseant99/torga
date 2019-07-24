package com.torga.pedidos.repository;

import com.torga.pedidos.domain.AcabadosComposicion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AcabadosComposicion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcabadosComposicionRepository extends JpaRepository<AcabadosComposicion, Long> {

}
