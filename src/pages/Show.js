import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/Config';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { IsLoading: false, Error: null, Show: action.Show };
    }
    case 'FETCH_FAILED': {
      return { ...prevState, IsLoading: false, Error: action.message };
    }
    default:
      return prevState;
  }
};
const initialState = {
  Show: null,
  IsLoading: true,
  Error: null,
};

const Show = () => {
  const { id } = useParams();

  const [{ Show, IsLoading, Error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  //const [Show, setShow] = useState(null);
  //const [IsLoading, setIsLoading] = useState(true);
  //const [Error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', Show: results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', Error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);
  console.log('Show', Show);

  if (IsLoading) {
    return <div>Data is Loading</div>;
  }
  if (Error) {
    return <div>Error Occurred : {Error}</div>;
  }

  return <div>This is Show Page</div>;
};

export default Show;
