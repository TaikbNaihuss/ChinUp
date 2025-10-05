"use client"

import React, { useState } from "react";
import BrowseButton from "./components/BrowseButton";
import ThemeToggle from "./ThemeToggle";
import QuoteGrid from "./components/QuoteGrid";

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
      <footer className="fixed w-full bottom-0 left-0 text-center p-4">
        Test Test
      </footer>

      <div className="fixed top-[3.5vh] right-[2vw]">
        <ThemeToggle />
      </div>
    </div>
  );
}
