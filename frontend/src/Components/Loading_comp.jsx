import { useContext } from "react";
import { EventAppContext } from "../Context/EventContext";
import {Navigate} from "react-router-dom"


const Loading_comp = ({ children }) => {
  const { isAuthenticated, loading } = useContext(EventAppContext);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/Home" />;

  return children || <div>⚠ No child component provided</div>;
};

export default Loading_comp
