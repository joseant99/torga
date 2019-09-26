package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PrecioTienda.
 */
@Entity
@Table(name = "precio_tienda")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PrecioTienda implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "precio")
    private Float precio;

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

    public Float getPrecio() {
        return precio;
    }

    public PrecioTienda precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public DatosUsuario getDatosUsuario() {
        return datosUsuario;
    }

    public PrecioTienda datosUsuario(DatosUsuario datosUsuario) {
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
        PrecioTienda precioTienda = (PrecioTienda) o;
        if (precioTienda.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), precioTienda.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PrecioTienda{" +
            "id=" + getId() +
            ", precio=" + getPrecio() +
            "}";
    }
}
