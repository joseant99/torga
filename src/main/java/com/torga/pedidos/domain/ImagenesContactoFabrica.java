package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ImagenesContactoFabrica.
 */
@Entity
@Table(name = "imagenes_contacto_fabrica")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ImagenesContactoFabrica implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

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

    public byte[] getImagen() {
        return imagen;
    }

    public ImagenesContactoFabrica imagen(byte[] imagen) {
        this.imagen = imagen;
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return imagenContentType;
    }

    public ImagenesContactoFabrica imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public ContactoFabrica getContactoFabrica() {
        return contactoFabrica;
    }

    public ImagenesContactoFabrica contactoFabrica(ContactoFabrica contactoFabrica) {
        this.contactoFabrica = contactoFabrica;
        return this;
    }

    public void setContactoFabrica(ContactoFabrica contactoFabrica) {
        this.contactoFabrica = contactoFabrica;
    }

    public User getUser() {
        return user;
    }

    public ImagenesContactoFabrica user(User user) {
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
        ImagenesContactoFabrica imagenesContactoFabrica = (ImagenesContactoFabrica) o;
        if (imagenesContactoFabrica.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), imagenesContactoFabrica.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ImagenesContactoFabrica{" +
            "id=" + getId() +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            "}";
    }
}
