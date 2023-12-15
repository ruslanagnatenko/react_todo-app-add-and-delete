import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer';
import { prepareTodos } from './helpers';
import { Header } from './components/Header';
import { ErrorType } from './types/ErrorType';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';
import { AppContext } from './AppContext';
import { USER_ID } from './userId/userId';

export const App: React.FC = () => {
  const {
    todos,
    setTodos,
    status,
    setStatus,
    error,
    setError,
  } = useContext(AppContext);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError(ErrorType.cantLoadTodos));
  }, [setTodos, setError]);

  const filterTodos = useCallback(() => {
    return prepareTodos({
      todos,
      status,
    });
  }, [todos, status]);

  const todosOnPage = useMemo(() => filterTodos(),
    [filterTodos]);

  const itemsLeft = todos.filter(todo => (
    !todo.completed
  )).length;

  const isSomeCompleted = todos.some(
    todo => todo.completed,
  );

  const isEveryCompleted = todosOnPage.every(
    todo => todo.completed,
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          isEveryCompleted={isEveryCompleted}
        />

        <TodoList
          todos={todosOnPage}
        />

        {todos.length > 0 && (
          <Footer
            itemsLeft={itemsLeft}
            status={status}
            setStatus={setStatus}
            isSomeCompleted={isSomeCompleted}
          />
        )}

        {error && todos.length > 0 && (
          <ErrorNotification />
        )}
      </div>
    </div>
  );
};
