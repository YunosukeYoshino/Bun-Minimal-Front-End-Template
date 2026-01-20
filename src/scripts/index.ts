/**
 * jQuery 4.0 Minimal LP Application
 */

import $ from 'jquery';

interface UIElements {
	$navbar: JQuery;
	$navLinks: JQuery;
	$sections: JQuery;
	$ctaButton: JQuery;
	$contactForm: JQuery;
	$mobileMenuBtn: JQuery;
	$mobileMenu: JQuery;
	$formSuccess: JQuery;
}

interface ValidationResult {
	isValid: boolean;
	message: string;
}

const App = {
	UI: {} as UIElements,
	NAMESPACE: 'lpApp',
	scrollThreshold: 50,

	init(): void {
		this.cacheElements();
		this.bindEvents();
	},

	cacheElements(): void {
		this.UI.$navbar = $('#navbar');
		this.UI.$navLinks = $('.nav-link');
		this.UI.$sections = $('section[id]');
		this.UI.$ctaButton = $('#cta-button');
		this.UI.$contactForm = $('#contact-form');
		this.UI.$mobileMenuBtn = $('#mobile-menu-btn');
		this.UI.$mobileMenu = $('#mobile-menu');
		this.UI.$formSuccess = $('#form-success');
	},

	bindEvents(): void {
		$(document).on(
			`click.${this.NAMESPACE}`,
			'.nav-link',
			this.handleSmoothScroll.bind(this),
		);

		this.UI.$ctaButton.on(`click.${this.NAMESPACE}`, () => {
			this.scrollToSection('#contact');
		});

		$(window).on(`scroll.${this.NAMESPACE}`, this.handleScroll.bind(this));

		this.UI.$mobileMenuBtn.on(
			`click.${this.NAMESPACE}`,
			this.toggleMobileMenu.bind(this),
		);

		this.UI.$contactForm.on(
			`submit.${this.NAMESPACE}`,
			this.handleFormSubmit.bind(this),
		);

		this.UI.$contactForm.on(
			`input.${this.NAMESPACE}`,
			'input, textarea',
			this.handleInputValidation.bind(this),
		);
	},

	handleSmoothScroll(e: JQuery.ClickEvent): void {
		e.preventDefault();
		const href = $(e.currentTarget).attr('href');
		if (href) {
			this.scrollToSection(href);
			this.UI.$mobileMenu.slideUp(200);
		}
	},

	scrollToSection(selector: string): void {
		const $section = $(selector);
		if ($section.length) {
			const offset = $section.offset();
			if (offset) {
				$('html, body').animate(
					{ scrollTop: offset.top - (this.UI.$navbar.outerHeight() ?? 0) },
					400,
				);
			}
		}
	},

	handleScroll(): void {
		const scrollTop = $(window).scrollTop() ?? 0;

		if (scrollTop > this.scrollThreshold) {
			this.UI.$navbar.addClass('navbar-scrolled');
		} else {
			this.UI.$navbar.removeClass('navbar-scrolled');
		}

		this.updateActiveNavLink(scrollTop);
	},

	updateActiveNavLink(scrollTop: number): void {
		const navHeight = this.UI.$navbar.outerHeight() ?? 0;

		this.UI.$sections.each((_index, section) => {
			const $section = $(section);
			const sectionTop = ($section.offset()?.top ?? 0) - navHeight - 100;
			const sectionBottom = sectionTop + ($section.outerHeight() ?? 0);
			const sectionId = $section.attr('id');

			if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
				this.UI.$navLinks.removeClass('active');
				$(`.nav-link[href="#${sectionId}"]`).addClass('active');
			}
		});
	},

	toggleMobileMenu(): void {
		this.UI.$mobileMenu.slideToggle(200);
	},

	handleFormSubmit(e: JQuery.SubmitEvent): void {
		e.preventDefault();
		const $form = $(e.currentTarget);

		if (this.validateForm($form)) {
			$form.hide();
			this.UI.$formSuccess.removeClass('hidden');
		}
	},

	validateForm($form: JQuery): boolean {
		let isValid = true;

		$form.find('input[required], textarea[required]').each((_index, element) => {
			const $input = $(element);
			const result = this.validateInput($input);

			if (!result.isValid) {
				isValid = false;
				this.showError($input, result.message);
			} else {
				this.clearError($input);
			}
		});

		return isValid;
	},

	handleInputValidation(e: JQuery.TriggeredEvent): void {
		const $input = $(e.currentTarget);
		if (this.validateInput($input).isValid) {
			this.clearError($input);
		}
	},

	validateInput($input: JQuery): ValidationResult {
		const value = String($input.val() ?? '').trim();
		const type = $input.attr('type');

		if (!value) {
			return { isValid: false, message: '必須項目です' };
		}

		if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
			return { isValid: false, message: '有効なメールアドレスを入力してください' };
		}

		return { isValid: true, message: '' };
	},

	showError($input: JQuery, message: string): void {
		$input.addClass('border-red-500');
		$input.next('.error-message').text(message).removeClass('hidden');
	},

	clearError($input: JQuery): void {
		$input.removeClass('border-red-500');
		$input.next('.error-message').text('').addClass('hidden');
	},

	destroy(): void {
		$(document).off(`.${this.NAMESPACE}`);
		$(window).off(`.${this.NAMESPACE}`);
		this.UI.$ctaButton.off(`.${this.NAMESPACE}`);
		this.UI.$mobileMenuBtn.off(`.${this.NAMESPACE}`);
		this.UI.$contactForm.off(`.${this.NAMESPACE}`);
	},
};

$(() => App.init());

declare global {
	interface Window {
		App: typeof App;
	}
}
window.App = App;
