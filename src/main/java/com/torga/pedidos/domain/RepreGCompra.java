package com.torga.pedidos.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A RepreGCompra.
 */
@Entity
@Table(name = "repregcompra")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RepreGCompra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "cif")
    private String cif;

    @Column(name = "activo")
    private Boolean activo;

    @Column(name = "f_alta")
    private String fAlta;

    @Column(name = "f_baja")
    private String fBaja;

    @Column(name = "comision")
    private Float comision;

    @Column(name = "dto_1")
    private Float dto1;

    @Column(name = "com_1")
    private Float com1;

    @Column(name = "dto_2")
    private Float dto2;

    @Column(name = "com_2")
    private Float com2;

    @Column(name = "dto_3")
    private Float dto3;

    @Column(name = "com_3")
    private Float com3;

    @Column(name = "dto_4")
    private Float dto4;

    @Column(name = "com_4")
    private Float com4;

    @Column(name = "dto_5")
    private Float dto5;

    @Column(name = "com_5")
    private Float com5;

    @Column(name = "dto_grupo")
    private Float dtoGrupo;

    @Column(name = "cta_contable")
    private Float ctaContable;

    @Column(name = "observaciones")
    private String observaciones;

    @Column(name = "ap_iva")
    private Boolean apIva;

    @Column(name = "ap_req")
    private Boolean apReq;

    @Column(name = "tipo_iva")
    private Float tipoIva;

    @Column(name = "retencion")
    private Float retencion;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "cp")
    private Float cp;

    @Column(name = "poblacion")
    private String poblacion;

    @Column(name = "provincia")
    private String provincia;

    @Column(name = "zona")
    private String zona;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "email")
    private String email;

    @Column(name = "web")
    private String web;

    @Column(name = "objetivos")
    private Float objetivos;

    @Column(name = "fijo")
    private Float fijo;

    @Column(name = "movil")
    private Float movil;

    @Column(name = "fax")
    private String fax;

    @Column(name = "codigo")
    private Float codigo;

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

    public RepreGCompra nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCif() {
        return cif;
    }

    public RepreGCompra cif(String cif) {
        this.cif = cif;
        return this;
    }

    public void setCif(String cif) {
        this.cif = cif;
    }

    public Boolean isActivo() {
        return activo;
    }

    public RepreGCompra activo(Boolean activo) {
        this.activo = activo;
        return this;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public String getfAlta() {
        return fAlta;
    }

    public RepreGCompra fAlta(String fAlta) {
        this.fAlta = fAlta;
        return this;
    }

    public void setfAlta(String fAlta) {
        this.fAlta = fAlta;
    }

    public String getfBaja() {
        return fBaja;
    }

    public RepreGCompra fBaja(String fBaja) {
        this.fBaja = fBaja;
        return this;
    }

    public void setfBaja(String fBaja) {
        this.fBaja = fBaja;
    }

    public Float getComision() {
        return comision;
    }

    public RepreGCompra comision(Float comision) {
        this.comision = comision;
        return this;
    }

    public void setComision(Float comision) {
        this.comision = comision;
    }

    public Float getDto1() {
        return dto1;
    }

    public RepreGCompra dto1(Float dto1) {
        this.dto1 = dto1;
        return this;
    }

    public void setDto1(Float dto1) {
        this.dto1 = dto1;
    }

    public Float getCom1() {
        return com1;
    }

    public RepreGCompra com1(Float com1) {
        this.com1 = com1;
        return this;
    }

    public void setCom1(Float com1) {
        this.com1 = com1;
    }

    public Float getDto2() {
        return dto2;
    }

    public RepreGCompra dto2(Float dto2) {
        this.dto2 = dto2;
        return this;
    }

    public void setDto2(Float dto2) {
        this.dto2 = dto2;
    }

    public Float getCom2() {
        return com2;
    }

    public RepreGCompra com2(Float com2) {
        this.com2 = com2;
        return this;
    }

    public void setCom2(Float com2) {
        this.com2 = com2;
    }

    public Float getDto3() {
        return dto3;
    }

    public RepreGCompra dto3(Float dto3) {
        this.dto3 = dto3;
        return this;
    }

    public void setDto3(Float dto3) {
        this.dto3 = dto3;
    }

    public Float getCom3() {
        return com3;
    }

    public RepreGCompra com3(Float com3) {
        this.com3 = com3;
        return this;
    }

    public void setCom3(Float com3) {
        this.com3 = com3;
    }

    public Float getDto4() {
        return dto4;
    }

    public RepreGCompra dto4(Float dto4) {
        this.dto4 = dto4;
        return this;
    }

    public void setDto4(Float dto4) {
        this.dto4 = dto4;
    }

    public Float getCom4() {
        return com4;
    }

    public RepreGCompra com4(Float com4) {
        this.com4 = com4;
        return this;
    }

    public void setCom4(Float com4) {
        this.com4 = com4;
    }

    public Float getDto5() {
        return dto5;
    }

    public RepreGCompra dto5(Float dto5) {
        this.dto5 = dto5;
        return this;
    }

    public void setDto5(Float dto5) {
        this.dto5 = dto5;
    }

    public Float getCom5() {
        return com5;
    }

    public RepreGCompra com5(Float com5) {
        this.com5 = com5;
        return this;
    }

    public void setCom5(Float com5) {
        this.com5 = com5;
    }

    public Float getDtoGrupo() {
        return dtoGrupo;
    }

    public RepreGCompra dtoGrupo(Float dtoGrupo) {
        this.dtoGrupo = dtoGrupo;
        return this;
    }

    public void setDtoGrupo(Float dtoGrupo) {
        this.dtoGrupo = dtoGrupo;
    }

    public Float getCtaContable() {
        return ctaContable;
    }

    public RepreGCompra ctaContable(Float ctaContable) {
        this.ctaContable = ctaContable;
        return this;
    }

    public void setCtaContable(Float ctaContable) {
        this.ctaContable = ctaContable;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public RepreGCompra observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Boolean isApIva() {
        return apIva;
    }

    public RepreGCompra apIva(Boolean apIva) {
        this.apIva = apIva;
        return this;
    }

    public void setApIva(Boolean apIva) {
        this.apIva = apIva;
    }

    public Boolean isApReq() {
        return apReq;
    }

    public RepreGCompra apReq(Boolean apReq) {
        this.apReq = apReq;
        return this;
    }

    public void setApReq(Boolean apReq) {
        this.apReq = apReq;
    }

    public Float getTipoIva() {
        return tipoIva;
    }

    public RepreGCompra tipoIva(Float tipoIva) {
        this.tipoIva = tipoIva;
        return this;
    }

    public void setTipoIva(Float tipoIva) {
        this.tipoIva = tipoIva;
    }

    public Float getRetencion() {
        return retencion;
    }

    public RepreGCompra retencion(Float retencion) {
        this.retencion = retencion;
        return this;
    }

    public void setRetencion(Float retencion) {
        this.retencion = retencion;
    }

    public String getDireccion() {
        return direccion;
    }

    public RepreGCompra direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Float getCp() {
        return cp;
    }

    public RepreGCompra cp(Float cp) {
        this.cp = cp;
        return this;
    }

    public void setCp(Float cp) {
        this.cp = cp;
    }

    public String getPoblacion() {
        return poblacion;
    }

    public RepreGCompra poblacion(String poblacion) {
        this.poblacion = poblacion;
        return this;
    }

    public void setPoblacion(String poblacion) {
        this.poblacion = poblacion;
    }

    public String getProvincia() {
        return provincia;
    }

    public RepreGCompra provincia(String provincia) {
        this.provincia = provincia;
        return this;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getZona() {
        return zona;
    }

    public RepreGCompra zona(String zona) {
        this.zona = zona;
        return this;
    }

    public void setZona(String zona) {
        this.zona = zona;
    }

    public String getTipo() {
        return tipo;
    }

    public RepreGCompra tipo(String tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getEmail() {
        return email;
    }

    public RepreGCompra email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWeb() {
        return web;
    }

    public RepreGCompra web(String web) {
        this.web = web;
        return this;
    }

    public void setWeb(String web) {
        this.web = web;
    }

    public Float getObjetivos() {
        return objetivos;
    }

    public RepreGCompra objetivos(Float objetivos) {
        this.objetivos = objetivos;
        return this;
    }

    public void setObjetivos(Float objetivos) {
        this.objetivos = objetivos;
    }

    public Float getFijo() {
        return fijo;
    }

    public RepreGCompra fijo(Float fijo) {
        this.fijo = fijo;
        return this;
    }

    public void setFijo(Float fijo) {
        this.fijo = fijo;
    }

    public Float getMovil() {
        return movil;
    }

    public RepreGCompra movil(Float movil) {
        this.movil = movil;
        return this;
    }

    public void setMovil(Float movil) {
        this.movil = movil;
    }

    public String getFax() {
        return fax;
    }

    public RepreGCompra fax(String fax) {
        this.fax = fax;
        return this;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public Float getCodigo() {
        return codigo;
    }

    public RepreGCompra codigo(Float codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(Float codigo) {
        this.codigo = codigo;
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
        RepreGCompra repreGCompra = (RepreGCompra) o;
        if (repreGCompra.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), repreGCompra.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RepreGCompra{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", cif='" + getCif() + "'" +
            ", activo='" + isActivo() + "'" +
            ", fAlta='" + getfAlta() + "'" +
            ", fBaja='" + getfBaja() + "'" +
            ", comision=" + getComision() +
            ", dto1=" + getDto1() +
            ", com1=" + getCom1() +
            ", dto2=" + getDto2() +
            ", com2=" + getCom2() +
            ", dto3=" + getDto3() +
            ", com3=" + getCom3() +
            ", dto4=" + getDto4() +
            ", com4=" + getCom4() +
            ", dto5=" + getDto5() +
            ", com5=" + getCom5() +
            ", dtoGrupo=" + getDtoGrupo() +
            ", ctaContable=" + getCtaContable() +
            ", observaciones='" + getObservaciones() + "'" +
            ", apIva='" + isApIva() + "'" +
            ", apReq='" + isApReq() + "'" +
            ", tipoIva=" + getTipoIva() +
            ", retencion=" + getRetencion() +
            ", direccion='" + getDireccion() + "'" +
            ", cp=" + getCp() +
            ", poblacion='" + getPoblacion() + "'" +
            ", provincia='" + getProvincia() + "'" +
            ", zona='" + getZona() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", email='" + getEmail() + "'" +
            ", web='" + getWeb() + "'" +
            ", objetivos=" + getObjetivos() +
            ", fijo=" + getFijo() +
            ", movil=" + getMovil() +
            ", fax='" + getFax() + "'" +
            ", codigo=" + getCodigo() +
            "}";
    }
}
