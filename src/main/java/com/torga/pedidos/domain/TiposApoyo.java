package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TiposApoyo.
 */
@Entity
@Table(name = "tipos_apoyo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TiposApoyo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    
    @Lob
    @Column(name = "imagen", nullable = false)
    private byte[] imagen;

    @Column(name = "imagen_content_type", nullable = false)
    private String imagenContentType;

    @NotNull
    @Column(name = "precio", nullable = false)
    private Float precio;

    @Column(name = "altura")
    private Float altura;

    @Column(name = "ancho")
    private Float ancho;

    @Column(name = "fondo")
    private Float fondo;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private ProductosDormitorio productoApoyo;

    @ManyToOne
    @JsonIgnoreProperties("")
    private ProductosDormitorio productosDormitorio;

    @ManyToOne
    @JsonIgnoreProperties("")
    private DimensionesProducto dimensionesProducto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public TiposApoyo nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public TiposApoyo imagen(byte[] imagen) {
        this.imagen = imagen;
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return imagenContentType;
    }

    public TiposApoyo imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public Float getPrecio() {
        return precio;
    }

    public TiposApoyo precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public Float getAltura() {
        return altura;
    }

    public TiposApoyo altura(Float altura) {
        this.altura = altura;
        return this;
    }

    public void setAltura(Float altura) {
        this.altura = altura;
    }

    public Float getAncho() {
        return ancho;
    }

    public TiposApoyo ancho(Float ancho) {
        this.ancho = ancho;
        return this;
    }

    public void setAncho(Float ancho) {
        this.ancho = ancho;
    }

    public Float getFondo() {
        return fondo;
    }

    public TiposApoyo fondo(Float fondo) {
        this.fondo = fondo;
        return this;
    }

    public void setFondo(Float fondo) {
        this.fondo = fondo;
    }

    public ProductosDormitorio getProductoApoyo() {
        return productoApoyo;
    }

    public TiposApoyo productoApoyo(ProductosDormitorio productosDormitorio) {
        this.productoApoyo = productosDormitorio;
        return this;
    }

    public void setProductoApoyo(ProductosDormitorio productosDormitorio) {
        this.productoApoyo = productosDormitorio;
    }

    public ProductosDormitorio getProductosDormitorio() {
        return productosDormitorio;
    }

    public TiposApoyo productosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
        return this;
    }

    public void setProductosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
    }

    public DimensionesProducto getDimensionesProducto() {
        return dimensionesProducto;
    }

    public TiposApoyo dimensionesProducto(DimensionesProducto dimensionesProducto) {
        this.dimensionesProducto = dimensionesProducto;
        return this;
    }

    public void setDimensionesProducto(DimensionesProducto dimensionesProducto) {
        this.dimensionesProducto = dimensionesProducto;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TiposApoyo tiposApoyo = (TiposApoyo) o;
        if (tiposApoyo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tiposApoyo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TiposApoyo{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            ", precio=" + getPrecio() +
            ", altura=" + getAltura() +
            ", ancho=" + getAncho() +
            ", fondo=" + getFondo() +
            "}";
    }
}
