package com.torga.pedidos.repository;

import com.torga.pedidos.domain.ContactoFabrica;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ContactoFabrica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContactoFabricaRepository extends JpaRepository<ContactoFabrica, Long> {

    @Query("select contacto_fabrica from ContactoFabrica contacto_fabrica where contacto_fabrica.user.login = ?#{principal.username}")
    List<ContactoFabrica> findByUserIsCurrentUser();

}
