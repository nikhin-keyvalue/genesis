import React, { useState } from 'react'

import './dropdown.css'

const proficiencyLevels = ['Novice', 'Graduate', 'Professional', 'Elite']

export default function Dropdown({title}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProficiency, setSelectedProficiency] = useState('Novice')

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (proficiency) => {
    setSelectedProficiency(proficiency)
    handleInputChange(proficiency)
    setIsOpen(false)
  }

  return (
    <div className="w-full form-btn dropdown-wrapper">
      <h2>
        {title}
      </h2>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="w-full flex justify-between items-center focus:outline-none dropdown-btn"
        >
          <span>{selectedProficiency}</span>
            <img src="/arrow-down.png" className={`${isOpen ? 'open' : 'close'}`}/>
        </button>
        {isOpen && (
          <div className="absolute w-full mt-1 z-10 dropdown-options">
            {proficiencyLevels.map((proficiency) => (
              <button
                key={proficiency}
                onClick={() => handleSelect(proficiency)}
                className="w-full text-left"
              >
                {proficiency}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}