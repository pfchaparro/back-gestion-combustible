# API para sistema de gestión de combustibles - Primer Tax S.A

Api para el sistema de gestión de combustibles para la empresa Primer Tax.

## Construido con 🛠️

_Este proyecto backend esta construido con las siguientes tecnologías:_

* [Node js](https://nodejs.org/es/) - Node.js® is a runtime environment for JavaScript
* [Express js](https://expressjs.com/es/) - Fast, minimalist and flexible web framework for Node.js
* [Mysql](https://www.mysql.com/) - Relational database management system
* [Sequelize](https://sequelize.org/) - Sequelize is a promise-based Node.js ORM tool

### Documentación de la API 📋

* [Documentación API](https://primertaxgestiondecombustible.docs.apiary.io/) - Documentación de la API en Apiary de Oracle.

## Repositorio 📖

Puedes encontrar más información en GitHub [GitHub](https://github.com/ingsistemasco/back-gestion-combustible)

## Comenzando 🚀

### Instalación en LOCALHOST 🔧

1. Clonar el proyecto desde GitHub:
```
git clone https://github.com/ingsistemasco/back-gestion-combustible.git
```

2. Realizar instalación de paquetes NPM:
```
npm i
```

3. Variables de entorno, se debe instalar de forma global

```
npm i dotenv --global
```

Más información:
[global-dotenv](https://www.npmjs.com/package/global-dotenv)

4. Instalación y configuración del motor de bases de datos MySQL:

Aquí un ejemplo de como instalar y configurar MySQL en S.O Ubuntu Linux [digitalocean](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04-es)

5. Crear base de datos en MySQL:
```
CREATE DATABASE fuel_management
```

6. Cambiar las credenciales en las variables de entorno:

- En el archivo .env en la raíz del proyecto colocar cambiar las credenciales que sean necesarias.

7. Migraciones:

- Comando que permite crear las tablas en la base de datos:
```
npm run migrate:up
```

- Comando que permite crear data inicial en la base de datos:
```
npm run seed:all
```

- Generar una nueva migración base:
```
npm run migration:generate
```

- Generar un nuevo seeders base:
```
npm run seed:generate
```

Más información de las migraciones [Sequelize](https://sequelize.org/docs/v6/other-topics/migrations/)

7. Correr el proyecto en ambiente desarrollo:
```
npm run dev
```

Mirar **Deployment** para conocer como desplegar el proyecto en ambiente productivo.

## Despliegue 📦

1. Se debe instalar NodeJS en el servidor (Windows o Linux)

2. Variables de entorno, se debe instalar de forma global

```
npm i dotenv --global
```

Más información:
[global-dotenv](https://www.npmjs.com/package/global-dotenv)

3. Se debe instalar PM2 (es un gestor de procesos en producción para las aplicaciones Node.js que tiene un balanceador de carga incorporado.)

```
npm install -g pm2
```

4. Comandos básicos y su uso:

Primero desde la terminal buscamos la carpeta que contiene nuestro archivo js. Por ejemplo si lo tengo en /var/www/back-gestion-combustible pués en la terminal pongo cd /var/www/back-gestion-combustible y una vez dentro ejecuto el archivo js. En nuestro caso "app.js"

Start

```
pm2 start app.js
```

Restart

```
pm2 restart app.js
```

Stop

```
pm2 stop app.js
```

5. Listar procesos

```
pm2 list
```

6. Monitorear procesos

```
pm2 monit
```

7. Logs

```
pm2 log
```

8. Generación del script de startup

```
pm2 startup
```

Más información:

[PM2](https://pm2.keymetrics.io/)

[tecnonucleous](https://tecnonucleous.com/2018/03/28/usar-pm2-para-mantener-el-bot-de-telegram-encendido/)


⌨️ con ❤️ por [Primer Tax](https://www.primertaxsa.com/) 😊
