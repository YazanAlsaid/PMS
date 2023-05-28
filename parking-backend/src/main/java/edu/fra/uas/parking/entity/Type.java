package edu.fra.uas.parking.entity;

import jakarta.persistence.*;

import javax.validation.constraints.Size;
import java.util.Objects;

@Entity
public class Type extends BaseEntity{
    @Column(name = "Name",nullable = false)
    @Size(min = 3,max = 50)
    private String name;
    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "slot_id",nullable = false)
    private Slot slot;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public Slot getSlot() {
        return slot;
    }
    public void setSlot(Slot slot) {
        this.slot = slot;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Type type = (Type) o;
        return Objects.equals(slot, type.slot);
    }
    @Override
    public int hashCode() {
        return Objects.hash(slot);
    }
    @Override
    public String toString() {
        return "Type{" +
                "slot=" + slot +
                '}';
    }
}
