# Gerador de Solicitação de Atualização RM

Este é um gerador de solicitação de atualização para o sistema RM da TOTVS. Ele permite criar rapidamente uma solicitação de atualização com todos os campos necessários.

## Funcionalidades

- Geração automática de solicitação de atualização
- Suporte a diferentes tipos de atualização (PATCH e RELEASE)
- Seleção de ambiente (PRODUÇÃO, TESTE 02, TESTE 03, TESTE 04)
- Configuração de horário de atualização
- Modo escuro
- Copiar texto gerado para a área de transferência
- Interface responsiva

## Como usar

1. Abra o arquivo `index.html` em um navegador web
2. Preencha os campos do formulário:
   - Tipo de Atualização
   - Nome da Base
   - Versão Atual
   - Versão Nova
   - Link da Senha
   - Contatos
   - Horário para Atualização
3. Clique em "Gerar Solicitação"
4. Copie o texto gerado usando o botão "Copiar Texto"

## Estrutura do Projeto

```
gerador-rm/
├── index.html      # Arquivo HTML principal
├── styles.css      # Estilos CSS
├── script.js       # Lógica JavaScript
└── README.md       # Este arquivo
```

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome (para ícones)

## Contribuição

Sinta-se à vontade para contribuir com o projeto através de pull requests ou reportando issues.

## Licença

Este projeto está sob a licença MIT. 