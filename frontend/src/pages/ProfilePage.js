import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { role, token } = useContext(AuthContext);

  return (
    <div>
      <h1>Mon profil</h1>
      <p>
        <strong>Rôle :</strong> {role}
      </p>
      <p>
        <strong>Token :</strong> {token?.substring(0, 30)}...
      </p>
    </div>
  );
};

export default ProfilePage;
