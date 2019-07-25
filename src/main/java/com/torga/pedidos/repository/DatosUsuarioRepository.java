package com.torga.pedidos.repository;

import com.torga.pedidos.domain.DatosUsuario;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the DatosUsuario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DatosUsuarioRepository extends JpaRepository<DatosUsuario, Long> {

    @Query("select datos_usuario from DatosUsuario datos_usuario where datos_usuario.user.login = ?#{principal.username}")
    List<DatosUsuario> findByUserIsCurrentUser();

}
