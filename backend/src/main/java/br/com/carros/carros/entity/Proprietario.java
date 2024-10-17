package br.com.carros.carros.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.naming.StringRefAddr;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Proprietario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;

}
