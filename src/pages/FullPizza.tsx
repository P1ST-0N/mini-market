import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [sneaker, setSneaker] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://6491fbe22f2c7ee6c2c94115.mockapi.io/shoes/' + id);
        setSneaker(data);
      } catch (error) {
        alert('Помилка при отриманні товару!');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!sneaker) {
    return <>Loading ...</>;
  }

  return (
    <div className="container">
      <img src={sneaker.imageUrl} />
      <h2>{sneaker.title}</h2>
      <h4>{sneaker.price} грн</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
