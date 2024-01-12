import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./detail.scss"
import { Helmet } from 'react-helmet';

function Detail() {
    const { id } = useParams();
    const [service, setService] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/${id}`)
            .then(res => res.json())
            .then(data => {
                setService(data)
            })
    }, [])


    return (
        <div>
            <Helmet><title>Detail</title></Helmet>
            <div id="detail">
                <div className="card">
                    <ul >
                        <i className={service.icon}></i>
                        <li>{service.name}</li>
                        <p>{service.description}</p>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Detail