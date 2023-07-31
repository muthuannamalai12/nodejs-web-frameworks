const fastify = require('fastify')();
const autoroutes = require('fastify-autoroutes');
const swagger = require('fastify-swagger');

// Enable JSON body parsing
fastify.register(require('fastify-formbody'));

// Register Swagger plugin for API documentation
fastify.register(swagger, {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Fastify CRUD API',
      description: 'API documentation for the Fastify CRUD operations',
      version: '1.0.0',
    },
  },
});


fastify.post('/users', (req, reply) => {
    const { name, email } = req.body;
  
    // Perform necessary validations
    // ...
  
    // Create the user in the database
    // ...
  
    reply.code(201).send({ message: 'User created successfully' });
  });


  fastify.get('/users/:id', (req, reply) => {
    const { id } = req.params;
  
    // Retrieve the user from the database
    // ...
  
    if (!user) {
      reply.code(404).send({ message: 'User not found' });
    } else {
      reply.send({ user });
    }
  });


  fastify.put('/users/:id', (req, reply) => {
    const { id } = req.params;
    const { name, email } = req.body;
  
    // Perform necessary validations
    // ...
  
    // Update the user in the database
    // ...
  
    reply.send({ message: 'User updated successfully' });
  });


  fastify.delete('/users/:id', (req, reply) => {
    const { id } = req.params;
  
    // Delete the user from the database
    // ...
  
    reply.send({ message: 'User deleted successfully' });
  });


  fastify.register(autoroutes, {
    dir: './routes',
  });
  
  const start = async () => {
    try {
      await fastify.listen(3000);
      console.log('Server started on http://localhost:3000');
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };
  
  start();