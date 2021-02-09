package com.torga.pedidos.repository;

import com.torga.pedidos.domain.ProductosDormitorio;
import com.torga.pedidos.domain.DimensionesProductoTipo;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductosDormitorio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductosDormitorioRepository extends JpaRepository<ProductosDormitorio, Long>, JpaSpecificationExecutor<ProductosDormitorio> {
	@Query("Select u from ProductosDormitorio u where u.categoriasDormi.id = ?1 order by u.id")
	Collection<ProductosDormitorio> findByCategoriaDormi(Long id);
	
	@Query("Select u from ProductosDormitorio u where u.categoriasDormi.id = ?1 order by length(u.nombre),u.nombre")
	Collection<ProductosDormitorio> findByCategoriaDormi1(Long id);
	
	@Query("Select u,o.alto,o.mensaje from ProductosDormitorio u inner join DimensionesProductoTipo o ON o.productosDormitorio.id=u.id where u.categoriasDormi.id = ?1 and o.mensaje <> 'Medidas Especiales' order by o.mensaje")
	Collection<ProductosDormitorio> findByCategoriaDormi12(Long id);
	
	@Query("Select u,o.alto,o.mensaje from ProductosDormitorio u inner join DimensionesProductoTipo o ON o.productosDormitorio.id=u.id where u.categoriasDormi.id = ?1 and o.mensaje <> 'Medidas Especiales' order by o.alto")
	Collection<ProductosDormitorio> findByCategoriaDormi13(Long id);
	
	@Query("Select u,o.alto,o.mensaje from ProductosDormitorio u inner join DimensionesProductoTipo o ON o.productosDormitorio.id=u.id where u.categoriasDormi.id = ?1 and o.mensaje <> 'Medidas Especiales' order by u.id")
	Collection<ProductosDormitorio> findByCategoriaDormi14(Long id);
	
	@Query("Select u,o.alto,o.mensaje from ProductosDormitorio u inner join DimensionesProductoTipo o ON o.productosDormitorio.id=u.id where u.categoriasDormi.id = ?1 or u.categoriasDormi.id = 27 order by o.mensaje")
	Collection<ProductosDormitorio> findByCategoriaDormi15(Long id);

}
