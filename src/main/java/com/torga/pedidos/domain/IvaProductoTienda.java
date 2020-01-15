package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A IvaProductoTienda.
 */
@Entity
@Table(name = "iva_producto_tienda")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IvaProductoTienda implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "iva")
    private Float iva;

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

    public Float getIva() {
        return iva;
    }

    public IvaProductoTienda iva(Float iva) {
        this.iva = iva;
        return this;
    }

    public void setIva(Float iva) {
        this.iva = iva;
    }

    public DatosUsuario getDatosUsuario() {
        return datosUsuario;
    }

    public IvaProductoTienda datosUsuario(DatosUsuario datosUsuario) {
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
        IvaProductoTienda ivaProductoTienda = (IvaProductoTienda) o;
        if (ivaProductoTienda.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ivaProductoTienda.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IvaProductoTienda{" +
            "id=" + getId() +
            ", iva=" + getIva() +
            "}";
    }
}
