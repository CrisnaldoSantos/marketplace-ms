# Marketplace Microservices

Conjunto de microserviços para uma plataforma de marketplace, construído com **NestJS** e **TypeScript**.

## Arquitetura

O projeto segue uma arquitetura de microserviços, onde cada serviço é responsável por um domínio específico da aplicação. A comunicação entre os serviços é centralizada pelo **API Gateway**.

```
Client
  └── API Gateway
        ├── (futuro) Auth Service
        ├── (futuro) Product Service
        ├── (futuro) Order Service
        └── (futuro) Payment Service
```

## Serviços

| Serviço       | Descrição                                                        | Porta |
| ------------- | ---------------------------------------------------------------- | ----- |
| `api-gateway` | Ponto de entrada único, roteia requisições para os microserviços | 3005  |

## Tecnologias

- [NestJS](https://nestjs.com/) — Framework Node.js
- [TypeScript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.io/) — Gerenciador de pacotes

## Pré-requisitos

- Node.js >= 18
- pnpm >= 9

## Como rodar

Acesse o diretório do serviço desejado e instale as dependências:

```bash
cd api-gateway
pnpm install
```

Inicie o serviço em modo de desenvolvimento:

```bash
pnpm run start:dev
```

## Testes

```bash
# Testes unitários
pnpm run test

# Testes e2e
pnpm run test:e2e

# Cobertura
pnpm run test:cov
```

## Licença

Projeto de estudos. Uso interno.
