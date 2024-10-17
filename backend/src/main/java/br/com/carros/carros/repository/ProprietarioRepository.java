package br.com.carros.carros.repository;

import br.com.carros.carros.entity.Carro;
import br.com.carros.carros.entity.Proprietario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProprietarioRepository extends JpaRepository<Proprietario, Long> {
}
