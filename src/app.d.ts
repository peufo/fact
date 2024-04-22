import type { Workspace } from '@prisma/client'

declare global {
	namespace App {
		interface Locals {
			user: import('lucia').User | null
			session: import('lucia').Session | null
		}
		interface PageData {
			workspace: Workspace | null
		}
		// interface Error {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
