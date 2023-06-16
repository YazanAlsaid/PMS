package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Type;
import edu.fra.uas.parking.repository.TypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/types")
public class TypeController implements BaseController<Type> {
    private final Logger logger = LoggerFactory.getLogger(TypeController.class);
    private final TypeRepository typeRepository;

    @Autowired
    public TypeController(TypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }

    @GetMapping()
    @Override
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing type: {}", this.typeRepository.count());
        CollectionModel<Type> types = CollectionModel.of(this.typeRepository.findAll());
        types.add(linkTo(methodOn(TypeController.class).index()).withSelfRel());

        for(Type p : types){
            p = this.addLinks(p);
        }

        return this.message("Indexing type", this.typeRepository.findAll(), HttpStatus.OK);

    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> getById(@PathVariable("id") Long id) {
        logger.debug("Getting type by id: {}", id);
        Optional<Type> optionalType = this.typeRepository.findById(id);
        if (optionalType.isEmpty()) {
            return this.message("Type not found", null, HttpStatus.NOT_FOUND);
        }
        Type type = this.addLinks(optionalType.get());
        return this.message("Getting type by id", type, HttpStatus.OK);
    }

    @PostMapping
    @Override
    public ResponseEntity<ResponseMessage> create(@Valid @RequestBody Type type) {
        logger.debug("Creating type: {}", type);
        Optional<Type> optionalType = (type.getId() != null) ? this.typeRepository.findById(type.getId()) : Optional.empty();
        if (optionalType.isPresent()) {
            return this.message("Type is already exists", null, HttpStatus.CONFLICT);

        }
        Type typeCreated = this.typeRepository.save(type);
        typeCreated = this.addLinks(typeCreated);

        return this.message("Creating type", typeCreated, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id, @RequestBody Type type) {
        logger.debug("Updating type by id: {}", id);
        Optional<Type> optionalBuilding = this.typeRepository.findById(id);
        if (optionalBuilding.isPresent() && optionalBuilding.get().getId().equals(type.getId())) {
            type = this.typeRepository.save(type);
            type = this.addLinks(type);

            return this.message("Updating type by id", type, HttpStatus.ACCEPTED);
        }
        return this.message("type not found", null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable("id") Long id) {
        logger.debug("Deleting type by id: {}", id);
        Optional<Type> typeUpdated = this.typeRepository.findById(id);
        if (typeUpdated.isPresent()) {
            this.typeRepository.deleteById(id);
            return this.message("Type is deleted", null, HttpStatus.NO_CONTENT);
        }
        return this.message("Type not found", null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id/slots}")
    public ResponseEntity<ResponseMessage> getSlotsByTypeId(@PathVariable("id") Long id) {
        logger.debug("Getting slots by type id: {}", id);
        Optional<Type> type = this.typeRepository.findById(id);
        if (type.isEmpty()) {
            return this.message("Type not found", null, HttpStatus.NOT_FOUND);
        }
        return this.message("Getting slots by type id", type.get().getSlots(), HttpStatus.OK);
    }

    private ResponseEntity<ResponseMessage> message(String message, Object data, HttpStatus httpStatus) {
        return new ResponseEntity<>(new ResponseMessage(message, data), httpStatus);
    }
    private Type addLinks(Type type){
        type.add(linkTo(methodOn(TypeController.class).getById(type.getId())).withSelfRel());
        type.add(linkTo(methodOn(TypeController.class).index()).withRel(IanaLinkRelations.COLLECTION));
        type.add(linkTo(methodOn(TypeController.class).getSlotsByTypeId(type.getId())).withRel("slots"));

        return type;
    }
}
