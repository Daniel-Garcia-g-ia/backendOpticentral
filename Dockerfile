# Usa la imagen oficial de Node.js como base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /src/server.js

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el proyecto al contenedor
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "start"]

