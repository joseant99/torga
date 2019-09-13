package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Mensajes.
 */
@Entity
@Table(name = "mensajes")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Mensajes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "texto")
    private String texto;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @Column(name = "fecha_visto")
    private String fechaVisto;

    @ManyToOne
    @JsonIgnoreProperties("")
    private ProductosPresupuestoPedidos productosPresupuestoPedidos;

    @ManyToOne
    @JsonIgnoreProperties("")
    private ContactoFabrica contactoFabrica;

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

    public String getTexto() {
        return texto;
    }

    public Mensajes texto(String texto) {
        this.texto = texto;
        return this;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public Mensajes imagen(byte[] imagen) {
        this.imagen = imagen;
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return imagenContentType;
    }

    public Mensajes imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public String getFechaVisto() {
        return fechaVisto;
    }

    public Mensajes fechaVisto(String fechaVisto) {
        this.fechaVisto = fechaVisto;
        return this;
    }

    public void setFechaVisto(String fechaVisto) {
        this.fechaVisto = fechaVisto;
    }

    public ProductosPresupuestoPedidos getProductosPresupuestoPedidos() {
        return productosPresupuestoPedidos;
    }

    public Mensajes productosPresupuestoPedidos(ProductosPresupuestoPedidos productosPresupuestoPedidos) {
        this.productosPresupuestoPedidos = productosPresupuestoPedidos;
        return this;
    }

    public void setProductosPresupuestoPedidos(ProductosPresupuestoPedidos productosPresupuestoPedidos) {
        this.productosPresupuestoPedidos = productosPresupuestoPedidos;
    }

    public ContactoFabrica getContactoFabrica() {
        return contactoFabrica;
    }

    public Mensajes contactoFabrica(ContactoFabrica contactoFabrica) {
        this.contactoFabrica = contactoFabrica;
        return this;
    }

    public void setContactoFabrica(ContactoFabrica contactoFabrica) {
        this.contactoFabrica = contactoFabrica;
    }

    public User getUser() {
        return user;
    }

    public Mensajes user(User user) {
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
        Mensajes mensajes = (Mensajes) o;
        if (mensajes.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mensajes.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mensajes{" +
            "id=" + getId() +
            ", texto='" + getTexto() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            ", fechaVisto='" + getFechaVisto() + "'" +
            "}";
    }
}
