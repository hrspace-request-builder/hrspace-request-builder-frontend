import React from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./popup.module.scss";
import {
  handleError,
  handleModal,
  handleSuccess,
} from "../../services/modalSlice";

/* eslint-disable react-hooks/exhaustive-deps */
function Popup() {
  const dispatch = useDispatch();
  // eslint-disable-next-line react-redux/useSelector-prefer-selectors
  const isOpen = useSelector((state) => state.modal.isOpen);
  // eslint-disable-next-line react-redux/useSelector-prefer-selectors
  const formStateFromRedux = useSelector((state) => state.form.formState);
  // eslint-disable-next-line react-redux/useSelector-prefer-selectors
  const requestedDataFromRedux = useSelector(
    (state) => state.data.requestedData,
  );
  // eslint-disable-next-line react-redux/useSelector-prefer-selectors
  const isSuccess = useSelector((state) => state.modal.isSuccess);
  // eslint-disable-next-line react-redux/useSelector-prefer-selectors
  const isError = useSelector((state) => state.modal.isError);
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(handleModal(false));
  };

  React.useEffect(() => {
    function onEsc(evt) {
      if (evt.code === "Escape") {
        handleClose();
      }
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  });

  React.useEffect(() => {
    if (isSuccess) {
      handleClose();
      dispatch(handleSuccess(false));
      navigate("/success");
    }
  }, [isSuccess]);

  React.useEffect(() => {
    if (isError) {
      handleClose();
      dispatch(handleError(false));
      navigate("/failure");
    }
  }, [isError]);

  // данные с formSlice.js
  const arrOfRespCheckboxesId =
    formStateFromRedux.responsibilitiesCheckboxes.map(Number);
  const arrOfRequirementsCheckboxes =
    formStateFromRedux.requirementsCheckboxes.map(Number);
  const arrOfConditionsCheckbox =
    formStateFromRedux.conditionsCheckbox.map(Number);
  const rewardRadioValue = formStateFromRedux.rewardRadio;
  const deadLineRadioValue = formStateFromRedux.rewardRadio3;
  const whatNeedRadioValue = formStateFromRedux.whatNeedRadio;
  const {
    rewardField,
    employeeCountField,
    recruiterCount,
    specialRequirementsField,
    companyInfoSwitch,
    grade,
    expirience,
    employment,
    registrationType,
  } = formStateFromRedux;
  const checkedAdditionalTasks = formStateFromRedux.additionalTasks;
  const checkedWorktype = formStateFromRedux.worktype;

  // данные с dataSlice.js
  const dataOfResponsibilities = requestedDataFromRedux.responsibilities;
  const dataOfRequirements = requestedDataFromRedux.requirements;
  const dataOfConditions = requestedDataFromRedux.conditions;

  const checkedResponsibilities = dataOfResponsibilities
    .filter((obj) => arrOfRespCheckboxesId.includes(obj.id))
    .map((obj) => obj.name);

  const checkedRequirements = dataOfRequirements
    .filter((obj) => arrOfRequirementsCheckboxes.includes(obj.id))
    .map((obj) => obj.name);

  const checkedConditions = dataOfConditions
    .filter((obj) => arrOfConditionsCheckbox.includes(obj.id))
    .map((obj) => obj.name);

  function renderReward() {
    switch (rewardRadioValue) {
      case "0":
        return "100% за выход сотрудника";
      case "1":
        return "50% за выход + 50% после 1 месяца работы";
      case "2":
        return "100% по окончании 1 месяца работы";
      default:
        return "100% за выход сотрудника";
    }
  }

  function renderDeadline() {
    switch (deadLineRadioValue) {
      case "0":
        return "Срочно";
      case "1":
        return "Не очень срочно";
      case "2":
        return "Времени достаточно";
      default:
        return "Срочно";
    }
  }

  function renderWhatNeed() {
    switch (whatNeedRadioValue) {
      case "0":
        return "Только резюме";
      case "1":
        return "Резюме + результаты  собеседования";
      default:
        return "Только резюме";
    }
  }

  function renderSpecialRequirementsField() {
    if (specialRequirementsField === "") {
      return "нет";
    }
    return specialRequirementsField;
  }

  function renderCompanyInfoSwitch() {
    if (companyInfoSwitch === false) {
      return "нет";
    }
    return "да";
  }

  return (
    <div
      className={`${styles.container} ${isOpen ? styles.container_opened : ""}`}
    >
      <div className={styles.popup}>
        <div className={styles.block}>
          <h2 className={styles.h2}>Данные по вакансии</h2>
          <ul className={styles.unsortedList}>
            <li className={styles.listItem}>
              <h3 className={styles.h3}>Название</h3>
              <p className={styles.paragraph}>
                {formStateFromRedux.vacancyNameField?.name}
              </p>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.h3}>Специализация</h3>
              <p className={styles.paragraph}>
                {formStateFromRedux.specialisationField?.specialisation}
              </p>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.h3}>Грейд</h3>
              <div className={styles.paragraph}>
                <div className={styles.checkboxContainer}>
                  <div className={styles.boxForMarker}>
                    <div className={styles.marker} />
                  </div>
                  <p
                    className={`${styles.paragraph} ${styles.checkboxDescription}`}
                  >
                    {grade}
                  </p>
                </div>
              </div>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.h3}>Опыт работы</h3>
              <div className={styles.paragraph}>
                <div className={styles.checkboxContainer}>
                  <div className={styles.boxForMarker}>
                    <div className={styles.marker} />
                  </div>
                  <p
                    className={`${styles.paragraph} ${styles.checkboxDescription}`}
                  >
                    {expirience}
                  </p>
                </div>
              </div>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.h3}>Город</h3>
              <p className={styles.paragraph}>
                {formStateFromRedux.cityField?.name}
              </p>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.h3}>Тип работы</h3>
              <div className={styles.paragraph}>
                {checkedWorktype.map((element, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className={styles.checkboxContainer} key={index}>
                    <div className={styles.boxForMarker}>
                      <div className={styles.marker} />
                    </div>

                    <p
                      className={`${styles.paragraph} ${styles.checkboxDescription}`}
                    >
                      {element}
                    </p>
                  </div>
                ))}
              </div>
            </li>

            <li className={styles.listItem}>
              <h3 className={styles.h3}>Занятость</h3>
              <div className={styles.paragraph}>
                <div className={styles.checkboxContainer}>
                  <div className={styles.boxForMarker}>
                    <div className={styles.marker} />
                  </div>
                  <p
                    className={`${styles.paragraph} ${styles.checkboxDescription}`}
                  >
                    {employment}
                  </p>
                </div>
              </div>
            </li>

            <li className={styles.listItem}>
              <h3 className={styles.h3}>Тип оформления</h3>
              <div className={styles.paragraph}>
                <div className={styles.checkboxContainer}>
                  <div className={styles.boxForMarker}>
                    <div className={styles.marker} />
                  </div>
                  <p
                    className={`${styles.paragraph} ${styles.checkboxDescription}`}
                  >
                    {registrationType}
                  </p>
                </div>
              </div>
            </li>

            <li className={styles.listItem}>
              <h3 className={styles.h3}>Зарплата gross</h3>
              <p className={styles.paragraph}>
                от {formStateFromRedux.salaryFromField} до{" "}
                {formStateFromRedux.salaryToField}
              </p>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.h3}>Обязанности</h3>
              <div className={styles.paragraph}>
                {checkedResponsibilities.map((element, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className={styles.checkboxContainer} key={index}>
                    <div className={styles.boxForMarker}>
                      <div className={styles.marker} />
                    </div>

                    <p
                      className={`${styles.paragraph} ${styles.checkboxDescription}`}
                    >
                      {element}
                    </p>
                  </div>
                ))}
                {formStateFromRedux.responsibilitiesField}
              </div>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.h3}>Требования</h3>
              <div className={styles.paragraph}>
                {checkedRequirements.map((element, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className={styles.checkboxContainer} key={index}>
                    <div className={styles.boxForMarker}>
                      <div className={styles.marker} />
                    </div>
                    <p
                      className={`${styles.paragraph} ${styles.checkboxDescription}`}
                    >
                      {element}
                    </p>
                  </div>
                ))}
                {formStateFromRedux.requirementsField}
              </div>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.h3}>Условия</h3>
              <div className={styles.paragraph}>
                {checkedConditions.map((element, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className={styles.checkboxContainer} key={index}>
                    <div className={styles.boxForMarker}>
                      <div className={styles.marker} />
                    </div>
                    <p
                      className={`${styles.paragraph} ${styles.checkboxDescription}`}
                    >
                      {element}
                    </p>
                  </div>
                ))}
                {formStateFromRedux.conditionsField}
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.block}>
          <h2 className={styles.h2}>Условия сотрудничества</h2>
          <ul className={styles.unsortedList}>
            <li className={styles.listItem}>
              <h3 className={styles.h3}>Выплата HR</h3>
              <p className={styles.paragraph}>{renderReward()}</p>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.h3}>Вознаграждение HR</h3>
              <p className={styles.paragraph}>{rewardField}</p>
            </li>
          </ul>
        </div>
        <div className={styles.block}>
          <h2 className={styles.h2}>Пожелания к рекрутеру</h2>
          <ul className={styles.unsortedList}>
            <li className={styles.listItem}>
              <h3 className={styles.h3}>Количество сотрудников</h3>
              <p className={styles.paragraph}>{employeeCountField}</p>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.h3}>Количество рекрутеров</h3>
              <p className={styles.paragraph}>{recruiterCount}</p>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.h3}>Когда должен выйти на работу?</h3>
              <p className={styles.paragraph}>{renderDeadline()}</p>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.h3}>Дополнительные задачи рекрутера</h3>
              <div className={styles.paragraph}>
                {checkedAdditionalTasks.map((element, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className={styles.checkboxContainer} key={index}>
                    <div className={styles.boxForMarker}>
                      <div className={styles.marker} />
                    </div>
                    <p
                      className={`${styles.paragraph} ${styles.checkboxDescription}`}
                    >
                      {element}
                    </p>
                  </div>
                ))}
              </div>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.h3}>Что предоставить</h3>
              <p className={styles.paragraph}>{renderWhatNeed()}</p>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.h3}>Особые требования</h3>
              <p className={styles.paragraph}>
                {renderSpecialRequirementsField()}
              </p>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.h3}>Показывать информацию о компании</h3>
              <p className={styles.paragraph}>{renderCompanyInfoSwitch()}</p>
            </li>
          </ul>
        </div>
        <div className={styles.wrapperForButtons}>
          <div className={styles.containerForBtn}>
            <Button
              variant="contained"
              color="rqwhite"
              onClick={() => handleClose()}
              sx={{
                height: "46px",
                width: "180px",
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              <p className={styles.button_text}>Назад</p>
            </Button>
          </div>

          <div className={styles.containerForBtn}>
            <Button
              variant="contained"
              color="rqback"
              // onClick={() => {
              //   handleClose();
              //   navigate("/success");
              // }}
              type="submit"
              sx={{
                height: "46px",
                width: "180px",
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              <p className={styles.button_text}>К оплате</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
