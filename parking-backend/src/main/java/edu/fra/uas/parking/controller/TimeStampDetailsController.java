package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.entity.Building;
import edu.fra.uas.parking.entity.TimeStampDetails; // importieren Sie TimeStampDetails, nicht Building
import edu.fra.uas.parking.repository.TimeStampDetailsRepository; // importieren Sie TimeStampDetailsRepository, nicht BuildingRepository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/time-stamp-details") // verwenden Sie den richtigen Request-Mapping-Pfad
public class TimeStampDetailsController implements BaseController<TimeStampDetails> {

    @Autowired
    private TimeStampDetailsRepository timeStampDetailsRepository;

    @GetMapping()
    @Override
    public ResponseEntity<List<TimeStampDetails>> index() { // geben Sie eine Liste von TimeStampDetails zurück
        List<TimeStampDetails> details = this.timeStampDetailsRepository.findAll(); // speichern Sie das Ergebnis in einer Variable
        return new ResponseEntity<>(details, HttpStatus.OK); // geben Sie die Variable zurück
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@PathVariable("id") Long id) { // verwenden Sie @PathVariable, um den ID-Parameter zu erhalten
        TimeStampDetails details = this.timeStampDetailsRepository.findById(id).orElse(null); // gibt ein Optional zurück
        if (details == null) {
            return new ResponseEntity<>("Time stamp details not found.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(details, HttpStatus.OK);
    }

    @PostMapping
    @Override
    public ResponseEntity<Object> create(@Valid @RequestBody TimeStampDetails details) { // verwenden Sie den richtigen Parameter-Typ
        TimeStampDetails detailsCreated = this.timeStampDetailsRepository.save(details);
        return new ResponseEntity<>(detailsCreated, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<Object> updateById(@RequestParam("id") Long id, TimeStampDetails timeStampDetails) {
        TimeStampDetails timeStampDetailsUpdated = this.timeStampDetailsRepository.findById(id).get();
        if (timeStampDetailsUpdated == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        timeStampDetails = this.timeStampDetailsRepository.save(timeStampDetails);
        return new ResponseEntity<>(timeStampDetails, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) { // verwenden Sie ebenfalls @PathVariable
        TimeStampDetails detailsToDelete = this.timeStampDetailsRepository.findById(id).orElse(null);
        if (detailsToDelete == null) {
            return new ResponseEntity<>("Time stamp details not found.", HttpStatus.NOT_FOUND);
        }
        this.timeStampDetailsRepository.deleteById(id);
        return new ResponseEntity<>("Time stamp details deleted.", HttpStatus.NO_CONTENT);
    }
}
