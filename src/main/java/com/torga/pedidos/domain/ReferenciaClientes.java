package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ReferenciaClientes.
 */
@Entity
@Table(name = "referencia_clientes")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ReferenciaClientes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "referencia_cliente", nullable = false)
    private String referenciaCliente;

    @OneToMany(mappedBy = "referenciaclientes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Pedidos> pedidos = new HashSet<>();
    @OneToMany(mappedBy = "referenciaclientes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Logistica> logisticas = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("referenciaclientes")
    private Cliente cliente;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReferenciaCliente() {
        return referenciaCliente;
    }

    public ReferenciaClientes referenciaCliente(String referenciaCliente) {
        this.referenciaCliente = referenciaCliente;
        return this;
    }

    public void setReferenciaCliente(String referenciaCliente) {
        this.referenciaCliente = referenciaCliente;
    }

    public Set<Pedidos> getPedidos() {
        return pedidos;
    }

    public ReferenciaClientes pedidos(Set<Pedidos> pedidos) {
        this.pedidos = pedidos;
        return this;
    }

    public ReferenciaClientes addPedidos(Pedidos pedidos) {
        this.pedidos.add(pedidos);
        pedidos.setReferenciaclientes(this);
        return this;
    }

    public ReferenciaClientes removePedidos(Pedidos pedidos) {
        this.pedidos.remove(pedidos);
        pedidos.setReferenciaclientes(null);
        return this;
    }

    public void setPedidos(Set<Pedidos> pedidos) {
        this.pedidos = pedidos;
    }

    public Set<Logistica> getLogisticas() {
        return logisticas;
    }

    public ReferenciaClientes logisticas(Set<Logistica> logisticas) {
        this.logisticas = logisticas;
        return this;
    }

    public ReferenciaClientes addLogistica(Logistica logistica) {
        this.logisticas.add(logistica);
        logistica.setReferenciaclientes(this);
        return this;
    }

    public ReferenciaClientes removeLogistica(Logistica logistica) {
        this.logisticas.remove(logistica);
        logistica.setReferenciaclientes(null);
        return this;
    }

    public void setLogisticas(Set<Logistica> logisticas) {
        this.logisticas = logisticas;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public ReferenciaClientes cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
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
        ReferenciaClientes referenciaClientes = (ReferenciaClientes) o;
        if (referenciaClientes.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), referenciaClientes.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReferenciaClientes{" +
            "id=" + getId() +
            ", referenciaCliente='" + getReferenciaCliente() + "'" +
            "}";
    }
}
