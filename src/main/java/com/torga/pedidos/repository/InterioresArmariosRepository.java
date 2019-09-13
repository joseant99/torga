package com.torga.pedidos.repository;

import com.torga.pedidos.domain.InterioresArmarios;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the InterioresArmarios entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InterioresArmariosRepository extends JpaRepository<InterioresArmarios, Long> {

}
