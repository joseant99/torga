package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Armario.
 */
@Entity
@Table(name = "armario")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Armario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "mensaje")
    private String mensaje;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @Column(name = "numero_puertas")
    private Float numeroPuertas;

    @Column(name = "ancho_min")
    private Float anchoMin;

    @Column(name = "ancho_max")
    private Float anchoMax;

    @Column(name = "num_costado")
    private Float numCostado;

    @ManyToOne
    @JsonIgnoreProperties("")
    private ProductosDormitorio productosDormitorio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMensaje() {
        return mensaje;
    }

    public Armario mensaje(String mensaje) {
        this.mensaje = mensaje;
        return this;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public Armario imagen(byte[] imagen) {
        this.imagen = imagen;
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return imagenContentType;
    }

    public Armario imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public Float getNumeroPuertas() {
        return numeroPuertas;
    }

    public Armario numeroPuertas(Float numeroPuertas) {
        this.numeroPuertas = numeroPuertas;
        return this;
    }

    public void setNumeroPuertas(Float numeroPuertas) {
        this.numeroPuertas = numeroPuertas;
    }

    public Float getAnchoMin() {
        return anchoMin;
    }

    public Armario anchoMin(Float anchoMin) {
        this.anchoMin = anchoMin;
        return this;
    }

    public void setAnchoMin(Float anchoMin) {
        this.anchoMin = anchoMin;
    }

    public Float getAnchoMax() {
        return anchoMax;
    }

    public Armario anchoMax(Float anchoMax) {
        this.anchoMax = anchoMax;
        return this;
    }

    public void setAnchoMax(Float anchoMax) {
        this.anchoMax = anchoMax;
    }

    public Float getNumCostado() {
        return numCostado;
    }

    public Armario numCostado(Float numCostado) {
        this.numCostado = numCostado;
        return this;
    }

    public void setNumCostado(Float numCostado) {
        this.numCostado = numCostado;
    }

    public ProductosDormitorio getProductosDormitorio() {
        return productosDormitorio;
    }

    public Armario productosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
        return this;
    }

    public void setProductosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
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
        Armario armario = (Armario) o;
        if (armario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), armario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Armario{" +
            "id=" + getId() +
            ", mensaje='" + getMensaje() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            ", numeroPuertas=" + getNumeroPuertas() +
            ", anchoMin=" + getAnchoMin() +
            ", anchoMax=" + getAnchoMax() +
            ", numCostado=" + getNumCostado() +
            "}";
    }
}
