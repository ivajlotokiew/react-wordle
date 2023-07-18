import React, { useState, useEffect, useCallback } from "react";
import "./Wordle.scss";
import WordleLine from "./WordleLine";
import { words } from "../data.js";

function Wordle() {
  const [guesses, setGuesses] = useState(new Array(6).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [searchedWord, setSearchedWord] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [iWin, setIWin] = useState(false);

  useEffect(() => {
    getSearchedWord();
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
          if (currentGuess.toUpperCase() === searchedWord) {
            setIsGameOver(true);
            setIWin(true);
          }
          setCurrentGuess("");
        }
      }
    },
    [currentGuess, guesses, searchedWord]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentGuess, handleKeyPress]);

  const getSearchedWord = () => {
    const rWord = words[Math.floor(Math.random() * words.length)];
    setSearchedWord(rWord);
  };

  return (
    <>
      <div className="container">
        {isGameOver
          ? iWin
            ? "YOU WIN!!!"
            : "Game Over"
          : guesses.map((word, i) => {
              const isCurrentGuess =
                i === guesses.findIndex((val) => val === "");
              return (
                <WordleLine
                  guess={isCurrentGuess ? currentGuess : word.toUpperCase()}
                  searchedWord={searchedWord}
                  iscurrentGuess={isCurrentGuess}
                  key={i}
                />
              );
            })}
      </div>

      <div>{searchedWord}</div>
    </>
  );
}

export default Wordle;
