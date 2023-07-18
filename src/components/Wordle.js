import React, { useState, useEffect, useCallback } from "react";
import "./Wordle.scss";
import WordleLine from "./WordleLine";

const WORDS = ["ALBUM", "HINGE", "MONEY"];

function Wordle() {
  const [guesses, setGuesses] = useState(new Array(6).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [randomWord, setRandomWord] = useState("");

  useEffect(() => {
    getRandomWord();
  }, []);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.keyCode >= 65 && e.keyCode <= 90 && currentGuess.length < 5) {
        setCurrentGuess((oldGuess) => oldGuess + e.key);
      }

      if (e.keyCode === 8 && currentGuess !== "") {
        setCurrentGuess((oldGuess) =>
          oldGuess.substring(0, oldGuess.length - 1)
        );
        return;
      }

      if (
        e.keyCode === 13 &&
        currentGuess.length === 5 &&
        guesses.some((w) => w === "")
      ) {
        let index = guesses.findIndex((x) => x === "");
        if (index === 5) {
          return;
        } else {
          const copy = [...guesses];
          copy[index] = currentGuess;
          setGuesses(copy);
          setCurrentGuess("");
        }
      }

      console.log("Result: ", currentGuess);
    },
    [currentGuess, guesses]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentGuess, handleKeyPress]);

  const getRandomWord = () => {
    const rWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setRandomWord(rWord);
  };

  return (
    <>
      <div className="container">
        {guesses.map((word, i) => {
          const isCurrentGuess = i === guesses.findIndex((val) => val === "");
          return (
            <WordleLine
              guess={isCurrentGuess ? currentGuess : word.toUpperCase()}
              randomWord={randomWord}
              iscurrentGuess={isCurrentGuess}
              key={i}
            />
          );
        })}
      </div>

      <div>{randomWord}</div>
    </>
  );
}

export default Wordle;
