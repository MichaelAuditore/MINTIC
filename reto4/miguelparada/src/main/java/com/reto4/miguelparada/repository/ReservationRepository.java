package com.reto4.miguelparada.repository;

import java.util.List;

import com.reto4.miguelparada.model.Reservation;
import com.reto4.miguelparada.repository.crud.ReservationCrudRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ReservationRepository {
    @Autowired
    private ReservationCrudRepository reservationCrudRepository;

    public List<Reservation> getAll() {
        return (List<Reservation>) reservationCrudRepository.findAll();
    }

    public Reservation getById(int id) {
        return reservationCrudRepository.findById(id).orElse(null);
    }

    public Reservation saveReservation(Reservation reservation) {
        return reservationCrudRepository.save(reservation);
    }

    public void deleteReservation(int reservationId) {
        reservationCrudRepository.deleteById(reservationId);
    }
}
