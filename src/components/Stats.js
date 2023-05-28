import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../firebaseConfig";
import Graph from "./Graph";

const Stats = ({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  missedChars,
  extraChars,
  graphData,
}) => {
  let timeSet = new Set();
  const newGraph = graphData.filter((val) => {
    if (!timeSet.has(val[0])) {
      timeSet.add(val[0]);
      return val;
    }
  });

  const pushDataToDB = () => {
    if (isNaN(accuracy)) {
      toast.error("invalid test!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const resultsRef = db.collection("Results");
    const { uid } = auth.currentUser;
    resultsRef
      .add({
        wpm: wpm,
        accuracy: accuracy,
        timeStamp: new Date(),
        characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
        userId: uid,
      })
      .then((res) => {
        toast.success("Data saved to DB!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        toast.error("Data can not saved to DB!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  const loadIt = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (auth.currentUser) {
      pushDataToDB();
    } else {
      toast.warning("Login to saved the data to DB!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  });

  return (
    <div className="infoAfterTest">
      <div className="stats-box">
        <div className="left-stats">
          <div className="title">WPM</div>
          <div className="subtitle">{wpm}</div>
          <div className="title">Accuracy</div>
          <div className="subtitle">{accuracy}</div>
          <div className="title">Characters</div>
          <div className="subtitle">
            {correctChars} / {incorrectChars} / {extraChars} / {missedChars}
          </div>
        </div>
        <div className="right-stats">
          <Graph graphData={newGraph} />
        </div>
      </div>
      <div className="below">
        <button className="restart-btn" onClick={loadIt}>
          Restart
        </button>
      </div>
    </div>
  );
};
export default Stats;
