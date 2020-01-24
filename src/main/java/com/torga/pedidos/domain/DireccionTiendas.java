package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DireccionTiendas.
 */
@Entity
@Table(name = "direccion_tiendas")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DireccionTiendas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero")
    private Float numero;

    @Column(name = "cod_postal")
    private Float codPostal;

    @Column(name = "direccion")
    private String direccion;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Provincias provincias;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Municipios municipios;

    @ManyToOne
    @JsonIgnoreProperties("")
    private DatosUsuario datosUsuario;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getNumero() {
        return numero;
    }

    public DireccionTiendas numero(Float numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(Float numero) {
        this.numero = numero;
    }

    public Float getCodPostal() {
        return codPostal;
    }

    public DireccionTiendas codPostal(Float codPostal) {
        this.codPostal = codPostal;
        return this;
    }

    public void setCodPostal(Float codPostal) {
        this.codPostal = codPostal;
    }

    public String getDireccion() {
        return direccion;
    }

    public DireccionTiendas direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Provincias getProvincias() {
        return provincias;
    }

    public DireccionTiendas provincias(Provincias provincias) {
        this.provincias = provincias;
        return this;
    }

    public void setProvincias(Provincias provincias) {
        this.provincias = provincias;
    }

    public Municipios getMunicipios() {
        return municipios;
    }

    public DireccionTiendas municipios(Municipios municipios) {
        this.municipios = municipios;
        return this;
    }

    public void setMunicipios(Municipios municipios) {
        this.municipios = municipios;
    }

    public DatosUsuario getDatosUsuario() {
        return datosUsuario;
    }

    public DireccionTiendas datosUsuario(DatosUsuario datosUsuario) {
        this.datosUsuario = datosUsuario;
        return this;
    }

    public void setDatosUsuario(DatosUsuario datosUsuario) {
        this.datosUsuario = datosUsuario;
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
        DireccionTiendas direccionTiendas = (DireccionTiendas) o;
        if (direccionTiendas.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), direccionTiendas.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DireccionTiendas{" +
            "id=" + getId() +
            ", numero=" + getNumero() +
            ", codPostal=" + getCodPostal() +
            ", direccion='" + getDireccion() + "'" +
            "}";
    }
}
