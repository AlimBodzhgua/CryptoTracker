import React, {
    ChangeEvent,
    useCallback,
    useEffect,
    useId,
    useState,
    memo,
} from "react";
import { Input } from "components/UI/Input/Input";
import { selectUser, selectUserIsLoading } from "redux/selectors/userSelectors";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Button, ButtonSize, ButtonTheme } from "components/UI/Button/Button";
import { USER_LOCALSTORAGE_KEY } from "constants/localStorage";
import { useTranslation } from "react-i18next";
import {
    sendEmailVerificationMessage,
    updateUserProfile,
} from "redux/actions/userActions";

import UserDefaultImage from "assets/userDefaultImage.jpg";
import ErrorIcon from "assets/icons/error.svg";

import classnames from "classnames";
import classes from "./ProfileCard.module.scss";

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = memo(({ className }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const isLoading = useAppSelector(selectUserIsLoading);
    const id = useId();
    const [edit, setEdit] = useState<boolean>(false);

    const [email, setEmail] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setLogin(user.login);
            setImageUrl(user.imageUrl);
        }
    }, [user?.login, user?.imageUrl, user?.email]);

    const onEdit = () => {
        setEdit(true);
    };

    const onCancel = () => {
        if (user) {
            setLogin(user.login);
            setImageUrl(user.imageUrl);
            setEmail(user.email);
        }
        setEdit(false);
    };

    const onLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    };

    const onImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        setImageUrl(e.target.value);
    };

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const onSave = useCallback(async () => {
        if (user) {
            const { meta } = await dispatch(
                updateUserProfile({
                    imageUrl,
                    login,
                    email: email !== user.email ? email : undefined,
                }),
            );

            if (meta.requestStatus === "fulfilled") {
                localStorage.setItem(
                    USER_LOCALSTORAGE_KEY,
                    JSON.stringify({
                        ...user,
                        imageUrl,
                        login,
                        email: email !== user.email ? email : user.email,
                    }),
                );
                setEdit(false);
            }
        }
    }, [login, email, imageUrl]);

    const onGetVerificationMessage = useCallback(() => {
        dispatch(sendEmailVerificationMessage());
    }, [dispatch]);

    const renderErrorIcon = useCallback(
        () => (
            <div className={classes.error}>
                <p className={classes.errorMsg}>
                    {t('Your email is not veified')}
                    <Button
                        theme={ButtonTheme.clear}
                        size={ButtonSize.small}
                        className={classes.verifyBtn}
                        onClick={onGetVerificationMessage}
                    >
                        {t('click to get veification mail')}
                    </Button>
                </p>
                <ErrorIcon className={classes.errorIcon} />
            </div>
        ),
        [],
    );

    return (
        <div className={classnames(classes.ProfileCard, className)}>
            <img
                src={user!.imageUrl.length ? user?.imageUrl : UserDefaultImage}
                alt="UserProfileImage"
                className={classes.profileImage}
            />
            <div>
                <label htmlFor={`${id}-id`} className={classes.dataItem}>
                    <span className={classes.dataText}>Id</span>
                    <Input
                        value={user?.id}
                        className={classes.dataInput}
                        fieldClassName={edit ? classes.inputField : undefined}
                        disabled
                        id={`${id}-id`}
                    />
                </label>

                <label htmlFor={`${id}-login`} className={classes.dataItem}>
                    <span className={classes.dataText}>Login</span>
                    <Input
                        placeholder={t('Enter your login')}
                        className={classes.dataInput}
                        fieldClassName={edit ? classes.inputField : undefined}
                        disabled={!edit}
                        value={login}
                        onChange={onLoginChange}
                        id={`${id}-login`}
                    />
                </label>
                <label htmlFor={`${id}-image`} className={classes.dataItem}>
                    <span className={classes.dataText}>Image url</span>
                    <Input
                        placeholder={t('Enter your image url')}
                        className={classes.dataInput}
                        fieldClassName={edit ? classes.inputField : undefined}
                        disabled={!edit}
                        value={imageUrl}
                        onChange={onImageUrlChange}
                        id={`${id}-image`}
                    />
                </label>

                {/*
                    Должно быть true когда
                    edit === false
                        &&
                    isEmailVerified === false
                        [edit === false && user!.isEmailVerified === false ? true : false]
                        Если edit станет true а user!.isEmailVerified === false то
                */}
                <label htmlFor={`${id}-email`} className={classes.dataItem}>
                    <span className={classes.dataText}>Email</span>
                    <Input
                        className={classes.dataInput}
                        fieldClassName={edit ? classes.inputField : undefined}
                        id={`${id}-email`}
                        disabled={
                            edit === false || user!.isEmailVerified === false
                        }
                        value={email}
                        onChange={onEmailChange}
                        addonAfter={!user?.isEmailVerified && renderErrorIcon()}
                    />
                </label>
            </div>

            <div className={classes.profileActions}>
                {edit ? (
                    <>
                        <Button
                            theme={ButtonTheme.primary}
                            className={classes.editBtn}
                            onClick={onCancel}
                            disabled={isLoading}
                        >
                            {t('Cancel')}
                        </Button>
                        <Button
                            theme={ButtonTheme.secondary}
                            className={classes.editBtn}
                            onClick={onSave}
                            disabled={isLoading}
                        >
                            {t('Save')}
                        </Button>
                    </>
                ) : (
                    <Button
                        theme={ButtonTheme.primary}
                        className={classes.editBtn}
                        onClick={onEdit}
                    >
                        {t('Edit')}
                    </Button>
                )}
            </div>
        </div>
    );
});
