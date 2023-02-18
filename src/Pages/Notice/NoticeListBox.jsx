import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const NoticeListBox = ({ noticeFormList }) => {
  const navigate = useNavigate();

  return (
    <NoticeListBoxContainer>
      <ListBox>
        <NoticeBoxListMenu>
          <MenuNum>글 번호</MenuNum>
          <MenuTitle>제목</MenuTitle>
          <MenuDate>작성일</MenuDate>
        </NoticeBoxListMenu>
        <NoticeList>
          {noticeFormList.map((list, idx) => (
            <NoticeListContents key={idx}>
              <NoticeListBoxContent>{list.id}</NoticeListBoxContent>
              <NoticeListBoxContent
                onClick={() => {
                  navigate(`/noticedetail/${list.id}`);
                }}
              >
                {list.title}
              </NoticeListBoxContent>
              <NoticeListBoxContent>
                {String(list.created_at).slice(0, 10)}
              </NoticeListBoxContent>
            </NoticeListContents>
          ))}
        </NoticeList>
      </ListBox>
    </NoticeListBoxContainer>
  );
};

export default NoticeListBox;

const NoticeListBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  font-size: 1em;
  @media (max-width: 580px) {
    width: 100%;
  }
`;

const ListBox = styled.div`
  width: 100%;
  min-height: 50px;
  border-radius: 20px;
`;

const NoticeBoxListMenu = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 5fr 1fr;
  grid-template-rows: 50px;
  box-sizing: border-box;
  border-bottom: 4px solid ${({ theme }) => theme.bgColor};
  margin-top: 50px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 5fr 1fr;
    grid-template-rows: 30px;
  }
  @media (max-width: 610px) {
    grid-template-columns: 1fr 4fr 1.3fr;
    grid-template-rows: 20px;
  }
  @media (max-width: 450px) {
    grid-template-columns: 1fr 3fr 2fr;
    grid-template-rows: 20px;
    font-size: 0.6em;
  }
`;

const MenuNum = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 610px) {
    font-size: 0.8em;
  }
  @media (max-width: 450px) {
    font-size: 0.6em;
  }
`;

const MenuTitle = styled(MenuNum)``;
const MenuDate = styled(MenuNum)``;

const NoticeList = styled.ul`
  width: 100%;
  min-height: 100px;
  border-radius: 20px;
`;

const NoticeListContents = styled.div`
  border-style: none;
  display: grid;
  align-items: center;
  grid-template-columns: 0.5fr 5fr 1fr;
  grid-template-rows: 30px;
  box-sizing: border-box;
  padding: 10px 10px;
  background-color: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.bgColor};
  font-size: 1em;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 5fr 1fr;
    grid-template-rows: 20px;
  }
  @media (max-width: 580px) {
    grid-template-columns: 1fr 4fr 1.3fr;
    grid-template-rows: 30px;
    padding: 0px 10px;
  }
  @media (max-width: 450px) {
    grid-template-columns: 1fr 4fr 1.3fr;
    grid-template-rows: 20px;
    font-size: 0.7em;
  }
  @media (max-width: 430px) {
    grid-template-columns: 1fr 3fr 2fr;
    grid-template-rows: 40px;
    font-size: 1.3em;
  }
`;

const NoticeListBoxContent = styled.div`
  display: flex;
  justify-content: center;
  &:first-child {
    justify-content: flex-start;
  }
  &:nth-child(2) {
    justify-content: flex-start;
  }
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 0.7em;
    margin-left: 10px;
  }
  @media (max-width: 580px) {
    font-size: 0.6em;
    margin-left: 10px;
  }
`;
