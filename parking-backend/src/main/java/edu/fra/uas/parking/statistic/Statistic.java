package edu.fra.uas.parking.statistic;

public record Statistic(long numberOFUsers, long numberOfParks, long numberOfBuildings, long numberOfSlots) {
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Statistic that = (Statistic) o;
        return numberOFUsers == that.numberOFUsers && numberOfParks == that.numberOfParks && numberOfBuildings == that.numberOfBuildings && numberOfSlots == that.numberOfSlots;
    }

    @Override
    public String toString() {
        return "Data{" +
                "numberOFUsers=" + numberOFUsers +
                ", numberOfParks=" + numberOfParks +
                ", numberOfBuildings=" + numberOfBuildings +
                ", numberOfSlots=" + numberOfSlots +
                '}';
    }
}