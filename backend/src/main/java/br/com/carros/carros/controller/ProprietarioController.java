package br.com.carros.carros.controller;



import br.com.carros.carros.entity.Proprietario;
import br.com.carros.carros.service.ProprietarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/proprietario")
public class ProprietarioController {

    @Autowired
    private ProprietarioService proprietarioService;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Proprietario proprietario) {
        try {
            String mensagem = this.proprietarioService.save(proprietario);
            return new ResponseEntity<String>(mensagem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>("Deu errado", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@RequestBody Proprietario proprietario, @PathVariable Long id) {
        try {
            String mensagem = this.proprietarioService.update(proprietario, id);
            return new ResponseEntity<>(mensagem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<Proprietario>> listAll() {
        try {
            List<Proprietario> lista = this.proprietarioService.listAll();
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Proprietario> findById(@PathVariable Long id) {

        try {
            Proprietario proprietario = this.proprietarioService.findById(id);
            return new ResponseEntity<>(proprietario, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            String mensagem = this.proprietarioService.delete(id);
            return new ResponseEntity<String>(mensagem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Deu errado", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

