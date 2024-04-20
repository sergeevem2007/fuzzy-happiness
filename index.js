import resizer from "./functions/resizer"
import detectMobile from "./functions/detect-mobile";
/**
 * Принимает на вход название функции, запускает её, а при событии изменении размера окна повторно вызывает функцию
 *
 * @param {function} functionName название функции
 */
export default function (functionName) {
  functionName();

  window.addEventListener("resize", functionName);
  window.addEventListener("orientationchange", functionName);
}
export default function detectMobile() {
	return window.innerWidth < 1000
}

const $slider = document.querySelector('#r-slider');
const isMobile = detectMobile();
let isTouchMove = false;

(function () {
	if(!$slider) return;

	/** Для мобильной версии ставим первый слайд активным */
	if (isMobile) {
		$slider.querySelector('.r-slide.open').classList.remove('open');
		$slider.querySelector('.r-slide').classList.add('open');
	}

	$slider.querySelectorAll('.r-slide').forEach(slide => {
		/** Отслеживание скролла на тач экранах */
		slide.addEventListener('touchmove', function () { isTouchMove = true; });

		/** Обработка нажатий на слайды в телефоне */
		slide.addEventListener('touchend', function (e) {
			if (isMobile && !slide.classList.contains('open')) {
				if(isTouchMove) return isTouchMove = false;

				e.preventDefault();
				document.querySelector('#r-slider .r-slide.open').classList.remove('open');
				this.classList.add('open');
			}
		});

		/** Раскрытие слайдов при наведении мыши */
		slide.addEventListener('mouseenter', function (e) {
			$slider.querySelector('.r-slide.open').classList.remove('open');
			this.classList.add('open');
		});
	});

	/**
	 * Задать ширину картинок слайда
	 */
	function rSliderImgSetWidth() {
		$slider.querySelectorAll('.r-slide--img > img').forEach(img => {
			const openSlide = $slider.querySelector('.r-slide.open');
			const width = openSlide.clientWidth;

			img.width = width + 250;
		});
	}

	/**
	 * Задать размер контента у слайдов
	 */
	function setWidthSlideContent() {
		$slider.querySelector('.r-slide.open .content').style.minWidth = '';
		const isMobile = detectMobile();
		const contentWidth = $slider.querySelector('.r-slide.open .content').clientWidth + 'px';

		$slider.querySelectorAll('.r-slide .content').forEach(i => i.style.minWidth = isMobile ? '' : contentWidth);
	}

	resizer(rSliderImgSetWidth);
	resizer(setWidthSlideContent);
}());
