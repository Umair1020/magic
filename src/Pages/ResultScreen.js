import React from 'react';

const ResultScreen = ({ pdfName }) => {
  return (
    <div>
      <div style={{ float: 'left', width: '30%' }}>
       
        <p>{pdfName}</p>
      </div>
      <div style={{ float: 'right', width: '70%' }}>
      
      </div>
    </div>
  );
};

export default ResultScreen;
