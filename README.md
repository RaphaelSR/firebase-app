# Firebase App

Este projeto é um aplicativo simples que utiliza a plataforma Firebase para autenticação e armazenamento de dados em nuvem. O aplicativo é desenvolvido em React Native e tem como principal objetivo servir como treino
## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- Node.js
- Yarn
- React Native CLI
- Um emulador de dispositivo móvel ou um dispositivo móvel físico para testar o aplicativo.

## Instalação

Clone este repositório em sua máquina:

```
git clone https://github.com/raphaelsr/firebase-app.git
Navegue até o diretório raiz do projeto e instale as dependências:

cd firebase-app
yarn install
Inicie o aplicativo no emulador ou no seu dispositivo móvel:

react-native run-android # para dispositivos Android
react-native run-ios # para dispositivos iOS
```

## Configuração
Para utilizar o Firebase em seu aplicativo, é necessário criar um projeto no console do Firebase e configurá-lo para seu aplicativo. Uma vez que você tenha criado um projeto e obtido suas credenciais, você pode configurar o aplicativo da seguinte forma:

Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

```
FIREBASE_API_KEY=SuaFirebaseApiKey
FIREBASE_AUTH_DOMAIN=SeuFirebaseAuthDomain
FIREBASE_PROJECT_ID=SeuFirebaseProjectId
FIREBASE_STORAGE_BUCKET=SeuFirebaseStorageBucket
FIREBASE_MESSAGING_SENDER_ID=SeuFirebaseMessagingSenderId
FIREBASE_APP_ID=SuaFirebaseAppId

```
Substitua os valores das variáveis pelas suas credenciais obtidas no console do Firebase.

Inicie o aplicativo novamente e verifique se tudo está funcionando corretamente.

## Funcionalidades
Este aplicativo inclui as seguintes funcionalidades:

- Autenticação de usuário com e-mail e senha.
- Armazenamento de dados em nuvem com Firestore.
- Consulta e exibição de dados armazenados.
- Edição e exclusão de dados armazenados.

## Contribuindo
Contribuições são bem-vindas! Se você tiver alguma ideia de como melhorar o aplicativo, por favor abra uma issue ou envie uma pull request com suas sugestões.

## Licença
Este projeto é licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.