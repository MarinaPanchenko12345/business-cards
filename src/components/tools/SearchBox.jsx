import React, { useState } from "react";
import "./SearchBox.css";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({ searchText, setSearchText }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchIconClick = () => {
    if (isOpen) {
      setSearchText("");
    }
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsOpen(false);
      setSearchText(e.target.value);
    }
  };

  return (
    <div className='search-container'>
      <div className='search-box' style={{ width: isOpen ? "100%" : "37px" }}>
        <input
          className='search-txt'
          type='text'
          placeholder='Search...'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            width: isOpen ? "100%" : "0px",
            padding: isOpen ? "0 5px" : "0",
          }}
        />
        <SearchIcon
          onClick={handleSearchIconClick}
          style={{
            float: "right",
            fontSize: 26,
            color: "black",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export const filterCards = (cards, searchText) => {
  if (!searchText) return cards;

  return cards.filter(
    (card) =>
      (card.bizNumber &&
        typeof card.bizNumber === "string" &&
        card.bizNumber.toLowerCase().includes(searchText.toLowerCase())) ||
      (card.title &&
        typeof card.title === "string" &&
        card.title.toLowerCase().includes(searchText.toLowerCase())) ||
      (card.subtitle &&
        typeof card.subtitle === "string" &&
        card.subtitle.toLowerCase().includes(searchText.toLowerCase())) ||
      (card.phone &&
        typeof card.phone === "string" &&
        card.phone.toLowerCase().includes(searchText.toLowerCase())) ||
      (card.email &&
        typeof card.email === "string" &&
        card.email.toLowerCase().includes(searchText.toLowerCase()))
  );
};

export default SearchBox;
