# Proyecto NOC

La aplicación se basa en una app NOC, utilizando TypeScript usando una Clean Architecture para el monitoreo de paginas, o puertos locales que trazan cada determinado tiempo que le indiquemos. Este mismo crea automáticamente el estado del mismo una carpeta "logs" con el detalle del funcionamiento, y de un posible error/crasheo.

# dev
1. Clonar el archivo env.template a .env
2. Configurar las variables de entorno

``PORT=3000 MAILER_EMAIL= MAILER_SECRET_KEY= PROD=false ``

3. Ejecutar el comando ```npm install```

4. Levantar la base de datos con el comando:
``docker composer up -d``

5. Ejecutar el comando ```npm run dev``
