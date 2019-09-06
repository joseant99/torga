package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A PagosTorgaTiendas.
 */
@Entity
@Table(name = "pagos_torga_tiendas")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PagosTorgaTiendas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "grupo")
    private String grupo;

    @ManyToOne
    @JsonIgnoreProperties("")
    private DatosUsuario datosUsuario;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "pagos_torga_tiendas_pagos_tienda",
               joinColumns = @JoinColumn(name = "pagos_torga_tiendas_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "pagos_tiendas_id", referencedColumnName = "id"))
    private Set<PagosTienda> pagosTiendas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGrupo() {
        return grupo;
    }

    public PagosTorgaTiendas grupo(String grupo) {
        this.grupo = grupo;
        return this;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }

    public DatosUsuario getDatosUsuario() {
        return datosUsuario;
    }

    public PagosTorgaTiendas datosUsuario(DatosUsuario datosUsuario) {
        this.datosUsuario = datosUsuario;
        return this;
    }

    public void setDatosUsuario(DatosUsuario datosUsuario) {
        this.datosUsuario = datosUsuario;
    }

    public Set<PagosTienda> getPagosTiendas() {
        return pagosTiendas;
    }

    public PagosTorgaTiendas pagosTiendas(Set<PagosTienda> pagosTiendas) {
        this.pagosTiendas = pagosTiendas;
        return this;
    }

    public PagosTorgaTiendas addPagosTienda(PagosTienda pagosTienda) {
        this.pagosTiendas.add(pagosTienda);
        pagosTienda.getPagosTorgaTiendas().add((PagosTorgaTiendas) this);
        return this;
    }

    public PagosTorgaTiendas removePagosTienda(PagosTienda pagosTienda) {
        this.pagosTiendas.remove(pagosTienda);
        pagosTienda.getPagosTorgaTiendas().remove(this);
        return this;
    }

    public void setPagosTiendas(Set<PagosTienda> pagosTiendas) {
        this.pagosTiendas = pagosTiendas;
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
        PagosTorgaTiendas pagosTorgaTiendas = (PagosTorgaTiendas) o;
        if (pagosTorgaTiendas.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pagosTorgaTiendas.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PagosTorgaTiendas{" +
            "id=" + getId() +
            ", grupo='" + getGrupo() + "'" +
            "}";
    }
}
