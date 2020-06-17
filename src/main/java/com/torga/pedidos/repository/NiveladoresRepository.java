package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Niveladores;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Niveladores entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NiveladoresRepository extends JpaRepository<Niveladores, Long> {

}
