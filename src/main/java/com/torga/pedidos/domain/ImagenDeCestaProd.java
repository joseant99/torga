package com.torga.pedidos.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ImagenDeCestaProd.
 */
@Entity
@Table(name = "imagen_de_cesta_prod")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ImagenDeCestaProd implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "imagen")
    private String imagen;
    
    @Column(name = "nombre")
    private String nombre;
    
    @Column(name = "nombre_cesta")
    private String nombreCesta;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImagen() {
        return imagen;
    }

    public ImagenDeCestaProd imagen(String imagen) {
        this.imagen = imagen;
        return this;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }
    
    public String getNombre() {
        return nombre;
    }

    public ImagenDeCestaProd nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getNombreCesta() {
        return nombreCesta;
    }

    public ImagenDeCestaProd nombreCesta(String nombreCesta) {
        this.nombreCesta = nombreCesta;
        return this;
    }

    public void setNombreCesta(String nombreCesta) {
        this.nombreCesta = nombreCesta;
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
        ImagenDeCestaProd imagenDeCestaProd = (ImagenDeCestaProd) o;
        if (imagenDeCestaProd.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), imagenDeCestaProd.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ImagenDeCestaProd{" +
            "id=" + getId() +
            ", imagen='" + getImagen() + "'" +
            "}";
    }
}
