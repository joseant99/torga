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
