package edu.fra.uas.parking.entity;

public enum Period {
    MORNING, AFTERNOON;

    public boolean isEqual(Period reservationPeriod) {
        return this == reservationPeriod;
    }
}
