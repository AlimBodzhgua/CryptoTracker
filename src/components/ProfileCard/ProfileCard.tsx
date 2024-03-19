import React, { useEffect, useId, useState } from 'react';
import { Input } from 'components/UI/Input/Input';
import { selectUser } from 'redux/selectors/userSelectors';
import { useAppSelector } from 'hooks/redux';
import { Button, ButtonTheme } from 'components/UI/Button/Button';

import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import classes from './ProfileCard.module.scss';

interface ProfileCardProps {
	className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ className }) => {
    const user = useAppSelector(selectUser);
    const { t } = useTranslation();
    const id = useId();
    const [email, setEmail] = useState<string>('');
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
    	if (user) {
	    	setEmail(user.email);
    	}
    }, []);

    const onEdit = () => {
    	setEdit(true);
    };

    const onCancel = () => {
    	setEdit(false);
    };

    const onSave = () => {
    	console.log('save');
    };

    return (
        <div className={classnames(classes.ProfileCard, className)}>
            <label htmlFor={`${id}-id`} className={classes.dataItem}>
                <span className={classes.dataText}>Id</span>
                <Input
                    placeholder={user?.id}
                    className={classes.dataInput}
                    fieldClassName={edit ? classes.inputField : undefined}
                    disabled={!edit}
                    id={`${id}-id`}
                />
            </label>
            <label htmlFor={`${id}-email`} className={classes.dataItem}>
                <span className={classes.dataText}>Email</span>
                <Input
                    placeholder={user?.email}
                    className={classes.dataInput}
                    fieldClassName={edit ? classes.inputField : undefined}
                    disabled={!edit}
                    id={`${id}-email`}
                />
            </label>
            <div className={classes.profileActions}>
                {edit
            		? (
                        <>
                    <Button
                                theme={ButtonTheme.primary}
                                className={classes.editBtn}
                                onClick={onCancel}
                            >
                                {t('Cancel')}
                            </Button>
                    <Button
                                theme={ButtonTheme.secondary}
                                className={classes.editBtn}
                                onClick={onSave}
                            >
                                {t('Save')}
                            </Button>
                </>
                    )
            		: (
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
};
