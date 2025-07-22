import "./ContactSection.css";

export const ContactSection = ({ cvData, form, error, onFormSubmit, onDeleteForm, onInputChange }) => {
	return (
		<section className="contact-section">
			<div className="contact-section-label-container">
				<label htmlFor="contactName">Nombre</label>
				<input
					type="text"
					name="contactName"
					id="contactName"
					placeholder="Introduce tu nombre completo..."
					minLength={4}
					maxLength={40}
					value={form.contactName}
					onChange={onInputChange}
				/>
			</div>
			<div className="contact-section-label-container">
				<label htmlFor="companyName">Nombre de la empresa</label>
				<input
					type="text"
					name="companyName"
					id="companyName"
					placeholder="Introduce el nombre de la empresa..."
					minLength={4}
					maxLength={40}
					value={form.companyName}
					onChange={onInputChange}
				/>
			</div>
			<div className="contact-section-label-container">
				<label htmlFor="contactReason">Razon de Contacto</label>
				<select
					name="contactReason"
					id="contactReason"
					className={form.contactReason ? "actived-select" : ""}
					value={form.contactReason}
					onChange={onInputChange}
				>
					<option value="" disabled>
						Elige una opcion...
					</option>
					<option value="job-offer">Oferta de empleo</option>
					<option value="interview-invitation">Invitación a entrevista</option>
					<option value="collaboration-proposal">Propuesta de colaboración</option>
					<option value="general-inquiry">Consulta General</option>
				</select>
			</div>
			<div className="contact-section-label-container">
				<label htmlFor="contactDescription">Descripción adicional</label>
				<textarea
					name="contactDescription"
					id="contactDescription"
					rows={5}
					cols={30}
					placeholder="Escribe un mensaje adicional..."
					maxLength={300}
					value={form.contactDescription}
					onChange={onInputChange}
				/>
			</div>
			<small className="empty-list-text">(*)Todos los campos son obligatorios</small>
			<div className="contact-section-btns-container">
				<button onClick={onFormSubmit} className="btn primary-btn">
					Enviar correo
				</button>
				<button onClick={onDeleteForm} className="btn secondary-btn">
					Borrar Formulario
				</button>
				{error && <span className="error-text">{error}</span>}
			</div>
		</section>
	);
};
