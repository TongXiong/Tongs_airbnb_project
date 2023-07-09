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
        if (state.spot) {
            return state.spot
        } else {
            return null
        }
    })

    const fileTypes = (url) => {
        url = `${url}`;
        if (url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith("jpeg")) {
            return true;
        } else {
            return false;
        }
      };

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
    const [clientsideErrors, setclientsideErrors] = useState({})
    const [validErrors, setValidErrors] = useState({})
    const [previewImage, setPreviewImage] = useState ("")
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(parseInt(e.target.value));
    const updatePreview = (e) => setPreviewImage(e.target.value)
    const updateImage1 = (e) => setImage1(e.target.value)
    const updateImage2 = (e) => setImage2(e.target.value)
    const updateImage3 = (e) => setImage3(e.target.value)
    const updateImage4 = (e) => setImage4(e.target.value)
    const [show, setShow] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const errors = {}

    if (!previewImage.length) {
        errors.previewImage = "Preview image is required";
    }
    if (image1 && !fileTypes(image1)) {
        errors.image1 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (image2 && !fileTypes(image2)) {
        errors.image2 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (image3 && !fileTypes(image3)) {
        errors.image3 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (image4 && !fileTypes(image4)) {
        errors.image4 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    setclientsideErrors(errors)

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

        const images = [
            {
                preview: true,
                url: previewImage,
            }
        ]

        if (image1) {
            images.push({preview: false, url: image1})
        }
        if (image2) {
            images.push({preview: false, url: image2})
        }
        if (image3) {
            images.push({preview: false, url: image3})
        }
        if (image4) {
            images.push({preview: false, url: image4})
        }


            dispatch(createForm(payload, images[0]))
            .then(() => {
                setValidErrors("")
                history.push('/')
            })
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
                <div id="infocontainer">
                Preview Image URL
                    <div className="createspoterror">
                <p>
                    {clientsideErrors.previewImage && ` ${clientsideErrors.previewImage}`}
                    </p>
                    </div>
                </div>
                <input
                className="image-inputs"
                type="url"
                placeholder="Preview Image URL"
                value={previewImage}
                onChange={updatePreview}
                >
                </input>
                <div id="infocontainer">
                    Image Url
                    <div className="createspoterror">
                <p>
                    {clientsideErrors.image1 && ` ${clientsideErrors.image1}`}
                    </p>
                    </div>
                </div>
                <input
                className="image-inputs"
                type="url"
                placeholder="Image URL"
                value={image1}
                onChange={updateImage1}
                >
                </input>
                <div id="infocontainer">
                    Image Url
                    <div className="createspoterror">
                <p>
                    {clientsideErrors.image2 && ` ${clientsideErrors.image2}`}
                    </p>
                    </div>
                </div>
                <input
                className="image-inputs"
                type="url"
                placeholder="Image URL"
                value={image2}
                onChange={updateImage2}
                >
                </input>
                <div id="infocontainer">
                    Image Url
                    <div className="createspoterror">
                <p>
                    {clientsideErrors.image3 && ` ${clientsideErrors.image3}`}
                    </p>
                    </div>
                </div>
                <input
                className="image-inputs"
                type="url"
                placeholder="Image URL"
                value={image3}
                onChange={updateImage3}
                >
                </input>
                <div id="infocontainer">
                    Image Url
                    <div className="createspoterror">
                <p>
                    {clientsideErrors.image4 && ` ${clientsideErrors.image4}`}
                    </p>
                    </div>
                </div>
                <input
                className="image-inputs"
                type="url"
                placeholder="Image URL"
                value={image4}
                onChange={updateImage4}
                >
                </input>

                <button type="submit"
                // disabled={!address || !city || !state || !country || !price || !description}
                >
                    submit
                </button>
            </form>
        </div>
    )
}

export default NewSpot
