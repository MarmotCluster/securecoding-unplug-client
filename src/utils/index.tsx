const readonlyList = ['username', 'email', 'password', 'cfmpassword'] as const;

type FormData = {
    username?: string;
    email?: string;
    password?: string;
    cfmpassword?: string;
};

type ValidateList = {
    username?: boolean;
    email?: boolean;
    password?: boolean;
    cfmpassword?: boolean;
};

export const validate = (form: FormData) => {
    console.log('validate');

    let valids: ValidateList = {
        username: true,
        email: true,
        password: true,
        cfmpassword: true,
        // length: Object.keys(form).length,
    };
    Object.keys(form).forEach((i: string) => {
        switch (i) {
            case 'username':
                valids[i] = /^[a-z0-9_-]{6,18}$/.test(form[i]!);
                break;
            case 'email':
                valids[i] = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form[i]!);
                break;
            case 'password':
                valids[i] = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(form[i]!);
                break;
            case 'cfmpassword':
                valids[i] = form.cfmpassword === form.password;
                break;
        }
    });

    return valids;
};
