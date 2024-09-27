import React, { useState } from 'react';
import './userForm.css';
import RankInput from './RankInput';
import Dropdown from './Dropdown';

const UserForm = ({ handleInputChange }) => {

    const handleRankChange = (e) => {
        handleInputChange(Number(e.target.value), 'rank');
    };

    return (
        <div className="grid grid-cols-2 gap-44 h-full w-full items-center  p-10 justify-between pb-2">
            <div className="h-full flex flex-col justify-between">
            </div>
            <div className="form-wrapper">
                <Dropdown
                    title="How proficient are you with the syllabus?"
                    handleInputChange={(val) => handleInputChange(val, 'proficiency')}
                />

                <div className="w-full input-wrapper">
                    <h2>Are you enrolled with any coaching institute?</h2>
                    <input type="text" placeholder="Institution" onChange={(e) => handleInputChange(e.target.value, 'institution')} />
                </div>

                <RankInput handleRankChange={handleRankChange} />
            </div>
        </div>
    );
};

export default UserForm;
