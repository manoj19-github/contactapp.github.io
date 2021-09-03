import React,{useState,useEffect} from 'react'
import {Field,Formik,Form,ErrorMessage} from "formik"
import * as Yup from "yup"
import {db} from "../Firebase"
import {Container} from "react-bootstrap"
import 'react-datepicker/dist/react-datepicker.css'
import DateView from "react-datepicker"
import "./_contacts.css"
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
toast.configure()
function Contactforms({contentObject,currentId,setCurrentId}) {

  const [mydata,setMydata]=useState(null)
  const [formdata,setFormdata]=useState({
    name:'',
    email:'',
    phone:'',
    address:''
  })
  useEffect(()=>{
    if(currentId!="" && contentObject){
      setFormdata({...contentObject[currentId]})


    }

  },[currentId,contentObject])

  const validationSchema=Yup.object({
    name:Yup.string().required("name is required"),
    email:Yup.string().required("email is required"),
    phone:Yup.number().typeError("that does'nt like a phone number").positive("A phone number must be positive ")
              .integer("A phone number can't take decimal point").required("Phone number is required"),
    address:Yup.string().required("address is required"),

  })
  const onSubmit=(value,onSubmitProps)=>{
    if(currentId){
      db.child(`contacts/${currentId}`).set(value,error=>{
        if(error){
          console.log(error)
        }else{
          onSubmitProps.resetForm(true)
          toast.warn("data updated successfully",{position:toast.POSITION.TOP_RIGHT})
          setCurrentId('')


        }
      })
    }else{
      db.child("contacts").push(value,error=>{
        if(error){
          console.log(error)
        }
        onSubmitProps.resetForm(true)
        toast.success("data inserted successfully",{position:toast.POSITION.TOP_RIGHT})

      })

    }

  }
  const deleteData=(currentId)=>{
    if(currentId){
      db.child(`contacts/${currentId}`).remove(error=>{
        if(error){
          console.log(error)
        }else{
          toast.success("data inserted successfully",{position:toast.POSITION.TOP_RIGHT})

        }
      })
    }

  }
  return (
    <Container fluid className="mt">
      <Formik
        initialValues={mydata||formdata}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize

      >
      {
        formik=>{
          console.log("formik",formik)
          return(
            <Form autoComplete="off" className="myforms">
              <div className="mt-2 form-group">
                <label>Name</label>
                <Field name="name" type="text" id="name" className="form-control"/>
                <ErrorMessage  name="name">
                {
                  error=>{
                    return <span className="text-danger">{error}</span>
                  }
                }
                </ErrorMessage>

              </div>
              <div className="mt-2 form-group">
                <label>Email</label>
                <Field name="email" id="email" type="email" className="form-control"/>
                <ErrorMessage name="email" >
                {
                  error=>{
                    return <span className="text-danger">{error}</span>
                  }
                }
                </ErrorMessage>

              </div>
              <div className="mt-2 form-group">
                <label>Phone</label>
              <Field name="phone" id="phone" type="text" className="form-control"/>
                <ErrorMessage  name="phone">
                {
                  error=>{
                    return <span className="text-danger">{error}</span>
                  }
                }
                </ErrorMessage>

              </div>


              <div className="mt-2 form-group">
                <label>Permanent Address</label>
                <Field as="textarea"  name="address"  className="form-control"/>
                <ErrorMessage  name="address">
                {
                  error=>{
                    return <span className="text-danger">{error}</span>
                  }
                }
                </ErrorMessage>
              </div>
              <input type="submit" name="submit" value="submit" className="form-control mt-3 btn btn-primary"/>

            </Form>

          )
        }
      }


      </Formik>
    </Container>

  )
}

export default Contactforms
