package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ProductosPresupuestoPedidos.
 */
@Entity
@Table(name = "productos_presupuesto_pedidos")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProductosPresupuestoPedidos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("")
    private ProductosDormitorio productosDormitorio;

    @Column(name = "precio_total")
    private Float precioTotal;
    
    @Column(name = "nombre_archivo")
    private String nombreArchivo;
    
    @Column(name = "texto_especial")
    private String textoEspecial;
    
    @Column(name = "direccion")
    private String direccion;
    
    @ManyToOne
    @JsonIgnoreProperties("")
    private DimensionesProductoTipo dimensionesProductoTipo;

    @ManyToOne
    @JsonIgnoreProperties("")
    private PresupuestoPedido presupuestoPedido;

    @ManyToOne
    @JsonIgnoreProperties("")
    private TipoProducto tipoProducto;

    @ManyToOne
    @JsonIgnoreProperties("")
    private TiposApoyo tiposApoyo;
    
    @Column(name = "grosor")
    private String grosor;
    
    @Column(name = "alto")
    private String alto;
    
    @Column(name = "ancho")
    private String ancho;
    
    @Column(name = "fondo")
    private String fondo;
    
    @Column(name = "canteado")
    private String canteado;
    
    @Column(name = "piloto_apoyo")
    private String pilotoApoyo;
    
    @Column(name = "piloto_usb")
    private String pilotoUsb;
    
    @Column(name = "piloto_luz")
    private String pilotoLuz;
    
    @Column(name = "observacionestext")
    private String observacionestext;
    
    @ManyToOne
    @JsonIgnoreProperties("")
    private Usb usb;
    
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
    
    public String getGrosor() {
        return grosor;
    }

    public ProductosPresupuestoPedidos grosor(String grosor) {
        this.grosor = grosor;
        return this;
    }

    public void setGrosor(String grosor) {
        this.grosor = grosor;
    }
    
    public String getAlto() {
        return alto;
    }

    public ProductosPresupuestoPedidos alto(String alto) {
        this.alto = alto;
        return this;
    }

    public void setAlto(String alto) {
        this.alto = alto;
    }
    
    public String getObservacionesText() {
        return observacionestext;
    }

    public ProductosPresupuestoPedidos observacionestext(String observacionestext) {
        this.observacionestext = observacionestext;
        return this;
    }

    public void setObservacionesText(String observacionestext) {
        this.observacionestext = observacionestext;
    }
    
    public String getAncho() {
        return ancho;
    }

    public ProductosPresupuestoPedidos ancho(String ancho) {
        this.ancho = ancho;
        return this;
    }

    public void setAncho(String ancho) {
        this.ancho = ancho;
    }
    
    public String getFondo() {
        return fondo;
    }

    public ProductosPresupuestoPedidos fondo(String fondo) {
        this.fondo = fondo;
        return this;
    }

    public void setFondo(String fondo) {
        this.fondo = fondo;
    }
    
    public String getCanteado() {
        return canteado;
    }

    public ProductosPresupuestoPedidos canteado(String canteado) {
        this.canteado = canteado;
        return this;
    }

    public void setCanteado(String canteado) {
        this.canteado = canteado;
    }
    
    public String getPilotoApoyo() {
        return pilotoApoyo;
    }

    public ProductosPresupuestoPedidos pilotoApoyo(String pilotoApoyo) {
        this.pilotoApoyo = pilotoApoyo;
        return this;
    }

    public void setPilotoApoyo(String pilotoApoyo) {
        this.pilotoApoyo = pilotoApoyo;
    }
    
    public String getPilotoUsb() {
        return pilotoUsb;
    }

    public ProductosPresupuestoPedidos pilotoUsb(String pilotoUsb) {
        this.pilotoUsb = pilotoUsb;
        return this;
    }

    public void setPilotoUsb(String pilotoUsb) {
        this.pilotoUsb = pilotoUsb;
    }
    
    public String getPilotoLuz() {
        return pilotoLuz;
    }

    public ProductosPresupuestoPedidos pilotoLuz(String pilotoLuz) {
        this.pilotoLuz = pilotoLuz;
        return this;
    }

    public void setPilotoLuz(String pilotoLuz) {
        this.pilotoLuz = pilotoLuz;
    }

    public ProductosDormitorio getProductosDormitorio() {
        return productosDormitorio;
    }

    public ProductosPresupuestoPedidos productosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
        return this;
    }

    public void setProductosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
    }
    
    public Float getPrecioTotal() {
        return precioTotal;
    }

    public ProductosPresupuestoPedidos precioTotal(Float precioTotal) {
        this.precioTotal = precioTotal;
        return this;
    }

    public void setPrecioTotal(Float precioTotal) {
        this.precioTotal = precioTotal;
    }
    
    public String getNombreArchivo() {
        return nombreArchivo;
    }

    public ProductosPresupuestoPedidos nombreArchivo(String nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        return this;
    }

    public void setNombreArchivo(String nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }
    
    public String getDireccion() {
        return direccion;
    }

    public ProductosPresupuestoPedidos direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
    
    public String getTextoEspecial() {
        return textoEspecial;
    }

    public ProductosPresupuestoPedidos textoEspecial(String textoEspecial) {
        this.textoEspecial = textoEspecial;
        return this;
    }

    public void setTextoEspecial(String textoEspecial) {
        this.textoEspecial = textoEspecial;
    }
    
    public Usb getUsb() {
        return usb;
    }

    public ProductosPresupuestoPedidos usb(Usb usb) {
        this.usb = usb;
        return this;
    }

    public void setUsb(Usb usb) {
        this.usb = usb;
    }
    
    public Iluminacion getIluminacion() {
        return iluminacion;
    }

    public ProductosPresupuestoPedidos iluminacion(Iluminacion iluminacion) {
        this.iluminacion = iluminacion;
        return this;
    }

    public void setIluminacion(Iluminacion iluminacion) {
        this.iluminacion = iluminacion;
    }

    public DimensionesProductoTipo getDimensionesProductoTipo() {
        return dimensionesProductoTipo;
    }

    public ProductosPresupuestoPedidos dimensionesProductoTipo(DimensionesProductoTipo dimensionesProductoTipo) {
        this.dimensionesProductoTipo = dimensionesProductoTipo;
        return this;
    }

    public void setDimensionesProductoTipo(DimensionesProductoTipo dimensionesProductoTipo) {
        this.dimensionesProductoTipo = dimensionesProductoTipo;
    }

    public PresupuestoPedido getPresupuestoPedido() {
        return presupuestoPedido;
    }

    public ProductosPresupuestoPedidos presupuestoPedido(PresupuestoPedido presupuestoPedido) {
        this.presupuestoPedido = presupuestoPedido;
        return this;
    }

    public void setPresupuestoPedido(PresupuestoPedido presupuestoPedido) {
        this.presupuestoPedido = presupuestoPedido;
    }

    public TipoProducto getTipoProducto() {
        return tipoProducto;
    }

    public ProductosPresupuestoPedidos tipoProducto(TipoProducto tipoProducto) {
        this.tipoProducto = tipoProducto;
        return this;
    }

    public void setTipoProducto(TipoProducto tipoProducto) {
        this.tipoProducto = tipoProducto;
    }

    public TiposApoyo getTiposApoyo() {
        return tiposApoyo;
    }

    public ProductosPresupuestoPedidos tiposApoyo(TiposApoyo tiposApoyo) {
        this.tiposApoyo = tiposApoyo;
        return this;
    }

    public void setTiposApoyo(TiposApoyo tiposApoyo) {
        this.tiposApoyo = tiposApoyo;
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
        ProductosPresupuestoPedidos productosPresupuestoPedidos = (ProductosPresupuestoPedidos) o;
        if (productosPresupuestoPedidos.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productosPresupuestoPedidos.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductosPresupuestoPedidos{" +
            "id=" + getId() +
            "}";
    }
}
