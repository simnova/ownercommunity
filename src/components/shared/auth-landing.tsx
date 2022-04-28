import { Navigate } from "react-router-dom";

export const AuthLanding: React.FC<any> = (_props) => {
  return (
    <Navigate to='/community/accounts' />
  );
}