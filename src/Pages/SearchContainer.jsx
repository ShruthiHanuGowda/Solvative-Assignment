import React, { createContext, useState, useContext } from 'react'
import SearchBar from '../Components/SearchBar'
import TableContent from '../Components/TableContent';
import '../styles/searchContainer.css';

const searchBarContext = createContext();

export default function SearchPlace() {
    const [searchVal, setSearchVal] = useState('');

    return (
        <div className='searchVal grid'>
            <searchBarContext.Provider value={{ searchVal, setSearchVal }} className="grid">
                <SearchBar />
                <TableContent />
            </searchBarContext.Provider>
        </div>
    )
}

export const useSearchBarContext = () => {
    return useContext(searchBarContext);
};  