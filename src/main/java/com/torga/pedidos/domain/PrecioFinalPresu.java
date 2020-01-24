package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PrecioFinalPresu.
 */
@Entity
@Table(name = "precio_final_presu")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PrecioFinalPresu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "precio_prods")
    private String precioProds;

    @Column(name = "total_sin_iva")
    private Float totalSinIva;

    @Column(name = "iva")
    private Float iva;

    @Column(name = "total_con_iva")
    private Float totalConIva;

    @Column(name = "descuento_porcentaje")
    private Float descuentoPorcentaje;

    @Column(name = "precio_descuento")
    private Float precioDescuento;

    @ManyToOne
    @JsonIgnoreProperties("")
    private PresupuestoPedido presupuestoPedido;

    @ManyToOne
    @JsonIgnoreProperties("")
    private DireccionTiendas direccionTiendas;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrecioProds() {
        return precioProds;
    }

    public PrecioFinalPresu precioProds(String precioProds) {
        this.precioProds = precioProds;
        return this;
    }

    public void setPrecioProds(String precioProds) {
        this.precioProds = precioProds;
    }

    public Float getTotalSinIva() {
        return totalSinIva;
    }

    public PrecioFinalPresu totalSinIva(Float totalSinIva) {
        this.totalSinIva = totalSinIva;
        return this;
    }

    public void setTotalSinIva(Float totalSinIva) {
        this.totalSinIva = totalSinIva;
    }

    public Float getIva() {
        return iva;
    }

    public PrecioFinalPresu iva(Float iva) {
        this.iva = iva;
        return this;
    }

    public void setIva(Float iva) {
        this.iva = iva;
    }

    public Float getTotalConIva() {
        return totalConIva;
    }

    public PrecioFinalPresu totalConIva(Float totalConIva) {
        this.totalConIva = totalConIva;
        return this;
    }

    public void setTotalConIva(Float totalConIva) {
        this.totalConIva = totalConIva;
    }

    public Float getDescuentoPorcentaje() {
        return descuentoPorcentaje;
    }

    public PrecioFinalPresu descuentoPorcentaje(Float descuentoPorcentaje) {
        this.descuentoPorcentaje = descuentoPorcentaje;
        return this;
    }

    public void setDescuentoPorcentaje(Float descuentoPorcentaje) {
        this.descuentoPorcentaje = descuentoPorcentaje;
    }

    public Float getPrecioDescuento() {
        return precioDescuento;
    }

    public PrecioFinalPresu precioDescuento(Float precioDescuento) {
        this.precioDescuento = precioDescuento;
        return this;
    }

    public void setPrecioDescuento(Float precioDescuento) {
        this.precioDescuento = precioDescuento;
    }

    public PresupuestoPedido getPresupuestoPedido() {
        return presupuestoPedido;
    }

    public PrecioFinalPresu presupuestoPedido(PresupuestoPedido presupuestoPedido) {
        this.presupuestoPedido = presupuestoPedido;
        return this;
    }

    public void setPresupuestoPedido(PresupuestoPedido presupuestoPedido) {
        this.presupuestoPedido = presupuestoPedido;
    }

    public DireccionTiendas getDireccionTiendas() {
        return direccionTiendas;
    }

    public PrecioFinalPresu direccionTiendas(DireccionTiendas direccionTiendas) {
        this.direccionTiendas = direccionTiendas;
        return this;
    }

    public void setDireccionTiendas(DireccionTiendas direccionTiendas) {
        this.direccionTiendas = direccionTiendas;
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
        PrecioFinalPresu precioFinalPresu = (PrecioFinalPresu) o;
        if (precioFinalPresu.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), precioFinalPresu.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PrecioFinalPresu{" +
            "id=" + getId() +
            ", precioProds='" + getPrecioProds() + "'" +
            ", totalSinIva=" + getTotalSinIva() +
            ", iva=" + getIva() +
            ", totalConIva=" + getTotalConIva() +
            ", descuentoPorcentaje=" + getDescuentoPorcentaje() +
            ", precioDescuento=" + getPrecioDescuento() +
            "}";
    }
}
