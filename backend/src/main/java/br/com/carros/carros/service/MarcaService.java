package br.com.carros.carros.service;


import br.com.carros.carros.entity.Marca;
import br.com.carros.carros.repository.MarcaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarcaService {
    @Autowired
    private MarcaRepository marcaRepository;


    public String save(Marca marca) {
        Marca savedMarca = this.marcaRepository.save(marca);
        return "Marca salvo com sucesso! ID: " + savedMarca.getId();
    }

    public String update(Marca marca, Long id) {
        marca.setId(id);
        this.marcaRepository.save(marca);
        return "Marca atualizado com sucesso!";
    }

    public List<Marca> listAll(){
        return  this.marcaRepository.findAll();

    }

    public Marca findById(Long id) {
        return this.marcaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca não encontrado com o ID: " + id));
    }

    public String delete(Long id) {
        this.marcaRepository.deleteById(id);
        return "Marca deletado com sucesso!";
    }
}
