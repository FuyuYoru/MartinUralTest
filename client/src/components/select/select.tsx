import React from "react";
import styles from './select.module.css';
import { ISelect } from "../../types";

const Select = ({ options, onChange }: ISelect) => {
	return (
		<>
			<div >
				<select onChange={(e) => onChange(e)}>
					{options.map((option) => (
						<option key={typeof option === 'object' ? option.value : option} value={typeof option === 'object' ? option.value : option}>
							{typeof option === 'object' ? option.label : option}
						</option>
					))}
				</select>
			</div>
		</>
	);
};

export default Select;

