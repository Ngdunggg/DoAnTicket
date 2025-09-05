import { MODE_COLOR_TEXT, MODE_SIZE, Text } from "@share/components/atoms/Text";

interface FormFieldProps {
    label: string;
    type?: "text" | "email" | "password" | "number" | "date" | "textarea";
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    error?: string;
    className?: string;
}

const FormField = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    error,
    className = ""
}: FormFieldProps) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label className="flex items-center gap-1">
                <Text 
                    modeColor={MODE_COLOR_TEXT.BLACK} 
                    modeSize={MODE_SIZE[14]}
                    className="font-medium"
                >
                    {label}
                </Text>
                {required && (
                    <Text 
                        modeColor={MODE_COLOR_TEXT.RED} 
                        modeSize={MODE_SIZE[14]}
                    >
                        *
                    </Text>
                )}
            </label>
            
            {type === "textarea" ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`px-4 py-2 border rounded-lg outline-none transition-colors ${
                        error 
                            ? "border-red-500 focus:border-red-600" 
                            : "border-gray-300 focus:border-bg-yellow"
                    }`}
                    rows={4}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`px-4 py-2 border rounded-lg outline-none transition-colors ${
                        error 
                            ? "border-red-500 focus:border-red-600" 
                            : "border-gray-300 focus:border-bg-yellow"
                    }`}
                />
            )}
            
            {error && (
                <Text 
                    modeColor={MODE_COLOR_TEXT.RED} 
                    modeSize={MODE_SIZE[12]}
                >
                    {error}
                </Text>
            )}
        </div>
    );
};

export default FormField;
