package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A AcabadosComposicion.
 */
@Entity
@Table(name = "acabados_composicion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AcabadosComposicion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("acabadosComposicions")
    private ProductosComposicion productosComposicion;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Acabados acabados;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductosComposicion getProductosComposicion() {
        return productosComposicion;
    }

    public AcabadosComposicion productosComposicion(ProductosComposicion productosComposicion) {
        this.productosComposicion = productosComposicion;
        return this;
    }

    public void setProductosComposicion(ProductosComposicion productosComposicion) {
        this.productosComposicion = productosComposicion;
    }

    public Acabados getAcabados() {
        return acabados;
    }

    public AcabadosComposicion acabados(Acabados acabados) {
        this.acabados = acabados;
        return this;
    }

    public void setAcabados(Acabados acabados) {
        this.acabados = acabados;
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
        AcabadosComposicion acabadosComposicion = (AcabadosComposicion) o;
        if (acabadosComposicion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), acabadosComposicion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AcabadosComposicion{" +
            "id=" + getId() +
            "}";
    }
}
