package br.com.carros.carros.repository;

import br.com.carros.carros.entity.Carro;
import br.com.carros.carros.entity.Marca;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarcaRepository extends JpaRepository<Marca, Long> {
}
