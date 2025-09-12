import { User } from '@share/models/auth/user';
import { createAccountSchema } from '@share/schemas/auth/login';
import { AuthMode } from '@share/constants/commons';
import useAuthForm from './useAuthForm';

/**
 * Custom hook for handling authentication form logic and validation.
 * Used by AuthPopup component.
 */
export default function useAuthFormLogin(user?: User | null, mode?: AuthMode) {
    //#region dependencies
    const authForm = useAuthForm(user, mode);
    //#endregion

    const schema = createAccountSchema(mode);
    const schemaCreateAccount =
        'innerType' in schema ? schema.innerType() : schema;

    return {
        authForm,
        schemaCreateAccount,
    };
}
