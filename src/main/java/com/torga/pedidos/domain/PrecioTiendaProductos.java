package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PrecioTiendaProductos.
 */
@Entity
@Table(name = "precio_tienda_productos")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PrecioTiendaProductos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "porcentaje")
    private Float porcentaje;

    @ManyToOne
    @JsonIgnoreProperties("")
    private ProductosDormitorio productosDormitorio;

    @ManyToOne
    @JsonIgnoreProperties("")
    private DatosUsuario datosUsuario;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getPorcentaje() {
        return porcentaje;
    }

    public PrecioTiendaProductos porcentaje(Float porcentaje) {
        this.porcentaje = porcentaje;
        return this;
    }

    public void setPorcentaje(Float porcentaje) {
        this.porcentaje = porcentaje;
    }

    public ProductosDormitorio getProductosDormitorio() {
        return productosDormitorio;
    }

    public PrecioTiendaProductos productosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
        return this;
    }

    public void setProductosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
    }

    public DatosUsuario getDatosUsuario() {
        return datosUsuario;
    }

    public PrecioTiendaProductos datosUsuario(DatosUsuario datosUsuario) {
        this.datosUsuario = datosUsuario;
        return this;
    }

    public void setDatosUsuario(DatosUsuario datosUsuario) {
        this.datosUsuario = datosUsuario;
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
        PrecioTiendaProductos precioTiendaProductos = (PrecioTiendaProductos) o;
        if (precioTiendaProductos.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), precioTiendaProductos.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PrecioTiendaProductos{" +
            "id=" + getId() +
            ", porcentaje=" + getPorcentaje() +
            "}";
    }
}
