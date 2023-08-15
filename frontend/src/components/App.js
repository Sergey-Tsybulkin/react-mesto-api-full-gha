import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirm from "./PopupWithConfirm";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccessInfoTooltipStatus, setIsSuccess] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); //set original state
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({}); // data profile
  const [cards, setCards] = useState([]);
  const [profileEmail, setProfileEmail] = useState("");
  const [removedCardId, setRemovedCardId] = useState("");
  const history = useHistory();
  const [isAddPhoto, setIsAddPhoto] = useState(false);

  const [isLoadingEditProfilePopup, setIsLoadingEditProfilePopup] = useState(false);
  const [isLoadingEditAvatarPopup, setIsLoadingEditAvatarPopup] = useState(false);
  const [isLoadingPopupWithConfirm, setIsLoadingPopupWithConfirm] = useState(false);
  const [isLoadingAddPlacePopup, setIsLoadingAddPlacePopup] = useState(false);



  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then(res => {
          if (res) {
            setIsLoggedIn(true)
            setProfileEmail(res.email)
          }
          history.push('/')
        })
        .catch(err => {
          console.log(err);
        })
    }
  });

  useEffect(() => {
    if (isLoggedIn) {
      api.getProfile().then((profileInfo) => {
        setCurrentUser(profileInfo)
      })
        .catch((err) => {
          console.log(err);
        })
      api.getInitialCards().then((cardsData) => {
        setCards(cardsData)
      })
        .catch((err) => {
          console.log(err);
        })
      }
  }, [isLoggedIn, isAddPhoto]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipPopupOpen(false);
    setIsConfirmPopupOpen(false);
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoadingEditProfilePopup(true);
    api
      .editProfile(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingEditProfilePopup(false);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoadingEditAvatarPopup(true);
    api
      .setUserAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingEditAvatarPopup(false);
      });
  }

  function handleCardLike(card) {
    // check for existing like
    const isLiked = card.likes.some(i => i === currentUser._id);
    console.log(card.likes)
    // send for API and get renewed card data
    api
      .changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleCardDeleteClick = (cardId) => {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setRemovedCardId(cardId);
  };

  function handleCardDelete(card) {
    setIsLoadingPopupWithConfirm(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();

      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingPopupWithConfirm(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoadingAddPlacePopup(true);
    setIsAddPhoto(true);
    api
      .postCard(data).then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingAddPlacePopup(false);
        setIsAddPhoto(false);
      });
  }

  //user registration
  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsSuccess(true);
          setIsInfoTooltipPopupOpen(true);
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  }

  //user auth
  function handleAuthorize(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          history.push("/");
          setProfileEmail(email);
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  }

  // exit
  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page center">
          <Header onSignOut={handleSignOut} userEmail={profileEmail} />
          <Switch>
            <Route path="/sign-in">
              <Login onAuthorize={handleAuthorize} />
            </Route>

            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>

            <ProtectedRoute
              path="/"
              loggedIn={isLoggedIn}
              component={Main}
              onEditProfile={setIsEditProfilePopupOpen}
              onAddPlace={setIsAddPlacePopupOpen}
              onEditAvatar={setIsEditAvatarPopupOpen}
              onCardClick={setSelectedCard}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDeleteClick}
            />
          </Switch>
          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoadingEditAvatarPopup}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoadingEditProfilePopup}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onLoading={isLoadingAddPlacePopup}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            isSuccess={isSuccessInfoTooltipStatus}
            onClose={closeAllPopups}
          />
          <PopupWithConfirm
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            card={removedCardId}
            onLoading={isLoadingPopupWithConfirm}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
