package com.torga.pedidos.repository;

import com.torga.pedidos.domain.TransportistaTabla;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TransportistaTabla entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransportistaTablaRepository extends JpaRepository<TransportistaTabla, Long> {

}
