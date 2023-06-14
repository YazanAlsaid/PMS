package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.common.ResponseMessage;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BaseController <T>{

    ResponseEntity<ResponseMessage> index();

    ResponseEntity<ResponseMessage> getById(Long id);

    ResponseEntity<ResponseMessage> create(T t);

    ResponseEntity<ResponseMessage> updateById(Long id, T t);

    ResponseEntity<ResponseMessage> deleteById(Long id);
}
