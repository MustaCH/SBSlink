import axios from "axios";
import "./App.css";

function App() {
  const sendEmail = async () => {
    await axios.post("http://localhost:4000/nodemailer", {
      email: "polettiignacio7@gmail.com",
      name: "Nacho",
      lastname: "Poletti",
    });
  };

  return (
    <>
      <button onClick={() => sendEmail()}>Envio de email</button>
    </>
  );
}

export default App;
