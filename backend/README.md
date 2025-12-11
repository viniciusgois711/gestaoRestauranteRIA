# Backend simples para pedidos

Este backend minimalista provê um CRUD para `pedidos` usando um arquivo JSON como armazenamento.

Instalação:

```bash
cd backend
npm install
```

Executar:

```bash
npm start
# ou durante desenvolvimento
npm run dev
```

Endpoints:

- `GET /pedidos` — lista todos os pedidos
- `GET /pedidos/:id` — detalha um pedido
- `POST /pedidos` — cria um pedido (body JSON com `cliente`, `produto`, `quantidade` e `status`)
- `PUT /pedidos/:id` — atualiza um pedido
- `DELETE /pedidos/:id` — remove um pedido

O arquivo de dados fica em `backend/data/pedidos.json`.

Exemplos com `curl`:

```bash
# listar
curl http://localhost:3000/pedidos

# criar
curl -X POST -H "Content-Type: application/json" -d '{"cliente":"Ana","produto":"Salada","quantidade":1,"status":"Preparando"}' http://localhost:3000/pedidos

# atualizar
curl -X PUT -H "Content-Type: application/json" -d '{"cliente":"Ana","produto":"Salada Grande","quantidade":2,"status":"Preparando"}' http://localhost:3000/pedidos/4

# deletar
curl -X DELETE http://localhost:3000/pedidos/4
```

Integração com o front-end:

Altere o `PedidoService` para fazer requisições para `http://localhost:3000/pedidos` (ou ajuste `proxy`/ambiente conforme necessário).
