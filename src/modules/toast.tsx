const SET_MESSAGE = 'toast/SET_MESSAGE' as const;

export const setToastMessage = (message: string) => ({
    type: SET_MESSAGE,
    payload: message,
});

type Action = ReturnType<typeof setToastMessage>;

type State = {
    message: string;
    attempt: number;
};

const initialState: State = {
    message: '',
    attempt: 0,
};

function toast(state: State = initialState, action: Action): State {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                message: action.payload,
                attempt: state.attempt + 1,
            };
        default:
            return state;
    }
}

export default toast;
