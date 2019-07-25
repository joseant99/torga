package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Municipios;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Municipios entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MunicipiosRepository extends JpaRepository<Municipios, Long> {

}
