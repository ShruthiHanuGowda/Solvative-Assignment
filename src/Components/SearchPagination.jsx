import React from 'react';

export default function Pagination({ list, setCurrentLinkFn }) {

  return (
    <div className="pageContent flex">
      {
        list.map((item, i) => (
          <>
            <button
              key={`${i}_${item.rel}`}
              onClick={() => setCurrentLinkFn(item.href)}
              className='paginationText'>
              {item.rel}
            </button>
          </>
        ))
      }

    </div>
  );
};

