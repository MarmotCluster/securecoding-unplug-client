import React from 'react';

interface RoundyInputInterface {
    type: 'text' | 'password' | 'email';
    name: string;
    value: string;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    style: React.CSSProperties;
    invalidText?: string;
    invalidTextClassNames: string | undefined;
}

const RoundyInput = ({
    type,
    name,
    value,
    onChange,
    style,
    invalidTextClassNames,
    invalidText,
}: RoundyInputInterface) => {
    return (
        <div style={{ position: 'relative' }}>
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
                {name === 'cfmpassword' ? 'confirm password' : name} {invalidText}
            </div>
        </div>
    );
};

export default RoundyInput;