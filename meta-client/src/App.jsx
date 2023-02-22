import React, { useEffect ,useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import EntryPage from './components/EnteryPage/EnteryPage';
import Grid20 from './components/Grid copy/Grid20';
import Grid from './components/Grid/Grid'
import generatePlots from './components/Grid/plotsData';
import Map from './components/Map/Map';


function App() {
  // state variables to manage the visibility of the grid and the user type
  const [showGrid, setShowGrid] = useState(false);
  const [userType, setUserType] = useState('');
  const [backendData, setBackendData]= useState([])
  

  //to render array from server 
  // useEffect(()=>{
  //   fetch("/api").then(
  //     response => response.json()  
  //   ).then(
  //     data=>{
  //       setBackendData(data)
  //     }
  //   )
  // },[])

  //to render a json file from server
  // useEffect(() => {
  //   fetch("/api").then((response) => {
  //     if (!response.ok) throw new Error(response.statusText);
  //     return response.json();
  //   }).then((json) => {
  //     setBackendData(json.data);
  //   }).catch((error) => console.log(error));
  // }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api');
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        setBackendData(json.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);//when adding function and states for button you may mention states inside the [] in the line

  // event handler to update the user type when the user selects a type
  const handleUserTypeChange = (type) => {
    setShowGrid(true);
    setUserType(type);
  };

  // event handler to go back to the entry page and reset the user type
  const handleHomeClick = () => {
    setShowGrid(false);
    setUserType('');
  };

  
  // get the plot data
  const plots = generatePlots();

  // create the artifact JSON file
  const jsonFile = new Blob([JSON.stringify(plots, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(jsonFile);


  return (
    <div className="App">
      <Header onHomeClick={handleHomeClick} />
      {/* <Grid20 backendData={backendData}/> */}
      <Map backendData={backendData}/>
      <a href={url} download="Meta_DeCentraland_Plots.json">Download JSON</a>
      <Footer />

      {/* {backendData.length===0?(
        <p>Loading...</p>
      ):(backendData.map((item)=>{
        return<> 
         <p key={item.id}>{item.id}</p>
         <p key={item.id}>{item.price}</p>
         </>
      }))
      } */}
    </div>
  );
}

export default App;