package com.torga.pedidos.repository;

import com.torga.pedidos.domain.FPago;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FPago entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FPagoRepository extends JpaRepository<FPago, Long> {

}
