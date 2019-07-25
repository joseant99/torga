package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Provincias;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Provincias entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProvinciasRepository extends JpaRepository<Provincias, Long> {

}
