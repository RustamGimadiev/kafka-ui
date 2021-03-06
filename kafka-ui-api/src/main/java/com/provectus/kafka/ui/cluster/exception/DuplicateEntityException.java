package com.provectus.kafka.ui.cluster.exception;

import org.springframework.http.HttpStatus;

public class DuplicateEntityException extends CustomBaseException{

    public DuplicateEntityException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getResponseStatusCode() {
        return HttpStatus.CONFLICT;
    }
}
