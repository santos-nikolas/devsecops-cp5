# Usando a imagem do Nginx fixada numa versão antiga (sem passo de patch, build mais rápido)
FROM nginx:1.16-alpine

# Copia o site para a pasta padrão do Nginx
COPY index.html style.css calculadora.js /usr/share/nginx/html/

# Expõe a porta 80
EXPOSE 80
