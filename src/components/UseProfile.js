
import { useState , useEffect } from 'react';


export function useProfile() {

    const [data , setData] = useState(false);
    const[loading , setLoading] = useState(true);


    useEffect(() => {

      setLoading(true);

      fetch('/api/profile').then(data => {
        setData(data);
        setLoading(false);

        console.log(data);
      })
    } ,[]);


  return {loading , data};
}

