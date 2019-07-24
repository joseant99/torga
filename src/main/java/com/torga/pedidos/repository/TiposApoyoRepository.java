package com.torga.pedidos.repository;

import com.torga.pedidos.domain.TiposApoyo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TiposApoyo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TiposApoyoRepository extends JpaRepository<TiposApoyo, Long> {

}
