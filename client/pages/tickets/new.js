import {useState} from 'react'
import useRequest from '../../hooks/use-request'
import Router from 'next/router'
const NewTicket = () => {
    const [price, setPrice] = useState('')
    const [title, setTitle] = useState('')
    const onBlur = () => {
        const value = parseFloat(price)
        if(isNaN(value)) {
            return;
        }
        setPrice(value.toFixed(2))
    }
     const {doRequest, errors} = useRequest({
            url: '/api/tickets',
            method: 'post',
            body: {
                title, price
            },
            onSuccess: () => {
               Router.push('/')
            }
    })
    const createTicket = async (event) => {
        event.preventDefault()
       await doRequest()
    }
    return(
        <div>
            <h4>Create new ticket</h4>
        <form onSubmit={createTicket}>
        <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text"
         className="form-control" 
         id="title"
        placeholder="Example title"
        value= {title}
        onChange= {(e) => setTitle(e.target.value)}
        />
        </div>
        <div className="mb-3">
        <label htmlFor="price" className="form-label">Price</label>
        <input
        type="text"
        className="form-control"
        id="price"
        placeholder="$$"
        value= {price}
        onBlur={onBlur}
        onChange= {(e) => setPrice(e.target.value)}
        />
        </div>
        {errors}
        <button className='btn btn-primary' type='submit'>Create ticket</button>
        </form>
        </div>
    )
}

export default NewTicket;