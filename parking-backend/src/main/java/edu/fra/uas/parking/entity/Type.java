package edu.fra.uas.parking.entity;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "types")
public class Type extends BaseEntity {
    @Column(name = "Name", nullable = false)
    @Size(min = 3, max = 50)
    private String name;
    @OneToMany(mappedBy = "type",cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH})
    private Set<Slot> slots = new HashSet<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Slot> getSlot() {
        return slots;
    }

    public void setSlots(Set<Slot> slot) {
        this.slots = slot;
    }

    public void addSlot(Slot slot) {
        this.slots.add(slot);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Type type = (Type) o;
        return Objects.equals(name, type.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }

    @Override
    public String toString() {
        return "Type{" +
                "name='" + name + '\'' +
                '}';
    }
}
