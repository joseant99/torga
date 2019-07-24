package com.torga.pedidos.repository;

import com.torga.pedidos.domain.CategoriasDormi;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CategoriasDormi entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoriasDormiRepository extends JpaRepository<CategoriasDormi, Long>, JpaSpecificationExecutor<CategoriasDormi> {

}
