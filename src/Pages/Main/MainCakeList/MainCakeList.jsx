import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const MainCakeList = ({ mainCakeList }) => {
  const navigate = useNavigate();

  const goToCakeDetail = (id) => {
    navigate(`/individualdetail/${id}`);
  };
  return (
    <MainCakeListContainer id="cakeList">
      <CakeListTitle>홀케이크 주문서</CakeListTitle>
      <CakeListBox>
        <CakeListItems>
          {mainCakeList.map((item, idx) => {
            return (
              <CakeListItem
                onClick={() => {
                  goToCakeDetail(item.id);
                }}
                key={idx}
              >
                {item.product_images.map(
                  (x, index) =>
                    x.property === "main" &&
                    x.img_url && (
                      <CakeItem key={index} src={x.img_url} alt="image" />
                    )
                )}
                <CakeItemTitle>{item.product_name}</CakeItemTitle>
                <CakeItemPrice>
                  {item.price && item.price.toLocaleString()}원
                </CakeItemPrice>
              </CakeListItem>
            );
          })}
        </CakeListItems>
      </CakeListBox>
    </MainCakeListContainer>
  );
};

export default MainCakeList;

const MainCakeListContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px 0px;
  letter-spacing: 0.05em;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const CakeListTitle = styled.h2`
  margin-bottom: 30px;
  margin-top: 100px;
  font-size: 2.5em;
  line-height: 1.2;
  border-bottom: 3px solid ${({ theme }) => theme.fontColor};
  color: ${({ theme }) => theme.fontColor};
  @media screen and (max-width: 1400px) {
    font-size: 1.7em;
    margin-top: 70px;
  }
  @media screen and (max-width: 750px) {
    font-size: 1.5em;
    margin-top: 70px;
  }
  @media screen and (max-width: 500px) {
    font-size: 1em;
    margin-top: 70px;
  }
`;

const CakeListBox = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
  padding-bottom: 50px;
`;

const CakeListItems = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px 0px;
  width: 100%;
  overflow: hidden;
`;
const CakeListItem = styled.li`
  text-align: center;
  margin-right: 35px;
  margin-top: 25px;
  cursor: pointer;
  @media screen and (max-width: 400px) {
    margin-right: 20px;
  }
`;

const CakeItemTitle = styled.h3`
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 20px;
  font-weight: 400;
  @media screen and (max-width: 770px) {
    font-size: 16px;
  }
  @media screen and (max-width: 465px) {
    font-size: 16px;
  }
`;
const CakeItemPrice = styled.p`
  font-size: 20px;
  font-weight: 300;
  @media screen and (max-width: 770px) {
    font-size: 16px;
  }
  @media screen and (max-width: 465px) {
    font-size: 16px;
  }
`;

const CakeItem = styled.img`
  width: 200px;
  height: 150px;
  border-radius: 5px;
  @media screen and (max-width: 2560px) {
    width: 400px;
    height: 280px;
  }
  @media screen and (max-width: 2260px) {
    width: 300px;
    height: 200px;
  }
  @media screen and (max-width: 1700px) {
    width: 260px;
    height: 180px;
  }
  @media screen and (max-width: 1500px) {
    width: 260px;
    height: 180px;
  }
  @media screen and (max-width: 790px) {
    width: 170px;
    height: 130px;
  }
  @media screen and (max-width: 485px) {
    width: 200px;
    height: 150px;
  }
  @media screen and (max-width: 400px) {
    width: 200px;
    height: 150px;
  }
`;
