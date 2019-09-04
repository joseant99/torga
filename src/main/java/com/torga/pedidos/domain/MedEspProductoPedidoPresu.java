package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MedEspProductoPedidoPresu.
 */
@Entity
@Table(name = "med_esp_producto_pedido_presu")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MedEspProductoPedidoPresu implements Serializable {

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

    public MedEspProductoPedidoPresu ancho(Float ancho) {
        this.ancho = ancho;
        return this;
    }

    public void setAncho(Float ancho) {
        this.ancho = ancho;
    }

    public Float getFondo() {
        return fondo;
    }

    public MedEspProductoPedidoPresu fondo(Float fondo) {
        this.fondo = fondo;
        return this;
    }

    public void setFondo(Float fondo) {
        this.fondo = fondo;
    }

    public Float getAlto() {
        return alto;
    }

    public MedEspProductoPedidoPresu alto(Float alto) {
        this.alto = alto;
        return this;
    }

    public void setAlto(Float alto) {
        this.alto = alto;
    }

    public Float getPrecio() {
        return precio;
    }

    public MedEspProductoPedidoPresu precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public ProductosPresupuestoPedidos getProductosPresupuestoPedidos() {
        return productosPresupuestoPedidos;
    }

    public MedEspProductoPedidoPresu productosPresupuestoPedidos(ProductosPresupuestoPedidos productosPresupuestoPedidos) {
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
        MedEspProductoPedidoPresu medEspProductoPedidoPresu = (MedEspProductoPedidoPresu) o;
        if (medEspProductoPedidoPresu.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medEspProductoPedidoPresu.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MedEspProductoPedidoPresu{" +
            "id=" + getId() +
            ", ancho=" + getAncho() +
            ", fondo=" + getFondo() +
            ", alto=" + getAlto() +
            ", precio=" + getPrecio() +
            "}";
    }
}
