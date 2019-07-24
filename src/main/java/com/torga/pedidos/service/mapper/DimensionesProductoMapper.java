package com.torga.pedidos.service.mapper;

import com.torga.pedidos.domain.*;
import com.torga.pedidos.service.dto.DimensionesProductoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DimensionesProducto and its DTO DimensionesProductoDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductosDormitorioMapper.class})
public interface DimensionesProductoMapper extends EntityMapper<DimensionesProductoDTO, DimensionesProducto> {

    @Mapping(source = "productosDormitorio.id", target = "productosDormitorioId")
    DimensionesProductoDTO toDto(DimensionesProducto dimensionesProducto);

    @Mapping(source = "productosDormitorioId", target = "productosDormitorio")
    DimensionesProducto toEntity(DimensionesProductoDTO dimensionesProductoDTO);

    default DimensionesProducto fromId(Long id) {
        if (id == null) {
            return null;
        }
        DimensionesProducto dimensionesProducto = new DimensionesProducto();
        dimensionesProducto.setId(id);
        return dimensionesProducto;
    }
}
