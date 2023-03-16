import "./App.css";
import { useCallback, useEffect, useState } from "react";

import styled from "styled-components";

function App() {
  const [inputHome, setInputHome] = useState("");
  const [inputAway, setInputAway] = useState("");
  const [games, setGames] = useState([]);
  const [sumary, setSumary] = useState([]);

  const handleStart = () => {
    if (inputHome !== "" && inputAway !== "") {
      const newGame = {
        id: inputHome + inputAway + new Date().getUTCMilliseconds(),
        home: inputHome,
        away: inputAway,
        homeScore: 0,
        awayScore: 0,
        editable: false,
      };
      setGames([...games, newGame]);
      setInputHome("");
      setInputAway("");
    } else {
      alert("You must fill all fields");
    }
  };

  const handleFinish = (id) => {
    const filteredGamesDelete = games.filter((el) => el.id !== id);
    setGames(filteredGamesDelete);
    const filteredGamesSumaryAdd = games.filter((el) => el.id === id);
    const filteredObject = filteredGamesSumaryAdd[0];
    const sum =
      parseInt(filteredObject.homeScore) + parseInt(filteredObject.awayScore);
    setSumary([...sumary, { ...filteredObject, sum }]);
  };

  const handleToggleEdit = (id) => {
    const editedArray = games.map((el) => {
      if (el.id === id) {
        el.editable = !el.editable;
      }
      return el;
    });
    setGames(editedArray);
  };

  const handleEditScore = (e, id, team) => {
    const inputScore = parseInt(e);
    const editedArray = games.map((el) => {
      if (el.id === id) {
        if (team === "home") {
          el.homeScore = inputScore;
        }
        if (team === "away") {
          el.awayScore = inputScore;
        }
      }
      return el;
    });
    setGames(editedArray);
  };

  const handleSort = useCallback(() => {
    const sortedSumary = [...sumary].sort((a, b) => b.sum - a.sum);
    setSumary((prev) => sortedSumary);
  }, [sumary]);

  useEffect(() => {
    handleSort();
    console.log(sumary);
  }, [sumary, handleSort]);

  return (
    <MainWrapper>
      <InputTeam
        value={inputHome}
        placeholder={"Home"}
        onChange={(e) => setInputHome(e.target.value)}
      />
      <hr />
      <InputTeam
        value={inputAway}
        placeholder={"Away"}
        onChange={(e) => setInputAway(e.target.value)}
      />
      <StartGameButton onClick={() => handleStart()}>
        Start Game
      </StartGameButton>
      <GamesList>
        {games &&
          games.map((el) => {
            return (
              <li key={el.id}>
                {el.home}{" "}
                <InputScore
                  value={el.homeScore}
                  onChange={(e) =>
                    handleEditScore(e.target.value, el.id, "home")
                  }
                  disabled={!el.editable}
                  type="number"
                />{" "}
                vs{" "}
                <InputScore
                  value={el.awayScore}
                  onChange={(e) =>
                    handleEditScore(e.target.value, el.id, "away")
                  }
                  disabled={!el.editable}
                  type="number"
                />{" "}
                {el.away}
                <ButtonGame onClick={() => handleToggleEdit(el.id)}>
                  Edit
                </ButtonGame>
                <ButtonGame onClick={() => handleFinish(el.id)}>
                  Finish
                </ButtonGame>
              </li>
            );
          })}
      </GamesList>
      <h2>Sumary</h2>
      <SumaryWrapper>
        {sumary &&
          sumary.map((el) => (
            <li key={el.id}>
              {el.home} <b>{el.homeScore}</b> vs {el.away} <b>{el.awayScore}</b>
            </li>
          ))}
      </SumaryWrapper>
    </MainWrapper>
  );
}

const SumaryWrapper = styled.ul``;

const MainWrapper = styled.div`
  padding: 2%;
`;

const StartGameButton = styled.button`
  margin-left: 2%;
`;

const InputScore = styled.input`
  width: 50px;
`;

const InputTeam = styled.input``;

const GamesList = styled.ul`
  margin-top: 10%;

  & > li {
    margin-top: 3%;
  }
`;
const ButtonGame = styled.button`
  margin-left: 10px;
  cursor: pointer;
`;

export default App;
