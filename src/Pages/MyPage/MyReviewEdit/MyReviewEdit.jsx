import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { API, USER_TOKEN } from "../../../config";

const MyReviewEdit = () => {
  const { REVIEW_EDIT } = API;
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const [reviewEditData, setReviewEditData] = useState({
    content: "",
    img_url: "",
  });
  const [imgValue, setImgValue] = useState({ name: "" });
  const [previewImg, setPreviewImg] = useState(null);
  const [deleteValue, setDeleteValue] = useState(false);
  const { content, img_url } = reviewEditData;

  useEffect(() => {
    axios
      .get(`${REVIEW_EDIT}/${reviewId}`)
      .then((res) => setReviewEditData(res.data));
  }, [reviewId]);
  const uploadEditFile = (e) => {
    const { name, value } = e.target;
    setReviewEditData({ ...reviewEditData, [name]: value });
  };

  const postpatch = () => {
    const existURL = () => {
      const formData = new FormData();
      formData.append("content", reviewEditData.content);
      if (imgValue.name !== "") {
        formData.append("img", imgValue);
      } else {
        const img = true;
        formData.append("img_delete", [img]);
      }
      return formData;
    };
    const noURL = () => {
      const formData = new FormData();
      formData.append("content", reviewEditData.content);
      if (imgValue.name !== "") {
        formData.append("img", imgValue);
      }
      return formData;
    };
    const imgURL = img_url ? existURL() : noURL();
    const patchAPI = imgURL.get("img_delete")
      ? `${REVIEW_EDIT}/${reviewId}?img_delete=[img]`
      : `${REVIEW_EDIT}/${reviewId}`;
    axios
      .patch(`${patchAPI}`, imgURL, {
        headers: {
          Authorization: `Bearer ${USER_TOKEN}`,
        },
      })
      .catch((error) => error(error.response))
      .then((res) => setReviewEditData(res.data));
    navigate("/mypage");
  };
  const imgHandle = (e) => {
    const { files } = e.target;
    setImgValue(files[0]);
    previewURLImg(files[0]);
    setDeleteValue(false);
  };

  const previewURLImg = (prev) => {
    const reader = new FileReader();
    reader.readAsDataURL(prev);
    reader.onloadend = () => {
      setPreviewImg(reader.result);
    };
    return previewImg;
  };
  const deleteHandler = () => {
    setImgValue({ name: "" });
    setPreviewImg(null);
    setDeleteValue(true);
  };

  return (
    <MyReviewInputContainer>
      <MyReviewInputWrap>
        <MyReviewInputTitle>리뷰 수정</MyReviewInputTitle>
        <ReviewInputContainer>
          <ReviewInputWrap>
            <Wrap>
              <ReviewInputContent
                type="text"
                name="content"
                placeholder="리뷰를 입력해주세요."
                value={content}
                onChange={uploadEditFile}
              />
              <ReviewInputFileContent
                type="file"
                onChange={imgHandle}
                accept="image/*"
                name="img"
                id="imageinput"
                style={{ display: "none" }}
              />

              {img_url ? (
                deleteValue ? (
                  <div />
                ) : (
                  <PreviewImg
                    src={previewImg ? previewImg : img_url && img_url}
                  />
                )
              ) : imgValue ? (
                <PreviewImg
                  src={previewImg ? previewImg : img_url && img_url}
                />
              ) : (
                <div />
              )}
              <ReviewInputFileBtnWrap>
                {!previewImg &&
                  (img_url ? (
                    <ReviewInputFileBtnContent
                      style={{ marginBottom: "20px" }}
                      htmlFor="imageinput"
                    >
                      파일 변경하기 Click
                    </ReviewInputFileBtnContent>
                  ) : (
                    <ReviewInputFileBtnContent
                      style={{ marginBottom: "20px" }}
                      htmlFor="imageinput"
                    >
                      파일 추가하기 Click
                    </ReviewInputFileBtnContent>
                  ))}

                {img_url
                  ? !deleteValue && (
                      <ImgDelBtn onClick={deleteHandler}>삭제</ImgDelBtn>
                    )
                  : !deleteValue && (
                      <ImgDelBtn onClick={deleteHandler}>삭제</ImgDelBtn>
                    )}
              </ReviewInputFileBtnWrap>
            </Wrap>

            <ReviewInputFileBtn onClick={postpatch}>
              리뷰 입력완료
            </ReviewInputFileBtn>
          </ReviewInputWrap>
        </ReviewInputContainer>
      </MyReviewInputWrap>
    </MyReviewInputContainer>
  );
};

export default MyReviewEdit;

const MyReviewInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 100px;
  color: ${({ theme }) => theme.fontColor};
  @media (max-width: 580px) {
    width: 100%;
  }
`;

const MyReviewInputWrap = styled.div`
  margin: 80px 0;
  width: 85%;
  @media (max-width: 580px) {
    width: 100%;
  }
`;
const MyReviewInputTitle = styled.p`
  font-size: 1.6em;
  @media (max-width: 580px) {
    padding: 0 20px;
  }
`;

const ReviewInputContainer = styled.div`
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  font-size: 16px;
  flex-direction: column;
  margin: 20px 0;
  border-radius: 10px;
  width: 100%;
  min-height: 350px;
  background-color: ${({ theme }) => theme.bgColor};
`;
const ReviewInputWrap = styled.div`
  display: grid;
  grid-template-rows: 50px;
  grid-template-columns: 5fr 1fr;
  @media (max-width: 400px) {
    grid-template-rows: 30px 30px;
    grid-template-columns: 1fr;
  }
`;
const Wrap = styled.form`
  margin-right: 20px;
  @media (max-width: 400px) {
    margin-right: 0px;
  }
`;

const ReviewInputContent = styled.input`
  border-style: none;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  font-size: 16px;
  padding-left: 20px;

  &:focus {
    outline: none;
  }
  @media (max-width: 1010px) {
    font-size: 0.8em;
  }
  @media (max-width: 640px) {
    font-size: 0.6em;
  }
`;

const ReviewInputFileContent = styled.input`
  margin-top: 20px;
`;
const ReviewInputFileBtnWrap = styled.div`
  display: flex;
`;

const ReviewInputFileBtnContent = styled.label`
  display: inline-block;
  text-align: center;
  align-items: center;
  cursor: pointer;
  border-style: none;
  padding: 10px;
  height: 40px;
  font-size: 14px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.bgColor};
  border: 2px solid ${({ theme }) => theme.fontColor};
  color: ${({ theme }) => theme.fontColor};
  @media (max-width: 900px) {
    font-size: 0.8em;
  }
  @media (max-width: 640px) {
    font-size: 0.6em;
    padding: 13px;
  }
`;

const PreviewImg = styled.img`
  width: 200px;
  margin-top: 35px;
  padding-left: 10px;
  @media (max-width: 450px) {
    width: 150px;
  }
  @media (max-width: 400px) {
    margin-top: 60px;
  }
`;

const ImgDelBtn = styled.button`
  border-style: none;
  text-align: center;
  width: 40px;
  height: 40px;
  font-size: 14px;
  margin-left: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.bgColor};
  border: 2px solid ${({ theme }) => theme.fontColor};
  color: ${({ theme }) => theme.fontColor};
  @media (max-width: 900px) {
    font-size: 0.8em;
  }
  @media (max-width: 640px) {
    font-size: 0.6em;
  }
`;

const ReviewInputFileBtn = styled.button`
  border-style: none;
  width: 70%;
  height: 100%;
  font-size: 16px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.bgColor};
  border: 2px solid ${({ theme }) => theme.fontColor};
  color: ${({ theme }) => theme.fontColor};
  @media (max-width: 1010px) {
    font-size: 0.8em;
  }
  @media (max-width: 855px) {
    font-size: 1em;
  }
  @media (max-width: 750px) {
    font-size: 0.8em;
  }
  @media (max-width: 640px) {
    font-size: 0.6em;
    width: 100%;
  }
  @media (max-width: 450px) {
    font-size: 0.6em;
    width: 100%;
  }
  @media (max-width: 435px) {
    font-size: 0.6em;
    width: 80%;
  }

  @media (max-width: 435px) {
    font-size: 0.6em;
    width: 80%;
  }
  @media (max-width: 400px) {
    font-size: 0.6em;
    width: 100%;
    margin: 10px 0;
  }
  @media (max-width: 365px) {
    font-size: 0.6em;
  }
  @media (max-width: 340px) {
    font-size: 0.5em;
  }
`;
