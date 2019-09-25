package com.torga.pedidos.repository;

import com.torga.pedidos.domain.ProductosDormitorio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductosDormitorio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductosDormitorioRepository extends JpaRepository<ProductosDormitorio, Long>, JpaSpecificationExecutor<ProductosDormitorio> {

}
