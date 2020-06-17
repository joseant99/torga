package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Niveladores.
 */
@Entity
@Table(name = "niveladores")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Niveladores implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "precio")
    private Float precio;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Armario armario;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public Niveladores codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Float getPrecio() {
        return precio;
    }

    public Niveladores precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public Armario getArmario() {
        return armario;
    }

    public Niveladores armario(Armario armario) {
        this.armario = armario;
        return this;
    }

    public void setArmario(Armario armario) {
        this.armario = armario;
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
        Niveladores niveladores = (Niveladores) o;
        if (niveladores.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), niveladores.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Niveladores{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", precio=" + getPrecio() +
            "}";
    }
}
