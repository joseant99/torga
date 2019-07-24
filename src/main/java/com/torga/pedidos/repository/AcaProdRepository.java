package com.torga.pedidos.repository;

import com.torga.pedidos.domain.AcaProd;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the AcaProd entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcaProdRepository extends JpaRepository<AcaProd, Long> {

    @Query(value = "select distinct aca_prod from AcaProd aca_prod left join fetch aca_prod.acabados",
        countQuery = "select count(distinct aca_prod) from AcaProd aca_prod")
    Page<AcaProd> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct aca_prod from AcaProd aca_prod left join fetch aca_prod.acabados")
    List<AcaProd> findAllWithEagerRelationships();

    @Query("select aca_prod from AcaProd aca_prod left join fetch aca_prod.acabados where aca_prod.id =:id")
    Optional<AcaProd> findOneWithEagerRelationships(@Param("id") Long id);

}
