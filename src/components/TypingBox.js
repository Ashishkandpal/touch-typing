import React, { createRef, useEffect, useMemo, useRef, useState } from "react";

import randomwords from "random-words";

import UpperMenu from "./UpperMenu";
import { useTestMode } from "../context/TestModeContext";
import Stats from "./Stats";
import Play from "../Sounds/AudioFiles";

const TypingBox = () => {
  const inputRef = useRef();

  const { testTime } = useTestMode();

  const [countDown, setCountDown] = useState(testTime);

  const [intervalId, setIntervalId] = useState(null);

  const [testStart, setTestStart] = useState(false);

  const [testEnd, setTestEnd] = useState(false);

  const [correctChars, setCorrectChars] = useState(0);

  const [incorrectChars, setIncorrectChars] = useState(0);

  const [missedChars, setMissedChars] = useState(0);

  const [extraChars, setExtraChars] = useState(0);

  const [correctWords, setCorrectWords] = useState(0);

  const [wordsArr, setWordsArr] = useState(randomwords(50));

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [graphData, setGraphData] = useState([]);

  const wordsSpanRef = useMemo(() => {
    return Array(wordsArr.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArr]);

  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);

    function timer() {
      setCountDown((latestCountDown) => {
        setCorrectChars((correctChars) => {
          setGraphData((graphData) => {
            return [
              ...graphData,
              [
                testTime - latestCountDown + 1,
                correctChars / 5 / ((testTime - latestCountDown + 1) / 60),
              ],
            ];
          });
          return correctChars;
        });
        if (latestCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }
        return latestCountDown - 1;
      });
    }
  };

  const resetTest = () => {
    clearInterval(intervalId);
    setCountDown(testTime);
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArr(randomwords(50));
    resetWordSpanRefClassname();
    focusInput();
  };

  const resetWordSpanRefClassname = () => {
    wordsSpanRef.map((i) =>
      Array.from(i.current.childNodes).map((j) => (j.className = ""))
    );
    wordsSpanRef[0].current.childNodes[0].className = "current";
  };

  const handleUserInput = (e) => {
    if (!testStart) {
      startTimer();
      setTestStart(true);
    }

    if (testEnd) {
      //by me trying
      return;
    }

    const allCurrChars = wordsSpanRef[currentWordIndex].current.childNodes;

    if (e.keyCode === 32) {
      //Logic for space

      let correctCharsInWords =
        wordsSpanRef[currentWordIndex].current.querySelectorAll(".correct");

      if (correctCharsInWords.length === allCurrChars.length) {
        setCorrectWords(correctWords + 1);
      }
      if (allCurrChars.length <= currentCharIndex) {
        //remove cursor from last place in a word
        allCurrChars[currentCharIndex - 1].classList.remove("current-right");
      } else {
        //remove cursor from in between fo the word
        setMissedChars(missedChars + (allCurrChars.length - currentCharIndex));
        allCurrChars[currentCharIndex].classList.remove("current");
      }

      wordsSpanRef[currentWordIndex + 1].current.childNodes[0].className =
        "current";

      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentCharIndex(0);
      return;
    }

    if (e.keyCode === 8) {
      //Logic for Backspace

      if (currentCharIndex !== 0) {
        if (allCurrChars.length === currentCharIndex) {
          if (allCurrChars[currentCharIndex - 1].className.includes("extra")) {
            allCurrChars[currentCharIndex - 1].remove();
            allCurrChars[currentCharIndex - 2].className += " current-right";
          } else {
            allCurrChars[currentCharIndex - 1].className = "current";
          }
          setCurrentCharIndex(currentCharIndex - 1);
          return;
        }

        allCurrChars[currentCharIndex].className = "";
        allCurrChars[currentCharIndex - 1].className = "current";
        setCurrentCharIndex(currentCharIndex - 1);
      }
      return;
    }

    if (currentCharIndex === allCurrChars.length) {
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "incorrect extra current-right";
      allCurrChars[currentCharIndex - 1].classList.remove("current-right");
      wordsSpanRef[currentWordIndex].current.append(newSpan);
      setCurrentCharIndex(currentCharIndex + 1);
      setExtraChars((prev) => prev + 1);
      return;
    }

    if (e.key === allCurrChars[currentCharIndex].innerText) {
      allCurrChars[currentCharIndex].className = "correct";
      setCorrectChars(correctChars + 1);
    } else {
      allCurrChars[currentCharIndex].className = "incorrect";
      setIncorrectChars((prev) => prev + 1);
    }

    if (currentCharIndex + 1 === allCurrChars.length) {
      allCurrChars[currentCharIndex].className += " current-right";
    } else {
      allCurrChars[currentCharIndex + 1].className = "current";
    }

    setCurrentCharIndex(currentCharIndex + 1);
    if (JSON.parse(localStorage.getItem("sound"))) {
      console.log(JSON.parse(localStorage.getItem("sound")));
      console.log("i am sound");
      Play();
    }
  };

  const calculateWPM = () => {
    return Math.round(correctChars / 5 / (testTime / 60));
  };

  const calculateAcc = () => {
    console.log(Math.round(correctWords / currentWordIndex) * 100);
    return Math.round((correctWords / currentWordIndex) * 100);
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    resetTest();
  }, [testTime]);

  useEffect(() => {
    focusInput();
    wordsSpanRef[0].current.childNodes[0].className = "current";
  }, []);

  return (
    <>
      {!testEnd && <UpperMenu countDown={countDown} />}
      {testEnd ? (
        <Stats
          wpm={calculateWPM()}
          accuracy={calculateAcc()}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          missedChars={missedChars}
          extraChars={extraChars}
          graphData={graphData}
        />
      ) : (
        <div className="type-box" onClick={focusInput}>
          <div className="words">
            {wordsArr.map((word, index) => (
              <span className="word" ref={wordsSpanRef[index]}>
                {word.split("").map((ch) => (
                  <span>{ch}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      )}
      <input
        type="text"
        ref={inputRef}
        className="hidden-input"
        onKeyDown={handleUserInput}
      />
    </>
  );
};

export default TypingBox;
