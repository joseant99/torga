package com.torga.pedidos.repository;

import com.torga.pedidos.domain.DimensionesProductoTipo;
import com.torga.pedidos.domain.RepresenTorga;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

/**
 * Spring Data  repository for the RepresenTorga entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepresenTorgaRepository extends JpaRepository<RepresenTorga, Long> {

    @Query("select represen_torga from RepresenTorga represen_torga where represen_torga.user.login = ?#{principal.username}")
    List<RepresenTorga> findByUserIsCurrentUser();

	@Query("SELECT u FROM RepresenTorga u WHERE u.user.id = ?1")
	Collection<RepresenTorga> findIdUsu(Long id);
}
