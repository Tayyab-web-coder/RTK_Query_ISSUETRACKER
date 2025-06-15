import {
    FadeLoader,
    PulseLoader
} from "react-spinners";

export function Loader({ loading = true, color = "#333" }) {
    return (
        <div className="loading-container">
            <PulseLoader
                loading={loading} size={12} color={color} />
        </div>
    );
}
