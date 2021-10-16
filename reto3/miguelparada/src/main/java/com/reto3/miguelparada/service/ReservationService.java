package com.reto3.miguelparada.service;

import java.util.List;

import com.reto3.miguelparada.model.Reservation;
import com.reto3.miguelparada.repository.ReservationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAllReservations() {
        return reservationRepository.getAll();
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
}
