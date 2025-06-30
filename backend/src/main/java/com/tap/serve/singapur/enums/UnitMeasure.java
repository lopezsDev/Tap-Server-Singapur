package com.tap.serve.singapur.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UnitMeasure {
    ML("Mililitros"),
    OZ("Onzas"),
    L("Litros"),
    TAZA("Taza"),
    KG("Kilogramos"),
    G("Gramos");

    private final String label;
}

