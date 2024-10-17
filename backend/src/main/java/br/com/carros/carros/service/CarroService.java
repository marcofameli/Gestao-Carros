package br.com.carros.carros.service;

import br.com.carros.carros.entity.Carro;
import br.com.carros.carros.repository.CarroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarroService {
    @Autowired
    private CarroRepository carroRepository;


    public String save(Carro carro) {
        Carro savedCarro = this.carroRepository.save(carro);
        return "Carro salvo com sucesso! ID: " + savedCarro.getId();
    }

    public String update(Carro carro, Long id) {
        carro.setId(id);
        this.carroRepository.save(carro);
        return "Carro atualizado com sucesso!";
    }

    public List<Carro> listAll(){
        return  this.carroRepository.findAll();

    }

    public Carro findById(Long id) {
        return this.carroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Carro não encontrado com o ID: " + id));
    }

    public String delete(Long id) {
        this.carroRepository.deleteById(id);
        return "Carro deletado com sucesso!";
    }
}
