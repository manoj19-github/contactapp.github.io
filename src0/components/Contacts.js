import React,{useState,useEffect,useContext} from 'react'
import {Container,Row,Col} from "react-bootstrap"
import Contactforms from "./Contactforms"
import "./_contacts.css"
import LoginModal from "./LoginModal"
import {db} from "../Firebase"
import {FaEdit} from "react-icons/fa"
import {AiFillDelete} from "react-icons/ai"
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
toast.configure()
function Contacts() {
  const [user,setUser]=useState(sessionStorage.getItem("userEmail")?sessionStorage.getItem("userEmail"):null)
  const [currentId,setCurrentId]=useState('')
  const myuser=(value)=>{
    setUser(value);
  }

  const [showModal,setShowModal]=useState(false)
  const [contentObject,setContentObject]=useState(false)

  useEffect(()=>{
    db.child("contacts").on("value",snapshot=>{
      if(snapshot.val()!=null){
        setContentObject({...snapshot.val()})
      }
    })

  },[])
  const deleteData=(currentId)=>{
    if(currentId){
      db.child(`contacts/${currentId}`).remove(error=>{
        if(error){
          console.log(error)
          toast.error("data not deleted successfully",{position:toast.POSITION.TOP_RIGHT})
        }else{
          toast.warn("data deleted successfully",{position:toast.POSITION.TOP_RIGHT})

        }
      })
    }

  }
  useEffect(()=>{
    user || setShowModal(true)

  },[user,showModal])
  useEffect(()=>{

  })
  return (

    <Container fluid>
      {showModal?<LoginModal className="loginModal" getUser={myuser}/>:null}

    <Row>
      <Col lg={4} className="forms">
        <Contactforms {...({contentObject,currentId,setCurrentId})}/>

      </Col>
      <Col lg={8}>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
            <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {

                Object.keys(contentObject).map(id=>{
                  return(
                    <>
                      <tr>
                        <td>{contentObject[id].name}</td>
                        <td>{contentObject[id].phone}</td>
                        <td>{contentObject[id].email}</td>
                        <td>{contentObject[id].address}</td>
                      <td><button className="btn btn-warning" onClick={()=>{setCurrentId(id)}}><FaEdit size={20} style={{backgroundColor:"yellow",cursor:"pointer"}}/></button></td>
                    <td><button className="btn btn-danger" onClick={()=>{deleteData(id)}}><AiFillDelete size={20} style={{backgroundColor:"red",cursor:"pointer"}}/></button></td>
                      </tr>
                    </>
                  )
                })
              }


          </tbody>

        </table>

      </Col>
    </Row>
    </Container>

  )
}

export default Contacts
