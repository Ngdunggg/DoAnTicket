import { useAppSelector } from "@configs/store";
import { ReactNode, useState, useEffect } from "react";
import AuthPopup from "@modules/auth/components/AuthPopup";

type PrivateRouteProps = {
  children: ReactNode;
};

/**
 * PrivateRoute component.
 *
 * Renders the children components only if a token is present in the application state.
 * Otherwise, it shows the auth popup while keeping the current page visible.
 *
 * @param children - The components to be rendered if a token is present.
 * @returns The rendered children components if a token is present, otherwise shows auth popup.
 */
export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = useAppSelector(state => state.auth.token);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!token) {
      setShowPopup(true);
    }
  }, [token]);

  const handleClosePopup = () => {
    // if (token) {
    setShowPopup(false);
    //
  };

  return (
    <>
      {children}
      <AuthPopup isOpen={showPopup && !token} onClose={handleClosePopup} />
    </>
  );
};

export default PrivateRoute;
