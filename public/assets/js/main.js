/*
	Road Trip by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		var $height = $('#header').height();

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Banner

			if ($banner.length > 0) {

				// IE: Height fix.
					if (skel.vars.browser == 'ie'
					&&	skel.vars.IEVersion > 9) {

						skel.on('-small !small', function() {
							$banner.css('height', '100vh');
						});

						skel.on('+small', function() {
							$banner.css('height', '');
						});

					}

				// More button.
					$banner.find('.more')
						.addClass('scrolly');

			}


		// Get BG Image

			if ( $( ".bg-img" ).length ) {

				$( ".bg-img" ).each(function() {

					var post 	= $(this),
						bg 		= post.data('bg');

					post.css( 'background-image', 'url(images/' + bg + ')' );

				});


			}

		// Posts

			$( ".post" ).each( function() {
				var p = $(this),
					i = p.find('.inner'),
					m = p.find('.more');

				m.addClass('scrolly');

				p.scrollex({
					top: '40vh',
					bottom: '40vh',
					terminate: 	function() { m.removeClass('current'); i.removeClass('current'); },
					enter: 		function() { m.addClass('current'); i.addClass('current'); },
					leave: 		function() { m.removeClass('current'); i.removeClass('current'); }
				});

			});

		// Scrolly.
			if ( $( ".scrolly" ).length ) {

				$('.scrolly').scrolly();
			}

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right'
				});

	});

})(jQuery);

(function() {

	// document.addEventListener('DOMContentLoaded', function( ) {

		//HABILITAR EL BOTÓN ENVIAR, UNA VEZ SE ENCUENTREN LOS CAMPOS: EMAIL, ASUNTO, MENSAJE, BIEN DILIGENCIADOS.
	   // CON EL OBJETO INICIALIZADO VACIO, PODEMOS IR VERIFICANDO QUE LOS CAMPOS YA ESTÁN LISTOS PARA ENVIAR
		const email = {
			name: '',
			email: '',
			message: ''
		}
	
		// SELECCIONAR LOS ELEMENTOS DE LA INTERFAZ
		const inputName = document.querySelector('#name');
		const inpuEmail = document.querySelector('#email');
		const inputMessage = document.querySelector('#message');
		const formulario = document.querySelector('#formulario');
		const  btnSubmit = document.querySelector('#formulario button[type="submit"]');
		const btnReset = document.querySelector('#formulario button[type="reset"]');
		const spinner = document.querySelector('#spinner');
	
	
		// ASIGNAR EVENTOS
		// con el blur, el evento se dispara cuando salimos del input hacia otro input
		// con el input, se tiene una experiencia real y el línea cuando el usuario llena el formulario
		inputName.addEventListener('input', validar );
		inpuEmail.addEventListener('input', validar );
		inputMessage.addEventListener('input', validar );
		formulario.addEventListener('submit', enviarEmail );
	
		btnReset.addEventListener('click', function(e) {
			e.preventDefault();
			// función que resetea el formulario
			resetFormulario();
	
		});
	
		function enviarEmail( e ) {
			e.preventDefault();
			spinner.classList.add('flex');
			spinner.classList.remove('hidden');
			
			setTimeout( ( ) => {
				spinner.classList.remove('flex');
				spinner.classList.add('hidden');
				resetFormulario();
	 
				//CREAR UNA ALERTA
				const alertaExito = document.createElement('P');
				alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase' );
				alertaExito.textContent = 'Mensaje Enviado Correctamente';
	
				formulario.appendChild(alertaExito);
	
				setTimeout( ( ) => {
					alertaExito.remove();
				}, 3200 )
	
			}, 3000 );
		}
	
	
		function validar( e ) {
	
			
		   if( e.target.value.trim() === '' ) {
				mostrarAlerta(`El campo ${e.target.id} es OBLIGATORIO`, e.target.parentElement );
				email[ e.target.name ] = '';
				comprobarEmail();
				return;   
		   } 
	
		   if( e.target.id === 'email' && !validarEmail( e.target.value ) ) {
				mostrarAlerta(`El Email "${e.target.value}" no es valido`, e.target.parentElement );
				email[ e.target.name ] = '';
				comprobarEmail();
				return;
		   }
	
		   limpiarAlerta( e.target.parentElement );
		   //ASIGNAR LOS VALORES AL OBJETO EMAIL
		   email[ e.target.name ] = e.target.value.trim().toLowerCase();
		   // COMPROBAR EL OBJETO EMAIL
		   comprobarEmail();
		}
	
		function mostrarAlerta( msg, referencia ) { 
			//FUNCIÓN QUE LIMPIA LAS ALERTAS 
				limpiarAlerta( referencia );
	
				//GENERAR ALERTA EN HTML
				const error = document.createElement('P');
				error.textContent = msg;
				error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'rounded-lg')
	
				// AGREGAR EL ERROR EN EL FORMULARIO
				// appendChild ---> agrega un nuevo elemento al html ya existente.
				referencia.appendChild(error);
	
		}
	
	
		function limpiarAlerta( referencia ) {
			 const alerta = referencia.querySelector('.bg-red-600');       
				if( alerta ) {
					alerta.remove();
				}
		}
	
	
		function validarEmail( email ) {
			// EXPRESIÓN REGULAR QUE VALIDA UN CAMPO DE CORREO ELECTRÓNICO EN EL FORMULARIO
			// EL PATRÓN ES: usuario@dominio.com
			const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
			const result = regex.test(email); // retorna true o false
			return  result;
		  
		}
	
	
		function comprobarEmail( ) {
	
		   if( Object.values(email).includes('') ) {
				// SE CUMPLE ESTA CONDICIÓN CUANDO AL MENOS UN CAMPO ESTE VACIO
				btnSubmit.classList.add('opacity-50');
				btnSubmit.disabled = true;
				return;
		   } 
				// SE CUMPLE ESTA CONDICIÓN CUANDO TODOS LOS CAMPOS ESTÁN LLENOS
				btnSubmit.classList.remove('opacity-50');
				btnSubmit.disabled = false;
				
		   
		 }
	
	
		 function resetFormulario( ) {
	
			// REINICIAR EL OBJETO
				email.email = '';
				email.asunto = '';
				email.mensaje = '';
	
				formulario.reset();
				comprobarEmail();
		 }
	
	
	// });


})();