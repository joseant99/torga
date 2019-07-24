package com.torga.pedidos.service.mapper;

import com.torga.pedidos.domain.*;
import com.torga.pedidos.service.dto.CategoriasDormiDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CategoriasDormi and its DTO CategoriasDormiDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CategoriasDormiMapper extends EntityMapper<CategoriasDormiDTO, CategoriasDormi> {



    default CategoriasDormi fromId(Long id) {
        if (id == null) {
            return null;
        }
        CategoriasDormi categoriasDormi = new CategoriasDormi();
        categoriasDormi.setId(id);
        return categoriasDormi;
    }
}
