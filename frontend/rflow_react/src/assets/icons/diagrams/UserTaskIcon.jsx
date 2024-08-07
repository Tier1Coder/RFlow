import React, { useState } from 'react';

const UserTaskIcon = ({ initialWidth = 83, initialHeight = 48, initialX = 0, initialY = 0 }) => {
    const [dimensions] = useState({
        width: initialWidth,
        height: initialHeight,
        x: initialX,
        y: initialY,
        strokeWidth: 120,
    });

    return (
        <svg
            width={dimensions.width}
            height={dimensions.height}
            viewBox="0 0 2000 2000"
            style={{ color: 'currentColor', background: 'transparent' }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fill="currentColor">
                <g stroke="currentColor" strokeLinecap="round" transform="translate(0 947.638)">
                    <rect
                        width="1800"
                        height="1460"
                        x="100"
                        y="-677.638"
                        fill="transparent"
                        strokeWidth={dimensions.strokeWidth}
                        rx="329.651"
                        ry="328.5"
                    />
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M655.765-469.546c-101.845 0-174.703 78.293-174.907 167.474v.05c.006 26.97 7.304 55.433 18.706 81.107c8.233 18.537 18.468 35.579 30.94 49.231c-74.126 25.36-160.969 67.099-204.863 149.4l-2.366 4.436v266.423h664.98V-17.848l-2.365-4.435c-43.263-81.119-128.227-122.799-201.637-148.264c35.836-36.442 46.408-83.478 46.42-131.475v-.05c-.205-89.181-73.062-167.474-174.908-167.474zm-69.537 94.964c4.707.012 9.876.169 15.574.505c45.398 2.676 60.678 10.848 72.422 18.598c11.745 7.75 20.025 15.128 51.063 16.033h.02c24.187-.905 35.82-5.217 44.16-10.102c3.38-1.98 6.22-4.037 9.128-6.002c7.687 16.478 11.815 34.694 11.862 53.545c-.016 53.681-9.245 91.274-58.465 122.037l4.815 36.29a825.005 825.005 0 0 1 31.583 10.269c1.5 6.262 3.235 14.475 4.401 23.206c1.222 9.148 1.703 18.665.95 25.811c-.754 7.146-2.973 11.004-3.362 11.394c-25.018 25.017-69.426 39.607-114.47 39.607c-45.043 0-89.452-14.59-114.47-39.607c-.389-.39-2.608-4.248-3.361-11.394c-.753-7.146-.273-16.663.95-25.81c1.172-8.78 2.92-17.042 4.427-23.316a826.137 826.137 0 0 1 31.27-10.16l2.87-38.885c-2.337-2.998-4.718-4.983-7.56-7.115c-10.986-8.242-24.307-26.372-33.717-47.56c-9.407-21.18-15.235-45.39-15.244-64.771c.059-23.235 6.312-45.507 17.796-64.744c2.055-.765 4.222-1.574 6.657-2.375c8.565-2.817 20.301-5.505 40.701-5.454zm-86.95 258.269c-.035.263-.076.52-.111.785c-1.486 11.124-2.36 23.233-1.082 35.353c1.278 12.12 4.476 25.169 14.919 35.612C548.65-8.917 602.597 6.824 655.909 6.824c53.311 0 107.259-15.74 142.905-51.387c10.443-10.443 13.641-23.492 14.919-35.612c1.277-12.12.404-24.229-1.082-35.353c-.03-.22-.063-.432-.093-.65C866.752-92.413 919.136-58.376 948.04-7.557V208.36h-96.228V56.12h-40.215v152.24H499.071V56.12h-40.214v152.24H363.49V-7.556c28.96-50.915 81.486-84.985 135.789-108.757z"
                    />
                </g>
            </g>
        </svg>
    );
};

export default UserTaskIcon;