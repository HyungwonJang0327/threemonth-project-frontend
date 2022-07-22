import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const PackageFormDetail = () => {
  const { name, phonenumber, date, address, contents, ispackage, remark } =
    packageDetailForm;
  const [packageDetailForm, setPackageDetailForm] = useState({});
  // const params = useParams();

  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch(`/data/packageDetailFormData.json/formdetail/${params.id}`)
  //     .then((res) => res.json())
  //     .then((data) => setCakeDetailForm(data));
  // }, [params.id]);

  useEffect(() => {
    fetch("/data/packageDetailFormData.json")
      .then((res) => res.json())
      .then((data) => setPackageDetailForm(data));
  }, []);

  return (
    <PackageFormWrapper>
      <PackageFormWidth>
        <PackageFormTitle>패키지 신청서</PackageFormTitle>
        <PackageFormInputWrapper>
          <PackageFormName>이름</PackageFormName>
          <PackageFormNameDetailForm required name="name">
            {name}
          </PackageFormNameDetailForm>
          <PackageFormPhoneNumber>전화번호</PackageFormPhoneNumber>
          <PackageFormPhoneNumberDetailForm required name="phonenumber">
            {phonenumber}
          </PackageFormPhoneNumberDetailForm>
          <PackageFormDate>날짜</PackageFormDate>
          <PackageFormDateDiv>
            <PackageFormDateDetailForm required name="date">
              {date}
            </PackageFormDateDetailForm>
          </PackageFormDateDiv>
          <PackageFormAddress>주소</PackageFormAddress>
          <PackageFormAddressDetailForm required name="address">
            {address}
          </PackageFormAddressDetailForm>
          <PackageFormDescription>구성품</PackageFormDescription>
          <PackageFormDescriptionDetailForm required name="contents">
            {contents}
          </PackageFormDescriptionDetailForm>
          <PackageFormIsPackage>포장 유무</PackageFormIsPackage>
          <PackageFormIsPackageDetailForm name="ispackage" required>
            {ispackage}
          </PackageFormIsPackageDetailForm>
          <PackageFormRemark>비고</PackageFormRemark>
          <PackageFormRemarkDetailForm name="remark" required>
            {remark}
          </PackageFormRemarkDetailForm>
        </PackageFormInputWrapper>

        <PackageFormBtnWrap>
          <PackageFormBtn
            onClick={() => {
              navigate("/formlist");
            }}
          >
            목록으로
          </PackageFormBtn>
          <PackageFormBtn>주문확인</PackageFormBtn>
          <PackageFormUpdateBtn>수정</PackageFormUpdateBtn>
          <PackageFormDeleteBtn>삭제</PackageFormDeleteBtn>
        </PackageFormBtnWrap>
      </PackageFormWidth>
    </PackageFormWrapper>
  );
};

export default PackageFormDetail;

const PackageFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 800px;
  margin: 100px 0;
  color: #331211;
`;
const PackageFormWidth = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
`;
const PackageFormTitle = styled.p`
  font-size: 30px;
`;
const PackageFormInputWrapper = styled.form`
  display: grid;
  justify-content: center;
  grid-template-rows: repeat(7, 100px);
  grid-template-columns: 1fr 6fr;
  box-sizing: border-box;
  margin-top: 50px;
  width: 100%;
  color: #331211;
  border: 7px solid #f1e6d1;
`;

const PackageFormName = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f1e6d1;
`;
const PackageFormNameDetailForm = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-style: none;
  border-bottom: 1px solid #f1e6d1;
  font-size: 17px;
  &:focus {
    outline: none;
  }
`;

const PackageFormPhoneNumber = styled(PackageFormName)``;
const PackageFormPhoneNumberDetailForm = styled(PackageFormNameDetailForm)``;

const PackageFormDate = styled(PackageFormName)``;
const PackageFormDateDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.bgColor};
`;
const PackageFormDateDetailForm = styled(PackageFormNameDetailForm)`
  border: none;
`;

const PackageFormAddress = styled(PackageFormName)``;
const PackageFormAddressDetailForm = styled(PackageFormNameDetailForm)``;

const PackageFormDescription = styled(PackageFormName)``;
const PackageFormDescriptionDetailForm = styled(PackageFormNameDetailForm)``;

const PackageFormIsPackage = styled(PackageFormName)``;
const PackageFormIsPackageDetailForm = styled(PackageFormNameDetailForm)``;

const PackageFormRemark = styled(PackageFormName)``;
const PackageFormRemarkDetailForm = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-style: none;
  border-bottom: 1px solid #f1e6d1;
  font-size: 17px;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const PackageFormBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PackageFormBtn = styled.button`
  border-style: none;
  margin-top: 100px;
  margin-left: 10px;
  width: 200px;
  height: 50px;
  border-radius: 10px;
  font-size: 20px;
  background-color: #ecc987;
  color: #331211;
  font-weight: bold;
  font-family: ${({ theme }) => theme.fontFamily};
`;
const PackageFormUpdateBtn = styled.button`
  border-style: none;
  margin-top: 100px;
  margin-left: 10px;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  font-size: 20px;
  background-color: #ecc987;
  color: #331211;
  font-weight: bold;
  font-family: ${({ theme }) => theme.fontFamily};
`;

const PackageFormDeleteBtn = styled(PackageFormUpdateBtn)``;