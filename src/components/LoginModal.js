import React,{useState,useEffect} from 'react'
import {Field,Formik,Form,ErrorMessage} from "formik"
import * as Yup from "yup"
import 'react-datepicker/dist/react-datepicker.css'
import {auth,db} from "../Firebase"
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Modal from "react-modal"

Modal.setAppElement("#root")
toast.configure()
function fetchUser(value){
  return value;

}
function LoginModal({getUser}) {

  const [isSignedIn,setIsSignedIn]=useState(true)
  const [modalOpen,setModalOpen]=useState(true)
  const initialValues={
    userEmail:'',
    userPassword:'',
    cpassword:'',
  }
  const initialValues2={
    userEmail:'',
    userPassword:'',
  }
  const validationSchema=Yup.object({
    userEmail:Yup.string().email("email is Invalid").required("email is required"),
    userPassword:Yup.string().trim().required("password is required"),
    cpassword:Yup.string().trim().oneOf([Yup.ref("userPassword"),null],"password not matched").required("confirm password is required"),

  })
  const validationSchema2=Yup.object({
    userEmail:Yup.string().trim().required("name is required"),
    userPassword:Yup.string().trim()
                .required("password is required"),

  })

  const onSubmit=(value)=>{
    const {userEmail,userPassword}=value
    if(!isSignedIn){
      auth.createUserWithEmailAndPassword(userEmail,userPassword).then(()=>{
        setModalOpen(false)
        getUser(userEmail)
        sessionStorage.setItem("userEmail",userEmail)
        toast.success("sign up successfully",{position:toast.POSITION.TOP_RIGHT})
      }).catch((err)=>{
        toast.error("sign up not worked sucessfully",{position:toast.POSITION.TOP_RIGHT})
        getUser(null)

        console.log(err)

      })


    }else{
      auth.signInWithEmailAndPassword(userEmail,userPassword).then(()=>{
        setModalOpen(false)
        sessionStorage.setItem("userEmail",userEmail)
        getUser(userEmail)
        toast.success("sign in successfully",{position:toast.POSITION.TOP_RIGHT})
      }).catch((err)=>{
        toast.error("sign in not worked sucessfully",{position:toast.POSITION.TOP_RIGHT})
        getUser()
        console.log(err)
      })
    }
  }
  return(
    <>
      <Modal isOpen={modalOpen}  className="loginModal"  shouldCloseOverlay={false}
        onRequestClose={()=>setModalOpen(false)}
        style={{overlay:{backgroundColor:"grey"}}}


      >
        <Formik

           initialValues={isSignedIn?initialValues2:initialValues}
           validationSchema={isSignedIn?validationSchema2:validationSchema}
           onSubmit={onSubmit}
          validateOnMount
          >
              {
                formik=>{
                    return(

                      <Form>
                        <div className="form-group mt-4">
                          <label htmlFor="userName">Email Id</label>
                          <Field type="email" name="userEmail" className="form-control"/>
                          <ErrorMessage name="userEmail"> {
                            error=>{
                              return <span className="text-danger">{error}</span>
                            }
                          }
                          </ErrorMessage>
                        </div>
                        <div className="form-group mt-4">
                          <label htmlFor="userPassword">Password</label>
                          <Field type="password" name="userPassword" className="form-control"/>
                          <ErrorMessage name="userPassword">{
                            error=>{
                              return <span className="text-danger">{error}</span>
                            }
                          }
                          </ErrorMessage>
                      </div>
                      {
                        isSignedIn ||
                        <div>
                          <label htmlFor="cpassword">Confirm Password</label>
                          <Field type="password" name="cpassword" className="form-control"/>
                          <ErrorMessage name="cpassword">{
                            error=>{
                              return <span className="text-danger">{error}</span>
                            }
                          }
                          </ErrorMessage>
                      </div>

                      }
                    <input type="submit"  className="btn btn-primary form-control mt-4" value={isSignedIn?"Sign up":"Sign in" }/>


                    {
                      isSignedIn ?
                      <p  className="mt-2 text-center">Are you already Sign Up ?  <span style={{cursor:"pointer"}} className="ml-2" onClick={()=>setIsSignedIn(false)}>Sign In here</span></p>
                      :
                      <p  className="mt-2 text-center ">Have not Signed In?<span style={{cursor:"pointer"}} onClick={()=>setIsSignedIn(true)}>Sign up here</span></p>
                    }
                  </Form>


                )
              }
            }
        </Formik>
        </Modal>
        </>
      )

}

export default LoginModal
