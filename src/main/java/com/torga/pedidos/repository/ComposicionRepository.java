package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Composicion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Composicion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComposicionRepository extends JpaRepository<Composicion, Long> {

}
