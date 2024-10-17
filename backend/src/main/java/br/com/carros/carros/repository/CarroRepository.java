package br.com.carros.carros.repository;

import br.com.carros.carros.entity.Carro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarroRepository extends JpaRepository<Carro, Long> {
}
