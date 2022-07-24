# Projeto Corretora

Este projeto foi desenvolvido simulando o Back-End de uma corretora de ações + conta corrente de forma simplificada, como desafio técnico para o processo seletivo da XP Inc.

## Decisões de desenvolvimento

A escolha pela containerização do projeto foi

## Funcionalidades

- Compra, venda e consulta de investimentos da corretora
- Consulta de ativos adquiridos pela pessoa cliente
- Saldo, saque e depósito na conta da pessoa cliente

## Stack utilizada

**Back-end:** Node, Express, mysql2, Typescript

**Database:** MySQL

## Rodando Localmente

**Atenção:** Este projeto utiliza Docker e Docker-Compose, informações de instalação [aqui](https://docs.docker.com/get-docker/).

Clone o repositório:

```bash
  git clone git@github.com:IsaCorreia/Corretora.git
  cd Corretora
```

Instale as depencências:

```bash
  npm install
```

Inicie os containeres:

```bash
  docker-compose up -d
  docker exec -it corretora bash
  npm run dev
```

A API será iniciada, para acessá-la, abra em seu navegador o endereço `http://localhost:3000/`

## Documentação da API

Os endpoints da apicação estão separados em grupos de rotas abaixo:

<details>
<summary>Rotas para `/investimentos`</summary>
<br>

### Retorna todos os ativos

```http
  GET /investimentos
```

<details>
<summary>Retorno:</summary>

<code>
[
  {
    "CodAtivo": 1,
    "NomeAtivo": "XP",
    "QtdeAtivo": 10,
    "Valor": "18"
  }
]
</code>
<br>
</details>

### Retorna um ativo

```http
  GET /investimentos/${id}
```

| Parâmetro | Tipo     | Descrição                                       |
| :-------- | :------- | :---------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do ativo a ser consultado |

<details>
<summary>Retorno:</summary>

<code>
{
  "CodAtivo": 1,
  "NomeAtivo": "XP",
  "QtdeAtivo": 10,
  "Valor": "18"
}
</code>
<br>
</details>

### Compra de ativos

```http
  POST /investimentos/comprar
```

| Parâmetro    | Tipo     | Descrição                                                            |
| :----------- | :------- | :------------------------------------------------------------------- |
| `CodCliente` | `number` | **Obrigatório**. O ID da pessoa cliente que deseja efetuar a compra. |
| `CodAtivo`   | `number` | **Obrigatório**. O ID do ativo desejado.                             |
| `QtdeAtivo`  | `number` | **Obrigatório**. A quantidade do ativo desejado.                     |

Verificações:

- `QtdeAtivo` deve ser igual a 1 ou maior que 1.
- O ativo solicitado possui estoque suficiente.
- O Saldo em conta da pessoa cliente deve ser igual ou maior que o valor total da compra.

### Venda de ativos

```http
  POST /investimentos/vender
```

| Parâmetro    | Tipo     | Descrição                                                            |
| :----------- | :------- | :------------------------------------------------------------------- |
| `CodCliente` | `number` | **Obrigatório**. O ID da pessoa cliente que deseja efetuar a compra. |
| `CodAtivo`   | `number` | **Obrigatório**. O ID do ativo desejado.                             |
| `QtdeAtivo`  | `number` | **Obrigatório**. A quantidade do ativo desejado.                     |

Verificações:

- `QtdeAtivo` deve ser igual a 1 ou maior que 1.
- A pessoa cliente possui quantidade igual a 1 ou maior que 1 do ativo solicitado.

</details>

<details>
<summary> Rotas para `/conta`</summary>
<br>

### Retorna o saldo da conta

```http
  GET /conta/${id}
```

| Parâmetro | Tipo     | Descrição                                       |
| :-------- | :------- | :---------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID da conta a ser consultada |

<details>
<summary>Retorno:</summary>

<code>
{
	"CodCliente": 1,
	"Saldo": "100"
}
</code>
<br>
</details>

### Depósito na conta

```http
  POST /conta/deposito
```

| Parâmetro    | Tipo      | Descrição                                              |
| :----------- | :-------- | :----------------------------------------------------- |
| `CodCliente` | `number`  | **Obrigatório**. O ID da conta para efetuar o depósito |
| `Valor`      | `decimal` | **Obrigatório**. Valor do depósito                     |

### Saque na conta

```http
  POST /conta/saque
```

| Parâmetro    | Tipo      | Descrição                                              |
| :----------- | :-------- | :----------------------------------------------------- |
| `CodCliente` | `number`  | **Obrigatório**. O ID da conta para efetuar o depósito |
| `Valor`      | `decimal` | **Obrigatório**. Valor do depósito                     |

Verificações:

- A conta da pessoa cliente possui saldo menor ou igual ao valor solicitado apra saque.

</details>

<details>
<summary>Rotas para `/ativos`</summary>
<br>

### Retorna os ativos da conta

```http
  GET /ativos/${id}
```

| Parâmetro | Tipo     | Descrição                                       |
| :-------- | :------- | :---------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID da conta a ser consultada |

<details>
<summary>Retorno:</summary>

<code>
[
  {
    "CodCliente": 1,
    "CodAtivo": 1,
    "QtdeAtivo": 1,
    "Valor": "18"
  }
]
</code>
<br>

</details>

</details>
