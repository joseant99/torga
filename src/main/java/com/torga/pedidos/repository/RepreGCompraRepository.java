package com.torga.pedidos.repository;

import com.torga.pedidos.domain.RepreGCompra;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RepreGCompra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepreGCompraRepository extends JpaRepository<RepreGCompra, Long> {

}
