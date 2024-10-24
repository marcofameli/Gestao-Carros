package br.com.carros.carros.controller;


import br.com.carros.carros.entity.Marca;
import br.com.carros.carros.service.MarcaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/marca")
public class MarcaController {

    @Autowired
    private MarcaService marcaService;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Marca marca) {
        try {
            String mensagem = this.marcaService.save(marca);
            return new ResponseEntity<String>(mensagem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>("Deu errado", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@RequestBody Marca marca, @PathVariable Long id) {
        try {
            String mensagem = this.marcaService.update(marca, id);
            return new ResponseEntity<>(mensagem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<Marca>> listAll() {
        try {
            List<Marca> lista = this.marcaService.listAll();
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Marca> findById(@PathVariable Long id) {

        try {
            Marca marca = this.marcaService.findById(id);
            return new ResponseEntity<>(marca, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            String mensagem = this.marcaService.delete(id);
            return new ResponseEntity<String>(mensagem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Deu errado", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

