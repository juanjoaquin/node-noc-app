# dev
1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
3. Ejecutar el comando ```npm install```
4. Levantar las bases de datos con el comando
   ```
   docker compose up -d
   ```
5. Ejecutar ```npm run dev```

# Funcionamiento

Aplicación realizada con Node js y TypeScript, que su funcionalidad principal es monitorear una url, donde escribe y envía logs de manera automática en nuestra consola o a través del Gmail utilizando Nodemailer. Está misma es marcada a través de tres niveles de criticidad "low, medium y high". Uno brindá una URL para analizar (por ejemplo google.com) y si esta funciona, el nivel de criticidad será "low" ya que funcionaría correctamente. 

``` La notificación en consola mientras la aplicación es ejecutada ```

![Interfaz de la aplicación](https://i.imgur.com/zqErK1Y.png)

![Hola](https://i.imgur.com/uJQTrQN.png)
