import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const MainList = ({ mainList }) => {
  const navigate = useNavigate();

  const goToDetail = (id) => {
    navigate(`/individualdetail/${id}`);
  };

  return (
    <ListContainer>
      <ListTitle>뜨리먼뜨 제품</ListTitle>
      <ListBox>
        <ListItems>
          {mainList.map((item, idx) => {
            return (
              <ListItem
                key={idx}
                onClick={() => {
                  goToDetail(item.id);
                }}
              >
                {item.product_images.map(
                  (x, index) =>
                    x.property === "main" &&
                    x.img_url && (
                      <Item key={index} src={x.img_url} alt="image" />
                    )
                )}

                <ItemTitle>{item.product_name}</ItemTitle>
                <ItemPrice>
                  {item.price && item.price.toLocaleString()}원
                </ItemPrice>
              </ListItem>
            );
          })}
        </ListItems>
      </ListBox>
    </ListContainer>
  );
};

export default MainList;

const ListContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px 0px;
  letter-spacing: 0.05em;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;
const ListTitle = styled.h2`
  margin-bottom: 50px;
  font-size: 2.5em;
  line-height: 1.2;
  border-bottom: 3px solid ${({ theme }) => theme.fontColor};
  color: ${({ theme }) => theme.fontColor};
  @media screen and (max-width: 1400px) {
    font-size: 1.7em;
    margin-top: 50px;
  }
  @media screen and (max-width: 750px) {
    font-size: 1.5em;
    margin-top: 50px;
  }
  @media screen and (max-width: 500px) {
    font-size: 1em;
    margin-top: 50px;
  }
`;

const ListBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
  padding-bottom: 50px;
  box-sizing: border-box;
`;

const ListItems = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
  width: 100%;
  overflow: hidden;
`;
const ListItem = styled.li`
  cursor: pointer;
  text-align: center;
  margin-right: 35px;
  margin-top: 25px;
  @media screen and (max-width: 400px) {
    margin: 0 5px;
  }
`;

const ItemTitle = styled.h3`
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 20px;
  font-weight: 400;
  @media screen and (max-width: 770px) {
    font-size: 16px;
  }
  @media screen and (max-width: 465px) {
    font-size: 14px;
  }
  @media screen and (max-width: 360px) {
    font-size: 12px;
  }
`;
const ItemPrice = styled.p`
  font-size: 20px;
  font-weight: 300;
  @media screen and (max-width: 770px) {
    font-size: 16px;
  }
  @media screen and (max-width: 465px) {
    font-size: 14px;
  }
  @media screen and (max-width: 360px) {
    font-size: 12px;
  }
`;

const Item = styled.img`
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
    width: 200px;
    height: 150px;
  }
  @media screen and (max-width: 790px) {
    width: 170px;
    height: 130px;
  }
  @media screen and (max-width: 465px) {
    width: 170px;
    height: 130px;
  }
  @media screen and (max-width: 447px) {
    width: 150px;
    height: 100px;
  }
  @media screen and (max-width: 400px) {
    width: 120px;
    height: 80px;
  }
`;
