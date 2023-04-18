import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from "./../stores/store";

const ProtectedRoute = ({ redirectPath = '/home', children }: any) => {
	const {token} = useSelector((state: RootState) => state.auth)
  if (token == "") return <Navigate to={redirectPath} replace />;

  return children;
};


export default ProtectedRoute