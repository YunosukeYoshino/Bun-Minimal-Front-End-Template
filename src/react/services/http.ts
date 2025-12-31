/**
 * HTTP Client abstraction
 * 外部APIとの通信を抽象化
 */

type RequestOptions = {
	headers?: Record<string, string>;
	signal?: AbortSignal;
};

const BASE_URL = import.meta.env.PUBLIC_API_URL ?? '';

async function request<T>(
	endpoint: string,
	options: RequestInit & RequestOptions = {},
): Promise<T> {
	const { headers = {}, ...rest } = options;

	const response = await fetch(`${BASE_URL}${endpoint}`, {
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		...rest,
	});

	if (!response.ok) {
		throw new Error(`HTTP Error: ${response.status}`);
	}

	return response.json();
}

export const http = {
	get: <T>(endpoint: string, options?: RequestOptions) =>
		request<T>(endpoint, { method: 'GET', ...options }),

	post: <T>(endpoint: string, data: unknown, options?: RequestOptions) =>
		request<T>(endpoint, {
			method: 'POST',
			body: JSON.stringify(data),
			...options,
		}),

	put: <T>(endpoint: string, data: unknown, options?: RequestOptions) =>
		request<T>(endpoint, {
			method: 'PUT',
			body: JSON.stringify(data),
			...options,
		}),

	delete: <T>(endpoint: string, options?: RequestOptions) =>
		request<T>(endpoint, { method: 'DELETE', ...options }),
};
