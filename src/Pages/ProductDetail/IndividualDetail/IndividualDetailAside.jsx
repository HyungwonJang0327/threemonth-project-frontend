import React from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { USER_TOKEN } from "../../../config";

const IndividualDetailAside = ({ individualData }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { price, description, is_active, product_name, category } =
    individualData;
  const goReserveForm = () => {
    if (category === "cake") {
      alert(
        "현재 매장 상황에 따라 케이크는 판매하고 있지 않습니다. 양해 부탁드립니다."
      );
      return;
    }
    if (is_active === false) {
      alert("현재 판매중인 케이크가 아닙니다.");
      return;
    } else {
      if (USER_TOKEN) {
        navigate("/reserveform", { state: { formType: "cake" } });
      } else {
        if (
          window.confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")
        ) {
          localStorage.setItem("prevpath", pathname);
          navigate("/loginpage");
        }
      }
    }
  };
  const productDesHTML = () => {
    return {
      __html: description.replace(/\n/g, "<br>\n"),
    };
  };

  return (
    <IndividualDetailAsideWrapper>
      <IndividualDetailAsideTop>
        <IndividualDetailAsideP>{product_name}</IndividualDetailAsideP>
        <IndividualDetailAsideP dangerouslySetInnerHTML={productDesHTML()} />
        <IndividualDetailAsideP>
          {price.toLocaleString()}원
        </IndividualDetailAsideP>
        {category === "cake" ? (
          <DetailIndividualReservBtn onClick={goReserveForm}>
            예약하러 가기
          </DetailIndividualReservBtn>
        ) : (
          <GoToBamin href="https://baemin.me/vrmWr_I9d">
            <DetailIndividualReservBtn>
              주문은 <br /> 배달의 민족에서!
            </DetailIndividualReservBtn>
          </GoToBamin>
        )}
      </IndividualDetailAsideTop>
    </IndividualDetailAsideWrapper>
  );
};

export default IndividualDetailAside;

const IndividualDetailAsideWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  color: ${({ theme }) => theme.fontColor};
  @media (max-width: 768px) {
    grid-template-rows: 1fr;
    width: 100%;
    margin-bottom: 50px;
  }
`;

const IndividualDetailAsideTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px;
`;

const IndividualDetailAsideP = styled.p`
  margin-top: 50px;
  font-size: 18px;
  @media (max-width: 768px) {
    margin-top: 10px;
  }
  &:nth-child(odd) {
    font-size: 23px;
  }
  &:nth-child(even) {
    width: 70%;
    font-size: 15px;
    margin-bottom: 20px;
  }
`;

const GoToBamin = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const DetailIndividualReservBtn = styled.button`
  margin-top: 50px;
  border-style: none;
  height: 60px;
  width: 70%;
  border-radius: 5px;
  font-size: 18px;
  color: ${({ theme }) => theme.fontColor};
  border: 1px solid ${({ theme }) => theme.fontColor};
  background-color: ${({ theme }) => theme.bgColor};
  cursor: pointer;
  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;
