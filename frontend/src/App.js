import { useEffect, useState } from 'react';
import { Button, Divider, Input,List,Modal, Typography } from 'antd';
import axios from "axios"

function App() {
  const [value, setValue] = useState("")
  const [addModelOpen,setAddModelOpen]=useState(false)
  const [edit,setEdit]=useState(false)
  const [name, setName] = useState("")
  const [des, setDescription] = useState("")
  const [ingred ,setIngred]=useState("")
  const [instruc, setInstruc]=useState("")

  const [recipies,setRecipies]=useState([])
  useEffect(() => {
      axios.get("http://localhost:4000/getrecipies").then(
        res => {return setRecipies(res.data.recipies)
        }
      )
  }, [])
  
  const searchRecipies =(event) =>{
      setValue(event.target.value)
      if(event.target.value){
        axios.get("http://localhost:4000/getrecipie/"+event.target.value)
        .then(
          res => {return setRecipies(res.data.recipies)}
        )
      }
      else{
        axios.get("http://localhost:4000/getrecipies").then(
          res => {return setRecipies(res.data.recipies)
          }
        )  
      }
  }
  const handleAddRecipie= async () =>{
    setAddModelOpen(false)
    setName("")
    setDescription("")
    setIngred("")
    setInstruc("")
    await axios.post("http://localhost:4000/addrecipie",
    {     
        name:name,
        des:des,
        ingred:ingred,
        instruc:instruc
    }
    )
    await axios.get("http://localhost:4000/getRecipies").then(
      res => {return setRecipies(res.data.recipies)
      }
    )
  }

  const deleterecipie= async (id) =>{
    await axios.post(`http://localhost:4000//deleterecipie/${id}`)
    await axios.get("http://localhost:4000/getrecipies").then(
      res => {return setRecipies(res.data.recipie)
      }
    )
  }

  const updateRecipie = async (id) =>{
    setAddModelOpen(true)

  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="App">
      <br />
      <br />
      <center><h1>Recipe Application</h1></center>
      
        <div className="Navbar" style={{minWidth:"200px",display:"flex",justifyContent:"space-between"}}>
          <h2 style={{margin:"15px"}}> Search Recipe</h2>
        <div style={{margin:"15px",minWidth:"500px",marginLeft:"-500px"}}>
        <Input type="text" name="search" value={value} onChange={searchRecipies}/>
        </div>
        <div style={{margin:"15px"}}>
          <Button type="primary" onClick={() => setAddModelOpen(true)}>Add</Button>      
        </div>
        </div>

      <>
        <Modal
          title="Add Recipe"
          style={{ top: 20 }}
          visible={addModelOpen}
          onOk={() => handleAddRecipie()}
          onCancel={() => setAddModelOpen(false)}
        >
          <label>Name </label>
          <Input placeholder='Enter Name' value={name} onChange={(e)=> setName(e.target.value) }/> 
          <label>Description </label>
          <Input placeholder='Enter des' value={des} onChange={(e)=> setDescription(e.target.value) }/> 
          <label>Ingredients</label>
          <Input placeholder='Enter Ingred' value={ingred} onChange={(e)=> setIngred(e.target.value) }/>  
          <label>Instructions</label>
          <Input placeholder='Enter Instructions' value={instruc} onChange={(e)=> setInstruc(e.target.value) }/>
          <input type='file' placeholder='upload image'/>
        </Modal>
      </>
      <>
        <Modal
          title="Edit Recipe"
          style={{ top: 20 }}
          visible={edit}
          onOk={() => setEdit(false)}
          onCancel={() => setEdit(false)}
        >
          <label>Name </label>
          <Input placeholder='Enter Name' value={name} onChange={(e)=> setName(e.target.value) }/> 
          <label>Description</label>
          <Input placeholder='Enter Description' value={des} onChange={(e)=> setDescription(e.target.value) }/> 
          <label>ingredients</label>
          <Input placeholder='Enter Ingred' value={ingred} onChange={(e)=> setIngred(e.target.value) }/>
          <label>instructions</label>
          <Input placeholder='Enter Instructions' value={instruc} onChange={(e)=> setInstruc(e.target.value) }/>
        </Modal>

      </>

    <>
    <Divider orientation="left"></Divider>
  
    <div className='bookmarked'>
      <ul style={{border:"1px solid gray",borderRadius:"10px",margin:"20px"}}>
        {
          recipies.length > 0 ? recipies.map(itm=> 
            { return <div key={itm._id} style={{padding:"15px",display:"flex",justifyContent:'space-between'}}> 
               <div>
                <h2>{itm.name[0]}</h2>
                <span style={{fontSize:"22px",margin:"8px",paddingRight:"20px" }}> {itm.name}</span> {itm.des}
                <span style={{fontSize:"22px",margin:"8px",paddingRight:"20px" }}> {itm.ingred}</span> {itm.instruc}
               </div>
              <div >
                <Button type="primary" onClick={showModal}>
        Delete
      </Button>
      <Modal title="Delete " visible={isModalVisible} onOk={()=>deleterecipie(itm._id)} onCancel={handleCancel}>
        <h2>Are you sure?</h2>
      </Modal>
              </div>
            </div>}
            ) : ""
        }
      </ul>
      
    </div>

    

    <Divider orientation="left"></Divider>
    
    </>


    </div>
  );
}

export default App;
