import { ERROR_TOGGLE_MODAL_BOX, SUCCESS_TOGGLE_MODAL_BOX } from "@/constants/CustomConstants";
import { Dispatch } from "react"

export const ToggleLoginRegisterAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: SUCCESS_TOGGLE_MODAL_BOX,
            payload: payload
        })
    } catch (error: any) {
        dispatch({
            type: ERROR_TOGGLE_MODAL_BOX,
            payload: error.message
        });

    }
}