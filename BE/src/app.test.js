/* eslint-disable jest/no-test-callback */
const request = require('supertest');
const { app, mongoose } = require('./app');

describe('app', () => {
   beforeEach(async () => {
      for (let collection in mongoose.connection.collections) {
         await mongoose.connection.collections[collection].deleteMany({});
      }
   });

   it('Should get toDo list with success code 200', async done => {
      try {
         const toDo = await mongoose.models.toDo.create({
            name: 'toDo 1',
            description: 'Descripcion 1'
         });
         const response = await request(app).get('/toDos');
         done();
         expect(response.body[0].body).toBe(toDo.body);
         expect(response.status).toBe(200);
         expect(response.body).toHaveLength(1);
      } catch (error) {
         done(error);
      }
   });

   it('Should find a toDo element', async done => {
      try {
         const toDo = await mongoose.models.toDo.create({
            name: 'toDo 1',
            description: 'Descripcion 1'
         });
         const response = await request(app).get(`/toDos/${toDo._id}`);
         done();
         expect(response.status).toBe(200);
         expect(response.body.name).toBe(toDo.name);
         expect(response.body.description).toBe(toDo.description);
      } catch (error) {
         done(error);
      }
   });

   it('Should create a toDo element', async done => {
      try {
         const toDo = {
            name: 'Prueba toDo 1',
            description: 'Prueba descripción 1'
         };
         const response = await request(app)
            .post('/toDos')
            .send(toDo);
         done();
         expect(response.statusCode).toBe(200);
         expect(response.body.name).toBe(toDo.name);
         expect(response.body.description).toBe(toDo.description);
      } catch (error) {
         done(error);
      }
   });

   it('Should return status 400 when not pass toDo model validation', async done => {
      try {
         const toDo = {
            name: 'Prueba toDo 1'
         };
         const response = await request(app)
            .post('/toDos')
            .send(toDo);
         done();
         expect(response.statusCode).toBe(400);
      } catch (error) {
         done(error);
      }
   });

   it('Should update a toDo element', async done => {
      try {
         const toDo = await mongoose.models.toDo.create({
            name: 'toDo 1',
            description: 'Descripción 1'
         });
         const update = {
            name: 'Actualizado toDo 1',
            description: 'Actualizado descripción 1'
         };
         const response = await request(app)
            .put(`/toDos/${toDo._id}`)
            .send(update);
         done();
         expect(response.status).toBe(200);
         expect(response.request._data.name).toBe(update.name);
         expect(response.request._data.description).toBe(update.description);
      } catch (error) {
         done(error);
      }
   });

   it('Should delete a toDo element', async done => {
      const toDo = await mongoose.models.toDo.create({
         name: 'for delete toDo 1',
         description: 'for delete Descripción 1'
      });
      const response = await request(app).delete(`/toDos/${toDo._id}`);
      done();
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(toDo.name);
      expect(response.body.description).toBe(toDo.description);
   });

   it('Should create a user', async done => {
      try {
         const user = {
            name: 'Diego Alzate',
            email: 'diegoff@gmail.com',
            password: 'diego123'
         };
         const response = await request(app)
            .post('/users/signup')
            .send(user);
         done();
         expect(response.status).toBe(200);
      } catch (error) {
         done(error);
      }
   });

   it('Should obtain a user with valid password', async done => {
      try {
         const user = {
            name: 'Diego Alzate',
            email: 'diegoff@gmail.com',
            password: 'diego123'
         };
         console.log(mongoose.models);
         await mongoose.models.User.create(user);
         const response = await request(app)
            .post('/users/login')
            .send(user);
         done();
         expect(response.status).toBe(200);
      } catch (error) {
         done(error);
      }
   });

   it('Should not obtain a user with an invalid password', async done => {
      try {
         const user = {
            name: 'Diego Alzate',
            email: 'diegoff@gmail.com',
            password: 'diego123'
         };
         await mongoose.models.User.create(user);
         user.password = 'diego';
         const response = await request(app)
            .post('/users/login')
            .send(user);
         done();
         expect(response.status).toBe(401);
      } catch (error) {
         done(error);
      }
   });

   it('Should get status 200 when logout', async done => {
      const response = await request(app).get('/users/logout');
      done();
      expect(response.status).toBe(200);
   });
});
