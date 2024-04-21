import { redirect } from '@sveltejs/kit'

export const load = async ({ url, locals: { user } }) => {
	if (!user && !url.pathname.startsWith('/auth')) redirect(302, '/auth')
	return { user }
}
