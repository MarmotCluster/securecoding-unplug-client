import React from 'react';

interface RoundyInputInterface {
    type: 'text' | 'password' | 'email';
    name: string;
    placeholder?: string;
    value: string;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    style: React.CSSProperties;
    invalidText?: string;
    invalidTextClassNames: string | undefined;
}

const RoundyInput = ({
    type,
    name,
    placeholder,
    value,
    onChange,
    style,
    invalidTextClassNames,
    invalidText,
}: RoundyInputInterface) => {
    return (
        <div className="child">
            <input
                className="common text en-pri wei-300"
                type={type}
                name={name}
                placeholder=" "
                value={value}
                onChange={onChange && onChange}
                autoComplete="off"
                style={style}
            />
            <div className={invalidTextClassNames}>
                {placeholder ? placeholder : name} {invalidText}
            </div>
        </div>
    );
};

export default RoundyInput;
