package com.reto4.miguelparada.service;

import java.util.List;

import com.reto4.miguelparada.model.Reservation;
import com.reto4.miguelparada.repository.ReservationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAllReservations() {
        return reservationRepository.getAll();
    }

    public Reservation getReservationById(int id) {
        return reservationRepository.getById(id);
    }

    public Reservation saveReservation(Reservation reservation) {
        if (reservation.getIdReservation() == null) {
            reservation.setStatus("created");
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
}
