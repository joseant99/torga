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
 * A Acabados.
 */
@Entity
@Table(name = "acabados")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Acabados implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotNull
    @Column(name = "precio", nullable = false)
    private Float precio;
 
    
    @Lob
    @Column(name = "imagen_fondo", nullable = false)
    private byte[] imagenFondo;

    @Column(name = "imagen_fondo_content_type", nullable = false)
    private String imagenFondoContentType;

    @ManyToMany(mappedBy = "acabados")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<AcaProd> acaProds = new HashSet<>();

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

    public Acabados nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Float getPrecio() {
        return precio;
    }

    public Acabados precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public byte[] getImagenFondo() {
        return imagenFondo;
    }

    public Acabados imagenFondo(byte[] imagenFondo) {
        this.imagenFondo = imagenFondo;
        return this;
    }

    public void setImagenFondo(byte[] imagenFondo) {
        this.imagenFondo = imagenFondo;
    }

    public String getImagenFondoContentType() {
        return imagenFondoContentType;
    }

    public Acabados imagenFondoContentType(String imagenFondoContentType) {
        this.imagenFondoContentType = imagenFondoContentType;
        return this;
    }

    public void setImagenFondoContentType(String imagenFondoContentType) {
        this.imagenFondoContentType = imagenFondoContentType;
    }

    public Set<AcaProd> getAcaProds() {
        return acaProds;
    }

    public Acabados acaProds(Set<AcaProd> acaProds) {
        this.acaProds = acaProds;
        return this;
    }

    public Acabados addAcaProd(AcaProd acaProd) {
        this.acaProds.add(acaProd);
        acaProd.getAcabados().add(this);
        return this;
    }

    public Acabados removeAcaProd(AcaProd acaProd) {
        this.acaProds.remove(acaProd);
        acaProd.getAcabados().remove(this);
        return this;
    }

    public void setAcaProds(Set<AcaProd> acaProds) {
        this.acaProds = acaProds;
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
        Acabados acabados = (Acabados) o;
        if (acabados.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), acabados.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Acabados{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", precio=" + getPrecio() +
            ", imagenFondo='" + getImagenFondo() + "'" +
            ", imagenFondoContentType='" + getImagenFondoContentType() + "'" +
            "}";
    }
}
