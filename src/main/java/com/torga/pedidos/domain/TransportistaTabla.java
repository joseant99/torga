package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TransportistaTabla.
 */
@Entity
@Table(name = "transportista_tabla")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TransportistaTabla implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "email")
    private String email;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "nombre_fiscal")
    private String nombreFiscal;

    @Column(name = "cp")
    private Float cp;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Provincias provincias;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Municipios municipios;

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

    public TransportistaTabla nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public TransportistaTabla telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public TransportistaTabla email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDireccion() {
        return direccion;
    }

    public TransportistaTabla direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getNombreFiscal() {
        return nombreFiscal;
    }

    public TransportistaTabla nombreFiscal(String nombreFiscal) {
        this.nombreFiscal = nombreFiscal;
        return this;
    }

    public void setNombreFiscal(String nombreFiscal) {
        this.nombreFiscal = nombreFiscal;
    }

    public Float getCp() {
        return cp;
    }

    public TransportistaTabla cp(Float cp) {
        this.cp = cp;
        return this;
    }

    public void setCp(Float cp) {
        this.cp = cp;
    }

    public Provincias getProvincias() {
        return provincias;
    }

    public TransportistaTabla provincias(Provincias provincias) {
        this.provincias = provincias;
        return this;
    }

    public void setProvincias(Provincias provincias) {
        this.provincias = provincias;
    }

    public Municipios getMunicipios() {
        return municipios;
    }

    public TransportistaTabla municipios(Municipios municipios) {
        this.municipios = municipios;
        return this;
    }

    public void setMunicipios(Municipios municipios) {
        this.municipios = municipios;
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
        TransportistaTabla transportistaTabla = (TransportistaTabla) o;
        if (transportistaTabla.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transportistaTabla.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransportistaTabla{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", email='" + getEmail() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", nombreFiscal='" + getNombreFiscal() + "'" +
            ", cp=" + getCp() +
            "}";
    }
}
