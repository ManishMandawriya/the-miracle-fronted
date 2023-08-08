import {
    ERROR_TOGGLE_MODAL_BOX,
    SUCCESS_TOGGLE_MODAL_BOX
} from "@/constants/CustomConstants";

const stateCustom = {
    loading: false,
    status: true,
    data: null,
    error: null
}

export const ToggleLoginRegisterReducer = (state = stateCustom, action: any) => {
    // console.log("DownloadPdfWithFilterReducer>>>>>>>>>>>>>>>>>",action?.payload);
    switch (action.type) {
        case SUCCESS_TOGGLE_MODAL_BOX:
            return {
                ...state,
                loading: false,
                status: true,
                data: action?.payload
            }
        case ERROR_TOGGLE_MODAL_BOX:
            return {
                ...state,
                loading: false,
                status: false,
                error: action?.payload
            }
        default:
            return state
    }
}