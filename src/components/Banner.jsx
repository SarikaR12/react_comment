import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Banner = () => {

    const [data, setdata] = useState([])
    const [user, setuser] = useState({})
    const [view, setview] = useState({})
    const [modal, setmodal] = useState("none")

    // get
    let get_user = async () => {
        let res = await axios.get("http://localhost:3001/users")
        console.log(res);
        setdata(res.data)
    }
    useEffect(() => {
        get_user()
    }, [])

    // post user
    let handle = (e) => {
        setuser({ ...user, [e.target.username]: e.target.value })
    }
    let submit = async (e) => {
        e.preventDefault();
        let res = await axios.post("http://localhost:3001/users", user)
        console.log(res);
        setdata([...data, res.data])
    }

    //delete user
    let remove = async (id) => {
        let res = await axios.delete("http://localhost:3001/users" + `/${id}`)
        console.log(res);

        setdata(data.filter((val) => val.id != id))
    }

    //update
    let update = (val) => {
        setview(val)
        setmodal("block")
    }
    let viewhandle = (e) => {
        setview({ ...view, [e.target.name]: e.target.value })
    }
    let save = async () => {
        let res = await axios.put(`http://localhost:3001/users/${view.id}`, view)
        console.log(res);
        setmodal("none")

        setdata(data.map((val) => val.id == res.data.id ? { ...view } : val))
    }

    return (
        <div>
            <div className="banner">
                <form>
                    <div className="form-data" onSubmit={submit}>
                        <h1>form</h1>
                        <label>username: <input type="text" name='username' onChange={handle} /></label>
                        <label>price: <input type="number" name='price' onChange={handle} /></label>
                        <label>desc: <input type="text" name='desc' onChange={handle} /></label>
                        <button onClick={submit}>submit</button><br /><br /><br />
                    </div>
                </form>
            </div>
            <div className="modal" style={{ display: `${modal}` }}>
                <form>
                    <div className="form-data" onSubmit={submit}>
                        <h1>update</h1>
                        <label>username: <input type="text" name='username' /></label>
                        <label>price: <input type="number" name='price' /></label>
                        <label>desc: <input type="text" name='desc' /></label>
                        <button onClick={save}>save</button>
                    </div>
                </form>
            </div>
            <table border="1px" cellPadding="10px" >
                <thead>
                    <tr>
                        <th>username</th>
                        <th>price</th>
                        <th>desc</th>
                        <th>remove</th>
                        <th>update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((val, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td>{val.username}</td>
                                        <td>{val.price}</td>
                                        <td>{val.desc}</td>
                                        <td><button onClick={() => remove(val.id)} >remove</button></td>
                                        <td><button onClick={() => update(val)}>update</button></td>
                                    </tr>
                                </React.Fragment>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Banner;
