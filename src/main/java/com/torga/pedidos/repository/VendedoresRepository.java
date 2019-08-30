package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Vendedores;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Vendedores entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VendedoresRepository extends JpaRepository<Vendedores, Long> {

    @Query("select vendedores from Vendedores vendedores where vendedores.user.login = ?#{principal.username}")
    List<Vendedores> findByUserIsCurrentUser();

}
