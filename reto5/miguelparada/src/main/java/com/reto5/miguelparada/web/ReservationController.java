package com.reto5.miguelparada.web;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.reto5.miguelparada.model.Reservation;
import com.reto5.miguelparada.service.ReservationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/Reservation")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/all")
    public List<Reservation> getReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/report-dates/{startDate}/{endDate}")
    public List<Reservation> getReservationsBetweenDates(
            @PathVariable("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @PathVariable("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        return reservationService.getReservationsBetweenDates(startDate, endDate);
    }

    @GetMapping("/report-status")
    public Map<String, Integer> getStatusReservations() {
        return reservationService.getStatus();
    }

    @GetMapping("/report-clients")
    public List<Map> getReportClientsReservations() {
        return reservationService.getReportClients();
    }

    @GetMapping("/{id}")
    public Reservation getReservation(@PathVariable("id") int reservationId) {
        return reservationService.getReservationById(reservationId);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveReservation(@RequestBody Reservation reservation) {
        reservationService.saveReservation(reservation);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateReservation(@RequestBody Reservation reservation) {
        reservationService.updateReservation(reservation);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteReservation(@PathVariable("id") int reservationId) {
        reservationService.deleteReservation(reservationId);
    }
}
