package edu.fra.uas.parking.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Type extends BaseEntity{

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "slot_id",nullable = false)
    private Slot slot;

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
