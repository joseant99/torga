package com.torga.pedidos.service.mapper;

import com.torga.pedidos.domain.*;
import com.torga.pedidos.service.dto.ProductosDormitorioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ProductosDormitorio and its DTO ProductosDormitorioDTO.
 */
@Mapper(componentModel = "spring", uses = {CategoriasDormiMapper.class})
public interface ProductosDormitorioMapper extends EntityMapper<ProductosDormitorioDTO, ProductosDormitorio> {

    @Mapping(source = "categoriasDormi.id", target = "categoriasDormiId")
    ProductosDormitorioDTO toDto(ProductosDormitorio productosDormitorio);

    @Mapping(source = "categoriasDormiId", target = "categoriasDormi")
    @Mapping(target = "puertas", ignore = true)
    ProductosDormitorio toEntity(ProductosDormitorioDTO productosDormitorioDTO);

    default ProductosDormitorio fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProductosDormitorio productosDormitorio = new ProductosDormitorio();
        productosDormitorio.setId(id);
        return productosDormitorio;
    }
}
