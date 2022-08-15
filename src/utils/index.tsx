export interface CustomFormData {
    username?: string;
    email?: string;
    emptiableemail?: string;
    password?: string;
    cfmpassword?: string;
    newpassword?: string;
    cfmnewpassword?: string;
    // attempt: number;
}

export interface ValidateList {
    username?: boolean;
    email?: boolean;
    emptiableemail?: boolean;
    password?: boolean;
    cfmpassword?: boolean;
    newpassword?: boolean;
    cfmnewpassword?: boolean;
    attempt: number;
}

export const validate = (form: CustomFormData) => {
    let valids: ValidateList = {
        attempt: 1,
    };

    Object.keys(form).forEach((i: string) => {
        switch (i) {
            case 'username':
                valids[i] = /^[A-Za-z0-9_-]{6,18}$/.test(form[i]!);
                break;
            case 'email':
                valids[i] = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(form[i]!);
                break;
            case 'emptiableemail':
                valids[i] = form[i]!.length === 0 || /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(form[i]!);
                break;
            case 'password':
                valids[i] = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(form[i]!);
                break;
            case 'cfmpassword':
                valids[i] = form.cfmpassword === form.password && form.cfmpassword!.length > 0;
                break;
            case 'newpassword':
                valids[i] = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(form[i]!);
                break;
            case 'cfmnewpassword':
                valids[i] = form.cfmnewpassword === form.newpassword && form.cfmnewpassword!.length > 0;
                break;
            default:
                break;
        }
    });

    // console.log(valids);
    return valids;
};

// export const newValidate = ()
