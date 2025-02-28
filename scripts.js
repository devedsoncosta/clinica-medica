// Função para mostrar apenas a seção clicada e ocultar as outras
function mostrarSecao(idSecao) {
  const secoes = document.querySelectorAll('.form-container, .table-container');
  secoes.forEach(secao => {
    secao.style.display = 'none';
  });

  if (idSecao) {
    const secaoSelecionada = document.getElementById(idSecao);
    if (secaoSelecionada) {
      secaoSelecionada.style.display = 'block';
    }
  }
}

// Adiciona eventos de clique aos botões do menu
document.querySelectorAll('.menu a').forEach(botao => {
  botao.addEventListener('click', function (e) {
    e.preventDefault();
    const idSecao = this.getAttribute('href').substring(1);
    mostrarSecao(idSecao);
  });
});

// Oculta todas as seções ao carregar a página
window.onload = function () {
  mostrarSecao('');
  carregarDadosIniciais();
};

// Função para salvar dados no localStorage
function salvarDados(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

// Função para carregar dados do localStorage
function carregarDados(chave) {
  const dados = localStorage.getItem(chave);
  return dados ? JSON.parse(dados) : [];
}

// Carregar dados ao iniciar a página
let pacientes = carregarDados('pacientes');
let medicos = carregarDados('medicos');
let consultas = carregarDados('consultas');
let prontuarios = carregarDados('prontuarios');
let receitas = carregarDados('receitas');
let exames = carregarDados('exames');
let pagamentos = carregarDados('pagamentos');

// Função para cadastrar paciente
document.getElementById('form-paciente').addEventListener('submit', function (e) {
  e.preventDefault();
  const paciente = {
    nome: document.getElementById('nome-paciente').value,
    cpf: document.getElementById('cpf-paciente').value,
    dataNascimento: document.getElementById('data-nascimento-paciente').value,
    telefone: document.getElementById('telefone-paciente').value,
    email: document.getElementById('email-paciente').value,
  };
  pacientes.push(paciente);
  salvarDados('pacientes', pacientes);
  alert('Paciente cadastrado com sucesso!');
  document.getElementById('form-paciente').reset();
  atualizarSelects();
});

// Função para cadastrar médico
document.getElementById('form-medico').addEventListener('submit', function (e) {
  e.preventDefault();
  const medico = {
    nome: document.getElementById('nome-medico').value,
    crm: document.getElementById('crm-medico').value,
    telefone: document.getElementById('telefone-medico').value,
    especialidade: document.getElementById('especialidade-medico').value,
  };
  medicos.push(medico);
  salvarDados('medicos', medicos);
  alert('Médico cadastrado com sucesso!');
  document.getElementById('form-medico').reset();
  atualizarSelects();
});

// Função para agendar consulta
document.getElementById('form-consulta').addEventListener('submit', function (e) {
  e.preventDefault();
  const consulta = {
    paciente: document.getElementById('paciente-consulta').value,
    medico: document.getElementById('medico-consulta').value,
    data: document.getElementById('data-consulta').value,
    descricao: document.getElementById('descricao-consulta').value,
  };
  consultas.push(consulta);
  salvarDados('consultas', consultas);
  alert('Consulta agendada com sucesso!');
  document.getElementById('form-consulta').reset();
});

// Função para emitir receita
document.getElementById('form-receita').addEventListener('submit', function (e) {
  e.preventDefault();
  const receita = {
    paciente: document.getElementById('paciente-receita').value,
    medicamentos: document.getElementById('medicamentos-receita').value,
  };
  receitas.push(receita);
  salvarDados('receitas', receitas);
  alert('Receita emitida com sucesso!');
  document.getElementById('form-receita').reset();
  gerarPDFReceita(receita);
});

// Função para solicitar exame
document.getElementById('form-exame').addEventListener('submit', function (e) {
  e.preventDefault();
  const exame = {
    paciente: document.getElementById('paciente-exame').value,
    tipo: document.getElementById('tipo-exame').value,
    resultado: document.getElementById('resultado-exame').value,
  };
  exames.push(exame);
  salvarDados('exames', exames);
  alert('Exame solicitado com sucesso!');
  document.getElementById('form-exame').reset();
  gerarPDFExame(exame);
});

// Função para realizar pagamento
document.getElementById('form-pagamento').addEventListener('submit', function (e) {
  e.preventDefault();
  const pagamento = {
    paciente: document.getElementById('paciente-pagamento').value,
    valor: document.getElementById('valor-pagamento').value,
    tipo: document.getElementById('tipo-pagamento').value,
    data: document.getElementById('data-pagamento').value,
    status: document.getElementById('status-pagamento').value,
  };
  pagamentos.push(pagamento);
  salvarDados('pagamentos', pagamentos);
  alert('Pagamento registrado com sucesso!');
  document.getElementById('form-pagamento').reset();
});

// Função para deletar um item de uma lista
function deletarItem(lista, index) {
  if (confirm('Tem certeza que deseja excluir este item?')) {
    lista.splice(index, 1); // Remove o item do array
    alert('Item deletado com sucesso!');
    atualizarTabela(); // Atualiza a tabela após a exclusão
  }
}

// Função para editar um item de uma lista
function editarItem(lista, index) {
  const item = lista[index];
  // Aqui você pode abrir um formulário de edição com os dados do item
  alert('Editar item: ' + JSON.stringify(item));
}

// Função para buscar itens em uma lista
function buscarItens(lista, termo) {
  return lista.filter(item => {
    return Object.values(item).some(valor =>
      String(valor).toLowerCase().includes(termo.toLowerCase())
    );
  });
}
// Dados mockados para o prontuário
const prontuariosMock = [
{
paciente: 'João Silva',
historicoMedico: 'Hipertensão, Diabetes',
alergias: 'Nenhuma',
medicamentos: 'Metformina, Losartana'
},
{
paciente: 'Maria Oliveira',
historicoMedico: 'Asma',
alergias: 'Poeira',
medicamentos: 'Salbutamol'
},
{
paciente: 'Carlos Souza',
historicoMedico: 'Colesterol Alto',
alergias: 'Nenhuma',
medicamentos: 'Atorvastatina'
}
];

// Função para carregar dados mockados no localStorage
function carregarDadosMockados() {
localStorage.setItem('prontuarios', JSON.stringify(prontuariosMock));
}

// Chama a função para carregar os dados mockados
carregarDadosMockados();

// Função para atualizar a tabela de prontuários (exemplo)
function atualizarTabela() {
  const tbody = document.querySelector('#tabela-prontuarios tbody');
  tbody.innerHTML = ''; // Limpa a tabela

  prontuarios.forEach((prontuario, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${prontuario.paciente}</td>
      <td>${prontuario.historicoMedico}</td>
      <td>${prontuario.alergias}</td>
      <td>${prontuario.medicamentos}</td>
      <td>
        <button class="btn-editar" onclick="editarItem(prontuarios, ${index})">Editar</button>
        <button class="btn-excluir" onclick="deletarItem(prontuarios, ${index})">Excluir</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Função para buscar prontuários
document.getElementById('busca-prontuarios').addEventListener('input', function (e) {
  const termo = e.target.value;
  const resultados = buscarItens(prontuarios, termo);
  const tbody = document.querySelector('#tabela-prontuarios tbody');
  tbody.innerHTML = ''; // Limpa a tabela

  resultados.forEach((prontuario, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${prontuario.paciente}</td>
      <td>${prontuario.historicoMedico}</td>
      <td>${prontuario.alergias}</td>
      <td>${prontuario.medicamentos}</td>
      <td>
        <button class="btn-editar" onclick="editarItem(prontuarios, ${index})">Editar</button>
        <button class="btn-excluir" onclick="deletarItem(prontuarios, ${index})">Excluir</button>
      </td>
    `;
    tbody.appendChild(row);
  });
});

// Função para carregar dados iniciais e atualizar selects
function carregarDadosIniciais() {
  atualizarTabela();
  atualizarSelects();
}

// Função para atualizar os selects de pacientes e médicos
function atualizarSelects() {
  const pacienteSelects = document.querySelectorAll('#paciente-consulta, #paciente-receita, #paciente-exame, #paciente-pagamento');
  const medicoSelect = document.getElementById('medico-consulta');

  pacienteSelects.forEach(select => {
    select.innerHTML = '<option value="">Selecione o Paciente</option>';
    pacientes.forEach(paciente => {
      const option = document.createElement('option');
      option.value = paciente.nome;
      option.textContent = paciente.nome;
      select.appendChild(option);
    });
  });

  medicoSelect.innerHTML = '<option value="">Selecione o Médico</option>';
  medicos.forEach(medico => {
    const option = document.createElement('option');
    option.value = medico.nome;
    option.textContent = medico.nome;
    medicoSelect.appendChild(option);
  });
}

// Função para gerar PDF de receita
function gerarPDFReceita(receita) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text('Receita Médica', 105, 10, { align: 'center' });
  doc.text(`Paciente: ${receita.paciente}`, 10, 20);
  doc.text(`Medicamentos: ${receita.medicamentos}`, 10, 30);
  doc.save('receita.pdf');
}

// Função para gerar PDF de exame
function gerarPDFExame(exame) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text('Solicitação de Exame', 105, 10, { align: 'center' });
  doc.text(`Paciente: ${exame.paciente}`, 10, 20);
  doc.text(`Tipo de Exame: ${exame.tipo}`, 10, 30);
  doc.text(`Resultado: ${exame.resultado}`, 10, 40);
  doc.save('exame.pdf');
}