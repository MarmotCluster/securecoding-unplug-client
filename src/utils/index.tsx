export interface CustomFormData {
    name?: string;
    username?: string;
    email?: string;
    emptiableemail?: string;
    password?: string;
    cfmpassword?: string;
    newpassword?: string;
    cfmnewpassword?: string;
    devicename?: string;
    serialnumber?: string;
    // attempt: number;
}

export interface ValidateList {
    name?: boolean;
    username?: boolean;
    email?: boolean;
    emptiableemail?: boolean;
    password?: boolean;
    cfmpassword?: boolean;
    newpassword?: boolean;
    cfmnewpassword?: boolean;
    serialnumber?: boolean;
    devicename?: boolean;
    attempt: number;
}

export const validate = (form: CustomFormData) => {
    let valids: ValidateList = {
        attempt: 1,
    };

    Object.keys(form).forEach((i: string) => {
        switch (i) {
            case 'name':
                valids[i] = form[i]!.length > 0;
                break;
            case 'username':
                valids[i] = form[i]!.length > 0;
                // valids[i] = /^[A-Za-z0-9_-]{6,18}$/.test(form[i]!);
                break;
            case 'email':
                valids[i] = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(form[i]!);
                break;
            case 'emptiableemail':
                valids[i] = form[i]!.length === 0 || /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(form[i]!);
                break;
            case 'password':
                valids[i] = form[i]!.length > 0;
                // valids[i] = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(form[i]!);
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
            case 'devicename':
                valids[i] = form[i]!.length > 0;
                break;
            case 'serialnumber':
                valids[i] =
                    form.serialnumber!.length > 0 &&
                    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(
                        form[i]!
                    );
                // valids[i] = form.serialnumber!.indexOf('BREAD') > -1 && form.serialnumber!.length === 15;
                // valids[i] = form[i]!.length > 0;
                break;
            default:
                break;
        }
    });

    // console.log(valids);
    return valids;
};

export const addLeadingZeros = (num: number, totalLength: number): string => {
    return String(num).padStart(totalLength, '0');
};

export const getInputDateCurrent = (): string => {
    const date = new Date();
    return `${date.getFullYear()}-${addLeadingZeros(date.getMonth() + 1, 2)}-${date.getDate()}`;
};

export const getDateFromString = (dateString: string) => {
    const date = new Date(dateString);
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
};

export const getDateFromNumbers = (
    y: number,
    m: number,
    d: number,
    deductY: number = 0,
    deductM: number = 0,
    deductD: number = 0
) => {
    const date = new Date(y - deductY, m - deductM - 1, d - deductD + 1);
    return `${date.getFullYear()}-${addLeadingZeros(date.getMonth() + 1, 2)}-${date.getDate()}`;
};
