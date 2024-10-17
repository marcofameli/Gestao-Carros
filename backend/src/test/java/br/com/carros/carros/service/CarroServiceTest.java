package br.com.carros.carros.service;

import br.com.carros.carros.entity.Carro;
import br.com.carros.carros.entity.Proprietario;
import br.com.carros.carros.repository.CarroRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CarroServiceTest {

    // Injeta a instância do CarroService que estamos testando
    @InjectMocks
    private CarroService carroService;

    // Cria um mock do CarroRepository para simular seu comportamento
    @Mock
    private CarroRepository carroRepository;

    // Instância de Carro que será usada em diversos testes
    private Carro carro;

    // Este método é executado antes de cada teste
    @BeforeEach
    void setUp() {
        // Inicializa os mocks
        MockitoAnnotations.openMocks(this);

        // Criando um objeto Marca para associar ao carro
        Marca marca = new Marca(); // Certifique-se de que Marca tenha um construtor padrão
        marca.setNome("Volkswagen");

        // Criando um objeto Proprietario para associar ao carro
        Proprietario proprietario = new Proprietario(); // Certifique-se de que Proprietario tenha um construtor padrão
        proprietario.setNome("João");

        // Criando um carro de exemplo
        carro = new Carro();
        carro.setId(1L); // Definindo um ID para o carro
        carro.setNome("Fusca"); // Definindo o nome do carro
        carro.setAnoLancamento(1968); // Definindo o ano de lançamento do carro
        carro.setMarca(marca); // Associando a marca ao carro
        carro.setProprietarios(Collections.singletonList(proprietario)); // Associando o proprietário ao carro
    }

    // Testa o método save() do CarroService
    @Test
    void save() {
        // Configura o comportamento do mock para retornar o carro quando o método save for chamado
        when(carroRepository.save(any(Carro.class))).thenReturn(carro);

        // Chama o método save do serviço
        String result = carroService.save(carro);

        // Verifica se a mensagem de sucesso é a esperada
        assertEquals("Carro salvo com sucesso! ID: 1", result);
        // Verifica se o método save do repositório foi chamado uma vez
        verify(carroRepository, times(1)).save(carro);
    }

    // Testa o método update() do CarroService
    @Test
    void update() {
        // Configura o comportamento do mock para retornar o carro quando o método save for chamado
        when(carroRepository.save(any(Carro.class))).thenReturn(carro);

        // Chama o método update do serviço
        String result = carroService.update(carro, 1L);

        // Verifica se a mensagem de sucesso é a esperada
        assertEquals("Carro atualizado com sucesso!", result);
        // Verifica se o método save do repositório foi chamado uma vez
        verify(carroRepository, times(1)).save(carro);
    }

    // Testa o método findAll() do CarroService
    @Test
    void findAll() {
        // Cria uma lista e adiciona o carro de exemplo
        List<Carro> lista = new ArrayList<>();
        lista.add(carro);

        // Configura o comportamento do mock para retornar a lista de carros
        when(carroRepository.findAll()).thenReturn(lista);

        // Chama o método findAll do serviço
        List<Carro> result = carroService.listAll();

        // Verifica se a lista retornada contém um carro
        assertEquals(1, result.size());
        // Verifica se o nome do carro na lista é o esperado
        assertEquals("Fusca", result.get(0).getNome());
        // Verifica se o método findAll do repositório foi chamado uma vez
        verify(carroRepository, times(1)).findAll();
    }

    // Testa o método findById() do CarroService
    @Test
    void findById() {
        // Configura o comportamento do mock para retornar o carro quando o método findById for chamado com o ID 1
        when(carroRepository.findById(1L)).thenReturn(Optional.of(carro));

        // Chama o método findById do serviço
        Carro result = carroService.findById(1L);

        // Verifica se o resultado não é nulo
        assertNotNull(result);
        // Verifica se o nome do carro retornado é o esperado
        assertEquals("Fusca", result.getNome());
        // Verifica se o método findById do repositório foi chamado uma vez
        verify(carroRepository, times(1)).findById(1L);
    }

    // Testa o método findById() quando o carro não é encontrado
    @Test
    void findByIdNotFound() {
        // Configura o comportamento do mock para retornar um Optional vazio
        when(carroRepository.findById(1L)).thenReturn(Optional.empty());

        // Verifica se uma exceção é lançada quando o carro não é encontrado
        RuntimeException thrown = assertThrows(RuntimeException.class, () -> {
            carroService.findById(1L);
        });

        // Verifica se a mensagem da exceção é a esperada
        assertEquals("Carro não encontrado com o ID: 1", thrown.getMessage());
    }

    // Testa o método delete() do CarroService
    @Test
    void delete() {
        // Configura o comportamento do mock para não fazer nada ao deletar o carro
        doNothing().when(carroRepository).deleteById(1L);

        // Chama o método delete do serviço
        String result = carroService.delete(1L);

        // Verifica se a mensagem de sucesso é a esperada
        assertEquals("Carro deletado com sucesso!", result);
        // Verifica se o método deleteById do repositório foi chamado uma vez
        verify(carroRepository, times(1)).deleteById(1L);
    }
}
