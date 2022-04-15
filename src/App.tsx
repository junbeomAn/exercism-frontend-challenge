import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import TestimonialBox from './TestimonialBox/TestimonialBox.container';
import PageTitle from './PageTitle/PageTitle.container';
import Header from './Header/Header.container';

import { TotalCountContextProvider } from './contexts/totalCountContext';

function App() {
  return (
    <BrowserRouter>
      <div className='w-full flex flex-col items-center'>
        <Header />
        <Routes>
          <Route
            path='/*'
            element={
              <TotalCountContextProvider>
                <PageTitle />
                <TestimonialBox />
              </TotalCountContextProvider>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
