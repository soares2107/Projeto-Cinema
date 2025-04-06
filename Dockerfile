# Imagem base leve do NGINX
FROM nginx:alpine

# Copia todos os arquivos do projeto para o diretório padrão do NGINX
COPY . /usr/share/nginx/html
