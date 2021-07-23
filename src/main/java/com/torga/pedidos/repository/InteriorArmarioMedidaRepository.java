package com.torga.pedidos.repository;

import com.torga.pedidos.domain.InteriorArmarioMedida;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the InteriorArmarioMedida entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InteriorArmarioMedidaRepository extends JpaRepository<InteriorArmarioMedida, Long> {

}
