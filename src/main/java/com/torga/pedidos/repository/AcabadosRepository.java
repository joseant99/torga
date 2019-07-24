package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Acabados;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Acabados entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcabadosRepository extends JpaRepository<Acabados, Long> {

}
