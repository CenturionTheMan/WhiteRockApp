const navLinks = ["/", "/details", "/help"] as const;

export type NavLink = (typeof navLinks)[number];

export const isNavLink = (value: string): value is NavLink => navLinks.includes(value as NavLink);

export const toNavLink = (value: string): NavLink | null => {
	return isNavLink(value) ? value : null;
};
