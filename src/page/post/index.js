import React, { useState, useEffect } from "react";

const PostForm = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let interval = setInterval(() => {
      setCards(cards => cards.map(card => {
        if (card.time > 0) {
          return {...card, time: card.time - 1};
        } else {
          return {...card, display: false};
        }
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShowCard = () => {
    setCards([...cards, { id: cards.length + 1, time: 30*60, display: true }]);
  };

  const handleRemoveCard = (id) => {
    setCards(cards => cards.map(card => {
      if (card.id === id) {
        return {...card, display: false};
      } else {
        return card;
      }
    }));
  };

  return (
    <div>
      <button onClick={handleShowCard}>Tampilkan Card</button>
      {cards.map(card =>
        card.display && (
          <div key={card.id}>
            <h2>Card ID: {card.id}</h2>
            <p>Waktu tersisa: {Math.floor(card.time / 60)}:{card.time % 60 < 10 ? `0${card.time % 60}` : card.time % 60}</p>
            <button onClick={() => handleRemoveCard(card.id)}>Hapus Card</button>
          </div>
        )
      )}
    </div>
  );
};

export default PostForm;
