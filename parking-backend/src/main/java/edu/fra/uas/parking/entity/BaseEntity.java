package edu.fra.uas.parking.entity;

import javax.persistence.*;

@MappedSuperclass
public abstract class BaseEntity {
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
