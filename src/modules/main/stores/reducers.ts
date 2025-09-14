import authReducers from '@modules/auth/store/authSlice';
import searchReducers from '@share/components/organisms/header/store/searchSlice';
/**
 * Reducers for the main module.
 */
export default { login_signup: authReducers, search: searchReducers };
