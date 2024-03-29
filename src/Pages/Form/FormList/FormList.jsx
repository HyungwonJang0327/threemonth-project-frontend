import React, { useEffect, useState } from "react";
import FormListBox from "./FormListBox/FormListBox";
import styled from "styled-components";
import Loading from "../../../components/Loading";
import ListNoContents from "./ListNoContents";
import { useNavigate, useLocation } from "react-router";
import { USER_TOKEN, API } from "../../../config";
import axios from "axios";

const FormList = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [formList, setFormList] = useState([
    {
      id: 0,
      customer_name: "",
      status: "",
      title: "",
      create_at: "",
    },
  ]);
  const { FORM_LIST } = API;
  useEffect(() => {
    axios.get(`${FORM_LIST}`).then((res) => setFormList(res.data.results));
  }, [FORM_LIST]);

  if (formList.length === 0) {
    return <ListNoContents />;
  }

  const sortedList = [...formList]
    .sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    })
    .reverse();
  if (formList[0].id === 0) {
    return <Loading />;
  }

  return (
    <FormListWrapper>
      <FormListWidth>
        <FormListTitle>주문서 목록</FormListTitle>
        <FormListBox sortedList={sortedList} />
        <ReserveBtnWrap>
          <ReserveBtn
            onClick={() => {
              if (USER_TOKEN) {
                navigate("/reserveform", { state: { formType: "cake" } });
              } else {
                if (
                  window.confirm(
                    "로그인이 필요한 서비스입니다. 로그인 하시겠습니까?"
                  )
                ) {
                  localStorage.setItem("prevpath", pathname);
                  navigate("/loginpage");
                }
              }
            }}
          >
            케이크 신청하기
          </ReserveBtn>
          <ReserveBtn
            onClick={() => {
              if (USER_TOKEN) {
                navigate("/reserveform", { state: { formType: "package" } });
              } else {
                if (
                  window.confirm(
                    "로그인이 필요한 서비스입니다. 로그인 하시겠습니까?"
                  )
                ) {
                  localStorage.setItem("prevpath", pathname);
                  navigate("/loginpage");
                }
              }
            }}
          >
            기프트박스 신청하기
          </ReserveBtn>
        </ReserveBtnWrap>
      </FormListWidth>
    </FormListWrapper>
  );
};

export default FormList;

const FormListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${(props) => props.theme.fontColor};
  @media (max-width: 580px) {
    width: 100%;
  }
`;

const FormListWidth = styled.div`
  margin: 80px 0;
  width: 85%;
  @media (max-width: 580px) {
    width: 100%;
  }
`;

const FormListTitle = styled.p`
  font-size: 1.6em;
  @media (max-width: 580px) {
    padding: 0 20px;
  }
`;

const ReserveBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 50px;
`;
const ReserveBtn = styled.button`
  border-style: none;
  width: 150px;
  height: 40px;
  font-size: 17px;
  margin-left: 20px;
  background-color: ${({ theme }) => theme.bgColor};
  border: 1px solid ${({ theme }) => theme.fontColor};
  color: ${({ theme }) => theme.fontColor};
  cursor: pointer;
  @media (max-width: 768px) {
    width: 100px;
    height: 25px;
    font-size: 0.6em;
    font-weight: bold;
  }
`;
