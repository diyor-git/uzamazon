import "./CreateCabinet.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { Avatar, Button, Modal, Upload } from "antd";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Input from "../../../components/Input/Input";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Checkbox from "../../../components/Checkbox/Checkbox";
import { createCabinet } from "../../../redux/vendorsReducer";

const CreateCabinet = () => {
  let history = useHistory();
  let login = useSelector((state) => state.profilePage.login.token);
  const dispatch = useDispatch();
  let [fileImg, setFileImg] = useState();
  let [banner, setBanner] = useState();
  let [bannerFile, setBannerFile] = useState();
  let [avatarFile, setAvatarFile] = useState();
  let [request, setRequest] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalRequestVisible, setIsModalRequestVisible] = useState(false);
  let sentRequest = useSelector(
    (state) => state.profilePage.login.sent_request
  );
  let verified = useSelector((state) => state.profilePage.login.verified);
  /*== Modals ==*/
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    history.push("/");
  };

  const showModalRequest = () => {
    setIsModalRequestVisible(true);
  };

  const handleCancelRequest = () => {
    setIsModalRequestVisible(false);
    history.push("/");
  };

  const { t } = useTranslation();
  const { control, register, handleSubmit } = useForm({});

  const upload = {
    accept: ".png, .jpg, .jpeg",
    showUploadList: false,
    name: "file",
    multiple: false,
    customRequest: (file) => {
      setAvatarFile(file.file);
      let reader = new FileReader();
      let url = reader.readAsDataURL(file.file);
      reader.onloadend = () => {
        setFileImg(reader.result);
      };
    },
  };
  const uploadBanner = {
    accept: ".png, .jpg, .jpeg",
    showUploadList: false,
    name: "file",
    multiple: false,
    customRequest: (file) => {
      setBannerFile(file.file);
      let reader = new FileReader();
      let url = reader.readAsDataURL(file.file);
      reader.onloadend = () => {
        setBanner(reader.result);
        console.log(reader.result);
      };
    },
  };
  const onSubmit = (data) => {
    setRequest(data);
    console.log(data);
    request.avatar = avatarFile;
    request.banner = bannerFile;
    console.log(bannerFile);
    dispatch(createCabinet(request)).then(() => {
      showModal();
    });
  };
  useEffect(() => {
    if (!login) {
      history.push("/login");
    }
    if (sentRequest && !verified) {
      showModalRequest();
    }
  }, []);
  return (
    <div>
      <Header />
      <div className="cabinetBanner">
        {banner ? (
          <div className="bannerCabinet">
            <img src={banner} alt="Banner" />
            <div className="changeBanner">
              <h3>Замените изображения баннера</h3>
              <p>Оптимальные размеры 3200 x 410px</p>
              <Upload {...uploadBanner}>
                <button className="pinkBtn">Изменить</button>
              </Upload>
              <button
                onClick={() => {
                  setBanner("");
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        ) : (
          <div className="changeBanner">
            <h3>Замените изображения баннера</h3>
            <p>Оптимальные размеры 3200 x 410px</p>
            <Upload {...uploadBanner}>
              <button className="pinkBtn">Изменить</button>
            </Upload>
            <button>Удалить</button>
          </div>
        )}
      </div>
      <div className="container">
        <div className="createCabinetPage mt-70px">
          <h2 className="bold-48px color-dark-blue">
            Создание личного кабинета
          </h2>
          <div className="profile_data mt-30px">
            <div className="d-flex flex-column flex-items-center avatar-wrapper">
              <Avatar
                draggable={false}
                size={{ xs: 110, sm: 150, md: 150, lg: 150, xl: 150, xxl: 220 }}
                src={
                  fileImg ? (
                    <img src={fileImg} alt="Avatar" />
                  ) : (
                    <svg
                      viewBox="0 0 220 220"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M216.5 110C216.5 168.818 168.818 216.5 110 216.5C51.1817 216.5 3.5 168.818 3.5 110C3.5 51.1816 51.1816 3.5 110 3.5C168.818 3.5 216.5 51.1817 216.5 110Z"
                        fill="white"
                        stroke="#EBEBEB"
                        strokeWidth="7"
                      />
                      <path
                        opacity="0.3"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M110 123.728C91.6729 123.728 55.0879 132.925 55.0879 151.184V164.912H164.912V151.184C164.912 132.925 128.327 123.728 110 123.728ZM110 110C125.169 110 137.456 97.7132 137.456 82.5438C137.456 67.3744 125.169 55.0879 110 55.0879C94.8304 55.0879 82.5438 67.3744 82.5438 82.5438C82.5438 97.7132 94.8304 110 110 110Z"
                        fill="#BCBCBC"
                      />
                    </svg>
                  )
                }
              />
              <Upload {...upload}>
                <p className="uploadBtn">{t("profile:changePhoto")}</p>
              </Upload>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="forms">
              <div className="name">
                <Controller
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      type="text"
                      noShadow
                      borderRadius="2"
                      error={error}
                      {...field}
                      className="input"
                      label="Название магазина или компании:"
                      placeholder="CompanyName.uz"
                    />
                  )}
                  name={"title"}
                  control={control}
                  rules={{ required: true }}
                />
                <Controller
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      type="tel"
                      noShadow
                      borderRadius="2"
                      error={error}
                      {...field}
                      className="input"
                      label="Дополнительный номер телефона:"
                      placeholder="+998 (90) 123 45 67"
                    />
                  )}
                  name={"phone"}
                  control={control}
                  rules={{ required: false }}
                />
              </div>
              <div className="site">
                <Controller
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      type="text"
                      noShadow
                      borderRadius="2"
                      error={error}
                      {...field}
                      className="input"
                      label="Веб-сайт:"
                      placeholder="www.companyname.uz"
                    />
                  )}
                  name={"website"}
                  control={control}
                  rules={{ required: false }}
                />
                <Controller
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      type="text"
                      noShadow
                      borderRadius="2"
                      error={error}
                      {...field}
                      className="input"
                      label="Ссылка на аккаунт в Instagram:"
                      placeholder="www.companyname.uz"
                    />
                  )}
                  name={"instagram"}
                  control={control}
                  rules={{ required: true }}
                />
              </div>
              <div className="text">
                <h4>Описание:</h4>
                <textarea
                  cols="30"
                  rows="10"
                  required={true}
                  {...register("description")}
                />
                <Controller
                  render={({ field }) => (
                    <Checkbox {...field}>{t("forms:disclaimer")}</Checkbox>
                  )}
                  name={"checkbox"}
                  control={control}
                  rules={{ required: true }}
                />
                <button type="submit">Создать личный кабинет</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
        className="modalProfile"
        visible={isModalRequestVisible}
        onCancel={handleCancelRequest}
        onOk={handleCancelRequest}
        width={800}
        centered
        footer={[<Button onClick={handleCancelRequest}>Ок</Button>]}
      >
        <h3>Вы уже оставили заявку</h3>
        <p>
          Мы свяжемся с вами в течение 5 рабочих дней, после отправки заявки
        </p>
      </Modal>
      <Modal
        className="modalProfile"
        visible={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        width={800}
        centered
        footer={[<Button onClick={handleCancel}>Ок</Button>]}
      >
        <h3>Спасибо за заявку</h3>
        <p>Мы свяжемся с вами в течение 5 рабочих дней</p>
      </Modal>
      <Footer />
    </div>
  );
};

export default CreateCabinet;
