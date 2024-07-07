import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams(); // вытаскиваем динамические параметры из url, для не динамических используем хук useSearchParams, так же можно через хук Location(там объект и внутри свойство search)

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://661fa52416358961cd94ff2b.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('ошибка при получении пиццы');
      }
    }
    fetchPizza();
  });

  if (!pizza) {
    return 'Загрузка';
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt={`pizzsImg${id}`} />
      <h2>{pizza.title}</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ut tempore corrupti error
        quibusdam labore, maxime dolorem repudiandae totam accusantium soluta fugit quasi eum ullam
        quo quas doloremque reiciendis suscipit?
      </p>
      <h4>{pizza.price} р</h4>
    </div>
  );
};

export default FullPizza;
