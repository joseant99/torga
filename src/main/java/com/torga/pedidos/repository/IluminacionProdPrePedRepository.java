package com.torga.pedidos.repository;

import com.torga.pedidos.domain.IluminacionProdPrePed;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the IluminacionProdPrePed entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IluminacionProdPrePedRepository extends JpaRepository<IluminacionProdPrePed, Long> {

}
