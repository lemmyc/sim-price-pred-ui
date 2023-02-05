import React, { useState } from "react";
import avatar from "../../assets/images/avatar_1.png";
import styles from "./Home.module.scss";

import { fetchData } from "../../services/fetchData";
import { Modal } from "../../components";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";

let API_ADDRESS = "https://sim-price-pred-api.onrender.com";

function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState({});
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [lastestSIM, setLastestSIM] = useState("");
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
            <div className="profile flex justify-center py-2">
              <img className={styles.logo} src={avatar} alt="logo" />
            </div>
            <div className="title">
              <div className="title flex flex-col items-center">
                <span className="mb-1 text-xl lg:text-2xl text-center text-gray-500">
                  Niên luận cơ sở
                </span>
                <span className="mb-3 text-xl lg:text-2xl text-center text-gray-500">
                  Ngành Khoa học máy tính
                </span>
                <h4 className="mb-3 text-3xl lg:text-4xl max-w-xl text-center font-bold">
                  Định giá SIM Điện thoại sử dụng Deep Learning
                </h4>
                <span className="mb-1 text-xl lg:text-2xl  text-center text-gray-500">
                  sinh viên thực hiện
                </span>
                <span className="text-xl lg:text-2xl text-center">
                  Lê Nguyễn Bảo Đăng
                </span>
                <span className="text-xl lg:text-2xl mb-5  text-center">
                  MSSV: B2016955
                </span>
              </div>
            </div>

            <form className="py-1">
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  value={input}
                  disabled={loading}
                  onChange={handleChangeInput}
                  className={styles.textbox}
                  type="text"
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
                        Giá tiền dự đoán:{" "}
                        {priceDict[response["price_category"]]}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
