import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function FullPizza() {
  const [pizza, setPizza] = React.useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get(
          "https://62e3efe83c89b95396d4450b.mockapi.io/pizzas/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Error while loading a pizza");
        navigate("/");
      }
    }

    fetchPizzas();
  }, []);

  return (
    <div>
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}€</h4>
    </div>
  );
}

export default FullPizza;
