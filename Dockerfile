# Usa una imagen base de Node.js
FROM node:16

# Crea un directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos al contenedor
COPY . .

# Expone el puerto donde se ejecutará la aplicación
EXPOSE 3000

# Usa npm para ejecutar el script start
CMD ["npm", "start"]
