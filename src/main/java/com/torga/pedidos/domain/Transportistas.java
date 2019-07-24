package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Transportistas.
 */
@Entity
@Table(name = "transportistas")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Transportistas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "transportista_pedido", nullable = false)
    private String transportistaPedido;

    @OneToMany(mappedBy = "transportistas")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Logistica> logisticas = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransportistaPedido() {
        return transportistaPedido;
    }

    public Transportistas transportistaPedido(String transportistaPedido) {
        this.transportistaPedido = transportistaPedido;
        return this;
    }

    public void setTransportistaPedido(String transportistaPedido) {
        this.transportistaPedido = transportistaPedido;
    }

    public Set<Logistica> getLogisticas() {
        return logisticas;
    }

    public Transportistas logisticas(Set<Logistica> logisticas) {
        this.logisticas = logisticas;
        return this;
    }

    public Transportistas addLogistica(Logistica logistica) {
        this.logisticas.add(logistica);
        logistica.setTransportistas(this);
        return this;
    }

    public Transportistas removeLogistica(Logistica logistica) {
        this.logisticas.remove(logistica);
        logistica.setTransportistas(null);
        return this;
    }

    public void setLogisticas(Set<Logistica> logisticas) {
        this.logisticas = logisticas;
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
        Transportistas transportistas = (Transportistas) o;
        if (transportistas.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transportistas.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Transportistas{" +
            "id=" + getId() +
            ", transportistaPedido='" + getTransportistaPedido() + "'" +
            "}";
    }
}
