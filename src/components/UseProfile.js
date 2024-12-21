
import { useState , useEffect } from 'react';


export function useProfile() {

    const [data , setData] = useState(false);
    const[loading , setLoading] = useState(true);
    const [error , setError] = useState(null);


    useEffect(() => {

      setLoading(true);
      setError(null);

      fetch('/api/profile')
        // .then(data => {
        //   setData(data);
        //   setLoading(false);

        //   console.log(data);
        // })
        .then(response => {
          if(!response.ok)  {
            throw new Error("Failed to fech Profile data");
          }
          return response.json();
        })
        .then(profileData => {
          setData(profileData);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    } ,[]);


  return {loading , data , error};
}

