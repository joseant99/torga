package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Zonas;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Zonas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ZonasRepository extends JpaRepository<Zonas, Long> {

}
