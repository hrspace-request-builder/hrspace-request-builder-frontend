import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./request-builder.module.scss";
import Sidebar from "../../components/sidebar/sidebar";
import RequestCreator from "../../components/request-creator/request-creator";
import RequestCreator2 from "../../components/request-creator2/request-creator2";
import RequestCreator3 from "../../components/request-creator3/request-creator3";

/* eslint-disable */
function RequestBuilder({ page = 1, formik }) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <button className={styles.button} onClick={() => navigate("/")}>
          <div className={styles.btnIcon}></div>Назад
        </button>
      </div>
      <div className={styles.content_container}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.request_creator}>
          {page === 1 ? (
            <RequestCreator formik={formik} />
          ) : page === 2 ? (
            <RequestCreator2 formik={formik} />
          ) : (
            <RequestCreator3 formik={formik} />
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestBuilder;
