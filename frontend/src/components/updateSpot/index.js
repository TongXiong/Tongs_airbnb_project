import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { createForm, retrieveSpots } from "../../store/spotreducer"
import { NavLink, Route } from "react-router-dom"
import { useHistory, useParams} from "react-router-dom"
import { updateSpotForm } from "../../store/spotreducer"
import { oneSpot } from "../../store/spotreducer"

export const UpdateSpot = ({spot}) => {

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
    const theSpot = useParams()
    const id = theSpot.spotId
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)
    const [previewImage, setPreviewImage] = useState ("")
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [validErrors, setValidErrors] = useState({})

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(parseInt(e.target.value));

    const [show, setShow] = useState(false)

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

        dispatch(updateSpotForm(payload, id))
        .then(() => {
            setValidErrors("")
            history.push(`/spots/${id}`)
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
                <input
                >
                </input>
                <button type="submit">
                    submit
                </button>
            </form>
        </div>
    )
}

export default UpdateSpot
