package com.torga.pedidos.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the DimensionesProducto entity.
 */
public class DimensionesProductoDTO implements Serializable {

    private Long id;

    @NotNull
    private Float ancho;

    @NotNull
    private Float alto;

    @NotNull
    private Float fondo;

    @NotNull
    private String mensaje;

    
    @Lob
    private byte[] imagen;
    private String imagenContentType;

    @NotNull
    private Float precio;

    private Float anchoIdeal;

    private Long productosDormitorioId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getAncho() {
        return ancho;
    }

    public void setAncho(Float ancho) {
        this.ancho = ancho;
    }

    public Float getAlto() {
        return alto;
    }

    public void setAlto(Float alto) {
        this.alto = alto;
    }

    public Float getFondo() {
        return fondo;
    }

    public void setFondo(Float fondo) {
        this.fondo = fondo;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
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

    public Float getPrecio() {
        return precio;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public Float getAnchoIdeal() {
        return anchoIdeal;
    }

    public void setAnchoIdeal(Float anchoIdeal) {
        this.anchoIdeal = anchoIdeal;
    }

    public Long getProductosDormitorioId() {
        return productosDormitorioId;
    }

    public void setProductosDormitorioId(Long productosDormitorioId) {
        this.productosDormitorioId = productosDormitorioId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DimensionesProductoDTO dimensionesProductoDTO = (DimensionesProductoDTO) o;
        if (dimensionesProductoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dimensionesProductoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DimensionesProductoDTO{" +
            "id=" + getId() +
            ", ancho=" + getAncho() +
            ", alto=" + getAlto() +
            ", fondo=" + getFondo() +
            ", mensaje='" + getMensaje() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", precio=" + getPrecio() +
            ", anchoIdeal=" + getAnchoIdeal() +
            ", productosDormitorio=" + getProductosDormitorioId() +
            "}";
    }
}
