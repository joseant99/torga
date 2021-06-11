package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

/**
 * A PresupuestoPedido.
 */
@Entity
@Table(name = "presupuesto_pedido")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PresupuestoPedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 1024)
    @Column(name = "codigo", length = 1024)
    private String codigo;

    @Column(name = "pedido")
    private Integer pedido;
    
    @Column(name = "modificado")
    private Integer modificado;
    
    @Column(name = "web")
    private Integer web;
    
    @Column(name = "archivo_adjunto")
    private String archivoAdjunto;
    
    @Column(name = "creado")
    private Integer creado;
    
    @Column(name = "fecha_prevista")
    private String fecha_prevista;
    
    @Column(name = "esta_pedido")
    private Integer estapedido;
    
    @Column(name = "esta_factura")
    private Integer estafactura;
    
    @Column(name = "sumado")
    private Integer sumado;

    @Column(name = "puntos")
    private Float puntos;
    
    @Column(name = "fecha_presupuesto")
    private String fecha_presupuesto;
    
    @Column(name = "nombre_cesta")
    private String nombreCesta;

    @Column(name = "fecha_pedido")
    private String fecha_pedido;
    
    @Column(name = "observaciones")
    private String observaciones;
    
    @Column(name = "num_pedido")
    private String numero_pedido;
    
    @Column(name = "num_factura")
    private String numero_factura;
    
    @Column(name = "estado")
    private String estado;
    
    @Column(name = "transportista")
    private String transportista;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User usuarioCreadoPre;
    
    @Column(name = "visto")
    private Integer visto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }
    
    public Float getPuntos() {
        return puntos;
    }

    public PresupuestoPedido puntos(Float puntos) {
        this.puntos = puntos;
        return this;
    }

    public PresupuestoPedido codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Integer getPedido() {
        return pedido;
    }

    public PresupuestoPedido pedido(Integer pedido) {
        this.pedido = pedido;
        return this;
    }

    public void setPedido(Integer pedido) {
        this.pedido = pedido;
    }
    
    public Integer getModificado() {
        return pedido;
    }

    public PresupuestoPedido modificado(Integer modificado) {
        this.modificado = modificado;
        return this;
    }

    public void setModificado(Integer modificado) {
        this.modificado = modificado;
    }
    
    public String getArchivoAdjunto() {
        return archivoAdjunto;
    }

    public PresupuestoPedido archivoAdjunto(String archivoAdjunto) {
        this.archivoAdjunto = archivoAdjunto;
        return this;
    }

    public void setArchivoAdjunto(String archivoAdjunto) {
        this.archivoAdjunto = archivoAdjunto;
    }
    
    public String getNombreCesta() {
        return nombreCesta;
    }

    public PresupuestoPedido nombreCesta(String nombreCesta) {
        this.nombreCesta = nombreCesta;
        return this;
    }

    public void setNombreCesta(String nombreCesta) {
        this.nombreCesta = nombreCesta;
    }
    
    public String getFecha_prevista() {
        return fecha_prevista;
    }

    public PresupuestoPedido fecha_prevista(String fecha_prevista) {
        this.fecha_prevista = fecha_prevista;
        return this;
    }

    public void setFecha_prevista(String fecha_prevista) {
        this.fecha_prevista = fecha_prevista;
    }
    
    public Integer getCreado() {
        return creado;
    }

    public PresupuestoPedido creado(Integer creado) {
        this.creado = creado;
        return this;
    }

    public void setCreado(Integer creado) {
        this.creado = creado;
    }
    
    public Integer getSumado() {
        return sumado;
    }

    public PresupuestoPedido sumado(Integer sumado) {
        this.sumado = sumado;
        return this;
    }

    public void setSumado(Integer sumado) {
        this.sumado = sumado;
    }
    
    public Integer getWeb() {
        return web;
    }

    public PresupuestoPedido web(Integer web) {
        this.web = web;
        return this;
    }

    public void setWeb(Integer web) {
        this.web = web;
    }
    
    public Integer getEstapedido() {
        return estapedido;
    }

    public PresupuestoPedido estapedido(Integer estapedido) {
        this.estapedido = estapedido;
        return this;
    }

    public void setEstapedido(Integer estapedido) {
        this.estapedido = estapedido;
    }
    
    public Integer getEstafactura() {
        return estafactura;
    }

    public PresupuestoPedido estafactura(Integer estafactura) {
        this.estafactura = estafactura;
        return this;
    }

    public void setEstafactura(Integer estafactura) {
        this.estafactura = estafactura;
    }
    
    public Integer getVisto() {
        return visto;
    }

    public PresupuestoPedido visto(Integer visto) {
        this.visto = visto;
        return this;
    }

    public void setVisto(Integer visto) {
        this.visto = visto;
    }

    public String getFecha_presupuesto() {
        return fecha_presupuesto;
    }

    public PresupuestoPedido fecha_presupuesto(String fecha_presupuesto) {
        this.fecha_presupuesto = fecha_presupuesto;
        return this;
    }

    public void setFecha_presupuesto(String fecha_presupuesto) {
        this.fecha_presupuesto = fecha_presupuesto;
    }
    
    public String getObservaciones() {
        return observaciones;
    }

    public PresupuestoPedido observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
    
    public String getNumero_pedido() {
        return numero_pedido;
    }

    public PresupuestoPedido numero_pedido(String numero_pedido) {
        this.numero_pedido = numero_pedido;
        return this;
    }

    public void setNumero_pedido(String numero_pedido) {
        this.numero_pedido = numero_pedido;
    }
    
    public String getEstado() {
        return estado;
    }

    public PresupuestoPedido estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
    
    public String getTransportista() {
        return transportista;
    }

    public PresupuestoPedido transportista(String transportista) {
        this.transportista = transportista;
        return this;
    }

    public void setTransportista(String transportista) {
        this.transportista = transportista;
    }
    
    public String getNumero_factura() {
        return numero_factura;
    }

    public PresupuestoPedido numero_factura(String numero_factura) {
        this.numero_factura = numero_factura;
        return this;
    }

    public void setNumero_factura(String numero_factura) {
        this.numero_factura = numero_factura;
    }

    public String getFecha_pedido() {
        return fecha_pedido;
    }

    public PresupuestoPedido fecha_pedido(String fecha_pedido) {
        this.fecha_pedido = fecha_pedido;
        return this;
    }

    public void setFecha_pedido(String fecha_pedido) {
        this.fecha_pedido = fecha_pedido;
    }

    public User getUser() {
        return user;
    }

    public PresupuestoPedido user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUsuarioCreadoPre() {
        return usuarioCreadoPre;
    }

    public PresupuestoPedido usuarioCreadoPre(User user) {
        this.usuarioCreadoPre = user;
        return this;
    }

    public void setUsuarioCreadoPre(User user) {
        this.usuarioCreadoPre = user;
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
        PresupuestoPedido presupuestoPedido = (PresupuestoPedido) o;
        if (presupuestoPedido.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), presupuestoPedido.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PresupuestoPedido{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", puntos='" + getPuntos() + "'" +
            ", pedido=" + getPedido() +
            ", fecha_presupuesto='" + getFecha_presupuesto() + "'" +
            ", fecha_pedido='" + getFecha_pedido() + "'" +
            "}";
    }
}
