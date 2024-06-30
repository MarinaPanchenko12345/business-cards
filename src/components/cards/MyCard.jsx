import React, { useState, useEffect, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import NewCard from "./NewCard";
import UpdateCard from "./UpdateCard";
import Button from "@mui/material/Button";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import DeleteIcon from "@mui/icons-material/Delete";
import DrawIcon from "@mui/icons-material/Draw";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useCardAPI, { METHOD } from "../../hooks/useCardAPI";
import Loading from "../tools/Loading";
import "./Cards.css";
import { showAlert } from "./../tools/Aletrs.js";
import { filterCards } from "../tools/SearchBox";
import { SearchContext } from "../../contexts/searchContext.jsx";

const MyCard = () => {
  const { searchText } = useContext(SearchContext);
  const { data, error, isLoading, apiCard } = useCardAPI();
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [formMode, setFormMode] = useState(""); // '' for no form, 'new' for NewCard, 'edit' for UpdateCard

  const theme = useTheme();
  const style = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.main,
  };

  useEffect(() => {
    const fetchCards = async () => {
      await apiCard(METHOD.GET_ALL_MY_CARDS);
    };
    fetchCards();
  }, [apiCard]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setCards(data);
    }
  }, [data]);

  const toggleForm = (mode, card = null) => {
    setFormMode(mode);
    setCurrentCard(card);
  };

  const handleCancel = () => {
    setFormMode("");
  };

  const handleNewCardAdded = (newCard) => {
    setCards([...cards, newCard]);
    setFormMode("");
  };

  const handleCardUpdated = (updatedCard) => {
    const updatedCards = cards.map((card) =>
      card._id === updatedCard._id ? updatedCard : card
    );
    setCards(updatedCards);
    setFormMode("");
  };

  const handleDeleteCard = async (card) => {
    try {
      await apiCard(METHOD.DELETE_CARD, { id: card._id });
      showAlert("success", "Card deleted successfully:", card);
      setCards(cards.filter((currentCard) => currentCard._id !== card._id));
    } catch (error) {
      showAlert("error", "Failed to delete card:", error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const filteredCards = filterCards(cards, searchText);

  return (
    <div>
      <div className='container_form'>
        {formMode === "" && (
          <Button
            variant='contained'
            size='large'
            style={{
              marginTop: "50px",
              marginLeft: "50px",
              fontWeight: "bold",
            }}
            onClick={() => toggleForm("new")}
          >
            <AddTaskIcon sx={{ display: { fontSize: 35 } }} />
            Create New Card
          </Button>
        )}
        {formMode !== "" && (
          <Button
            variant='contained'
            size='large'
            style={{
              marginTop: "50px",
              marginLeft: "50px",
              fontWeight: "bold",
            }}
            onClick={() => toggleForm("")}
          >
            <DisabledByDefaultIcon sx={{ display: { fontSize: 35 } }} />
            Cancel
          </Button>
        )}
        {formMode === "new" && (
          <NewCard onCardAdded={handleNewCardAdded} close={handleCancel} />
        )}
        {formMode === "edit" && (
          <UpdateCard
            card={currentCard}
            onCardUpdated={handleCardUpdated}
            close={handleCancel}
          />
        )}
      </div>
      {(!cards || cards.length === 0) && (
        <div className='no_result'>
          No cards found. Click 'Create New Card' to add one.
        </div>
      )}
      <div className='card_container'>
        {filteredCards.map((card) => (
          <div key={card._id} className='card_item' style={style}>
            <img src={card.image.url} alt={card.title} />
            <div className='card_text'>
              <h3>{card.title}</h3>
              <h5>{card.subtitle}</h5>
            </div>
            <hr />
            <div className='card_info'>
              <p>
                <strong>Phone:</strong> {card.phone}
              </p>
              <p>
                <strong>Email:</strong> {card.email}
              </p>
              <p>
                <strong>Card Number:</strong> {card.bizNumber}
              </p>
            </div>
            <hr />
            <div className='div_icons'>
              <DeleteIcon
                fontSize='medium'
                className='card_icon'
                onClick={() => {
                  console.log("Deleting card with ID:", card._id);
                  handleDeleteCard(card);
                }}
              />
              <DrawIcon
                fontSize='medium'
                className='card_icon'
                onClick={() => toggleForm("edit", card)}
              />
              <FavoriteIcon fontSize='medium' className='card_icon' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCard;
