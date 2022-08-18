import { getDatabase, onChildAdded, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import "./App.css";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {
  Button,
  Container,
  FormControl,
  InputAdornment,
  OutlinedInput,
  IconButton
} from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

function App() {
  const provider = new GoogleAuthProvider();
  const googleLogin = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser({ name: user.displayName, email: user.email });
        // console.log(token, user)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const [user, setUser] = useState({});
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
  const db = getDatabase();
  const postListRef = ref(db, "chats");

  const updateHeight = () => {
    const el = document.getElementById("chat");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };
  useEffect(() => {
    onChildAdded(postListRef, (data) => {
      setChat((chat) => [...chat, data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 100);
    });
  }, []);

  const sendChat = (e) => {
    e.preventDefault();

    const newPostRef = push(postListRef);
    set(newPostRef, {
      user,
      message: msg,
    });
    setMsg("");
  };

  const sendMesg = (e) => {
    if (e.key === "Enter") {
      const newPostRef = push(postListRef);
      set(newPostRef, {
        user,
        message: msg,
      });
      setMsg("");
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "blue",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Container>
          {user.email ? null : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <Button variant="contained" onClick={googleLogin}>
                Google Login
              </Button>
            </div>
          )}
          {user.email ? (
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid red",
                padding: "1rem",
                borderRadius: "10px",
              }}
            >
              {user.email ? (
                <div>
                  <h1>User: {user.name}</h1>
                  <div id="chat" className="chat-container">
                    {chat.map((item, i) => {
                      return (
                        <div
                          className={`container ${
                            item.user.email === user.email ? "me" : ""
                          }`}
                        >
                          <p className="chat_box">
                            <strong>{item.user.name}: </strong>
                            <span>{item.message}</span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              {user.email ? (
                <div className="btm">
                  {/* <input
                type="text"
                onChange={(e) => setMsg(e.target.value)}
                placeholder="enter your chat hare"
                onKeyDown={(e) => sendMesg(e)}
                value={msg}
              /> */}
                 <FormControl sx={{ m: 1, width: '98%' }} variant="outlined">
              <OutlinedInput
                type="text"
                placeholder='Enter Your Message'
                name="message"
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => sendMesg(e)}
                value={msg}
                autoComplete="off"
                sx={{
                  '& legend': { display: 'none' },
                  '& fieldset': { top: 0 },
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      // onClick={sendMessage}
                      edge="end"
                    >
                      <NearMeIcon fontSize="large" color="primary"/>
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
                  {/* <Button variant="contained" onClick={sendChat}>
                    Send
                  </Button> */}
                </div>
              ) : null}
            </div>
          ) : (
            ""
          )}
        </Container>
      </div>
    </>
  );
}

export default App;
