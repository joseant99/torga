package com.torga.pedidos.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Casco.
 */
@Entity
@Table(name = "casco")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Casco implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ancho")
    private Float ancho;

    @Column(name = "alto")
    private Float alto;

    @Column(name = "precio")
    private Float precio;

    @Column(name = "precio_costado")
    private Float precioCostado;

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

    public Casco ancho(Float ancho) {
        this.ancho = ancho;
        return this;
    }

    public void setAncho(Float ancho) {
        this.ancho = ancho;
    }

    public Float getAlto() {
        return alto;
    }

    public Casco alto(Float alto) {
        this.alto = alto;
        return this;
    }

    public void setAlto(Float alto) {
        this.alto = alto;
    }

    public Float getPrecio() {
        return precio;
    }

    public Casco precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public Float getPrecioCostado() {
        return precioCostado;
    }

    public Casco precioCostado(Float precioCostado) {
        this.precioCostado = precioCostado;
        return this;
    }

    public void setPrecioCostado(Float precioCostado) {
        this.precioCostado = precioCostado;
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
        Casco casco = (Casco) o;
        if (casco.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), casco.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Casco{" +
            "id=" + getId() +
            ", ancho=" + getAncho() +
            ", alto=" + getAlto() +
            ", precio=" + getPrecio() +
            ", precioCostado=" + getPrecioCostado() +
            "}";
    }
}
