import React, { useState, useMemo } from "react";

function PlayerScoreInput() {
  const [playerName, setPlayerName] = useState("");
  const [score, setScore] = useState("");
  const [players, setPlayers] = useState({});

  const handleUpdateScores = () => {
    setPlayers((prevPlayers) => {
      const newScore = parseInt(score, 10);
      const existingPlayer = prevPlayers[playerName];

      const updatedPlayer = {
        scores: existingPlayer
          ? [...existingPlayer.scores, newScore]
          : [newScore],
        total: existingPlayer ? existingPlayer.total + newScore : newScore,
      };

      return { ...prevPlayers, [playerName]: updatedPlayer };
    });
    setScore(""); // Reset score input after updating
  };

  // Calculate the maximum number of matches any player has played
  const maxMatches = useMemo(() => {
    return Math.max(
      0,
      ...Object.values(players).map((player) => player.scores.length)
    );
  }, [players]);

  return (
    <div>
      <label>
        Player's Name:
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </label>
      <label>
        Score:
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
      </label>
      <button onClick={handleUpdateScores}>Update Scores</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            {[...Array(maxMatches).keys()].map((i) => (
              <th key={i}>Match {i + 1}</th>
            ))}
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(players).map(([name, data]) => (
            <tr key={name}>
              <td>{name}</td>
              {[...Array(maxMatches).keys()].map((i) => (
                <td key={i}>{data.scores[i] || "-"}</td>
              ))}
              <td>{data.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerScoreInput;
