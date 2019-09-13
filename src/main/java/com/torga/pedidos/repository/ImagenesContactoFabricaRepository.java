package com.torga.pedidos.repository;

import com.torga.pedidos.domain.ImagenesContactoFabrica;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ImagenesContactoFabrica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImagenesContactoFabricaRepository extends JpaRepository<ImagenesContactoFabrica, Long> {

    @Query("select imagenes_contacto_fabrica from ImagenesContactoFabrica imagenes_contacto_fabrica where imagenes_contacto_fabrica.user.login = ?#{principal.username}")
    List<ImagenesContactoFabrica> findByUserIsCurrentUser();

}
