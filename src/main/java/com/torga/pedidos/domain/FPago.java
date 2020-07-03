package com.torga.pedidos.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A FPago.
 */
@Entity
@Table(name = "fpago")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FPago implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "vencimientos")
    private String vencimientos;

    @Column(name = "d_1")
    private Float d1;

    @Column(name = "d_2")
    private Float d2;

    @Column(name = "d_3")
    private Float d3;

    @Column(name = "d_4")
    private Float d4;

    @Column(name = "d_5")
    private Float d5;

    @Column(name = "d_6")
    private Float d6;

    @Column(name = "d_7")
    private Float d7;

    @Column(name = "d_8")
    private Float d8;

    @Column(name = "d_topp")
    private String dTopp;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public FPago descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getVencimientos() {
        return vencimientos;
    }

    public FPago vencimientos(String vencimientos) {
        this.vencimientos = vencimientos;
        return this;
    }

    public void setVencimientos(String vencimientos) {
        this.vencimientos = vencimientos;
    }

    public Float getd1() {
        return d1;
    }

    public FPago d1(Float d1) {
        this.d1 = d1;
        return this;
    }

    public void setd1(Float d1) {
        this.d1 = d1;
    }

    public Float getd2() {
        return d2;
    }

    public FPago d2(Float d2) {
        this.d2 = d2;
        return this;
    }

    public void setd2(Float d2) {
        this.d2 = d2;
    }

    public Float getd3() {
        return d3;
    }

    public FPago d3(Float d3) {
        this.d3 = d3;
        return this;
    }

    public void setd3(Float d3) {
        this.d3 = d3;
    }

    public Float getd4() {
        return d4;
    }

    public FPago d4(Float d4) {
        this.d4 = d4;
        return this;
    }

    public void setd4(Float d4) {
        this.d4 = d4;
    }

    public Float getd5() {
        return d5;
    }

    public FPago d5(Float d5) {
        this.d5 = d5;
        return this;
    }

    public void setd5(Float d5) {
        this.d5 = d5;
    }

    public Float getd6() {
        return d6;
    }

    public FPago d6(Float d6) {
        this.d6 = d6;
        return this;
    }

    public void setd6(Float d6) {
        this.d6 = d6;
    }

    public Float getd7() {
        return d7;
    }

    public FPago d7(Float d7) {
        this.d7 = d7;
        return this;
    }

    public void setd7(Float d7) {
        this.d7 = d7;
    }

    public Float getd8() {
        return d8;
    }

    public FPago d8(Float d8) {
        this.d8 = d8;
        return this;
    }

    public void setd8(Float d8) {
        this.d8 = d8;
    }

    public String getdTopp() {
        return dTopp;
    }

    public FPago dTopp(String dTopp) {
        this.dTopp = dTopp;
        return this;
    }

    public void setdTopp(String dTopp) {
        this.dTopp = dTopp;
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
        FPago fPago = (FPago) o;
        if (fPago.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fPago.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FPago{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", vencimientos='" + getVencimientos() + "'" +
            ", d1=" + getd1() +
            ", d2=" + getd2() +
            ", d3=" + getd3() +
            ", d4=" + getd4() +
            ", d5=" + getd5() +
            ", d6=" + getd6() +
            ", d7=" + getd7() +
            ", d8=" + getd8() +
            ", dTopp='" + getdTopp() + "'" +
            "}";
    }
}
