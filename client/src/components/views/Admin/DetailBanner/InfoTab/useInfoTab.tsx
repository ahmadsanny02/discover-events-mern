import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
const schemaUpdateInfo = yup.object().shape({
    title: yup.string().required("Please input title"),
    isShow: yup.string().required("Please input isShow"),
});

const useInfoTab = () => {
    const {
        control: controlUpdateInfo,
        handleSubmit: handleSubmitUpdateInfo,
        formState: { errors: errorsUpdateInfo },
        reset: resetUpdateInfo,
        setValue: setValueUpdateInfo,
    } = useForm({
        resolver: yupResolver(schemaUpdateInfo),
    });


    return {
        controlUpdateInfo,
        handleSubmitUpdateInfo,
        errorsUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
    }
}

export default useInfoTab