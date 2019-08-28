package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A IluminacionProdPrePed.
 */
@Entity
@Table(name = "iluminacion_prod_pre_ped")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IluminacionProdPrePed implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("")
    private ProductosPresupuestoPedidos productosPresupuestoPedidos;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Iluminacion iluminacion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductosPresupuestoPedidos getProductosPresupuestoPedidos() {
        return productosPresupuestoPedidos;
    }

    public IluminacionProdPrePed productosPresupuestoPedidos(ProductosPresupuestoPedidos productosPresupuestoPedidos) {
        this.productosPresupuestoPedidos = productosPresupuestoPedidos;
        return this;
    }

    public void setProductosPresupuestoPedidos(ProductosPresupuestoPedidos productosPresupuestoPedidos) {
        this.productosPresupuestoPedidos = productosPresupuestoPedidos;
    }

    public Iluminacion getIluminacion() {
        return iluminacion;
    }

    public IluminacionProdPrePed iluminacion(Iluminacion iluminacion) {
        this.iluminacion = iluminacion;
        return this;
    }

    public void setIluminacion(Iluminacion iluminacion) {
        this.iluminacion = iluminacion;
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
        IluminacionProdPrePed iluminacionProdPrePed = (IluminacionProdPrePed) o;
        if (iluminacionProdPrePed.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), iluminacionProdPrePed.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IluminacionProdPrePed{" +
            "id=" + getId() +
            "}";
    }
}
