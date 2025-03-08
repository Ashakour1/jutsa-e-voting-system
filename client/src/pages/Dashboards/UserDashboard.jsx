import React, { useEffect, useState } from "react";
import { FaVoteYea } from "react-icons/fa";

const UserDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [user, setUser] = useState(null);
  const [userIsVoted, setUserIsVoted] = useState(false);

  // Retrieve user ID from localStorage (or other methods if needed)
  const userId = JSON.parse(localStorage.getItem("userData"))?.data.id;

  useEffect(() => {
    if (!userId) {
      console.error("User not logged in.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${userId}`
        );
        const data = await response.json();
        setUser(data);
        setUserIsVoted(data?.is_voted || false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]); // Depend on userId to refetch data if it changes

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/candidates");
        const data = await response.json();
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []); // Run only once when the component mounts

  const handleVote = async (candidateId) => {
    const confirmVote = window.confirm(
      "Are you sure you want to vote for this candidate?"
    );
    if (!confirmVote) return;

    if (userIsVoted) return; // Prevent voting if the user has already voted

    try {
      const response = await fetch("http://localhost:3000/api/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, candidateId }),
      });

      const data = await response.json();
      console.log(data);
      setUserIsVoted(true); // Update the vote status
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  if (!user || candidates.length === 0) {
    return <div>Loading...</div>; // Display loading state while fetching data
  }

  return (
    <section className="px-5 md:px-0 max-w-[1300px] mx-auto h-screen">
      {userIsVoted ? (
        <div className="bg-green-400 mt-4 text-white p-4 rounded-md">
          <p className="text-center">You have already voted. Thank you!</p>
        </div>
      ) : null}
      <div className="py-8">
        <h1 className="text-3xl text-primary font-bold text-start ">
          Presidential Election 2025
        </h1>

        <p className="text-gray-500 text-lg mt-2">
          Welcome to the voting dashboard. Please review the candidates and cast
          your vote.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {candidates.map((candidate) => (
          <div
            className="border border-gray-300 overflow-hidden rounded-3xl shadow-xl"
            key={candidate.id}
          >
            <img
              src={
                candidate.id === "67cb4256553079d153de61d2"
                  ? "/image1.jpg"
                  : "/image2.jpg"
              }
              alt="candidate"
              className="object-cover transition-transform duration-500 group-hover:scale-105 h-80 w-full"
            />
            <div className="p-4 mt-1 space-y-3">
              <h2 className="text-black font-bold text-xl">{candidate.name}</h2>
              <p className="text-gray-500">{candidate.bio}</p>

              <button
                onClick={() => handleVote(candidate.id)}
                className={` ${
                  userIsVoted ? "bg-gray-400" : "bg-blue-500"
                } w-full text-xl text-white  font-bold py-3 px-4 rounded-2xl`}
                disabled={userIsVoted}
              >
                {userIsVoted ? "Voted" : "Vote"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserDashboard;
