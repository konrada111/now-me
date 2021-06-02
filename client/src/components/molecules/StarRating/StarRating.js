import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Stars, TextArea, Wrapper } from './StarRating.style';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../features/appSlice';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const colors = {
  orange: '#FFBA5A',
  grey: '#a9a9a9',
};

const StarRating = () => {
  const userId = useSelector(selectUserId);
  const { id } = useParams();

  const [currentValue, setCurrentValue] = useState(1);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [textAreaValue, setTextAreaValue] = useState('');
  const stars = Array(5).fill(0);
  const [opinions, setOpinions] = useState([]);

  const fetchOpinions = async () => {
    await axios.get(`http://127.0.0.1:8000/api/opinions/${id}`).then((response) => setOpinions(response.data.opinions));
  };

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmitRating = async (e) => {
    await fetchData();
    setCurrentValue(1);
    setTextAreaValue('');
  };

  useEffect(() => {
    fetchOpinions();
  }, []);

  const fetchData = async () => {
    await axios
      .post('http://127.0.0.1:8000/api/opinion', { user_id: userId, employee_id: id, text: textAreaValue, stars: currentValue })
      .then((response) => {
        if (response.status === 201) {
          let timerInterval;
          Swal.fire({
            icon: 'success',
            title: 'You successfully added opinion',
            timer: 1000,
            didOpen: () => {
              Swal.showLoading();
              timerInterval = setInterval(() => {}, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          });
        }
      })
      .catch((err) => console.log(err));
    fetchOpinions();
  };

  const handleTextAreaChange = (e) => {
    setTextAreaValue(e.target.value);
  };

  return (
    <>
      <Wrapper>
        <h2> Rate specialist </h2>
        <Stars>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                style={{
                  marginRight: 10,
                  cursor: 'pointer',
                }}
              />
            );
          })}
        </Stars>
        <TextArea placeholder="Write your feedback" value={textAreaValue} onChange={handleTextAreaChange} />
        <Button onClick={handleSubmitRating}>Submit</Button>
      </Wrapper>
      <WrapperOpinions>
        <span>Opinie</span>
        <ul>
          {opinions ? (
            opinions.map(({ text, stars }) => (
              <li key={text}>
                {text}
                {'  '} <span>{stars}/5</span>
              </li>
            ))
          ) : (
            <span>Brak opini</span>
          )}
        </ul>
      </WrapperOpinions>
    </>
  );
};

export const WrapperOpinions = styled.div`
  display: flex;
`;

export default StarRating;
