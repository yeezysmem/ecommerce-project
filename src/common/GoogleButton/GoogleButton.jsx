import React, {useState} from "react";
import GoogleIcon from "@mui/icons-material/Google";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const StyledButton = styled.button`
  background-color: #fff;
  border-radius: 8px;
  padding: 15px 0;
  width: 100%;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const ButtonText = styled.span`
  color: #000;
  font-size: 19px;
  font-family: "MontserratSemiBold";
  margin-left:10px;
`;

const GoogleButton = ({ buttonText }) => {
//     const [email, setEmail] = useState("");
//     const provider = new GoogleAuthProvider();
//     const navigate = useNavigate();
//     const auth = getAuth();

//   const handleGoogleAuth = () => {
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         // The signed-in user info.
//         const user = result.user;
//         setSuccessMsg("Well done!");
//         setTimeout(() => {
//           setSuccessMsg("");
//           navigate("/");
//         }, 4000);
//       })
//       .catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });
//   };

  return (
    <StyledButton type="sumbit">
      <GoogleIcon />
      <ButtonText>{buttonText}</ButtonText>
    </StyledButton>
  );
};

export default GoogleButton;
