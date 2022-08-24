import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router";
import { USER_TOKEN } from "../../config";
import Loading from "../../components/Loading";
import NotValidBtn from "../../components/NotValidBtn";

const QnA = () => {
  const { qnaId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [qnaDetail, setQnaDetail] = useState({
    id: 0,
    content: "",
    title: "",
  });
  useEffect(() => {
    axios
      .get(`http://15.164.163.31:8001/announcements/QnA/${qnaId}`, {
        headers: {
          Authorization: `Bearer ${USER_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
      .catch((error) => {
        const { response } = error;
        if (response.status === 403) {
          alert("권한이 없습니다.");
          navigate(-1);
        } else {
          alert("다시 시도해 주세요.");
          navigate(-1);
        }
      })
      .then((res) => {
        console.log(res.data.qna_comments);
        setQnaDetail(res.data);
      });
  }, [qnaId, navigate]);

  const [qnaCommentValue, setQnaCommentValue] = useState("");
  const qnaCommentHandle = (e) => {
    setQnaCommentValue(e.target.value);
  };
  const { content, title, qna_comments } = qnaDetail;

  const [qnaCommentList, setQnaCommentList] = useState(qna_comments);
  useEffect(() => {
    setQnaCommentList(qna_comments);
  }, [qna_comments]);
  if (qnaDetail.id === 0) {
    return <Loading />;
  }
  if (location.state === null) {
    return <NotValidBtn />;
  }
  const QnADetailInput = () => {
    return {
      __html: content.replace(/\n/g, "<br>\n"),
    };
  };
  const postComment = () => {
    axios
      .post(
        `http://15.164.163.31:8001/announcements/QnA/${qnaId}/comments`,
        { content: qnaCommentValue },
        {
          headers: {
            Authorization: `Bearer ${USER_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      )
      .catch((error) => {
        alert(`${error.response.toString()}, 다시 시도해 주세요`);
      })
      .then(
        // (res) => {
        // if (res.status === 201) {
        window.location.reload()
        // setQnaCommentList([...qna_comments, res.data]);
        // setQnaCommentValue("");
        // document.getElementById("commentInput").value = null;
        // }
        // }
      );
  };
  return (
    <QnADetailWrap>
      <QnADetailWidth>
        <QnADetailTitle>{title}</QnADetailTitle>
        <QnADetailContent dangerouslySetInnerHTML={QnADetailInput()} />
        <QnADetailBtnWrap>
          <QnADetailEditBtn
            onClick={() => {
              navigate(`/qna/${qnaId}/edit`, { state: { checkValue: true } });
            }}
          >
            수정
          </QnADetailEditBtn>
          <QnADetailEditBtn
            onClick={() => {
              if (window.confirm("삭제하시겠습니까?")) {
                axios
                  .delete(
                    `http://15.164.163.31:8001/announcements/QnA/${qnaId}`,
                    {
                      headers: {
                        Authorization: `Bearer ${USER_TOKEN}`,
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then((res) => {
                    if (res.status === 204) {
                      alert("삭제되었습니다.");
                      navigate("/qnalist");
                    }
                  });
              }
            }}
          >
            삭제
          </QnADetailEditBtn>
        </QnADetailBtnWrap>
        <QnACommentWrap>
          {qnaCommentList &&
            qnaCommentList.map((x, idx) => (
              <QnACommentContents key={idx}>
                <QnACommentContent>{x.id}</QnACommentContent>
                <QnACommentContent>{x.content}</QnACommentContent>
                <QnACommentContent>
                  {x.created_at.slice(0, 10)}
                </QnACommentContent>
                <QnACommentContent>
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => {
                      if (window.confirm("삭제하시겠습니까?")) {
                        axios
                          .delete(
                            `http://15.164.163.31:8001/announcements/QnA/${qnaId}/comments/${x.id}`,
                            {
                              headers: {
                                Authorization: `Bearer ${USER_TOKEN}`,
                                "Content-Type": "application/json",
                              },
                            }
                          )
                          .then((res) => {
                            if (res.status === 204) {
                              window.location.reload();
                            }
                          });
                      }
                    }}
                  />
                </QnACommentContent>
              </QnACommentContents>
            ))}
          <QnACommentInputWrap>
            <QnACommentInput
              id="commentInput"
              onChange={qnaCommentHandle}
              placeholder="댓글을 입력해 주세요"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  postComment();
                }
              }}
            />
            <PostCommentBtn onClick={postComment}>댓글 입력</PostCommentBtn>
          </QnACommentInputWrap>
        </QnACommentWrap>
      </QnADetailWidth>
    </QnADetailWrap>
  );
};

export default QnA;

const QnADetailWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const QnADetailWidth = styled.div`
  width: 85%;
  min-height: 400px;
`;
const QnADetailTitle = styled.p`
  box-sizing: border-box;
  padding: 20px;
  font-size: 20px;
`;
const QnADetailContent = styled.div`
  box-sizing: border-box;
  padding: 20px;
  min-height: 200px;
  border: 4px solid ${({ theme }) => theme.bgColor};
`;
const QnADetailBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 30px 0;
`;
const QnADetailEditBtn = styled.button`
  border-style: none;
  width: 100px;
  height: 50px;
  font-size: 18px;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.bgColor};
  font-family: ${({ theme }) => theme.fontFamily};
  &:nth-child(2) {
    margin-left: 20px;
  }
`;
const QnACommentWrap = styled.div`
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  font-size: 16px;
  flex-direction: column;
  margin: 20px 0;
  border-radius: 10px;
  min-height: 100px;
  background-color: ${({ theme }) => theme.bgColor};
  font-family: ${({ theme }) => theme.fontFamily};
`;
const QnACommentInputWrap = styled.div`
  display: grid;
  grid-template-rows: 50px;
  grid-template-columns: 8fr 1fr;
  place-items: center;
  margin: 20px 0;
`;
const QnACommentInput = styled.input`
  border-style: none;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  font-size: 16px;
  padding-left: 20px;
  &:focus {
    outline: none;
  }
  font-family: ${({ theme }) => theme.fontFamily};
`;
const PostCommentBtn = styled.button`
  border-style: none;
  width: 70%;
  height: 100%;
  font-size: 16px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.bgColor};
  border: 2px solid ${({ theme }) => theme.fontColor};
  color: ${({ theme }) => theme.fontColor};
  font-family: ${({ theme }) => theme.fontFamily};
`;
const QnACommentContents = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 8fr 1fr 0.5fr;
  align-items: center;
  box-sizing: border-box;
  padding: 15px;
  border-bottom: 1px solid white;
  @media (max-width: 500px) {
    grid-template-columns: 1fr 5fr;
    padding: 10px;
  }
`;
const QnACommentContent = styled.p`
  display: grid;
  &:nth-child(1) {
    box-sizing: border-box;
    padding-right: 20px;
    justify-items: center;
  }
  &:nth-child(3) {
    justify-items: flex-end;
  }
  &:last-child {
    justify-items: flex-end;
  }
  i {
    font-size: 20px;
    cursor: pointer;
  }
  @media (max-width: 500px) {
    &:nth-child(3) {
      display: none;
    }
  }
`;