package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PresupuestoArmarioInteriores.
 */
@Entity
@Table(name = "presupuesto_armario_interiores")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PresupuestoArmarioInteriores implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "precio")
    private Float precio;

    @Column(name = "orden")
    private Float orden;
    
    @Column(name = "mensaje_luz")
    private String mensajeLuz;
   
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

    public PresupuestoArmarioInteriores precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }
    
    public String getMensajeLuz() {
        return mensajeLuz;
    }

    public PresupuestoArmarioInteriores mensajeLuz(String mensajeLuz) {
        this.mensajeLuz = mensajeLuz;
        return this;
    }

    public void setMensajeLuz(String mensajeLuz) {
        this.mensajeLuz = mensajeLuz;
    }
    
    public Float getOrden() {
        return orden;
    }

    public PresupuestoArmarioInteriores orden(Float orden) {
        this.orden = orden;
        return this;
    }

    public void setOrden(Float orden) {
        this.orden = orden;
    }

    public ProductosDormitorio getProductosDormitorio() {
        return productosDormitorio;
    }

    public PresupuestoArmarioInteriores productosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
        return this;
    }

    public void setProductosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
    }

    public PresupuestoArmario getPresupuestoArmario() {
        return presupuestoArmario;
    }

    public PresupuestoArmarioInteriores presupuestoArmario(PresupuestoArmario presupuestoArmario) {
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
        PresupuestoArmarioInteriores presupuestoArmarioInteriores = (PresupuestoArmarioInteriores) o;
        if (presupuestoArmarioInteriores.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), presupuestoArmarioInteriores.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PresupuestoArmarioInteriores{" +
            "id=" + getId() +
            ", precio=" + getPrecio() +
            "}";
    }
}
