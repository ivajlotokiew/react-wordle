import React from "react";
import "./WordleLine.scss";

const WORD_LENGTH = 5;

function WordleLine({ guess, randomWord, isCurrentGuess }) {
  const tile = [];
  let letters = {};

  // Object with count of occurrences of each letter in the searched word
  if (!isCurrentGuess) {
    letters = randomWord.split("").reduce(function (acc, curr) {
      return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
    }, {});
  }

  //  Direct guess hits
  for (let i = 0; i < WORD_LENGTH; i++) {
    let elementStyles = `box box-${i} `;
    if (!isCurrentGuess) {
      if (randomWord[i] === guess[i]) {
        letters[guess[i]]--;
        if (letters[guess[i]] >= 0) {
          elementStyles += " green";
        } else {
          delete letters[guess[i]];
        }
      }
    }

    tile.push(<div className={elementStyles}>{guess[i]}</div>);
  }

  // Random guess hits
  if (Object.keys(letters).length > 0) {
    for (let i = 0; i < WORD_LENGTH; i++) {
      let elementStyles = `box box-${i} `;
      if (!isCurrentGuess) {
        if (
          randomWord[i] !== guess[i] &&
          randomWord.split("").some((x) => x === guess[i])
        ) {
          letters[guess[i]]--;
          if (letters[guess[i]] >= 0) {
            elementStyles += " yellow";
            tile[i] = <div className={elementStyles}>{guess[i]}</div>;
          }
        }
      }
    }
  }

  return (
    <>
      <div className="line">{tile}</div>
    </>
  );
}

export default WordleLine;
