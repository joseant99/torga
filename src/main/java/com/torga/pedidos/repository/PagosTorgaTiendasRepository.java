package com.torga.pedidos.repository;

import com.torga.pedidos.domain.PagosTorgaTiendas;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the PagosTorgaTiendas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagosTorgaTiendasRepository extends JpaRepository<PagosTorgaTiendas, Long> {

    @Query(value = "select distinct pagos_torga_tiendas from PagosTorgaTiendas pagos_torga_tiendas left join fetch pagos_torga_tiendas.pagosTiendas",
        countQuery = "select count(distinct pagos_torga_tiendas) from PagosTorgaTiendas pagos_torga_tiendas")
    Page<PagosTorgaTiendas> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct pagos_torga_tiendas from PagosTorgaTiendas pagos_torga_tiendas left join fetch pagos_torga_tiendas.pagosTiendas")
    List<PagosTorgaTiendas> findAllWithEagerRelationships();

    @Query("select pagos_torga_tiendas from PagosTorgaTiendas pagos_torga_tiendas left join fetch pagos_torga_tiendas.pagosTiendas where pagos_torga_tiendas.id =:id")
    Optional<PagosTorgaTiendas> findOneWithEagerRelationships(@Param("id") Long id);

}
