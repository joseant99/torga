package com.torga.pedidos.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the ProductosDormitorio entity.
 */
public class ProductosDormitorioDTO implements Serializable {

    private Long id;

    @NotNull
    private String nombre;

    
    @Lob
    private byte[] imagen;
    private String imagenContentType;

    private Long categoriasDormiId;

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

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return imagenContentType;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public Long getCategoriasDormiId() {
        return categoriasDormiId;
    }

    public void setCategoriasDormiId(Long categoriasDormiId) {
        this.categoriasDormiId = categoriasDormiId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProductosDormitorioDTO productosDormitorioDTO = (ProductosDormitorioDTO) o;
        if (productosDormitorioDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productosDormitorioDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductosDormitorioDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", categoriasDormi=" + getCategoriasDormiId() +
            "}";
    }
}
