package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Pedidos.
 */
@Entity
@Table(name = "pedidos")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Pedidos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "num_pedido", nullable = false)
    private String numPedido;

    @Column(name = "factura")
    private String factura;

    @Column(name = "confirmacion")
    private String confirmacion;

    @Column(name = "importe")
    private Float importe;

    @OneToOne    @JoinColumn(unique = true)
    private Logistica logistica;

    @ManyToOne
    @JsonIgnoreProperties("pedidos")
    private ReferenciaClientes referenciaclientes;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumPedido() {
        return numPedido;
    }

    public Pedidos numPedido(String numPedido) {
        this.numPedido = numPedido;
        return this;
    }

    public void setNumPedido(String numPedido) {
        this.numPedido = numPedido;
    }

    public String getFactura() {
        return factura;
    }

    public Pedidos factura(String factura) {
        this.factura = factura;
        return this;
    }

    public void setFactura(String factura) {
        this.factura = factura;
    }

    public String getConfirmacion() {
        return confirmacion;
    }

    public Pedidos confirmacion(String confirmacion) {
        this.confirmacion = confirmacion;
        return this;
    }

    public void setConfirmacion(String confirmacion) {
        this.confirmacion = confirmacion;
    }

    public Float getImporte() {
        return importe;
    }

    public Pedidos importe(Float importe) {
        this.importe = importe;
        return this;
    }

    public void setImporte(Float importe) {
        this.importe = importe;
    }

    public Logistica getLogistica() {
        return logistica;
    }

    public Pedidos logistica(Logistica logistica) {
        this.logistica = logistica;
        return this;
    }

    public void setLogistica(Logistica logistica) {
        this.logistica = logistica;
    }

    public ReferenciaClientes getReferenciaclientes() {
        return referenciaclientes;
    }

    public Pedidos referenciaclientes(ReferenciaClientes referenciaClientes) {
        this.referenciaclientes = referenciaClientes;
        return this;
    }

    public void setReferenciaclientes(ReferenciaClientes referenciaClientes) {
        this.referenciaclientes = referenciaClientes;
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
        Pedidos pedidos = (Pedidos) o;
        if (pedidos.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pedidos.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pedidos{" +
            "id=" + getId() +
            ", numPedido='" + getNumPedido() + "'" +
            ", factura='" + getFactura() + "'" +
            ", confirmacion='" + getConfirmacion() + "'" +
            ", importe=" + getImporte() + " ref_clientes= " + getReferenciaclientes() +
            "}";
    }
}
