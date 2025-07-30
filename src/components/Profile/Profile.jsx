import "./Profile.css";
import linkedInLogo from "../../assets/icons/linkedin/logo-linkedin.png";
import linkedInLogoPng from "../../assets/icons/linkedin/logo-linkedin.png";
import linkedInLogoWebp from "../../assets/icons/linkedin/logo-linkedin.png";
import linkedInLogoAvif from "../../assets/icons/linkedin/logo-linkedin.png";

export const Profile = ({ cvData, gameResult }) => {
	return (
		<section className={`profile-section ${gameResult?.secretNumber}`}>
			<h3 className="profile-section-title">PERFIL</h3>
			<div className="profile-section-about">
				<p>
					Ubicacion: <span>{cvData.personalInfo.location}</span>
				</p>
				<p>
					Email: <span>{cvData.personalInfo.email}</span>
				</p>
				<a
					href={cvData.personalInfo.portfolio}
					target="_blank"
					rel="noopener noreferrer"
					className="profile-section-btn"
				>
					Portfolio
				</a>
			</div>

			<div className="profile-section-professional-description">
				<h4 className="subtitle">Perfil Profesional</h4>
				<p>{cvData.personalInfo.summary}</p>
			</div>
			<div className="profile-section-linkedin-link">
				<a href={cvData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
					<div className="linkedin-logo-container">
						<picture>
							<source src={linkedInLogoAvif} type="image/png" />
							<source src={linkedInLogoWebp} type="image/png" />
							<source src={linkedInLogoPng} type="image/png" />
							<img src={linkedInLogo} alt="Logo LinkedIn" aria-label="Logo of LinkedIn Web" />
						</picture>
					</div>
					<span>LinkedIn</span>
				</a>
			</div>
		</section>
	);
};
