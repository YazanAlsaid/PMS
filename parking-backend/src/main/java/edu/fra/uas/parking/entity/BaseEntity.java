package edu.fra.uas.parking.entity;

import jakarta.persistence.*;

import javax.validation.constraints.Size;

@Entity
public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Embedded
    private TimeStampDetails timeStampDetails;

    public Long getId() {
        return id;
    }
    public TimeStampDetails getTimeStampDetails() {
        return timeStampDetails;
    }

    public void setTimeStampDetails(TimeStampDetails timeStampDetails) {
        this.timeStampDetails = timeStampDetails;
    }
}
