import { UseCard } from "../components/partials/UseCard";
import logo from "../images/bank.png";
export const Home = () => {
    return (
        <UseCard
            align="center"
            txtcolor="black"
            header="Better Bank"
            title="Welcome to Better Bank!"
            text="We were bad, but we just got better. For all of your banking needs. This app is for educational purposes only. Please do not enter any of your sensitive information."
            body={
                <>
                    <img
                        alt="bank"
                        src={logo}
                        className="img-fluid"
                    />
                    <br />
                    <div
                        style={{
                            fontSize: ".6rem",
                        }}
                    >
                    </div>
                </>
            }
        />
    );
};
