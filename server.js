const express = require('express');

const app = express();

app.use(express.json());


// divisão
app.post('/divisao', (req, res) => {

    const { v1, v2 } = req.body;

    // validação
    if (typeof v1 !== 'number' || typeof v2 !== 'number') {

        return res.status(400).json({
            erro: 'Os valores precisam ser numéricos'
        });
    }

    // divisão por zero
    if (v2 === 0) {

        return res.status(400).json({
            erro: 'Não é possível dividir por zero'
        });
    }

    const resultado = v1 / v2;

    res.status(200).json({
        operacao: 'divisão',
        resultado: resultado
    });
});


// multiplicação
app.post('/multiplicacao', (req, res) => {

    const { v1, v2 } = req.body;

    // validação
    if (typeof v1 !== 'number' || typeof v2 !== 'number') {

        return res.status(400).json({
            erro: 'Os valores precisam ser numéricos'
        });
    }

    const resultado = v1 * v2;

    res.status(200).json({
        operacao: 'multiplicação',
        resultado: resultado
    });
});


// status
app.get('/status', (req, res) => {

    res.status(200).json({
        status: 'API funcionando'
    });
});


// lista de produtos
const produtos = [

    {
        id: 1,
        nome: 'Camiseta',
        categoria: 'vestuario'
    },

    {
        id: 2,
        nome: 'Notebook',
        categoria: 'informatica'
    },

    {
        id: 3,
        nome: 'Calça',
        categoria: 'vestuario'
    }
];


// GET /produtos
app.get('/produtos', (req, res) => {

    const categoria = req.query.categoria;

    // filtrar categoria
    if (categoria) {

        const filtrados = produtos.filter(
            produto => produto.categoria === categoria
        );

        return res.status(200).json(filtrados);
    }

    // listar todos
    res.status(200).json(produtos);
});

// usuários
app.post('/usuarios', (req, res) => {

    const { nome, email } = req.body;

    // validação
    if (
        typeof nome !== 'string' ||
        typeof email !== 'string' ||
        nome.trim() === '' ||
        email.trim() === ''
    ) {

        return res.status(400).json({
            erro: 'Nome e email são obrigatórios'
        });
    }

    res.status(201).json({
        mensagem: 'Usuário criado com sucesso',
        usuario: {
            nome,
            email
        }
    });
});

// ERRO 404
app.use((req, res) => {

    res.status(404).json({
        erro: 'Rota não encontrada'
    });
});


// servidor
app.listen(3000, () => {

    console.log('API rodando em http://localhost:3000');
});