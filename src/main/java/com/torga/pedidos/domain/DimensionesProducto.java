package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DimensionesProducto.
 */
@Entity
@Table(name = "dimensiones_producto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DimensionesProducto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "ancho", nullable = false)
    private Float ancho;

    @NotNull
    @Column(name = "alto", nullable = false)
    private Float alto;

    @NotNull
    @Column(name = "fondo", nullable = false)
    private Float fondo;

    @NotNull
    @Column(name = "mensaje", nullable = false)
    private String mensaje;

    
    @Lob
    @Column(name = "imagen", nullable = false)
    private byte[] imagen;

    @Column(name = "imagen_content_type", nullable = false)
    private String imagenContentType;

    @NotNull
    @Column(name = "precio", nullable = false)
    private Float precio;

    @Column(name = "ancho_ideal")
    private Float anchoIdeal;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private ProductosDormitorio productosDormitorio;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getAncho() {
        return ancho;
    }

    public DimensionesProducto ancho(Float ancho) {
        this.ancho = ancho;
        return this;
    }

    public void setAncho(Float ancho) {
        this.ancho = ancho;
    }

    public Float getAlto() {
        return alto;
    }

    public DimensionesProducto alto(Float alto) {
        this.alto = alto;
        return this;
    }

    public void setAlto(Float alto) {
        this.alto = alto;
    }

    public Float getFondo() {
        return fondo;
    }

    public DimensionesProducto fondo(Float fondo) {
        this.fondo = fondo;
        return this;
    }

    public void setFondo(Float fondo) {
        this.fondo = fondo;
    }

    public String getMensaje() {
        return mensaje;
    }

    public DimensionesProducto mensaje(String mensaje) {
        this.mensaje = mensaje;
        return this;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public DimensionesProducto imagen(byte[] imagen) {
        this.imagen = imagen;
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return imagenContentType;
    }

    public DimensionesProducto imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public Float getPrecio() {
        return precio;
    }

    public DimensionesProducto precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public Float getAnchoIdeal() {
        return anchoIdeal;
    }

    public DimensionesProducto anchoIdeal(Float anchoIdeal) {
        this.anchoIdeal = anchoIdeal;
        return this;
    }

    public void setAnchoIdeal(Float anchoIdeal) {
        this.anchoIdeal = anchoIdeal;
    }

    public ProductosDormitorio getProductosDormitorio() {
        return productosDormitorio;
    }

    public DimensionesProducto productosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
        return this;
    }

    public void setProductosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DimensionesProducto dimensionesProducto = (DimensionesProducto) o;
        if (dimensionesProducto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dimensionesProducto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DimensionesProducto{" +
            "id=" + getId() +
            ", ancho=" + getAncho() +
            ", alto=" + getAlto() +
            ", fondo=" + getFondo() +
            ", mensaje='" + getMensaje() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            ", precio=" + getPrecio() +
            ", anchoIdeal=" + getAnchoIdeal() +
            "}";
    }
}
