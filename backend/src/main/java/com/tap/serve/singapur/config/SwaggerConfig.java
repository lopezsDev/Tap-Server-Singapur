package com.tap.serve.singapur.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Tap & Serve Singapur API")
                        .version("1.0")
                        .description("API para la gestión de Singapur")
                        .contact(new Contact()
                                .name("Samir López M.")
                                .email("lopezs.dev@gmail.com"))
                );
    }
}

