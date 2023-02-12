import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { alertActions } from "../redux/slices/alertSlice";

export function useAlert() {
  const dispatch = useDispatch();

  const createAlert = (alertsList) => {
    if (alertsList.length > 0) {
      alertsList.forEach((alert) => {
        const alertId = uuidv4();
        dispatch(
          alertActions.setAlert({
            id: alertId,
            alertType: alert.alertType,
            msg: alert.msg,
          })
        );
        setTimeout(() => dispatch(alertActions.removeAlert(alertId)), 5000);
      });
    }
  };

  return [createAlert];
}
