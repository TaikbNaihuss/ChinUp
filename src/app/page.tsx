"use client"

import React, { useState } from "react";
import BrowseButton from "./components/BrowseButton";
import ThemeToggle from "./ThemeToggle";
import QuoteGrid from "./components/QuoteGrid";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const [hideContent, setHideContent] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);
  const [fadeOutActive, setFadeOutActive] = useState(false);

  const handleBrowseClick = () => {
    setFadeOutActive(true);
    setTimeout(() => {
      setHideContent(true);
      setShowQuotes(true);
    }, 900);
  };


  return (
    <div className="font-title min-h-screen p-12">
      {!hideContent && (
        <>
          <main className={`main-content items-center sm:items-start ${fadeOutActive ? 'fade-out' : ''}`}>
            <div className="grid grid-flow-col grid-rows-[1fr_40px] gap-[4px]">
              <h1 className="text-8xl fade-in-1">
                Chin Up.
              </h1>
              <div className="pt-[.05vh] ps-[30px]">
                <h3 className="text-2xl fade-in-1">
                  Quotes to keep you going.
                </h3>
              </div>
            </div>
          </main>

          <div className={`fixed top-[35%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
              text-3xl text-center grid grid-rows-[1fr_1fr] gap-4 
              intro-content fade-in-2 ${fadeOutActive ? 'fade-out' : ''}`}>
            <h3>A portfolio project with good vibes 😊</h3>
            <h2 className="text-5xl">Enjoy!</h2>
          </div>

          <BrowseButton
            onClick={handleBrowseClick}
            className={fadeOutActive ? 'fade-out' : ''}
          />
        </>
      )}

      {/* Quote Grid */}
      {showQuotes && <QuoteGrid />}

      {/* Permanent Elements */}
      <footer className="fixed bottom-2 left-[50%] transform -translate-x-1/2 z-10 flex justify-center font-mono text-lg rounded-xl w-fit 
                            bg-yellow-300 shadow-xl dark:bg-gray-600 
                            py-2 px-5 w-fit fade-in-2">
        <a className="flex justify-center items-center bg-yellow-500/40 dark:bg-gray-700
                     hover:bg-yellow-500 dark:hover:bg-gray-800 rounded-xl px-3 py-1"
                     target="_blank"
                     href="https://github.com/TaikbNaihuss/ChinUp"
                     >
          <FaGithub className="scale-[1.25] mr-2"/> GitHub
        </a>
      </footer>

      <div className="fixed top-4 right-[2vw] z-10">
        <ThemeToggle />
      </div>
    </div>
  );
}
