import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerSetup(app) {
  const options = new DocumentBuilder()
    //    .addServer('api')
    .addBearerAuth()
    .setTitle('Technical Assessment')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addTag('Asessment')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },

      'jwt',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
}
