package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PagosTienda.
 */
@Entity
@Table(name = "pagos_tienda")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PagosTienda implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pago")
    private String pago;

    @Column(name = "descuento")
    private String descuento;

    @Column(name = "precio_tienda")
    private Float precioTienda;

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

    public String getPago() {
        return pago;
    }

    public PagosTienda pago(String pago) {
        this.pago = pago;
        return this;
    }

    public void setPago(String pago) {
        this.pago = pago;
    }

    public String getDescuento() {
        return descuento;
    }

    public PagosTienda descuento(String descuento) {
        this.descuento = descuento;
        return this;
    }

    public void setDescuento(String descuento) {
        this.descuento = descuento;
    }

    public Float getPrecioTienda() {
        return precioTienda;
    }

    public PagosTienda precioTienda(Float precioTienda) {
        this.precioTienda = precioTienda;
        return this;
    }

    public void setPrecioTienda(Float precioTienda) {
        this.precioTienda = precioTienda;
    }

    public DatosUsuario getDatosUsuario() {
        return datosUsuario;
    }

    public PagosTienda datosUsuario(DatosUsuario datosUsuario) {
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
        PagosTienda pagosTienda = (PagosTienda) o;
        if (pagosTienda.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pagosTienda.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PagosTienda{" +
            "id=" + getId() +
            ", pago='" + getPago() + "'" +
            ", descuento='" + getDescuento() + "'" +
            ", precioTienda=" + getPrecioTienda() +
            "}";
    }
}
