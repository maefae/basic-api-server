"use strict";

const { app } = require("../src/server.js");
const supertest = require("supertest");
const { sequelizeDatabase } = require("../src/models/index.js");
const { DESCRIBE } = require("sequelize/types/query-types");
const { INET } = require("sequelize");

const request = supertest(app);

//function
beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(asnc() => {
    await sequelizeDatabase.drop();
});

describe('testing server', () => {
    it('Reponds with a 404 on an invalid route' async () => {
        const response = await request.get(/'badroute');
        expect(response.status).toEqual(404);
    });

    it('responds with a 404 on an invalid method', async () => {
        const response = await request.post('/');
        expect(response.status).toEqual(404);
      });

      it('creates a new record using POST', async () => {
        const response = await request.post('/food').send({
          name: 'pizza',
          calories: 400,
          type: 'CARB',
        });
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('pizza');
      });
})

