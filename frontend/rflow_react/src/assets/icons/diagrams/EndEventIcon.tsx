import * as React from 'react';

export default function EndEventIcon(props: React.SVGProps<SVGSVGElement>){
    return (
        <svg
            width={props.width || "40"}
            height={props.height || "40"}
            viewBox="0 0 2000 2000"
            style={{ color: 'currentColor', background: 'transparent' }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fill="currentColor">
                <path fill="currentColor" d="M1015.043 99.002C599.21 95.906 209.098 411.147 121.606 817.247c-84.386 356.719 66.704 754.625 369.312 962.585c293.721 210.37 712.33 226.857 1017.865 31.474c307.224-188.136 488.14-563.828 430.814-921.32c-52.494-370.583-348.523-692.886-716.13-769.06c-68.345-15.248-138.415-22.388-208.424-21.924zm22.08 289.882c305.56-.968 586.24 251.915 617.383 556.116c39.755 290.762-147.702 594.914-429.537 682.33c-275.076 93.609-606.772-25.852-750.075-281.009c-158.564-264.725-91.1-641.965 160.165-825.757c113.947-87.919 258.202-134.99 402.064-131.68z" />
            </g>
        </svg>
    );
};