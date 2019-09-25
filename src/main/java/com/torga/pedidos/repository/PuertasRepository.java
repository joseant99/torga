package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Puertas;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Puertas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PuertasRepository extends JpaRepository<Puertas, Long> {

    @Query(value = "select distinct puertas from Puertas puertas left join fetch puertas.puertasProductos",
        countQuery = "select count(distinct puertas) from Puertas puertas")
    Page<Puertas> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct puertas from Puertas puertas left join fetch puertas.puertasProductos")
    List<Puertas> findAllWithEagerRelationships();

    @Query("select puertas from Puertas puertas left join fetch puertas.puertasProductos where puertas.id =:id")
    Optional<Puertas> findOneWithEagerRelationships(@Param("id") Long id);

}
