import { DEFAULT_AVATAR_IMAGE } from '@share/constants/image';
import React, { useEffect, useState } from 'react';
export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    defaultSrc?: string;
    // fallback image
    fill?: boolean;
    height?: number | string;
    lazy?: boolean;
    width?: number | string;
}

const Image: React.FC<ImageProps> = ({
    alt = '',
    className,
    defaultSrc = DEFAULT_AVATAR_IMAGE,
    height,
    lazy = true,
    src,
    style,
    width,
    ...rest
}) => {
    const [currentSrc, setCurrentSrc] = useState<string>(src || defaultSrc);

    const isGif =
        currentSrc.toLowerCase().includes('.gif') ||
        currentSrc.includes('image/gif');

    const handleError = () => {
        if (defaultSrc && currentSrc !== defaultSrc) {
            setCurrentSrc(defaultSrc);
        }
    };

    useEffect(() => {
        setCurrentSrc(src || defaultSrc);
    }, [src]);

    return (
        <img
            src={currentSrc}
            loading={lazy ? 'lazy' : 'eager'}
            width={width}
            height={height}
            alt={alt}
            className={`contain-content ${className}`}
            style={style}
            onError={handleError}
            {...(isGif && {
                crossOrigin: 'anonymous',
                decoding: 'async',
            })}
            {...rest}
        />
    );
};
export default Image;
