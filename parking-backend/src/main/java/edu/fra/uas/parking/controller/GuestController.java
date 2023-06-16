package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Guest;
import edu.fra.uas.parking.repository.GuestRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/guests")
public class GuestController implements BaseController<Guest> {

    private final Logger logger = LoggerFactory.getLogger(GuestController.class);
    private final GuestRepository guestRepository;

    @Autowired
    public GuestController(GuestRepository guestRepository) {
        this.guestRepository = guestRepository;
    }

    @GetMapping
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing guests: {}", this.guestRepository.count());
        return this.message("Indexing guests", this.guestRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseMessage> getById(@PathVariable("id") Long id) {
        logger.debug("Getting guests by id: {}", id);
        Optional<Guest> guest = this.guestRepository.findById(id);
        if (guest.isEmpty()) {
            return this.message("guest not found", null, HttpStatus.NOT_FOUND);
        }
        return this.message("Getting guest by id", this.guestRepository.findById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ResponseMessage> create(@Valid @RequestBody Guest guest) {
        logger.debug("Creating guest: {}", guest);
        Optional<Guest> guestOptional = (guest.getId() != null) ? this.guestRepository.findById(guest.getId()) : Optional.empty();
        if (guestOptional.isPresent()) {
            return this.message("guest is already exists", null, HttpStatus.CONFLICT);
        }
        Guest createdGuest = this.guestRepository.save(guest);
        return this.message("Creating guest", createdGuest, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id, Guest guest) {
        logger.debug("Updating guest by id: {}", id);
        Optional<Guest> optionalGuest = this.guestRepository.findById(id);
        if (optionalGuest.isPresent() && optionalGuest.get().getId().equals(guest.getId())) {
            guest = this.guestRepository.save(guest);
            return this.message("Updating guest by id", guest, HttpStatus.ACCEPTED);
        }
        return this.message("guest not found", null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable("id") Long id) {
        logger.debug("Deleting guest by id: {}", id);
        Optional<Guest> guestUpdated = this.guestRepository.findById(id);
        if (guestUpdated.isPresent()) {
            this.guestRepository.deleteById(id);
            return this.message("guest is deleted", null, HttpStatus.NO_CONTENT);
        }
        return this.message("guest not found", null, HttpStatus.NOT_FOUND);
    }

    private ResponseEntity<ResponseMessage> message(String message, Object data, HttpStatus httpStatus) {
        return new ResponseEntity<>(new ResponseMessage(message, data), httpStatus);
    }
}
