const showElement = (option?: { duration?: number; display?: string }) => {
	return {
		opacity: 1,
		display: option?.display || 'block',
		transition: {
			type: 'spring',
			bounce: 0,
			duration: option?.duration || 0.3,
			delayChildren: 0.3,
			staggerChildren: 0.05,
		},
	};
};

const hideElement = (option?: { duration?: number }) => {
	return {
		opacity: 0,
		transitionEnd: {
			display: 'none',
		},
		transition: {
			type: 'spring',
			bounce: 0,
			duration: option?.duration || 0.3,
		},
	};
};

const buttonAnimate = {
	whileTap: { scale: 0.9 },
	whileHover: { scale: 1.1 },
	transition: { type: 'spring', stiffness: 400, damping: 10 },
};

export { buttonAnimate, hideElement, showElement };
