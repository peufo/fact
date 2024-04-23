import { page } from '$app/stores'
import { derived } from 'svelte/store'

export const ws = derived(page, ({ params }) => `/ws/${params.workspaceId}`)
