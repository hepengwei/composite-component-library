import { useMemo, useContext } from "react";
import DisabledContext from "antd/es/config-provider/DisabledContext";

const useFormDisabled = (selfDisabled?: boolean) => {
  const formDisabled = useContext(DisabledContext);

  const disabled = useMemo(() => {
    if (selfDisabled !== undefined && selfDisabled !== null) {
      return !!selfDisabled;
    }
    return !!formDisabled;
  }, [selfDisabled, formDisabled]);

  return disabled;
};

export default useFormDisabled;
