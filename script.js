// Mapeamento de NOMEBASE para ID
const baseToId = {
    "PRODUÇÃO": "125369",
    "TESTE 02": "125371",
    "TESTE 03": "125373",
    "TESTE 04": "125375"
};

// Elementos DOM
const darkModeToggle = document.getElementById('darkModeToggle');
const nomebaseSelect = document.getElementById('nomebase');
const idInput = document.getElementById('id');
const replicaGroup = document.getElementById('replicaGroup');
const replicaSelect = document.getElementById('replica');
const diahoraRadios = document.querySelectorAll('input[name="diahora"]');
const opcao2Fields = document.getElementById('opcao2Fields');
const opcao3Fields = document.getElementById('opcao3Fields');
const notification = document.getElementById('notification');

// Atualizar ID quando selecionar nomebase
nomebaseSelect.addEventListener('change', function() {
    const nomebase = this.value;
    const id = baseToId[nomebase] || '';
    idInput.value = id;

    // Mostrar/ocultar replicaGroup
    if (nomebase === 'PRODUÇÃO') {
        replicaGroup.classList.add('hidden');
        replicaSelect.value = '';
    } else {
        replicaGroup.classList.remove('hidden');
    }
});

// Mostrar/ocultar campos de data/hora conforme opção de diahora
diahoraRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.value === 'opcao2') {
            opcao2Fields.classList.remove('hidden');
            opcao3Fields.classList.add('hidden');
        } else if (this.value === 'opcao3') {
            opcao2Fields.classList.add('hidden');
            opcao3Fields.classList.remove('hidden');
        } else {
            opcao2Fields.classList.add('hidden');
            opcao3Fields.classList.add('hidden');
        }
    });
});

// Função para alternar modo escuro
darkModeToggle.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', this.checked);
    
    // Salvar preferência no localStorage
    localStorage.setItem('darkMode', this.checked ? 'enabled' : 'disabled');
});

// Verificar preferência de modo escuro salva
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

// Função para gerar o texto
function generateText() {
    const tipo = document.getElementById('tipo').value;
    const nomebase = nomebaseSelect.value;
    const id = idInput.value;
    const vantiga = document.getElementById('vantiga').value;
    const vnova = document.getElementById('vnova').value;
    const replica = replicaSelect.value;
    const linkSenha = document.getElementById('linkSenha').value;
    const contato1 = document.getElementById('contato1').value;
    const contato2 = document.getElementById('contato2').value;
    
    // Determinar [DESCREPLICA]
    let descreplica = '';
    if (nomebase !== 'PRODUÇÃO' && replica === 'SIM') {
        descreplica = 'COM RÉPLICA DO BANCO DE DADOS DA PRODUÇÃO';
    }

    // Tratar DIAHORA
    let diahoraText = '';
    const diahoraValue = document.querySelector('input[name="diahora"]:checked').value;
    
    if (diahoraValue === 'opcao1') {
        diahoraText = "O QUANTO ANTES POSSÍVEL, PODENDO PARAR O SISTEMA A QUALQUER MOMENTO";
    } else if (diahoraValue === 'opcao2') {
        const dataHoraFixa = document.getElementById('dataHoraFixa').value;
        if (dataHoraFixa) {
            const date = new Date(dataHoraFixa);
            const dia = String(date.getDate()).padStart(2, '0');
            const mes = String(date.getMonth() + 1).padStart(2, '0');
            const ano = date.getFullYear();
            const horas = String(date.getHours()).padStart(2, '0');
            const minutos = String(date.getMinutes()).padStart(2, '0');
            diahoraText = `DIA ${dia}/${mes}/${ano} ÁS ${horas}:${minutos}`;
        }
    } else if (diahoraValue === 'opcao3') {
        const dataHoraInicio = document.getElementById('dataHoraInicio').value;
        const dataHoraFim = document.getElementById('dataHoraFim').value;
        if (dataHoraInicio && dataHoraFim) {
            const dateInicio = new Date(dataHoraInicio);
            const dateFim = new Date(dataHoraFim);
            const diaInicio = String(dateInicio.getDate()).padStart(2, '0');
            const mesInicio = String(dateInicio.getMonth() + 1).padStart(2, '0');
            const anoInicio = dateInicio.getFullYear();
            const horasInicio = String(dateInicio.getHours()).padStart(2, '0');
            const minutosInicio = String(dateInicio.getMinutes()).padStart(2, '0');
            const diaFim = String(dateFim.getDate()).padStart(2, '0');
            const mesFim = String(dateFim.getMonth() + 1).padStart(2, '0');
            const anoFim = dateFim.getFullYear();
            const horasFim = String(dateFim.getHours()).padStart(2, '0');
            const minutosFim = String(dateFim.getMinutes()).padStart(2, '0');
            diahoraText = `ENTRE DIA ${diaInicio}/${mesInicio}/${anoInicio} ÁS ${horasInicio}:${minutosInicio} ATÉ DIA ${diaFim}/${mesFim}/${anoFim} ÁS ${horasFim}:${minutosFim}`;
        }
    }

    // Construir o texto
    let text = `ATUALIZAÇÃO DE ${tipo} DA BASE ${nomebase} (ID ${id}) DA VERSÃO ${vantiga} PARA ${vnova} ${descreplica}\n\n`;
    text += `Prezados(as), bom dia\n`;
    text += `Solicito atualização de ${tipo} da base ${nomebase} (ID ${id}) da versão ${vantiga} para ${vnova}\n\n`;

    text += `- Qual AMBIENTE/BASE devemos atualizar? PRODUÇÃO, TESTE, HOMOLOGAÇÃO, DESENVOLVIMENTO?\n`;
    text += `${nomebase} (ID ${id})\n\n`;

    // Só inclui a pergunta de réplica se não for PRODUÇÃO
    if (nomebase !== 'PRODUÇÃO') {
        text += `- Se tratando de atualização nos ambientes TESTE, HOMOLOGAÇÃO ou DESENVOLVIMENTO, será necessário REPLICAR o Banco de Dados de PRODUÇÃO sobre o ambiente a ser atualizado?\n`;
        text += `${replica}\n\n`;
    }

    text += `- Por favor nos informe qual a ATUAL VERSÃO que seu ambiente a ser atualizado se encontra hoje?\n`;
    text += `${vantiga}\n\n`;

    text += `- Para qual VERSÃO específica devemos atualizar seu ambiente RM?\n`;
    text += `${vnova}\n\n`;

    text += `- De que forma acessa o sistema RM atualmente neste ambiente que vamos atualizar? Via GO-GLOBAL ou SMARTCLIENT?\n`;
    text += `AMBOS\n\n`;

    text += `- É utilizado PORTAL RM neste ambiente que vamos atualizar? Caso, sim, por favor nos informe as URLs dos portais utilizados e um usuário e senha para podermos validar ao final do processo de atualização.\n`;
    text += `(Obs.: Informe a SENHA de forma segura, através do site https://getmypassword.cloudtotvs.com.br/home)\n\n`;
    text += `Portal: https://empresade${id}.rm.cloudtotvs.com.br/Corpore.Net/\n`;
    text += `Meu RH: https://empresade${id}.rm.cloudtotvs.com.br/FrameHTML/Web/App/RH/PortalMeuRH/\n`;
    text += `Portal BackOffice: https://empresade${id}.rm.cloudtotvs.com.br/FrameHTML/Web/App/Bco/Portal-BackOffice/\n\n`;
    text += `usuário: totvs\n`;
    text += `senha: ${linkSenha}\n\n`;

    text += `- Nos informe um USUÁRIO e SENHA de acesso ao RM com permissão de Supervisor.\n`;
    text += `(Obs.: Informe a SENHA de forma segura, através do site https://getmypassword.cloudtotvs.com.br/home)\n`;
    text += `usuário: totvs\n`;
    text += `senha: ${linkSenha}\n\n`;

    text += `- O Ambiente a ser atualizado possui alguma CUSTOMIZAÇÃO no Sistema RM ou Portal RM?\n`;
    text += `Se sim, por gentileza nos encaminhe a documentação ou um passo-a-passo necessário para que customização funcione corretamente após processo de atualização.\n\n`;

    text += `- Por favor nos informe TELEFONE para contato, caso necessário o analista contatá-los;\n`;
    text += `${contato1}\n`;
    text += `${contato2}\n\n`;

    text += `- Qual melhor DIA e HORÁRIO para realizar a parada do sistema e atualização?\n`;
    text += `${diahoraText}\n\n`;

    document.getElementById('resultText').value = text;
}

// Função para copiar o texto
function copyText() {
    const textarea = document.getElementById('resultText');
    textarea.select();
    document.execCommand('copy');
    
    // Mostrar notificação
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Inicializar data e hora para campos de data
const now = new Date();
const formattedNow = now.toISOString().slice(0, 16);
document.getElementById('dataHoraFixa').value = formattedNow;
document.getElementById('dataHoraInicio').value = formattedNow;

// Adicionar 1 hora para o campo de fim
const endTime = new Date(now.getTime() + 60 * 60 * 1000);
document.getElementById('dataHoraFim').value = endTime.toISOString().slice(0, 16);

// Preencher os campos de contato com valores padrão
document.getElementById('vantiga').value = "12.1.2502.100";
document.getElementById('vnova').value = "12.1.2502.101"; 