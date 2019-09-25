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
 * A ProductosDormitorio.
 */
@Entity
@Table(name = "productos_dormitorio")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProductosDormitorio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    
    @Lob
    @Column(name = "imagen", nullable = false)
    private byte[] imagen;

    @Column(name = "imagen_content_type", nullable = false)
    private String imagenContentType;

    @ManyToOne
    @JsonIgnoreProperties("")
    private CategoriasDormi categoriasDormi;

    @ManyToMany(mappedBy = "puertasProductos")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Puertas> puertas = new HashSet<>();

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

    public ProductosDormitorio nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public ProductosDormitorio imagen(byte[] imagen) {
        this.imagen = imagen;
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return imagenContentType;
    }

    public ProductosDormitorio imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public CategoriasDormi getCategoriasDormi() {
        return categoriasDormi;
    }

    public ProductosDormitorio categoriasDormi(CategoriasDormi categoriasDormi) {
        this.categoriasDormi = categoriasDormi;
        return this;
    }

    public void setCategoriasDormi(CategoriasDormi categoriasDormi) {
        this.categoriasDormi = categoriasDormi;
    }

    public Set<Puertas> getPuertas() {
        return puertas;
    }

    public ProductosDormitorio puertas(Set<Puertas> puertas) {
        this.puertas = puertas;
        return this;
    }

    public ProductosDormitorio addPuertas(Puertas puertas) {
        this.puertas.add(puertas);
        puertas.getPuertasProductos().add(this);
        return this;
    }

    public ProductosDormitorio removePuertas(Puertas puertas) {
        this.puertas.remove(puertas);
        puertas.getPuertasProductos().remove(this);
        return this;
    }

    public void setPuertas(Set<Puertas> puertas) {
        this.puertas = puertas;
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
        ProductosDormitorio productosDormitorio = (ProductosDormitorio) o;
        if (productosDormitorio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productosDormitorio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductosDormitorio{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            "}";
    }
}
