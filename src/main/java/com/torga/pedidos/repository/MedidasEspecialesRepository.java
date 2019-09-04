package com.torga.pedidos.repository;

import com.torga.pedidos.domain.MedidasEspeciales;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MedidasEspeciales entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedidasEspecialesRepository extends JpaRepository<MedidasEspeciales, Long> {

}
