const SET_LOADING = 'defaults/SET_LOADING' as const;

export const setLoading = (status: boolean) => ({
    type: SET_LOADING,
    payload: status,
});

type Action = ReturnType<typeof setLoading>;

type State = {
    loading: {
        status: boolean;
        attempt: number;
    };
};

const initialState: State = {
    loading: {
        status: false,
        attempt: 0,
    },
};

function defaults(state: State = initialState, action: Action): State {
    switch (action.type) {
        case SET_LOADING:
            return {
                loading: {
                    status: action.payload,
                    attempt: state.loading.attempt + 1,
                },
            };
        default:
            return state;
    }
}

export default defaults;
