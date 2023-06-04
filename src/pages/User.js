import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import Table from "../components/Table";
import Graph from "../components/Graph";
import UserInfo from "../components/UserInfo";

const User = () => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const fetchUserData = () => {
    const resultsRef = db.collection("Results");
    const { uid } = auth.currentUser;
    let tempData = [];
    let tempGraphData = [];
    resultsRef
      .where("userId", "==", uid)
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          tempData.push({ ...doc.data() });
          tempGraphData.push([
            doc.data().timeStamp.toDate().toLocaleString().split(",")[0],
            doc.data().wpm,
          ]);
        });

        setData(tempData);
        setGraphData(tempGraphData.reverse());
        setDataLoading(false);
      });
  };

  useEffect(() => {
    if (!loading) {
      fetchUserData();
    }
    if (!loading && !user) {
      navigate("/");
    }
  }, [loading]);

  if (loading || dataLoading) {
    return <CircularProgress />;
  }
  return (
    <div className="canvas">
      <UserInfo totalTestsTaken={data.length} />
      <div className="graph-user">
        <Graph graphData={graphData} />
      </div>

      <Table data={data} />
    </div>
  );
};

export default User;
