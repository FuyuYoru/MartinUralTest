import React from "react";
import styles from './pagination.module.css'
import Select from "../select/select";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../store";
import { Slider } from "../slider/slider";
import { setPagination, setPage } from "../../store/reducers/userReducer";

export const TablePaginationController = () => {
	const dispatch = useDispatch()
	const { currentPagination, currentPage, pages } = useSelector((state: RootState) => state.users)
	const maxCount = [5, 10, 15, 20];

	const handleChangePagination = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newPagination = parseInt(event.target.value, 10);
		dispatch(setPagination(newPagination));
	};

	const handleChangePage = (value: number) => {
		dispatch(setPage(value));
	}

	return (
		<>
			<div className={styles.controllerContainer}>
				<span>
					Элементов на странице:
				</span>
				<Select
					options={maxCount}
					defaultOption={currentPagination}
					onChange={handleChangePagination}
				/>
				{/* <div>
					<ul className={styles.pagesContainer}>
						{pages.map((value, index) =>
							<li
								className={value === currentPage ? styles.currentPage : ''}
								key={index}
								onClick={() => handleChangePage(value)}
							>
								{value}
							</li>
						)}
					</ul>
				</div> */}
				<Slider
					values={pages}
					onValueChange={handleChangePage}
				/>
			</div>
		</>
	)
}