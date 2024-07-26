/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';

const DataLoader = (Component, url, props) => {
  return (props) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const loadData = async () => {
        setIsLoading(true);

        // Simulated delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setData(url);
        setIsLoading(false);
      };

      loadData();
    }, []);

    if (isLoading) {
      return (
        <div className='flex flex-row justify-center py-[100px]'>
          <div className='spinner'></div>
        </div>
      );
    }
    return <Component {...props} data={data} />;
  };
};

export default DataLoader;
