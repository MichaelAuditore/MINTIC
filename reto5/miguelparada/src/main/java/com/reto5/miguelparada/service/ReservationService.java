package com.reto5.miguelparada.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.reto5.miguelparada.model.Client;
import com.reto5.miguelparada.model.Reservation;
import com.reto5.miguelparada.repository.ClientRepository;
import com.reto5.miguelparada.repository.ReservationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ClientRepository clientRepository;

    public List<Reservation> getAllReservations() {
        return reservationRepository.getAll();
    }

    public Reservation getReservationById(int id) {
        return reservationRepository.getById(id);
    }

    public Reservation saveReservation(Reservation reservation) {
        if (reservation.getIdReservation() == null) {
            return reservationRepository.saveReservation(reservation);
        } else {
            Reservation getReservation = reservationRepository.getById(reservation.getIdReservation());
            if (getReservation != null) {
                return getReservation;
            } else {
                return reservationRepository.saveReservation(reservation);
            }
        }
    }

    public Reservation updateReservation(Reservation reservation) {
        if (reservation.getIdReservation() != null) {
            Reservation reservationToUpdate = reservationRepository.getById(reservation.getIdReservation());
            if (reservationToUpdate != null) {
                if (reservation.getDevolutionDate() != null) {
                    reservationToUpdate.setDevolutionDate(reservation.getDevolutionDate());
                }
                if (reservation.getStartDate() != null) {
                    reservationToUpdate.setStartDate(reservation.getStartDate());
                }

                if (reservation.getStatus() != null) {
                    reservationToUpdate.setStatus(reservation.getStatus());
                }
                return reservationRepository.saveReservation(reservationToUpdate);
            }
        }
        reservation.setStatus("created");
        return reservationRepository.saveReservation(reservation);
    }

    public void deleteReservation(int reservationId) {
        reservationRepository.deleteReservation(reservationId);
    }

    public List<Reservation> getReservationsBetweenDates(Date startDate, Date endDate) {
        return reservationRepository.getReservationsByDateRange(startDate, endDate);
    }

    public Map<String, Integer> getStatus() {
        Map<String, Integer> status = new HashMap<>();
        LinkedHashMap<String, Integer> reverseSortedMap = new LinkedHashMap<>();
        Integer completedReservations = reservationRepository.getCompletedStatus();
        Integer cancelledReservations = reservationRepository.getCancelledStatus();

        status.put("cancelled", cancelledReservations);
        status.put("completed", completedReservations);

        status.entrySet().stream().sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .forEachOrdered(x -> reverseSortedMap.put(x.getKey(), x.getValue()));

        return reverseSortedMap;
    }

    public List<Map> getReportClients() {
        List<Map> reportClients = new ArrayList<>();

        List<Client> clients = clientRepository.getAll();

        for (Client client : clients) {
            Map reservationMap = new HashMap<>();

            reservationMap.put("total", client.getReservations().size());
            reservationMap.put("client", client);

            reportClients.add(reservationMap);
        }

        return reportClients;
    }

}
