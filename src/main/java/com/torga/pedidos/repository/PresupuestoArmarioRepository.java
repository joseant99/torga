package com.torga.pedidos.repository;

import com.torga.pedidos.domain.PresupuestoArmario;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PresupuestoArmario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PresupuestoArmarioRepository extends JpaRepository<PresupuestoArmario, Long> {

}
