import {SessionProps} from "@/constants/interface/SessionProps";

export interface ConfirmToCheckoutProps {
    session: SessionProps;
    onClose: () => void;
}