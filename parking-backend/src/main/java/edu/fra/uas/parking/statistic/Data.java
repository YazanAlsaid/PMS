package edu.fra.uas.parking.statistic;

public class Data {
    private final long numberOFUsers;
    private final long numberOfParks;
    private final long numberOfBuildings;
    private final long numberOfSlots;

    public Data(long numberOFUsers, long numberOfParks, long numberOfBuildings, long numberOfSlots) {
        this.numberOFUsers = numberOFUsers;
        this.numberOfParks = numberOfParks;
        this.numberOfBuildings = numberOfBuildings;
        this.numberOfSlots = numberOfSlots;
    }

    public long getNumberOFUsers() {
        return numberOFUsers;
    }

    public long getNumberOfParks() {
        return numberOfParks;
    }

    public long getNumberOfBuildings() {
        return numberOfBuildings;
    }

    public long getNumberOfSlots() {
        return numberOfSlots;
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