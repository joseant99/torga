package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PresupuestoArmarioPuertas.
 */
@Entity
@Table(name = "presupuesto_armario_puertas")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PresupuestoArmarioPuertas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "precio")
    private Float precio;
    
    @Column(name = "orden")
    private Float orden;
    
    @Column(name = "terminacion")
    private String terminacion;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Acabados acabados;
    
    @ManyToOne
    @JsonIgnoreProperties("")
    private Acabados acabados1;
    
    @ManyToOne
    @JsonIgnoreProperties("")
    private Acabados acabados2;
    
    @ManyToOne
    @JsonIgnoreProperties("")
    private Acabados acabados3;
    
    @ManyToOne
    @JsonIgnoreProperties("")
    private Acabados acabados4;

    @ManyToOne
    @JsonIgnoreProperties("")
    private ProductosDormitorio productosDormitorio;

    @ManyToOne
    @JsonIgnoreProperties("")
    private PresupuestoArmario presupuestoArmario;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getPrecio() {
        return precio;
    }

    public PresupuestoArmarioPuertas precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }
    
    public Float getOrden() {
        return orden;
    }

    public PresupuestoArmarioPuertas orden(Float orden) {
        this.orden = orden;
        return this;
    }

    public void setOrden(Float orden) {
        this.orden = orden;
    }

    public Acabados getAcabados() {
        return acabados;
    }

    public PresupuestoArmarioPuertas acabados(Acabados acabados) {
        this.acabados = acabados;
        return this;
    }

    public void setAcabados(Acabados acabados) {
        this.acabados = acabados;
    }
    
    public String getTerminacion() {
        return terminacion;
    }

    public PresupuestoArmarioPuertas terminacion(String terminacion) {
        this.terminacion = terminacion;
        return this;
    }

    public void setTerminacion(String terminacion) {
        this.terminacion = terminacion;
    }
    
    public Acabados getAcabados1() {
        return acabados1;
    }

    public PresupuestoArmarioPuertas acabados1(Acabados acabados1) {
        this.acabados1 = acabados1;
        return this;
    }

    public void setAcabados1(Acabados acabados1) {
        this.acabados1 = acabados1;
    }
    
    public Acabados getAcabados2() {
        return acabados2;
    }

    public PresupuestoArmarioPuertas acabados2(Acabados acabados2) {
        this.acabados2 = acabados2;
        return this;
    }

    public void setAcabados2(Acabados acabados2) {
        this.acabados2 = acabados2;
    }
    
    public Acabados getAcabados3() {
        return acabados3;
    }

    public PresupuestoArmarioPuertas acabados3(Acabados acabados3) {
        this.acabados3 = acabados3;
        return this;
    }

    public void setAcabados3(Acabados acabados3) {
        this.acabados3 = acabados3;
    }
    
    public Acabados getAcabados4() {
        return acabados4;
    }

    public PresupuestoArmarioPuertas acabados4(Acabados acabados4) {
        this.acabados4 = acabados4;
        return this;
    }

    public void setAcabados4(Acabados acabados4) {
        this.acabados4 = acabados4;
    }

    public ProductosDormitorio getProductosDormitorio() {
        return productosDormitorio;
    }

    public PresupuestoArmarioPuertas productosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
        return this;
    }

    public void setProductosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
    }

    public PresupuestoArmario getPresupuestoArmario() {
        return presupuestoArmario;
    }

    public PresupuestoArmarioPuertas presupuestoArmario(PresupuestoArmario presupuestoArmario) {
        this.presupuestoArmario = presupuestoArmario;
        return this;
    }

    public void setPresupuestoArmario(PresupuestoArmario presupuestoArmario) {
        this.presupuestoArmario = presupuestoArmario;
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
        PresupuestoArmarioPuertas presupuestoArmarioPuertas = (PresupuestoArmarioPuertas) o;
        if (presupuestoArmarioPuertas.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), presupuestoArmarioPuertas.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PresupuestoArmarioPuertas{" +
            "id=" + getId() +
            ", precio=" + getPrecio() +
            "}";
    }
}
