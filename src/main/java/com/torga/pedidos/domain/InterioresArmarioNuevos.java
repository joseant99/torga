package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A InterioresArmarioNuevos.
 */
@Entity
@Table(name = "interiores_armario_nuevos")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class InterioresArmarioNuevos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "ancho")
    private Float ancho;

    @Column(name = "precio")
    private Float precio;

    @Column(name = "luz")
    private Float luz;

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

    public String getNombre() {
        return nombre;
    }

    public InterioresArmarioNuevos nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Float getAncho() {
        return ancho;
    }

    public InterioresArmarioNuevos ancho(Float ancho) {
        this.ancho = ancho;
        return this;
    }

    public void setAncho(Float ancho) {
        this.ancho = ancho;
    }

    public Float getPrecio() {
        return precio;
    }

    public InterioresArmarioNuevos precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public Float getLuz() {
        return luz;
    }

    public InterioresArmarioNuevos luz(Float luz) {
        this.luz = luz;
        return this;
    }

    public void setLuz(Float luz) {
        this.luz = luz;
    }

    public ProductosDormitorio getProductosDormitorio() {
        return productosDormitorio;
    }

    public InterioresArmarioNuevos productosDormitorio(ProductosDormitorio productosDormitorio) {
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
        InterioresArmarioNuevos interioresArmarioNuevos = (InterioresArmarioNuevos) o;
        if (interioresArmarioNuevos.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), interioresArmarioNuevos.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InterioresArmarioNuevos{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", ancho=" + getAncho() +
            ", precio=" + getPrecio() +
            ", luz=" + getLuz() +
            "}";
    }
}
