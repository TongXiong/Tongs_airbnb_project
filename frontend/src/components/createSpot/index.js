import { useDispatch, useSelector } from "react-redux"
import React, { useState, useEffect, useRef } from "react";
import { NavLink, Route } from "react-router-dom"
import { useHistory} from "react-router-dom"
import { restoreUser } from "../../store/session";
import * as sessionActions from '../../store/session';
import { createForm } from "../../store/spotreducer";
import { createImage } from "../../store/spotreducer";
import "./form.css"

export const NewSpot = () => {

    const newSpot = useSelector((state) => {
        if (state.spots) {
            return state.spots
        } else {
            return null;
        }
    })

        const ulRef = useRef();

        const dispatch = useDispatch()
        const history = useHistory()

    const [address, setAddress] = useState("");
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [name, setName] = useState('');
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState()
    const [validErrors, setValidErrors] = useState({})
    const [image, setImage] = useState("")

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(parseInt(e.target.value));
    const updateImage = (e) => setImage(e.target.value)

    const [show, setShow] = useState(false)

    const user = useSelector((state) => {
        if (state.session) {
            return state.session
        } else {
            return null;
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            address,
            city,
            state,
            country,
            name,
            lat: 10,
            lng: 10,
            description,
            price,
        }

        dispatch(createForm(payload))
            .catch(async (res) => {
              const data = await res.json();
              if (data.errors) {
                setValidErrors(data.errors);
              }
            });
        }

      const ulClassName = "createform" + (show ? "" : " hidden")

    return (
        <div>
            <form className="create-spot-form" onSubmit={handleSubmit}>
                <div id="infocontainer">
                Address
                    <div className="createspoterror">
                <p>
                    {validErrors.address && ` ${validErrors.address}`}
                    </p>
                    </div>
                </div>
                <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={updateAddress}
                >
                </input>
                <div id="infocontainer">
                City
                    <div className="createspoterror">
                <p>
                    {validErrors.city && ` ${validErrors.city}`}
                    </p>
                    </div>
                </div>
                <input
                type="text"
                placeholder="City"
                value={city}
                onChange={updateCity}
                >
                </input>
                <div id="infocontainer">
                State
                    <div className="createspoterror">
                <p>
                    {validErrors.state && ` ${validErrors.state}`}
                    </p>
                    </div>
                </div>
                <input
                type="text"
                placeholder="State"
                value={state}
                onChange={updateState}
                >
                </input>
                <div id="infocontainer">
                Country
                    <div className="createspoterror">
                <p>
                    {validErrors.country && ` ${validErrors.country}`}
                    </p>
                    </div>
                </div>
                <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={updateCountry}
                >
                </input>
                <div id="infocontainer">
                Description
                    <div className="createspoterror">
                <p>
                    {validErrors.description && ` ${validErrors.description}`}
                    </p>
                    </div>
                </div>
                <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={updateDescription}
                >
                </input>
                <div id="infocontainer">
                Name
                    <div className="createspoterror">
                <p>
                    {validErrors.name && ` ${validErrors.address}`}
                    </p>
                    </div>
                </div>
                <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={updateName}
                >
                </input>
                <div id="infocontainer">
                Price
                    <div className="createspoterror">
                <p>
                    {validErrors.price && ` ${validErrors.price}`}
                    </p>
                    </div>
                </div>
                <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={updatePrice}
                >
                </input>
                <input
                 type="text" onChange={updateImage}
                value={image}
                >
                </input>
                <button type="submit">
                    submit
                </button>
            </form>
        </div>
    )
}

export default NewSpot
