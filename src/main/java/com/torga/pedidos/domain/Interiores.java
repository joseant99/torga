package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Interiores.
 */
@Entity
@Table(name = "interiores")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Interiores implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @Lob
    @Column(name = "imagen", nullable = false)
    private byte[] imagen;

    @Column(name = "imagen_content_type", nullable = false)
    private String imagenContentType;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private ProductosDormitorio productosDormitorio;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private DimensionesProductoTipo dimensionesProductoTipo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public Interiores imagen(byte[] imagen) {
        this.imagen = imagen;
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return imagenContentType;
    }

    public Interiores imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public ProductosDormitorio getProductosDormitorio() {
        return productosDormitorio;
    }

    public Interiores productosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
        return this;
    }

    public void setProductosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
    }

    public DimensionesProductoTipo getDimensionesProductoTipo() {
        return dimensionesProductoTipo;
    }

    public Interiores dimensionesProductoTipo(DimensionesProductoTipo dimensionesProductoTipo) {
        this.dimensionesProductoTipo = dimensionesProductoTipo;
        return this;
    }

    public void setDimensionesProductoTipo(DimensionesProductoTipo dimensionesProductoTipo) {
        this.dimensionesProductoTipo = dimensionesProductoTipo;
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
        Interiores interiores = (Interiores) o;
        if (interiores.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), interiores.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Interiores{" +
            "id=" + getId() +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            "}";
    }
}
