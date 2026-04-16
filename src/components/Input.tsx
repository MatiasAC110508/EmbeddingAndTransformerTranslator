type Props = {
    type?: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
};

export default function Input({ type = "text", placeholder, value, onChange }: Props) {
    return (
        <input
         type={type}
         placeholder={placeholder}
         value={value}
         className="p-2 bg-zinc-900 rounded w-full"
         onChange={(e) => onChange(e.target.value)}
        />
    );
}