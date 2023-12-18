import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
// require('dotenv').config();

class Api {
	private axiosInstance!: AxiosInstance;

	private prepareInstance = (contentType = 'application/json') => {
		this.axiosInstance = axios.create({
			// baseURL: process.env.API_URL,
			baseURL: 'http://localhost:3000',
			headers: {
				"Content-Type": contentType,
			}
		})
	}

	public get = async (url: string, config?: AxiosRequestConfig): Promise<any> => {
		this.prepareInstance()
		const response = await this.axiosInstance.get(url, config);
		return response.data;
	}

	public post = async<T>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<any> => {
		this.prepareInstance()
		const response = await this.axiosInstance.post(url, params, config);
		return response.data;
	}

}

export default new Api;