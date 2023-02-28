import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/avatar_1.png";
import styles from "./Home.module.scss";

import { fetchData } from "../../services/fetchData";
import { Modal } from "../../components";
import Loader from "../../components/Loader/Loader";

let API_ADDRESS = "https://sim-price-pred-api.onrender.com";
// let API_ADDRESS = "http://localhost:7777";

function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState({});
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [lastestSIM, setLastestSIM] = useState("");
  const [simFeatures, setSimFeatures] = useState({});
  const handleChangeInput = (e) => {
    setInput(e.target.value);
    setValid(true);
    setResponse({});
  };

  const handleSubmitInput = (e) => {
    e.preventDefault();
    setValid(true);
    const regex = /^(0\d{9})$/;
    if (regex.test(input)) {
      let data = {
        sim_number: input,
      };
      setLoading(true);
      let _respone = fetchData("POST", API_ADDRESS, data);
      _respone.then((body) => {
        setResponse(body);
        setSimFeatures(body?.features);
        setLastestSIM(input);
        setLoading(false);
      });
    } else {
      setValid(false);
    }
  };

  useEffect(() => {
    // INIT MODEL
    let data = {
      sim_number: "0900000000",
    };
    fetchData("POST", API_ADDRESS, data).then(() => {
      setFirstLoading(false);
    });
  }, []);
  let priceDict = {
    0: "Dưới 500.000 VND",
    1: "500.000 VNĐ đến 1.000.000 VNĐ",
    2: "1.000.000 VNĐ đến 3.000.000 VNĐ",
    3: "3.000.000 VNĐ đến 5.000.000 VNĐ",
    4: "5.000.000 VNĐ đến 10.000.000 VNĐ",
    5: "10.000.000 VNĐ đến 20.000.000 VNĐ",
    6: "20.000.000 VNĐ đến 50.000.000 VNĐ",
    7: "50.000.000 VNĐ đến 100.000.000 VNĐ",
    8: "100.000.000 VNĐ đến 200.000.000 VNĐ",
    9: "200.000.000 VNĐ đến 500.000.000 VNĐ",
    10: "Trên 500.000.000 VNĐ",
  };
  let nOfAKindDict = {
    4: "Tứ quý",
    5: "Ngũ quý",
    6: "Lục quý",
    7: "Thất quý",
    8: "Bát quý",
    9: "Cửu quý",
  };
  let getContent = (feature, detail) => {
    switch (feature) {
      case "fortune":
        return (
          <>
            SIM <span className="text-red-400	">Lộc phát</span> đuôi{" "}
            <span className="text-red-400	">{detail}</span>
          </>
        );
      case "godOfWealth":
        return (
          <>
            SIM <span className="text-red-400	">Thần tài</span> đuôi{" "}
            <span className="text-red-400	">{detail}</span>
          </>
        );
      case "godOfSoil":
        return (
          <>
            SIM <span className="text-red-400	">Ông địa</span> đuôi{" "}
            <span className="text-red-400	">{detail}</span>
          </>
        );
      case "repetition":
        return (
          <>
            SIM <span className="text-red-400	">Lặp</span> đuôi{" "}
            <span className="text-red-400	">{detail}</span>
          </>
        );
      case "nOfAKind":
        if (detail?.n > 3) {
          return (
            <>
              SIM có{" "}
              <span className="text-red-400	">
                {nOfAKindDict[detail?.n]} {detail?.kind[0]}{" "}
                {detail?.isAtEnd ? "đuôi" : "giữa"}
              </span>
            </>
          );
        } else if (detail?.n == 3) {
          if (detail?.kind.length == 1) {
            if (detail?.isAtEnd == true) {
              return (
                <>
                  SIM <span className="text-red-400	">Tam hoa</span>
                </>
              );
            } else {
              return (
                <>
                  SIM <span className="text-red-400	">Tam hoa giữa</span>
                </>
              );
            }
          } else {
            let last = "";
            let next_to_last = "";
            for (let i = 1; i <= 3; i++) {
              last += detail?.kind.at(0);
              next_to_last += detail?.kind.at(-1);
            }
            if (input.indexOf(last) - input.indexOf(next_to_last) === 3) {
              return (
                <>
                  SIM <span className="text-red-400	">Tam hoa kép</span>
                </>
              );
            } else {
              return (
                <>
                  SIM <span className="text-red-400	">Tam hoa</span>
                </>
              );
            }
          }
        } else if (detail?.n == 2 && detail?.kind.length >= 2) {
          return (
            <>
              SIM <span className="text-red-400	">Lặp kép </span>
            </>
          );
        } else return <></>;
      case "straight":
        return (
          <>
            Sim{" "}
            <span className="text-red-400	">
              Sảnh{" "}
              {detail[0] - detail[detail.length - 1] < 0
                ? `tiến lên`
                : `quay lui`}
            </span>
          </>
        );
      case "dateOfBirth":
        return (
          <>
            Sim{" "}
            <span className="text-red-400	">
              ngày tháng năm sinh "{detail.day}/{detail.month}/{detail.year}"
            </span>
          </>
        );
      case "fullBirthYear":
        return (
          <>
            Sim <span className="text-red-400	">năm sinh "{detail}"</span>
          </>
        );
      case "none":
        return <> Sim tự chọn</>;
      default:
        return ``;
    }
  };
  // console.log(simFeatures)
  return (
    <div className="relative">
      {/* Init model notification */}

      {firstLoading ? (
        <Modal>
          <Loader />
          <p className="text-2xl mt-5 lg:text-3xl ">Initializing Model</p>
          <p className="mt-3 text-xl font-extralight">this won't take long</p>
        </Modal>
      ) : (
        <></>
      )}

      <div className="container mx-auto">
        <div className="flex justify-center items-center h-screen">
          <div className={styles.glass}>
            <div className="title">
              <div className="title flex flex-col items-center">
                <h4 className="mb-3 text-3xl lg:text-4xl max-w-xl text-center font-bold">
                  Định giá SIM Điện thoại sử dụng Deep Learning
                </h4>
              </div>
            </div>

            <form className="mt-10">
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  value={input}
                  disabled={loading}
                  onChange={handleChangeInput}
                  onWheel={(e) => e.target.blur()} //disable increment on scrolling mouse wheel
                  className={styles.textbox}
                  type="number"
                  placeholder="Số điện thoại..."
                />
                <button
                  className={styles.btn}
                  disabled={loading}
                  type="submit"
                  onClick={handleSubmitInput}
                >
                  Định giá
                </button>
              </div>
            </form>
            <div className="textbox mt-5 text-center text-xl">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  {valid ? (
                    Object.keys(response).length > 0 ? (
                      <div className="textbox">
                        SIM số: {lastestSIM}
                        <br />
                        Nhà mạng: {response["career"]}
                        <br />
                        <strong>
                          Giá tiền dự đoán:{" "}
                          {priceDict[response["price_category"]]}
                        </strong>
                        <br />
                        {Object.keys(simFeatures).length > 0 ? (
                          <div>
                            thuộc loại SIM
                            <ul className="list-none">
                              {Object.keys(simFeatures).map((key) => (
                                <li key={key}>
                                  {getContent(key, simFeatures[key])}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <></>
                    )
                  ) : (
                    <span className="text-red-500">
                      Số điện thoại nhập vào không hợp lệ
                    </span>
                  )}
                </>
              )}
            </div>
            
            <p className={styles.hyperlink}><Link to="/about">Về Website này?</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
