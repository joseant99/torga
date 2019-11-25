package com.torga.pedidos.repository;

import com.torga.pedidos.domain.PresupuestoArmarioPuertas;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PresupuestoArmarioPuertas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PresupuestoArmarioPuertasRepository extends JpaRepository<PresupuestoArmarioPuertas, Long> {

}
