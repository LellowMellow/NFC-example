import React from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNfc } from "use-nfc-hook";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const { kakao } = window;

const Sender = () => {
  const [state, setState] = useState({
    text: "a",
  });

  const onClickFunction = () => {
    setState({ text: state.text + "a" });
    const payload = {
      text: state.text,
    };
    axios.post("http://localhost:5000/message", payload);
    console.log("sender success");
  };

  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(35.12, 129.1),
      level: 3,
    };
    // 지도를 생성합니다.
    const map = new kakao.maps.Map(container, options);
    // 주소-좌표 변환 객체를 생성합니다.
    const geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다..
    geocoder.addressSearch(
      "인천 연수구 청학로6번길 8",
      function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;color:red;text-align:center;padding:6px 0;">가메이 쒸펄</div>',
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      }
    );
  }, []);

  return (
    <div>
      <h1>Sender</h1>
      <div
        id="myMap"
        style={{
          width: "800px",
          height: "800px",
        }}
      ></div>
      <button onClick={onClickFunction}>send web socket chat</button>
    </div>
  );
};

export default Sender;

/*
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "360px" }}
      >
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}></MapMarker>
      </Map>
      */
