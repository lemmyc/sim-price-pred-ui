import React from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/avatar_1.png";
import styles from "./About.module.scss";

function About() {
  
  
  return (
    <div className="relative">
      

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
                <p className={styles.hyperlink}><Link to="/">Về Trang chủ</Link></p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
