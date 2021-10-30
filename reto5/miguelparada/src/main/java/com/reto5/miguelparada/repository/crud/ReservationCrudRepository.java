package com.reto5.miguelparada.repository.crud;

import java.util.Date;
import java.util.List;

import com.reto5.miguelparada.model.Reservation;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ReservationCrudRepository extends CrudRepository<Reservation, Integer> {
    @Query(value = "from Reservation r where startDate BETWEEN :startDate AND :endDate")
    public List<Reservation> getAllBetweenDates(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query(value = "SELECT count(r) FROM Reservation r WHERE r.status = 'completed'")
    public Integer getStatusCompleted();

    @Query(value = "SELECT count(r) FROM Reservation r WHERE r.status = 'cancelled'")
    public Integer getStatusCancelled();

}
