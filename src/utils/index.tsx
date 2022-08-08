const readonlyList = ['username', 'email', 'password', 'cfmpassword'] as const;

type FormData = {
    username?: string;
    email?: string;
    password?: string;
    cfmpassword?: string;
    // attempt: number;
};

type ValidateList = {
    username?: boolean;
    email?: boolean;
    password?: boolean;
    cfmpassword?: boolean;
    attempt: number;
};

export const validate = (form: FormData) => {
    let valids: ValidateList = {
        username: true,
        email: true,
        password: true,
        cfmpassword: true,
        attempt: 1,
        // length: Object.keys(form).length,
    };
    Object.keys(form).forEach((i: string) => {
        switch (i) {
            case 'username':
                valids[i] = /^[A-Za-z0-9_-]{6,18}$/.test(form[i]!);
                break;
            case 'email':
                valids[i] = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form[i]!);
                break;
            case 'password':
                valids[i] = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(form[i]!);
                break;
            case 'cfmpassword':
                valids[i] = form.cfmpassword === form.password && form.cfmpassword!.length > 0;
                break;
        }
    });

    // console.log(valids);
    return valids;
};
