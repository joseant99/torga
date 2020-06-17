package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Cajeado;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cajeado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CajeadoRepository extends JpaRepository<Cajeado, Long> {

}
