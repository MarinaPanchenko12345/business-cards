import React, { useEffect } from "react";
import "./ViewCard.css";
import { useTheme } from "@mui/material/styles";
import useCardAPI, { METHOD } from "../../hooks/useCardAPI";
import Loading from "../tools/Loading";

const ViewCard = ({ card, close }) => {
  const { data, error, isLoading, apiCard } = useCardAPI();
  const theme = useTheme();
  const style = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.main,
  };

  useEffect(() => {
    if (card && card._id) {
      apiCard(METHOD.GET_ONE_CARD, { id: card._id });
    }
  }, [apiCard, card]);

  if (isLoading || !data) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!data || data.length === 0) return <div>No result found</div>;

  return (
    <div className='view_div'>
      <div
        className='view_container'
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
      >
        <div className='view_card_container'>
          <div className='view_card_item' style={style}>
            <img src={data.image.url} alt={data.title} />
            <div className='view_card_text'>
              <h2>{data.title}</h2>
              <h3>{data.subtitle}</h3>
            </div>
            <hr />
            <div className='view_card_info'>
              <p>
                <strong>Phone :</strong> {data.phone}
              </p>
              <p>
                <strong>Email :</strong> {data.email}
              </p>
              <p>
                <strong>Card Number :</strong> {data.bizNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;
