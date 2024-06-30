import React, { useEffect, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material/styles";
import useCardAPI, { METHOD } from "../../hooks/useCardAPI";
import "../cards/Cards.css";
import Loading from "../tools/Loading";
import { filterCards } from "../tools/SearchBox";
import { SearchContext } from "../../contexts/searchContext.jsx";

const FavCard = () => {
  const { searchText } = useContext(SearchContext);
  const { data, error, isLoading, apiCard } = useCardAPI();
  const [cards, setCards] = useState([]);
  const [favoriteCards, setFavoriteCards] = useState([]);
  const theme = useTheme();
  const style = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.main,
  };
  useEffect(() => {
    const fetchCards = async () => {
      await apiCard(METHOD.GET_ALL_CARDS);
    };
    fetchCards();
  }, [apiCard]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setCards(data);
    }
  }, [data]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && cards.length > 0) {
      const decoded = jwtDecode(token);
      const currentUserId = decoded._id;
      const filteredCards = cards.filter((card) =>
        card.likes.includes(currentUserId)
      );
      setFavoriteCards(filteredCards);
    }
  }, [cards]);

  const handleUnlike = async (cardId) => {
    await apiCard(METHOD.LIKE_UNLIKE_CARD, { id: cardId, like: false });
    setFavoriteCards(favoriteCards.filter((card) => card._id !== cardId));
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!favoriteCards || favoriteCards.length === 0)
    return <div className='no_result'>No favorite cards found</div>;

  const filteredCards = filterCards(favoriteCards, searchText);

  return (
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
            <FavoriteIcon
              fontSize='large'
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => handleUnlike(card._id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavCard;
