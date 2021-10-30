package com.reto5.miguelparada.model;

import java.io.Serializable;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "Message")
public class Message implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idMessage;

    @Column(length = 250)
    private String messageText;

    @ManyToOne
    @JoinColumn(name = "computerId")
    @JsonIgnoreProperties({ "messages", "reservations" })
    private Computer computer;

    @ManyToOne
    @JoinColumn(name = "messageId")
    @JsonIgnoreProperties({ "messages", "reservations", "client" })
    private Client client;

    public Integer getIdMessage() {
        return idMessage;
    }

    public void setIdMessage(Integer idMessage) {
        this.idMessage = idMessage;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
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
