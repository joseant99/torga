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
 * A Estados.
 */
@Entity
@Table(name = "estados")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Estados implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "estado_pedido", nullable = false)
    private String estadoPedido;

    @OneToMany(mappedBy = "estados")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Logistica> logisticas = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEstadoPedido() {
        return estadoPedido;
    }

    public Estados estadoPedido(String estadoPedido) {
        this.estadoPedido = estadoPedido;
        return this;
    }

    public void setEstadoPedido(String estadoPedido) {
        this.estadoPedido = estadoPedido;
    }

    public Set<Logistica> getLogisticas() {
        return logisticas;
    }

    public Estados logisticas(Set<Logistica> logisticas) {
        this.logisticas = logisticas;
        return this;
    }

    public Estados addLogistica(Logistica logistica) {
        this.logisticas.add(logistica);
        logistica.setEstados(this);
        return this;
    }

    public Estados removeLogistica(Logistica logistica) {
        this.logisticas.remove(logistica);
        logistica.setEstados(null);
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
        Estados estados = (Estados) o;
        if (estados.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), estados.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Estados{" +
            "id=" + getId() +
            ", estadoPedido='" + getEstadoPedido() + "'" +
            "}";
    }
}
