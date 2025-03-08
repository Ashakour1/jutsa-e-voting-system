import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Skeleton from "react-loading-skeleton"; // Import the skeleton loader
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [candidatesData, setCandidatesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData?.token;
      try {
        const response = await axios.get("http://localhost:3000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching users");
        setLoading(false);
      }
    };

    const fetchCandidatesAndVotes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/candidates/votes"
        );
        setCandidatesData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching candidates and votes");
        setLoading(false);
      }
    };

    fetchUsers();
    fetchCandidatesAndVotes();

    // Set interval to update data every second
    const interval = setInterval(() => {
      fetchCandidatesAndVotes();
      fetchUsers();
    }, 1000); // Every second

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty array ensures the effect runs once when the component mounts

  if (loading) return <SkeletonLoading />; // Display skeleton loader while loading

  if (error) return <div>{error}</div>;
  if (!candidatesData || candidatesData.length === 0)
    return <div>No candidates found.</div>;

  // Aggregate vote counts per candidate
  const labels = candidatesData.map((candidate) => candidate.name);
  const voteCounts = candidatesData.map((candidate) => candidate.votes.length);

  // Using two predefined colors for the chart
  const barColors = ["#4caf50", "#2196f3"]; // Green and Blue colors

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Votes per Candidate",
        data: voteCounts,
        backgroundColor: barColors, // Use two colors for bars
        borderColor: barColors, // Apply the same colors for borders
        borderWidth: 1,
      },
    ],
  };

  // Calculate total stats
  const totalVotes = voteCounts.reduce((sum, count) => sum + count, 0);
  const totalCandidates = candidatesData.length;
  const totalUsers = users.length;

  return (
    <div style={{ padding: "10px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
        Election Dashboard
      </h1>

      {/* Stats Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            flex: 1,
            margin: "0 10px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            textAlign: "center",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Candidates</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {loading ? <Skeleton width={50} /> : totalCandidates}
          </p>
        </div>
        <div
          style={{
            flex: 1,
            margin: "0 10px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            textAlign: "center",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Votes</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {loading ? <Skeleton width={50} /> : totalVotes}
          </p>
        </div>
        <div
          style={{
            flex: 1,
            margin: "0 10px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            textAlign: "center",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Users</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {loading ? <Skeleton width={50} /> : totalUsers}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div style={{ width: "80%", margin: "auto" }}>
        {loading ? (
          <Skeleton height={400} />
        ) : (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                title: { display: true, text: "Total Votes per Candidate" },
                tooltip: { enabled: true },
              },
              scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } },
              },
            }}
          />
        )}
      </div>

      {/* List of Candidates and Votes */}
      <div style={{ marginTop: "30px", padding: "10px" }}>
        <h3>Vote Counts per Candidate:</h3>
        {loading ? (
          <Skeleton count={5} height={40} />
        ) : (
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {candidatesData.map((candidate) => {
              const totalVotesForCandidate = candidate.votes.length;
              return (
                <li
                  key={candidate.id}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <strong>{candidate.name}:</strong>{" "}
                  <span>{totalVotesForCandidate} votes</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

// Skeleton Loading Component
const SkeletonLoading = () => (
  <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
    <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
      <Skeleton width={200} />
    </h1>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "30px",
      }}
    >
      <div style={{ flex: 1, margin: "0 10px", padding: "20px" }}>
        <Skeleton height={150} />
      </div>
      <div style={{ flex: 1, margin: "0 10px", padding: "20px" }}>
        <Skeleton height={150} />
      </div>
      <div style={{ flex: 1, margin: "0 10px", padding: "20px" }}>
        <Skeleton height={150} />
      </div>
    </div>
    <Skeleton height={400} />
    <Skeleton count={5} height={40} />
  </div>
);

export default AdminDashboard;
