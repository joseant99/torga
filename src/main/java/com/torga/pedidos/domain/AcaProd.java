package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A AcaProd.
 */
@Entity
@Table(name = "aca_prod")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AcaProd implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @NotNull
    @JoinTable(name = "aca_prod_acabados",
               joinColumns = @JoinColumn(name = "aca_prods_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "acabados_id", referencedColumnName = "id"))
    private Set<Acabados> acabados = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private ProductosDormitorio productosDormitorio;

    @ManyToOne
    @JsonIgnoreProperties("")
    private TipoProducto tipoProducto;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public AcaProd imagen(byte[] imagen) {
        this.imagen = imagen;
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return imagenContentType;
    }

    public AcaProd imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public Set<Acabados> getAcabados() {
        return acabados;
    }

    public AcaProd acabados(Set<Acabados> acabados) {
        this.acabados = acabados;
        return this;
    }

    public AcaProd addAcabados(Acabados acabados) {
        this.acabados.add(acabados);
        ((@NotNull Set<Acabados>) acabados).addAll((Collection<? extends Acabados>) this);
        return this;
    }

    public AcaProd removeAcabados(Acabados acabados) {
        this.acabados.remove(acabados);
        ((@NotNull Set<Acabados>) acabados).remove(this);
        return this;
    }

    public void setAcabados(Set<Acabados> acabados) {
        this.acabados = acabados;
    }

    public ProductosDormitorio getProductosDormitorio() {
        return productosDormitorio;
    }

    public AcaProd productosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
        return this;
    }

    public void setProductosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
    }

    public TipoProducto getTipoProducto() {
        return tipoProducto;
    }

    public AcaProd tipoProducto(TipoProducto tipoProducto) {
        this.tipoProducto = tipoProducto;
        return this;
    }

    public void setTipoProducto(TipoProducto tipoProducto) {
        this.tipoProducto = tipoProducto;
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
        AcaProd acaProd = (AcaProd) o;
        if (acaProd.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), acaProd.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AcaProd{" +
            "id=" + getId() +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            "}";
    }
}