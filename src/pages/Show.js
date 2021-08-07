import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/Config';

const Show = () => {
  const { id } = useParams();

  const [Show, setShow] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);
  const [Error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          setShow(results);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
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
