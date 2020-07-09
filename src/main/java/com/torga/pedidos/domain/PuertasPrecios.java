package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PuertasPrecios.
 */
@Entity
@Table(name = "puertas_precios")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PuertasPrecios implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ancho")
    private Float ancho;

    @Column(name = "alto")
    private Float alto;

    @Column(name = "precio")
    private Float precio;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "puerta_1")
    private Float puerta1;

    @Column(name = "puerta_2")
    private Float puerta2;

    @Column(name = "puerta_3")
    private Float puerta3;

    @Column(name = "puerta_4")
    private Float puerta4;

    @Column(name = "puerta_5")
    private Float puerta5;

    @Column(name = "puerta_6")
    private Float puerta6;

    @Column(name = "puerta_7")
    private Float puerta7;

    @Column(name = "puerta_8")
    private Float puerta8;

    @ManyToOne
    @JsonIgnoreProperties("")
    private ProductosDormitorio productosDormitorio;

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

    public Float getAncho() {
        return ancho;
    }

    public PuertasPrecios ancho(Float ancho) {
        this.ancho = ancho;
        return this;
    }

    public void setAncho(Float ancho) {
        this.ancho = ancho;
    }

    public Float getAlto() {
        return alto;
    }

    public PuertasPrecios alto(Float alto) {
        this.alto = alto;
        return this;
    }

    public void setAlto(Float alto) {
        this.alto = alto;
    }

    public Float getPrecio() {
        return precio;
    }

    public PuertasPrecios precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public String getTipo() {
        return tipo;
    }

    public PuertasPrecios tipo(String tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Float getPuerta1() {
        return puerta1;
    }

    public PuertasPrecios puerta1(Float puerta1) {
        this.puerta1 = puerta1;
        return this;
    }

    public void setPuerta1(Float puerta1) {
        this.puerta1 = puerta1;
    }

    public Float getPuerta2() {
        return puerta2;
    }

    public PuertasPrecios puerta2(Float puerta2) {
        this.puerta2 = puerta2;
        return this;
    }

    public void setPuerta2(Float puerta2) {
        this.puerta2 = puerta2;
    }

    public Float getPuerta3() {
        return puerta3;
    }

    public PuertasPrecios puerta3(Float puerta3) {
        this.puerta3 = puerta3;
        return this;
    }

    public void setPuerta3(Float puerta3) {
        this.puerta3 = puerta3;
    }

    public Float getPuerta4() {
        return puerta4;
    }

    public PuertasPrecios puerta4(Float puerta4) {
        this.puerta4 = puerta4;
        return this;
    }

    public void setPuerta4(Float puerta4) {
        this.puerta4 = puerta4;
    }

    public Float getPuerta5() {
        return puerta5;
    }

    public PuertasPrecios puerta5(Float puerta5) {
        this.puerta5 = puerta5;
        return this;
    }

    public void setPuerta5(Float puerta5) {
        this.puerta5 = puerta5;
    }

    public Float getPuerta6() {
        return puerta6;
    }

    public PuertasPrecios puerta6(Float puerta6) {
        this.puerta6 = puerta6;
        return this;
    }

    public void setPuerta6(Float puerta6) {
        this.puerta6 = puerta6;
    }

    public Float getPuerta7() {
        return puerta7;
    }

    public PuertasPrecios puerta7(Float puerta7) {
        this.puerta7 = puerta7;
        return this;
    }

    public void setPuerta7(Float puerta7) {
        this.puerta7 = puerta7;
    }

    public Float getPuerta8() {
        return puerta8;
    }

    public PuertasPrecios puerta8(Float puerta8) {
        this.puerta8 = puerta8;
        return this;
    }

    public void setPuerta8(Float puerta8) {
        this.puerta8 = puerta8;
    }

    public ProductosDormitorio getProductosDormitorio() {
        return productosDormitorio;
    }

    public PuertasPrecios productosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
        return this;
    }

    public void setProductosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
    }

    public Casco getCasco() {
        return casco;
    }

    public PuertasPrecios casco(Casco casco) {
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
        PuertasPrecios puertasPrecios = (PuertasPrecios) o;
        if (puertasPrecios.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), puertasPrecios.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PuertasPrecios{" +
            "id=" + getId() +
            ", ancho=" + getAncho() +
            ", alto=" + getAlto() +
            ", precio=" + getPrecio() +
            ", tipo='" + getTipo() + "'" +
            ", puerta1=" + getPuerta1() +
            ", puerta2=" + getPuerta2() +
            ", puerta3=" + getPuerta3() +
            ", puerta4=" + getPuerta4() +
            ", puerta5=" + getPuerta5() +
            ", puerta6=" + getPuerta6() +
            ", puerta7=" + getPuerta7() +
            ", puerta8=" + getPuerta8() +
            "}";
    }
}
