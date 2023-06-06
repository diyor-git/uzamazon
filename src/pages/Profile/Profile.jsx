import "./Profile.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { Avatar, Button, message, Modal, Upload } from "antd";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PhoneNumberInput from "../../components/Input/PhoneNumberInput";
import Input from "../../components/Input/Input";
import {
  deleteProfile,
  getProfile,
  putPassword,
  putProfile,
  setPhotoProfile,
} from "../../redux/profileReducer";
import DatePicker from "../../components/Input/DatePicker";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { USER_INFO } from "../../graphql/query/userInfo";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userImage, setUserImage] = useState();
  const [userImageFile, setUserImageFile] = useState();
  const { data, loading, refetch } = useQuery(USER_INFO);
  const uploadImg = {
    accept: ".png, .jpg, .jpeg",
    showUploadList: false,
    name: "file",
    multiple: false,
    customRequest: (file) => {
      setUserImageFile(file.file);
      let reader = new FileReader();
      let url = reader.readAsDataURL(file.file);
      reader.onloadend = () => {
        setUserImage(reader.result);
      };
    },
  };

  let history = useHistory();
  let login = localStorage.getItem("Token");
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // const porducts = useSelector(state => state.profilePage)
  const profile = useSelector((state) => state.profilePage);
  const profileChangeState = useSelector(
    (state) => state.profilePage.profileChangeState
  );

  // const [defaultValues, setDefaultProfileValue] = useState(profile);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    control,
    handleSubmit: handleAccountChangeSubmit,
    setValue: setAccountChangeValue,
  } = useForm({});
  const {
    control: passwordControl,
    handleSubmit: handlePasswordChangeSubmit,
    watch,
  } = useForm({});

  /*== Modals ==*/

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleDeleteAcc = () => {
    // dispatch(deleteProfile()).then(() => {
    //   history.push("/");
    // });

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  /*== / ==*/

  const onAccountChangeSubmit = (data) => {
    const date = new Date(data.profile.dob);
    const offset = date.getTimezoneOffset();
    data.profile.dob = new Date(date.getTime() - offset * 60 * 1000)
      .toISOString()
      .split("T")[0];
    dispatch(putProfile({ ...profile, ...data }));
  };

  const onPasswordChangeSubmit = (data) => {
    alert(JSON.stringify(data));
    dispatch(putPassword(data));
  };

  const upload = {
    accept: ".png, .jpg, .jpeg",
    showUploadList: false,
    name: "file",
    multiple: false,
    customRequest: (file) => {
      message.info(`${file.file.name} фото отправляется`);
      dispatch(setPhotoProfile(file.file)).then(() => {
        dispatch(getProfile());
        message.success(`${file.file.name} фото загрузилось`);
      });
    },
  };
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  useEffect(() => {
    if (!login) {
      history.push("/");
    }
  }, []);
  useEffect(() => {
    if (data) {
      setFirstName(!data.user ? "" : data.user.firstName);
      setPhoneNumber(!data.user ? "" : data.user.phoneNumber);
      setDob(!data.user ? "" : data.user.dob);
      console.log(data);
    }
  }, [data]);
  useEffect(() => {}, [profileChangeState]);

  useEffect(() => {
    if (!!profile.id) {
      setAccountChangeValue("first_name", profile.first_name);
      setAccountChangeValue("username", profile.username);
      setAccountChangeValue("profile.dob", profile.profile.dob);
      setAccountChangeValue("profile.gender", profile.profile.gender);
    }
  }, [setAccountChangeValue, profile]);
  return (
    <div>
      <Header />
      <div className="container">
        <div className="profilePage mt-70px">
          <h2 className="bold-48px color-dark-blue">{t("profile:account")}</h2>
          <div className="profile_data mt-30px">
            <div className="d-flex flex-column flex-items-center avatar-wrapper">
              {!userImage ? (
                <Avatar
                  draggable={false}
                  size={{
                    xs: 110,
                    sm: 150,
                    md: 150,
                    lg: 150,
                    xl: 150,
                    xxl: 220,
                  }}
                  icon={
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
                  }
                  src={profile.profile && profile.profile.avatar}
                />
              ) : (
                <div className="profile-img">
                  <img src={userImage} className="profile-img" alt="" />
                </div>
              )}
              <Upload {...uploadImg}>
                <p className="uploadBtn">{t("profile:changePhoto")}</p>
              </Upload>
              {userImage ? (
                <button onClick={() => setUserImage("")}>
                  {t("profile:deleteImg")}
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="forms">
              <div className="name">
                {/*== Change Profile is not functioning due to 500 PATCH Error ==*/}
                <form
                  onSubmit={handleAccountChangeSubmit(onAccountChangeSubmit)}
                >
                  <Controller
                    render={({ field, fieldState: { error } }) => (
                      <Input
                        noShadow
                        borderRadius="2"
                        error={error}
                        {...field}
                        label={t("forms:name")}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    )}
                    name={"first_name"}
                    control={control}
                    rules={{ required: true }}
                  />
                  {/* <input {...accountChange("first_name")} /> */}
                  <Controller
                    render={({ field }) => (
                      <PhoneNumberInput
                        borderRadius="3"
                        {...field}
                        label={t("forms:phone")}
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e);
                          console.log(e);
                        }}
                      />
                    )}
                    name={"username"}
                    control={control}
                  />
                  <Controller
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <DatePicker
                        noShadow
                        borderRadius="3"
                        label={t("forms:dateBirth")}
                        name={"dob"}
                        error={error}
                        defaultValue={dob}
                        onChange={(e) => {
                          onChange(e);
                          setDob(e);
                        }}
                        disabledDate="future"
                      />
                    )}
                    name={"dob"}
                    control={control}
                    rules={{ required: true }}
                  />
                  <button type="submit">{t("profile:saveChanges")}</button>
                </form>
              </div>
              <div className="password">
                <form
                  onSubmit={handlePasswordChangeSubmit(onPasswordChangeSubmit)}
                >
                  <Controller
                    render={({ field, fieldState: { error } }) => (
                      <Input
                        noShadow
                        borderRadius="2"
                        error={error}
                        {...field}
                        label={t("profile:oldPassword")}
                        type="password"
                      />
                    )}
                    name={"old_password"}
                    control={passwordControl}
                    rules={{ required: true }}
                  />
                  <Controller
                    render={({ field, fieldState: { error } }) => (
                      <Input
                        noShadow
                        borderRadius="2"
                        error={error}
                        {...field}
                        label={t("profile:newPassword")}
                        type="password"
                      />
                    )}
                    name={"new_password1"}
                    control={passwordControl}
                    rules={{ required: true, minLength: 8 }}
                  />
                  <Controller
                    render={({ field, fieldState: { error } }) => (
                      <Input
                        noShadow
                        borderRadius="2"
                        error={error}
                        {...field}
                        label={t("profile:repeatPassword")}
                        type="password"
                      />
                    )}
                    name={"new_password2"}
                    control={passwordControl}
                    rules={{
                      required: true,
                      validate: (value) =>
                        value ===
                        watch("password1", "" || `${t("forms:passMismatch")}`),
                    }}
                  />
                  <button type="submit">{t("profile:changePassword")}</button>
                </form>
              </div>
            </div>
          </div>
          <section className="orders-history">
            <h2 className="bold-48px color-dark-blue">
              {t("profile:history")}
            </h2>
            <div className="d-flex flex-justify-center w-100">
              <svg
                width="592"
                height="546"
                viewBox="0 0 592 546"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M445.819 428.901H143.253L158.445 398.529L410.862 398.08C419.398 398.08 426.715 392.096 428.239 383.817L463.195 191.761C464.11 186.724 462.738 181.537 459.385 177.597C457.727 175.658 455.66 174.096 453.326 173.02C450.992 171.943 448.448 171.378 445.869 171.363L124.758 170.316L122.015 157.648C120.287 149.569 112.869 143.684 104.435 143.684H25.9355C21.1787 143.684 16.6167 145.539 13.2532 148.841C9.88962 152.142 8 156.62 8 161.289C8 165.958 9.88962 170.436 13.2532 173.737C16.6167 177.039 21.1787 178.894 25.9355 178.894H89.9036L101.894 234.85L131.414 375.139L93.4094 436.033C91.4358 438.647 90.247 441.752 89.9776 444.995C89.7083 448.239 90.369 451.492 91.8852 454.385C94.9337 460.32 101.082 464.061 107.89 464.061H139.798C132.995 472.929 129.321 483.731 129.331 494.832C129.331 523.059 152.703 546 181.461 546C210.219 546 233.591 523.059 233.591 494.832C233.591 483.71 229.831 472.888 223.124 464.061H304.977C298.175 472.929 294.5 483.731 294.51 494.832C294.51 523.059 317.882 546 346.64 546C375.398 546 398.77 523.059 398.77 494.832C398.77 483.71 395.01 472.888 388.303 464.061H445.869C455.726 464.061 463.805 456.181 463.805 446.456C463.775 441.792 461.868 437.328 458.498 434.039C455.129 430.751 450.57 428.904 445.819 428.901ZM132.227 205.027L424.784 205.974L396.128 363.469L166.32 363.868L132.227 205.027ZM181.461 510.591C172.62 510.591 165.405 503.509 165.405 494.832C165.405 486.154 172.62 479.072 181.461 479.072C190.302 479.072 197.516 486.154 197.516 494.832C197.516 499.011 195.825 503.02 192.814 505.975C189.803 508.931 185.719 510.591 181.461 510.591ZM346.64 510.591C337.799 510.591 330.584 503.509 330.584 494.832C330.584 486.154 337.799 479.072 346.64 479.072C355.481 479.072 362.696 486.154 362.696 494.832C362.696 499.011 361.004 503.02 357.993 505.975C354.982 508.931 350.898 510.591 346.64 510.591Z"
                  fill="#EAEAEA"
                />
                <path
                  d="M592 143.684C592 223.039 528.228 287.368 449.561 287.368C370.894 287.368 307.122 223.039 307.122 143.684C307.122 64.3296 370.894 0 449.561 0C528.228 0 592 64.3296 592 143.684Z"
                  fill="#EAEAEA"
                />
                <path
                  d="M437.819 425.184H135.253L150.445 395.075L402.862 394.63C411.398 394.63 418.715 388.698 420.239 380.491L455.195 190.099C456.11 185.105 454.738 179.964 451.385 176.058C449.727 174.136 447.66 172.587 445.326 171.52C442.992 170.453 440.448 169.893 437.869 169.878L116.758 168.84L114.015 156.282C112.287 148.273 104.869 142.439 96.4349 142.439H17.9355C13.1787 142.439 8.61673 144.278 5.25318 147.551C1.88962 150.824 0 155.263 0 159.891C0 164.52 1.88962 168.959 5.25318 172.232C8.61673 175.505 13.1787 177.343 17.9355 177.343H81.9036L93.8945 232.815L123.414 371.888L85.4094 432.254C83.4358 434.846 82.247 437.924 81.9776 441.139C81.7083 444.354 82.369 447.579 83.8852 450.448C86.9337 456.331 93.0815 460.039 99.8899 460.039H131.798C124.995 468.83 121.321 479.539 121.331 490.543C121.331 518.526 144.703 541.268 173.461 541.268C202.219 541.268 225.591 518.526 225.591 490.543C225.591 479.518 221.831 468.79 215.124 460.039H296.977C290.175 468.83 286.5 479.539 286.51 490.543C286.51 518.526 309.882 541.268 338.64 541.268C367.398 541.268 390.77 518.526 390.77 490.543C390.77 479.518 387.01 468.79 380.303 460.039H437.869C447.726 460.039 455.805 452.228 455.805 442.587C455.775 437.963 453.868 433.538 450.498 430.278C447.129 427.018 442.57 425.187 437.819 425.184ZM124.227 203.25L416.784 204.189L388.128 360.319L158.32 360.715L124.227 203.25ZM173.461 506.166C164.62 506.166 157.405 499.146 157.405 490.543C157.405 481.941 164.62 474.92 173.461 474.92C182.302 474.92 189.516 481.941 189.516 490.543C189.516 494.687 187.825 498.66 184.814 501.59C181.803 504.52 177.719 506.166 173.461 506.166ZM338.64 506.166C329.799 506.166 322.584 499.146 322.584 490.543C322.584 481.941 329.799 474.92 338.64 474.92C347.481 474.92 354.696 481.941 354.696 490.543C354.696 494.687 353.004 498.66 349.993 501.59C346.982 504.52 342.898 506.166 338.64 506.166Z"
                  fill="#F6F6F6"
                />
                <path
                  d="M584 142.439C584 221.106 520.228 284.878 441.561 284.878C362.894 284.878 299.122 221.106 299.122 142.439C299.122 63.7721 362.894 0 441.561 0C520.228 0 584 63.7721 584 142.439Z"
                  fill="#F6F6F6"
                />
                <path
                  d="M425.836 98.1721V124.837H398.829V98.1721H425.836ZM425.836 158.509V185.174H398.829V158.509H425.836Z"
                  fill="white"
                />
                <path
                  d="M487.852 61.5938C481.242 74.8121 476.399 87.4607 473.323 99.5395C470.36 111.618 468.879 124.894 468.879 139.365C468.879 164.435 475.317 189.846 488.193 215.599H467.682C460.617 204.887 455.091 192.866 451.102 179.533C447.228 166.201 445.291 152.983 445.291 139.878C445.291 126.204 447.171 112.416 450.931 98.514C454.806 84.4979 460.389 72.1912 467.682 61.5938H487.852Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="deleteAcc">
              <h3 onClick={showModal}>{t("profile:deleteProfile")}</h3>
              <p>{t("profile:deleteWarning")}</p>
            </div>
            <Modal
              className="modalProfile"
              visible={isModalVisible}
              onOk={handleDeleteAcc}
              onCancel={handleCancel}
              width={800}
              centered
              footer={[
                <Button
                  key="delete"
                  className="deleteButton"
                  onClick={handleDeleteAcc}
                >
                  {t("deleteYes")}
                </Button>,
                <Button key="noDelete" onClick={handleCancel}>
                  {t("deleteNo")}
                </Button>,
              ]}
            >
              <h3>{t("profile:delete")}</h3>
              <p>{t("profile:deleteWarning")}</p>
            </Modal>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
