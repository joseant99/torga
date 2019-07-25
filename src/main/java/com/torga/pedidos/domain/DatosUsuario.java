package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DatosUsuario.
 */
@Entity
@Table(name = "datos_usuario")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DatosUsuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_completo")
    private String nombreCompleto;

    @Column(name = "email")
    private String email;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "nombre_comercial")
    private String nombreComercial;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "cod_postal")
    private String codPostal;

    @Lob
    @Column(name = "logo")
    private byte[] logo;

    @Column(name = "logo_content_type")
    private String logoContentType;

    @Column(name = "cif")
    private String cif;

    @Column(name = "nombre_fiscal")
    private String nombreFiscal;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Provincias provincias;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Municipios municipios;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public DatosUsuario nombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
        return this;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public String getEmail() {
        return email;
    }

    public DatosUsuario email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public DatosUsuario telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getNombreComercial() {
        return nombreComercial;
    }

    public DatosUsuario nombreComercial(String nombreComercial) {
        this.nombreComercial = nombreComercial;
        return this;
    }

    public void setNombreComercial(String nombreComercial) {
        this.nombreComercial = nombreComercial;
    }

    public String getDireccion() {
        return direccion;
    }

    public DatosUsuario direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getCodPostal() {
        return codPostal;
    }

    public DatosUsuario codPostal(String codPostal) {
        this.codPostal = codPostal;
        return this;
    }

    public void setCodPostal(String codPostal) {
        this.codPostal = codPostal;
    }

    public byte[] getLogo() {
        return logo;
    }

    public DatosUsuario logo(byte[] logo) {
        this.logo = logo;
        return this;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getLogoContentType() {
        return logoContentType;
    }

    public DatosUsuario logoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
        return this;
    }

    public void setLogoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
    }

    public String getCif() {
        return cif;
    }

    public DatosUsuario cif(String cif) {
        this.cif = cif;
        return this;
    }

    public void setCif(String cif) {
        this.cif = cif;
    }

    public String getNombreFiscal() {
        return nombreFiscal;
    }

    public DatosUsuario nombreFiscal(String nombreFiscal) {
        this.nombreFiscal = nombreFiscal;
        return this;
    }

    public void setNombreFiscal(String nombreFiscal) {
        this.nombreFiscal = nombreFiscal;
    }

    public Provincias getProvincias() {
        return provincias;
    }

    public DatosUsuario provincias(Provincias provincias) {
        this.provincias = provincias;
        return this;
    }

    public void setProvincias(Provincias provincias) {
        this.provincias = provincias;
    }

    public Municipios getMunicipios() {
        return municipios;
    }

    public DatosUsuario municipios(Municipios municipios) {
        this.municipios = municipios;
        return this;
    }

    public void setMunicipios(Municipios municipios) {
        this.municipios = municipios;
    }

    public User getUser() {
        return user;
    }

    public DatosUsuario user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
        DatosUsuario datosUsuario = (DatosUsuario) o;
        if (datosUsuario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), datosUsuario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DatosUsuario{" +
            "id=" + getId() +
            ", nombreCompleto='" + getNombreCompleto() + "'" +
            ", email='" + getEmail() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", nombreComercial='" + getNombreComercial() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", codPostal='" + getCodPostal() + "'" +
            ", logo='" + getLogo() + "'" +
            ", logoContentType='" + getLogoContentType() + "'" +
            ", cif='" + getCif() + "'" +
            ", nombreFiscal='" + getNombreFiscal() + "'" +
            "}";
    }
}
