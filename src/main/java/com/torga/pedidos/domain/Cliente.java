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
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "cod_cliente", nullable = false)
    private String codCliente;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "poblacion")
    private String poblacion;

    @Column(name = "provincia")
    private String provincia;

    @Column(name = "usuario")
    private String usuario;

    @OneToMany(mappedBy = "cliente")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ReferenciaClientes> referenciaclientes = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("clientes")
    private Representante representates;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodCliente() {
        return codCliente;
    }

    public Cliente codCliente(String codCliente) {
        this.codCliente = codCliente;
        return this;
    }

    public void setCodCliente(String codCliente) {
        this.codCliente = codCliente;
    }

    public String getNombre() {
        return nombre;
    }

    public Cliente nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPoblacion() {
        return poblacion;
    }

    public Cliente poblacion(String poblacion) {
        this.poblacion = poblacion;
        return this;
    }

    public void setPoblacion(String poblacion) {
        this.poblacion = poblacion;
    }

    public String getProvincia() {
        return provincia;
    }

    public Cliente provincia(String provincia) {
        this.provincia = provincia;
        return this;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getUsuario() {
        return usuario;
    }

    public Cliente usuario(String usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public Set<ReferenciaClientes> getReferenciaclientes() {
        return referenciaclientes;
    }

    public Cliente referenciaclientes(Set<ReferenciaClientes> referenciaClientes) {
        this.referenciaclientes = referenciaClientes;
        return this;
    }

    public Cliente addReferenciaclientes(ReferenciaClientes referenciaClientes) {
        this.referenciaclientes.add(referenciaClientes);
        referenciaClientes.setCliente(this);
        return this;
    }

    public Cliente removeReferenciaclientes(ReferenciaClientes referenciaClientes) {
        this.referenciaclientes.remove(referenciaClientes);
        referenciaClientes.setCliente(null);
        return this;
    }

    public void setReferenciaclientes(Set<ReferenciaClientes> referenciaClientes) {
        this.referenciaclientes = referenciaClientes;
    }

    public Representante getRepresentates() {
        return representates;
    }

    public Cliente representates(Representante representante) {
        this.representates = representante;
        return this;
    }

    public void setRepresentates(Representante representante) {
        this.representates = representante;
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
        Cliente cliente = (Cliente) o;
        if (cliente.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cliente.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            ", codCliente='" + getCodCliente() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", poblacion='" + getPoblacion() + "'" +
            ", provincia='" + getProvincia() + "'" +
            ", usuario='" + getUsuario() + "'" +
            "}";
    }
}
