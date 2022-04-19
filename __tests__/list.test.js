const fs = require('fs');
const request = require('supertest');
const app = require('../src/app');
const animalData = require('../src/data/animals.json');

describe('Retorno de animais', () => {
    beforeAll(() => {
        animalData.push({
            'id': 'idteste',
            'nome': 'Spike',
            'especie': 'Cachorro',
            'idade': 3,
        });
        animalData.push({
            'id': 'idteste',
            'nome': 'Mimi',
            'especie': 'Gato',
            'idade': 2,
        });
        animalData.push({
            'id': 'idteste',
            'nome': 'JJ',
            'especie': 'Hamster',
            'idade': 1,
        });
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalData));
    });

    afterAll(()  => {
        while (animalData.length > 0) {
            animalData.pop();
        }
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalData));
    });

    it('deve retornar uma lista com todos os animais', async () => {
        const res = await request(app).get('/animais');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(3);
    });
})