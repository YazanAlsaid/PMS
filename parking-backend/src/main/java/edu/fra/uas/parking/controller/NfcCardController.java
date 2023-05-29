package edu.fra.uas.parking.controller;

import java.util.List;

import javax.validation.Valid;

import edu.fra.uas.parking.entity.NfcCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.fra.uas.parking.repository.NfcCardRepository;

@RestController
@RequestMapping("/nfc-cards")
public class NfcCardController implements BaseController<NfcCard> {

    @Autowired
    private NfcCardRepository nfcCardRepository;

    @GetMapping()
    @Override
    public ResponseEntity<List<NfcCard>> index() {
        // gibt alle NfcCards zurück
        return new ResponseEntity<>(this.nfcCardRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@PathVariable Long id) {
        NfcCard nfcCard = this.nfcCardRepository.findById(id).orElse(null); // findById liefert ein Optional zurück
        if (nfcCard == null) {
            return new ResponseEntity<>("NFC card not found.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(nfcCard, HttpStatus.OK);
    }

    @PostMapping
    @Override
    public ResponseEntity<Object> create(@Valid @RequestBody NfcCard nfcCard) {
        NfcCard nfcCardCreated = this.nfcCardRepository.save(nfcCard);
        return new ResponseEntity<>(nfcCardCreated, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<Object> updateById(@RequestParam("id") Long id, NfcCard nfcCard) {
        NfcCard nfcCardToUpdate= this.nfcCardRepository.findById(id).get();
        if (nfcCardToUpdate == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        nfcCard = this.nfcCardRepository.save(nfcCard);
        return new ResponseEntity<>(nfcCard, HttpStatus.ACCEPTED);
    }


    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
        NfcCard nfcCardToDelete = this.nfcCardRepository.findById(id).orElse(null);
        if (nfcCardToDelete == null) {
            return new ResponseEntity<>("NFC card not found.", HttpStatus.NOT_FOUND);
        }

        this.nfcCardRepository.deleteById(id);
        return new ResponseEntity<>("NFC card deleted.", HttpStatus.NO_CONTENT);
    }

}
