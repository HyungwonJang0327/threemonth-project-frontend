import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import styled from "styled-components";
import Loading from "../../../components/Loading";
import { API, USER_TOKEN } from "../../../config";

const CafeFormEdit = ({ editData }) => {
  const { is_staff } = editData;
  const navigate = useNavigate();
  const { formId } = useParams();
  const [cafeEditList, setCafeEditList] = useState(editData);
  const { CAFE_EDIT_GET, FORM_EDIT_PATCH } = API;

  const [editPruductList, setEditProductList] = useState([
    {
      id: 0,
      product_name: "",
    },
  ]);

  useEffect(() => {
    axios.get(`${CAFE_EDIT_GET}`).then((res) => {
      if (res.status === 200) {
        const { data } = res;
        setEditProductList([...data].filter((x) => x.id !== 14));
      }
    });
  }, [CAFE_EDIT_GET]);

  const { title, cafeorders, contact, additional_explanation, customer_name } =
    cafeEditList;

  const [cafeOrders, setCafeOrders] = useState(cafeorders);

  const cafeFormHandleInput = (e) => {
    const { name, value } = e.target;
    setCafeEditList({
      ...cafeEditList,
      [name]: value,
    });
  };
  const cafeFormOrdersHandleInput = (e) => {
    const { name, value } = e.target;
    setCafeOrders({
      ...cafeOrders,
      [name]: value,
    });
  };
  const {
    cafename,
    cafe_owner_name,
    corporate_registration_num,
    product_explanation,
    cafe_location,
  } = cafeOrders;

  const checkValue =
    title &&
    additional_explanation &&
    contact &&
    customer_name &&
    cafename &&
    cafe_owner_name &&
    corporate_registration_num &&
    product_explanation &&
    cafe_location;
  const submitCafeEditData = {
    title,
    cafename,
    corporate_registration_num,
    cafe_owner_name,
    customer_name,
    cafe_location,
    product_explanation,
    additional_explanation,
    type: "cafe",
    contact,
  };
  const cafeFormRequest = (e) => {
    e.preventDefault();
    if (checkValue) {
      if (window.confirm("수정하시겠습니까?")) {
        axios
          .patch(
            `${FORM_EDIT_PATCH}/${formId}`,
            { ...submitCafeEditData },
            {
              headers: {
                Authorization: `Bearer ${USER_TOKEN}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              navigate(`/formdetail/${formId}`, {
                state: { checkValue: true },
              });
            } else {
              alert("다시 시도해 주세요");
              navigate(`/formdetail/${formId}/edit`, {
                state: { checkValue: true },
              });
            }
          });
      }
    } else {
      alert("빈칸을 확인해 주세요");
    }
  };
  const cafeFormStaffRequest = (e) => {
    e.preventDefault();
    if (checkValue) {
      if (window.confirm("수정하시겠습니까?")) {
        axios
          .patch(
            `${FORM_EDIT_PATCH}/${formId}`,
            { ...submitCafeEditData, status: "confirmed" },
            {
              headers: {
                Authorization: `Bearer ${USER_TOKEN}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              navigate(`/formdetail/${formId}`, {
                state: { checkValue: true },
              });
            } else {
              alert("다시 시도해 주세요");
              navigate(`/formdetail/${formId}/edit`, {
                state: { checkValue: true },
              });
            }
          });
      }
    } else {
      alert("빈칸을 확인해 주세요");
    }
  };
  if (cafeEditList.id === 0) {
    return <Loading />;
  }
  return (
    <CafeFormWrapper>
      <CafeFormWidth>
        <CafeFormTitle>납품 제휴 신청내역 수정</CafeFormTitle>
        <CafeFormInputWrapper>
          <CafeFormInputTitle>글 제목</CafeFormInputTitle>
          <CafeFormInputTitleInput
            type="text"
            onChange={cafeFormHandleInput}
            placeholder="글 제목을 입력해 주세요"
            value={title}
            name="title"
            required
          />
          <CafeFormCafeName>카페 이름</CafeFormCafeName>
          <CafeFormCafeNameInput
            onChange={cafeFormOrdersHandleInput}
            value={cafeOrders.cafename}
            placeholder="카페 이름을 입력해 주세요"
            name="cafename"
            required
          />
          <CafeFormBusinessNumber>사업자 번호</CafeFormBusinessNumber>
          <CafeFormBusinessNumberInput
            onChange={cafeFormOrdersHandleInput}
            placeholder="사업자 번호를 입력해 주세요"
            value={cafeOrders.corporate_registration_num}
            name="corporate_registration_num"
            required
          />
          <CafeFormCEOName>대표 이름</CafeFormCEOName>
          <CafeFormCEONameInput
            onChange={cafeFormOrdersHandleInput}
            value={cafeOrders.cafe_owner_name}
            placeholder="대표 이름을 입력해 주세요"
            name="cafe_owner_name"
            required
          />
          <CafeFormManagerName>담당자 이름</CafeFormManagerName>
          <CafeFormManagerNameInput
            onChange={cafeFormHandleInput}
            value={customer_name}
            placeholder="담당자 이름을 입력해 주세요"
            name="customer_name"
            required
          />

          <CafeFormInputContact>카페 전화번호</CafeFormInputContact>
          <CafeFormInputContactInput
            onChange={cafeFormHandleInput}
            value={contact}
            placeholder="카페 연락처를 입력해 주세요"
            name="contact"
            required
          />

          <CafeFormCafeAddress>주소</CafeFormCafeAddress>
          <CafeFormCafeAddressInput
            onChange={cafeFormOrdersHandleInput}
            value={cafeOrders.cafe_location}
            name="cafe_location"
            placeholder="주소를 입력해 주세요"
            required
          />
          <CafeFormProductListName>상품 종류</CafeFormProductListName>
          <CafeFormProductListDiv>
            {editPruductList.map((x, idx) => (
              <CafeFormProductList key={idx}>
                {x.product_name}
              </CafeFormProductList>
            ))}
            <CafeFormProductListNotion>
              원하시는 상품을 하단에 적어주세요
            </CafeFormProductListNotion>
          </CafeFormProductListDiv>
          <CafeFormDescription>
            원하는 제품과 <br /> 수량
          </CafeFormDescription>

          <CafeFormDescriptionInput
            placeholder="ex) 플레인 휘낭시에 300개 / 월, 앙버터 스콘 100개 / 주"
            onChange={cafeFormOrdersHandleInput}
            value={cafeOrders.product_explanation}
            name="product_explanation"
            required
          />

          <CafeFormRemark>기타사항</CafeFormRemark>
          <CafeFormRemarkInput
            placeholder="남겨주실 말을 입력해 주세요."
            onChange={cafeFormHandleInput}
            value={additional_explanation}
            name="additional_explanation"
            required
          />
        </CafeFormInputWrapper>
        <CafeFormBtnWrap>
          <CafeFormBtn onClick={cafeFormRequest}>수정하기</CafeFormBtn>
          {is_staff && (
            <CafeFormBtnStaffOnly>
              <CafeFormBtn onClick={cafeFormStaffRequest}>
                컨펌 완료!
              </CafeFormBtn>
              <CafeFormBtnNotion>
                컨펌 완료 버튼은 더 이상 <br />
                수정 사항이 없을 경우에만 눌러 주세요!
              </CafeFormBtnNotion>
            </CafeFormBtnStaffOnly>
          )}
        </CafeFormBtnWrap>
      </CafeFormWidth>
    </CafeFormWrapper>
  );
};

export default CafeFormEdit;

const CafeFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 800px;
  margin: 100px 0;
  color: ${({ theme }) => theme.fontColor};
  font-size: 17px;
`;
const CafeFormWidth = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
`;
const CafeFormTitle = styled.p`
  font-size: 30px;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;
const CafeFormInputWrapper = styled.form`
  display: grid;
  justify-content: center;
  grid-template-rows: repeat(11, minmax(100px, auto));
  grid-template-columns: 1fr 5fr;
  box-sizing: border-box;
  margin-top: 50px;
  width: 100%;
  color: ${({ theme }) => theme.fontColor};
  border: 7px solid ${({ theme }) => theme.bgColor};
  @media (max-width: 600px) {
    grid-template-rows: repeat(20, minmax(50px, auto));
    grid-template-columns: 0.9fr;
  }
`;
const CafeFormCafeName = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.bgColor};
  font-size: 17px;
  @media (max-width: 600px) {
    font-size: 13px;
  }
`;
const CafeFormCafeNameInput = styled.input.attrs((props) => ({
  type: "text",
  maxLength: 30,
}))`
  border-style: none;
  border-bottom: 1px solid ${({ theme }) => theme.bgColor};
  font-size: 17px;

  &:focus {
    outline: none;
  }
  @media (max-width: 600px) {
    font-size: 13px;
  }

  &::placeholder {
  }
`;

const CafeFormInputTitle = styled(CafeFormCafeName)``;
const CafeFormInputTitleInput = styled(CafeFormCafeNameInput).attrs(
  (props) => ({
    type: "text",
    maxLength: 49,
  })
)``;

const CafeFormInputContact = styled(CafeFormCafeName)``;
const CafeFormInputContactInput = styled(CafeFormCafeNameInput).attrs(
  (props) => ({
    type: "text",
    maxLength: 49,
  })
)``;

const CafeFormBusinessNumber = styled(CafeFormCafeName)``;
const CafeFormBusinessNumberInput = styled(CafeFormCafeNameInput).attrs(
  (props) => ({
    type: "text",
    maxLength: 49,
  })
)``;
const CafeFormCEOName = styled(CafeFormCafeName)``;
const CafeFormCEONameInput = styled(CafeFormCafeNameInput).attrs((props) => ({
  type: "text",
  maxLength: 30,
}))``;
const CafeFormManagerName = styled(CafeFormCafeName)``;
const CafeFormManagerNameInput = styled(CafeFormCafeNameInput).attrs(
  (props) => ({
    type: "text",
    maxLength: 30,
  })
)``;
const CafeFormCafeAddress = styled(CafeFormCafeName)``;
const CafeFormCafeAddressInput = styled(CafeFormCafeNameInput).attrs(
  (props) => ({
    type: "text",
    maxLength: 99,
  })
)``;

const CafeFormProductListName = styled(CafeFormCafeName)``;
const CafeFormProductListDiv = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.bgColor};
  box-sizing: border-box;
  padding: 20px 0;
`;
const CafeFormProductList = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 150px;
  @media (max-width: 600px) {
    font-size: 14px;
    width: 100px;
  }
`;
const CafeFormProductListNotion = styled.p`
  font-size: 14px;
  color: red;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const CafeFormDescription = styled(CafeFormCafeName)`
  text-align: center;
`;
const CafeFormDescriptionInput = styled.textarea`
  border-style: none;
  border-bottom: 1px solid ${({ theme }) => theme.bgColor};
  font-size: 17px;
  resize: none;

  &:focus {
    outline: none;
  }
  &::placeholder {
  }
  @media (max-width: 600px) {
    font-size: 13px;
  }
`;
const CafeFormRemark = styled(CafeFormCafeName)``;
const CafeFormRemarkInput = styled(CafeFormDescriptionInput).attrs((props) => ({
  type: "text",
  maxLength: 299,
}))``;

const CafeFormBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const CafeFormBtn = styled.button`
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
  cursor: pointer;
  @media (max-width: 600px) {
    width: 150px;
    height: 40px;
    font-size: 15px;
  }
`;
const CafeFormBtnStaffOnly = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CafeFormBtnNotion = styled.p`
  margin-top: 10px;
  font-size: 17px;
  color: red;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 15px;
  }
`;
