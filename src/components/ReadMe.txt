Documentação de Desenvolvimento

Contexto

Este projecto inclui os componentes desenvolvidos "Playground.vue" e "Ball.vue" tanto em Vue 3 assim 
como em Vue 2. As versões em Vue 3 são os components principais em default, enquanto as versões em
Vue 2 estão na pasta "Vue_2_Legacy_Code" para demonstrar a minha proficiência com legacy code e 
com a nova versão do vue.

Estrutura do Projeto:

Componentes Vue 3:
- Playground.vue
- Ball.vue

Componentes Vue 2:
- Vue_2_Legacy_Code/Playground_Vue2.vue
- Vue_2_Legacy_Code/Ball_Vue2.vue

Utilização:

Para usar os componentes em Vue 3:
- Os componentes em Vue 3 ja estão configurados como default.

Para usar os componentes em Vue 2:
1 - Navegar até ao "src/App.vue"
2 - Remover os marcadores de comentário "(<!-- -->)" que envolvem o código do Vue 2 e comentar o código do Vue 3.

======================= Testes unitários =======================

Desenvolvi também testes unitários para ambos os componentes utilizando o Vue Test Utils (https://v1.test-utils.vuejs.org/)

Para os executar:
1 - Abrir o terminal na raiz do projecto
2 - Executar o seguinte comando:
    npm run test
