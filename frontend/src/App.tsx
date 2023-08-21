import React from 'react';
import TodoList from './components/molecules/TodoList.tsx';
import { useQuery, useMutation } from '@apollo/client';
import { FETCH_TODOS } from "./graphql/queries";
import { CREATE_TODO } from "./graphql/mutations/createTodo.ts";
import TodoForm from "./components/molecules/TodoForm.tsx";

const App: React.FC = () => {
  const { loading, error, data } = useQuery(FETCH_TODOS);
  const [createTodo, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_TODO);

  const handleCreateTodo = async (title: string) => {
    console.log("handleCreateTodo triggered with title:", title);
    if (title.trim() !== '') {
      try {
        await createTodo({
          variables: { title },
          refetchQueries: [{ query: FETCH_TODOS }],
        });
      } catch (err) {
        console.error("Error creating todo:", err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (mutationLoading) return <p>Creating todo...</p>;
  if (mutationError) return <p>Error creating todo: {mutationError.message}</p>;

  return (
    <div className="bg-base-darker flex flex-col h-screen font-inter">
      <div className="relative bg-base-darkest h-[20vh] flex flex-col items-center justify-center px-6">
        <h1 className="bg-gradient-linear bg-clip-text text-transparent text-5xl font-bold text-center">Dementia</h1>
        <p className="text-gray-400 text-center text-xs italic">A simple todo app built with React, Tailwind, Redux, GraphQL and MongoDB</p>
        <TodoForm onSubmit={handleCreateTodo} />
      </div>
      <div className="w-full md:max-w-2xl mx-auto p-6 flex flex-col overflow-hidden overflow-y-auto">
        <TodoList todos={data.getTodos} />
      </div>
    </div>
  );
};

export default App;