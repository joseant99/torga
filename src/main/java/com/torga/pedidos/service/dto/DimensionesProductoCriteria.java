package com.torga.pedidos.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the DimensionesProducto entity. This class is used in DimensionesProductoResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /dimensiones-productos?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class DimensionesProductoCriteria implements Serializable {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private FloatFilter ancho;

    private FloatFilter alto;

    private FloatFilter fondo;

    private StringFilter mensaje;

    private FloatFilter precio;

    private FloatFilter anchoIdeal;

    private LongFilter productosDormitorioId;

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public FloatFilter getAncho() {
        return ancho;
    }

    public void setAncho(FloatFilter ancho) {
        this.ancho = ancho;
    }

    public FloatFilter getAlto() {
        return alto;
    }

    public void setAlto(FloatFilter alto) {
        this.alto = alto;
    }

    public FloatFilter getFondo() {
        return fondo;
    }

    public void setFondo(FloatFilter fondo) {
        this.fondo = fondo;
    }

    public StringFilter getMensaje() {
        return mensaje;
    }

    public void setMensaje(StringFilter mensaje) {
        this.mensaje = mensaje;
    }

    public FloatFilter getPrecio() {
        return precio;
    }

    public void setPrecio(FloatFilter precio) {
        this.precio = precio;
    }

    public FloatFilter getAnchoIdeal() {
        return anchoIdeal;
    }

    public void setAnchoIdeal(FloatFilter anchoIdeal) {
        this.anchoIdeal = anchoIdeal;
    }

    public LongFilter getProductosDormitorioId() {
        return productosDormitorioId;
    }

    public void setProductosDormitorioId(LongFilter productosDormitorioId) {
        this.productosDormitorioId = productosDormitorioId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final DimensionesProductoCriteria that = (DimensionesProductoCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(ancho, that.ancho) &&
            Objects.equals(alto, that.alto) &&
            Objects.equals(fondo, that.fondo) &&
            Objects.equals(mensaje, that.mensaje) &&
            Objects.equals(precio, that.precio) &&
            Objects.equals(anchoIdeal, that.anchoIdeal) &&
            Objects.equals(productosDormitorioId, that.productosDormitorioId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        ancho,
        alto,
        fondo,
        mensaje,
        precio,
        anchoIdeal,
        productosDormitorioId
        );
    }

    @Override
    public String toString() {
        return "DimensionesProductoCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (ancho != null ? "ancho=" + ancho + ", " : "") +
                (alto != null ? "alto=" + alto + ", " : "") +
                (fondo != null ? "fondo=" + fondo + ", " : "") +
                (mensaje != null ? "mensaje=" + mensaje + ", " : "") +
                (precio != null ? "precio=" + precio + ", " : "") +
                (anchoIdeal != null ? "anchoIdeal=" + anchoIdeal + ", " : "") +
                (productosDormitorioId != null ? "productosDormitorioId=" + productosDormitorioId + ", " : "") +
            "}";
    }

}
