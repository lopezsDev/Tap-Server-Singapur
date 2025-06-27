package com.tap.serve.singapur.utils.exception;

import com.tap.serve.singapur.utils.ApiResp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsuarioYaExisteException.class)
    public ResponseEntity<ApiResp<Void>> handleUsuarioYaExiste(UsuarioYaExisteException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(ApiResp.error(ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResp<Void>> handleGeneric(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResp.error("Error interno del servidor"));
    }
}
