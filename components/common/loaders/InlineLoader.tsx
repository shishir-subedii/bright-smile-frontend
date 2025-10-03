"use client";

interface InlineLoaderProps {
    size?: number;
}

export default function InlineLoader({ size = 14 }: InlineLoaderProps) {
    return (
        <span
            className="inline-block animate-spin border-2 border-t-transparent rounded-full align-middle"
            style={{
                width: size,
                height: size,
                borderColor: "#00BCD4",
            }}
        />
    );
}
