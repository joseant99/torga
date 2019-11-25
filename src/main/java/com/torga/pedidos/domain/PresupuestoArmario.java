package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PresupuestoArmario.
 */
@Entity
@Table(name = "presupuesto_armario")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PresupuestoArmario implements Serializable {

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

    @Column(name = "casco_precio")
    private Float cascoPrecio;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Armario armario;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Acabados acabadosCasco;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Acabados acabados;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Acabados acabadosInterior;

    @ManyToOne
    @JsonIgnoreProperties("")
    private ProductosPresupuestoPedidos productosPresupuestoPedidos;

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

    public PresupuestoArmario ancho(Float ancho) {
        this.ancho = ancho;
        return this;
    }

    public void setAncho(Float ancho) {
        this.ancho = ancho;
    }

    public Float getAlto() {
        return alto;
    }

    public PresupuestoArmario alto(Float alto) {
        this.alto = alto;
        return this;
    }

    public void setAlto(Float alto) {
        this.alto = alto;
    }

    public Float getFondo() {
        return fondo;
    }

    public PresupuestoArmario fondo(Float fondo) {
        this.fondo = fondo;
        return this;
    }

    public void setFondo(Float fondo) {
        this.fondo = fondo;
    }

    public Float getCascoPrecio() {
        return cascoPrecio;
    }

    public PresupuestoArmario cascoPrecio(Float cascoPrecio) {
        this.cascoPrecio = cascoPrecio;
        return this;
    }

    public void setCascoPrecio(Float cascoPrecio) {
        this.cascoPrecio = cascoPrecio;
    }

    public Armario getArmario() {
        return armario;
    }

    public PresupuestoArmario armario(Armario armario) {
        this.armario = armario;
        return this;
    }

    public void setArmario(Armario armario) {
        this.armario = armario;
    }

    public Acabados getAcabadosCasco() {
        return acabadosCasco;
    }

    public PresupuestoArmario acabadosCasco(Acabados acabados) {
        this.acabadosCasco = acabados;
        return this;
    }

    public void setAcabadosCasco(Acabados acabados) {
        this.acabadosCasco = acabados;
    }

    public Acabados getAcabados() {
        return acabados;
    }

    public PresupuestoArmario acabados(Acabados acabados) {
        this.acabados = acabados;
        return this;
    }

    public void setAcabados(Acabados acabados) {
        this.acabados = acabados;
    }

    public Acabados getAcabadosInterior() {
        return acabadosInterior;
    }

    public PresupuestoArmario acabadosInterior(Acabados acabados) {
        this.acabadosInterior = acabados;
        return this;
    }

    public void setAcabadosInterior(Acabados acabados) {
        this.acabadosInterior = acabados;
    }

    public ProductosPresupuestoPedidos getProductosPresupuestoPedidos() {
        return productosPresupuestoPedidos;
    }

    public PresupuestoArmario productosPresupuestoPedidos(ProductosPresupuestoPedidos productosPresupuestoPedidos) {
        this.productosPresupuestoPedidos = productosPresupuestoPedidos;
        return this;
    }

    public void setProductosPresupuestoPedidos(ProductosPresupuestoPedidos productosPresupuestoPedidos) {
        this.productosPresupuestoPedidos = productosPresupuestoPedidos;
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
        PresupuestoArmario presupuestoArmario = (PresupuestoArmario) o;
        if (presupuestoArmario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), presupuestoArmario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PresupuestoArmario{" +
            "id=" + getId() +
            ", ancho=" + getAncho() +
            ", alto=" + getAlto() +
            ", fondo=" + getFondo() +
            ", cascoPrecio=" + getCascoPrecio() +
            "}";
    }
}
