package com.tap.serve.singapur.config;

public record ApiResp<T>(
        String message,
        String status,
        T data
) {
    public static <T> ApiResp<T> success(String message, T data) {
        return new ApiResp<>(message, "SUCCESS", data);
    }

    public static <T> ApiResp<T> error(String message) {
        return new ApiResp<>(message, "ERROR", null);
    }

    public static <T> ApiResp<T> empty(String message) {
        return new ApiResp<>(message, "EMPTY", null);
    }
}