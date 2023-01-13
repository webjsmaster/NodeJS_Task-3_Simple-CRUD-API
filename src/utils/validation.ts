import { User } from "../types/types";

export function validation({ username, age, hobbies }: User) {
	const isStringArray = (arr: Array<string>) => arr.every((el) => typeof el === "string");

	const isValidUsername = !!username && !!username.length && typeof username === "string";
	const isValidAge = !!age && Number.isInteger(age);
	const isHobbies = !!hobbies && !!Array.isArray(hobbies) && isStringArray(hobbies);

	return isValidUsername && isValidAge && isHobbies;
}
