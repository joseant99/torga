package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A InteriorArmarioDentro.
 */
@Entity
@Table(name = "interior_armario_dentro")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class InteriorArmarioDentro implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @Column(name = "ancho")
    private Float ancho;

    @Column(name = "precio")
    private Float precio;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "precio_luz")
    private Float precioLuz;

    @ManyToOne
    @JsonIgnoreProperties("")
    private InterioresArmarios interioresArmarios;

    @ManyToOne
    @JsonIgnoreProperties("")
    private ProductosDormitorio productosDormitorio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public InteriorArmarioDentro imagen(byte[] imagen) {
        this.imagen = imagen;
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return imagenContentType;
    }

    public InteriorArmarioDentro imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public Float getAncho() {
        return ancho;
    }

    public InteriorArmarioDentro ancho(Float ancho) {
        this.ancho = ancho;
        return this;
    }

    public void setAncho(Float ancho) {
        this.ancho = ancho;
    }

    public Float getPrecio() {
        return precio;
    }

    public InteriorArmarioDentro precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public String getNombre() {
        return nombre;
    }

    public InteriorArmarioDentro nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Float getPrecioLuz() {
        return precioLuz;
    }

    public InteriorArmarioDentro precioLuz(Float precioLuz) {
        this.precioLuz = precioLuz;
        return this;
    }

    public void setPrecioLuz(Float precioLuz) {
        this.precioLuz = precioLuz;
    }

    public InterioresArmarios getInterioresArmarios() {
        return interioresArmarios;
    }

    public InteriorArmarioDentro interioresArmarios(InterioresArmarios interioresArmarios) {
        this.interioresArmarios = interioresArmarios;
        return this;
    }

    public void setInterioresArmarios(InterioresArmarios interioresArmarios) {
        this.interioresArmarios = interioresArmarios;
    }

    public ProductosDormitorio getProductosDormitorio() {
        return productosDormitorio;
    }

    public InteriorArmarioDentro productosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
        return this;
    }

    public void setProductosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
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
        InteriorArmarioDentro interiorArmarioDentro = (InteriorArmarioDentro) o;
        if (interiorArmarioDentro.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), interiorArmarioDentro.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InteriorArmarioDentro{" +
            "id=" + getId() +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            ", ancho=" + getAncho() +
            ", precio=" + getPrecio() +
            ", nombre='" + getNombre() + "'" +
            ", precioLuz=" + getPrecioLuz() +
            "}";
    }
}
