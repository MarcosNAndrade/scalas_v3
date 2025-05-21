import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main>
      <div style={{position: "fixed", top: "2%", left: "2%"}}><img src="logo_scalas.fw.png" width="50%" height="50%" /></div>
      <h1>Nosso site está em construção</h1>
      <button onClick={createTodo}>+ Nova tarefa</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App hospedado com sucesso. Por favor, tente incluir uma nova tarefa.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Novas etapas do tutorial.
        </a>
      </div>

      <div style={{position: "absolute", top: "80%", left: "35%"}}>
        <center>
          <span style={{fontSize: "70%", color: "#000000"}}>Desenvolvido por ScalaS Tecnologia e Informática Ltda.</span>
          <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates"><span style={{fontSize: "70%", color: "#777777"}}>AWS Amplify</span></a>
          <span style={{fontSize: "70%", color: "#000000"}}>2025 - Todos os direitos reservados</span>
        </center>
      </div>
      
    </main>
  );
}

export default App;
