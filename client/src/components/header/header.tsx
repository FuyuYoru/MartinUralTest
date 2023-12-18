import React from "react";
import { NavLink } from "react-router-dom";
import styles from './header.module.css'

export const Header = () => {
	return (
		<>
			<div className={styles.header}>
				<span>
					LOGO
				</span>
				<div className={styles.navbar}>
					<NavLink to='/' >
						<span>Таблица</span>
					</NavLink>
				</div>
				<span>
					PROFILE
				</span>
			</div>
		</>
	)
}