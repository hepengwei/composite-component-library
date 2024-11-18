import { useMemo, useContext } from "react";
import DisabledContext from "antd/es/config-provider/DisabledContext";

const useFormDisabled = (selfDisabled?: boolean) => {
  const formDisabled = useContext(DisabledContext);

  const disabled = useMemo(() => {
    return !!selfDisabled || !!formDisabled;
  }, [selfDisabled, formDisabled]);

  return disabled;
};

export default useFormDisabled;
