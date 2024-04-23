import type { Workspace, WorkspaceMember, User } from '@prisma/client'

declare global {
	namespace App {
		interface Locals {
			user: import('lucia').User | null
			session: import('lucia').Session | null
		}
		interface PageData {
			user: import('lucia').User | null
			workspaces: Workspace[] | null
			workspace: (Workspace & { members: (WorkspaceMember & { user: User })[] }) | null
		}
		// interface Error {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
