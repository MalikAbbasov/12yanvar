import React, { useEffect, useState } from 'react'
import "./add.scss"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


function Addpage() {
    const [service, setService] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/")
            .then(res => res.json())
            .then(data => {
                setService(data)
            })
    }, [])

    async function getServices() {
        const data = await fetch("http://localhost:8000/")
        const res = await data.json()
        setService(res)
    }
    async function delService(id) {
        await fetch("http://localhost:8000/" + id, { method: 'DELETE' })
        await getServices()
    }

    async function handleSubmit(item) {
            await fetch("http://localhost:8000", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })
        await getServices()
    }

    




    return (
        <div id='add'>
            <div className="container">
                <h2>Add Your Service</h2>
                <Formik
                    initialValues={{ icon: '', name: '', description: '' }}
                    validationSchema={Yup.object({
                        icon: Yup.string()
                            .max(55, 'Must be 25 characters or less')
                            .required('Required'),
                        name: Yup.string()
                            .max(30, 'Must be 18 characters or less')
                            .required('Required'),
                        description: Yup.string()
                            .max(10000, 'Must be 100 characters or less')
                            .required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting ,resetForm}) => {
                        setTimeout(() => {
                            handleSubmit(values)
                            setSubmitting(false);
                            resetForm();
                        }, 400);
                    }}
                >
                    <Form >
                        <h3>Fill the Forum</h3>
                        <label htmlFor="icon" >Icon</label>
                        <Field name="icon" type="text" />
                        <ErrorMessage name="icon" />

                        <label htmlFor="name">Name</label>
                        <Field name="name" type="text" />
                        <ErrorMessage name="name" />

                        <label htmlFor="description">Description</label>
                        <Field name="description" type="text"  />
                        <ErrorMessage name="description" />

                        <button type="submit">Submit</button>
                    </Form>
                </Formik>

                <div className="fetch">
                    {
                        service.map((x) => (
                            <div className="card">
                                <ul key={x.id}>
                                    <i className={x.icon}></i>
                                    <li>{x.name}</li>
                                    <p>{x.description}</p>
                                    <button onClick={() => delService(x._id)}>Delete</button>
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Addpage