package com.reto5.miguelparada.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.beans.factory.annotation.Value;

@Entity
@Table(name = "Reservation")
public class Reservation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idReservation;

    private Date startDate;

    private Date devolutionDate;

    @Value("${some.key: created}")
    private String status;

    @ManyToOne(targetEntity = Computer.class)
    @JoinColumn(name = "categoryId")
    @JsonIgnoreProperties({ "reservations", "client" })
    private Computer computer;

    @ManyToOne(targetEntity = Client.class)
    @JoinColumn(name = "clientId")
    @JsonIgnoreProperties({ "reservations", "messages", "client" })
    private Client client;

    @Value(value = "null")
    private Integer score;

    public Integer getScore() {
        return score;
    }

    public Integer getIdReservation() {
        return idReservation;
    }

    public void setIdReservation(Integer idReservation) {
        this.idReservation = idReservation;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getDevolutionDate() {
        return devolutionDate;
    }

    public void setDevolutionDate(Date devolutionDate) {
        this.devolutionDate = devolutionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Computer getComputer() {
        return computer;
    }

    public void setComputer(Computer computer) {
        this.computer = computer;
    }

}
