import { Dispatch, SetStateAction } from "react";

interface GenericRequestFunctionProps<T> {
  // event: React.FormEvent<HTMLFormElement>;
  actionFunction: (props: T) => Promise<void>;
  actionFunctionProps: T;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
}

export async function genericRequestFunction <T>({
  // event,
  actionFunction,
  actionFunctionProps,
  setLoading,
  setError
}: GenericRequestFunctionProps<T>): Promise<(() => Promise<void>)> {
  return async () => {
    // event.preventDefault();
    
    try {
      setLoading(true);
      await actionFunction(actionFunctionProps);
    } catch (error) {
      setError(error.message);
      return;
    } finally {
      setLoading(false);
    }
  }
}