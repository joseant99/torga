package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A InterioresArmarioNuevos.
 */
@Entity
@Table(name = "interiores_armario_nuevos")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class InterioresArmarioNuevos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "ancho")
    private Float ancho;

    @Column(name = "precio")
    private Float precio;

    @Column(name = "luz")
    private Float luz;

    @Column(name = "a")
    private Float a;

    @Column(name = "b")
    private Float b;

    @Column(name = "c")
    private Float c;

    @Column(name = "d")
    private Float d;

    @Column(name = "e")
    private Float e;

    @Column(name = "piloto")
    private Float piloto;

    @ManyToOne
    @JsonIgnoreProperties("")
    private ProductosDormitorio productosDormitorio;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Armario armario;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Casco casco;

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

    public InterioresArmarioNuevos nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Float getAncho() {
        return ancho;
    }

    public InterioresArmarioNuevos ancho(Float ancho) {
        this.ancho = ancho;
        return this;
    }

    public void setAncho(Float ancho) {
        this.ancho = ancho;
    }

    public Float getPrecio() {
        return precio;
    }

    public InterioresArmarioNuevos precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public Float getLuz() {
        return luz;
    }

    public InterioresArmarioNuevos luz(Float luz) {
        this.luz = luz;
        return this;
    }

    public void setLuz(Float luz) {
        this.luz = luz;
    }

    public Float getA() {
        return a;
    }

    public InterioresArmarioNuevos a(Float a) {
        this.a = a;
        return this;
    }

    public void setA(Float a) {
        this.a = a;
    }

    public Float getB() {
        return b;
    }

    public InterioresArmarioNuevos b(Float b) {
        this.b = b;
        return this;
    }

    public void setB(Float b) {
        this.b = b;
    }

    public Float getC() {
        return c;
    }

    public InterioresArmarioNuevos c(Float c) {
        this.c = c;
        return this;
    }

    public void setC(Float c) {
        this.c = c;
    }

    public Float getD() {
        return d;
    }

    public InterioresArmarioNuevos d(Float d) {
        this.d = d;
        return this;
    }

    public void setD(Float d) {
        this.d = d;
    }

    public Float getE() {
        return e;
    }

    public InterioresArmarioNuevos e(Float e) {
        this.e = e;
        return this;
    }

    public void setE(Float e) {
        this.e = e;
    }

    public Float getPiloto() {
        return piloto;
    }

    public InterioresArmarioNuevos piloto(Float piloto) {
        this.piloto = piloto;
        return this;
    }

    public void setPiloto(Float piloto) {
        this.piloto = piloto;
    }

    public ProductosDormitorio getProductosDormitorio() {
        return productosDormitorio;
    }

    public InterioresArmarioNuevos productosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
        return this;
    }

    public void setProductosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
    }

    public Armario getArmario() {
        return armario;
    }

    public InterioresArmarioNuevos armario(Armario armario) {
        this.armario = armario;
        return this;
    }

    public void setArmario(Armario armario) {
        this.armario = armario;
    }

    public Casco getCasco() {
        return casco;
    }

    public InterioresArmarioNuevos casco(Casco casco) {
        this.casco = casco;
        return this;
    }

    public void setCasco(Casco casco) {
        this.casco = casco;
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
        InterioresArmarioNuevos interioresArmarioNuevos = (InterioresArmarioNuevos) o;
        if (interioresArmarioNuevos.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), interioresArmarioNuevos.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InterioresArmarioNuevos{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", ancho=" + getAncho() +
            ", precio=" + getPrecio() +
            ", luz=" + getLuz() +
            ", a=" + getA() +
            ", b=" + getB() +
            ", c=" + getC() +
            ", d=" + getD() +
            ", e=" + getE() +
            ", piloto=" + getPiloto() +
            "}";
    }
}
