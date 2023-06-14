package edu.fra.uas.parking.entity;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.hateoas.RepresentationModel;


import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass
public abstract class BaseEntity extends RepresentationModel<BaseEntity> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @SuppressWarnings("unused")
    public Long getId() {
        return id;
    }

    @SuppressWarnings("unused")
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    @SuppressWarnings("unused")
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
