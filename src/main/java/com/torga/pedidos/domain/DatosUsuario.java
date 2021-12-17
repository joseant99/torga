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
    
    @Column(name = "provincia")
    private String provincia;
    
    @Column(name = "municipio")
    private String municipio;

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

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "estado")
    private String estado;

    @Column(name = "f_alta")
    private String fAlta;

    @Column(name = "f_baja")
    private String fBaja;

    @Column(name = "prioridad_carga")
    private Float prioridadCarga;

    @Column(name = "ap_iva")
    private String apIVA;

    @Column(name = "ap_req")
    private String apReq;

    @Column(name = "val_albaran")
    private String valAlbaran;

    @Column(name = "fac_x_albaran")
    private String facXAlbaran;

    @Column(name = "dto_1")
    private Float dto1;

    @Column(name = "dto_2")
    private Float dto2;

    @Column(name = "dto_3")
    private Float dto3;

    @Column(name = "dto_tras")
    private Float dtoTras;

    @Column(name = "id_gc")
    private String idGc;

    @Column(name = "val_pedido")
    private String valPedido;

    @Column(name = "val_puntos")
    private String valPuntos;

    @Column(name = "d_pago_1")
    private Float dPago1;

    @Column(name = "d_pago_2")
    private Float dPago2;

    @Column(name = "d_pago_3")
    private Float dPago3;

    @Column(name = "desde_vaca")
    private String desdeVaca;

    @Column(name = "hasta_vaca")
    private String hastaVaca;

    @Column(name = "web")
    private String web;

    @Column(name = "movil")
    private String movil;

    @Column(name = "fax")
    private String fax;

    @Column(name = "cta_contable")
    private Float ctaContable;

    @Column(name = "observaciones")
    private String observaciones;

    @Column(name = "observaciones_ped")
    private String observacionesPed;

    @Column(name = "observaciones_alb")
    private String observacionesAlb;

    @Column(name = "observaciones_fac")
    private String observacionesFac;

    @Column(name = "no_giro_vaca")
    private String noGiroVaca;

    @Column(name = "observaciones_direccion")
    private String observacionesDireccion;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Provincias provincias;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Municipios municipios;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("")
    private RepreGCompra repreGCompra;

    @ManyToOne
    @JsonIgnoreProperties("")
    private FPago fPago;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Zonas zonas;

    @ManyToOne
    @JsonIgnoreProperties("")
    private TransportistaTabla transportistaTabla;

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
    
    public String getProvincia() {
        return provincia;
    }

    public DatosUsuario provincia(String provincia) {
        this.provincia = provincia;
        return this;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }
    
    public String getMunicipio() {
        return provincia;
    }

    public DatosUsuario municipio(String municipio) {
        this.municipio = municipio;
        return this;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
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

    public String getCodigo() {
        return codigo;
    }

    public DatosUsuario codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getEstado() {
        return estado;
    }

    public DatosUsuario estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getfAlta() {
        return fAlta;
    }

    public DatosUsuario fAlta(String fAlta) {
        this.fAlta = fAlta;
        return this;
    }

    public void setfAlta(String fAlta) {
        this.fAlta = fAlta;
    }

    public String getfBaja() {
        return fBaja;
    }

    public DatosUsuario fBaja(String fBaja) {
        this.fBaja = fBaja;
        return this;
    }

    public void setfBaja(String fBaja) {
        this.fBaja = fBaja;
    }

    public Float getPrioridadCarga() {
        return prioridadCarga;
    }

    public DatosUsuario prioridadCarga(Float prioridadCarga) {
        this.prioridadCarga = prioridadCarga;
        return this;
    }

    public void setPrioridadCarga(Float prioridadCarga) {
        this.prioridadCarga = prioridadCarga;
    }

    public String getApIVA() {
        return apIVA;
    }

    public DatosUsuario apIVA(String apIVA) {
        this.apIVA = apIVA;
        return this;
    }

    public void setApIVA(String apIVA) {
        this.apIVA = apIVA;
    }

    public String getApReq() {
        return apReq;
    }

    public DatosUsuario apReq(String apReq) {
        this.apReq = apReq;
        return this;
    }

    public void setApReq(String apReq) {
        this.apReq = apReq;
    }

    public String getValAlbaran() {
        return valAlbaran;
    }

    public DatosUsuario valAlbaran(String valAlbaran) {
        this.valAlbaran = valAlbaran;
        return this;
    }

    public void setValAlbaran(String valAlbaran) {
        this.valAlbaran = valAlbaran;
    }

    public String getFacXAlbaran() {
        return facXAlbaran;
    }

    public DatosUsuario facXAlbaran(String facXAlbaran) {
        this.facXAlbaran = facXAlbaran;
        return this;
    }

    public void setFacXAlbaran(String facXAlbaran) {
        this.facXAlbaran = facXAlbaran;
    }

    public Float getDto1() {
        return dto1;
    }

    public DatosUsuario dto1(Float dto1) {
        this.dto1 = dto1;
        return this;
    }

    public void setDto1(Float dto1) {
        this.dto1 = dto1;
    }

    public Float getDto2() {
        return dto2;
    }

    public DatosUsuario dto2(Float dto2) {
        this.dto2 = dto2;
        return this;
    }

    public void setDto2(Float dto2) {
        this.dto2 = dto2;
    }

    public Float getDto3() {
        return dto3;
    }

    public DatosUsuario dto3(Float dto3) {
        this.dto3 = dto3;
        return this;
    }

    public void setDto3(Float dto3) {
        this.dto3 = dto3;
    }

    public Float getDtoTras() {
        return dtoTras;
    }

    public DatosUsuario dtoTras(Float dtoTras) {
        this.dtoTras = dtoTras;
        return this;
    }

    public void setDtoTras(Float dtoTras) {
        this.dtoTras = dtoTras;
    }

    public String getIdGc() {
        return idGc;
    }

    public DatosUsuario idGc(String idGc) {
        this.idGc = idGc;
        return this;
    }

    public void setIdGc(String idGc) {
        this.idGc = idGc;
    }

    public String getValPedido() {
        return valPedido;
    }

    public DatosUsuario valPedido(String valPedido) {
        this.valPedido = valPedido;
        return this;
    }

    public void setValPedido(String valPedido) {
        this.valPedido = valPedido;
    }

    public String getValPuntos() {
        return valPuntos;
    }

    public DatosUsuario valPuntos(String valPuntos) {
        this.valPuntos = valPuntos;
        return this;
    }

    public void setValPuntos(String valPuntos) {
        this.valPuntos = valPuntos;
    }

    public Float getdPago1() {
        return dPago1;
    }

    public DatosUsuario dPago1(Float dPago1) {
        this.dPago1 = dPago1;
        return this;
    }

    public void setdPago1(Float dPago1) {
        this.dPago1 = dPago1;
    }

    public Float getdPago2() {
        return dPago2;
    }

    public DatosUsuario dPago2(Float dPago2) {
        this.dPago2 = dPago2;
        return this;
    }

    public void setdPago2(Float dPago2) {
        this.dPago2 = dPago2;
    }

    public Float getdPago3() {
        return dPago3;
    }

    public DatosUsuario dPago3(Float dPago3) {
        this.dPago3 = dPago3;
        return this;
    }

    public void setdPago3(Float dPago3) {
        this.dPago3 = dPago3;
    }

    public String getDesdeVaca() {
        return desdeVaca;
    }

    public DatosUsuario desdeVaca(String desdeVaca) {
        this.desdeVaca = desdeVaca;
        return this;
    }

    public void setDesdeVaca(String desdeVaca) {
        this.desdeVaca = desdeVaca;
    }

    public String getHastaVaca() {
        return hastaVaca;
    }

    public DatosUsuario hastaVaca(String hastaVaca) {
        this.hastaVaca = hastaVaca;
        return this;
    }

    public void setHastaVaca(String hastaVaca) {
        this.hastaVaca = hastaVaca;
    }

    public String getWeb() {
        return web;
    }

    public DatosUsuario web(String web) {
        this.web = web;
        return this;
    }

    public void setWeb(String web) {
        this.web = web;
    }

    public String getMovil() {
        return movil;
    }

    public DatosUsuario movil(String movil) {
        this.movil = movil;
        return this;
    }

    public void setMovil(String movil) {
        this.movil = movil;
    }

    public String getFax() {
        return fax;
    }

    public DatosUsuario fax(String fax) {
        this.fax = fax;
        return this;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public Float getCtaContable() {
        return ctaContable;
    }

    public DatosUsuario ctaContable(Float ctaContable) {
        this.ctaContable = ctaContable;
        return this;
    }

    public void setCtaContable(Float ctaContable) {
        this.ctaContable = ctaContable;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public DatosUsuario observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public String getObservacionesPed() {
        return observacionesPed;
    }

    public DatosUsuario observacionesPed(String observacionesPed) {
        this.observacionesPed = observacionesPed;
        return this;
    }

    public void setObservacionesPed(String observacionesPed) {
        this.observacionesPed = observacionesPed;
    }

    public String getObservacionesAlb() {
        return observacionesAlb;
    }

    public DatosUsuario observacionesAlb(String observacionesAlb) {
        this.observacionesAlb = observacionesAlb;
        return this;
    }

    public void setObservacionesAlb(String observacionesAlb) {
        this.observacionesAlb = observacionesAlb;
    }

    public String getObservacionesFac() {
        return observacionesFac;
    }

    public DatosUsuario observacionesFac(String observacionesFac) {
        this.observacionesFac = observacionesFac;
        return this;
    }

    public void setObservacionesFac(String observacionesFac) {
        this.observacionesFac = observacionesFac;
    }

    public String getNoGiroVaca() {
        return noGiroVaca;
    }

    public DatosUsuario noGiroVaca(String noGiroVaca) {
        this.noGiroVaca = noGiroVaca;
        return this;
    }

    public void setNoGiroVaca(String noGiroVaca) {
        this.noGiroVaca = noGiroVaca;
    }

    public String getObservacionesDireccion() {
        return observacionesDireccion;
    }

    public DatosUsuario observacionesDireccion(String observacionesDireccion) {
        this.observacionesDireccion = observacionesDireccion;
        return this;
    }

    public void setObservacionesDireccion(String observacionesDireccion) {
        this.observacionesDireccion = observacionesDireccion;
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

    public RepreGCompra getRepreGCompra() {
        return repreGCompra;
    }

    public DatosUsuario repreGCompra(RepreGCompra repreGCompra) {
        this.repreGCompra = repreGCompra;
        return this;
    }

    public void setRepreGCompra(RepreGCompra repreGCompra) {
        this.repreGCompra = repreGCompra;
    }

    public FPago getFPago() {
        return fPago;
    }

    public DatosUsuario fPago(FPago fPago) {
        this.fPago = fPago;
        return this;
    }

    public void setFPago(FPago fPago) {
        this.fPago = fPago;
    }

    public Zonas getZonas() {
        return zonas;
    }

    public DatosUsuario zonas(Zonas zonas) {
        this.zonas = zonas;
        return this;
    }

    public void setZonas(Zonas zonas) {
        this.zonas = zonas;
    }

    public TransportistaTabla getTransportistaTabla() {
        return transportistaTabla;
    }

    public DatosUsuario transportistaTabla(TransportistaTabla transportistaTabla) {
        this.transportistaTabla = transportistaTabla;
        return this;
    }

    public void setTransportistaTabla(TransportistaTabla transportistaTabla) {
        this.transportistaTabla = transportistaTabla;
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
            ", codigo=" + getCodigo() +
            ", estado='" + getEstado() + "'" +
            ", fAlta='" + getfAlta() + "'" +
            ", fBaja='" + getfBaja() + "'" +
            ", prioridadCarga=" + getPrioridadCarga() +
            ", apIVA='" + getApIVA() + "'" +
            ", apReq='" + getApReq() + "'" +
            ", valAlbaran='" + getValAlbaran() + "'" +
            ", facXAlbaran='" + getFacXAlbaran() + "'" +
            ", dto1=" + getDto1() +
            ", dto2=" + getDto2() +
            ", dto3=" + getDto3() +
            ", dtoTras=" + getDtoTras() +
            ", idGc='" + getIdGc() + "'" +
            ", valPedido='" + getValPedido() + "'" +
            ", valPuntos='" + getValPuntos() + "'" +
            ", dPago1=" + getdPago1() +
            ", dPago2=" + getdPago2() +
            ", dPago3=" + getdPago3() +
            ", desdeVaca='" + getDesdeVaca() + "'" +
            ", hastaVaca='" + getHastaVaca() + "'" +
            ", web='" + getWeb() + "'" +
            ", movil='" + getMovil() + "'" +
            ", fax='" + getFax() + "'" +
            ", ctaContable=" + getCtaContable() +
            ", observaciones='" + getObservaciones() + "'" +
            ", observacionesPed='" + getObservacionesPed() + "'" +
            ", observacionesAlb='" + getObservacionesAlb() + "'" +
            ", observacionesFac='" + getObservacionesFac() + "'" +
            ", noGiroVaca='" + getNoGiroVaca() + "'" +
            ", observacionesDireccion='" + getObservacionesDireccion() + "'" +
            "}";
    }
}
