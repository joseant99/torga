package com.torga.pedidos.repository;

import com.torga.pedidos.domain.PresupuestoArmarioInteriores;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PresupuestoArmarioInteriores entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PresupuestoArmarioInterioresRepository extends JpaRepository<PresupuestoArmarioInteriores, Long> {

}
