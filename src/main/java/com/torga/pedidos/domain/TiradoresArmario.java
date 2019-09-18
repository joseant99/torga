package com.torga.pedidos.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TiradoresArmario.
 */
@Entity
@Table(name = "tiradores_armario")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TiradoresArmario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "precio")
    private Float precio;

    @Column(name = "altura")
    private Float altura;

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

    public TiradoresArmario imagen(byte[] imagen) {
        this.imagen = imagen;
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return imagenContentType;
    }

    public TiradoresArmario imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public String getNombre() {
        return nombre;
    }

    public TiradoresArmario nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Float getPrecio() {
        return precio;
    }

    public TiradoresArmario precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public Float getAltura() {
        return altura;
    }

    public TiradoresArmario altura(Float altura) {
        this.altura = altura;
        return this;
    }

    public void setAltura(Float altura) {
        this.altura = altura;
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
        TiradoresArmario tiradoresArmario = (TiradoresArmario) o;
        if (tiradoresArmario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tiradoresArmario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TiradoresArmario{" +
            "id=" + getId() +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", precio=" + getPrecio() +
            ", altura=" + getAltura() +
            "}";
    }
}
