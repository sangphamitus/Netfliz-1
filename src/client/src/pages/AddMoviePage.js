import React from "react";
import {
  Button,
  Input,
  Text,
  NavBar,
  Footer
} from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddMoviePage() {   

  const [isChosen,setIsChosen]=React.useState({
    link:"",
    name:"",
    image:"",
    ratting:0,
    haveEp:null,
    review:"",
    type:[null,null,null],
  })
  const [allEpisode,setAllEpisode]=React.useState([]);
  const [episodeChosen,setEpisodeChosen]= React.useState(null);
  const [createEp,setCreateEp]=React.useState(false);
    const [collectionName,setCollectionName]=React.useState("");
    const saveSubmit=async(e)=>{
      let typeString="";
        isChosen.type.forEach(each=>
        {
          if(each!=="null")
          {
              if (typeString.length>0)
              {
                typeString+=","
              }
              typeString+=each
          }

        })
      axios.post(`${process.env.REACT_APP_ENDPOINT}videos/add`,
      {
      
        link:isChosen.link,
        ratting:isChosen.ratting,
        name:isChosen.name,
        image:isChosen.image,
        haveEp:episodeChosen,
        review:isChosen.review,
        type:typeString
      })
      .then((res) => {
        console.log(res.data.data);
        alert(res.data.message);
      });
      //vid,link,name,image,ratting,haveEp,review,type
    }
  const getAllEpisode=async()=>{
    axios.post(`${process.env.REACT_APP_ENDPOINT}videos/getAllEp`)
      .then((res) => {
        console.log(res.data.data);
        setAllEpisode(res.data.data);
      });
  }
  const createCollection=async(e)=> {
    e.preventDefault();

    if(collectionName.length===0) return;
    axios.post(`${process.env.REACT_APP_ENDPOINT}videos/createEp`,
    {
      name:collectionName
    })
    .then((res) => {
      console.log(res.data.data);
        getAllEpisode();
        setCreateEp(false);
    });
  }

  React.useEffect(()=> {
    if(localStorage.getItem("per")!=="true")
    {
        window.location.href="/"
    }
    getAllEpisode();

},[])

    return (
      <div className="App bg-[#082032]">
        <NavBar/>
        <div className=" flex">
      <div className="pt-8 p-4 mb-2">
          <Text 
              text={"Movie Name:"}
              customTheme={"text-white font-button text-[25px] whitespace-nowrap"}
          />
      </div>
      <Input 
       inputTheme={"p-4 h-10 max-2w-xl w-auto bg-black bg-opacity-25 border-2 rounded-xl text-white"}
      id="movie_name" containerTheme={"w-full"} valuetext={isChosen.name} onChange={(e)=>
        {
 
          setIsChosen({...isChosen,name:e.target.value})}
         } ></Input>
  </div>
  <div className=" flex">
      <div className="pt-8 p-4 mb-2">
          <Text 
              text={"Movie Review:"}
              customTheme={"text-white font-button text-[25px] whitespace-nowrap"}
          />
      </div>
      <Input
       inputTheme={"p-4 h-10 max-2w-xl w-auto bg-black bg-opacity-25 border-2 rounded-xl text-white"}
      id="movie_content" containerTheme={"w-full"}  valuetext={isChosen.review} onChange={(e)=>setIsChosen({...isChosen,review:e.target.value})} ></Input>
  </div>
  <div className=" flex">
      <div className="pt-8 p-4 mb-2">
          <Text 
              text={"Rating:"}
              customTheme={"text-white font-button text-[25px] whitespace-nowrap"}
          />
      </div>
      <Input 
       inputTheme={"p-4 h-10 max-2w-xl w-auto bg-black bg-opacity-25 border-2 rounded-xl text-white"}
      id="data_release" containerTheme={"w-full"} type={"number"} valuetext={isChosen.ratting} onChange={(e)=>setIsChosen({...isChosen,ratting:e.target.value})} > </Input>
  </div>
  <div className=" flex">
      <div className="pt-8 p-4 mb-2">
          <Text 
              text={"Banner URL:"}
              customTheme={"text-white font-button text-[25px] whitespace-nowrap"}
          />
      </div>
      <Input 
       inputTheme={"p-4 h-10 max-2w-xl w-auto bg-black bg-opacity-25 border-2 rounded-xl text-white"}
      id="cast" containerTheme={"w-full"} valuetext={isChosen.image} onChange={(e)=>setIsChosen({...isChosen,image:e.target.value})} ></Input>
  </div>
  <div className=" flex">
      <div className="pt-8 p-4 mb-2">
          <Text 
              text={"Video URL: "}
              customTheme={"text-white font-button text-[25px] whitespace-nowrap"}
          />
      </div>
      <Input 
       inputTheme={"p-4 h-10 max-2w-xl w-auto bg-black bg-opacity-25 border-2 rounded-xl text-white"}
      id="director" containerTheme={"w-full"} valuetext={isChosen.link} onChange={(e)=>setIsChosen({...isChosen,link:e.target.value})} ></Input>
  </div>
  
  <div className=" flex">
      <div className="pt-8 p-4 mb-2">
          <Text 
              text={"TAGS"}
              customTheme={"text-white font-button text-[25px] whitespace-nowrap"}
          />
      </div>
      <div className=" flex w-8 pt-8 p-4 mb-2 ">
          <select id ="tags" className=" mr-10 bg-[#082032] rounded-[5px] text-white border-2 border-white border-solid"
          value={isChosen.type[0]}
          onChange={(e)=>{
            setIsChosen({...isChosen,type:[e.target.value,isChosen.type[1],isChosen.type[2]]})
        
          }} >
              <option value="null">null</option>
              <option value="action">Action</option>
              <option value="anime">Anime</option>
              <option value="comedy">Comedy</option>
              <option value="dramas">Dramas</option>
              <option value="romance">Romance</option>
           
          </select>
          <select id ="tags_1" className=" mr-10 bg-[#082032] rounded-[5px] text-white border-2 border-white border-solid"
           value={isChosen.type[1]}
           onChange={(e)=>{
             setIsChosen({...isChosen,type:[isChosen.type[0],e.target.value,isChosen.type[2]]})
         
            }}>
                <option value="null">null</option>
              <option value="action">Action</option>
              <option value="anime">Anime</option>
              <option value="comedy">Comedy</option>
              <option value="dramas">Dramas</option>
              <option value="romance">Romance</option>
          </select>
          <select id ="tags_2" className=" mr-10 bg-[#082032] rounded-[5px] text-white border-2 border-white border-solid"
          value={isChosen.type[2]}
          onChange={(e)=>{
            setIsChosen({...isChosen,type:[isChosen.type[0],isChosen.type[1],e.target.value]})
            }}>
          <option value="null">null</option>
              <option value="action">Action</option>
              <option value="anime">Anime</option>
              <option value="comedy">Comedy</option>
              <option value="dramas">Dramas</option>
              <option value="romance">Romance</option>
          </select>
      </div>
  </div>
  <div className=" flex">
        <div className="pt-8 p-4 mb-2">
            <Text 
                text={"Collection: "}
                customTheme={"text-white font-button text-[25px] whitespace-nowrap"}
            />
        </div>
      <div className=" flex w-8 pt-8 p-4 mb-2 ">
      <select id ="tags" className=" mr-10 bg-[#082032] rounded-[5px] text-white border-2 border-white border-solid"
          value={episodeChosen}
          onChange={(e)=>{
           setEpisodeChosen(e.target.value)
            if(e.target.value==="addNew")
            {
              setCreateEp(true);
            }
            else{
              setCreateEp(false)
            }
          }} >
              <option value="null">null</option>
              {
             
                allEpisode.map(each=>
                  {
                    return   <option key={each.id}value={each.eid}>{each.collectionName}</option> 
                  }

                )
              } 
              <option value="addNew">+ New Episode</option>
             
           
          </select>
      </div>
      </div>
{ 
    createEp&&<div className=" flex">
    <div className="pt-8 p-4 mb-2">
              <Text 
                  text={"Create Collection "}
                  customTheme={"text-white font-button text-[25px] whitespace-nowrap"}
              />
          </div>
        <div className=" flex w-8 pt-8 p-4 mb-2 ">
        <div className="flex pt-8 p-4 mb-2">
          <Text 
              text={"Collection Name: "}
              customTheme={"text-white font-button text-[25px] whitespace-nowrap"}
          />
         </div>
           
          <Input
           inputTheme={"p-4 h-10 max-2w-xl w-auto bg-black bg-opacity-25 border-2 rounded-xl text-white"}
          id="Episode_name" containerTheme={"w-full"} valuetext={collectionName} onChange={(e)=>setCollectionName(e.target.value)} ></Input>
       
        </div>
        <div className="  ">
          <Button
    
          theme={"bg-pink-600 rounded-[5px] w-[100px] h-10 float-right"}
          onClick={(e)=>createCollection(e)}
          >
          <Text 
              text={"CREATE"}
              customTheme="text-white font-button text-[25px]"
          />
      </Button>
      </div>
    </div>
    
}


  <div className="flex pt-[80px]">
      <Button
          theme={"bg-pink-600 rounded-[5px] w-[100px] h-10 float-left"}
          onClick={saveSubmit}
      > 
          <Text 
              text={"SAVE"}
              customTheme="text-white font-button text-[25px]"
          />
      </Button>
      <Button
          theme={"bg-pink-600 rounded-[5px] w-[100px] h-10 float-right"}
          onClick={(e) =>
          {
            window.location.href="/admin"
          }}
      >
          <Text 
              text={"BACK"}
              customTheme="text-white font-button text-[25px]"
          />
      </Button>
  </div>
        
        <Footer/>
    </div>
    )

}
export default {
  routeProps: {
    path: "/addMovie",
    main: AddMoviePage,
  },
};