package edu.fra.uas.parking.controller;

import java.util.Set;
import java.util.Optional;

import javax.validation.Valid;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.NfcCard;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.fra.uas.parking.repository.NfcCardRepository;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/nfc-cards")
public class NfcCardController implements BaseController<NfcCard> {
    private final Logger logger = LoggerFactory.getLogger(NfcCardController.class);

    private final NfcCardRepository nfcCardRepository;

    @Autowired
    public NfcCardController(NfcCardRepository nfcCardRepository) {
        this.nfcCardRepository = nfcCardRepository;
    }

    @GetMapping()
    @Override
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing nfcCard: {}", this.nfcCardRepository.count());
        CollectionModel<NfcCard> nfcCards = CollectionModel.of(this.nfcCardRepository.findAll());
        nfcCards.add(linkTo(methodOn(ParkController.class).index()).withSelfRel());
        for (NfcCard p : nfcCards){
            p = this.addLinks(p);
        }

        return  this.message("Indexing nfcCard", this.nfcCardRepository.findAll(), HttpStatus.OK);

    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> getById(@PathVariable Long id) {
        logger.debug("Getting building by id: {}", id);
        Optional<NfcCard> optionalNfcCard = this.nfcCardRepository.findById(id);
        if (optionalNfcCard.isEmpty()) {
            return this.message("NfcCard not found", null, HttpStatus.NOT_FOUND);
        }

         NfcCard nfcCard = this.addLinks(optionalNfcCard.get());
        return  this.message("Getting nfcCard by id", nfcCard, HttpStatus.OK);    }

    @PostMapping
    @Override
    public ResponseEntity<ResponseMessage> create(@Valid @RequestBody NfcCard nfcCard) {
        logger.debug("Creating nfcCard: {}", nfcCard);
        Optional<NfcCard> optionalNfcCard = (nfcCard.getId() != null) ? this.nfcCardRepository.findById(nfcCard.getId()) : Optional.empty();
        if (optionalNfcCard.isPresent()) {
            return this.message("NfcCard is already exists", null, HttpStatus.CONFLICT);

        }
        NfcCard buildingCreated = this.nfcCardRepository.save(nfcCard);
        buildingCreated = this.addLinks(buildingCreated);

        return this.message("Creating nfcCard", buildingCreated, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id, @RequestBody NfcCard nfcCard) {
        logger.debug("Updating nfcCard by id: {}", id);
        Optional<NfcCard> optionalBuilding = this.nfcCardRepository.findById(id);
        if (optionalBuilding.isPresent() && optionalBuilding.get().getId().equals(nfcCard.getId())) {
            nfcCard = this.nfcCardRepository.save(nfcCard);
            nfcCard = this.addLinks(nfcCard);

            return this.message("Updating nfcCard by id", nfcCard, HttpStatus.ACCEPTED);
        }
        return this.message("NfcCard not found", null, HttpStatus.NOT_FOUND);
    }


    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable("id") Long id) {
        logger.debug("Deleting nfcCard by id: {}", id);
        Optional<NfcCard> buildingUpdated = this.nfcCardRepository.findById(id);
        if (buildingUpdated.isPresent()) {
            this.nfcCardRepository.deleteById(id);
            return this.message("NfcCard is deleted", null, HttpStatus.NO_CONTENT);
        }
        return this.message("NfcCard not found", null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}/reservations")
    public ResponseEntity<ResponseMessage> getReservationsByNfcCardId(@PathVariable("id") Long id) {
        logger.debug("Getting reservations by nfcCard id: {}", id);
        Optional<NfcCard> nfcCard = this.nfcCardRepository.findById(id);
        if (nfcCard.isEmpty()) {
            return this.message("NfcCard not found", null, HttpStatus.NOT_FOUND);
        }
        return this.message("Getting reservations by nfcCard id", nfcCard.get().getReservations(), HttpStatus.OK);
    }

    @GetMapping("/{id}/user")
    public ResponseEntity<ResponseMessage> getUserByNfcCardId(@PathVariable("id") Long id) {
        logger.debug("Getting user by nfcCard id: {}", id);
        Optional<NfcCard> nfcCard = this.nfcCardRepository.findById(id);
        if (nfcCard.isEmpty()) {
            return this.message("NfcCard not found", null, HttpStatus.NOT_FOUND);
        }
        return this.message("Getting user by nfcCard id", nfcCard.get().getUser(), HttpStatus.OK);
    }

    private ResponseEntity<ResponseMessage> message(String message, Object data, HttpStatus httpStatus) {
        return new ResponseEntity<>(new ResponseMessage(message, data), httpStatus);
    }



    private NfcCard addLinks(NfcCard nfcCard){
        nfcCard.add(linkTo(methodOn(NfcCardController.class).getById(nfcCard.getId())).withSelfRel());
        nfcCard.add(linkTo(methodOn(NfcCardController.class).index()).withRel(IanaLinkRelations.COLLECTION));
        nfcCard.add(linkTo(methodOn(NfcCardController.class).getReservationsByNfcCardId(nfcCard.getId())).withRel("reservations"));

        return nfcCard;
    }
}
