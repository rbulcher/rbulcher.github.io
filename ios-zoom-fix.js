// iOS Zoom Fix - Prevents pinch zoom and double-tap zoom issues
(function () {
	// Detect iOS device - be more comprehensive
	const isIOS =
		/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	const isMobileBrowser = /Mobi|Android/i.test(navigator.userAgent);

	// Apply the fixes to iOS, Safari or any mobile browser for better compatibility
	if (isIOS || isSafari || isMobileBrowser) {
		// Set document CSS variables
		document.documentElement.style.setProperty(
			"--vh",
			`${window.innerHeight * 0.01}px`
		);

		// Reflect viewport height on resize - helps with iOS toolbar appearance/disappearance
		window.addEventListener("resize", () => {
			document.documentElement.style.setProperty(
				"--vh",
				`${window.innerHeight * 0.01}px`
			);
		});

		// Prevent pinch-zoom on touchmove
		document.addEventListener(
			"touchmove",
			function (e) {
				if (e.touches && e.touches.length > 1) {
					e.preventDefault();
				}

				// Also check for scale property
				if (e.scale !== undefined && e.scale !== 1) {
					e.preventDefault();
				}
			},
			{ passive: false }
		);

		// Prevent double-tap zoom
		let lastTouchEnd = 0;
		document.addEventListener(
			"touchend",
			function (e) {
				const now = Date.now();
				if (now - lastTouchEnd <= 300) {
					e.preventDefault();
				}
				lastTouchEnd = now;
			},
			{ passive: false }
		);

		// Disable Safari's native gestures - critical for iOS
		document.addEventListener(
			"gesturestart",
			function (e) {
				e.preventDefault();
				return false;
			},
			{ passive: false }
		);

		document.addEventListener(
			"gesturechange",
			function (e) {
				e.preventDefault();
				return false;
			},
			{ passive: false }
		);

		document.addEventListener(
			"gestureend",
			function (e) {
				e.preventDefault();
				return false;
			},
			{ passive: false }
		);

		// Additional zoom prevention for older iOS
		document.addEventListener(
			"touchstart",
			function (e) {
				if (e.touches.length > 1) {
					e.preventDefault();
				}
			},
			{ passive: false }
		);

		// Add additional class to body for CSS targeting
		document.addEventListener("DOMContentLoaded", function () {
			document.body.classList.add("ios-device");
		});
	}
})();
