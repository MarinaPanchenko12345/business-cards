import React, { useState, useEffect, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import useCardAPI, { METHOD } from "../../hooks/useCardAPI";
import { useSelector } from "react-redux";
import { filterCards } from "../tools/SearchBox";
import ViewCard from "./ViewCard";
import UpdateCard from "./UpdateCard";
import { showAlert } from "./../tools/Aletrs.js";
import "./Cards.css";
import DeleteIcon from "@mui/icons-material/Delete";
import DrawIcon from "@mui/icons-material/Draw";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Loading from "../tools/Loading";
import { SearchContext } from "../../contexts/searchContext.jsx";

const Cards = () => {
  const { searchText } = useContext(SearchContext);
  const { data, error, isLoading, apiCard } = useCardAPI();
  const role = useSelector((state) => state.token.role);
  const userId = useSelector((state) => state.token.userId);
  const [selectedCard, setSelectedCard] = useState();
  const [likedCards, setLikedCards] = useState([]);
  const [storedLikedCards, setStoredLikedCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cards, setCards] = useState([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);

  const theme = useTheme();
  const style = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.main,
  };
  useEffect(() => {
    if (apiCard) {
      apiCard(METHOD.GET_ALL_CARDS);
    }
  }, [apiCard]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (Array.isArray(data)) {
      setCards(data);
      if (token) {
        const currentUserId = userId;
        if (data.length > 0) {
          const filteredCards = data.filter((card) =>
            card.likes.includes(currentUserId)
          );
          setLikedCards(filteredCards.map((card) => card._id));
        }
      } else {
        const storedLikes =
          JSON.parse(localStorage.getItem("likedCards")) || [];
        setStoredLikedCards(storedLikes);
      }
    }
  }, [data, userId]);

  const handleLike = async (card) => {
    const cardId = card._id;
    if (!cardId) {
      return;
    }
    if (!isLoggedIn) {
      const updatedStoredLikedCards = storedLikedCards.includes(cardId)
        ? storedLikedCards.filter((id) => id !== cardId)
        : [...storedLikedCards, cardId];
      setStoredLikedCards(updatedStoredLikedCards);
      localStorage.setItem(
        "likedCards",
        JSON.stringify(updatedStoredLikedCards)
      );
      return;
    }
    try {
      const isLiked = likedCards.includes(cardId);
      const likeStatus = !isLiked;
      await apiCard(METHOD.LIKE_UNLIKE_CARD, {
        id: cardId,
        like: likeStatus,
      });
      const updatedLikedCards = likeStatus
        ? [...likedCards, cardId]
        : likedCards.filter((id) => id !== cardId);
      setLikedCards(updatedLikedCards);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleDeleteCard = async (card) => {
    try {
      if (
        role === "admin" ||
        (role === "business" && card.user_id === userId)
      ) {
        await apiCard(METHOD.DELETE_CARD, { id: card._id });
        showAlert("success", "Card deleted successfully:", card);
        setCards(cards.filter((currentCard) => currentCard._id !== card._id));
      } else {
        showAlert("error", "You do not have permission to delete this card.");
      }
    } catch (error) {
      showAlert("error", "Failed to delete card:", error);
    }
  };

  const handleCardUpdated = (updatedCard) => {
    if (
      role === "admin" ||
      (role === "business" && updatedCard.user_id === userId)
    ) {
      setCurrentCard(updatedCard);
      setFormOpen(true);
    } else {
      showAlert("error", "You do not have permission to update this card.");
    }
  };

  const handleCardUpdatedAndCloseForm = (updatedCard) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card._id === updatedCard._id ? updatedCard : card
      )
    );
    showAlert("success", "Card updated successfully!");
    setFormOpen(false);
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!cards || cards.length === 0) return <div>No result found</div>;

  const filteredCards = filterCards(cards, searchText);

  return (
    <div className='home_container'>
      <div className='card_container'>
        {filteredCards.slice(-6).map((card) => (
          <div key={card._id} className='card_item' style={style}>
            <img
              src={card.image.url}
              alt={card.title}
              onClick={() => handleCardClick(card)}
            />
            <div className='card_text'>
              <h3>{card.title}</h3>
              <h5>{card.subtitle}</h5>
            </div>
            <hr />
            <div className='card_info'>
              <p>
                <strong>Phone :</strong> {card.phone}
              </p>
              <p>
                <strong>Email :</strong> {card.email}
              </p>
              <p>
                <strong>Card Number :</strong> {card.bizNumber}
              </p>
            </div>
            <hr />
            <div className='div_icons'>
              {(role === "admin" || role === "business") && (
                <>
                  <DeleteIcon
                    fontSize='medium'
                    className='card_icon'
                    onClick={() => handleDeleteCard(card)}
                  />
                  <DrawIcon
                    fontSize='medium'
                    className='card_icon'
                    onClick={() => handleCardUpdated(card)}
                  />
                </>
              )}
              <FavoriteIcon
                fontSize='medium'
                className='card_icon'
                onClick={() => handleLike(card)}
                style={{
                  color: (isLoggedIn ? likedCards : storedLikedCards).includes(
                    card._id
                  )
                    ? "red"
                    : "black",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {isFormOpen && (
        <UpdateCard
          card={currentCard}
          onCardUpdated={handleCardUpdatedAndCloseForm}
          close={() => setFormOpen(false)}
        />
      )}
      {selectedCard && (
        <ViewCard card={selectedCard} close={() => setSelectedCard(null)} />
      )}
    </div>
  );
};

export default Cards;
