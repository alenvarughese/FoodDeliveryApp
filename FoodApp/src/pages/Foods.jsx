import React from 'react';
import PageBanner from '../components/PageBanner';
import AllFoods from '../components/AllFoods';

const Foods = () => {
  return (
    <div>
      <PageBanner title="All Foods" />
      
      <div className="container mx-auto py-10"></div>
      
      <AllFoods/>
    </div>
    
  );
};

export default Foods;