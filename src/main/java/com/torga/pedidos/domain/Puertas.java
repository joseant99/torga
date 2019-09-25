package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Puertas.
 */
@Entity
@Table(name = "puertas")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Puertas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @ManyToOne
    @JsonIgnoreProperties("")
    private ProductosDormitorio productosDormitorio;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "puertas_puertas_productos",
               joinColumns = @JoinColumn(name = "puertas_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "puertas_productos_id", referencedColumnName = "id"))
    private Set<ProductosDormitorio> puertasProductos = new HashSet<>();

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

    public Puertas nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public Puertas imagen(byte[] imagen) {
        this.imagen = imagen;
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return imagenContentType;
    }

    public Puertas imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public ProductosDormitorio getProductosDormitorio() {
        return productosDormitorio;
    }

    public Puertas productosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
        return this;
    }

    public void setProductosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
    }

    public Set<ProductosDormitorio> getPuertasProductos() {
        return puertasProductos;
    }

    public Puertas puertasProductos(Set<ProductosDormitorio> productosDormitorios) {
        this.puertasProductos = productosDormitorios;
        return this;
    }

    public Puertas addPuertasProductos(ProductosDormitorio productosDormitorio) {
        this.puertasProductos.add(productosDormitorio);
        productosDormitorio.getPuertas().add(this);
        return this;
    }

    public Puertas removePuertasProductos(ProductosDormitorio productosDormitorio) {
        this.puertasProductos.remove(productosDormitorio);
        productosDormitorio.getPuertas().remove(this);
        return this;
    }

    public void setPuertasProductos(Set<ProductosDormitorio> productosDormitorios) {
        this.puertasProductos = productosDormitorios;
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
        Puertas puertas = (Puertas) o;
        if (puertas.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), puertas.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Puertas{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            "}";
    }
}
