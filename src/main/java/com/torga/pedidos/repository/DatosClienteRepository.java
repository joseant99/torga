package com.torga.pedidos.repository;

import com.torga.pedidos.domain.DatosCliente;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DatosCliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DatosClienteRepository extends JpaRepository<DatosCliente, Long> {

}
