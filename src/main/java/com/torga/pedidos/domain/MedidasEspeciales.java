package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MedidasEspeciales.
 */
@Entity
@Table(name = "medidas_especiales")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MedidasEspeciales implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ancho")
    private Float ancho;

    @Column(name = "fondo")
    private Float fondo;

    @Column(name = "alto")
    private Float alto;

    @Column(name = "precio")
    private Float precio;

    @Column(name = "jhi_min")
    private Float min;

    @Column(name = "jhi_max")
    private Float max;

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

    public MedidasEspeciales ancho(Float ancho) {
        this.ancho = ancho;
        return this;
    }

    public void setAncho(Float ancho) {
        this.ancho = ancho;
    }

    public Float getFondo() {
        return fondo;
    }

    public MedidasEspeciales fondo(Float fondo) {
        this.fondo = fondo;
        return this;
    }

    public void setFondo(Float fondo) {
        this.fondo = fondo;
    }

    public Float getAlto() {
        return alto;
    }

    public MedidasEspeciales alto(Float alto) {
        this.alto = alto;
        return this;
    }

    public void setAlto(Float alto) {
        this.alto = alto;
    }

    public Float getPrecio() {
        return precio;
    }

    public MedidasEspeciales precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public Float getMin() {
        return min;
    }

    public MedidasEspeciales min(Float min) {
        this.min = min;
        return this;
    }

    public void setMin(Float min) {
        this.min = min;
    }

    public Float getMax() {
        return max;
    }

    public MedidasEspeciales max(Float max) {
        this.max = max;
        return this;
    }

    public void setMax(Float max) {
        this.max = max;
    }

    public ProductosDormitorio getProductosDormitorio() {
        return productosDormitorio;
    }

    public MedidasEspeciales productosDormitorio(ProductosDormitorio productosDormitorio) {
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
        MedidasEspeciales medidasEspeciales = (MedidasEspeciales) o;
        if (medidasEspeciales.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medidasEspeciales.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MedidasEspeciales{" +
            "id=" + getId() +
            ", ancho=" + getAncho() +
            ", fondo=" + getFondo() +
            ", alto=" + getAlto() +
            ", precio=" + getPrecio() +
            ", min=" + getMin() +
            ", max=" + getMax() +
            "}";
    }
}
