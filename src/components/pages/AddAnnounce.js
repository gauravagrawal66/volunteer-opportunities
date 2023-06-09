import React, { useRef, useState, useEffect } from "react";
import { BsXCircle } from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";
import { Country, State, City } from "country-state-city";
import Input from "../Input";
import SuccessModal from "../SuccessModal";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useHistory } from "react-router-dom";

function AddAnnounce() {
  const { currentUser, userData, getData } = useAuth();

  const history = useHistory();

  const [error, setError] = useState("");
  const [difficultyError, setDifficultyError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const [addSuccess, setAddSuccess] = useState(false);
  const [useSameAddress, setUseSameAddress] = useState(true);

  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [currentCountry, setCountry] = useState([]);
  const [currentState, setState] = useState([]);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const imgRef = useRef(null);
  const dobRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const descRef = useRef(null);
  const categoryRef = useRef(null);
  const difficultyRef = useRef(null);
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const streetRef = useRef(null);
  const streetNumberRef = useRef(null);
  const buildingRef = useRef(null);
  const apartmentRef = useRef(null);
  const zipcodeRef = useRef(null);

  const defaultMessage =
    "Hi. I need your help. I cannot write about what I need but this announce contains the category and difficulty of the task. It can be connected with me by message or call. Thank you very much!";

  const showStates = () => {
    setStates([]);
    setCities([]);
    setStates(State.getStatesOfCountry(countryRef.current.value));
  };

  const showCities = () => {
    setCities([]);
    setCities(City.getCitiesOfState(countryRef.current.value, stateRef.current.value));
  };

  useEffect(() => {
    if (!userData) getData(currentUser.uid);

    setStates([]);
    setCities([]);
    setStates(State.getStatesOfCountry(countryRef.current.value));
    setCities(City.getCitiesOfState(countryRef.current.value, stateRef.current.value));

    setCountry(Country.getCountryByCode(userData.country));
    setState(State.getStateByCodeAndCountry(userData.state, userData.country));
  }, [currentUser.uid, userData, getData]);

  const db = firebase.firestore();
  const announcesDB = db.collection("announces");

  const validate = () => {
    if (categoryRef.current.value === "select" && difficultyRef.current.value === "select") {
      setDifficultyError("You have to provide a category for the announcement.");
      setCategoryError("You have to provide a difficulty for the announcement.");
      imgRef.current.scrollIntoView({ behavior: "smooth" });
      return 0;
    } else if (difficultyRef.current.value === "select") {
      setDifficultyError("You have to provide a difficulty for the announcement.");
      imgRef.current.scrollIntoView({ behavior: "smooth" });
      return 0;
    } else if (categoryRef.current.value === "select") {
      setCategoryError("You have to provide a category for the announcement.");
      imgRef.current.scrollIntoView({ behavior: "smooth" });
      return 0;
    }
    return 1;
  };

  const handleChangeCategory = () => {
    setCategoryError("");
  };

  const handleChangeDifficulty = () => {
    setDifficultyError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() === 1) {
      let desc = descRef.current.value;
      if (desc === "") desc = defaultMessage;
      let amountOfPoints = 0;
      switch (categoryRef.current.value) {
        case "Groceries":
          switch (difficultyRef.current.value) {
            case "0":
              amountOfPoints = 10;
              break;
            case "1":
              amountOfPoints = 25;
              break;
            case "2":
              amountOfPoints = 40;
              break;
            default:
              break;
          }
          break;
        case "School meditations":
          switch (difficultyRef.current.value) {
            case "0":
              amountOfPoints = 40;
              break;
            case "1":
              amountOfPoints = 50;
              break;
            case "2":
              amountOfPoints = 60;
              break;
            default:
              break;
          }
          break;
        case "Shopping":
          switch (difficultyRef.current.value) {
            case "0":
              amountOfPoints = 10;
              break;
            case "1":
              amountOfPoints = 25;
              break;
            case "2":
              amountOfPoints = 40;
              break;
            default:
              break;
          }
          break;
        case "Cleaning":
          switch (difficultyRef.current.value) {
            case "0":
              amountOfPoints = 20;
              break;
            case "1":
              amountOfPoints = 35;
              break;
            case "2":
              amountOfPoints = 50;
              break;
            default:
              break;
          }
          break;
        case "Walking":
          switch (difficultyRef.current.value) {
            case "0":
              amountOfPoints = 15;
              break;
            case "1":
              amountOfPoints = 30;
              break;
            case "2":
              amountOfPoints = 45;
              break;
            default:
              break;
          }
          break;
        case "Cooking":
          switch (difficultyRef.current.value) {
            case "0":
              amountOfPoints = 25;
              break;
            case "1":
              amountOfPoints = 45;
              break;
            case "2":
              amountOfPoints = 60;
              break;
            default:
              break;
          }
          break;
        case "Paying of bills":
          switch (difficultyRef.current.value) {
            case "0":
              amountOfPoints = 15;
              break;
            case "1":
              amountOfPoints = 20;
              break;
            case "2":
              amountOfPoints = 30;
              break;
            default:
              break;
          }
          break;
        case "Emotional support":
          switch (difficultyRef.current.value) {
            case "0":
              amountOfPoints = 20;
              break;
            case "1":
              amountOfPoints = 40;
              break;
            case "2":
              amountOfPoints = 60;
              break;
            default:
              break;
          }
          break;
        case "Physical labour":
          switch (difficultyRef.current.value) {
            case "0":
              amountOfPoints = 40;
              break;
            case "1":
              amountOfPoints = 60;
              break;
            case "2":
              amountOfPoints = 80;
              break;
            default:
              break;
          }
          break;
        case "Hard work":
          switch (difficultyRef.current.value) {
            case "0":
              amountOfPoints = 40;
              break;
            case "1":
              amountOfPoints = 60;
              break;
            case "2":
              amountOfPoints = 80;
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
      announcesDB
        .add({
          uid: currentUser.uid,
          name: nameRef.current.value,
          dateOfBirth: dobRef.current.value,
          description: desc,
          category: categoryRef.current.value,
          difficulty: difficultyRef.current.value,
          email: emailRef.current.value,
          phone: phoneNumberRef.current.value,
          country: countryRef.current.value,
          state: stateRef.current.value,
          city: cityRef.current.value,
          street: streetRef.current.value,
          streetNumber: streetNumberRef.current.value,
          building: buildingRef.current.value,
          apartment: apartmentRef.current.value,
          zipcode: zipcodeRef.current.value,
          imgURL: imgRef.current.src,
          posted: firebase.firestore.FieldValue.serverTimestamp(),
          status: "active",
          helpedBy: "",
          points: amountOfPoints,
        })
        .catch((error) => setError("The announcement could not be posted"));
      setAddSuccess(true);
    } else setAddSuccess(false);
  };

  const pullData = (state) => {
    history.push("/announces");
  };

  const handleCheckbox = () => {
    setUseSameAddress(!useSameAddress);
  };

  const DefaultData = () => {
    return (
      <div className="secondary--information" style={{ display: "none" }}>
        <Input type="email" name="Email" ref={emailRef} icon="email" value={currentUser.email} />
        <Input type="tel" name="Phone number" ref={phoneNumberRef} icon="phone" value={"+40774653200"} />
        <div className="input--field">
          <div className="input--content">
            <div className="input--label">Country</div>
            <select ref={countryRef} onChange={showStates}> 
              <option value={userData.country} style={{backgroundColor:'gray'}}  key={userData.country}>
                {currentCountry.name}
              </option>
              {countries.map((country) => {
                return (
                  <option value={country.isoCode} key={country.isoCode}>
                    {country.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="input--field">
          <div className="input--content">
            <div className="input--label">State</div>
            <select ref={stateRef} onChange={showCities}>
              <option value={userData.state} key={userData.state}>
                {currentState.name}
              </option>
              {states.map((state) => {
                return (
                  <option value={state.isoCode} key={state.isoCode}>
                    {state.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="input--field">
          <div className="input--content">
            <div className="input--label">City</div>
            <select ref={cityRef}>
              <option value={userData.city} key={userData.city}>
                {userData.city}
              </option>
              {cities.map((city) => {
                return (
                  <option value={city.isoCode} key={city.isoCode}>
                    {city.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <Input type="text" name="Street" ref={streetRef} icon="address" value={userData.street} />
        <Input type="number" name="Street Number" ref={streetNumberRef} icon="address" value={userData.streetNumber} />
        <Input type="text" name="Building" ref={buildingRef} icon="address" value={userData.building} />
        <Input type="number" name="Apartment" ref={apartmentRef} icon="address" value={userData.apartment} />
        <Input type="number" name="Zipcode" ref={zipcodeRef} icon="address" value={userData.zipcode} />
      </div>
    );
  };

  const EmptyData = () => {
    return (
      <div className="secondary--information">
        <Input type="email" name="Email" ref={emailRef} icon="email" value="" />
        <Input type="tel" name="Phone number" ref={phoneNumberRef} icon="phone" value="" />
        <div className="input--field">
          <div className="input--content">
            <div className="input--label">Country</div>
            <select ref={countryRef} onChange={showStates}>
              <option value="select">Select country</option>
              {countries.map((country) => {
                return (
                  <option className="countryValue" value={country.isoCode} key={country.isoCode}>
                    {country.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="input--field">
          <div className="input--content">
            <div className="input--label">State</div>
            <select ref={stateRef} onChange={showCities}>
              <option value="select">Select state</option>
              {states.map((state) => {
                return (
                  <option value={state.isoCode} key={state.isoCode}>
                    {state.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="input--field">
          <div className="input--content">
            <div className="input--label">City</div>
            <select ref={cityRef}>
              <option value="select">Select city</option>
              {cities.map((city) => {
                return (
                  <option value={city.isoCode} key={city.isoCode}>
                    {city.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <Input type="text" name="Street" ref={streetRef} icon="address" value="" />
        <Input type="number" name="Street Number" ref={streetNumberRef} icon="address" value="" />
        <Input type="text" name="Building" ref={buildingRef} icon="address" value="" />
        <Input type="number" name="Apartment" ref={apartmentRef} icon="address" value="" />
        <Input type="number" name="Zipcode" ref={zipcodeRef} icon="address" value="" />
      </div>
    );
  };

  return (
    <div className="announce--page">
      <div className="header" onClick={history.goBack}>
        <button>
          <BsXCircle />
        </button>
        Close this windows
      </div>
      <form className="page--content" onSubmit={handleSubmit}>
        <div className="main--information">
          <img src={currentUser.photoURL} alt="User" ref={imgRef} />
          <div className="personal--data">
            <Input name="Name" ref={nameRef} icon="" value={currentUser.displayName} />
            <Input name="Date of birth" ref={dobRef} icon="" value="02.03.2004" />
          </div>
        </div>
        {categoryError && (
          <div className="error--message secondary" role="alert">
            {categoryError}
          </div>
        )}
        <div className="input--field">
          <div className="input--content">
            <div className="input--label">Category</div>
            <select ref={categoryRef} onChange={handleChangeCategory}>
              <option value="select">Select category</option>
              <option value="Groceries">Groceries</option>
              <option value="School meditations">School meditations</option>
              <option value="Shopping">Shopping</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Walking">Walking</option>
              <option value="Cooking">Cooking</option>
              <option value="Paying of bills">Paying of bills</option>
              <option value="Emotional support">Emotional support</option>
              <option value="Physical labour">Physical labour</option>
              <option value="Hard work">Hard work</option>
            </select>
          </div>
        </div>
        {difficultyError && (
          <div className="error--message secondary" role="alert">
            {difficultyError}
          </div>
        )}
        <div className="input--field">
          <div className="input--content">
            <div className="input--label">Difficulty</div>
            <select ref={difficultyRef} onChange={handleChangeDifficulty}>
              <option value="select">Select difficulty</option>
              <option value="0">Easy</option>
              <option value="1">Medium</option>
              <option value="2">Hard</option>
            </select>
          </div>
        </div>
        <div className="input--field">
          <div className="input--content">
            <div className="input--label">Description</div>
            <textarea ref={descRef} cols="30" rows="8"></textarea>
          </div>
        </div>
        <div className="input--field checkbox">
          <input type="checkbox" id="sameAddress" onChange={handleCheckbox} defaultChecked={useSameAddress} />
          <label htmlFor="sameAddress">Use the same address and contact information as those in your account</label>
        </div>
        {useSameAddress ? <DefaultData /> : <EmptyData />}
        {error && (
          <div className="error--message" role="alert">
            {error}
          </div>
        )}
        <input type="submit" className="add--announce" value="Post announce" />
      </form>
      {addSuccess && <SuccessModal state={pullData} title="Your announcement has been posted successfully!" sec="3" />}
    </div>
  );
}

const forwardedAddAnnounce = React.forwardRef(AddAnnounce);

export default forwardedAddAnnounce;
