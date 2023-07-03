import { React } from "react";
import { UseCard } from "../components/partials/UseCard";
import { capitalize } from "../features/capitalize";
import { useSelector } from "react-redux";

export const Balance = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <UseCard
            bgcolor="success"
            opacity="10"
            header="Balance"
            body={
                <>
                    <h4>Hello, {capitalize(user.name)}!</h4>
                    <p>
                    <h5>Your current balance is: ${user.balance ? user.balance.toLocaleString() : ''}</h5>
                    </p>
                </>
            }
        />
    );
};
