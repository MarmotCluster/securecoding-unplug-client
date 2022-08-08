const SET_LOADING = 'defaults/SET_LOADING' as const;
const SET_POPUP = 'defaults/SET_POPUP' as const;
const SET_POPUP_OFF = 'defaults/SET_POPUP_OFF' as const;

export const setLoading = (status: boolean) => ({
    type: SET_LOADING,
    payload: status,
});

export const setPopup = (
    status: boolean,
    type: 'positive' | 'negative',
    desc: string,
    renderDual: boolean,
    confirmText: string = 'Confirm',
    cancelText: string = 'Cancel',
    onClickConfirm?: () => void,
    onClickCancel?: () => void
) => ({
    type: SET_POPUP,
    payload: {
        status,
        type,
        desc,
        renderDual,
        confirmText,
        cancelText,
        onClickConfirm,
        onClickCancel,
    },
});

export const setPopupOff = () => ({
    type: SET_POPUP_OFF,
});

type Action = ReturnType<typeof setLoading> | ReturnType<typeof setPopup> | ReturnType<typeof setPopupOff>;

type State = {
    loading: {
        status: boolean;
        attempt: number;
    };
    popup: {
        status: boolean;
        attempt: number;
        type: 'positive' | 'negative';
        desc: string;
        renderDual: boolean;
        confirmText: string;
        cancelText: string;
        onClickConfirm?: () => void;
        onClickCancel?: () => void;
    };
};

const initialState: State = {
    loading: {
        status: false,
        attempt: 0,
    },
    popup: {
        status: false,
        attempt: 0,
        type: 'positive',
        desc: 'Hello world Hello world Hello worldHello worldHello world',
        renderDual: false,
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        onClickConfirm: undefined,
        onClickCancel: undefined,
    },
};

function defaults(state: State = initialState, action: Action): State {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: {
                    status: action.payload,
                    attempt: state.loading.attempt + 1,
                },
            };
        case SET_POPUP:
            return {
                ...state,
                popup: {
                    ...action.payload,
                    attempt: state.popup.attempt + 1,
                },
            };

        case SET_POPUP_OFF:
            return {
                ...state,
                popup: {
                    ...state.popup,
                    status: false,
                    attempt: state.popup.attempt + 1,
                },
            };
        default:
            return state;
    }
}

export default defaults;
