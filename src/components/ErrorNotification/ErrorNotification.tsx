import { useContext } from 'react';
import { AppContext } from '../../AppContext';

export const ErrorNotification: React.FC = () => {
  const { error, setError } = useContext(AppContext);

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError(null)}
      >
        {' '}
      </button>
      {error}
    </div>
  );
};
