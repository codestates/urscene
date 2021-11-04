import React from "react";
import MainNav from "../components/MainNav";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import Dropdown from "../components/Dropdown";
import AWS from "aws-sdk";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
require("dotenv").config();

function Makepost() {
  const [seletedGenre, setSeletedGenre] = useState(""); // 선택한 장르가 담기는 곳
  const [postDescription, setPostDescription] = useState(""); // 장면 설명이 담기는 곳

  const history = useHistory();
  // 검색어 입력 시 드랍다운 : 시작
  const [hasText, setHasText] = useState(false); // 문자가 입력이 됬는지 안됬는지 체크
  const [inputValue, setInputVaule] = useState(""); // 입력한 문자가 담기는 곳
  const [options, setOptions] = useState([]); // 드랍다운으로 보여지는 전체 목록

  // useEffect(() => {
  //   if (inputValue === "") {
  //     setHasText(false);
  //   }
  // }, [inputValue]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (e.key === "Enter") {
      return handleSearchMovieTitle();
    }
    if (value.includes("\\")) return;
    value ? setHasText(true) : setHasText(false);
    setInputVaule(value);
    // const filterRegex = new RegExp(value, "i");
    // const resultOptions = options.map((option) => {
    //   if (option.movieTitle.match(filterRegex)) {
    //     return option.movieTitle;
    //   }
    // });
    // setOptions(resultOptions);
  };

  const handleSearchMovieTitle = () => {
    if (inputValue.includes("\\")) return;
    // axios 요청해서 더미데이터 받아와야 할듯
    console.log("제목 검색 함수 시작");
    console.log("inputValue===", inputValue);
    axios
      .get(`${process.env.REACT_APP_EC2_URL}/description/${inputValue}`)
      .then((res) => {
        // console.log(res.data);
        setOptions(res.data.korMovie || res.data.engMovie);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteButtonClick = () => {
    setInputVaule("");
    setOptions([]);
    setHasText(false);
  };

  const handleDropDownClick = (data) => {
    setInputVaule(data);
    const resultOptions = options.filter((option) => option === data);
    setOptions(resultOptions);
    setHasText(false);
  };
  // 검색어 입력 시 드랍다운 : 끝

  // 이미지 drag & drop 코드 : 시작
  const uploadBoxRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const uploadBox = uploadBoxRef.current;
    const input = inputRef.current;

    const changeHandler = (event) => {
      const files = event.target.files[0];
      uploadFile(files);
    };

    const dropHandler = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const files = event.dataTransfer.files[0];
      uploadFile(files);
    };

    const dragOverHandler = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    uploadBox.addEventListener("drop", dropHandler);
    uploadBox.addEventListener("dragover", dragOverHandler);
    input.addEventListener("change", changeHandler);

    return () => {
      uploadBox.removeEventListener("drop", dropHandler);
      uploadBox.removeEventListener("dragover", dragOverHandler);
      input.removeEventListener("change", changeHandler);
    };
  }, []);
  // drag & drop 코드 : 끝

  // 네이티브 SDK 를 통해 파일 업로드 : 시작
  const [uploadImageName, setUploadImageName] = useState(null); // 이미지업로드 성공시 S3에 업로드된 파일명이 담긴다.

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_IAM_AccessKeyId,
    secretAccessKey: process.env.REACT_APP_IAM_SecretAccessKey,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_S3_BucketName_ImageUpload },
    region: process.env.REACT_APP_S3_region_ImageUpload,
  });

  const uploadFile = (file) => {
    let name =
      Math.floor(Math.random() * 1000).toString() +
      Date.now() +
      "." +
      file.name.split(".").pop();

    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: process.env.REACT_APP_S3_BucketName_ImageUpload,
      Key: name,
      ContentType: "image/jpg,image/png,image/jpeg,image/gif",
    };

    myBucket.putObject(params).send((err) => {
      if (err) console.log(err);
      setUploadImageName(name);
    });
  };

  const handleFileInput = (e) => {
    setUploadImageName(null);
    uploadFile(e.target.files[0]);
  };
  // 네이티브 SDK 를 통해 파일 업로드 : 끝

  const handlePostSubmit = () => {
    axios
      .post(
        "http://localhost:80/singlepost",
        {
          // user_id: "1", //(Token)
          title: inputValue,
          image: uploadImageName,
          content: postDescription,
          genre: seletedGenre,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log("post success");
        history.push("/mygallery");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <MainNav />
      <div className="MP-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="MP-wrap">
            <div className="MP-title">나의장면 게시하기</div>
            <div className="MP-input-wrap">
              <div className="MP-sub-title">영화 이름</div>
              <div className="MP-movie">
                <input
                  type="text"
                  placeholder="영화 제목을 입력해주세요"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e)}
                  onKeyPress={(e) => {
                    handleInputChange(e);
                  }}
                />
                {inputValue === "" ? null : (
                  <div
                    className="MP-movie-icondelete"
                    onClick={handleDeleteButtonClick}
                  ></div>
                )}
                <div
                  className="MP-movie-icon"
                  onClick={handleSearchMovieTitle}
                ></div>
                {hasText ? (
                  <Dropdown
                    options={options}
                    handleDropDownClick={handleDropDownClick}
                  />
                ) : null}
              </div>
            </div>
            <div className="MP-input-wrap">
              <div className="MP-sub-title">장르 선택</div>
              <select
                name="장르"
                id=""
                className="MP-movie"
                onChange={(e) => setSeletedGenre(e.target.value)}
              >
                <option value="장르">장르를 선택해주세요.</option>
                <option value="로맨스">로맨스</option>
                <option value="코미디">코미디</option>
                <option value="SF/판타지">SF/판타지</option>
                <option value="액션">액션</option>
                <option value="미스터리/스릴러">미스터리/스릴러</option>
                <option value="전쟁">전쟁</option>
              </select>
            </div>
            <div className="MP-photo-wrap">
              <div className="MP-sub-title">사진 선택</div>
              <label className="MP-photo-label" for="ex-file">
                선택하기
              </label>
              <input
                className="MP-photo-btn"
                id="ex-file"
                type="file"
                accept="image/jpg,image/png,image/jpeg,image/gif"
                onChange={(e) => handleFileInput(e)}
              />
              {uploadImageName === null ? (
                <div>
                  <div className="MP-photo-show" ref={uploadBoxRef}>
                    사진을 드래그 혹은 선택하기를 눌러 업로드해주세요.
                  </div>
                  <input
                    className="MP-photo-btn"
                    id="ex-file"
                    type="file"
                    accept="image/jpg,image/png,image/jpeg,image/gif"
                    ref={inputRef}
                  />
                </div>
              ) : (
                <img
                  className="MP-photo-show"
                  src={
                    process.env.REACT_APP_S3_URL_ImageUpload +
                    "/" +
                    uploadImageName
                  }
                  alt=""
                />
              )}
            </div>
            <div className="MP-box-wrap">
              <div className="MP-sub-title">장면 설명</div>
              <textarea
                name=""
                id="textarea"
                onChange={(e) => setPostDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="MP-btn-wrap">
              <button className="MP-btn" onClick={handlePostSubmit}>
                게시하기
              </button>
            </div>
          </div>
        </form>
      </div>
      <MainFooter></MainFooter>
      <TopButton></TopButton>
    </div>
  );
}

export default Makepost;
