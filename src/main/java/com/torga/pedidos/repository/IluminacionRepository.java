package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Iluminacion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Iluminacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IluminacionRepository extends JpaRepository<Iluminacion, Long> {

}
