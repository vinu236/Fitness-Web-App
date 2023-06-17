import { BsClock } from "react-icons/bs";
import { Quotes } from "../../config";

const TimeHeading = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: "1rem",
        marginTop: "2rem",
        marginLeft: "1rem",
        marginRight: "1rem",
        borderRadius: "1rem",
        justifyContent: "center",
        gap: "0.75rem",
        alignItems: "center",
        backgroundColor: "rgba(33, 43, 54, 0.9)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "1rem",
        maxHeight: "20rem",
        overflow: "hidden",
      }}
    >
      <div>
        <BsClock style={{ fontSize: "4rem", color: "#4a5568", animation: "spin 2s infinite linear" }} />
      </div>
      <div style={{ width: "80%", padding: "1rem", overflow: "hidden" }}>
        <p style={{ color: "white", fontSize: "1.5rem", margin: 0 }}>
          "Time and health are two precious assets that we don't recognize and appreciate until they have been depleted." -{" "}
          <span style={{ color: "#4a5568", textTransform: "capitalize" }}>Denis Waitley</span>
        </p>
      </div>
    </div>
  );
};

export default TimeHeading;
