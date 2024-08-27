# Proyecto NOC

Aplicación realizada con Node js y TypeScript, que su funcionalidad principal es monitorear una url, donde escribe y envía logs de manera automática cada determinado tiempo que le escribamos. Está misma es guardada en una base de datos de Mongo DB. 

# dev
1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
3. Ejecutar el comando ```npm install```
4. Levantar las bases de datos con el comando
   ```
   docker compose up -d
   ```
5. Ejecutar ```npm run dev```

