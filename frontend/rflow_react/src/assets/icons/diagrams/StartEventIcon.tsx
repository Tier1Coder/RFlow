import * as React from 'react';

function StartEventIcon(props: React.SVGProps<SVGSVGElement>){

    return (
        <svg
            width={props.width || '40'}
            height={props.height || '40'}
            viewBox="0 0 2000 2000"
            style={{ color: 'currentColor', background: 'transparent' }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fill="currentColor">
                <path fill="none" 
                stroke="currentColor" 
                strokeWidth="100"
                d="M1899 1023.999c0-483.252-391.75-874.995-875-874.995S149 540.747 149 1024c0 483.251 391.75 875.004 875 875.004s875-391.753 875-875.004z" />
            </g>
        </svg>
    );
};

export default StartEventIcon;
