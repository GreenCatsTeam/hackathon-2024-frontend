import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { useState, useEffect} from 'react';




const BarChartComponent = () => {
  const [cardsStat, setCardsStat] = useState(null);

  const statusIdMapping = {1:'На модерации',2:'Мусор',3:'Уборка',4:'Проверка',5:'Чисто'}

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const response = await axios.get('http://localhost:8080/cards', {
      headers: {
        "Content-Type": "application/json",
        "Host": "localhost:8080",
        'Authorization': 'Bearer ' + localStorage.getItem('site'),
        "Content-Length": localStorage.getItem('site').length
      }
  }).then(res =>  {
    
    
let groupedTrashes = res.data.reduce((acc, trash) => {
  const status = statusIdMapping[trash.statusId];
  if (!acc[status]) {
    acc[status] = { status, count: 1 };
  } else {
    acc[status].count++;
  }
  return acc;
}, {});

const result = Object.keys(groupedTrashes).map(e => groupedTrashes[e]);

    setCardsStat(result);
    return;
  });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  
  

  if(cardsStat===null)
  return (<h2>Ждите</h2>)
  else 
  return(
    <div>
    <h1>Статусы заявок</h1>
    <BarChart width={600} height={300} data={cardsStat}>
      
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="status" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" name='Количество' />
    </BarChart>
    </div>);
}

export default BarChartComponent;

