import React from "react";
import "./hamburgers.scss";

const Hamburger = ({ type, className = "", isActive, setIsActive }) => {
	const handleClick = () => {
		setIsActive(!isActive);
	};

	//In hamburger.scss comment out the import rows you are not using, after you decided which type you use
	console.count("Hamburger");
	return (
		<button
			className={`hamburger hamburger--${type} ${isActive ? "is-active" : ""} ${className}`}
			type="button"
			onClick={() => {
				handleClick();
			}}
		>
			<span className="hamburger-box">
				<span className="hamburger-inner"></span>
			</span>
		</button>
	);
};

export default Hamburger;

/* Types:
  hamburger--3dx
  hamburger--3dx-r
  hamburger--3dy
  hamburger--3dy-r
  hamburger--3dxy
  hamburger--3dxy-r
  hamburger--arrow
  hamburger--arrow-r
  hamburger--arrowalt
  hamburger--arrowalt-r
  hamburger--arrowturn
  hamburger--arrowturn-r
  hamburger--boring
  hamburger--collapse
  hamburger--collapse-r
  hamburger--elastic
  hamburger--elastic-r
  hamburger--emphatic
  hamburger--emphatic-r
  hamburger--minus
  hamburger--slider
  hamburger--slider-r
  hamburger--spin
  hamburger--spin-r
  hamburger--spring
  hamburger--spring-r
  hamburger--stand
  hamburger--stand-r
  hamburger--squeeze
  hamburger--vortex
  hamburger--vortex-r
*/
