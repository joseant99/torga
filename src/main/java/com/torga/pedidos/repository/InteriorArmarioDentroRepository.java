package com.torga.pedidos.repository;

import com.torga.pedidos.domain.InteriorArmarioDentro;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the InteriorArmarioDentro entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InteriorArmarioDentroRepository extends JpaRepository<InteriorArmarioDentro, Long> {

}
