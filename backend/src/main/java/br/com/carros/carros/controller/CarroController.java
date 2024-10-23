package br.com.carros.carros.controller;

import br.com.carros.carros.entity.Carro;
import br.com.carros.carros.service.CarroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/carro")
public class CarroController {

    @Autowired
    private CarroService carroService;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Carro carro) {
        try {
            String mensagem = this.carroService.save(carro);
            return new ResponseEntity<String>(mensagem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>("Deu errado", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@RequestBody Carro carro, @PathVariable Long id) {
        try {
            String mensagem = this.carroService.update(carro, id);
            return new ResponseEntity<>(mensagem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<Carro>> listAll() {
        try {
            List<Carro> lista = this.carroService.listAll();
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Carro> findById(@PathVariable Long id) {

        try {
            Carro carro = this.carroService.findById(id);
            return new ResponseEntity<>(carro, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            String mensagem = this.carroService.delete(id);
            return new ResponseEntity<String>(mensagem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Deu errado", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

