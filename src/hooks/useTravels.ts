import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { StoreActions, StoreEntities } from "../types/StoreType";
import { Travel } from "../types/TravelType";

const useTravels = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getTravelsRequest = useStoreActions<StoreActions>(
    (actions) => actions.getTravelsRequest
  );
  const travels: Travel[] = useStoreState<StoreEntities>(
    (store) => store.travels
  );

  useEffect(() => {
    getTravelsRequest()
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    setLoading(true);
  }, [getTravelsRequest]);

  return {
    data: travels,
    isLoading,
    error,
  };
};

export default useTravels;
