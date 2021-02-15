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
    private String codPostal;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "provincias")
    private String provincias;

    @Column(name = "municipios")
    private String municipios;
    
    
    
    @Column(name = "tipo")
    private String tipo;
    
    @Column(name = "nombre")
    private String nombre;
    
    @Column(name = "tipo_dir")
    private String tipoDir;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "web")
    private String web;
    
    @Column(name = "fijo")
    private String fijo;
    
    @Column(name = "movil")
    private String movil;
    
    @Column(name = "fax")
    private String fax;
    
    @Column(name = "principal")
    private String principal;
    
    @Column(name = "observaciones")
    private String observaciones;
    
    @Column(name = "transportista")
    private String transportista;

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
    
    public String getTipo() {
        return tipo;
    }

    public DireccionTiendas tipo(String tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    
    public String getNombre() {
        return nombre;
    }

    public DireccionTiendas nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getTipoDir() {
        return tipoDir;
    }

    public DireccionTiendas tipoDir(String tipoDir) {
        this.tipoDir = tipoDir;
        return this;
    }

    public void setTipoDir(String tipoDir) {
        this.tipoDir = tipoDir;
    }
    
    public String getEmail() {
        return email;
    }

    public DireccionTiendas email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getWeb() {
        return web;
    }

    public DireccionTiendas web(String web) {
        this.web = web;
        return this;
    }

    public void setWeb(String web) {
        this.web = web;
    }
    
    public String getFijo() {
        return fijo;
    }

    public DireccionTiendas fijo(String fijo) {
        this.fijo = fijo;
        return this;
    }

    public void setFijo(String fijo) {
        this.fijo = fijo;
    }
    
    public String getMovil() {
        return movil;
    }

    public DireccionTiendas movil(String movil) {
        this.movil = movil;
        return this;
    }

    public void setMovil(String movil) {
        this.movil = movil;
    }
    
    public String getFax() {
        return fax;
    }

    public DireccionTiendas fax(String fax) {
        this.fax = fax;
        return this;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }
    
    public String getPrincipal() {
        return principal;
    }

    public DireccionTiendas principal(String principal) {
        this.principal = principal;
        return this;
    }

    public void setPrincipal(String principal) {
        this.principal = principal;
    }
    
    public String getObservaciones() {
        return observaciones;
    }

    public DireccionTiendas observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
    
    public String getTransportista() {
        return transportista;
    }

    public DireccionTiendas transportista(String transportista) {
        this.transportista = transportista;
        return this;
    }

    public void setTransportista(String transportista) {
        this.transportista = transportista;
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

    public String getCodPostal() {
        return codPostal;
    }

    public DireccionTiendas codPostal(String defaultCodPostal) {
        this.codPostal = defaultCodPostal;
        return this;
    }

    public void setCodPostal(String codPostal) {
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

    public String getProvincias() {
        return provincias;
    }

    public DireccionTiendas provincias(String provincias) {
        this.provincias = provincias;
        return this;
    }

    public void setProvincias(String provincias) {
        this.provincias = provincias;
    }
    
    public String getMunicipios() {
        return municipios;
    }

    public DireccionTiendas municipios(String municipios) {
        this.municipios = municipios;
        return this;
    }

    public void setMunicipios(String municipios) {
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
