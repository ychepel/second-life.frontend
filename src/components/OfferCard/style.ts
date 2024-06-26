import styled from "@emotion/styled";

import { defaultImage } from "../../assets/images/index.ts";

export const OfferCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  gap: 30px;
`;

export const OfferCardContainer = styled.div`
  background-color: #dcdcdc30;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  height: auto;
  width: 1270px;
  align-items: center;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  font-weight: bold;
  justify-content: space-between;
`;

export const ImgContainer = styled.div``;

export const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
`;

Image.defaultProps = { src: defaultImage };

export const DescriptionContainer = styled.div`
  gap: 18px;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-family: "DM Sans", sans-serif;
  width: 700px;
`;

export const TitleContainer = styled.div``;

export const Title = styled.h3`
  font-size: 22px;
  color: #56119c;
  font-family: "LXGW WenKai TC", cursive;
  font-weight: bold;
  width: 700px;
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.5;
`;

export const Description = styled.p`
  font-size: 16px;
  color: grey !important;
  font-style: italic !important;
  font-family: "DM Sans", sans-serif;
  width: 700px;
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.5;
`;

export const Category = styled.h5`
  gap: 5px;
  display: flex;
  align-items: center;
  color: #49423d !important;
`;

export const Location = styled.h5`
  gap: 5px;
  display: flex;
  align-items: center;
  color: #49423d !important;
`;

export const StyledDate = styled.h5`
  gap: 5px;
  display: flex;
  align-items: center;
  color: #49423d !important;
`;

export const Type00 = styled.p`
  gap: 5px;
  display: flex;
  align-items: center;
  color: red !important;
  font-size: 16px !important;
`;

export const Type01 = styled.p`
  gap: 5px;
  display: flex;
  align-items: center;
  color: green !important;
  font-size: 16px !important;
`;

export const Type02 = styled.p`
  gap: 5px;
  display: flex;
  align-items: center;
  color: blue !important;
  font-size: 16px !important;
`;

export const ButtonWrapper = styled.div`
  width: 140px;
  display: flex;
  gap: 30px;
  height: 240px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

export const ButtonContainer = styled.div`
  width: 140px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  flex-grow: 1;
`;

export const PriceContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  gap: 10px;
  justify-content: center;
  color: green;
  align-items: center;
  font-family: "LXGW WenKai TC", cursive;
  font-weight: bold;
  font-size: 26px;
`;

export const LabelContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export const TextContainer = styled.div`
  color: green;
  align-items: center;
  font-family: "LXGW WenKai TC", cursive;
  font-weight: bold;
  font-size: 16px;
  justify-content: center;
  display: flex;
`;

export const Status = styled.h5`
  gap: 5px;
  display: flex;
  align-items: center;
  color: blue;
`;

export const WindowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 16px;
  font-family: "LXGW WenKai TC", cursive;
`;
