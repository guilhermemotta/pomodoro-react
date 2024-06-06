## O Projeto

A idéia desse projeto é criar um app mínimo para a prática da técnica pomodoro.
O usuário deve poder criar sua própria configuração do timer e a mesma será armazenada usando a API `localStorage`.
Permitir a criação de rótulos para diferentes sessões de pomodoro e mostrar estatísticas que facilitem observar a consistência na execução das atividades apoiadas pela ferramenta/técnica.

## Informações necessárias

Tempo:

| Duração        | Padrão                   |
| -------------- | ------------------------ |
| Pomodoro       | 25 min                   |
| Descanso curto | 5 min                    |
| Descanso longo | 15 min                   |
| Sessão         | Total de tempo decorrido |

Estados do pomodoro:

- parado/pausado
- foco
- descanso curto
- descanso longo
- aguardando próxima etapa: estado de transição entre o pomodoro e as etapas de descanso
