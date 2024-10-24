package br.com.carros.carros.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Carro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private int anoLancamento;

    @ManyToOne
    @JsonIgnoreProperties("carros")
    private Marca marca;


    @ManyToMany
    @JoinTable(name = "carro_proprietario")
    private List<Proprietario> proprietarios;


}



