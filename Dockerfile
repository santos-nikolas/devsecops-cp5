# Usando a imagem leve do Nginx (evolução do CP04)
FROM nginx:alpine

# Aplica os patches de segurança disponíveis nos pacotes do Alpine
RUN apk upgrade --no-cache

# Copia o site para a pasta padrão do Nginx
COPY index.html style.css calculadora.js /usr/share/nginx/html/

# Expõe a porta 80
EXPOSE 80
