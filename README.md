# Cidade Sem Poluição - API Gateway

## Sobre o projeto

O "Cidade Sem Poluição - API Gateway" é um componente desenvolvido em Node.js que atua como um ponto central de entrada para as requisições destinadas aos microsserviços do backend [cidade-sem-poluicao-microservices](https://github.com/kassiosilva/cidade-sem-poluicao-microservices). Ele é responsável por receber todas as chamadas dos clientes, roteá-las para os microsserviços apropriados e retornar as respostas.

Este gateway simplifica a arquitetura do sistema, centralizando responsabilidades como roteamento, autenticação e logging.

Principais funcionalidades:
* Roteamento de requisições para os serviços de backend.
* Ponto único de entrada para a API, facilitando a comunicação com o cliente.

>  ℹ️ Quer saber mais?
>
> Este repositório é um dos componentes de uma aplicação maior. Para conhecer os outros repositórios do projeto, acesse os seguintes links:
> - [cidade-sem-poluicao-microservices](https://github.com/kassiosilva/cidade-sem-poluicao-microservices)
> - [cidade-sem-poluicao-front](https://github.com/kassiosilva/cidade-sem-poluicao-front)
>
> O **cidade-sem-poluicao-api-gateway** está hospedado na Vercel e pode ser acessado através desse link: https://cidade-sem-poluicao-api-gateway.vercel.app/

## Por quê uma api-gateway?

Em arquiteturas baseadas em microsserviços (onde diferentes partes da aplicação são serviços menores e independentes), um API Gateway desempenha um papel crucial. Em vez de fazer com que os aplicativos clientes (como um site ou um aplicativo móvel) precisem conhecer e se conectar a vários serviços diferentes, o API Gateway atua como um **ponto único de entrada** para todas as requisições.

No contexto do nosso projeto utilizar um API Gateway oferece diversas vantagens:

* **Simplificação para o Cliente:** O cliente (seja ele o frontend da aplicação ou outro serviço) precisa apenas conhecer o endereço do API Gateway. Ele não precisa se preocupar com os endereços e as particularidades de cada microsserviço individual que compõe a plataforma "Cidade Sem Poluição".

* **Roteamento Inteligente:** O API Gateway é responsável por receber uma requisição e encaminhá-la para o microsserviço correto. Por exemplo, uma requisição para `/login` pode ser roteada para o serviço de autenticação, enquanto uma requisição para `/contact-us` pode ir para o serviço de contato.

* **Facilidade no Desenvolvimento e Manutenção:** Fica mais fácil para a nossa equipe trabalhar em microsserviços independentes sem causar grande impacto umas nas outras, já que o Gateway gerencia a entrada da API.

### Como funciona?
Recebemos a request com recurso a ser acessado e encaminhamos para o seu respectivo microsserviço. Aqui está a listagem deles:

| api-gateway | microsserviço |
| ------------------ | -------------------------------------------------------- |
| /login             | https://cd-authentication-service.vercel.app/login       |
| /register          | https://cd-authentication-service.vercel.app/register    |
| /register-donation | https://cd-donation-service.vercel.app/register-donation |
| /register-donor    | https://cd-donation-service.vercel.app/register-donor    |
| /contact-us        | https://cd-contact-us-service.vercel.app/contact-us      |


## Tecnologias

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

* **Node.js:** Ambiente de execução JavaScript do lado do servidor.
* **Express.js:** Framework minimalista e flexível para Node.js, usado para construir a API do gateway.
* **express-http-proxy:** Middleware para Express que permite facilmente proxyar requisições para outros servidores.
* **cors:** Middleware para habilitar o Cross-Origin Resource Sharing com várias opções.
* **morgan:** Middleware para logging de requisições HTTP.
* **helmet:** Ajude a proteger aplicativos Express definindo cabeçalhos de resposta HTTP.
* **Plataforma de Hospedagem:** Vercel (https://cidade-sem-poluicao-api-gateway.vercel.app/)

## Como executar?
1. Você precisa instalar **Node.js** na versão `>=22.14.0`. O projeto utiliza o [Mise](https://mise.jdx.dev/) para gerenciar a versão do node, se você utiliza o Mise basta executar o comando na raiz do projeto: `mise install`. Se não utilizar o mise basta utilizar o version manager de sua preferência(nvm, asdf e etc).

2. Clone o projeto e execute o comanda abaixo para instalar as dependências:
    ```bash
    npm install
    ```
3. Você precisa criar o arquivo `.env` na raiz. Copie todo o conteúdo do arquivo `.env.example` e cole no seu `.env`.
    ```
    DONATION_SERVICE_URL=https://cd-donation-service.vercel.app
    CONTACT_US_SERVICE_URL=https://cd-contact-us-service.vercel.app
    AUTHENTICATION_SERVICE_URL=https://cd-authentication-service.vercel.app
    PORT=5000
    ```

    >  ⚠️ Atenção
    >
    > Nesse exemplo estamos utizando os microsserviços que estão implantados na vercel, mas caso você queira rodar a api-gateway e os serviços locais na sua máquina, é necessário que você configure e rode cada serviço e coloque as suas url's locais no `.env` do api-gateway. Por favor leia a documentação do [cidade-sem-poluicao-microservices](https://github.com/kassiosilva/cidade-sem-poluicao-microservices) para isso.

4. Agora basta rodar o comando para executar o servidor:
    ```bash
    npm run dev
    ```
