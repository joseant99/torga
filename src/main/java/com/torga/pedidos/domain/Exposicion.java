package com.torga.pedidos.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Exposicion.
 */
@Entity
@Table(name = "exposicion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Exposicion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cod_cli")
    private String codCli;

    @Column(name = "id_direccion")
    private Integer idDireccion;

    @Column(name = "id_catalogo")
    private Integer idCatalogo;

    @Column(name = "tiene")
    private Integer tiene;

    @Column(name = "color")
    private String color;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodCli() {
        return codCli;
    }

    public Exposicion codCli(String codCli) {
        this.codCli = codCli;
        return this;
    }

    public void setCodCli(String codCli) {
        this.codCli = codCli;
    }

    public Integer getIdDireccion() {
        return idDireccion;
    }

    public Exposicion idDireccion(Integer idDireccion) {
        this.idDireccion = idDireccion;
        return this;
    }

    public void setIdDireccion(Integer idDireccion) {
        this.idDireccion = idDireccion;
    }

    public Integer getIdCatalogo() {
        return idCatalogo;
    }

    public Exposicion idCatalogo(Integer idCatalogo) {
        this.idCatalogo = idCatalogo;
        return this;
    }

    public void setIdCatalogo(Integer idCatalogo) {
        this.idCatalogo = idCatalogo;
    }

    public Integer getTiene() {
        return tiene;
    }

    public Exposicion tiene(Integer tiene) {
        this.tiene = tiene;
        return this;
    }

    public void setTiene(Integer tiene) {
        this.tiene = tiene;
    }

    public String getColor() {
        return color;
    }

    public Exposicion color(String color) {
        this.color = color;
        return this;
    }

    public void setColor(String color) {
        this.color = color;
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
        Exposicion exposicion = (Exposicion) o;
        if (exposicion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), exposicion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Exposicion{" +
            "id=" + getId() +
            ", codCli='" + getCodCli() + "'" +
            ", idDireccion=" + getIdDireccion() +
            ", idCatalogo=" + getIdCatalogo() +
            ", tiene=" + getTiene() +
            ", color='" + getColor() + "'" +
            "}";
    }
}
