import { useEffect } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();
  console.log("Sdsdfsdfafasfasdfasf");
  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }
    navigate("/chat", { replace: true });
  };
  useEffect(() => {
    console.log("DSf");
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>DevRooms</>`}</h1>
        <input
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username..."
        />

        <select
          onChange={(e) => setRoom(e.target.value)}
          className={styles.input}
        >
          <option>-- Select Room --</option>
          <option value="javascript">JavaScript</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
          <option value="react">React</option>
        </select>

        <button
          onClick={joinRoom}
          className="btn btn-secondary"
          style={{ width: "100%" }}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
