import React from "react";
import { useNavigate, useLocation } from "react-router";
import { USER_TOKEN } from "../config";
import styled from "styled-components";

const Footer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const cafeFormClickHandler = () => {
    if (USER_TOKEN) {
      navigate("/reserveform", { state: { formType: "cafe" } });
    } else {
      if (
        window.confirm("로그인이 필요한 서비스입니다. 로그인을 하시겠습니까?")
      ) {
        localStorage.setItem("prevpath", pathname);
        navigate("/loginpage");
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <FooterSns>
          <Title>Follow us</Title>
          <SnsContainer>
            <SnsWrapper>
              <Sns>
                <IconWrapper href="https://www.instagram.com/th_reemonths/">
                  <Icon src="/images/instagram-logo.png" />
                </IconWrapper>
                <SnsTitle>INSTAGRAM</SnsTitle>
              </Sns>
              <Sns>
                <IconWrapper href="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=%EB%9C%A8%EB%A6%AC%EB%A8%BC%EB%9C%A8">
                  <Icon src="/images/naver-logo.png" />
                </IconWrapper>
                <SnsTitle>NAVER</SnsTitle>
              </Sns>
            </SnsWrapper>
            <ButtonWrapper>
              <CafeFormButton onClick={cafeFormClickHandler}>
                카페납품 제휴
              </CafeFormButton>
              {/* <AdminButton>Admin</AdminButton> */}
            </ButtonWrapper>
          </SnsContainer>
        </FooterSns>
        <CompanyWrapper>
          <Company>
            <CompanyTitle>Business Hours</CompanyTitle>

            <Info>Mon - Wed, Fri - Sun </Info>
            <Info>Open 12:00 - Closed 20:00</Info>
            <Info>Every Thursday OFF</Info>

            <Rights>ⓒthreemonths. All Rights Reserved</Rights>
          </Company>

          <Company>
            <CompanyTitle>Threemonths's Info</CompanyTitle>

            <Info>BusinessName : 뜨리먼뜨</Info>
            <Info>Owner : 최주희</Info>
            <Info>BusinessNumber : 3661201580</Info>
            <Info>
              Address : 서울 강서구 등촌로5가길 40 뜨리먼뜨 (우 : 07740)
            </Info>
            <Info>Email : rse_0507@naver.com</Info>
            <Info>통신판매정보 : 2021-서울강서-0412</Info>
            <PrivacyWrap>
              <InfoPrivacy
                onClick={() => {
                  navigate("/privacy");
                }}
              >
                개인정보처리방침
              </InfoPrivacy>
              <InfoPrivacy
                onClick={() => {
                  navigate("/terms");
                }}
              >
                홈페이지 이용약관
              </InfoPrivacy>
            </PrivacyWrap>
          </Company>
        </CompanyWrapper>
      </Wrapper>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  width: 100%;
  min-height: 270px;
  margin: 0 auto;
  padding: 30px 0px;
  letter-spacing: 0.05em;

  background-color: ${({ theme }) => theme.bgColor};
  @media screen and (max-width: 768px) {
    min-height: 350px;
  }
  @media screen and (max-width: 520px) {
    min-height: 380px;
  }
  @media screen and (max-width: 450px) {
    min-height: 330px;
  }
  @media screen and (max-width: 320px) {
    min-height: 340px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 0 auto;
  width: 85%;
  @media screen and (max-width: 880px) {
    flex-direction: column-reverse;
  }
`;

const FooterSns = styled.div`
  @media screen and (max-width: 768px) {
    margin-bottom: 20px;
  }
  @media screen and (max-width: 500px) {
    margin-bottom: 0px;
  }
`;

const Title = styled.p`
  padding: 10px 0px;
  font-size: 1.3em;
  font-weight: 700;
  color: ${({ theme }) => theme.fontColor};
  @media screen and (max-width: 768px) {
    font-size: 1.2em;
  }
  @media screen and (max-width: 450px) {
    font-size: 1em;
  }
  @media screen and (max-width: 320px) {
    font-size: 0.7em;
  }
`;

const SnsContainer = styled.div`
  /* display: flex; */
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
  @media screen and (max-width: 520px) {
    flex-direction: column;
  }
  @media screen and (max-width: 450px) {
    flex-direction: column;
  }
  @media screen and (max-width: 320px) {
    flex-direction: column;
  }
`;
const SnsWrapper = styled.div`
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const Sns = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  @media screen and (max-width: 768px) {
    font-size: 1em;
    margin-right: 30px;
  }
  @media screen and (max-width: 450px) {
    font-size: 0.7em;
  }
  @media screen and (max-width: 320px) {
    font-size: 0.5em;
  }
`;

const SnsTitle = styled.div`
  padding: 5px 0px;
  font-size: 1.1em;
  color: ${({ theme }) => theme.fontColor};

  @media screen and (max-width: 450px) {
    font-size: 1em;
  }
  @media screen and (max-width: 320px) {
    font-size: 0.7em;
  }
`;

const Icon = styled.img`
  height: 25px;
  width: 25px;
  margin-right: 5px;
  border-radius: 15px;
  cursor: pointer;
`;
const ButtonWrapper = styled.div`
  /* @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  @media screen and (max-width: 520px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  @media screen and (max-width: 320px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  } */
`;

const CafeFormButton = styled.button`
  border-style: none;
  height: 35px;
  width: 100%;
  font-size: 1em;
  background-color: ${({ theme }) => theme.fontColor};
  color: ${({ theme }) => theme.bgColor};
  border-radius: 5px;
  margin-top: 5px;
  cursor: pointer;
  @media screen and (max-width: 950px) {
    margin-right: 15px;
  }
  @media screen and (max-width: 768px) {
    margin-right: 15px;
  }
  @media screen and (max-width: 540px) {
    font-size: 0.85em;
  }
  @media screen and (max-width: 495px) {
    font-size: 0.8em;
  }
`;
// const AdminButton = styled.button`
//   border-style: none;
//   height: 35px;
//   width: 85%;
//   font-size: 1em;
//   background-color: ${({ theme }) => theme.fontColor};
//   color: ${({ theme }) => theme.bgColor};
//   border-radius: 5px;
//   margin-top: 5px;
//   cursor: pointer;
//   @media screen and (max-width: 768px) {
//     margin-right: 15px;
//   }
//   @media screen and (max-width: 515px) {
//     font-size: 0.9em;
//   }
// `;
const IconWrapper = styled.a``;

const CompanyWrapper = styled.div`
  @media screen and (max-width: 2560px) {
    display: flex;
  }
`;

const Company = styled.div`
  @media screen and (max-width: 2560px) {
    margin-right: 100px;
  }
  @media screen and (max-width: 1400px) {
    margin-right: 0px;
  }
  @media screen and (max-width: 320px) {
    margin-bottom: 20px;
  }
`;

const CompanyTitle = styled(Title)``;

const Info = styled(Sns)`
  @media screen and (max-width: 768px) {
    margin-bottom: 5px;
  }
`;
const PrivacyWrap = styled.div`
  display: flex;
  padding-top: 10px;
`;
const InfoPrivacy = styled(Sns)`
  margin-right: 15px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    margin-bottom: 5px;
  }
  @media screen and (max-width: 360px) {
    font-size: 0.6em;
  }
  @media screen and (max-width: 320px) {
    margin-right: 10px;
    font-size: 0.4em;
  }
`;

const Rights = styled(Sns)`
  font-size: 1.2em;
  font-weight: 700;
  padding-top: 20px;
  color: ${({ theme }) => theme.fontColor};
  @media screen and (max-width: 1400px) {
    font-size: 1.2em;
    width: 80%;
  }
  @media screen and (max-width: 768px) {
    font-size: 1.1em;
  }
  @media screen and (max-width: 515px) {
    font-size: 0.8em;
  }
  @media screen and (max-width: 320px) {
    font-size: 0.7em;
  }
`;
