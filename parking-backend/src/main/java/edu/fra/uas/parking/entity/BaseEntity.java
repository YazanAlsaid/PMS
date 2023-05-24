package edu.fra.uas.parking.entity;

import jakarta.persistence.*;

import javax.validation.constraints.Size;

@Entity
public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "Name",nullable = false)
    @Size(min = 3,max = 50)
    private String name;

    @Embedded
    private TimeStampDetails timeStampDetails;

    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TimeStampDetails getTimeStampDetails() {
        return timeStampDetails;
    }

    public void setTimeStampDetails(TimeStampDetails timeStampDetails) {
        this.timeStampDetails = timeStampDetails;
    }
}
