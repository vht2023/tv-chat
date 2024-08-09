import Image from 'next/image';
import React from 'react';

type Props = {
	size?: number;
};

const LoadingLogo = ({ size = 60 }: Props) => {
	return (
		<div className='relative z-50 h-screen w-full flex-center'>
			<div className='absolute top-0 left-0 bg-black bg-opacity-10 w-full h-full' />
			<Image alt='Logo' src='/logo.svg' width={size} height={size} className='animate-pulse duration-800' />
		</div>
	);
};

export default LoadingLogo;
