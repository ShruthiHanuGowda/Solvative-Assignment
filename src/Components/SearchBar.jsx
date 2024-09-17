import React, { useEffect, useRef } from 'react';
import { useSearchBarContext } from '../Pages/SearchContainer';

export default function SearchBar() {
  const { setSearchVal } = useSearchBarContext();
  const refSearch = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault();
        if (refSearch.current) {
          refSearch.current.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="searchBox">
      <input className="searchInput" type="text" ref={refSearch} placeholder='Search places...' onChange={(e) => setSearchVal(e.target.value)} />
      <span className="searchIcon">Ctrl + /</span>
    </div>
  )
}
