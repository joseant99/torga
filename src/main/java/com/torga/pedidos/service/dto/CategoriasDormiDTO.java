package com.torga.pedidos.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CategoriasDormi entity.
 */
public class CategoriasDormiDTO implements Serializable {

    private Long id;

    private String nombre;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CategoriasDormiDTO categoriasDormiDTO = (CategoriasDormiDTO) o;
        if (categoriasDormiDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), categoriasDormiDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CategoriasDormiDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
