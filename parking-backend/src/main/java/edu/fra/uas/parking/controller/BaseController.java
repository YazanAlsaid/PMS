package edu.fra.uas.parking.controller;

import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Objects;

public interface BaseController <T>{

    ResponseEntity<List<T>> index();

    ResponseEntity<Object> getById(Long id);

    ResponseEntity<Object> create(T t);

    ResponseEntity<Object> updateById(Long id, T t);

    ResponseEntity<Object> deleteById(Long id);
}
