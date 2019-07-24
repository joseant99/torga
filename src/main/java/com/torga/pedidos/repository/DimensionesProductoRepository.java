package com.torga.pedidos.repository;

import com.torga.pedidos.domain.DimensionesProducto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DimensionesProducto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DimensionesProductoRepository extends JpaRepository<DimensionesProducto, Long>, JpaSpecificationExecutor<DimensionesProducto> {

}
