package br.com.carros.carros.service;


import br.com.carros.carros.entity.Marca;
import br.com.carros.carros.entity.Proprietario;
import br.com.carros.carros.repository.MarcaRepository;
import br.com.carros.carros.repository.ProprietarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProprietarioService {
    @Autowired
    private ProprietarioRepository proprietarioRepository;


    public String save(Proprietario proprietario) {
        Proprietario savedProprietario = this.proprietarioRepository.save(proprietario);
        return "Proprietario salvo com sucesso! ID: " + savedProprietario.getId();
    }

    public String update(Proprietario proprietario, Long id) {
        proprietario.setId(id);
        this.proprietarioRepository.save(proprietario);
        return "Proprietario atualizado com sucesso!";
    }

    public List<Proprietario> listAll(){
        return  this.proprietarioRepository.findAll();

    }

    public Proprietario findById(Long id) {
        return this.proprietarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proprietario não encontrado com o ID: " + id));
    }

    public String delete(Long id) {
        this.proprietarioRepository.deleteById(id);
        return "Proprietario deletado com sucesso!";
    }
}
