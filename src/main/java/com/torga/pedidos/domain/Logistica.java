package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Logistica.
 */
@Entity
@Table(name = "logistica")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Logistica implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "num_pedido", nullable = false)
    private String numPedido;

    @Column(name = "ruta")
    private String ruta;

    @Column(name = "carro")
    private String carro;

    @Column(name = "fecha_entrega")
    private LocalDate fechaEntrega;

    @Column(name = "fecha_pedido")
    private LocalDate fechaPedido;

    @OneToOne(mappedBy = "logistica")
    @JsonIgnore
    private Pedidos pedidos;

    @ManyToOne
    @JsonIgnoreProperties("logisticas")
    private ReferenciaClientes referenciaclientes;

    @ManyToOne
    @JsonIgnoreProperties("logisticas")
    private Estados estados;

    @ManyToOne
    @JsonIgnoreProperties("logisticas")
    private Transportistas transportistas;

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

    public Logistica numPedido(String numPedido) {
        this.numPedido = numPedido;
        return this;
    }

    public void setNumPedido(String numPedido) {
        this.numPedido = numPedido;
    }

    public String getRuta() {
        return ruta;
    }

    public Logistica ruta(String ruta) {
        this.ruta = ruta;
        return this;
    }

    public void setRuta(String ruta) {
        this.ruta = ruta;
    }

    public String getCarro() {
        return carro;
    }

    public Logistica carro(String carro) {
        this.carro = carro;
        return this;
    }

    public void setCarro(String carro) {
        this.carro = carro;
    }

    public LocalDate getFechaEntrega() {
        return fechaEntrega;
    }

    public Logistica fechaEntrega(LocalDate fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
        return this;
    }

    public void setFechaEntrega(LocalDate fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    public LocalDate getFechaPedido() {
        return fechaPedido;
    }

    public Logistica fechaPedido(LocalDate fechaPedido) {
        this.fechaPedido = fechaPedido;
        return this;
    }

    public void setFechaPedido(LocalDate fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public Pedidos getPedidos() {
        return pedidos;
    }

    public Logistica pedidos(Pedidos pedidos) {
        this.pedidos = pedidos;
        return this;
    }

    public void setPedidos(Pedidos pedidos) {
        this.pedidos = pedidos;
    }

    public ReferenciaClientes getReferenciaclientes() {
        return referenciaclientes;
    }

    public Logistica referenciaclientes(ReferenciaClientes referenciaClientes) {
        this.referenciaclientes = referenciaClientes;
        return this;
    }

    public void setReferenciaclientes(ReferenciaClientes referenciaClientes) {
        this.referenciaclientes = referenciaClientes;
    }

    public Estados getEstados() {
        return estados;
    }

    public Logistica estados(Estados estados) {
        this.estados = estados;
        return this;
    }

    public void setEstados(Estados estados) {
        this.estados = estados;
    }

    public Transportistas getTransportistas() {
        return transportistas;
    }

    public Logistica transportistas(Transportistas transportistas) {
        this.transportistas = transportistas;
        return this;
    }

    public void setTransportistas(Transportistas transportistas) {
        this.transportistas = transportistas;
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
        Logistica logistica = (Logistica) o;
        if (logistica.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), logistica.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Logistica{" +
            "id=" + getId() +
            ", numPedido='" + getNumPedido() + "'" +
            ", ruta='" + getRuta() + "'" +
            ", carro='" + getCarro() + "'" +
            ", fechaEntrega='" + getFechaEntrega() + "'" +
            ", fechaPedido='" + getFechaPedido() + "'" +
            "}";
    }
}
