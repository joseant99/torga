package com.torga.pedidos.repository;

import com.torga.pedidos.domain.ProductosComposicion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductosComposicion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductosComposicionRepository extends JpaRepository<ProductosComposicion, Long> {

}
