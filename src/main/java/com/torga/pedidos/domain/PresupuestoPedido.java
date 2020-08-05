package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
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

    @Column(name = "puntos")
    private Float puntos;
    
    @Column(name = "fecha_presupuesto")
    private String fecha_presupuesto;

    @Column(name = "fecha_pedido")
    private String fecha_pedido;

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
