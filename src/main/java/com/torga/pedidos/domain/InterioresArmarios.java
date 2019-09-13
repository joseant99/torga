package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A InterioresArmarios.
 */
@Entity
@Table(name = "interiores_armarios")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class InterioresArmarios implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ancho")
    private Float ancho;

    @Column(name = "alto")
    private Float alto;

    @Column(name = "fondo")
    private Float fondo;

    @Column(name = "precio")
    private Float precio;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @Column(name = "mensaje")
    private String mensaje;

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

    public Float getAncho() {
        return ancho;
    }

    public InterioresArmarios ancho(Float ancho) {
        this.ancho = ancho;
        return this;
    }

    public void setAncho(Float ancho) {
        this.ancho = ancho;
    }

    public Float getAlto() {
        return alto;
    }

    public InterioresArmarios alto(Float alto) {
        this.alto = alto;
        return this;
    }

    public void setAlto(Float alto) {
        this.alto = alto;
    }

    public Float getFondo() {
        return fondo;
    }

    public InterioresArmarios fondo(Float fondo) {
        this.fondo = fondo;
        return this;
    }

    public void setFondo(Float fondo) {
        this.fondo = fondo;
    }

    public Float getPrecio() {
        return precio;
    }

    public InterioresArmarios precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public InterioresArmarios imagen(byte[] imagen) {
        this.imagen = imagen;
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return imagenContentType;
    }

    public InterioresArmarios imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public String getMensaje() {
        return mensaje;
    }

    public InterioresArmarios mensaje(String mensaje) {
        this.mensaje = mensaje;
        return this;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public ProductosDormitorio getProductosDormitorio() {
        return productosDormitorio;
    }

    public InterioresArmarios productosDormitorio(ProductosDormitorio productosDormitorio) {
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
        InterioresArmarios interioresArmarios = (InterioresArmarios) o;
        if (interioresArmarios.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), interioresArmarios.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InterioresArmarios{" +
            "id=" + getId() +
            ", ancho=" + getAncho() +
            ", alto=" + getAlto() +
            ", fondo=" + getFondo() +
            ", precio=" + getPrecio() +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            ", mensaje='" + getMensaje() + "'" +
            "}";
    }
}
