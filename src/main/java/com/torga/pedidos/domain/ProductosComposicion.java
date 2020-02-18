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
 * A ProductosComposicion.
 */
@Entity
@Table(name = "productos_composicion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProductosComposicion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private ProductosDormitorio productosDormitorio;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private DimensionesProductoTipo dimensionesProductoTipo;

    @OneToMany(mappedBy = "productosComposicion")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AcabadosComposicion> acabadosComposicions = new HashSet<>();
    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Composicion composicion;

    @ManyToOne
    @JsonIgnoreProperties("")
    private TipoProducto tipoProducto;

    @ManyToOne
    @JsonIgnoreProperties("")
    private TiposApoyo tiposApoyo;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Iluminacion iluminacion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductosDormitorio getProductosDormitorio() {
        return productosDormitorio;
    }

    public ProductosComposicion productosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
        return this;
    }

    public void setProductosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
    }

    public DimensionesProductoTipo getDimensionesProductoTipo() {
        return dimensionesProductoTipo;
    }

    public ProductosComposicion dimensionesProductoTipo(DimensionesProductoTipo dimensionesProductoTipo) {
        this.dimensionesProductoTipo = dimensionesProductoTipo;
        return this;
    }

    public void setDimensionesProductoTipo(DimensionesProductoTipo dimensionesProductoTipo) {
        this.dimensionesProductoTipo = dimensionesProductoTipo;
    }

    public Set<AcabadosComposicion> getAcabadosComposicions() {
        return acabadosComposicions;
    }

    public ProductosComposicion acabadosComposicions(Set<AcabadosComposicion> acabadosComposicions) {
        this.acabadosComposicions = acabadosComposicions;
        return this;
    }

    public ProductosComposicion addAcabadosComposicion(AcabadosComposicion acabadosComposicion) {
        this.acabadosComposicions.add(acabadosComposicion);
        acabadosComposicion.setProductosComposicion(this);
        return this;
    }

    public ProductosComposicion removeAcabadosComposicion(AcabadosComposicion acabadosComposicion) {
        this.acabadosComposicions.remove(acabadosComposicion);
        acabadosComposicion.setProductosComposicion(null);
        return this;
    }

    public void setAcabadosComposicions(Set<AcabadosComposicion> acabadosComposicions) {
        this.acabadosComposicions = acabadosComposicions;
    }

    public Composicion getComposicion() {
        return composicion;
    }

    public ProductosComposicion composicion(Composicion composicion) {
        this.composicion = composicion;
        return this;
    }

    public void setComposicion(Composicion composicion) {
        this.composicion = composicion;
    }

    public TipoProducto getTipoProducto() {
        return tipoProducto;
    }

    public ProductosComposicion tipoProducto(TipoProducto tipoProducto) {
        this.tipoProducto = tipoProducto;
        return this;
    }

    public void setTipoProducto(TipoProducto tipoProducto) {
        this.tipoProducto = tipoProducto;
    }

    public TiposApoyo getTiposApoyo() {
        return tiposApoyo;
    }

    public ProductosComposicion tiposApoyo(TiposApoyo tiposApoyo) {
        this.tiposApoyo = tiposApoyo;
        return this;
    }

    public void setTiposApoyo(TiposApoyo tiposApoyo) {
        this.tiposApoyo = tiposApoyo;
    }

    public Iluminacion getIluminacion() {
        return iluminacion;
    }

    public ProductosComposicion iluminacion(Iluminacion iluminacion) {
        this.iluminacion = iluminacion;
        return this;
    }

    public void setIluminacion(Iluminacion iluminacion) {
        this.iluminacion = iluminacion;
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
        ProductosComposicion productosComposicion = (ProductosComposicion) o;
        if (productosComposicion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productosComposicion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductosComposicion{" +
            "id=" + getId() +
            "}";
    }
}
