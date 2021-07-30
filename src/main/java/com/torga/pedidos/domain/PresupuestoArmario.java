package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PresupuestoArmario.
 */
@Entity
@Table(name = "presupuesto_armario")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PresupuestoArmario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ancho")
    private Float ancho;
    
    @Column(name = "armario_web")
    private Float armarioWeb;
    
    @Column(name = "numero_huecos")
    private Float numeroHuecos;
    
    @Column(name = "codigo")
    private String codigo;
    
    @Column(name = "nombre_para_cargar_cesta")
    private String nombreParaCargarCesta;
    
    @Column(name = "nombre_para_cargar_cesta_interior")
    private String nombreParaCargarCestaInterior;
    
    @Column(name = "enmarcados")
    private String enmarcadosTexto;
    
    @Column(name = "cajeado")
    private String cajeadoTexto;
    
    @Column(name = "niveladores")
    private String niveladoresTexto;
    
    @Column(name = "precio_total")
    private Float precioTotal;

    @Column(name = "alto")
    private Float alto;

    @Column(name = "fondo")
    private Float fondo;
    
    @Column(name = "medACaj")
    private Float medACaj;
    
    @Column(name = "medBCaj")
    private Float medBCaj;
    
    @Column(name = "medCCaj")
    private Float medCCaj;
    
    @Column(name = "medAEnm")
    private Float medAEnm;
    
    @Column(name = "medBEnm")
    private Float medBEnm;
    
    @Column(name = "medCEnm")
    private Float medCEnm;

    @Column(name = "casco_precio")
    private Float cascoPrecio;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Armario armario;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Acabados acabadosCasco;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Acabados acabados;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Acabados acabadosInterior;
    
    @ManyToOne
    @JsonIgnoreProperties("")
    private Acabados acabadosTirador;

    @ManyToOne
    @JsonIgnoreProperties("")
    private ProductosPresupuestoPedidos productosPresupuestoPedidos;
    
    @ManyToOne
    @JsonIgnoreProperties("")
    private Niveladores niveladores;
    
    @ManyToOne
    @JsonIgnoreProperties("")
    private Cajeado cajeado;
    
    @ManyToOne
    @JsonIgnoreProperties("")
    private Enmarcados enmarcados;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getAncho() {
        return ancho;
    }

    public PresupuestoArmario ancho(Float ancho) {
        this.ancho = ancho;
        return this;
    }

    public void setAncho(Float ancho) {
        this.ancho = ancho;
    }
    
    public Float getArmarioWeb() {
        return ancho;
    }

    public PresupuestoArmario armarioWeb(Float armarioWeb) {
        this.armarioWeb = armarioWeb;
        return this;
    }

    public void setArmarioWeb(Float armarioWeb) {
        this.armarioWeb = armarioWeb;
    }
    
    public Float getNumeroHuecos() {
        return numeroHuecos;
    }

    public PresupuestoArmario numeroHuecos(Float numeroHuecos) {
        this.numeroHuecos = numeroHuecos;
        return this;
    }

    public void setNumeroHuecos(Float numeroHuecos) {
        this.numeroHuecos = numeroHuecos;
    }
    
    
    public String getCodigo() {
        return codigo;
    }

    public PresupuestoArmario codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
    
    public String getNombreParaCargarCesta() {
        return nombreParaCargarCesta;
    }

    public PresupuestoArmario nombreParaCargarCesta(String nombreParaCargarCesta) {
        this.nombreParaCargarCesta = nombreParaCargarCesta;
        return this;
    }

    public void setNombreParaCargarCesta(String nombreParaCargarCesta) {
        this.nombreParaCargarCesta = nombreParaCargarCesta;
    }
    
    public String getNombreParaCargarCestaInterior() {
        return nombreParaCargarCestaInterior;
    }

    public PresupuestoArmario nombreParaCargarCestaInterior(String nombreParaCargarCestaInterior) {
        this.nombreParaCargarCestaInterior = nombreParaCargarCestaInterior;
        return this;
    }

    public void setNombreParaCargarCestaInterior(String nombreParaCargarCestaInterior) {
        this.nombreParaCargarCestaInterior = nombreParaCargarCestaInterior;
    }
    
    public String getEnmarcadosTexto() {
        return enmarcadosTexto;
    }

    public PresupuestoArmario enmarcadosTexto(String enmarcadosTexto) {
        this.enmarcadosTexto = enmarcadosTexto;
        return this;
    }

    public void setEnmarcadosTexto(String enmarcadosTexto) {
        this.enmarcadosTexto = enmarcadosTexto;
    }
    
    public String getCajeadoTexto() {
        return cajeadoTexto;
    }

    public PresupuestoArmario cajeadoTexto(String cajeadoTexto) {
        this.cajeadoTexto = cajeadoTexto;
        return this;
    }

    public void setCajeadoTexto(String cajeadoTexto) {
        this.cajeadoTexto = cajeadoTexto;
    }
    
    public String getNiveladoresTexto() {
        return niveladoresTexto;
    }

    public PresupuestoArmario niveladoresTexto(String niveladoresTexto) {
        this.niveladoresTexto = niveladoresTexto;
        return this;
    }

    public void setNiveladoresTexto(String niveladoresTexto) {
        this.niveladoresTexto = niveladoresTexto;
    }
    
    public Float getPrecioTotal() {
        return precioTotal;
    }

    public PresupuestoArmario precioTotal(Float precioTotal) {
        this.precioTotal = precioTotal;
        return this;
    }

    public void setPrecioTotal(Float precioTotal) {
        this.precioTotal = precioTotal;
    }

    public Float getAlto() {
        return alto;
    }

    public PresupuestoArmario alto(Float alto) {
        this.alto = alto;
        return this;
    }

    public void setAlto(Float alto) {
        this.alto = alto;
    }

    public Float getFondo() {
        return fondo;
    }

    public PresupuestoArmario fondo(Float fondo) {
        this.fondo = fondo;
        return this;
    }

    public void setFondo(Float fondo) {
        this.fondo = fondo;
    }
    
    public Float getMedACaj() {
        return medACaj;
    }

    public PresupuestoArmario medACaj(Float medACaj) {
        this.medACaj = medACaj;
        return this;
    }

    public void setMedACaj(Float medACaj) {
        this.medACaj = medACaj;
    }
    
    public Float getMedBCaj() {
        return medBCaj;
    }

    public PresupuestoArmario medBCaj(Float medBCaj) {
        this.medBCaj = medBCaj;
        return this;
    }

    public void setMedBCaj(Float medBCaj) {
        this.medBCaj = medBCaj;
    }
    
    public Float getMedCCaj() {
        return medCCaj;
    }

    public PresupuestoArmario medCCaj(Float medCCaj) {
        this.medCCaj = medCCaj;
        return this;
    }

    public void setMedCCaj(Float medCCaj) {
        this.medCCaj = medCCaj;
    }
    
    public Float getMedAEnm() {
        return medAEnm;
    }

    public PresupuestoArmario medAEnm(Float medAEnm) {
        this.medAEnm = medAEnm;
        return this;
    }

    public void setMedAEnm(Float medAEnm) {
        this.medAEnm = medAEnm;
    }
    
    public Float getMedBEnm() {
        return medBEnm;
    }

    public PresupuestoArmario medBEnm(Float medBEnm) {
        this.medBEnm = medBEnm;
        return this;
    }

    public void setMedBEnm(Float medBEnm) {
        this.medBEnm = medBEnm;
    }
    
    public Float getMedCEnm() {
        return medCEnm;
    }

    public PresupuestoArmario medCEnm(Float medCEnm) {
        this.medCEnm = medCEnm;
        return this;
    }

    public void setMedCEnm(Float medCEnm) {
        this.medCEnm = medCEnm;
    }
    
    

    public Float getCascoPrecio() {
        return cascoPrecio;
    }

    public PresupuestoArmario cascoPrecio(Float cascoPrecio) {
        this.cascoPrecio = cascoPrecio;
        return this;
    }

    public void setCascoPrecio(Float cascoPrecio) {
        this.cascoPrecio = cascoPrecio;
    }

    public Armario getArmario() {
        return armario;
    }

    public PresupuestoArmario armario(Armario armario) {
        this.armario = armario;
        return this;
    }

    public void setArmario(Armario armario) {
        this.armario = armario;
    }

    public Acabados getAcabadosCasco() {
        return acabadosCasco;
    }

    public PresupuestoArmario acabadosCasco(Acabados acabados) {
        this.acabadosCasco = acabados;
        return this;
    }

    public void setAcabadosCasco(Acabados acabados) {
        this.acabadosCasco = acabados;
    }

    public Acabados getAcabados() {
        return acabados;
    }

    public PresupuestoArmario acabados(Acabados acabados) {
        this.acabados = acabados;
        return this;
    }

    public void setAcabados(Acabados acabados) {
        this.acabados = acabados;
    }

    public Acabados getAcabadosInterior() {
        return acabadosInterior;
    }

    public PresupuestoArmario acabadosInterior(Acabados acabados) {
        this.acabadosInterior = acabados;
        return this;
    }

    public void setAcabadosInterior(Acabados acabados) {
        this.acabadosInterior = acabados;
    }
    
    public Acabados getAcabadosTirador() {
        return acabadosTirador;
    }

    public PresupuestoArmario acabadosTirador(Acabados acabados) {
        this.acabadosTirador = acabados;
        return this;
    }

    public void setAcabadosTirador(Acabados acabados) {
        this.acabadosTirador = acabados;
    }
    

    public ProductosPresupuestoPedidos getProductosPresupuestoPedidos() {
        return productosPresupuestoPedidos;
    }

    public PresupuestoArmario productosPresupuestoPedidos(ProductosPresupuestoPedidos productosPresupuestoPedidos) {
        this.productosPresupuestoPedidos = productosPresupuestoPedidos;
        return this;
    }

    public void setProductosPresupuestoPedidos(ProductosPresupuestoPedidos productosPresupuestoPedidos) {
        this.productosPresupuestoPedidos = productosPresupuestoPedidos;
    }
    
    public Niveladores getNiveladores() {
        return niveladores;
    }

    public PresupuestoArmario niveladores(Niveladores niveladores) {
        this.niveladores = niveladores;
        return this;
    }

    public void setNiveladores(Niveladores niveladores) {
        this.niveladores = niveladores;
    }
    
    
    public Cajeado getCajeado() {
        return cajeado;
    }

    public PresupuestoArmario cajeado(Cajeado cajeado) {
        this.cajeado = cajeado;
        return this;
    }

    public void setCajeado(Cajeado cajeado) {
        this.cajeado = cajeado;
    }
    
    public Enmarcados getEnmarcados() {
        return enmarcados;
    }

    public PresupuestoArmario enmarcados(Enmarcados enmarcados) {
        this.enmarcados = enmarcados;
        return this;
    }

    public void setEnmarcados(Enmarcados enmarcados) {
        this.enmarcados = enmarcados;
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
        PresupuestoArmario presupuestoArmario = (PresupuestoArmario) o;
        if (presupuestoArmario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), presupuestoArmario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PresupuestoArmario{" +
            "id=" + getId() +
            ", ancho=" + getAncho() +
            ", alto=" + getAlto() +
            ", fondo=" + getFondo() +
            ", cascoPrecio=" + getCascoPrecio() +
            "}";
    }
}
