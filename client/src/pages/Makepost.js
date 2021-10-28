import React from "react";
import MainNav from "../components/MainNav";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import AWS from "aws-sdk";
import { useState, useRef, useEffect } from "react";
require("dotenv").config();

function Makepost() {
  // drag & drop 코드 : 시작
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

  // 나 혼자 해보는거
  // const handleDragFileInput = (e) => {
  //   console.log("이상헌");
  //   const uploadBox = uploadBoxRef.current;
  //   const input = inputRef.current;

  //   const changeHandler = (event) => {
  //     const files = event.target.files[0];
  //     uploadFile(files);
  //   };

  //   const dropHandler = (event) => {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     const files = event.dataTransfer.files[0];
  //     uploadFile(files);
  //   };

  //   const dragOverHandler = (event) => {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   };

  //   uploadBox.addEventListener("drop", dropHandler);
  //   uploadBox.addEventListener("dragover", dragOverHandler);
  //   input.addEventListener("change", changeHandler);

  //   return () => {
  //     uploadBox.removeEventListener("drop", dropHandler);
  //     uploadBox.removeEventListener("dragover", dragOverHandler);
  //     input.removeEventListener("change", changeHandler);
  //   };
  // };
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
    let name = Math.floor(Math.random() * 1000).toString() + Date.now() + "." + file.name.split(".").pop();

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
                <input type="text" placeholder="영화 제목을 검색해 주세요." />
                <div className="MP-movie-icon"></div>
              </div>
            </div>
            <div className="MP-input-wrap">
              <div className="MP-sub-title">장르 선택</div>
              <select name="장르" id="" className="MP-movie">
                <option value="">장르를 선택해주세요.</option>
                <option value="">로맨스</option>
                <option value="">코미디</option>
                <option value="">SF/판타지</option>
                <option value="">액션</option>
                <option value="">미스터리/스릴러</option>
                <option value="">전쟁</option>
              </select>
            </div>
            <div className="MP-photo-wrap">
              <div className="MP-sub-title">사진 선택</div>
              <div>{uploadImageName}</div>
              <label className="MP-photo-label" for="ex-file">
                선택하기
              </label>
              <input className="MP-photo-btn" id="ex-file" type="file" accept="image/jpg,image/png,image/jpeg,image/gif" onChange={(e) => handleFileInput(e)} />
              {uploadImageName === null ? (
                <div>
                  <div className="MP-photo-show" ref={uploadBoxRef}>
                    사진을 드래그 혹은 선택하기를 눌러 업로드해주세요.
                  </div>
                  <input className="MP-photo-btn" id="ex-file" type="file" accept="image/jpg,image/png,image/jpeg,image/gif" ref={inputRef} />
                </div>
              ) : (
                <img className="MP-photo-show" src={process.env.REACT_APP_S3_URL_ImageUpload + uploadImageName} alt="" />
              )}
            </div>
            <div className="MP-box-wrap">
              <div className="MP-sub-title">장면 설명</div>
              <textarea name="" id="textarea"></textarea>
            </div>
            <div className="MP-btn-wrap">
              <button className="MP-btn">게시하기</button>
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
