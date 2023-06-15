package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Address;
import edu.fra.uas.parking.repository.AddressRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/addresses")
public class AddressController implements BaseController<Address>{

    private final Logger logger = LoggerFactory.getLogger(AddressController.class);

    private final AddressRepository addressRepository;
    @Autowired
    public AddressController(AddressRepository addressRepository){
        this.addressRepository = addressRepository;
    }
    @GetMapping
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing building: {}", this.addressRepository.count());
        return this.message("Indexing Address", this.addressRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseMessage> getById(@PathVariable("id") Long id) {
        logger.debug("Getting address by id: {}", id);
        Optional<Address> address = this.addressRepository.findById(id);
        if (address.isEmpty()) {
            return this.message("Address not found", null, HttpStatus.NOT_FOUND);
        }
        return this.message("Getting address by id", this.addressRepository.findById(id), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<ResponseMessage> create(@Valid @RequestBody Address address) {
        logger.debug("Creating address: {}", address);
        Optional<Address> optionalAddress = (address.getId() != null) ? this.addressRepository.findById(address.getId()) : Optional.empty();
        if (optionalAddress.isPresent()) {
            return this.message("Address is already exists", null, HttpStatus.CONFLICT);
        }
        Address addressCreated = this.addressRepository.save(address);
        return this.message("Creating address", addressCreated, HttpStatus.CREATED);
        }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseMessage> updateById(@PathVariable Long id, Address address) {
        logger.debug("Updating address by id: {}", id);
        Optional<Address> optionalAddress = this.addressRepository.findById(id);
        if (optionalAddress.isPresent() && optionalAddress.get().getId().equals(address.getId())) {
            address = this.addressRepository.save(address);
            return this.message("Updating address by id", address, HttpStatus.ACCEPTED);
        }
        return this.message("address not found", null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable Long id) {
        logger.debug("Deleting address by id: {}", id);
        Optional<Address> addressUpdated = this.addressRepository.findById(id);
        if (addressUpdated.isPresent()) {
            this.addressRepository.deleteById(id);
            return this.message("address is deleted", null, HttpStatus.NO_CONTENT);
        }
        return this.message("address not found", null, HttpStatus.NOT_FOUND);
    }
    private ResponseEntity<ResponseMessage> message(String message, Object data, HttpStatus httpStatus) {
        return new ResponseEntity<>(new ResponseMessage(message, data), httpStatus);
    }
}
