package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Interiores;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Interiores entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InterioresRepository extends JpaRepository<Interiores, Long> {

}
