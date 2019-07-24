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
 * A Representante.
 */
@Entity
@Table(name = "representante")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Representante implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "usuario")
    private String usuario;

    @OneToMany(mappedBy = "representates")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Cliente> clientes = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Representante nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getUsuario() {
        return usuario;
    }

    public Representante usuario(String usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public Set<Cliente> getClientes() {
        return clientes;
    }

    public Representante clientes(Set<Cliente> clientes) {
        this.clientes = clientes;
        return this;
    }

    public Representante addCliente(Cliente cliente) {
        this.clientes.add(cliente);
        cliente.setRepresentates(this);
        return this;
    }

    public Representante removeCliente(Cliente cliente) {
        this.clientes.remove(cliente);
        cliente.setRepresentates(null);
        return this;
    }

    public void setClientes(Set<Cliente> clientes) {
        this.clientes = clientes;
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
        Representante representante = (Representante) o;
        if (representante.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), representante.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Representante{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", usuario='" + getUsuario() + "'" +
            "}";
    }
}
