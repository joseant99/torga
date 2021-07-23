package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A InteriorArmarioMedida.
 */
@Entity
@Table(name = "interior_armario_medida")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class InteriorArmarioMedida implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_hueco")
    private Float numeroHueco;

    @Column(name = "est_1")
    private Float est1;

    @Column(name = "est_2")
    private Float est2;

    @Column(name = "est_3")
    private Float est3;

    @Column(name = "est_4")
    private Float est4;

    @Column(name = "est_5")
    private Float est5;

    @Column(name = "est_6")
    private Float est6;

    @Column(name = "est_7")
    private Float est7;

    @Column(name = "est_8")
    private Float est8;

    @Column(name = "est_9")
    private Float est9;

    @Column(name = "est_10")
    private Float est10;

    @Column(name = "tubo_1")
    private Float tubo1;

    @Column(name = "tubo_2")
    private Float tubo2;

    @Column(name = "tubo_3")
    private Float tubo3;

    @Column(name = "caj_sue_1")
    private Float cajSue1;

    @Column(name = "caj_sue_2")
    private Float cajSue2;

    @Column(name = "caj_sue_3")
    private Float cajSue3;

    @Column(name = "caj_sue_4")
    private Float cajSue4;

    @Column(name = "caj_sue_5")
    private Float cajSue5;

    @Column(name = "hang")
    private Float hang;

    @Column(name = "camisero")
    private Float camisero;

    @Column(name = "est_cris_1")
    private Float estCris1;

    @Column(name = "est_cris_2")
    private Float estCris2;

    @Column(name = "est_cris_3")
    private Float estCris3;

    @Column(name = "est_cris_4")
    private Float estCris4;

    @Column(name = "est_cris_5")
    private Float estCris5;

    @Column(name = "est_cris_6")
    private Float estCris6;

    @Column(name = "est_cris_7")
    private Float estCris7;

    @Column(name = "est_cris_8")
    private Float estCris8;

    @Column(name = "est_cris_9")
    private Float estCris9;

    @Column(name = "est_cris_10")
    private Float estCris10;

    @Column(name = "cajon_vol_1")
    private Float cajonVol1;

    @Column(name = "cajon_vol_2")
    private Float cajonVol2;

    @Column(name = "cajon_vol_3")
    private Float cajonVol3;

    @ManyToOne
    @JsonIgnoreProperties("")
    private PresupuestoArmario presupuestoArmario;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getNumeroHueco() {
        return numeroHueco;
    }

    public InteriorArmarioMedida numeroHueco(Float numeroHueco) {
        this.numeroHueco = numeroHueco;
        return this;
    }

    public void setNumeroHueco(Float numeroHueco) {
        this.numeroHueco = numeroHueco;
    }

    public Float getEst1() {
        return est1;
    }

    public InteriorArmarioMedida est1(Float est1) {
        this.est1 = est1;
        return this;
    }

    public void setEst1(Float est1) {
        this.est1 = est1;
    }

    public Float getEst2() {
        return est2;
    }

    public InteriorArmarioMedida est2(Float est2) {
        this.est2 = est2;
        return this;
    }

    public void setEst2(Float est2) {
        this.est2 = est2;
    }

    public Float getEst3() {
        return est3;
    }

    public InteriorArmarioMedida est3(Float est3) {
        this.est3 = est3;
        return this;
    }

    public void setEst3(Float est3) {
        this.est3 = est3;
    }

    public Float getEst4() {
        return est4;
    }

    public InteriorArmarioMedida est4(Float est4) {
        this.est4 = est4;
        return this;
    }

    public void setEst4(Float est4) {
        this.est4 = est4;
    }

    public Float getEst5() {
        return est5;
    }

    public InteriorArmarioMedida est5(Float est5) {
        this.est5 = est5;
        return this;
    }

    public void setEst5(Float est5) {
        this.est5 = est5;
    }

    public Float getEst6() {
        return est6;
    }

    public InteriorArmarioMedida est6(Float est6) {
        this.est6 = est6;
        return this;
    }

    public void setEst6(Float est6) {
        this.est6 = est6;
    }

    public Float getEst7() {
        return est7;
    }

    public InteriorArmarioMedida est7(Float est7) {
        this.est7 = est7;
        return this;
    }

    public void setEst7(Float est7) {
        this.est7 = est7;
    }

    public Float getEst8() {
        return est8;
    }

    public InteriorArmarioMedida est8(Float est8) {
        this.est8 = est8;
        return this;
    }

    public void setEst8(Float est8) {
        this.est8 = est8;
    }

    public Float getEst9() {
        return est9;
    }

    public InteriorArmarioMedida est9(Float est9) {
        this.est9 = est9;
        return this;
    }

    public void setEst9(Float est9) {
        this.est9 = est9;
    }

    public Float getEst10() {
        return est10;
    }

    public InteriorArmarioMedida est10(Float est10) {
        this.est10 = est10;
        return this;
    }

    public void setEst10(Float est10) {
        this.est10 = est10;
    }

    public Float getTubo1() {
        return tubo1;
    }

    public InteriorArmarioMedida tubo1(Float tubo1) {
        this.tubo1 = tubo1;
        return this;
    }

    public void setTubo1(Float tubo1) {
        this.tubo1 = tubo1;
    }

    public Float getTubo2() {
        return tubo2;
    }

    public InteriorArmarioMedida tubo2(Float tubo2) {
        this.tubo2 = tubo2;
        return this;
    }

    public void setTubo2(Float tubo2) {
        this.tubo2 = tubo2;
    }

    public Float getTubo3() {
        return tubo3;
    }

    public InteriorArmarioMedida tubo3(Float tubo3) {
        this.tubo3 = tubo3;
        return this;
    }

    public void setTubo3(Float tubo3) {
        this.tubo3 = tubo3;
    }

    public Float getCajSue1() {
        return cajSue1;
    }

    public InteriorArmarioMedida cajSue1(Float cajSue1) {
        this.cajSue1 = cajSue1;
        return this;
    }

    public void setCajSue1(Float cajSue1) {
        this.cajSue1 = cajSue1;
    }

    public Float getCajSue2() {
        return cajSue2;
    }

    public InteriorArmarioMedida cajSue2(Float cajSue2) {
        this.cajSue2 = cajSue2;
        return this;
    }

    public void setCajSue2(Float cajSue2) {
        this.cajSue2 = cajSue2;
    }

    public Float getCajSue3() {
        return cajSue3;
    }

    public InteriorArmarioMedida cajSue3(Float cajSue3) {
        this.cajSue3 = cajSue3;
        return this;
    }

    public void setCajSue3(Float cajSue3) {
        this.cajSue3 = cajSue3;
    }

    public Float getCajSue4() {
        return cajSue4;
    }

    public InteriorArmarioMedida cajSue4(Float cajSue4) {
        this.cajSue4 = cajSue4;
        return this;
    }

    public void setCajSue4(Float cajSue4) {
        this.cajSue4 = cajSue4;
    }

    public Float getCajSue5() {
        return cajSue5;
    }

    public InteriorArmarioMedida cajSue5(Float cajSue5) {
        this.cajSue5 = cajSue5;
        return this;
    }

    public void setCajSue5(Float cajSue5) {
        this.cajSue5 = cajSue5;
    }

    public Float getHang() {
        return hang;
    }

    public InteriorArmarioMedida hang(Float hang) {
        this.hang = hang;
        return this;
    }

    public void setHang(Float hang) {
        this.hang = hang;
    }

    public Float getCamisero() {
        return camisero;
    }

    public InteriorArmarioMedida camisero(Float camisero) {
        this.camisero = camisero;
        return this;
    }

    public void setCamisero(Float camisero) {
        this.camisero = camisero;
    }

    public Float getEstCris1() {
        return estCris1;
    }

    public InteriorArmarioMedida estCris1(Float estCris1) {
        this.estCris1 = estCris1;
        return this;
    }

    public void setEstCris1(Float estCris1) {
        this.estCris1 = estCris1;
    }

    public Float getEstCris2() {
        return estCris2;
    }

    public InteriorArmarioMedida estCris2(Float estCris2) {
        this.estCris2 = estCris2;
        return this;
    }

    public void setEstCris2(Float estCris2) {
        this.estCris2 = estCris2;
    }

    public Float getEstCris3() {
        return estCris3;
    }

    public InteriorArmarioMedida estCris3(Float estCris3) {
        this.estCris3 = estCris3;
        return this;
    }

    public void setEstCris3(Float estCris3) {
        this.estCris3 = estCris3;
    }

    public Float getEstCris4() {
        return estCris4;
    }

    public InteriorArmarioMedida estCris4(Float estCris4) {
        this.estCris4 = estCris4;
        return this;
    }

    public void setEstCris4(Float estCris4) {
        this.estCris4 = estCris4;
    }

    public Float getEstCris5() {
        return estCris5;
    }

    public InteriorArmarioMedida estCris5(Float estCris5) {
        this.estCris5 = estCris5;
        return this;
    }

    public void setEstCris5(Float estCris5) {
        this.estCris5 = estCris5;
    }

    public Float getEstCris6() {
        return estCris6;
    }

    public InteriorArmarioMedida estCris6(Float estCris6) {
        this.estCris6 = estCris6;
        return this;
    }

    public void setEstCris6(Float estCris6) {
        this.estCris6 = estCris6;
    }

    public Float getEstCris7() {
        return estCris7;
    }

    public InteriorArmarioMedida estCris7(Float estCris7) {
        this.estCris7 = estCris7;
        return this;
    }

    public void setEstCris7(Float estCris7) {
        this.estCris7 = estCris7;
    }

    public Float getEstCris8() {
        return estCris8;
    }

    public InteriorArmarioMedida estCris8(Float estCris8) {
        this.estCris8 = estCris8;
        return this;
    }

    public void setEstCris8(Float estCris8) {
        this.estCris8 = estCris8;
    }

    public Float getEstCris9() {
        return estCris9;
    }

    public InteriorArmarioMedida estCris9(Float estCris9) {
        this.estCris9 = estCris9;
        return this;
    }

    public void setEstCris9(Float estCris9) {
        this.estCris9 = estCris9;
    }

    public Float getEstCris10() {
        return estCris10;
    }

    public InteriorArmarioMedida estCris10(Float estCris10) {
        this.estCris10 = estCris10;
        return this;
    }

    public void setEstCris10(Float estCris10) {
        this.estCris10 = estCris10;
    }

    public Float getCajonVol1() {
        return cajonVol1;
    }

    public InteriorArmarioMedida cajonVol1(Float cajonVol1) {
        this.cajonVol1 = cajonVol1;
        return this;
    }

    public void setCajonVol1(Float cajonVol1) {
        this.cajonVol1 = cajonVol1;
    }

    public Float getCajonVol2() {
        return cajonVol2;
    }

    public InteriorArmarioMedida cajonVol2(Float cajonVol2) {
        this.cajonVol2 = cajonVol2;
        return this;
    }

    public void setCajonVol2(Float cajonVol2) {
        this.cajonVol2 = cajonVol2;
    }

    public Float getCajonVol3() {
        return cajonVol3;
    }

    public InteriorArmarioMedida cajonVol3(Float cajonVol3) {
        this.cajonVol3 = cajonVol3;
        return this;
    }

    public void setCajonVol3(Float cajonVol3) {
        this.cajonVol3 = cajonVol3;
    }

    public PresupuestoArmario getPresupuestoArmario() {
        return presupuestoArmario;
    }

    public InteriorArmarioMedida presupuestoArmario(PresupuestoArmario presupuestoArmario) {
        this.presupuestoArmario = presupuestoArmario;
        return this;
    }

    public void setPresupuestoArmario(PresupuestoArmario presupuestoArmario) {
        this.presupuestoArmario = presupuestoArmario;
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
        InteriorArmarioMedida interiorArmarioMedida = (InteriorArmarioMedida) o;
        if (interiorArmarioMedida.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), interiorArmarioMedida.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InteriorArmarioMedida{" +
            "id=" + getId() +
            ", numeroHueco=" + getNumeroHueco() +
            ", est1=" + getEst1() +
            ", est2=" + getEst2() +
            ", est3=" + getEst3() +
            ", est4=" + getEst4() +
            ", est5=" + getEst5() +
            ", est6=" + getEst6() +
            ", est7=" + getEst7() +
            ", est8=" + getEst8() +
            ", est9=" + getEst9() +
            ", est10=" + getEst10() +
            ", tubo1=" + getTubo1() +
            ", tubo2=" + getTubo2() +
            ", tubo3=" + getTubo3() +
            ", cajSue1=" + getCajSue1() +
            ", cajSue2=" + getCajSue2() +
            ", cajSue3=" + getCajSue3() +
            ", cajSue4=" + getCajSue4() +
            ", cajSue5=" + getCajSue5() +
            ", hang=" + getHang() +
            ", camisero=" + getCamisero() +
            ", estCris1=" + getEstCris1() +
            ", estCris2=" + getEstCris2() +
            ", estCris3=" + getEstCris3() +
            ", estCris4=" + getEstCris4() +
            ", estCris5=" + getEstCris5() +
            ", estCris6=" + getEstCris6() +
            ", estCris7=" + getEstCris7() +
            ", estCris8=" + getEstCris8() +
            ", estCris9=" + getEstCris9() +
            ", estCris10=" + getEstCris10() +
            ", cajonVol1=" + getCajonVol1() +
            ", cajonVol2=" + getCajonVol2() +
            ", cajonVol3=" + getCajonVol3() +
            "}";
    }
}
