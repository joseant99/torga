package com.torga.pedidos.repository;

import com.torga.pedidos.domain.TipoProducto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoProducto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoProductoRepository extends JpaRepository<TipoProducto, Long> {

}
