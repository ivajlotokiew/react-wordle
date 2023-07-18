import React, { useState, useEffect, useCallback } from "react";
import "./Wordle.scss";
import WordleLine from "./WordleLine";
import { words } from "../data.js";

function Wordle() {
  const [guesses, setGuesses] = useState(new Array(6).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [randomWord, setRandomWord] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [iWin, setIWin] = useState(false);

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
          setIsGameOver(true);
          return;
        } else {
          const copy = [...guesses];
          copy[index] = currentGuess;
          setGuesses(copy);
          if (currentGuess.toUpperCase() === randomWord) {
            setIsGameOver(true);
            setIWin(true);
          }
          setCurrentGuess("");
        }
      }
    },
    [currentGuess, guesses, randomWord]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentGuess, handleKeyPress]);

  const getRandomWord = () => {
    const rWord = words[Math.floor(Math.random() * words.length)];
    setRandomWord(rWord);
  };

  return (
    <>
      <div className="container">
        {isGameOver
          ? iWin
            ? "YOU WIN"
            : "Game Over"
          : guesses.map((word, i) => {
              const isCurrentGuess =
                i === guesses.findIndex((val) => val === "");
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
