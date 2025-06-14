import {
    FadeLoader
} from "react-spinners";

export function Loader({ loading = true, color = "#333" }) {
    return (
        <div className="loading-container">
            <FadeLoader
                loading={loading} height={78} width={10} color={color} />
        </div>
    );
}
