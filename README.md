# Bienvenido a PESAM CEM

El sistema **PESAM CEM** es un sistema de gestión de actividades, que nos permite planificar, ejecutar y obtener reportes de las actividades realizadas en el mes, también cuenta con sistema de notificaciones para el aviso de constante de alertas, registro de logs y manejo de respaldos.

## Requisitos de Instalación

 - PHP versión 8.1 o mayor
 - Node JS versión 18 o mayor
 - Base de datos MySQL 8 o mayor
 - Servidor de correo
 - Extensiones de php necesarias para Laravel

## Instrucciones de instalación

 1. Clona el repositorio `git clone git@github.com:montanez50/plan-activities.git`
 2. Ingresa a la carpeta del proyecto `cd plan-activities`
 3. Instala las dependencias de Composer `composer install`
 4. Instala la dependencias de Javascript `npm install`
 5. Completa las variables de entorno en el archivo .env
 6. Genera la llave del sistema `php artisan key:generate`
 7. Genera las migraciones y seeders `php artisan migrate --seed`
 8. Ejecuta `php artisan key:generate`

Para ejecutar el proyecto solo basta con ejecutar `php artisan serve` y `npm run dev` en el ambiente de desarrollo o `nom run build` en producción.

## Tecnologías utilizadas

 - Laravel 10
 - InertiaJS
 - ReactJS
 - ViteJS
 - MySQL

## Usuario Administrador

correo: admin@cem.com
contraseña: password
