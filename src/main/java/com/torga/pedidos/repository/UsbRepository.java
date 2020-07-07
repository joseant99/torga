package com.torga.pedidos.repository;

import com.torga.pedidos.domain.Usb;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Usb entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsbRepository extends JpaRepository<Usb, Long> {

}
