package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Mensajes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Mensajes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MensajesRepository extends JpaRepository<Mensajes, Long> {

    @Query("select mensajes from Mensajes mensajes where mensajes.user.login = ?#{principal.username}")
    List<Mensajes> findByUserIsCurrentUser();

}
