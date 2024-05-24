import styled from "@emotion/styled";


export const HomePageWrapper = styled.div`
  width: 100%;    
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TextHomeWrapper = styled.div`
  width: 100%; 
  height: 200px; 
`;

export const CategoryWrapper = styled.div`
  width: 2000px;   
  padding-top: 40px;
`;

export const CategoryTextWrapper = styled.div`
  display: flex;  
  justify-content: left; 
  padding: 0px 0px 0px 100px;
  width: 2000px;    
`;

export const CategoryText = styled.p`
  font-size: 30px;
  font-weight: bold;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  /* grid-template-rows: repeat(3, 1fr);  */
  grid-template-rows: repeat(2, 1fr); 
  gap: 16px; 
  padding: 20px 100px;  
  width: 100%; 
  box-sizing: border-box; 
`;

// последняя карточка в Grid - ссылка на пункт меню Категории
export const Card = styled.div`
  background-color: gainsboro;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  font-weight: bold;
`;


export const IntroductionContainerWrapper = styled.div`
  display: flex; 
  justify-content: center;
  width: 100%;   
  
`;



export const IntroductionContainer = styled.div`
  display: flex; 
  justify-content: space-evenly;
  width: 1800px;   
`;

export const IntroductionTextWrapper = styled.div`
  width: 1450px;   
  padding: 50px 50px 50px 0px;  
`;

export const IntroductionText = styled.p`
  font-size: 30px;
  font-weight: bold;
  padding: 20px;
  font-family: 'Chivo', sans-serif;
  font-style: italic;
  color: #4d418b;
`;

export const IntroductionButtonWrapper = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center; 
  padding-right: 100px ;
  `;


// Контейнер с плавными границами внизу
export const WaveContainer = styled.div`
  width: 100%;
  height: 350px; /* Фиксированная высота */
  position: relative;
  overflow: hidden; /* Скрытие лишнего содержимого */
`;

// Градиентный фон с плавными границами
export const GradientBackground = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #9796F0, #fde8ed); /* Градиентный фон */
  position: absolute;
  top: 0;
  left: 0;

  &::before {
    content: '';
    position: absolute;
    bottom: -40px; /* Регулировка положения волны */
    width: 100%;
    height: 50px; /* Высота волны */
    background: white;
    border-radius: 50% 50% 0 0;
  }
`;














