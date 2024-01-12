import React, { useEffect, useState } from 'react'
import "./fetch.scss"
import { Link } from 'react-router-dom'
function Fetchsection() {
    const [service, setService] = useState([])
    const [sorted, setSorted] = useState(null)
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetch("http://localhost:8000/")
            .then(res => res.json())
            .then(data => {
                setService(data)
            })
    }, [])

    const handlesorted = (property, asc) => {
        setSorted({ property, asc })
    }



    return (
        <div>
            <div id="fetch">
                <div className="container">
                    <div className="functions">
                        <input type="text" onChange={(e) => setSearch(e.target.value)} />
                        <button onClick={() => handlesorted("name", true)}>a-z</button>
                        <button onClick={() => handlesorted("name", false)}>z-a</button>
                        <button onClick={() => setSorted(null)}>Default</button>
                    </div>

                    {
                        service
                            .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
                            .sort((a, b) => {
                                if (sorted && sorted.asc) {
                                    return a[sorted.property].toLowerCase() < b[sorted.property].toLowerCase()
                                        ? a[sorted.property].toLowerCase() < b[sorted.property].toLowerCase()
                                            ? -1 : 1 : 0

                                }
                                else if (sorted && sorted.asc === false) {
                                    return a[sorted.property].toLowerCase() > b[sorted.property].toLowerCase()
                                        ? a[sorted.property].toLowerCase() > b[sorted.property].toLowerCase()
                                            ? -1 : 1 : 0

                                }
                                else {
                                    return 0
                                }
                            })
                            .map((x) => (
                                <div className="card">
                                    <ul key={x.id}>
                                        <i className={x.icon}></i>
                                        <li>{x.name}</li>
                                        <p>{x.description}</p>
                                        <Link to={`/detail/${x._id}`}><button>Go to detail</button></Link>
                                    </ul>
                                </div>
                            ))
                    }

                </div>
            </div>
        </div>
    )
}

export default Fetchsection