"use client";

import { useContext } from "react";
import { CartContext } from '@/components/AppContext';
import Dark from "../icons/Dark";
import Light from '../icons/Light';


function ThemeToggleButton() {

    const {theme , toggleTheme} = useContext(CartContext);
    


  return (
    <div className="dark:bg-dark-background rounded-md mx-2 md:mx-4">
      <label htmlFor="theme-checkbox" className="theme-toggler">
            <input
              type="checkbox"
              id="theme-checkbox"
              className="theme-checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
              aria-label="Toggle theme"
            />
            <div className="switch">
              <div className="icon-container">
                {theme === "light" ? (
                  <Dark className="moon-icon"/>
                ) : (
                  <Light className="sun-icon"/>
                )}
              </div>
            </div>
        </label>
    </div>
  )
}

export default ThemeToggleButton
