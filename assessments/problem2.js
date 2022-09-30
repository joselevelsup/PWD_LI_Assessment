import { render } from "react-dom"; //Imports the render function for rendering the react app/component to a mounting point
import { useEffect, useState } from "react"; //This imports the useEffect and useState hooks

// This is a custom hook for calling an api. Custom Hooks are made when using Standard React Hooks (example: useState). You can return data from a Standard React Hook AND anyother data you want to return to the parent component 
// Hooks SHOULD only be used in Functional Components. They cannot be used in regular functions or Class Components
// This hook returns 3 states and 1 Set state action. The required parameter is just a URL in string format. 
const useAPICall = (url) => {
  //We create 4 states. 
  //1 for a loading state. So the api is currently being retrieved.
  //1 for an error state. There was an error getting data from the API
  //1 for the actual data. This is where all the data is contained. 
  //1 for a click function to tell this hook to go ahead and fetch the data
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [data, setData] = useState(null);
  const [shouldFetch, setFetch] = useState(false);

  const toggleFetch = () => setFetch(true);

  //useEffect is meant for side effects. So if one piece of data changes in the dependency array, the function will be fired. 
  //In useEffects, the function supplied is fired once on mount, any time data changes in the dependency array, and once on dismount but through a return function.
  //useEffects are all the time mistaken for Lifecycle but DO NOT GET IT CONFUSED. They may act the same but in reality, they should not be used the same way. 
  //Event Emitters can be placed here BUT must be removed on dismount. 
  //This is to prevent possible memory leaks
  //Example:
  // useEffect(() => {
  //  const someFunction = () => console.log("mouse moved");
  //  document.addEventListener("mousemove", someFunction);
  //  return () => {
  //    document.removeEventListener("mousemove", someFunction);
  //  }
  // }, [])

  useEffect(() => {
    //The function that fetches the data;
    //useEffect functions CANNOT be async functions. 
    const fetchFromApi = async () => {
      //try and catch are blocks that can be used with async/await functions. This is similar to a then/catch function. 
      //The try means everything is working good  but once something fails, the error is sent to the catch block.
      //In the catch block, we can perform error handling. For this example, setting the error state to true to indicate there is an error
      try {
        const apiData = await fetch(url).then(data => data.json());

        setLoading(false);

        setData(apiData);
        setFetch(false);
      } catch(e){
        setLoading(false);
        setError(true);
      }
    }

    if(shouldFetch){
      fetchFromApi();
    }
  }, [data, url, shouldFetch]) //This is the dependency array. If any of these variables data is changed, the useEffect function is fired.

  return {isLoading, isError, data, fetchData: toggleFetch}
}

//This is the APICaller Component written as a Functional Component. 
const APICaller = () => {
  //using the hook here makes the function reusable for other components. 
  const { isLoading, isError, data, fetchData } = useAPICall("https://www.reddit.com/r/react.json"); 

  if(!isLoading && isError){
    return (
      <div>There was an error fetching from api</div>
    )
  }
  return (
    <div>
      <button onClick={() => fetchData()}>Call the API now.</button>
      {
        !isLoading && data && (
          <>{JSON.stringify(data, null, 2)}</>
        )
      }
    </div>
  )
}

render(APICaller, document.getElementById('myapicaller'))
  
