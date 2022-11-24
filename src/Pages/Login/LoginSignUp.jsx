import axios from "axios";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const LoginSignUp = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordcheck: "",
    phone: "",
  });
  const [phoneChecked, setPhoneChecked] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const { nickname, email, password, passwordcheck, phone } = inputValue;

  const phoneValid = (e) => {
    e.preventDefault();
    axios.post(`/`, {
      body: JSON.stringify({ phone })
        .then((res) => {
          if (res.status === 201) {
            setPhoneChecked(true);
          } else if (res.status === 401) {
            alert("인증 실패!");
            setPhoneChecked(false);
          }
        })
        .then((data) => {
          sendNumber(data.access_number);
        }),
    });
  };

  const sendNumber = (number) => {
    axios.post(``, {
      body: JSON.stringify({ number })
        .then((res) => {
          if (res.status === 200) {
            alert("인증성공");
          } else {
            alert("인증실패!");
          }
        })
        .then((res) => {
          res.json();
        }),
    });
  };

  const signUpCheck =
    inputValue.nickname.trim().length > 20 &&
    inputValue.email.includes("@") &&
    inputValue.password.match(/^(?=.*[a-zA-Z])((?=.*\d)).{8,16}$/);

  const nicknameInputInValid = inputValue.nickname.trim().length > 20;

  const signUpSubmit = (e) => {
    e.preventDefault();
    if (phoneValid) {
      if (signUpCheck) {
        axios
          .post("", {
            body: JSON.stringify({
              email,
              nickname,
              password,
              phone,
            }),
          })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "success") {
              alert("회원에 가입되셨습니다!");
              navigate("./loginpage");
            }
          });
      }
    }
  };

  return (
    <Container>
      <SingupContainer>
        <SignupWrapper>
          <SignupTitle>회원가입</SignupTitle>
          <SignupSub>다음 빈칸을 채워주세요!</SignupSub>
          <SignupFormCard>
            <SignupFormNickName>
              <FormNickNameLabel>닉네임</FormNickNameLabel>
              <FormInput type="text" id="nickname" onChange={inputHandler} />
              {nicknameInputInValid && <p>입력칸에 별명을 입력해주세요!</p>}
            </SignupFormNickName>
            <SignupFormEmail>
              <FormEmailLabel>이메일</FormEmailLabel>
              <FormInput
                type="email"
                id="email"
                required
                onChange={inputHandler}
                // value={email}
              />
              {/* {emailInputInValid && <p>입력칸에 이메일을 입력해주세요!</p>} */}
            </SignupFormEmail>
            <SignupFormPW>
              <FormPWLabel>비밀번호</FormPWLabel>
              <FormInput
                type="password"
                required
                onChange={inputHandler}
                // value={password}
              />
              {/* {passwordInputInValid && <p>입력칸에 비밀번호를 입력해주세요!</p>} */}
            </SignupFormPW>
            <SignupFormPW>
              <FormPWCheckLabel>비밀번호 확인</FormPWCheckLabel>
              <FormInput
                type="password"
                required
                onChange={inputHandler}
                // value={passwordCheck}
              />
              {/* {passwordCheckInputInValid && (
                <p>입력칸에 비밀번호를 다시 입력해주세요!</p>
              )} */}
            </SignupFormPW>
            <SignupFormPhone>
              <FormPhoneLabel>폰번호</FormPhoneLabel>
              <FormInput
                type="text"
                required
                onChange={inputHandler}
                // value={phone}
              />
              <FormPhoneBtn onSubmit={phoneValid}>번호인증</FormPhoneBtn>
              {/* {phoneInputInValid && <p>입력칸에 폰번호를 입력해주세요!</p>} */}
            </SignupFormPhone>
            <SignupFormSubmit>
              <FormSubmit onClick={signUpSubmit}>가입하기</FormSubmit>
            </SignupFormSubmit>
          </SignupFormCard>
        </SignupWrapper>
      </SingupContainer>
    </Container>
  );
};

export default LoginSignUp;

const Container = styled.div`
  margin: 100px auto;
  /* background: #f1e6d1; */
`;

const SingupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignupTitle = styled.h1`
  color: ${({ theme }) => theme.fontColor};
  font-size: 2.5rem;
  padding-bottom: 20px;
`;

const SignupSub = styled.p`
  /* padding: 10px; */
  padding-bottom: 20px;
`;

const SignupWrapper = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  width: 700px;
  min-height: 500px;
  margin: 100px auto;
  background: #f1e6d1;
  border: 1px solid #000;
  padding: 50px 20px;
  /* padding: 50px 20px; */
`;

const SignupFormCard = styled.form`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center; */
`;

const SignupFormNickName = styled.div`
  /* padding: 1rem; */
  /* background: rgba(255, 255, 255, 0.5); */
`;

const SignupFormEmail = styled.div`
  /* padding: 1rem;
  background: rgba(255, 255, 255, 0.3); */
`;

const SignupFormPW = styled.div`
  /* padding: 1rem;
  background: rgba(255, 255, 255, 0.3); */
`;

const SignupFormPhone = styled.div`
  /* padding: 1rem;
  background: rgba(255, 255, 255, 0.3);
  padding-bottom: 10px; */
`;

const FormUserNameLabel = styled.label``;

const FormNickNameLabel = styled.label`
  /* background: rgba(255, 255, 255, 0.5); */
`;

const FormEmailLabel = styled.label``;

const FormPWLabel = styled.label``;

const FormPWCheckLabel = styled.label``;

const FormPhoneLabel = styled.label``;

const FormInput = styled.input`
  border: none;
  outline: none;
  padding: 20px 30px;
  background: #f1e6d1;

  border-radius: 10px;
  /* padding-left: calc(1rem * 3.5); */
  background: rgba(255, 255, 255, 0.5);
  margin-left: 20px;
  margin-bottom: 20px;
`;

const SignupFormSubmit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const FormSubmit = styled.button`
  border: none;
  outline: none;
  padding: 1rem 1.5rem;
  border-radius: 100px;
  background: ${({ theme }) => theme.fontColor};
  color: ${({ theme }) => theme.bgColor};
`;

const FormPhoneBtn = styled.button`
  border: none;
  outline: none;
  padding: 1rem 1.5rem;
  margin: 0px 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.fontColor};
  color: ${({ theme }) => theme.bgColor};
`;
