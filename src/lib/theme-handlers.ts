export function initializeThemeHandler(): void {
	const modeToggle = document.getElementById(
		'mode-toggle',
	) as HTMLButtonElement | null
	const lightIcon = document.querySelector('.light-icon') as HTMLElement | null
	const darkIcon = document.querySelector('.dark-icon') as HTMLElement | null

	if (!modeToggle || !lightIcon || !darkIcon) {
		console.warn('Theme toggle elements not found')
		return
	}

	// Función para actualizar la visibilidad de los íconos
	function updateIcons(isDark: boolean): void {
		if (!lightIcon || !darkIcon) {
			console.warn('Icon elements not found')
			return
		}

		lightIcon.classList.toggle('hidden', isDark)
		darkIcon.classList.toggle('hidden', !isDark)
	}

	// Cargar el tema inicial desde localStorage o prefers-color-scheme
	const savedTheme = localStorage.getItem('theme')
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
	if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
		document.documentElement.classList.add('dark')
		updateIcons(true)
	} else {
		document.documentElement.classList.remove('dark')
		updateIcons(false)
	}

	// Manejar el cambio de tema
	modeToggle.addEventListener('click', () => {
		const isDark = document.documentElement.classList.toggle('dark')
		localStorage.setItem('theme', isDark ? 'dark' : 'light')
		updateIcons(isDark)
	})
}
