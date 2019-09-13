package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ContactoFabrica.
 */
@Entity
@Table(name = "contacto_fabrica")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ContactoFabrica implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_inicio")
    private String fechaInicio;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "estado")
    private String estado;

    @Column(name = "albaran")
    private String albaran;

    @Column(name = "factura")
    private String factura;

    @Column(name = "codigo")
    private String codigo;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("")
    private PresupuestoPedido presupuestoPedido;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFechaInicio() {
        return fechaInicio;
    }

    public ContactoFabrica fechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
        return this;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getTipo() {
        return tipo;
    }

    public ContactoFabrica tipo(String tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getEstado() {
        return estado;
    }

    public ContactoFabrica estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getAlbaran() {
        return albaran;
    }

    public ContactoFabrica albaran(String albaran) {
        this.albaran = albaran;
        return this;
    }

    public void setAlbaran(String albaran) {
        this.albaran = albaran;
    }

    public String getFactura() {
        return factura;
    }

    public ContactoFabrica factura(String factura) {
        this.factura = factura;
        return this;
    }

    public void setFactura(String factura) {
        this.factura = factura;
    }

    public String getCodigo() {
        return codigo;
    }

    public ContactoFabrica codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public User getUser() {
        return user;
    }

    public ContactoFabrica user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PresupuestoPedido getPresupuestoPedido() {
        return presupuestoPedido;
    }

    public ContactoFabrica presupuestoPedido(PresupuestoPedido presupuestoPedido) {
        this.presupuestoPedido = presupuestoPedido;
        return this;
    }

    public void setPresupuestoPedido(PresupuestoPedido presupuestoPedido) {
        this.presupuestoPedido = presupuestoPedido;
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
        ContactoFabrica contactoFabrica = (ContactoFabrica) o;
        if (contactoFabrica.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contactoFabrica.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ContactoFabrica{" +
            "id=" + getId() +
            ", fechaInicio='" + getFechaInicio() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", estado='" + getEstado() + "'" +
            ", albaran='" + getAlbaran() + "'" +
            ", factura='" + getFactura() + "'" +
            ", codigo='" + getCodigo() + "'" +
            "}";
    }
}
