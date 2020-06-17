package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Enmarcados.
 */
@Entity
@Table(name = "enmarcados")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Enmarcados implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "precio")
    private Float precio;

    @Column(name = "ancho_min")
    private Float anchoMin;

    @Column(name = "ancho_max")
    private Float anchoMax;

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

    public Enmarcados codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Float getPrecio() {
        return precio;
    }

    public Enmarcados precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public Float getAnchoMin() {
        return anchoMin;
    }

    public Enmarcados anchoMin(Float anchoMin) {
        this.anchoMin = anchoMin;
        return this;
    }

    public void setAnchoMin(Float anchoMin) {
        this.anchoMin = anchoMin;
    }

    public Float getAnchoMax() {
        return anchoMax;
    }

    public Enmarcados anchoMax(Float anchoMax) {
        this.anchoMax = anchoMax;
        return this;
    }

    public void setAnchoMax(Float anchoMax) {
        this.anchoMax = anchoMax;
    }

    public Armario getArmario() {
        return armario;
    }

    public Enmarcados armario(Armario armario) {
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
        Enmarcados enmarcados = (Enmarcados) o;
        if (enmarcados.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), enmarcados.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Enmarcados{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", precio=" + getPrecio() +
            ", anchoMin=" + getAnchoMin() +
            ", anchoMax=" + getAnchoMax() +
            "}";
    }
}
