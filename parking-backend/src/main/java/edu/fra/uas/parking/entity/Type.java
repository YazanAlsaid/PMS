package edu.fra.uas.parking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "types")
public class Type extends BaseEntity {
    @Column(name = "name", nullable = false, unique = true)
    @Size(min = 3, max = 50)
    private String name;
    @JsonIgnore
    @OneToMany(mappedBy = "type", cascade = {CascadeType.MERGE, CascadeType.DETACH})
    private Set<Slot> slots = new HashSet<>();

    public Type() {
    }

    @SuppressWarnings("unused")
    public Type(String name) {
        this.name = name;
    }

    @SuppressWarnings("unused")
    public String getName() {
        return name;
    }

    @SuppressWarnings("unused")
    public void setName(String name) {
        this.name = name;
    }

    @SuppressWarnings("unused")
    public Set<Slot> getSlots() {
        return slots;
    }

    @SuppressWarnings("unused")
    public void setSlots(Set<Slot> slot) {
        this.slots = slot;
    }

    @SuppressWarnings("unused")
    public void addSlot(Slot slot) {
        this.slots.add(slot);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Type type = (Type) o;
        return Objects.equals(name, type.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name);
    }

    @Override
    public String toString() {
        return "Type{" +
                "name='" + name + '\'' +
                '}';
    }
}
