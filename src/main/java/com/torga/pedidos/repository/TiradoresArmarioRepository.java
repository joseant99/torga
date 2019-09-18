package com.torga.pedidos.repository;

import com.torga.pedidos.domain.TiradoresArmario;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TiradoresArmario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TiradoresArmarioRepository extends JpaRepository<TiradoresArmario, Long> {

}
