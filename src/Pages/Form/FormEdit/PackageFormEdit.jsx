import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { USER_TOKEN } from "../../../config";
import { useParams } from "react-router";

const PackageFormEdit = ({ editData }) => {
  const { is_staff } = editData;
  const navigate = useNavigate();
  const { formId } = useParams();
  const [packageEditForm, setPackageEditForm] = useState(editData);
  const {
    title,
    customer_name,
    contact,
    packageorders,
    additional_explanation,
  } = packageEditForm;

  const [packageEditDetailForm, setPackageEditDetailForm] =
    useState(packageorders);
  const { delivery_date, is_packaging, delivery_location, purpose } =
    packageEditDetailForm;
  let { orderedproducts } = packageEditDetailForm;

  const [updateList, setUpdateList] = useState(orderedproducts);

  const packageEditFormHandleInput = (e) => {
    const { name, value } = e.target;
    setPackageEditForm({
      ...packageEditForm,
      [name]: value,
    });
  };
  const packageEditFormDetailHandleInput = (e) => {
    const { name, value } = e.target;
    setPackageEditDetailForm({
      ...packageEditDetailForm,
      [name]: value,
    });
  };
  const handlePackageCheckbox = (value, id) => {
    const productIdx = updateList.findIndex((list) => list.product_id === id);
    const newArr = [...updateList];
    newArr[productIdx].buying = value;
    setUpdateList(newArr);
  };

  const minDate = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);
  const countDays =
    (new Date(delivery_date).getTime() - new Date(minDate).getTime()) /
    (1000 * 3600 * 24);

  const packageEditFormRequest = (e) => {
    const { additional_explanation, contact, customer_name, title, type } =
      packageEditForm;
    const { delivery_date, delivery_location, is_packaging, purpose } =
      packageEditDetailForm;
    orderedproducts = [...updateList].filter((x) => x.buying === true);
    const checkValue =
      additional_explanation &&
      contact &&
      customer_name &&
      title &&
      type &&
      delivery_date &&
      delivery_location &&
      is_packaging &&
      purpose;
    const lengthCheck =
      title.length < 50 &&
      additional_explanation.length < 300 &&
      delivery_location.length < 100 &&
      is_packaging.length < 100 &&
      purpose.length < 200;
    e.preventDefault();
    if (checkValue) {
      if (lengthCheck) {
        if (countDays > 2) {
          if (window.confirm("수정하시겠습니까?")) {
            fetch(`http://15.164.163.31:8001/orders/${formId}`, {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${USER_TOKEN}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                additional_explanation,
                contact,
                customer_name,
                title,
                purpose,
                type,
                delivery_date,
                delivery_location,
                is_packaging,
                orderedproducts,
              }),
            }).then((res) => {
              if (res.status === 200) {
                navigate(`/formdetail/${formId}`, {
                  state: { checkValid: true },
                });
              } else {
                alert("다시 시도해 주세요");
                navigate(`/orders/${formId}`, { state: { checkValid: true } });
              }
            });
          }
        } else {
          alert("신청일로부터 최소 3일 후 날짜부터 신청이 가능합니다.");
        }
      } else {
        alert("글자 수를 확인해 주세요.");
      }
    } else {
      alert("빈칸을 확인해 주세요");
    }
  };
  const packageEditFormStaffRequest = (e) => {
    const { additional_explanation, contact, customer_name, title, type } =
      packageEditForm;
    const { delivery_date, delivery_location, is_packaging, purpose } =
      packageEditDetailForm;
    orderedproducts = [...updateList].filter((x) => x.buying === true);
    const checkValue =
      additional_explanation &&
      contact &&
      customer_name &&
      title &&
      type &&
      delivery_date &&
      delivery_location &&
      is_packaging &&
      purpose;
    const lengthCheck =
      title.length < 50 &&
      additional_explanation.length < 300 &&
      delivery_location.length < 100 &&
      is_packaging.length < 100 &&
      purpose.length < 200;
    e.preventDefault();
    if (checkValue) {
      if (lengthCheck) {
        if (window.confirm("수정하시겠습니까?")) {
          fetch(`http://15.164.163.31:8001/orders/${formId}`, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${USER_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              additional_explanation,
              contact,
              customer_name,
              title,
              purpose,
              type,
              delivery_date,
              delivery_location,
              is_packaging,
              orderedproducts,
              status: "confirmed",
            }),
          }).then((res) => {
            if (res.status === 200) {
              navigate(`/formdetail/${formId}`, {
                state: { checkValid: true },
              });
            } else {
              alert("다시 시도해 주세요");
              navigate(`/orders/${formId}`, { state: { checkValid: true } });
            }
          });
        }
      } else {
        alert("글자 수를 확인해 주세요.");
      }
    } else {
      alert("빈칸을 확인해 주세요");
    }
  };

  return (
    <PackageEditFormWrapper>
      <PackageEditFormWidth>
        <PackageEditFormTitle>기프트박스 신청내역 수정</PackageEditFormTitle>
        <PackageEditFormInputWrapper>
          <PackageEditFormName>글 제목</PackageEditFormName>
          <PackageEditFormNameInput
            placeholder="제목을 입력해 주세요"
            required
            name="title"
            onChange={packageEditFormHandleInput}
            value={title}
          />
          <PackageEditFormPurpose>프로모션 목적</PackageEditFormPurpose>
          <PackageEditFormPurposeInput
            placeholder="ex) 기업 행사, 결혼 답례품 등 / 최대 200자입니다."
            required
            name="purpose"
            onChange={packageEditFormDetailHandleInput}
            value={purpose}
          />

          <PackageEditFormName>이름</PackageEditFormName>
          <PackageEditFormNameInput
            placeholder="이름을 입력해 주세요"
            required
            name="customer_name"
            onChange={packageEditFormHandleInput}
            value={customer_name}
          />
          <PackageEditFormPhoneNumber>전화번호</PackageEditFormPhoneNumber>
          <PackageEditFormPhoneNumberInput
            placeholder="전화번호를 입력해 주세요"
            required
            name="contact"
            onChange={packageEditFormHandleInput}
            value={contact}
          />
          <PackageEditFormDate>날짜</PackageEditFormDate>
          <PackageEditFormDateDiv>
            <PackageEditFormDateInput
              placeholder="날짜를 입력해 주세요"
              required
              type="date"
              name="delivery_date"
              min={minDate.toString()}
              onChange={packageEditFormDetailHandleInput}
              value={delivery_date}
            />
          </PackageEditFormDateDiv>
          <PackageEditFormAddress>주소</PackageEditFormAddress>
          <PackageEditFormAddressInput
            placeholder="주소를 입력해 주세요 최대 100자입니다."
            required
            name="delivery_location"
            onChange={packageEditFormDetailHandleInput}
            value={delivery_location}
          />
          <PackageEditFormDescription>구성품</PackageEditFormDescription>
          <PackageEditFormDescriptionDiv>
            {orderedproducts
              .filter((product) => product.product_id !== 14)
              .map((product, idx) => (
                <InputWrap key={idx}>
                  <PackageEditFormDescriptionInput
                    type="checkbox"
                    checked={product.buying}
                    onChange={(e) =>
                      handlePackageCheckbox(
                        e.target.checked,
                        product.product_id
                      )
                    }
                  />
                  <PackageEditFormDescriptionList>
                    {product.product_name}
                  </PackageEditFormDescriptionList>
                </InputWrap>
              ))}
          </PackageEditFormDescriptionDiv>
          <PackageEditFormIsPackage>패키지 유무</PackageEditFormIsPackage>
          <PackageEditFormIsPackageInput
            placeholder="패키지 유무를 입력해 주세요. 종이 포장으로 선택할 시 별도의 포장 요금이 추가되지 않습니다."
            required
            name="is_packaging"
            onChange={packageEditFormDetailHandleInput}
            value={is_packaging}
          />
          <PackageEditFormRemark>기타사항</PackageEditFormRemark>
          <PackageEditFormRemarkInput
            placeholder="남겨주실 말을 입력해 주세요 최대 300자 입니다."
            name="additional_explanation"
            required
            onChange={packageEditFormHandleInput}
            value={additional_explanation}
          />
        </PackageEditFormInputWrapper>
        <PackageFormBtnWrap>
          <PackageEditFormBtn onClick={packageEditFormRequest}>
            수정하기
          </PackageEditFormBtn>
          {is_staff && (
            <PackageFormBtnStaffOnly>
              <PackageFormBtn onClick={packageEditFormStaffRequest}>
                컨펌 완료!
              </PackageFormBtn>
              <PackageFormBtnNotion>
                컨펌 완료 버튼은 더 이상 수정 사항이 없을 경우에만 눌러 주세요!
              </PackageFormBtnNotion>
            </PackageFormBtnStaffOnly>
          )}
        </PackageFormBtnWrap>
      </PackageEditFormWidth>
    </PackageEditFormWrapper>
  );
};

export default PackageFormEdit;
const PackageEditFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 800px;
  margin: 100px 0;
  color: ${({ theme }) => theme.fontColor};
`;
const PackageEditFormWidth = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
`;
const PackageEditFormTitle = styled.p`
  font-size: 30px;
`;
const PackageEditFormInputWrapper = styled.form`
  display: grid;
  justify-content: center;
  grid-template-rows: repeat(10, 100px);
  grid-template-columns: 1fr 6fr;
  box-sizing: border-box;
  margin-top: 50px;
  width: 100%;
  color: ${({ theme }) => theme.fontColor};
  border: 7px solid ${({ theme }) => theme.bgColor};
`;

const PackageEditFormName = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.bgColor};
`;
const PackageEditFormNameInput = styled.input`
  border-style: none;
  border-bottom: 1px solid ${({ theme }) => theme.bgColor};
  font-size: 17px;
  font-family: ${({ theme }) => theme.fontFamily};
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-family: ${({ theme }) => theme.fontFamily};
  }
`;

const PackageEditFormPurpose = styled(PackageEditFormName)``;
const PackageEditFormPurposeInput = styled(PackageEditFormNameInput)``;

const PackageEditFormPhoneNumber = styled(PackageEditFormName)``;
const PackageEditFormPhoneNumberInput = styled(PackageEditFormNameInput)``;

const PackageEditFormDate = styled(PackageEditFormName)``;
const PackageEditFormDateDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.bgColor};
`;
const PackageEditFormDateInput = styled(PackageEditFormNameInput)`
  border: none;
`;

const PackageEditFormAddress = styled(PackageEditFormName)``;
const PackageEditFormAddressInput = styled(PackageEditFormNameInput)``;

const PackageEditFormDescription = styled(PackageEditFormName)`
  grid-row: 7/9;
`;
const PackageEditFormDescriptionDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-row: 7/9;
  border-style: none;
  border-bottom: 1px solid ${({ theme }) => theme.bgColor};
  font-size: 17px;
  resize: none;
  font-family: ${({ theme }) => theme.fontFamily};
`;

const InputWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 180px;
`;
const PackageEditFormDescriptionInput = styled.input``;
const PackageEditFormDescriptionList = styled.p``;

const PackageEditFormIsPackage = styled(PackageEditFormName)``;
const PackageEditFormIsPackageInput = styled(PackageEditFormNameInput)``;

const PackageEditFormRemark = styled(PackageEditFormName)`
  grid-row: 10/11;
`;
const PackageEditFormRemarkInput = styled(PackageEditFormNameInput)`
  grid-row: 10/11;
`;

const PackageEditFormBtn = styled.button`
  border-style: none;
  margin-top: 100px;
  width: 200px;
  height: 50px;
  border-radius: 10px;
  font-size: 20px;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  font-weight: bold;
  font-family: ${({ theme }) => theme.fontFamily};
  cursor: pointer;
`;

const PackageFormBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PackageFormBtn = styled.button`
  border-style: none;
  margin-top: 100px;
  width: 200px;
  height: 50px;
  border-radius: 10px;
  font-size: 20px;
  margin-right: 20px;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  font-weight: bold;
  font-family: ${({ theme }) => theme.fontFamily};
  cursor: pointer;
`;
const PackageFormBtnStaffOnly = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PackageFormBtnNotion = styled.p`
  margin-top: 10px;
  font-size: 17px;
  color: red;
`;
